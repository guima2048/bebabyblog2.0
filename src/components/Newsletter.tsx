'use client';
import { useState } from 'react';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');

    const res = await fetch('/api/newsletter', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });

    setStatus(res.ok ? 'success' : 'error');
  };

  return (
    <div className="bg-black p-6 rounded-xl shadow-md w-full max-w-md mx-auto text-center mt-8">
      <h3 className="text-lg font-semibold text-white mb-2">Receba dicas e novidades</h3>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <input
          type="email"
          required
          placeholder="Seu e-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="rounded px-4 py-2 bg-gray-800 text-white border border-gray-600"
        />
        <button
          type="submit"
          disabled={status === 'sending'}
          className="bg-pink-600 hover:bg-pink-700 text-white py-2 rounded"
        >
          {status === 'sending' ? 'Enviando...' : 'Quero receber dicas'}
        </button>
        {status === 'success' && <p className="text-green-400 text-sm">Inscrição confirmada!</p>}
        {status === 'error' && <p className="text-red-400 text-sm">Erro ao enviar. Tente novamente.</p>}
      </form>
    </div>
  );
} 