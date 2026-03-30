// Initialize Supabase client
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'YOUR_SUPABASE_URL'
const supabaseKey = 'YOUR_SUPABASE_ANON_KEY'
const supabase = createClient(supabaseUrl, supabaseKey)

// Function to load data from Supabase
async function loadDataFromSupabase() {
  const { data, error } = await supabase
    .from('locations')
    .select('*')

  if (error) {
    console.error('Error loading data:', error)
    return []
  }

  return data.map(item => ({
    place: item.place,
    location: { lat: item.lat, lng: item.lng },
    district: item.district,
    crime: {
      rape_cases: item.rape_cases,
      women_cases: item.women_cases,
      score: item.score,
      category: item.category
    },
    safety_time: {
      safe: item.safe_time,
      unsafe: item.unsafe_time
    }
  }))
}