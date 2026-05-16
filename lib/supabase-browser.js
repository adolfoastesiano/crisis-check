'use client'

import { createBrowserClient } from '@supabase/ssr'

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://akzbudydjyullntdilkr.supabase.co'
const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
  || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFremJ1ZHlkanl1bGxudGRpbGtyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg4NTA5NDIsImV4cCI6MjA5NDQyNjk0Mn0.CTcKqS4Tj9FCGD_TbzkEzlvMY00vPBHMILHUkD43Aok'

export function createClient() {
  return createBrowserClient(SUPABASE_URL, SUPABASE_KEY)
}
