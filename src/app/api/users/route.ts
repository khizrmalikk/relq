import { NextRequest, NextResponse } from "next/server";
import { supabase, User, CallRecord, InterestDetails } from "@/lib/supabase";

export async function POST(request: NextRequest) {
  try {
    const userData = await request.json();
    
    if (!userData.email) {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 }
      );
    }

    // Check if user already exists
    const { data: existingUser, error: userError } = await supabase
      .from('users')
      .select('id')
      .eq('email', userData.email)
      .single();
    
    if (userError && userError.code !== 'PGRST116') { // PGRST116 is "not found" error
      console.error("Error checking for existing user:", userError);
      return NextResponse.json(
        { error: "Database error when checking user" },
        { status: 500 }
      );
    }

    let userId: string;
    
    // If user doesn't exist, create a new one
    if (!existingUser) {
      const newUser: User = {
        first_name: userData.firstName,
        last_name: userData.lastName,
        email: userData.email,
        phone: userData.phone || null,
        marketing_consent: userData.marketingConsent || false,
        product_interest: userData.productInterest || false
      };
      
      const { data: insertedUser, error: insertError } = await supabase
        .from('users')
        .insert(newUser)
        .select('id')
        .single();
      
      if (insertError) {
        console.error("Error creating user:", insertError);
        return NextResponse.json(
          { error: "Failed to create user" },
          { status: 500 }
        );
      }
      
      userId = insertedUser.id;
    } else {
      // Update existing user
      userId = existingUser.id;
      
      const updateData = {
        marketing_consent: userData.marketingConsent,
        product_interest: userData.productInterest || false,
        updated_at: new Date().toISOString()
      };
      
      const { error: updateError } = await supabase
        .from('users')
        .update(updateData)
        .eq('id', userId);
      
      if (updateError) {
        console.error("Error updating user:", updateError);
        return NextResponse.json(
          { error: "Failed to update user" },
          { status: 500 }
        );
      }
    }
    
    // If there's call data, store it
    if (userData.callId) {
      const callRecord: CallRecord = {
        user_id: userId,
        call_id: userData.callId,
        call_duration: userData.callDuration || null,
        call_summary: userData.callSummary || null,
        call_sentiment: userData.call_analysis?.user_sentiment || null,
        call_successful: userData.call_analysis?.call_successful || null,
        call_cost: userData.callCost || null
      };
      
      const { error: callError } = await supabase
        .from('call_records')
        .insert(callRecord);
      
      if (callError) {
        console.error("Error storing call record:", callError);
        // Continue execution - we don't want to fail the whole request if just the call record fails
      }
    }
    
    // If there's interest data, store it
    if (userData.productInterest && userData.interestDetails) {
      const interestDetails: InterestDetails = {
        user_id: userId,
        company_size: userData.interestDetails.companySize || null,
        lead_volume: userData.interestDetails.leadVolume || null,
        current_crm: userData.interestDetails.currentCRM || null,
        additional_info: userData.interestDetails.additionalInfo || null
      };
      
      const { error: interestError } = await supabase
        .from('interest_details')
        .insert(interestDetails);
      
      if (interestError) {
        console.error("Error storing interest details:", interestError);
        // Continue execution - we don't want to fail the whole request if just the interest details fail
      }
    }

    return NextResponse.json({ success: true, userId });
  } catch (error) {
    console.error("Error saving user data:", error);
    return NextResponse.json(
      { error: "Failed to save user data", details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
} 