import { useState } from 'react';

export default function CommentForm({ slug }: { slug: string }) {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [texto, setTexto] = useState('');
  const [enviado, setEnviado] = useState(false);
  const [erro, setErro] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErro('');
    setLoading(true);
    const res = await fetch('/api/comments', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ slug, nome, email, telefone, texto }),
    });
    if (res.ok) {
      setEnviado(true);
      setNome(''); setEmail(''); setTelefone(''); setTexto('');
    } else {
      const data = await res.json();
      setErro(data.error || 'Erro ao enviar comentário.');
    }
    setLoading(false);
  };

  if (enviado) {
    return <div className="bg-green-50 text-green-700 p-4 rounded text-center">Comentário enviado! Será publicado após aprovação do admin.</div>;
  }

  return (
    <form onSubmit={handleSubmit} className="bg-gray-50 border p-4 rounded flex flex-col gap-3 mt-8">
      <h3 className="text-lg font-bold text-[#6b21a8]">Deixe seu comentário</h3>
      <input type="text" value={nome} onChange={e => setNome(e.target.value)} placeholder="Nome*" required className="border p-2 rounded" />
      <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="E-mail*" required className="border p-2 rounded" />
      <input type="tel" value={telefone} onChange={e => setTelefone(e.target.value)} placeholder="Telefone*" required className="border p-2 rounded" />
      <textarea value={texto} onChange={e => setTexto(e.target.value)} placeholder="Comentário*" required className="border p-2 rounded min-h-[80px]" />
      {erro && <div className="text-red-600 text-sm">{erro}</div>}
      <button type="submit" className="bg-violet-600 text-white px-6 py-2 rounded font-semibold" disabled={loading}>{loading ? 'Enviando...' : 'Enviar comentário'}</button>
      <div className="text-xs text-gray-500 mt-2">Seu nome será público. E-mail e telefone são obrigatórios, mas não serão exibidos.</div>
    </form>
  );
} 