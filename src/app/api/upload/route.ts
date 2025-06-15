import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import sharp from "sharp";

// Impede que o Next.js trate o corpo da requisição automaticamente
export const config = {
  api: {
    bodyParser: false,
  },
};

export const runtime = 'nodejs';

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const file = formData.get('file');
  if (!file || !(file instanceof Blob)) {
    return NextResponse.json({ error: 'Nenhum arquivo enviado' }, { status: 400 });
  }

  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  // Gera nome único
  const fileName = `${Date.now()}-upload.webp`;
  const uploadDir = path.join(process.cwd(), 'public', 'uploads');
  const filePath = path.join(uploadDir, fileName);

  // Garante que a pasta existe
  await fs.mkdir(uploadDir, { recursive: true });

  // Converte para WebP e salva
  await sharp(buffer)
    .webp({ quality: 80 })
    .toFile(filePath);

  // Retorna a URL relativa
  const url = `/uploads/${fileName}`;
  return NextResponse.json({ url });
} 