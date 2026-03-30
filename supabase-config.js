// Initialize Supabase client
import { createClient } from '@supabase/supabase-js'

// Get credentials from environment variables or use defaults
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://your-project.supabase.co'
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'your-anon-key'

let supabase = null

try {
  supabase = createClient(supabaseUrl, supabaseKey)
  console.log('Supabase initialized successfully')
} catch (e) {
  console.warn('Supabase not configured, will use local JSON fallback')
}

// Function to load data from Supabase
export async function loadDataFromSupabase() {
  // Fallback to local JSON if Supabase not configured
  if (!supabase) {
    console.log('Loading from local JSON...')
    return await loadFromJSON()
  }

  try {
    const { data, error } = await supabase
      .from('locations')
      .select('*')

    if (error) {
      console.error('Supabase error:', error.message)
      return await loadFromJSON()
    }

    console.log('Loaded', data.length, 'locations from Supabase')

    return data.map(item => ({
      place: item.place,
      location: { lat: item.lat, lng: item.lng },
      district: item.district,
      crime: {
        rape_cases: item.rape_cases || 0,
        women_cases: item.women_cases || 0,
        score: item.score,
        category: item.category
      },
      safety_time: {
        safe: item.safe_time || '',
        unsafe: item.unsafe_time || ''
      }
    }))
  } catch (err) {
    console.error('Error connecting to Supabase:', err.message)
    console.log('Falling back to local JSON...')
    return await loadFromJSON()
  }
}

// Fallback function to load from local JSON
async function loadFromJSON() {
  try {
    const response = await fetch('combined_data.json')
    if (!response.ok) throw new Error('Failed to load JSON')
    const data = await response.json()
    console.log('Loaded', data.length, 'locations from local JSON')
    return data
  } catch (err) {
    console.error('Error loading local JSON:', err.message)
    return []
  }
}