import { useState } from 'react';

export default function CommentForm({ slug, onCommentAdded }: { slug: string, onCommentAdded: () => void }) {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [texto, setTexto] = useState('');
  const [enviado, setEnviado] = useState(false);
  const [erro, setErro] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nome.trim() || !texto.trim() || !email.trim() || !telefone.trim()) {
      setErro('Todos os campos são obrigatórios.');
      return;
    }
    setErro('');
    setLoading(true);

    const res = await fetch('/api/comments', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ slug: slug, nome, email, telefone, texto }),
    });

    if (res.ok) {
      setEnviado(true);
      setNome('');
      setEmail('');
      setTelefone('');
      setTexto('');
      if (onCommentAdded) onCommentAdded();
    } else {
      const data = await res.json();
      setErro(data.error || 'Erro ao enviar comentário.');
    }
    setLoading(false);
  };

  if (enviado) {
    return <div className="bg-green-50 text-green-700 p-4 rounded text-center mt-8">Comentário enviado! Será publicado após aprovação.</div>;
  }

  return (
    <form onSubmit={handleSubmit} className="bg-gray-50 border p-6 rounded-lg flex flex-col gap-4 mt-10">
      <h3 className="text-xl font-bold text-[#6b21a8]">Deixe seu comentário</h3>
      <input 
        type="text" 
        value={nome} 
        onChange={e => setNome(e.target.value)} 
        placeholder="Nome*" 
        required 
        className="border p-2 rounded-md" 
      />
      <input 
        type="email" 
        value={email} 
        onChange={e => setEmail(e.target.value)} 
        placeholder="E-mail*" 
        required 
        className="border p-2 rounded-md" 
      />
      <input 
        type="tel" 
        value={telefone} 
        onChange={e => setTelefone(e.target.value)} 
        placeholder="Telefone*" 
        required
        className="border p-2 rounded-md" 
      />
      <textarea 
        value={texto} 
        onChange={e => setTexto(e.target.value)} 
        placeholder="Escreva seu comentário aqui...*" 
        required 
        className="border p-2 rounded-md min-h-[100px]" 
      />
      {erro && <div className="text-red-600 text-sm">{erro}</div>}
      <button 
        type="submit" 
        className="bg-violet-600 text-white px-6 py-2 rounded-md font-semibold hover:bg-violet-700 transition-colors disabled:bg-violet-400" 
        disabled={loading}
      >
        {loading ? 'Enviando...' : 'Enviar comentário'}
      </button>
      <p className="text-xs text-gray-500 mt-2">Seu e-mail e telefone não serão publicados.</p>
    </form>
  );
} 