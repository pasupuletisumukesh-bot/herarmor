# Supabase REST API Setup - Thunder Client Guide

## Step 1: Create Supabase Account & Project

1. Go to [supabase.com](https://supabase.com)
2. Sign up and create a new project
3. Copy your **Project URL** and **Anon Key** from Settings → API Keys
4. Save them safely

## Step 2: Create Database Table in Supabase

Go to SQL Editor in Supabase and run this query:

```sql
-- Drop table if exists (optional, for reset)
DROP TABLE IF EXISTS locations CASCADE;

-- Create locations table
CREATE TABLE locations (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  place TEXT NOT NULL UNIQUE,
  lat FLOAT NOT NULL,
  lng FLOAT NOT NULL,
  district TEXT NOT NULL,
  rape_cases INT DEFAULT 0,
  women_cases INT DEFAULT 0,
  score FLOAT NOT NULL,
  category TEXT NOT NULL,
  safe_time TEXT,
  unsafe_time TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Enable RLS (Row Level Security)
ALTER TABLE locations ENABLE ROW LEVEL SECURITY;

-- Allow public read/write access for testing
CREATE POLICY "Allow public read" ON locations
  FOR SELECT USING (true);

CREATE POLICY "Allow public insert" ON locations
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public update" ON locations
  FOR UPDATE USING (true);

CREATE POLICY "Allow public delete" ON locations
  FOR DELETE USING (true);

-- Create index for faster queries
CREATE INDEX idx_locations_district ON locations(district);
CREATE INDEX idx_locations_category ON locations(category);
```

## Step 3: Insert Sample Data via SQL or Thunder Client

You can insert data via SQL Editor:

```sql
INSERT INTO locations (place, lat, lng, district, rape_cases, women_cases, score, category, safe_time, unsafe_time) VALUES
('Vellore City Center', 12.9165, 79.1325, 'Vellore', 18, 120, 96, 'Red (High)', '6 AM - 9 PM', '9 PM - 6 AM'),
('Katpadi Junction', 12.9693, 79.1452, 'Vellore', 14, 95, 75.5, 'Yellow (Moderate)', '5 AM - 10 PM', '10 PM - 5 AM'),
('Coimbatore', 11.0168, 76.9558, 'Coimbatore', 0, 0, 55, 'Yellow (Moderate)', '7 AM - 11 PM', '11 PM - 7 AM'),
('Chennai', 13.0827, 80.2707, 'Chennai', 0, 0, 85, 'Red (High)', '5 AM - 10 PM', '10 PM - 5 AM'),
('Madurai', 9.9252, 78.1198, 'Madurai', 0, 0, 30, 'Green (Low)', '6 AM - 9 PM', '9 PM - 6 AM'),
('Trichy', 10.7905, 78.7047, 'Trichy', 0, 0, 45, 'Yellow (Moderate)', '4 AM - 8 PM', '8 PM - 4 AM');
```

## Step 4: Thunder Client REST API Endpoints

### Base URL:
```
https://your-project-ref.supabase.co/rest/v1
```

### Headers (Add to all requests):
```
apikey: YOUR_SUPABASE_ANON_KEY
Content-Type: application/json
```

### Endpoints:

#### 1. GET All Locations
**Method**: GET  
**URL**: `https://your-project-ref.supabase.co/rest/v1/locations`

**Headers**:
- `apikey: YOUR_ANON_KEY`

**Response**: Array of all locations

---

#### 2. GET Location by ID
**Method**: GET  
**URL**: `https://your-project-ref.supabase.co/rest/v1/locations?id=eq.1`

**Headers**:
- `apikey: YOUR_ANON_KEY`

---

#### 3. GET Locations by District
**Method**: GET  
**URL**: `https://your-project-ref.supabase.co/rest/v1/locations?district=eq.Vellore`

**Headers**:
- `apikey: YOUR_ANON_KEY`

---

#### 4. POST - Add New Location
**Method**: POST  
**URL**: `https://your-project-ref.supabase.co/rest/v1/locations`

**Headers**:
- `apikey: YOUR_ANON_KEY`
- `Content-Type: application/json`

**Body** (JSON):
```json
{
  "place": "New Location",
  "lat": 12.5,
  "lng": 79.5,
  "district": "Vellore",
  "rape_cases": 10,
  "women_cases": 50,
  "score": 65,
  "category": "Yellow (Moderate)",
  "safe_time": "5 AM - 10 PM",
  "unsafe_time": "10 PM - 5 AM"
}
```

---

#### 5. PATCH - Update Location
**Method**: PATCH  
**URL**: `https://your-project-ref.supabase.co/rest/v1/locations?id=eq.1`

**Headers**:
- `apikey: YOUR_ANON_KEY`
- `Content-Type: application/json`

**Body** (JSON) - Only include fields to update:
```json
{
  "score": 75,
  "category": "Yellow (Moderate)",
  "rape_cases": 15
}
```

---

#### 6. DELETE Location
**Method**: DELETE  
**URL**: `https://your-project-ref.supabase.co/rest/v1/locations?id=eq.1`

**Headers**:
- `apikey: YOUR_ANON_KEY`

---

## Step 5: Use Thunder Client

1. Install Thunder Client extension in VS Code
2. Create a new collection called "HerArmor API"
3. Add each endpoint as a request
4. Replace `YOUR_ANON_KEY` and `your-project-ref` with your values

### Example Thunder Client Setup:

**GET All Locations**:
- Method: GET
- URL: `{{baseUrl}}/locations`
- Set `baseUrl` variable to your Supabase REST endpoint

**POST New Location**:
- Method: POST
- URL: `{{baseUrl}}/locations`
- Headers: `apikey: {{apikey}}`
- Body: Raw JSON with location data

---

## Step 6: Update .env File

Create `.env` file in your project root:

```
VITE_SUPABASE_URL=https://your-project-ref.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

Now your app can read from the live database and you can manage data with Thunder Client!