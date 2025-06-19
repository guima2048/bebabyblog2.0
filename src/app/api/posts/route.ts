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
  const { searchParams } = new URL(req.url);
  const slug = searchParams.get("slug");
  const data = await fs.readFile(filePath, "utf-8");
  const posts: Post[] = JSON.parse(data);

  if (slug) {
    const post = posts.find((p) => p.slug === slug);
    return NextResponse.json(post || null);
  }

  return NextResponse.json(posts);
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