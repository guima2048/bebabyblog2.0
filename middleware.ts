import { NextRequest, NextResponse } from 'next/server'

const COOKIE_NAME = 'bebaby_admin_auth'
const COOKIE_VALUE = 'logado'

export function middleware(req: NextRequest) {
  const isPainelPath = req.nextUrl.pathname.startsWith('/XBBT-XAI9x7R0kQLF2v38JhY4bE6MuZCqNPtdVn0fT')
  const isLoginPage = req.nextUrl.pathname === '/XBBT-XAI9x7R0kQLF2v38JhY4bE6MuZCqNPtdVn0fT/login'

  const cookie = req.cookies.get(COOKIE_NAME)?.value

  // Se estiver na área admin e não estiver logado, redireciona pro login
  if (isPainelPath && !isLoginPage && cookie !== COOKIE_VALUE) {
    return NextResponse.redirect(new URL('/XBBT-XAI9x7R0kQLF2v38JhY4bE6MuZCqNPtdVn0fT/login', req.url))
  }

  // Senão segue o baile
  return NextResponse.next()
}

export const config = {
  matcher: ['/XBBT-XAI9x7R0kQLF2v38JhY4bE6MuZCqNPtdVn0fT/:path*'],
}
