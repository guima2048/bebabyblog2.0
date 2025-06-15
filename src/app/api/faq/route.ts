import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

const filePath = path.join(process.cwd(), 'src/data/faq.json');

type Faq = { id: number; pergunta: string; resposta: string };

export async function GET() {
  const data = await fs.readFile(filePath, 'utf-8').catch(() => '[]');
  return NextResponse.json(JSON.parse(data));
}

export async function POST(req: NextRequest) {
  const faq = await req.json();
  const data = await fs.readFile(filePath, 'utf-8').catch(() => '[]');
  const faqs = JSON.parse(data);
  faq.id = Date.now();
  faqs.push(faq);
  await fs.writeFile(filePath, JSON.stringify(faqs, null, 2));
  return NextResponse.json(faq);
}

export async function PUT(req: NextRequest) {
  const updatedFaq = await req.json();
  const data = await fs.readFile(filePath, 'utf-8').catch(() => '[]');
  let faqs = JSON.parse(data);
  faqs = faqs.map((faq: Faq) => faq.id === updatedFaq.id ? updatedFaq : faq);
  await fs.writeFile(filePath, JSON.stringify(faqs, null, 2));
  return NextResponse.json(updatedFaq);
}

export async function DELETE(req: NextRequest) {
  const { id } = await req.json();
  const data = await fs.readFile(filePath, 'utf-8').catch(() => '[]');
  let faqs = JSON.parse(data);
  faqs = faqs.filter((faq: Faq) => faq.id !== id);
  await fs.writeFile(filePath, JSON.stringify(faqs, null, 2));
  return NextResponse.json({ ok: true });
} 