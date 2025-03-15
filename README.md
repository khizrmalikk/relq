# RELQ.AI - Real Estate Lead Qualification AI

RELQ.AI is an AI-powered solution for real estate agents and agencies to automate lead qualification and follow-up. The platform uses conversational AI to engage with potential leads, qualify them, and provide valuable insights to agents.

## Features

- **AI-Powered Calls**: Engage with leads using natural language conversations
- **Call Analysis**: Get detailed summaries and sentiment analysis after each call
- **Email Follow-up**: Automatically send call summaries to leads
- **User Data Collection**: Capture lead information and preferences
- **CRM Integration**: Store lead data for future marketing and sales activities

## Tech Stack

- **Frontend**: Next.js, React, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: Supabase
- **AI Integration**: Retell API for voice conversations
- **Email**: Nodemailer for email delivery

## Getting Started

### Prerequisites

- Node.js 16.x or higher
- npm or yarn
- Supabase account
- Retell API account
- SMTP server for email delivery

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/real-estate-agent.git
   cd real-estate-agent
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env.local` file based on `.env.example`:
   ```bash
   cp .env.example .env.local
   ```

4. Update the `.env.local` file with your API keys and configuration.

5. Set up Supabase tables:
   - Create a `users` table with fields for user information
   - Create a `call_records` table to store call data
   - Create an `interest_details` table for product interest information
   - Create an `email_logs` table to track email communications

6. Start the development server:
   ```bash
   npm run dev
   ```

7. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Database Schema

### Users Table
- `id` (UUID, primary key)
- `first_name` (text)
- `last_name` (text)
- `email` (text, unique)
- `phone` (text, optional)
- `marketing_consent` (boolean)
- `product_interest` (boolean)
- `created_at` (timestamp with timezone)
- `updated_at` (timestamp with timezone)

### Call Records Table
- `id` (UUID, primary key)
- `user_id` (UUID, foreign key to users.id)
- `call_id` (text)
- `call_duration` (integer, seconds)
- `call_summary` (text)
- `call_sentiment` (text)
- `call_successful` (boolean)
- `created_at` (timestamp with timezone)

### Interest Details Table
- `id` (UUID, primary key)
- `user_id` (UUID, foreign key to users.id)
- `company_size` (text)
- `lead_volume` (text)
- `current_crm` (text)
- `additional_info` (text)
- `created_at` (timestamp with timezone)

### Email Logs Table
- `id` (UUID, primary key)
- `user_id` (UUID, foreign key to users.id)
- `email_type` (text)
- `sent_at` (timestamp with timezone)
- `message_id` (text)
- `call_id` (text, optional)

## License

This project is licensed under the MIT License - see the LICENSE file for details.
