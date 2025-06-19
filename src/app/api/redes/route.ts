import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const filePath = path.resolve(process.cwd(), 'src/data/redes.json');

function readRedes() {
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, JSON.stringify({}, null, 2));
    return {};
  }
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

function saveRedes(redes: any) {
  fs.writeFileSync(filePath, JSON.stringify(redes, null, 2));
}

export async function GET() {
  try {
    const redes = readRedes();
    return NextResponse.json(redes);
  } catch {
    return NextResponse.json({ error: 'Erro ao buscar redes sociais' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const data = await req.json();
    saveRedes(data);
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: 'Erro ao salvar redes sociais' }, { status: 500 });
  }
} 