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
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/posts?page=${currentPage}&limit=10&status=all`)
      .then((res) => res.json())
      .then((data) => {
        if (data.posts) {
          setPosts(data.posts);
          setTotalPages(data.totalPages);
        } else {
          setPosts([]); // Em caso de erro ou resposta inesperada
        }
        setLoading(false);
      });
  }, [currentPage]);

  const deletarPost = async (slug: string) => {
    if (!confirm('Deseja realmente excluir este post?')) return;
    const res = await fetch('/api/posts', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ slug }),
    });
    if (res.ok) {
      // Recarrega a página atual para refletir a remoção
      setCurrentPage(1); // Ou apenas refaz o fetch
      alert('Post excluído com sucesso!');
    } else {
      alert('Erro ao excluir o post.');
    }
  };

  return (
    <section className="max-w-4xl mx-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Posts</h1>
        <Link href="/XBBTXAI9x7R0kQLF2v38JhY4bE6MuZCqNPtdVn0fT/posts/novo" className="bg-violet-600 hover:bg-violet-700 text-white px-4 py-2 rounded font-semibold shadow">
          + Novo Post
        </Link>
      </div>
      {loading ? (
        <div className="text-center text-[#6b21a8]">Carregando posts...</div>
      ) : posts.length === 0 ? (
        <div className="text-center text-gray-500">Nenhum post encontrado.</div>
      ) : (
        <>
          <div className="grid gap-4">
            {posts.map((post) => (
              <div key={post.slug} className="border rounded-lg p-4 shadow flex flex-col md:flex-row justify-between items-start md:items-center">
                <div className="flex-1">
                  <h2 className="text-lg font-semibold">{post.title}</h2>
                  <p className="text-sm text-gray-600">{post.description}</p>
                  <span className={`inline-block text-xs mt-1 px-2 py-1 rounded ${
                    post.status === "ativo" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"
                  }`}>
                    {post.status}
                  </span>
                  <span className="p-2 block">{post.data ? new Date(post.data).toLocaleDateString('pt-BR') : '-'}</span>
                </div>
                <div className="flex gap-3 mt-4 md:mt-0">
                  <Link
                    href={`/XBBTXAI9x7R0kQLF2v38JhY4bE6MuZCqNPtdVn0fT/posts/edit/${post.slug}`}
                    className="text-sm bg-blue-600 text-white px-4 py-2 rounded"
                  >
                    Editar
                  </Link>
                  <button
                    onClick={() => deletarPost(post.slug)}
                    className="text-sm bg-red-600 text-white px-4 py-2 rounded"
                  >
                    Excluir
                  </button>
                </div>
              </div>
            ))}
          </div>

          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-4 mt-8">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg disabled:opacity-50"
              >
                Anterior
              </button>
              <span>
                Página {currentPage} de {totalPages}
              </span>
              <button
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg disabled:opacity-50"
              >
                Próxima
              </button>
            </div>
          )}
        </>
      )}
    </section>
  );
} 