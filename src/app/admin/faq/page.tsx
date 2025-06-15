"use client";

import { useEffect, useState } from "react";

interface Faq {
  id: number;
  pergunta: string;
  resposta: string;
}

export default function FaqAdmin() {
  const [faqs, setFaqs] = useState<Faq[]>([]);
  const [pergunta, setPergunta] = useState("");
  const [resposta, setResposta] = useState("");
  const [editId, setEditId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/faq")
      .then((res) => res.json())
      .then((data) => {
        setFaqs(data);
        setLoading(false);
      });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!pergunta || !resposta) return;
    if (editId) {
      // Editar
      const res = await fetch("/api/faq", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: editId, pergunta, resposta }),
      });
      if (res.ok) {
        setFaqs((prev) => prev.map(f => f.id === editId ? { id: editId, pergunta, resposta } : f));
        setEditId(null);
        setPergunta("");
        setResposta("");
      }
    } else {
      // Adicionar
      const res = await fetch("/api/faq", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pergunta, resposta }),
      });
      const data = await res.json();
      setFaqs((prev) => [...prev, data]);
      setPergunta("");
      setResposta("");
    }
  };

  const handleEdit = (faq: Faq) => {
    setEditId(faq.id);
    setPergunta(faq.pergunta);
    setResposta(faq.resposta);
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Deseja excluir esta FAQ?")) return;
    const res = await fetch("/api/faq", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    if (res.ok) {
      setFaqs((prev) => prev.filter(f => f.id !== id));
    }
  };

  return (
    <section className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">FAQ - Perguntas Frequentes</h1>
      <form onSubmit={handleSubmit} className="space-y-4 mb-8">
        <input
          type="text"
          value={pergunta}
          onChange={(e) => setPergunta(e.target.value)}
          placeholder="Pergunta"
          className="w-full border p-2 rounded"
          required
        />
        <textarea
          value={resposta}
          onChange={(e) => setResposta(e.target.value)}
          placeholder="Resposta"
          className="w-full border p-2 rounded h-24"
          required
        />
        <button type="submit" className="bg-violet-600 text-white px-6 py-2 rounded">
          {editId ? "Salvar edição" : "Adicionar"}
        </button>
        {editId && (
          <button type="button" onClick={() => { setEditId(null); setPergunta(""); setResposta(""); }} className="ml-4 text-sm text-gray-500 underline">Cancelar edição</button>
        )}
      </form>
      {loading ? (
        <div className="text-center text-[#6b21a8]">Carregando FAQs...</div>
      ) : faqs.length === 0 ? (
        <div className="text-center text-[#6b21a8]">Nenhuma FAQ cadastrada ainda.</div>
      ) : (
        <ul className="space-y-4">
          {faqs.map((faq) => (
            <li key={faq.id} className="bg-gray-100 rounded p-4 flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <div className="font-semibold text-[#6b21a8]">{faq.pergunta}</div>
                <div className="text-gray-700 mt-1">{faq.resposta}</div>
              </div>
              <div className="flex gap-2 mt-2 md:mt-0">
                <button onClick={() => handleEdit(faq)} className="text-sm bg-blue-600 text-white px-4 py-1 rounded">Editar</button>
                <button onClick={() => handleDelete(faq.id)} className="text-sm bg-red-600 text-white px-4 py-1 rounded">Excluir</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
} 