'use client';

import { useState } from "react";

const fakePosts = [
  { slug: "como-pedir-mimos", status: "aprovado" },
  { slug: "luxo-e-limites", status: "pendente" },
  { slug: "dicas-sugar-babies", status: "aprovado" },
];

export default function ModeracaoComentarios() {
  const [comentarios, setComentarios] = useState(fakePosts);

  const aprovar = (slug: string) => {
    setComentarios((prev) =>
      prev.map((c) => (c.slug === slug ? { ...c, status: "aprovado" } : c))
    );
  };

  const recusar = (slug: string) => {
    setComentarios((prev) =>
      prev.map((c) => (c.slug === slug ? { ...c, status: "recusado" } : c))
    );
  };

  return (
    <section className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Moderação de Comentários</h1>
      <table className="w-full border text-sm">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="p-2">Post</th>
            <th className="p-2">Status</th>
            <th className="p-2">Ações</th>
          </tr>
        </thead>
        <tbody>
          {comentarios.map(({ slug, status }) => (
            <tr key={slug} className="border-t">
              <td className="p-2">{slug}</td>
              <td className="p-2 capitalize">{status}</td>
              <td className="p-2 space-x-2">
                <button
                  className="bg-green-600 text-white px-3 py-1 rounded"
                  onClick={() => aprovar(slug)}
                >
                  Aprovar
                </button>
                <button
                  className="bg-red-600 text-white px-3 py-1 rounded"
                  onClick={() => recusar(slug)}
                >
                  Recusar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
} 