import { NextRequest, NextResponse } from "next/server";
import Retell from 'retell-sdk';

const retellClient = new Retell({
  apiKey: process.env.RETELL!,
});

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ callId: string }> }
) {
  try {
    // Await the params object before accessing its properties
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
      
      return NextResponse.json(callData);
    } catch (retellError) {
      console.error("Retell API error:", retellError);
      
      // Fallback to direct API call if SDK method fails
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
          { error: `Error from Retell API: ${response.status}` },
          { status: response.status }
        );
      }

      const data = await response.json();
      return NextResponse.json(data);
    }
  } catch (error) {
    console.error("Error fetching call data:", error);
    return NextResponse.json(
      { error: "Failed to fetch call data", details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
} 