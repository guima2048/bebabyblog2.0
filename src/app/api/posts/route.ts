import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

const filePath = path.join(process.cwd(), "src/data/posts.json");

type Post = {
  slug: string;
  title: string;
  description: string;
  content: string;
  image: string;
  status: "ativo" | "rascunho";
  faqs?: { question: string; answer: string }[];
  data?: string;
};

export async function GET(request: NextRequest) {
  try {
    // Verifica se há um slug na query
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get('slug');
    
    // Caminho absoluto para o arquivo
    const filePath = path.join(process.cwd(), "src/data/posts.json");
    
    // Verifica se o arquivo existe
    try {
      await fs.access(filePath);
    } catch (error) {
      console.error('Arquivo não encontrado:', filePath);
      return NextResponse.json({ error: 'Arquivo de posts não encontrado' }, { status: 404 });
    }

    // Lê o arquivo
    const fileContent = await fs.readFile(filePath, 'utf-8');
    
    // Tenta fazer o parse do JSON
    let posts;
    try {
      posts = JSON.parse(fileContent);
    } catch (error) {
      console.error('Erro ao fazer parse do JSON:', error);
      return NextResponse.json({ error: 'Erro ao processar dados dos posts' }, { status: 500 });
    }

    // Verifica se é um array
    if (!Array.isArray(posts)) {
      console.error('Dados não são um array:', typeof posts);
      return NextResponse.json({ error: 'Formato de dados inválido' }, { status: 500 });
    }

    // Se há um slug, retorna apenas o post específico
    if (slug) {
      const post = posts.find((p: Post) => p.slug === slug);
      if (!post) {
        return NextResponse.json({ error: 'Post não encontrado' }, { status: 404 });
      }
      return new NextResponse(JSON.stringify(post), {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
          'Pragma': 'no-cache',
          'Expires': '0',
        },
      });
    }

    // Retorna todos os posts com headers CORS
    return new NextResponse(JSON.stringify(posts), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0',
      },
    });
  } catch (error) {
    console.error('Erro geral na API:', error);
    return NextResponse.json({ error: 'Erro interno do servidor' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const newPost = await req.json();
  const data = await fs.readFile(filePath, "utf-8");
  let posts = JSON.parse(data);

  // Garante slug único
  let baseSlug = newPost.slug;
  let slug = baseSlug;
  let count = 2;
  while (posts.some((p: Post) => p.slug === slug)) {
    slug = `${baseSlug}-${count}`;
    count++;
  }
  newPost.slug = slug;

  if (!newPost.data) {
    newPost.data = new Date().toISOString();
  }

  posts.push(newPost);
  await fs.writeFile(filePath, JSON.stringify(posts, null, 2));
  return NextResponse.json({ ok: true, slug });
}

export async function PUT(req: NextRequest) {
  const updatedPost = await req.json();
  const data = await fs.readFile(filePath, "utf-8");
  const posts = JSON.parse(data);

  const index = posts.findIndex((p: Post) => p.slug === updatedPost.slug);
  if (index === -1) {
    return NextResponse.json({ error: "Post não encontrado" }, { status: 404 });
  }

  posts[index] = updatedPost;
  await fs.writeFile(filePath, JSON.stringify(posts, null, 2));
  return NextResponse.json({ ok: true });
}

export async function DELETE(req: NextRequest) {
  const { slug } = await req.json();

  if (!slug) {
    return NextResponse.json({ error: "Slug é obrigatório" }, { status: 400 });
  }

  const data = await fs.readFile(filePath, "utf-8");
  const posts = JSON.parse(data);
  const filtered = posts.filter((p: Post) => p.slug !== slug);

  if (filtered.length === posts.length) {
    return NextResponse.json({ error: "Post não encontrado" }, { status: 404 });
  }

  await fs.writeFile(filePath, JSON.stringify(filtered, null, 2));
  return NextResponse.json({ ok: true });
} 