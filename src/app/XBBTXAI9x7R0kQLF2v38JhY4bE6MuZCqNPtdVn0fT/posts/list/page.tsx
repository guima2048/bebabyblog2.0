'use client';

import { useState, useEffect } from "react";
import Link from "next/link";

type Post = {
  slug: string;
  title: string;
  description: string;
  status: "ativo" | "rascunho";
  data: string;
};

export default function ListaPosts() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      setError(null);

      const res = await fetch("/api/posts", {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'no-cache',
          'Pragma': 'no-cache'
        },
        cache: 'no-store',
        next: { revalidate: 0 }
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.error || `Erro ${res.status}`);
      }

      const data = await res.json();
      
      if (!Array.isArray(data)) {
        throw new Error('Formato de dados inválido');
      }

      setPosts(data);
    } catch (err) {
      console.error('Erro ao carregar posts:', err);
      setError(err instanceof Error ? err.message : 'Erro ao carregar posts');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const deletarPost = async (slug: string) => {
    if (!confirm('Deseja realmente excluir este post?')) return;
    try {
      const res = await fetch('/api/posts', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ slug }),
      });
      if (!res.ok) {
        throw new Error('Erro ao excluir o post');
      }
      setPosts((prev) => prev.filter((p) => p.slug !== slug));
      alert('Post excluído com sucesso!');
    } catch (err) {
      alert('Erro ao excluir o post.');
      console.error('Erro ao excluir post:', err);
    }
  };

  const recarregarPosts = () => {
    fetchPosts();
  };

  return (
    <section className="max-w-4xl mx-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Posts</h1>
        <div className="flex gap-2">
          <button
            onClick={fetchPosts}
            className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded font-semibold shadow flex items-center gap-2"
            disabled={loading}
          >
            {loading ? (
              <>
                <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
                <span>Carregando...</span>
              </>
            ) : (
              <>
                <span>↻</span>
                <span>Atualizar</span>
              </>
            )}
          </button>
          <Link
            href="/XBBTXAI9x7R0kQLF2v38JhY4bE6MuZCqNPtdVn0fT/posts/novo"
            className="bg-violet-600 hover:bg-violet-700 text-white px-4 py-2 rounded font-semibold shadow"
          >
            + Novo Post
          </Link>
        </div>
      </div>

      {error ? (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
          <p className="text-red-600 mb-2">{error}</p>
          <button
            onClick={fetchPosts}
            className="text-red-600 hover:text-red-700 font-semibold"
          >
            Tentar novamente
          </button>
        </div>
      ) : loading ? (
        <div className="flex flex-col items-center justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-violet-600 border-t-transparent"></div>
          <p className="mt-4 text-violet-600">Carregando posts...</p>
        </div>
      ) : posts.length === 0 ? (
        <div className="bg-gray-50 rounded-lg p-8 text-center">
          <p className="text-gray-600 mb-4">Nenhum post encontrado</p>
          <Link
            href="/XBBTXAI9x7R0kQLF2v38JhY4bE6MuZCqNPtdVn0fT/posts/novo"
            className="text-violet-600 hover:text-violet-700 font-semibold"
          >
            Criar primeiro post
          </Link>
        </div>
      ) : (
        <div className="grid gap-4">
          {posts.map((post) => (
            <div key={post.slug} className="bg-white border rounded-lg p-4 shadow-sm hover:shadow transition-shadow">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                <div className="flex-1">
                  <h2 className="text-lg font-semibold text-gray-900">{post.title}</h2>
                  <p className="text-sm text-gray-600 mt-1">{post.description}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <span className={`inline-block text-xs px-2 py-1 rounded ${
                      post.status === "ativo" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"
                    }`}>
                      {post.status}
                    </span>
                    <span className="text-sm text-gray-500">
                      {post.data ? new Date(post.data).toLocaleDateString('pt-BR') : '-'}
                    </span>
                  </div>
                </div>
                <div className="flex gap-3 mt-4 md:mt-0">
                  <Link
                    href={`/XBBTXAI9x7R0kQLF2v38JhY4bE6MuZCqNPtdVn0fT/posts/edit/${post.slug}`}
                    className="text-sm bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition-colors"
                  >
                    Editar
                  </Link>
                  <button
                    onClick={() => deletarPost(post.slug)}
                    className="text-sm bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded transition-colors"
                  >
                    Excluir
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
} 