"use client";

import { useState } from 'react';

export default function ContatoPage() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [form, setForm] = useState({ nome: '', email: '', assunto: '', mensagem: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');

    try {
      const res = await fetch('/api/contato', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (res.ok) setStatus('success');
      else throw new Error();
    } catch {
      setStatus('error');
    }
  };

  return (
    <main className="max-w-3xl mx-auto px-6 py-16 text-white">
      <h1 className="text-4xl font-bold mb-4">Fale com a gente</h1>
      <p className="mb-8 text-gray-400">Envie sua dúvida, sugestão ou proposta.</p>

      <form onSubmit={handleSubmit} className="space-y-6">
        <input
          type="text"
          placeholder="Seu nome completo"
          className="w-full p-3 rounded bg-gray-800 border border-gray-600"
          required
          value={form.nome}
          onChange={(e) => setForm({ ...form, nome: e.target.value })}
        />
        <input
          type="email"
          placeholder="Seu e-mail"
          className="w-full p-3 rounded bg-gray-800 border border-gray-600"
          required
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <input
          type="text"
          placeholder="Assunto"
          className="w-full p-3 rounded bg-gray-800 border border-gray-600"
          required
          value={form.assunto}
          onChange={(e) => setForm({ ...form, assunto: e.target.value })}
        />
        <textarea
          placeholder="Escreva sua mensagem"
          className="w-full p-3 h-40 rounded bg-gray-800 border border-gray-600"
          required
          value={form.mensagem}
          onChange={(e) => setForm({ ...form, mensagem: e.target.value })}
        />

        <button
          type="submit"
          className="bg-pink-600 hover:bg-pink-700 px-6 py-3 rounded text-white font-semibold"
          disabled={status === 'sending'}
        >
          {status === 'sending' ? 'Enviando...' : 'Enviar mensagem'}
        </button>

        {status === 'success' && <p className="text-green-400">Mensagem enviada com sucesso!</p>}
        {status === 'error' && <p className="text-red-400">Erro ao enviar. Tente novamente.</p>}
      </form>
    </main>
  );
} 