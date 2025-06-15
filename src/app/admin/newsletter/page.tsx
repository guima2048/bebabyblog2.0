"use client";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface Subscriber {
  id: string;
  email: string;
  date: string;
}

export default function AdminNewsletter() {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/newsletter")
      .then((res) => res.json())
      .then((data) => setSubscribers(data))
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Excluir este e-mail?")) return;
    try {
      const res = await fetch(`/api/newsletter/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error();
      setSubscribers((prev) => prev.filter((s) => s.id !== id));
      toast.success("E-mail excluído!");
    } catch {
      toast.error("Erro ao excluir e-mail");
    }
  };

  const handleExportCSV = () => {
    const csv = [
      ["E-mail", "Data"],
      ...subscribers.map((s) => [s.email, s.date]),
    ]
      .map((row) => row.join(","))
      .join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "newsletter.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gray-900 p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold text-white mb-8">Newsletter - E-mails Cadastrados</h1>
        <div className="flex justify-end mb-4">
          <button
            onClick={handleExportCSV}
            className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
          >
            Exportar CSV
          </button>
        </div>
        {loading ? (
          <div className="text-white">Carregando...</div>
        ) : subscribers.length === 0 ? (
          <div className="text-gray-400">Nenhum e-mail cadastrado.</div>
        ) : (
          <ul className="space-y-4">
            {subscribers.map((s) => (
              <li key={s.id} className="bg-gray-800 p-4 rounded flex items-center justify-between">
                <div>
                  <div className="font-semibold text-white">{s.email}</div>
                  <div className="text-gray-400 text-xs">{new Date(s.date).toLocaleString()}</div>
                </div>
                <button
                  onClick={() => handleDelete(s.id)}
                  className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                >
                  Excluir
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
} 