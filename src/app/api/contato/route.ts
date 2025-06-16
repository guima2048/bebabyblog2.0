import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: NextRequest) {
  const { nome, email, assunto, mensagem } = await req.json();

  const transporter = nodemailer.createTransport({
    host: 'smtp.seudominio.com',
    port: 465,
    secure: true,
    auth: {
      user: 'suporte@seudominio.com',
      pass: 'SENHA_REAL_AQUI',
    },
  });

  try {
    await transporter.sendMail({
      from: `"${nome}" <${email}>`,
      to: 'suporte@seudominio.com',
      subject: `Contato Bebaby Blog — ${assunto}`,
      html: `
        <p><strong>Nome:</strong> ${nome}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Assunto:</strong> ${assunto}</p>
        <p><strong>Mensagem:</strong><br/>${mensagem}</p>
      `,
    });

    // Adiciona notificação para o admin
    await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || ''}/api/notificacoes`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        tipo: 'contato',
        titulo: 'Novo contato recebido',
        descricao: `De: ${nome} (${email}) — Assunto: ${assunto}`,
        mensagem,
      }),
    });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: 'Erro ao enviar e-mail' }, { status: 500 });
  }
} 