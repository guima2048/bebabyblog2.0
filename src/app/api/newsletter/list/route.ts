import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const file = path.resolve('./public', 'subscribers.json');

export async function GET() {
  try {
    const content = fs.existsSync(file)
      ? fs.readFileSync(file, 'utf8')
      : '[]';
    return NextResponse.json(JSON.parse(content));
  } catch {
    return NextResponse.json({ error: 'Erro ao ler arquivo' }, { status: 500 });
  }
} 