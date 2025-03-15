// Test script to check email sending
require('dotenv').config();
const nodemailer = require('nodemailer');

// Get email configuration from environment variables
const smtpHost = process.env.SMTP_HOST;
const smtpPort = Number(process.env.SMTP_PORT);
const smtpSecure = process.env.SMTP_SECURE === 'true';
const smtpUser = process.env.SMTP_USER;
const smtpPassword = process.env.SMTP_PASSWORD;
const emailFrom = process.env.EMAIL_FROM;

console.log('SMTP Host:', smtpHost ? 'Found' : 'Not found');
console.log('SMTP Port:', smtpPort ? 'Found' : 'Not found');
console.log('SMTP User:', smtpUser ? 'Found' : 'Not found');
console.log('SMTP Password:', smtpPassword ? 'Found (hidden)' : 'Not found');
console.log('Email From:', emailFrom ? 'Found' : 'Not found');

if (!smtpHost || !smtpPort || !smtpUser || !smtpPassword || !emailFrom) {
  console.error('Email configuration not found in environment variables');
  process.exit(1);
}

// Create a transporter for sending emails
const transporter = nodemailer.createTransport({
  host: smtpHost,
  port: smtpPort,
  secure: smtpSecure,
  auth: {
    user: smtpUser,
    pass: smtpPassword,
  },
});

async function testEmail() {
  try {
    // Send a test email
    const info = await transporter.sendMail({
      from: emailFrom,
      to: smtpUser, // Send to yourself for testing
      subject: 'RELQ.AI Test Email',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2>Test Email</h2>
          <p>This is a test email from RELQ.AI to verify that email sending works.</p>
          <p>If you received this email, your email configuration is working correctly!</p>
          <p>Time sent: ${new Date().toISOString()}</p>
        </div>
      `,
    });

    console.log('Email sent successfully!');
    console.log('Message ID:', info.messageId);
  } catch (error) {
    console.error('Error sending email:', error);
  }
}

testEmail(); 