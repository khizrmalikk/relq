import { NextRequest, NextResponse } from "next/server";
import Retell from 'retell-sdk';

const retellClient = new Retell({
  apiKey: process.env.RETELL!,
});

// Define the route handler for GET requests
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ callId: string }> }
) {
  try {
    // In Next.js 15, params is a Promise
    const { callId } = await params;
    
    if (!callId) {
      return NextResponse.json(
        { error: "Call ID is required" },
        { status: 400 }
      );
    }

    console.log("Fetching call data for ID:", callId);

    try {
      // Use the Retell SDK to get call details
      const callData = await retellClient.call.retrieve(callId);
      
      // Calculate total cost if call_cost exists
      let totalCost = 0;
      if (callData.call_cost && Array.isArray(callData.call_cost.product_costs)) {
        totalCost = callData.call_cost.product_costs.reduce((sum: number, product: any) => {
          return sum + (product.cost || 0);
        }, 0);
        
        // Convert to dollars if needed (assuming cost is in cents)
        totalCost = totalCost / 100;
        
        // Add the total cost to the response
        callData.total_cost_dollars = totalCost;
      }
      
      if (!callData) {
        throw new Error("No data returned from Retell API");
      }
      
      console.log("Call data retrieved successfully via SDK");
      return NextResponse.json(callData);
    } catch (retellError) {
      console.error("Retell SDK error:", retellError);
      
      // Fallback to direct API call if SDK method fails
      console.log("Falling back to direct API call");
      
      try {
        const response = await fetch(`https://api.retellai.com/v1/calls/${callId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${process.env.RETELL}`,
          },
        });

        if (!response.ok) {
          const errorText = await response.text();
          console.error(`Retell API error (${response.status}):`, errorText);
          
          return NextResponse.json(
            { error: `Error from Retell API: ${response.status}`, details: errorText },
            { status: response.status }
          );
        }

        const data = await response.json();
        
        // Calculate total cost if call_cost exists
        let totalCost = 0;
        if (data.call_cost && Array.isArray(data.call_cost.product_costs)) {
          totalCost = data.call_cost.product_costs.reduce((sum: number, product: any) => {
            return sum + (product.cost || 0);
          }, 0);
          
          // Convert to dollars if needed (assuming cost is in cents)
          totalCost = totalCost / 100;
          
          // Add the total cost to the response
          data.total_cost_dollars = totalCost;
        }
        
        console.log("Call data retrieved successfully via direct API");
        return NextResponse.json(data);
      } catch (fetchError) {
        console.error("Error in direct API call:", fetchError);
        return NextResponse.json(
          { error: "Failed to fetch call data from Retell API", details: fetchError instanceof Error ? fetchError.message : String(fetchError) },
          { status: 500 }
        );
      }
    }
  } catch (error) {
    console.error("Error in call API endpoint:", error);
    return NextResponse.json(
      { error: "Failed to process request", details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
} 