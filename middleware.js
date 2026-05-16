import { createServerClient } from '@supabase/ssr'
import { NextResponse } from 'next/server'

const SUPABASE_URL = 'https://akzbudydjyullntdilkr.supabase.co'
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFremJ1ZHlkanl1bGxudGRpbGtyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg4NTA5NDIsImV4cCI6MjA5NDQyNjk0Mn0.CTcKqS4Tj9FCGD_TbzkEzlvMY00vPBHMILHUkD43Aok'

export async function middleware(request) {
  let supabaseResponse = NextResponse.next({ request })

  const supabase = createServerClient(
    SUPABASE_URL,
    SUPABASE_KEY,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          )
          supabaseResponse = NextResponse.next({ request })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  // getSession() reads the JWT from the cookie without a network round-trip.
  // getUser() requires a live call to Supabase which can fail in edge runtime
  // or return null for users created before autoconfirm was enabled.
  const { data: { session } } = await supabase.auth.getSession()
  const user = session?.user ?? null

  // Proteger rutas que requieren auth
  const protectedPaths = ['/dashboard', '/evaluacion/nueva']
  const isProtected = protectedPaths.some(p => request.nextUrl.pathname.startsWith(p))

  if (isProtected && !user) {
    const url = request.nextUrl.clone()
    url.pathname = '/login'
    url.searchParams.set('redirect', request.nextUrl.pathname)
    return NextResponse.redirect(url)
  }

  // Si está logueado y va al login, redirigir al dashboard
  if (request.nextUrl.pathname === '/login' && user) {
    const url = request.nextUrl.clone()
    url.pathname = '/dashboard'
    return NextResponse.redirect(url)
  }

  return supabaseResponse
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
