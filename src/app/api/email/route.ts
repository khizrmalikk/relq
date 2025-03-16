import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { createClient } from "@/lib/supabase";

// Initialize Resend with API key
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, firstName, lastName, callSummary, callDuration, callId } = body;

    if (!email) {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 }
      );
    }

    // Send email with HTML template
    const { data, error } = await resend.emails.send({
      from: process.env.EMAIL_FROM || "QAULI <onboarding@resend.dev>",
      to: email,
      subject: "Your QAULI Call Summary",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 5px;">
          <div style="text-align: center; margin-bottom: 20px;">
            <h1 style="color: #333;">Your Call Summary</h1>
          </div>
          
          <p>Hello ${firstName || "there"},</p>
          
          <p>Thank you for trying out QAULI! Here's a summary of your recent call:</p>
          
          ${callDuration ? `<p><strong>Call Duration:</strong> ${callDuration}</p>` : ''}
          
          ${callSummary ? `
          <div style="background-color: #f9f9f9; padding: 15px; border-radius: 5px; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #333;">Call Summary</h3>
            <p style="margin-bottom: 0;">${callSummary}</p>
          </div>
          ` : ''}
          
          <p>Want to learn more about how QAULI can help your real estate business?</p>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="https://qauli.com/#pricing" style="background-color: #4a90e2; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; font-weight: bold;">View Our Pricing</a>
          </div>
          
          <p>If you have any questions, feel free to reply to this email.</p>
          
          <p>Best regards,<br>The QAULI Team</p>
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e0e0e0; font-size: 12px; color: #777; text-align: center;">
            <p>© 2024 QAULI. All rights reserved.</p>
          </div>
        </div>
      `,
    });

    if (error) {
      console.error("Error sending email:", error);
      return NextResponse.json(
        { error: "Failed to send email" },
        { status: 500 }
      );
    }

    // Log the email in Supabase if we have a user
    try {
      const supabase = createClient();
      
      // Find the user by email
      const { data: userData, error: userError } = await supabase
        .from("users")
        .select("id")
        .eq("email", email)
        .single();
      
      if (userData && !userError) {
        // Log the email in the email_logs table
        await supabase.from("email_logs").insert({
          user_id: userData.id,
          email_type: "call_summary",
          sent_at: new Date().toISOString(),
          message_id: data?.id || null,
          call_id: callId || null
        });
      }
    } catch (dbError) {
      // Just log the error but don't fail the request
      console.error("Error logging email in database:", dbError);
    }

    return NextResponse.json({ 
      success: true, 
      message: "Email sent successfully",
      id: data?.id 
    });
  } catch (error) {
    console.error("Error in email API:", error);
    return NextResponse.json(
      { error: "Failed to process request", details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
} 