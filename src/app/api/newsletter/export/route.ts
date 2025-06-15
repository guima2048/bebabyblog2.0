import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  const file = path.resolve('./public', 'subscribers.json');

  try {
    const data = fs.existsSync(file) ? fs.readFileSync(file, 'utf8') : '[]';
    const subscribers = JSON.parse(data);

    const csv = [
      ['Email', 'Data'],
      ...subscribers.map((s: { email: string; date: string }) => [s.email, s.date])
    ]
      .map(row => row.join(','))
      .join('\n');

    return new NextResponse(csv, {
      headers: {
        'Content-Type': 'text/csv',
        'Content-Disposition': 'attachment; filename="newsletter.csv"',
      },
    });
  } catch {
    return NextResponse.json({ error: 'Erro ao gerar CSV' }, { status: 500 });
  }
} 