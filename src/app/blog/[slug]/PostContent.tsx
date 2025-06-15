"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import ReactMarkdown from "react-markdown";

interface Post {
  slug: string;
  title: string;
  description: string;
  content: string;
  image: string;
  status: "ativo" | "rascunho";
  categoria?: string;
  autor?: string;
  data?: string;
}

export default function PostContent({ slug }: { slug: string }) {
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/posts?slug=${slug}`)
      .then((res) => res.json())
      .then((data) => {
        setPost(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#e9d8fd] flex items-center justify-center">
        <div className="text-2xl text-[#6b21a8]">Carregando...</div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-[#e9d8fd] flex flex-col items-center justify-center p-4">
        <h1 className="text-3xl text-[#6b21a8] mb-4">Post não encontrado</h1>
        <Link href="/" className="text-[#7c3aed] hover:text-[#6b21a8] underline">
          Voltar para a Home
        </Link>
      </div>
    );
  }

  return (
    <article className="min-h-screen bg-[#e9d8fd] py-16 px-4">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg border border-[#c4b5fd] p-8">
        <h1 className="text-4xl font-serif font-bold text-[#6b21a8] mb-4">{post.title}</h1>
        
        <div className="flex items-center gap-4 text-sm text-[#6b21a8] mb-6">
          {post.categoria && (
            <span className="bg-[#ede3fa] px-3 py-1 rounded-full">{post.categoria}</span>
          )}
          {post.autor && <span>Por {post.autor}</span>}
          {post.data && <span>{new Date(post.data).toLocaleDateString()}</span>}
        </div>

        <Image 
          src={post.image} 
          alt={post.title} 
          width={800} 
          height={400} 
          className="w-full rounded-xl mb-8 shadow-md object-cover" 
        />

        <div className="prose prose-purple max-w-none">
          <p className="text-lg text-[#6b21a8] mb-6">{post.description}</p>
          <div className="text-gray-800 leading-relaxed">
            <ReactMarkdown>{post.content}</ReactMarkdown>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-[#c4b5fd]">
          <Link 
            href="/" 
            className="inline-block bg-[#7c3aed] text-white px-6 py-2 rounded-full hover:bg-[#6b21a8] transition-colors"
          >
            Voltar para a Home
          </Link>
        </div>
      </div>
    </article>
  );
} 