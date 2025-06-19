'use client';

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";

export default function EditPostPage() {
  const params = useParams() as { slug?: string | string[] };
const slug =
  params && params.slug
    ? typeof params.slug === 'string'
      ? params.slug
      : Array.isArray(params.slug)
        ? params.slug[0]
        : ''
    : '';
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [content, setContent] = useState('');
  const [imagePreview, setImagePreview] = useState('');
  const [status, setStatus] = useState<'ativo' | 'rascunho'>('ativo');
  const [loading, setLoading] = useState(true);
  const [faqs, setFaqs] = useState<{ question: string, answer: string }[]>([]);

  useEffect(() => {
    if (!slug) return;
    fetch(`/api/posts?slug=${slug}`)
      .then((res) => res.json())
      .then((post) => {
        if (post) {
          setTitle(post.title || '');
          setDescription(post.description || '');
          setContent(post.content || '');
          setImagePreview(post.image || '');
          setStatus(post.status || 'ativo');
          setFaqs(post.faqs || []);
        }
        setLoading(false);
      });
  }, [slug]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const updatedPost = {
      slug,
      title,
      description,
      content,
      image: imagePreview,
      status,
      faqs,
    };

    const res = await fetch("/api/posts", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedPost),
    });

    if (res.ok) {
      alert("Post atualizado com sucesso!");
    } else {
      const data = await res.json();
      alert("Erro ao atualizar: " + data.error);
    }
  };

  if (loading) {
    return <div className="text-center text-[#6b21a8] p-8">Carregando post...</div>;
  }

  return (
    <section className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Editar Post: {slug}</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Título"
          className="w-full p-2 border rounded"
        />

        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Descrição"
          className="w-full p-2 border rounded"
        />

        <input type="file" accept="image/*" onChange={handleImageChange} />
        {imagePreview && (
          <Image src={imagePreview} alt="Preview" width={800} height={300} className="w-full max-h-60 object-cover rounded" />
        )}

        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Conteúdo"
          className="w-full p-2 border rounded h-40"
        />

        <select
          value={status}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setStatus(e.target.value as 'ativo' | 'rascunho')}
          className="w-full border p-2 rounded"
        >
          <option value="ativo">Ativo</option>
          <option value="rascunho">Rascunho</option>
        </select>

        <button
          type="submit"
          className="bg-violet-600 text-white px-6 py-2 rounded"
        >
          Salvar alterações
        </button>
      </form>
    </section>
  );
} 