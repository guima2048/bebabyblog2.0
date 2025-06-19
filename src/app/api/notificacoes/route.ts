import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

interface Notificacao {
  id: string;
  tipo: string;
  titulo: string;
  descricao: string;
  mensagem?: string;
  lida: boolean;
  data: string;
}

const filePath = path.resolve('./public', 'notificacoes.json');

// Função auxiliar para ler notificações
function readNotificacoes(): Notificacao[] {
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, JSON.stringify([], null, 2));
    return [];
  }
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

// Função auxiliar para salvar notificações
function saveNotificacoes(notificacoes: Notificacao[]) {
  fs.writeFileSync(filePath, JSON.stringify(notificacoes, null, 2));
}

// GET - Buscar todas as notificações
export async function GET() {
  try {
    const notificacoes = readNotificacoes();
    return NextResponse.json(notificacoes);
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao buscar notificações' }, { status: 500 });
  }
}

// POST - Criar nova notificação
export async function POST(req: NextRequest) {
  try {
    const { tipo, titulo, descricao, mensagem } = await req.json();
    const notificacoes = readNotificacoes();
    
    const novaNotificacao: Notificacao = {
      id: Date.now().toString(),
      tipo,
      titulo,
      descricao,
      mensagem,
      lida: false,
      data: new Date().toISOString()
    };

    notificacoes.unshift(novaNotificacao);
    saveNotificacoes(notificacoes);

    return NextResponse.json(novaNotificacao);
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao criar notificação' }, { status: 500 });
  }
}

// PUT - Marcar notificações como lidas
export async function PUT(req: NextRequest) {
  try {
    const { ids } = await req.json();
    const notificacoes = readNotificacoes();

    const updatedNotificacoes = notificacoes.map((n: Notificacao) => 
      ids.includes(n.id) ? { ...n, lida: true } : n
    );

    saveNotificacoes(updatedNotificacoes);
    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao atualizar notificações' }, { status: 500 });
  }
} 