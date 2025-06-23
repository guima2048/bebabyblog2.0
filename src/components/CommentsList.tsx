import { useEffect, useState } from 'react';

interface Comment {
  id: number;
  author: string;
  content: string;
  createdAt: string;
}

export default function CommentsList({ slug, newCommentTrigger }: { slug: string, newCommentTrigger: number }) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/comments?postSlug=${slug}`)
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setComments(data);
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [slug, newCommentTrigger]);

  if (loading) return <div className="text-center text-gray-500 mt-8">Carregando comentários...</div>;
  if (comments.length === 0) {
    return <div className="text-center text-gray-500 mt-8">Seja o primeiro a comentar!</div>;
  }

  return (
    <div className="mt-12">
      <h3 className="text-xl font-bold text-[#6b21a8] mb-6">Comentários</h3>
      <ul className="space-y-6">
        {comments.map((comment) => (
          <li key={comment.id} className="border-l-4 border-[#c4b5fd] bg-white p-5 rounded-r-lg shadow-sm">
            <div className="font-semibold text-[#6b21a8] text-lg">{comment.author}</div>
            <p className="text-gray-800 mt-2">{comment.content}</p>
            <div className="text-xs text-gray-400 mt-3">{new Date(comment.createdAt).toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' })}</div>
          </li>
        ))}
      </ul>
    </div>
  );
} 