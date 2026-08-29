import { createClient } from '@supabase/supabase-js'

// Create a single supabase client for interacting with your database

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://dummy.supabase.co'
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANONKEY || 'dummy-key'
export const supabase = createClient(
    supabaseUrl,
    supabaseKey
)