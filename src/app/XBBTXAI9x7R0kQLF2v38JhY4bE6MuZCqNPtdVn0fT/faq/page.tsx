"use client";
import { useEffect, useState } from "react";

interface FaqItem {
  id: string;
  pergunta: string;
  resposta: string;
}

export default function AdminFaqPage() {
  const [faqs, setFaqs] = useState<FaqItem[]>([]);
  const [pergunta, setPergunta] = useState("");
  const [resposta, setResposta] = useState("");
  const [editId, setEditId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function fetchFaqs() {
    const res = await fetch("/api/faq");
    const data = await res.json();
    setFaqs(data);
  }

  useEffect(() => {
    fetchFaqs();
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    const method = editId ? "PUT" : "POST";
    const body = editId
      ? { id: editId, pergunta, resposta }
      : { pergunta, resposta };
    await fetch("/api/faq", {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    setPergunta("");
    setResposta("");
    setEditId(null);
    setLoading(false);
    fetchFaqs();
  }

  async function handleDelete(id: string) {
    if (!confirm("Excluir este FAQ?")) return;
    await fetch(`/api/faq?id=${id}`, { method: "DELETE" });
    fetchFaqs();
  }

  function handleEdit(faq: FaqItem) {
    setEditId(faq.id);
    setPergunta(faq.pergunta);
    setResposta(faq.resposta);
  }

  return (
    <main className="max-w-2xl mx-auto py-10 px-4">
      <h1 className="text-2xl font-bold mb-6 text-[#6b21a8]">FAQ do Rodapé</h1>
      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow p-6 mb-8 space-y-4">
        <div>
          <label className="block font-semibold mb-1 text-gray-900">Pergunta</label>
          <input
            className="w-full p-3 rounded bg-gray-100 border border-gray-300 text-gray-900"
            value={pergunta}
            onChange={e => setPergunta(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block font-semibold mb-1 text-gray-900">Resposta</label>
          <textarea
            className="w-full p-3 rounded bg-gray-100 border border-gray-300 text-gray-900"
            value={resposta}
            onChange={e => setResposta(e.target.value)}
            required
            rows={3}
          />
        </div>
        <button
          type="submit"
          className="bg-violet-600 hover:bg-violet-700 text-white px-6 py-2 rounded font-semibold"
          disabled={loading}
        >
          {editId ? "Salvar Alterações" : "Adicionar FAQ"}
        </button>
        {editId && (
          <button type="button" className="ml-4 text-sm underline" onClick={() => { setEditId(null); setPergunta(""); setResposta(""); }}>Cancelar edição</button>
        )}
      </form>
      <ul className="space-y-4">
        {faqs.map(faq => (
          <li key={faq.id} className="bg-gray-50 rounded p-4 flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <div className="font-semibold text-[#6b21a8]">{faq.pergunta}</div>
              <div className="text-gray-700 mt-1">{faq.resposta}</div>
            </div>
            <div className="flex gap-2 mt-2 md:mt-0">
              <button onClick={() => handleEdit(faq)} className="text-sm bg-blue-600 text-white px-4 py-2 rounded">Editar</button>
              <button onClick={() => handleDelete(faq.id)} className="text-sm bg-red-600 text-white px-4 py-2 rounded">Excluir</button>
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
} 