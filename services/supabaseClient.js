import { createClient } from '@supabase/supabase-js'

// Create a single Supabase client for interacting with your database

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANONKEY

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseKey)

// Provide a safe no-op mock when Supabase is not configured so the app can run
const createMockSupabase = () => {
    const mock = {
        auth: {
            getUser: async () => ({ data: { user: null }, error: null }),
            signInWithOAuth: async ({ provider, options }) => {
                console.warn(`Mock Supabase: signInWithOAuth called with provider: ${provider}`);
                console.warn('To enable OAuth authentication, please set up your Supabase environment variables:');
                console.warn('1. Create a .env.local file in your project root');
                console.warn('2. Add NEXT_PUBLIC_SUPABASE_URL=your_supabase_url');
                console.warn('3. Add NEXT_PUBLIC_SUPABASE_ANONKEY=your_supabase_anon_key');
                return { data: null, error: { message: 'Supabase not configured. Please set up environment variables.' } };
            }
        },
        from: () => ({
            // select().eq(...) chain used in Provider
            select: () => ({
                eq: async () => ({ data: [], error: null })
            }),
            // insert(...) used in Provider
            insert: async () => ({ data: [], error: null })
        })
    }
    return mock
}

export const supabase = isSupabaseConfigured
    ? createClient(
        supabaseUrl,
        supabaseKey
    )
    : createMockSupabase()