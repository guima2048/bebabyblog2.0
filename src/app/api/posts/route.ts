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

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const slug = searchParams.get("slug");
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "10", 10);
    const status = searchParams.get("status"); // 'ativo' ou 'all'

    const data = await fs.readFile(filePath, "utf-8");
    let posts: Post[] = JSON.parse(data);

    // Se um slug for fornecido, retorna o post específico
    if (slug) {
      const post = posts.find((p) => p.slug === slug);
      if (post) {
        return NextResponse.json(post);
      }
      return NextResponse.json({ error: "Post não encontrado" }, { status: 404 });
    }

    // Filtra posts por status ('ativo' por padrão, 'all' para o admin)
    const filteredPosts = status === 'all' 
      ? posts 
      : posts.filter(p => p.status === 'ativo');
    
    // Ordena os posts por data (do mais novo para o mais antigo)
    filteredPosts.sort((a, b) => {
      const dateA = a.data ? new Date(a.data).getTime() : 0;
      const dateB = b.data ? new Date(b.data).getTime() : 0;
      return dateB - dateA;
    });

    // Lógica de paginação
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const paginatedPosts = filteredPosts.slice(startIndex, endIndex);

    return NextResponse.json({
      posts: paginatedPosts,
      totalPosts: filteredPosts.length,
      currentPage: page,
      totalPages: Math.ceil(filteredPosts.length / limit),
    });

  } catch (error) {
    console.error("Erro ao ler os posts:", error);
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 });
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
  const { originalSlug, ...postData } = updatedPost;
  
  const data = await fs.readFile(filePath, "utf-8");
  const posts = JSON.parse(data);

  // Usa o slug original para encontrar o post, ou o slug novo se o original não for fornecido
  const slugToFind = originalSlug || postData.slug;

  const index = posts.findIndex((p: Post) => p.slug === slugToFind);

  if (index === -1) {
    return NextResponse.json({ error: "Post não encontrado" }, { status: 404 });
  }

  // Remove o 'originalSlug' do objeto antes de salvar para não poluir o JSON
  delete postData.originalSlug;

  posts[index] = { ...posts[index], ...postData };
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