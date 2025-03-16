// Test script to check email sending with Resend
require('dotenv').config();
const { Resend } = require('resend');

// Get Resend API key from environment variables
const resendApiKey = process.env.RESEND_API_KEY;
const emailFrom = process.env.EMAIL_FROM;

console.log('Resend API Key:', resendApiKey ? 'Found' : 'Not found');
console.log('Email From:', emailFrom ? 'Found' : 'Not found');

if (!resendApiKey || !emailFrom) {
  console.error('Resend configuration not found in environment variables');
  process.exit(1);
}

// Initialize Resend client
const resend = new Resend(resendApiKey);

// Get recipient email from command line argument or use a default
const recipientEmail = process.argv[2] || 'khizr.malik5@gmail.com';
console.log(`Sending test email to: ${recipientEmail}`);

async function testEmail() {
  try {
    // Send a test email using Resend
    const { data, error } = await resend.emails.send({
      from: emailFrom,
      to: recipientEmail,
      subject: 'QAULI Test Email via Resend',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 5px;">
          <div style="text-align: center; margin-bottom: 20px;">
            <h1 style="color: #333;">Test Email</h1>
          </div>
          
          <p>This is a test email from QAULI to verify that email sending with Resend works correctly.</p>
          
          <p>If you received this email, your Resend configuration is working properly!</p>
          
          <div style="background-color: #f9f9f9; padding: 15px; border-radius: 5px; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #333;">Email Details</h3>
            <p><strong>Time sent:</strong> ${new Date().toLocaleString()}</p>
            <p><strong>From:</strong> ${emailFrom}</p>
            <p><strong>To:</strong> ${recipientEmail}</p>
          </div>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="https://qauli.com/#pricing" style="background-color: #4a90e2; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; font-weight: bold;">View Our Pricing</a>
          </div>
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e0e0e0; font-size: 12px; color: #777; text-align: center;">
            <p>© 2024 QAULI. All rights reserved.</p>
          </div>
        </div>
      `,
    });

    if (error) {
      console.error('Error sending email:', error);
    } else {
      console.log('Email sent successfully!');
      console.log('Message ID:', data.id);
    }
  } catch (error) {
    console.error('Exception while sending email:', error);
  }
}

testEmail(); 