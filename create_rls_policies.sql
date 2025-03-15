-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE call_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE interest_details ENABLE ROW LEVEL SECURITY;
ALTER TABLE email_logs ENABLE ROW LEVEL SECURITY;

-- Create policies for authenticated users
-- For now, we'll allow all authenticated users to read/write
-- In a production environment, you would want more restrictive policies
CREATE POLICY "Allow authenticated users to read users" 
  ON users FOR SELECT 
  USING (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated users to insert users" 
  ON users FOR INSERT 
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated users to update users" 
  ON users FOR UPDATE 
  USING (auth.role() = 'authenticated');

-- Similar policies for other tables
CREATE POLICY "Allow authenticated users to read call_records" 
  ON call_records FOR SELECT 
  USING (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated users to insert call_records" 
  ON call_records FOR INSERT 
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated users to read interest_details" 
  ON interest_details FOR SELECT 
  USING (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated users to insert interest_details" 
  ON interest_details FOR INSERT 
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated users to read email_logs" 
  ON email_logs FOR SELECT 
  USING (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated users to insert email_logs" 
  ON email_logs FOR INSERT 
  WITH CHECK (auth.role() = 'authenticated');

-- Create service role policies for server-side operations
-- These policies allow the service role to perform all operations
CREATE POLICY "Allow service role full access to users" 
  ON users 
  USING (auth.role() = 'service_role');

CREATE POLICY "Allow service role full access to call_records" 
  ON call_records 
  USING (auth.role() = 'service_role');

CREATE POLICY "Allow service role full access to interest_details" 
  ON interest_details 
  USING (auth.role() = 'service_role');

CREATE POLICY "Allow service role full access to email_logs" 
  ON email_logs 
  USING (auth.role() = 'service_role'); 