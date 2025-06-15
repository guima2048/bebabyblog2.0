import { NextRequest, NextResponse } from 'next/server';

const COOKIE_NAME = 'bebaby_admin_auth';
const COOKIE_VALUE = 'logado';

export function middleware(req: NextRequest) {
  console.log("MIDDLEWARE TESTE GLOBAL", req.nextUrl.pathname);
  return NextResponse.redirect(new URL('/admin/login', req.url));
}

export const config = {
  matcher: ['/:path*'],
};