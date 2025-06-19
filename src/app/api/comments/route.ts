import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const filePath = path.resolve(process.cwd(), 'src/data/comments.json');

function readComments() {
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, JSON.stringify([], null, 2));
    return [];
  }
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

function saveComments(comments: any[]) {
  fs.writeFileSync(filePath, JSON.stringify(comments, null, 2));
}

export async function GET() {
  try {
    const comments = readComments();
    return NextResponse.json(comments);
  } catch {
    return NextResponse.json({ error: 'Erro ao buscar comentários' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const { id, status } = await req.json();
    let comments = readComments();
    comments = comments.map((c: any, idx: number) => idx === id ? { ...c, status } : c);
    saveComments(comments);
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: 'Erro ao atualizar comentário' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { id } = await req.json();
    let comments = readComments();
    comments = comments.filter((c: any, idx: number) => idx !== id);
    saveComments(comments);
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: 'Erro ao excluir comentário' }, { status: 500 });
  }
} 