# Email and User Data Setup Guide

This guide provides instructions on how to set up and use the email functionality and user data storage in the QAULI application.

## Prerequisites

- [Resend](https://resend.com) account for email sending
- [Supabase](https://supabase.com) account for user data storage
- Node.js installed
- Updated `.env` file with your API keys

## Environment Variables

Add the following variables to your `.env` file:

```
# Resend Email Configuration
RESEND_API_KEY=your_resend_api_key_here
EMAIL_FROM="QAULI <onboarding@resend.dev>"  # Update with your verified domain when available

# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here
```

## Supabase Database Setup

Create the following tables in your Supabase database:

### 1. `users` Table

```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  phone TEXT,
  marketing_consent BOOLEAN DEFAULT FALSE,
  product_interest BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### 2. `call_records` Table

```sql
CREATE TABLE call_records (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id),
  call_id TEXT NOT NULL,
  call_duration INTEGER,
  call_summary TEXT,
  call_sentiment TEXT,
  call_successful BOOLEAN,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### 3. `interest_details` Table

```sql
CREATE TABLE interest_details (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id),
  company_size TEXT,
  lead_volume TEXT,
  current_crm TEXT,
  additional_info TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### 4. `email_logs` Table

```sql
CREATE TABLE email_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id),
  email_type TEXT NOT NULL,
  sent_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  message_id TEXT,
  call_id TEXT
);
```

## Testing Email Functionality

Use the provided test script to verify your email configuration:

```bash
node test-email.js your-email@example.com
```

See [README-email-testing.md](./README-email-testing.md) for more details on email testing.

## How It Works

### Email Flow

1. After a call ends, the `DemoCall` component fetches the call data from the Retell API.
2. It then sends an email with the call summary to the user via the `/api/email` endpoint.
3. The email includes a summary of the call, the call duration, and a link to the pricing page.
4. The email is sent using Resend and logged in the Supabase database.

### User Data Flow

1. After viewing the call summary, users are presented with a `ProductInterestDialog` to collect their interest in the product.
2. If they submit the form or consent to marketing, their data is saved to Supabase via the `/api/users` endpoint.
3. The data includes their contact information, marketing consent, product interest, and details about their company.
4. Call records and interest details are also stored in separate tables for future reference.

## API Endpoints

### `/api/email` - Send Email

Sends an email with call summary to the user.

**Request:**
```json
{
  "email": "user@example.com",
  "firstName": "John",
  "lastName": "Doe",
  "callSummary": "Summary of the call...",
  "callDuration": "2:30",
  "callId": "call_123456"
}
```

### `/api/users` - Save User Data

Saves user data to Supabase.

**Request:**
```json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "user@example.com",
  "phone": "123-456-7890",
  "marketingConsent": true,
  "productInterest": true,
  "callId": "call_123456",
  "callDuration": 150,
  "callSummary": "Summary of the call...",
  "interestDetails": {
    "companySize": "6-20",
    "leadVolume": "51-200",
    "currentCRM": "Salesforce",
    "additionalInfo": "Additional information..."
  }
}
```

### `/api/call/[callId]` - Get Call Data

Fetches call data from the Retell API.

**Response:**
```json
{
  "call_id": "call_123456",
  "start_timestamp": 1621234567890,
  "end_timestamp": 1621234597890,
  "call_analysis": {
    "call_summary": "Summary of the call...",
    "user_sentiment": "Positive",
    "call_successful": true
  }
}
```

## Troubleshooting

### Email Issues

1. **Emails Not Sending**: Check your Resend API key and sender email address.
2. **Emails Not Received**: Check spam folders and verify the recipient email address.
3. **Resend API Errors**: Check the Resend dashboard for error logs.

### Database Issues

1. **Connection Errors**: Verify your Supabase URL and API key.
2. **Permission Errors**: Check the Row Level Security (RLS) settings in Supabase.
3. **Missing Tables**: Ensure all required tables are created with the correct schema.

## Next Steps

- Set up a verified domain in Resend for better email deliverability.
- Implement email templates for different types of communications.
- Add more detailed analytics for call data and user interactions.
- Set up automated follow-up emails for interested users. 