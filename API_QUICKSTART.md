# HerArmor API - Quick Start Guide

## Setup in 5 Minutes

### 1️⃣ Supabase Setup (2 min)

1. Go to [supabase.com](https://supabase.com) → Sign up
2. Create a new project
3. In **Settings → API Keys**, copy:
   - `Project URL`
   - `anon key`

### 2️⃣ Create Database Table (1 min)

Go to **SQL Editor** in Supabase and paste the SQL from `THUNDER_CLIENT_GUIDE.md`:
- Create `locations` table
- Enable RLS policies
- Create indexes

### 3️⃣ Configure .env (1 min)

Edit `.env` file:
```
VITE_SUPABASE_URL=https://your-project-ref.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

### 4️⃣ Run API Server (1 min)

```bash
# Terminal 1 - API Server
node api-server.js
# Output: 🚀 API Server running on http://localhost:3000
```

### 5️⃣ Test with Thunder Client

1. Install Thunder Client extension in VS Code
2. Create new collection "HerArmor"
3. Add request:
   - **Method**: GET
   - **URL**: `http://localhost:3000/api/locations`
   - **Click Send**

---

## Thunder Client Examples

### GET All Locations
```
GET http://localhost:3000/api/locations
```

### GET Location by ID
```
GET http://localhost:3000/api/locations/1
```

### ADD New Location (POST)
```
POST http://localhost:3000/api/locations

Body (JSON):
{
  "place": "Ranipet Junction",
  "lat": 12.9273,
  "lng": 79.3333,
  "district": "Vellore",
  "rape_cases": 16,
  "women_cases": 105,
  "score": 84.5,
  "category": "Yellow (Moderate)",
  "safe_time": "6 AM - 9 PM",
  "unsafe_time": "9 PM - 6 AM"
}
```

### UPDATE Location (PATCH)
```
PATCH http://localhost:3000/api/locations/1

Body (any fields):
{
  "score": 90,
  "category": "Red (High)",
  "rape_cases": 20
}
```

### DELETE Location
```
DELETE http://localhost:3000/api/locations/1
```

### GET Locations by District
```
GET http://localhost:3000/api/locations/district/Vellore
```

### Check API Health
```
GET http://localhost:3000/api/health
```

---

## Two Ways to Use

### Option A: Via API Server (Recommended)
✅ Easy to test with Thunder Client  
✅ Better for mobile/frontend apps  
✅ Can add authentication later  

```bash
node api-server.js
# Use http://localhost:3000/api/...
```

### Option B: Direct Supabase REST API
✅ No server needed  
✅ Direct database access  
✅ Requires API key in headers  

```
Base: https://your-project.supabase.co/rest/v1
Header: apikey: YOUR_ANON_KEY
```

See `THUNDER_CLIENT_GUIDE.md` for Supabase REST syntax.

---

## Troubleshooting

**Q: "Supabase initialization failed"**  
A: Check your `.env` file has correct URL and key

**Q: "Cannot read property 'from' of undefined"**  
A: Supabase not initialized. Verify credentials

**Q: CORS errors?**  
A: Use API server instead of direct REST API

**Q: Port 3000 already in use?**  
A: Edit `api-server.js` and change `PORT = 3000` to another number

---

## File Structure

```
sarada/
├── api-server.js              ← Run this for REST API
├── .env                        ← Your credentials
├── THUNDER_CLIENT_GUIDE.md     ← Supabase REST docs
├── API_QUICKSTART.md           ← This file
├── index.html                  ← Map app
└── combined_data.json          ← Fallback data
```

---

Happy API testing! 🚀