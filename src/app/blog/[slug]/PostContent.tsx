"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import CommentForm from '@/components/CommentForm';
import CommentsList from '@/components/CommentsList';

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
  faqs?: { question: string, answer: string }[];
  createdAt?: string;
}

function FAQAccordion({ faqs }: { faqs: { question: string, answer: string }[] }) {
  const [open, setOpen] = useState<number | null>(null);
  if (!faqs || faqs.length === 0) return null;
  return (
    <div className="border rounded mt-10">
      <h2 className="text-xl font-bold mb-4 p-4">Perguntas Frequentes</h2>
      {faqs.map((faq, idx) => (
        <div key={idx} className="border-b">
          <button
            className="w-full text-left p-4 font-semibold flex justify-between items-center"
            onClick={() => setOpen(open === idx ? null : idx)}
          >
            <span>{faq.question}</span>
            <span>{open === idx ? "−" : "+"}</span>
          </button>
          {open === idx && (
            <div className="p-4 pt-0 text-gray-700">{faq.answer}</div>
          )}
        </div>
      ))}
    </div>
  );
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
        <div className="flex items-center justify-between gap-2 text-sm text-gray-500 mb-4">
          <span>Publicado em {post.data ? new Date(post.data).toLocaleDateString('pt-BR') : (post.createdAt ? new Date(post.createdAt).toLocaleDateString('pt-BR') : null)}</span>
          <span className="font-bold text-gray-700">{post.autor || 'Talita Rangel'}</span>
        </div>
        <div className="flex items-center gap-4 text-sm text-[#6b21a8] mb-6">
          {post.categoria && (
            <span className="bg-[#ede3fa] px-3 py-1 rounded-full">{post.categoria}</span>
          )}
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
          <div dangerouslySetInnerHTML={{ __html: post.content }} />
        </div>

        {post.faqs && post.faqs.length > 0 && <FAQAccordion faqs={post.faqs} />}

        <CommentForm slug={post.slug} />
        <CommentsList slug={post.slug} />

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