"use client";
import { useEffect, useState } from "react";

interface Notificacao {
  id: string;
  titulo: string;
  descricao: string;
  mensagem?: string;
  lida: boolean;
  data: string;
}

export default function NotificacoesSino() {
  const [notificacoes, setNotificacoes] = useState<Notificacao[]>([]);
  const [open, setOpen] = useState(false);
  const naoLidas = notificacoes.filter((n) => !n.lida);

  async function fetchNotificacoes() {
    const res = await fetch("/api/notificacoes");
    const data = await res.json();
    setNotificacoes(data);
  }

  useEffect(() => {
    fetchNotificacoes();
    const interval = setInterval(fetchNotificacoes, 10000); // Atualiza a cada 10s
    return () => clearInterval(interval);
  }, []);

  async function marcarComoLidas(ids: string[]) {
    await fetch("/api/notificacoes", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ids }),
    });
    fetchNotificacoes();
  }

  function handleOpen() {
    setOpen((v) => !v);
    if (naoLidas.length > 0) {
      marcarComoLidas(naoLidas.map((n) => n.id));
    }
  }

  return (
    <div className="relative inline-block text-left">
      <button
        onClick={handleOpen}
        className="relative p-2 rounded-full hover:bg-gray-200 focus:outline-none"
        aria-label="Notificações"
      >
        <svg width="28" height="28" fill="none" viewBox="0 0 24 24">
          <path d="M12 22a2 2 0 0 0 2-2h-4a2 2 0 0 0 2 2Zm6-6V11a6 6 0 1 0-12 0v5l-2 2v1h16v-1l-2-2Z" stroke="#6b21a8" strokeWidth="2" fill="none"/>
        </svg>
        {naoLidas.length > 0 && (
          <span className="absolute top-0 right-0 bg-pink-600 text-white text-xs rounded-full px-1.5 py-0.5 font-bold">
            {naoLidas.length}
          </span>
        )}
      </button>
      {open && (
        <div className="absolute right-0 mt-2 w-80 bg-white border border-gray-200 rounded-xl shadow-lg z-50 max-h-96 overflow-auto">
          <div className="p-4 border-b font-semibold text-[#6b21a8]">Notificações</div>
          {notificacoes.length === 0 ? (
            <div className="p-4 text-gray-500">Nenhuma notificação.</div>
          ) : (
            <ul className="divide-y divide-gray-100">
              {notificacoes.map((n) => (
                <li key={n.id} className={`p-4 ${n.lida ? 'bg-gray-50' : 'bg-violet-50'}`}>
                  <div className="font-bold text-sm mb-1">{n.titulo}</div>
                  <div className="text-xs text-gray-700 mb-1">{n.descricao}</div>
                  {n.mensagem && <div className="text-xs text-gray-500 mt-1">{n.mensagem}</div>}
                  <div className="text-[10px] text-gray-400 mt-2">{new Date(n.data).toLocaleString('pt-BR')}</div>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
} 