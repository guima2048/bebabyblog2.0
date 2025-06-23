"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

interface Comentario {
  id: string;
  slug: string;
  nome: string;
  email: string;
  telefone: string;
  texto: string;
  status: "pendente" | "aprovado" | "rejeitado";
  data: string;
  ip?: string;
}

export default function ModeracaoComentarios() {
  const [comentarios, setComentarios] = useState<Comentario[]>([]);
  const [loading, setLoading] = useState(true);
  const [filtroStatus, setFiltroStatus] = useState<string>('todos');

  const fetchComentarios = () => {
    setLoading(true);
    fetch(`/api/comments?all=true&status=${filtroStatus}`)
      .then((res) => res.json())
      .then((data) => {
        setComentarios(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  useEffect(() => {
    fetchComentarios();
  }, [filtroStatus]);

  const atualizarStatus = async (id: string, status: "aprovado" | "rejeitado") => {
    const res = await fetch(`/api/comments`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status }),
    });
    if (res.ok) {
      fetchComentarios();
    }
  };

  const excluirComentario = async (id: string) => {
    if (!window.confirm('Tem certeza que deseja excluir este comentário?')) return;
    const res = await fetch(`/api/comments`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    });
    if (res.ok) {
      fetchComentarios();
    }
  };

  const comentariosFiltrados = comentarios;

  return (
    <section className="max-w-5xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Moderação de Comentários</h1>
        <Link href="/XBBTXAI9x7R0kQLF2v38JhY4bE6MuZCqNPtdVn0fT/rastreio" className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded font-semibold shadow">
            Rastrear IPs
        </Link>
      </div>
      <div className="mb-4">
        <label htmlFor="status" className="mr-2">Filtrar por status:</label>
        <select id="status" value={filtroStatus} onChange={(e) => setFiltroStatus(e.target.value)} className="p-2 rounded border">
          <option value="todos">Todos</option>
          <option value="pendente">Pendente</option>
          <option value="aprovado">Aprovado</option>
          <option value="rejeitado">Rejeitado</option>
        </select>
      </div>
      {loading ? (
        <div>Carregando...</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border text-sm">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="p-2">Nome</th>
                <th className="p-2">Comentário</th>
                <th className="p-2">Status</th>
                <th className="p-2">Data</th>
                <th className="p-2">E-mail</th>
                <th className="p-2">Telefone</th>
                <th className="p-2">IP</th>
                <th className="p-2">Ações</th>
              </tr>
            </thead>
            <tbody>
              {comentariosFiltrados.map((c) => (
                <tr key={c.id} className="border-t">
                  <td className="p-2 font-semibold">{c.nome}</td>
                  <td className="p-2">{c.texto}</td>
                  <td className="p-2 capitalize">{c.status}</td>
                  <td className="p-2">{c.data ? new Date(c.data).toLocaleDateString('pt-BR') : 'N/A'}</td>
                  <td className="p-2">{c.email}</td>
                  <td className="p-2">{c.telefone}</td>
                  <td className="p-2">{c.ip || 'N/A'}</td>
                  <td className="p-2 space-y-2">
                    {c.status === "pendente" && (
                      <>
                        <button className="bg-green-600 text-white px-3 py-1 rounded w-full text-left" onClick={() => atualizarStatus(c.id, "aprovado")}>Aprovar</button>
                        <button className="bg-yellow-600 text-white px-3 py-1 rounded w-full text-left" onClick={() => atualizarStatus(c.id, "rejeitado")}>Rejeitar</button>
                      </>
                    )}
                    <button className="bg-red-600 text-white px-3 py-1 rounded w-full text-left" onClick={() => excluirComentario(c.id)}>Excluir</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
} 