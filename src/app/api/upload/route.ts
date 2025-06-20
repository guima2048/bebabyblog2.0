import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import sharp from "sharp";

// Configurações
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
const UPLOAD_DIR = path.join(process.cwd(), 'public', 'uploads');

// Impede que o Next.js trate o corpo da requisição automaticamente
export const config = {
  api: {
    bodyParser: false,
  },
};

export const runtime = 'nodejs';

export async function POST(req: NextRequest) {
  try {
    // Garante que o diretório de upload exista
    await fs.mkdir(UPLOAD_DIR, { recursive: true });

    const formData = await req.formData();
    const file = formData.get('file');

    // Validações básicas
    if (!file || !(file instanceof Blob)) {
      return NextResponse.json(
        { error: 'Nenhum arquivo enviado' },
        { status: 400 }
      );
    }

    // Validação de tipo
    if (!ALLOWED_TYPES.includes(file.type)) {
      return NextResponse.json(
        { error: `Tipo de arquivo não permitido. Tipos aceitos: ${ALLOWED_TYPES.join(', ')}` },
        { status: 400 }
      );
    }

    // Validação de tamanho
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: `Arquivo muito grande. Tamanho máximo: ${MAX_FILE_SIZE / 1024 / 1024}MB` },
        { status: 400 }
      );
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Gera nome único com timestamp e hash, usando o nome original sem espaços
    const timestamp = Date.now();
    const random = Math.random().toString(36).substring(7);
    const originalName = (file.name || 'imagem').replace(/\s+/g, '-');
    const baseName = originalName.split('.').slice(0, -1).join('.') || 'imagem';
    const fileName = `${timestamp}-${random}-${baseName}.webp`;
    const filePath = path.join(UPLOAD_DIR, fileName);

    try {
      // Converte para WebP e salva
      await sharp(buffer)
        .webp({ quality: 80 })
        .toFile(filePath);

      // Retorna a URL relativa
      const url = `/uploads/${fileName}`;
      return NextResponse.json({ 
        url,
        message: 'Upload realizado com sucesso',
        details: {
          originalName: file.name,
          size: file.size,
          type: file.type,
          convertedTo: 'webp'
        }
      });
    } catch (error) {
      console.error('Erro ao processar ou salvar imagem:', error);
      // Verifica se é um erro de permissão
      if (error && typeof error === 'object' && 'code' in error && error.code === 'EACCES') {
         return NextResponse.json(
          { error: 'Erro de permissão no servidor. A aplicação não pode escrever no diretório de uploads.' },
          { status: 500 }
        );
      }
      return NextResponse.json(
        { error: 'Erro ao processar a imagem. Verifique se o arquivo é uma imagem válida.' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Erro no upload:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor durante o upload' },
      { status: 500 }
    );
  }
} 