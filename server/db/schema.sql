-- Run this in your Supabase SQL Editor

CREATE TABLE IF NOT EXISTS leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  first_name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  country TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  has_downloaded BOOLEAN DEFAULT FALSE
);

-- Index for faster email lookups
CREATE INDEX IF NOT EXISTS leads_email_idx ON leads(email);
