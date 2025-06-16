"use client";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import Image from "next/image";

interface Autor {
  id: string;
  nome: string;
  bio: string;
  foto: string;
  instagram?: string;
  twitter?: string;
  facebook?: string;
  youtube?: string;
  tiktok?: string;
}

export default function AdminAutores() {
  const [autores, setAutores] = useState<Autor[]>([]);
  const [form, setForm] = useState<Partial<Autor>>({});
  const [editId, setEditId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/autores")
      .then((res) => res.json())
      .then((data) => setAutores(data))
      .finally(() => setLoading(false));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.nome || !form.bio) return toast.error("Preencha nome e bio");
    try {
      const method = editId ? "PUT" : "POST";
      const url = editId ? `/api/autores/${editId}` : "/api/autores";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error();
      const updated = await res.json();
      if (editId) {
        setAutores((prev) => prev.map((a) => (a.id === editId ? updated : a)));
        toast.success("Autor atualizado!");
      } else {
        setAutores((prev) => [...prev, updated]);
        toast.success("Autor adicionado!");
      }
      setForm({});
      setEditId(null);
    } catch {
      toast.error("Erro ao salvar autor");
    }
  };

  const handleEdit = (autor: Autor) => {
    setForm(autor);
    setEditId(autor.id);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Excluir este autor?")) return;
    try {
      const res = await fetch(`/api/autores/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error();
      setAutores((prev) => prev.filter((a) => a.id !== id));
      toast.success("Autor excluído!");
    } catch {
      toast.error("Erro ao excluir autor");
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold text-white mb-8">Administração de Autores</h1>
        <form onSubmit={handleSubmit} className="space-y-4 mb-8">
          <input
            type="text"
            placeholder="Nome"
            value={form.nome || ""}
            onChange={(e) => setForm({ ...form, nome: e.target.value })}
            className="w-full p-2 rounded bg-gray-800 text-white border border-gray-700"
            required
          />
          <textarea
            placeholder="Bio"
            value={form.bio || ""}
            onChange={(e) => setForm({ ...form, bio: e.target.value })}
            className="w-full p-2 rounded bg-gray-800 text-white border border-gray-700"
            required
            rows={3}
          />
          <input
            type="url"
            placeholder="URL da Foto (use o upload de imagem do admin)"
            value={form.foto || ""}
            onChange={(e) => setForm({ ...form, foto: e.target.value })}
            className="w-full p-2 rounded bg-gray-800 text-white border border-gray-700"
          />
          <div className="grid grid-cols-2 gap-2">
            <input
              type="url"
              placeholder="Instagram"
              value={form.instagram || ""}
              onChange={(e) => setForm({ ...form, instagram: e.target.value })}
              className="p-2 rounded bg-gray-800 text-white border border-gray-700"
            />
            <input
              type="url"
              placeholder="Twitter"
              value={form.twitter || ""}
              onChange={(e) => setForm({ ...form, twitter: e.target.value })}
              className="p-2 rounded bg-gray-800 text-white border border-gray-700"
            />
            <input
              type="url"
              placeholder="Facebook"
              value={form.facebook || ""}
              onChange={(e) => setForm({ ...form, facebook: e.target.value })}
              className="p-2 rounded bg-gray-800 text-white border border-gray-700"
            />
            <input
              type="url"
              placeholder="YouTube"
              value={form.youtube || ""}
              onChange={(e) => setForm({ ...form, youtube: e.target.value })}
              className="p-2 rounded bg-gray-800 text-white border border-gray-700"
            />
            <input
              type="url"
              placeholder="TikTok"
              value={form.tiktok || ""}
              onChange={(e) => setForm({ ...form, tiktok: e.target.value })}
              className="p-2 rounded bg-gray-800 text-white border border-gray-700"
            />
          </div>
          <div className="flex gap-2">
            <button
              type="submit"
              className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
            >
              {editId ? "Salvar Alteração" : "Adicionar Autor"}
            </button>
            {editId && (
              <button
                type="button"
                onClick={() => {
                  setEditId(null);
                  setForm({});
                }}
                className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
              >
                Cancelar
              </button>
            )}
          </div>
        </form>
        <h2 className="text-xl text-white mb-4">Autores Cadastrados</h2>
        {loading ? (
          <div className="text-white">Carregando...</div>
        ) : autores.length === 0 ? (
          <div className="text-gray-400">Nenhum autor cadastrado.</div>
        ) : (
          <ul className="space-y-4">
            {autores.map((autor) => (
              <li key={autor.id} className="bg-gray-800 p-4 rounded flex flex-col md:flex-row md:items-center md:justify-between">
                <div className="flex items-center gap-4">
                  {autor.foto && (
                    <Image src={autor.foto} alt={autor.nome} width={48} height={48} className="rounded-full object-cover" />
                  )}
                  <div>
                    <div className="font-semibold text-white">{autor.nome}</div>
                    <div className="text-gray-300 text-sm mt-1">{autor.bio}</div>
                    <div className="flex gap-2 mt-1">
                      {autor.instagram && <a href={autor.instagram} target="_blank" rel="noopener noreferrer" className="text-pink-400">Instagram</a>}
                      {autor.twitter && <a href={autor.twitter} target="_blank" rel="noopener noreferrer" className="text-blue-400">Twitter</a>}
                      {autor.facebook && <a href={autor.facebook} target="_blank" rel="noopener noreferrer" className="text-blue-600">Facebook</a>}
                      {autor.youtube && <a href={autor.youtube} target="_blank" rel="noopener noreferrer" className="text-red-500">YouTube</a>}
                      {autor.tiktok && <a href={autor.tiktok} target="_blank" rel="noopener noreferrer" className="text-gray-200">TikTok</a>}
                    </div>
                  </div>
                </div>
                <div className="flex gap-2 mt-2 md:mt-0">
                  <button
                    onClick={() => handleEdit(autor)}
                    className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(autor.id)}
                    className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                  >
                    Excluir
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
} 