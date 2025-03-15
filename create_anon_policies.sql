-- Create policies for anonymous users
-- These policies allow the anon role to perform operations
-- This is needed because we're using the anon key in our application

-- Users table policies for anon role
CREATE POLICY "Allow anonymous users to read users" 
  ON users FOR SELECT 
  USING (auth.role() = 'anon');

CREATE POLICY "Allow anonymous users to insert users" 
  ON users FOR INSERT 
  WITH CHECK (auth.role() = 'anon');

CREATE POLICY "Allow anonymous users to update users" 
  ON users FOR UPDATE 
  USING (auth.role() = 'anon');

-- Call records table policies for anon role
CREATE POLICY "Allow anonymous users to read call_records" 
  ON call_records FOR SELECT 
  USING (auth.role() = 'anon');

CREATE POLICY "Allow anonymous users to insert call_records" 
  ON call_records FOR INSERT 
  WITH CHECK (auth.role() = 'anon');

-- Interest details table policies for anon role
CREATE POLICY "Allow anonymous users to read interest_details" 
  ON interest_details FOR SELECT 
  USING (auth.role() = 'anon');

CREATE POLICY "Allow anonymous users to insert interest_details" 
  ON interest_details FOR INSERT 
  WITH CHECK (auth.role() = 'anon');

-- Email logs table policies for anon role
CREATE POLICY "Allow anonymous users to read email_logs" 
  ON email_logs FOR SELECT 
  USING (auth.role() = 'anon');

CREATE POLICY "Allow anonymous users to insert email_logs" 
  ON email_logs FOR INSERT 
  WITH CHECK (auth.role() = 'anon'); 