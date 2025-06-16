"use client";
import { useEffect, useState } from "react";

interface Comentario {
  slug: string;
  nome: string;
  email: string;
  telefone: string;
  texto: string;
  status: "pendente" | "aprovado";
  data: string;
}

export default function ModeracaoComentarios() {
  const [comentarios, setComentarios] = useState<Comentario[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/comments?all=1")
      .then((res) => res.json())
      .then((data) => {
        setComentarios(data);
        setLoading(false);
      });
  }, []);

  const atualizarStatus = async (idx: number, status: "aprovado" | "pendente") => {
    const comentario = comentarios[idx];
    const res = await fetch("/api/comments/moderate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ slug: comentario.slug, data: comentario.data, status }),
    });
    if (res.ok) {
      setComentarios((prev) => prev.map((c, i) => i === idx ? { ...c, status } : c));
    }
  };

  const excluirComentario = async (idx: number) => {
    const comentario = comentarios[idx];
    if (!window.confirm('Tem certeza que deseja excluir este comentário?')) return;
    const res = await fetch('/api/comments/delete', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ slug: comentario.slug, data: comentario.data }),
    });
    if (res.ok) {
      setComentarios((prev) => prev.filter((_, i) => i !== idx));
    }
  };

  return (
    <section className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Moderação de Comentários</h1>
      {loading ? (
        <div>Carregando...</div>
      ) : (
        <table className="w-full border text-sm">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-2">Nome</th>
              <th className="p-2">Comentário</th>
              <th className="p-2">Status</th>
              <th className="p-2">Data</th>
              <th className="p-2">E-mail</th>
              <th className="p-2">Telefone</th>
              <th className="p-2">Ações</th>
            </tr>
          </thead>
          <tbody>
            {comentarios.map((c, idx) => (
              <tr key={c.slug + c.data} className="border-t">
                <td className="p-2 font-semibold">{c.nome}</td>
                <td className="p-2">{c.texto}</td>
                <td className="p-2 capitalize">{c.status}</td>
                <td className="p-2">{new Date(c.data).toLocaleDateString('pt-BR')}</td>
                <td className="p-2">{c.email}</td>
                <td className="p-2">{c.telefone}</td>
                <td className="p-2 space-x-2">
                  {c.status !== "aprovado" && (
                    <button className="bg-green-600 text-white px-3 py-1 rounded" onClick={() => atualizarStatus(idx, "aprovado")}>Aprovar</button>
                  )}
                  {c.status !== "pendente" && (
                    <button className="bg-yellow-600 text-white px-3 py-1 rounded" onClick={() => atualizarStatus(idx, "pendente")}>Reprovar</button>
                  )}
                  <button className="bg-red-600 text-white px-3 py-1 rounded" onClick={() => excluirComentario(idx)}>Excluir</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </section>
  );
} 