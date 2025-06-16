import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, password } = body;

    console.log('Tentativa de login:', { email, password });

    // ⚠️ Substitua por sua lógica real de autenticação
    const isValid = email === 'admin@bebaby.app' && password === '1234';

    if (!isValid) {
      console.log('Credenciais inválidas');
      return NextResponse.json(
        { error: 'Credenciais inválidas' },
        { status: 401 }
      );
    }

    console.log('Login bem sucedido');
    const res = NextResponse.json({ success: true });
    res.cookies.set('bebaby_admin_auth', 'logado', {
      httpOnly: true,
      path: '/',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24, // 1 dia
    });

    return res;
  } catch (error) {
    console.error('Erro no login:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}

export async function DELETE() {
  // Logout
  const res = NextResponse.json({ ok: true });
  res.cookies.set('bebaby_admin_auth', '', { 
    httpOnly: true, 
    path: '/', 
    maxAge: 0 
  });
  return res;
} 