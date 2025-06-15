'use client';

import { useState, useEffect } from "react";
import Link from "next/link";

type Post = {
  slug: string;
  title: string;
  description: string;
  status: "ativo" | "rascunho";
};

export default function ListaPosts() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/posts")
      .then((res) => res.json())
      .then((data) => {
        setPosts(data);
        setLoading(false);
      });
  }, []);

  const deletarPost = async (slug: string) => {
    const confirmDelete = confirm("Deseja mesmo excluir?");
    if (!confirmDelete) return;

    const res = await fetch("/api/posts", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ slug }),
    });

    if (res.ok) {
      alert("Post excluído com sucesso!");
      setPosts((prev) => prev.filter((p) => p.slug !== slug));
    } else {
      const data = await res.json();
      alert("Erro ao excluir: " + data.error);
    }
  };

  return (
    <section className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Posts Publicados</h1>
      {loading ? (
        <div className="text-center text-[#6b21a8]">Carregando posts...</div>
      ) : (
        <div className="grid gap-4">
          {posts.map((post) => (
            <div
              key={post.slug}
              className="border rounded-lg p-4 shadow flex flex-col md:flex-row justify-between items-start md:items-center"
            >
              <div className="flex-1">
                <h2 className="text-lg font-semibold">{post.title}</h2>
                <p className="text-sm text-gray-600">{post.description}</p>
                <span
                  className={`inline-block text-xs mt-1 px-2 py-1 rounded ${
                    post.status === "ativo" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {post.status}
                </span>
              </div>
              <div className="flex gap-3 mt-4 md:mt-0">
                <Link
                  href={`/admin/posts/edit/${post.slug}`}
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
      )}
    </section>
  );
} 