import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

interface EmailData {
  firstName: string;
  lastName: string;
  email: string;
  callSummary?: string;
  interestDetails?: {
    companySize?: string;
    leadVolume?: string;
    currentCRM?: string;
    additionalInfo?: string;
  };
}

export async function sendInterestEmail(data: EmailData) {
  const { firstName, lastName, email, callSummary, interestDetails } = data;
  
  console.log('Attempting to send email to:', email);
  
  try {
    if (callSummary) {
      // Email for users who completed the demo
      console.log('Sending demo completion email');
      const result = await resend.emails.send({
        from: process.env.EMAIL_FROM || 'QAULI <admin@untamedlogic.co>',
        to: email,
        subject: 'Thank you for your interest in QAULI!',
        html: `
          <h1>Thank you for your interest in QAULI!</h1>
          <p>Hi ${firstName},</p>
          <p>Thank you for trying our demo and expressing interest in QAULI. We're excited to have you on board!</p>
          <p>We'll be in touch soon with more information about how QAULI can help transform your real estate business.</p>
          <p>Best regards,<br>The QAULI Team</p>
        `
      });
      console.log('Demo completion email sent successfully:', result);
    } else {
      // Email for users who just expressed interest from the landing page
      console.log('Sending landing page interest email');
      const result = await resend.emails.send({
        from: process.env.EMAIL_FROM || 'QAULI <admin@untamedlogic.co>',
        to: email,
        subject: "Welcome to QAULI - We'll Keep You Updated!",
        html: `
          <h1>Welcome to QAULI!</h1>
          <p>Hi ${firstName},</p>
          <p>Thank you for your interest in QAULI! We're excited to have you join our community of forward-thinking real estate professionals.</p>
          <p>We're currently in the final stages of development, and we'll make sure you're among the first to know when we launch.</p>
          <p>In the meantime, here's what you can expect from QAULI:</p>
          <ul>
            <li>AI-powered lead qualification</li>
            <li>24/7 automated lead response</li>
            <li>Smart property recommendations</li>
            <li>Seamless CRM integration</li>
            <li>Real-time analytics and insights</li>
          </ul>
          <p>We'll keep you updated on our progress and notify you as soon as we launch with special early access pricing.</p>
          <p>Best regards,<br>The QAULI Team</p>
        `
      });
      console.log('Landing page interest email sent successfully:', result);
    }
  } catch (error) {
    console.error('Error sending email:', error);
    throw error; // Re-throw to handle in the API route
  }
} 