// api-server.js - REST API server for HerArmor with Thunder Client support
const express = require('express');
const cors = require('cors');
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Initialize Supabase
const supabaseUrl = process.env.VITE_SUPABASE_URL || 'https://your-project.supabase.co';
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY || 'your-anon-key';

let supabase;
try {
  supabase = createClient(supabaseUrl, supabaseKey);
  console.log('✅ Supabase initialized');
} catch (e) {
  console.error('❌ Supabase initialization failed:', e.message);
  console.log('Continuing without Supabase support');
}

// ============ ROUTES ============

// GET all locations
app.get('/api/locations', async (req, res) => {
  try {
    if (!supabase) return res.status(503).json({ error: 'Database not available' });

    const { data, error } = await supabase
      .from('locations')
      .select('*');

    if (error) throw error;
    res.json({ success: true, data });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});

// GET location by ID
app.get('/api/locations/:id', async (req, res) => {
  try {
    if (!supabase) return res.status(503).json({ error: 'Database not available' });

    const { id } = req.params;
    const { data, error } = await supabase
      .from('locations')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    res.json({ success: true, data });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});

// GET locations by district
app.get('/api/locations/district/:district', async (req, res) => {
  try {
    if (!supabase) return res.status(503).json({ error: 'Database not available' });

    const { district } = req.params;
    const { data, error } = await supabase
      .from('locations')
      .select('*')
      .eq('district', district);

    if (error) throw error;
    res.json({ success: true, data });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});

// POST - Add new location
app.post('/api/locations', async (req, res) => {
  try {
    if (!supabase) return res.status(503).json({ error: 'Database not available' });

    const { place, lat, lng, district, rape_cases, women_cases, score, category, safe_time, unsafe_time } = req.body;

    // Validation
    if (!place || lat === undefined || lng === undefined || !district || score === undefined) {
      return res.status(400).json({ success: false, error: 'Missing required fields' });
    }

    const { data, error } = await supabase
      .from('locations')
      .insert([{
        place,
        lat,
        lng,
        district,
        rape_cases: rape_cases || 0,
        women_cases: women_cases || 0,
        score,
        category: category || 'Unknown',
        safe_time: safe_time || '',
        unsafe_time: unsafe_time || ''
      }])
      .select();

    if (error) throw error;
    res.status(201).json({ success: true, data: data[0], message: 'Location added successfully' });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});

// PATCH - Update location
app.patch('/api/locations/:id', async (req, res) => {
  try {
    if (!supabase) return res.status(503).json({ error: 'Database not available' });

    const { id } = req.params;
    const updates = req.body;

    // Don't allow updating id or created_at
    delete updates.id;
    delete updates.created_at;

    const { data, error } = await supabase
      .from('locations')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select();

    if (error) throw error;
    if (data.length === 0) return res.status(404).json({ success: false, error: 'Location not found' });

    res.json({ success: true, data: data[0], message: 'Location updated successfully' });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});

// DELETE location
app.delete('/api/locations/:id', async (req, res) => {
  try {
    if (!supabase) return res.status(503).json({ error: 'Database not available' });

    const { id } = req.params;
    const { data, error } = await supabase
      .from('locations')
      .delete()
      .eq('id', id)
      .select();

    if (error) throw error;
    if (data.length === 0) return res.status(404).json({ success: false, error: 'Location not found' });

    res.json({ success: true, message: 'Location deleted successfully' });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    database: supabase ? 'Connected' : 'Not configured',
    timestamp: new Date().toISOString()
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`\n🚀 API Server running on http://localhost:${PORT}`);
  console.log(`📍 Base URL: http://localhost:${PORT}/api`);
  console.log(`\n📚 Available endpoints:`);
  console.log(`  GET    /api/locations`);
  console.log(`  GET    /api/locations/:id`);
  console.log(`  GET    /api/locations/district/:district`);
  console.log(`  POST   /api/locations`);
  console.log(`  PATCH  /api/locations/:id`);
  console.log(`  DELETE /api/locations/:id`);
  console.log(`  GET    /api/health\n`);
});