import { useEffect, useState } from 'react';

interface Comentario {
  nome: string;
  texto: string;
  data: string;
}

export default function CommentsList({ slug }: { slug: string }) {
  const [comentarios, setComentarios] = useState<Comentario[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/comments?slug=${slug}`)
      .then(res => res.json())
      .then(data => {
        setComentarios(data);
        setLoading(false);
      });
  }, [slug]);

  if (loading) return <div className="text-center text-gray-500">Carregando comentários...</div>;
  if (comentarios.length === 0) return null;

  return (
    <div className="mt-10">
      <h3 className="text-lg font-bold text-[#6b21a8] mb-4">Comentários</h3>
      <ul className="space-y-4">
        {comentarios.map((c, i) => (
          <li key={i} className="border-l-4 border-[#c4b5fd] bg-gray-50 p-4 rounded">
            <div className="font-semibold text-[#6b21a8]">{c.nome}</div>
            <div className="text-gray-800 mt-1">{c.texto}</div>
            <div className="text-xs text-gray-400 mt-2">{new Date(c.data).toLocaleDateString('pt-BR')}</div>
          </li>
        ))}
      </ul>
    </div>
  );
} 