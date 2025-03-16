# Setup Guide for QAULI

This guide will help you fix the issues with Supabase and email functionality in your application.

## 1. Create Supabase Tables

The error `relation "public.users" does not exist` indicates that the database tables haven't been created in your Supabase instance. Follow these steps to create them:

1. Log in to your Supabase dashboard at https://app.supabase.com/
2. Select your project: "yznfjyfngvetrimhlbls"
3. Go to the "SQL Editor" section
4. Create a new query and paste the contents of the `create_tables.sql` file
5. Run the query to create the tables
6. Create another query with the contents of the `create_rls_policies.sql` file
7. Run the query to set up Row Level Security policies
8. Create a third query with the contents of the `create_anon_policies.sql` file
9. Run the query to set up anonymous access policies

## 2. Configure Email Settings

The error `Error sending email: [Error: getaddrinfo ENOTFOUND smtp.example.com]` indicates that the email settings are using placeholder values. Update your `.env` file with real email service credentials:

### For Gmail (Example)

```
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your.actual.email@gmail.com
SMTP_PASSWORD=your-app-password
EMAIL_FROM="QAULI <your.actual.email@gmail.com>"
```

Note: If you're using Gmail with 2FA enabled, you'll need to create an App Password. See: https://support.google.com/accounts/answer/185833

### For Other Email Services

Adjust the settings according to your email provider's SMTP configuration.

## 3. Verify Setup

After completing the above steps:

1. Run the test script to verify Supabase connection:
   ```
   node test-supabase.js
   ```

2. Start your application:
   ```
   npm run dev
   ```

3. Test the functionality that was previously failing.

## Troubleshooting

### Supabase Connection Issues

- Verify that your Supabase URL and anon key are correct in the `.env` file
- Check if your IP is allowed in the Supabase dashboard under Project Settings > API
- Ensure that the tables were created successfully by checking the Table Editor in the Supabase dashboard

### Email Sending Issues

- Verify that your email credentials are correct
- If using Gmail, ensure that "Less secure app access" is enabled or use an App Password
- Check if your email provider blocks SMTP access from your current IP
- Try using a different email service like SendGrid, Mailgun, or Resend

### Node.js Version Issues

Your current Node.js version (v16.17.0) is older than what some packages recommend. Consider upgrading to Node.js 18 or later for better compatibility. 