import { NextRequest, NextResponse } from 'next/server';

const USER = 'admin';
const PASS = '77330011';
const COOKIE_NAME = 'bebaby_admin_auth';
const COOKIE_VALUE = 'logado';

export async function POST(req: NextRequest) {
  const { username, password } = await req.json();
  if (username === USER && password === PASS) {
    const res = NextResponse.json({ ok: true });
    res.cookies.set(COOKIE_NAME, COOKIE_VALUE, {
      httpOnly: true,
      path: '/',
      maxAge: 60 * 60 * 8, // 8 horas
    });
    return res;
  }
  return NextResponse.json({ error: 'Usuário ou senha inválidos' }, { status: 401 });
}

export async function DELETE() {
  // Logout
  const res = NextResponse.json({ ok: true });
  res.cookies.set(COOKIE_NAME, '', { httpOnly: true, path: '/', maxAge: 0 });
  return res;
} 