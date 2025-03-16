// Test script to check Supabase connection
require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

// Get Supabase URL and anon key from environment variables
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

console.log('Supabase URL:', supabaseUrl ? 'Found' : 'Not found');
console.log('Supabase Anon Key:', supabaseAnonKey ? 'Found' : 'Not found');

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Supabase URL or anon key not found in environment variables');
  process.exit(1);
}

// Create Supabase client
const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function testConnection() {
  try {
    // Try to get the server version
    const { data, error } = await supabase.rpc('get_server_version');
    
    if (error) {
      // If the RPC function doesn't exist, try a simple query
      console.log('RPC function not found, trying a simple query...');
      const { data: tableData, error: tableError } = await supabase
        .from('users')
        .select('*')
        .limit(1);
      
      if (tableError) {
        if (tableError.code === '42P01') {
          console.error('Error: Table "users" does not exist. Please run the SQL scripts to create the tables.');
        } else {
          console.error('Error querying table:', tableError);
        }
      } else {
        console.log('Successfully connected to Supabase!');
        console.log('Table data:', tableData);
      }
    } else {
      console.log('Successfully connected to Supabase!');
      console.log('Server version:', data);
    }
  } catch (error) {
    console.error('Error connecting to Supabase:', error);
  }
}

testConnection(); 