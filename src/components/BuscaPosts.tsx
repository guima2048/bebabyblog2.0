'use client';

import { useState } from 'react';

interface Post {
  slug: string;
  titulo: string;
  resumo: string;
  categoria: string;
}

export default function BuscaPosts({ posts }: { posts: Post[] }) {
  const [busca, setBusca] = useState('');

  const filtrados = posts.filter((post) => {
    const termo = busca.toLowerCase();
    return (
      post.titulo.toLowerCase().includes(termo) ||
      post.resumo.toLowerCase().includes(termo) ||
      post.categoria.toLowerCase().includes(termo)
    );
  });

  return (
    <div className="w-full max-w-3xl mx-auto mb-10">
      <input
        type="text"
        placeholder="Buscar por título, resumo ou categoria..."
        className="w-full p-3 border rounded-md shadow-sm"
        value={busca}
        onChange={(e) => setBusca(e.target.value)}
      />
      {busca && (
        <ul className="mt-4 space-y-2">
          {filtrados.map((post) => (
            <li key={post.slug} className="border-b pb-2">
              <a href={`/blog/${post.slug}`} className="text-purple-700 hover:underline font-semibold">
                {post.titulo}
              </a>
              <p className="text-sm text-gray-500">{post.resumo}</p>
              <span className="text-xs text-gray-400 uppercase">{post.categoria}</span>
            </li>
          ))}
          {filtrados.length === 0 && <li className="text-gray-400">Nenhum post encontrado.</li>}
        </ul>
      )}
    </div>
  );
} 