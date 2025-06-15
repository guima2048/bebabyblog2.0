import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const filePath = path.join(process.cwd(), 'src/data/autores.json');

type Autor = {
  slug: string;
  nome: string;
  bio: string;
  avatar: string;
  redes: {
    instagram?: string;
    twitter?: string;
    facebook?: string;
    youtube?: string;
    tiktok?: string;
  };
};

export async function GET() {
  const file = fs.readFileSync(filePath, 'utf-8');
  return NextResponse.json(JSON.parse(file));
}

export async function POST(req: Request) {
  const novo = await req.json();
  const file = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

  if ((file as Autor[]).find((a) => a.slug === novo.slug)) {
    return NextResponse.json({ error: 'Slug já existente' }, { status: 400 });
  }

  (file as Autor[]).push(novo);
  fs.writeFileSync(filePath, JSON.stringify(file, null, 2));
  return NextResponse.json({ ok: true });
}

export async function PUT(req: Request) {
  const dados = await req.json();
  const file = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  const idx = (file as Autor[]).findIndex((a) => a.slug === dados.slug);

  if (idx === -1) {
    return NextResponse.json({ error: 'Autor não encontrado' }, { status: 404 });
  }

  (file as Autor[])[idx] = dados;
  fs.writeFileSync(filePath, JSON.stringify(file, null, 2));
  return NextResponse.json({ ok: true });
}

export async function DELETE(req: Request) {
  const { slug } = await req.json();
  const file = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  const filtered = (file as Autor[]).filter((a) => a.slug !== slug);

  fs.writeFileSync(filePath, JSON.stringify(filtered, null, 2));
  return NextResponse.json({ ok: true });
} 