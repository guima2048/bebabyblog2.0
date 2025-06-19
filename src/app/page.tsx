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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    console.log("Iniciando carregamento dos posts...");
    setLoading(true);
    
    fetch("/api/posts")
      .then((res) => {
        console.log("Resposta da API:", res.status);
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        console.log("Dados recebidos:", data);
        setPosts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Erro ao carregar posts:", err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  // Mostra só posts ativos
  const postsAtivos = posts
    .filter((post) => post.status === "ativo")
    .sort((a, b) => {
      const dateA = new Date(a.data || a.createdAt || '');
      const dateB = new Date(b.data || b.createdAt || '');
      return dateA.getTime() - dateB.getTime(); // ordem crescente (mais antigos primeiro)
    });

  console.log("Posts ativos:", postsAtivos);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Erro ao carregar posts</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
          >
            Tentar novamente
          </button>
        </div>
      </div>
    );
  }

  return (
    <section className="bg-gradient-to-b from-[#4B1065] to-black min-h-[90vh] py-16 px-4">
      {/* HERO */}
      <div className="flex flex-col items-center mb-16">
        <h1 className={oswald.className + " text-5xl md:text-6xl font-bold text-white mb-2 tracking-tight"}>Bebaby Blog</h1>
        <p className="text-lg md:text-xl text-white mb-8 font-light">Tudo sobre Relacionamento Sugar</p>
        <Image src="/uploads/site-de-relacionamento-sugar.webp" alt="Mulher elegante" width={320} height={400} className="w-64 md:w-80 rounded-2xl mb-6 shadow-lg object-cover -mt-8" />
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
              {post.image && post.image.trim() !== "" && (
                <Image 
                  src={post.image} 
                  alt={post.title} 
                  width={600} 
                  height={320} 
                  className="w-full h-56 object-cover rounded-t-2xl bg-black"
                  unoptimized
                />
              )}
              <div className="p-6 flex flex-col flex-1">
                <h2 className="text-2xl font-bold mb-3 text-gray-900" style={{fontFamily: oswald.style.fontFamily}}>{post.title}</h2>
                <p className="text-base text-gray-700 mb-6 flex-1">{post.description}</p>
                <div className="flex items-center justify-between gap-2 text-sm text-gray-500 mt-auto">
                  <span>{post.data ? new Date(post.data).toLocaleDateString('pt-BR') : (post.createdAt ? new Date(post.createdAt).toLocaleDateString('pt-BR') : null)}</span>
                  <span className="font-bold text-gray-700">Talita Rangel</span>
                </div>
              </div>
            </Link>
          ))
        )}
      </div>
    </section>
  );
}
