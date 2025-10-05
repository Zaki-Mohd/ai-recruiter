import { createClient } from '@supabase/supabase-js'

// Create a single supabase client for interacting with your database

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANONKEY

if (!supabaseUrl || !supabaseKey) {
    // Fail early with a helpful message during development
    console.warn('Supabase environment variables are missing. Make sure NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANONKEY are set.');
}

export const supabase = createClient(
    supabaseUrl || '',
    supabaseKey || ''
)