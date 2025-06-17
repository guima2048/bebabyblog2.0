"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Oswald } from "next/font/google";

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
  createdAt?: string;
}

const oswald = Oswald({ subsets: ["latin"], weight: ["400","700"] });

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
    <section className="bg-gradient-to-b from-[#4B1065] to-black min-h-[90vh] py-16 px-4">
      {/* HERO */}
      <div className="flex flex-col items-center mb-16">
        <h1 className={oswald.className + " text-5xl md:text-6xl font-bold text-white mb-2 tracking-tight"}>Bebaby Blog</h1>
        <p className="text-lg md:text-xl text-white mb-8 font-light">Testando edição via Cursor</p>
        <Image src="/uploads/Site de relacionamento sugar.jpg" alt="Mulher elegante" width={320} height={400} className="w-64 md:w-80 rounded-2xl mb-6 shadow-lg object-cover -mt-8" />
        <div className="text-center max-w-2xl mx-auto mb-12">
          <p className="text-white text-lg font-bold mb-2">
            Descubra histórias, dicas e segredos do universo Sugar e do patrocínio moderno.
          </p>
          <p className="text-white text-base font-light">
            Tudo o que você precisa saber para viver relacionamentos com estilo, liberdade e benefícios reais. O Bebaby Blog é seu guia exclusivo nesse novo jeito de amar.
          </p>
        </div>
      </div>

      {/* GRID DE POSTS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 -mt-16">
        {postsAtivos.length === 0 ? (
          <div className="col-span-full text-center text-white text-lg">Nenhum post cadastrado ainda.</div>
        ) : (
          postsAtivos.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`} className="bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col hover:scale-[1.02] transition-transform border border-gray-200">
              <Image src={post.image} alt={post.title} width={600} height={320} className="w-full h-56 object-contain rounded-t-2xl bg-black" />
              <div className="p-6 flex flex-col flex-1">
                <h2 className="text-2xl font-bold mb-3 text-gray-900" style={{fontFamily: oswald.style.fontFamily}}>{post.title}</h2>
                <p className="text-base text-gray-700 mb-6 flex-1">{post.description}</p>
                <div className="flex items-center gap-2 text-sm text-gray-500 mt-auto">
                  <span className="font-bold text-gray-700">Talita Rangel</span>
                  <span>•</span>
                  <span>{post.createdAt ? new Date(post.createdAt).toLocaleDateString('pt-BR') : (post.data ? new Date(post.data).toLocaleDateString('pt-BR') : null)}</span>
                </div>
              </div>
            </Link>
          ))
        )}
      </div>
    </section>
  );
}
