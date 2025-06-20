import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const filePath = path.resolve(process.cwd(), 'src/data/comments.json');

// Interface para garantir a tipagem dos comentários
interface Comment {
  slug: string;
  nome: string;
  texto: string;
  data: string;
  status: 'aprovado' | 'pendente' | 'rejeitado';
}

function readComments(): Comment[] {
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, JSON.stringify([], null, 2));
    return [];
  }
  try {
    const fileContent = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(fileContent);
  } catch (e) {
    console.error("Erro ao ler ou parsear comments.json:", e);
    return []; // Retorna array vazio em caso de erro
  }
}

function saveComments(comments: Comment[]) {
  fs.writeFileSync(filePath, JSON.stringify(comments, null, 2));
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const slug = searchParams.get('slug');

    if (!slug) {
      return NextResponse.json({ error: 'Slug do post é obrigatório' }, { status: 400 });
    }

    const allComments = readComments();
    
    // Filtra os comentários pelo slug e pelo status 'aprovado'
    const postComments = allComments.filter(
      (comment) => comment.slug === slug && comment.status === 'aprovado'
    );
    
    return NextResponse.json(postComments);

  } catch (error) {
    console.error("Erro em GET /api/comments:", error);
    return NextResponse.json({ error: 'Erro ao buscar comentários' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { slug, nome, texto } = body;

    if (!slug || !nome || !texto) {
      return NextResponse.json({ error: 'Campos obrigatórios faltando' }, { status: 400 });
    }

    const newComment: Comment = {
      slug,
      nome,
      texto,
      data: new Date().toISOString(),
      status: 'pendente', // Novos comentários ficam pendentes de moderação
    };

    const comments = readComments();
    comments.push(newComment);
    saveComments(comments);

    return NextResponse.json({ message: 'Comentário enviado com sucesso e aguarda moderação.' }, { status: 201 });

  } catch (error) {
    console.error("Erro em POST /api/comments:", error);
    return NextResponse.json({ error: 'Erro ao salvar comentário' }, { status: 500 });
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