# Supabase Setup Guide for HerArmor

## Step 1: Create a Supabase Account
1. Go to [supabase.com](https://supabase.com)
2. Sign up with your email or GitHub
3. Create a new project
4. Save your project URL and Anon Key from the API settings

## Step 2: Create Database Table

In Supabase SQL Editor, run this query:

```sql
CREATE TABLE locations (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  place TEXT NOT NULL,
  lat FLOAT NOT NULL,
  lng FLOAT NOT NULL,
  district TEXT NOT NULL,
  rape_cases INT DEFAULT 0,
  women_cases INT DEFAULT 0,
  score FLOAT NOT NULL,
  category TEXT NOT NULL,
  safe_time TEXT,
  unsafe_time TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Enable RLS (Row Level Security)
ALTER TABLE locations ENABLE ROW LEVEL SECURITY;

-- Allow public read access
CREATE POLICY "Allow public read" ON locations
  FOR SELECT USING (true);
```

## Step 3: Insert Sample Data

```sql
INSERT INTO locations (place, lat, lng, district, rape_cases, women_cases, score, category, safe_time, unsafe_time) VALUES
('Vellore City Center', 12.9165, 79.1325, 'Vellore', 18, 120, 96, 'Red (High)', '6 AM - 9 PM', '9 PM - 6 AM'),
('Katpadi Junction', 12.9693, 79.1452, 'Vellore', 14, 95, 75.5, 'Yellow (Moderate)', '5 AM - 10 PM', '10 PM - 5 AM'),
('Chennai', 13.0827, 80.2707, 'Chennai', 0, 0, 85, 'Red (High)', '5 AM - 10 PM', '10 PM - 5 AM'),
('Madurai', 9.9252, 78.1198, 'Madurai', 0, 0, 30, 'Green (Low)', '6 AM - 9 PM', '9 PM - 6 AM'),
('Coimbatore', 11.0168, 76.9558, 'Coimbatore', 0, 0, 55, 'Yellow (Moderate)', '7 AM - 11 PM', '11 PM - 7 AM'),
('Trichy', 10.7905, 78.7047, 'Trichy', 0, 0, 45, 'Yellow (Moderate)', '4 AM - 8 PM', '8 PM - 4 AM');
```

## Step 4: Update Your Configuration

Create a `.env` file in your project root:

```
VITE_SUPABASE_URL=your_supabase_url_here
VITE_SUPABASE_ANON_KEY=your_anon_key_here
```

## Step 5: Test Connection

Run the following in terminal:
```bash
node server.js
```

Visit `http://localhost:8000` and check the browser console for any errors.