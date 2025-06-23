import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const filePath = path.resolve(process.cwd(), 'src/data/faq.json');

function readFaqs() {
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, JSON.stringify([], null, 2));
    return [];
  }
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

function saveFaqs(faqs: any[]) {
  fs.writeFileSync(filePath, JSON.stringify(faqs, null, 2));
}

export async function GET() {
  try {
    const faqs = readFaqs();
    return NextResponse.json(faqs);
  } catch {
    return NextResponse.json({ error: 'Erro ao buscar FAQs' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const { pergunta, resposta } = await req.json();
    const faqs = readFaqs();
    const id = Date.now();
    const novaFaq = { id, pergunta, resposta };
    faqs.push(novaFaq);
    saveFaqs(faqs);
    return NextResponse.json(novaFaq);
  } catch {
    return NextResponse.json({ error: 'Erro ao adicionar FAQ' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const { id, pergunta, resposta } = await req.json();
    let faqs = readFaqs();
    faqs = faqs.map((f: any) => f.id === id ? { id, pergunta, resposta } : f);
    saveFaqs(faqs);
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: 'Erro ao editar FAQ' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { id } = await req.json();
    let faqs = readFaqs();
    faqs = faqs.filter((f: any) => f.id !== id);
    saveFaqs(faqs);
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: 'Erro ao excluir FAQ' }, { status: 500 });
  }
} 