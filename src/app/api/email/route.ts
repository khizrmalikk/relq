import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import nodemailer from 'nodemailer';

// Create a transporter for sending emails
// For production, you would use a service like SendGrid, Mailgun, or Resend
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.example.com',
  port: Number(process.env.SMTP_PORT) || 587,
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER || '',
    pass: process.env.SMTP_PASSWORD || '',
  },
});

export async function POST(request: NextRequest) {
  try {
    const { email, firstName, lastName, callSummary, callDuration, callId } = await request.json();
    
    if (!email) {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 }
      );
    }

    // Send email
    const info = await transporter.sendMail({
      from: process.env.EMAIL_FROM || '"RELQ.AI" <noreply@example.com>',
      to: email,
      subject: 'Your AI Call Summary',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2>Hello ${firstName},</h2>
          <p>Thank you for your recent conversation with our AI assistant.</p>
          
          <div style="background-color: #f7f7f7; padding: 15px; border-radius: 5px; margin: 20px 0;">
            <h3 style="margin-top: 0;">Call Summary</h3>
            <p>${callSummary || "Your call has been completed successfully."}</p>
            
            ${callDuration ? `<p><strong>Call Duration:</strong> ${callDuration}</p>` : ''}
          </div>
          
          <p>If you have any questions or would like to schedule a follow-up with a human agent, please don't hesitate to reply to this email.</p>
          
          <p>Best regards,<br>Your Real Estate Team</p>
        </div>
      `,
    });

    // Record email sent in Supabase (optional)
    if (email) {
      // Find user by email
      const { data: user, error: userError } = await supabase
        .from('users')
        .select('id')
        .eq('email', email)
        .single();
      
      if (!userError && user) {
        // Add email sent record
        const { error: emailError } = await supabase
          .from('email_logs')
          .insert({
            user_id: user.id,
            email_type: 'call_summary',
            sent_at: new Date().toISOString(),
            message_id: info.messageId,
            call_id: callId || null
          });
        
        if (emailError) {
          console.error("Error logging email:", emailError);
          // Continue execution - we don't want to fail the whole request if just the email log fails
        }
      }
    }

    return NextResponse.json({ success: true, messageId: info.messageId });
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json(
      { error: "Failed to send email", details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
} 