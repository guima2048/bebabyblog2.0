"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

interface Post {
  titulo: string;
  slug: string;
  conteudo: string;
  seoTitle?: string;
  seoDescription?: string;
  categoria?: string;
  autor?: string;
  imagemCapa: string;
  data: string;
  status: string;
  image: string;
  title: string;
  description: string;
}

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    fetch("/api/posts")
      .then((res) => res.json())
      .then((data) => setPosts(data));
  }, []);

  // Mostra só posts ativos
  const postsAtivos = posts.filter((post) => post.status === "ativo");

  return (
    <section className="bg-[#e9d8fd] min-h-[90vh] py-16 px-4 flex flex-col items-center">
      {/* HERO */}
      <div className="max-w-3xl w-full flex flex-col items-center mb-16">
        <h1 className="text-5xl md:text-6xl font-serif font-bold text-[#6b21a8] mb-2 tracking-tight uppercase">BEBABY BLOG</h1>
        <p className="text-lg md:text-xl text-[#6b21a8] mb-8 font-light">Seus investimentos a levam ao crescimento</p>
        <Image src="/capa.png" alt="Mulher elegante" width={320} height={400} className="w-64 md:w-80 rounded-2xl mb-6 shadow-lg object-cover" />
        <Link href="#" className="inline-block bg-[#7c3aed] text-white px-8 py-3 rounded-full text-base font-semibold shadow-md hover:bg-[#6b21a8] transition-colors tracking-wide">DESCUBRA SEU VALOR ...</Link>
      </div>

      {/* GRID DE POSTS */}
      <div className="w-full max-w-6xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {postsAtivos.length === 0 ? (
          <div className="col-span-full text-center text-[#6b21a8] text-lg">Nenhum post cadastrado ainda.</div>
        ) : (
          postsAtivos.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`} className="bg-[#ede3fa] rounded-2xl border border-[#c4b5fd] shadow-md overflow-hidden flex flex-col hover:scale-105 transition-transform">
              <Image src={post.image} alt={post.title} width={400} height={192} className="w-full h-48 object-cover" />
              <div className="p-6 flex flex-col flex-1">
                <h2 className="text-lg font-serif font-bold text-[#6b21a8] mb-2 text-center">{post.title}</h2>
                <p className="text-sm text-[#6b21a8] opacity-80 flex-1 text-center">{post.description}</p>
              </div>
            </Link>
          ))
        )}
      </div>
    </section>
  );
}
