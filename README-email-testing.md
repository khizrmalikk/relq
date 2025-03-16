# Email Testing with Resend

This document provides instructions on how to test the email functionality in the QAULI application using Resend.

## Prerequisites

- Node.js installed
- Resend API key (available in your Resend dashboard)
- Updated `.env` file with your Resend API key

## Setup

1. Make sure your `.env` file contains the following variables:

```
RESEND_API_KEY=your_resend_api_key_here
EMAIL_FROM="QAULI <onboarding@resend.dev>"  # Update with your verified domain when available
```

2. Install the required dependencies:

```bash
npm install resend dotenv
```

## Running the Test Script

The test script (`test-email.js`) allows you to send a test email using Resend to verify that your email configuration is working correctly.

### Basic Usage

```bash
node test-email.js your-email@example.com
```

Replace `your-email@example.com` with the email address where you want to receive the test email.

If you don't provide an email address, the script will use a default email address specified in the script.

### What the Test Script Does

1. Loads environment variables from your `.env` file
2. Initializes the Resend client with your API key
3. Sends a test email with HTML content similar to what would be sent in the actual application
4. Logs the result of the email sending operation

### Expected Output

If the email is sent successfully, you should see output similar to:

```
Resend API Key: Found
Email From: Found
Sending test email to: your-email@example.com
Email sent successfully!
Message ID: 1234abcd-5678-efgh-9012-ijklmnopqrst
```

You should also receive the test email in your inbox shortly after running the script.

## Troubleshooting

If you encounter any issues:

1. **API Key Not Found**: Make sure your `.env` file contains the correct `RESEND_API_KEY` variable.

2. **Email From Not Found**: Make sure your `.env` file contains the correct `EMAIL_FROM` variable.

3. **Error Sending Email**: Check the error message for details. Common issues include:
   - Invalid API key
   - Invalid sender email (not verified in Resend)
   - Rate limiting
   - Network issues

4. **Email Not Received**: Check your spam folder. Also, verify that the recipient email address is correct.

## Integration with the Application

The application uses the same Resend configuration to send emails after calls. The test script is a simplified version of this functionality to help you verify that your Resend setup is working correctly.

The main email sending functionality is implemented in `src/app/api/email/route.ts`, which uses the same Resend client to send emails with call summaries. 