import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const response = NextResponse.next()

  // Cache principal pour 1 heure, mais permet une revalidation en arrière-plan
  response.headers.set(
    'Cache-Control',
    'public, s-maxage=3600, stale-while-revalidate=59'
  )

  return response
}

// Configurer sur quelles routes le middleware s'applique
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * 1. /api routes
     * 2. /_next (Next.js internals)
     * 3. /_static (inside /public)
     * 4. /_vercel (Vercel internals)
     * 5. /images (inside /public)
     * 6. all root files inside /public (e.g. /favicon.ico)
     */
    '/((?!api|_next|_static|_vercel|images|[\\w-]+\\.\\w+).*)',
  ],
} 