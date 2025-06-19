"use client";
import { useEffect, useState } from "react";

interface Comentario {
  slug: string;
  nome: string;
  email: string;
  telefone: string;
  texto: string;
  status: string;
  data: string;
}

export default function ModeracaoComentarios() {
  const [comentarios, setComentarios] = useState<Comentario[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/comments")
      .then((res) => res.json())
      .then((data) => {
        setComentarios(data);
        setLoading(false);
      });
  }, []);

  const aprovar = async (idx: number) => {
    await fetch("/api/comments", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: idx, status: "aprovado" }),
    });
    setComentarios((prev) => prev.map((c, i) => i === idx ? { ...c, status: "aprovado" } : c));
  };

  const recusar = async (idx: number) => {
    await fetch("/api/comments", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: idx, status: "recusado" }),
    });
    setComentarios((prev) => prev.map((c, i) => i === idx ? { ...c, status: "recusado" } : c));
  };

  const excluir = async (idx: number) => {
    if (!confirm("Deseja excluir este comentário?")) return;
    await fetch("/api/comments", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: idx }),
    });
    setComentarios((prev) => prev.filter((_, i) => i !== idx));
  };

  return (
    <section className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Moderação de Comentários</h1>
      {loading ? (
        <div className="text-center text-[#6b21a8]">Carregando comentários...</div>
      ) : comentarios.length === 0 ? (
        <div className="text-center text-[#6b21a8]">Nenhum comentário cadastrado ainda.</div>
      ) : (
        <table className="w-full border text-sm">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-2">Post</th>
              <th className="p-2">Nome</th>
              <th className="p-2">Comentário</th>
              <th className="p-2">Status</th>
              <th className="p-2">Data</th>
              <th className="p-2">Ações</th>
            </tr>
          </thead>
          <tbody>
            {comentarios.map((c, idx) => (
              <tr key={idx} className="border-t">
                <td className="p-2">{c.slug}</td>
                <td className="p-2">{c.nome}</td>
                <td className="p-2">{c.texto}</td>
                <td className="p-2 capitalize">{c.status}</td>
                <td className="p-2">{new Date(c.data).toLocaleString("pt-BR")}</td>
                <td className="p-2 space-x-2">
                  <button
                    className="bg-green-600 text-white px-3 py-1 rounded"
                    onClick={() => aprovar(idx)}
                  >
                    Aprovar
                  </button>
                  <button
                    className="bg-red-600 text-white px-3 py-1 rounded"
                    onClick={() => recusar(idx)}
                  >
                    Recusar
                  </button>
                  <button
                    className="bg-gray-400 text-white px-3 py-1 rounded"
                    onClick={() => excluir(idx)}
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </section>
  );
} 