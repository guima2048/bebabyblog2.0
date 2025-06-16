"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import Image from "next/image";
import { toast } from "sonner";

const TipTapEditor = dynamic(() => import("@/components/TipTapEditor"), { ssr: false });

interface PostData {
  data?: string;
  [key: string]: any;
}

export default function EditPostPage() {
  const params = useParams() as { slug?: string | string[] };
  const router = useRouter();
  const rawSlug = params && params.slug
    ? typeof params.slug === 'string'
      ? params.slug
      : Array.isArray(params.slug)
        ? params.slug[0]
        : ''
    : '';
  const slug = rawSlug.trim();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [content, setContent] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [status, setStatus] = useState<'ativo' | 'rascunho'>('ativo');
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);
  const [faqs, setFaqs] = useState<{ question: string; answer: string }[]>([]);
  const [faqQuestion, setFaqQuestion] = useState("");
  const [faqAnswer, setFaqAnswer] = useState("");
  const [editFaqIndex, setEditFaqIndex] = useState<number | null>(null);
  const [postData, setPostData] = useState<PostData | null>(null);

  useEffect(() => {
    if (!slug) return;
    fetch(`/api/posts?slug=${slug}`)
      .then((res) => res.json())
      .then((post) => {
        if (post) {
          setTitle(post.title || '');
          setDescription(post.description || '');
          setContent(post.content || '');
          setImageUrl(post.image || '');
          setStatus(post.status || 'ativo');
          setFaqs(post.faqs || []);
          setPostData(post);
        }
        setLoading(false);
      });
  }, [slug]);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!['image/jpeg', 'image/png', 'image/webp', 'image/gif'].includes(file.type)) {
      setUploadError('Tipo de arquivo não permitido. Use apenas imagens (JPEG, PNG, WebP ou GIF)');
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setUploadError('Arquivo muito grande. Tamanho máximo: 5MB');
      return;
    }
    setUploading(true);
    setUploadError(null);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Erro ao fazer upload');
      }
      setImageUrl(data.url);
      toast.success('Imagem enviada com sucesso!');
    } catch (error) {
      setUploadError(error instanceof Error ? error.message : 'Erro ao fazer upload');
      toast.error('Erro ao fazer upload da imagem');
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(false);
    const updatedPost = {
      slug: slug.trim(),
      title,
      description,
      content,
      image: imageUrl,
      status,
      faqs,
    };
    const res = await fetch("/api/posts", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedPost),
    });
    if (res.ok) {
      toast.success("Post atualizado com sucesso!");
      setSaved(true);
    } else {
      const data = await res.json();
      toast.error("Erro: " + data.error);
    }
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center text-2xl text-[#6b21a8]">Carregando...</div>;
  }

  return (
    <section className="min-h-screen flex flex-col items-center justify-center bg-[#e9d8fd] py-8">
      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg p-8 w-full max-w-2xl flex flex-col gap-4 border border-[#c4b5fd]">
        <h1 className="text-2xl font-bold text-[#6b21a8] mb-2 text-center">Editar Post</h1>
        {(postData && (postData as any).data) && (
          <div className="text-center text-gray-500 mb-2">
            Criado em {new Date((postData as any).data).toLocaleDateString('pt-BR')}
          </div>
        )}
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Título"
          className="border p-2 rounded"
          required
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Descrição"
          className="border p-2 rounded h-20"
          required
        />
        <div>
          <label className="block mb-1 font-medium">Imagem de capa</label>
          {imageUrl && (
            <Image src={imageUrl} alt={title} width={400} height={200} className="rounded mb-2 object-cover" />
          )}
          <input type="file" accept="image/*" onChange={handleImageUpload} className="block" />
          {uploading && <span className="text-sm text-gray-500 ml-2">Enviando imagem...</span>}
          {uploadError && <span className="text-sm text-red-600 ml-2">{uploadError}</span>}
        </div>
        <div>
          <label className="block mb-1 font-medium">Conteúdo</label>
          <TipTapEditor value={content} onChange={setContent} />
        </div>
        {/* FAQ Section */}
        <div className="mt-6">
          <h2 className="text-lg font-bold mb-2 text-[#6b21a8]">FAQ (Perguntas Frequentes)</h2>
          <div className="flex flex-col md:flex-row gap-2 mb-2">
            <input
              type="text"
              value={faqQuestion}
              onChange={e => setFaqQuestion(e.target.value)}
              placeholder="Pergunta"
              className="border p-2 rounded flex-1"
            />
            <input
              type="text"
              value={faqAnswer}
              onChange={e => setFaqAnswer(e.target.value)}
              placeholder="Resposta"
              className="border p-2 rounded flex-1"
            />
            {editFaqIndex === null ? (
              <button type="button" onClick={() => {
                if (faqQuestion.trim() && faqAnswer.trim()) {
                  setFaqs([...faqs, { question: faqQuestion, answer: faqAnswer }]);
                  setFaqQuestion("");
                  setFaqAnswer("");
                }
              }} className="bg-violet-600 text-white px-4 py-2 rounded">Adicionar</button>
            ) : (
              <button type="button" onClick={() => {
                if (faqQuestion.trim() && faqAnswer.trim() && editFaqIndex !== null) {
                  const newFaqs = [...faqs];
                  newFaqs[editFaqIndex] = { question: faqQuestion, answer: faqAnswer };
                  setFaqs(newFaqs);
                  setFaqQuestion("");
                  setFaqAnswer("");
                  setEditFaqIndex(null);
                }
              }} className="bg-green-600 text-white px-4 py-2 rounded">Salvar edição</button>
            )}
            {editFaqIndex !== null && (
              <button type="button" onClick={() => {
                setFaqQuestion("");
                setFaqAnswer("");
                setEditFaqIndex(null);
              }} className="ml-2 text-sm text-gray-500 underline">Cancelar</button>
            )}
          </div>
          <ul className="space-y-2">
            {faqs.map((faq, idx) => (
              <li key={idx} className="border rounded p-2 flex flex-col md:flex-row md:items-center gap-2 bg-gray-50">
                <span className="font-semibold">Q:</span> <span className="flex-1">{faq.question}</span>
                <span className="font-semibold">A:</span> <span className="flex-1">{faq.answer}</span>
                <button type="button" onClick={() => {
                  setFaqQuestion(faq.question);
                  setFaqAnswer(faq.answer);
                  setEditFaqIndex(idx);
                }} className="text-blue-600 hover:underline text-sm">Editar</button>
                <button type="button" onClick={() => setFaqs(faqs.filter((_, i) => i !== idx))} className="text-red-600 hover:underline text-sm">Remover</button>
              </li>
            ))}
          </ul>
        </div>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value as 'ativo' | 'rascunho')}
          className="w-full border p-2 rounded"
        >
          <option value="ativo">Ativo</option>
          <option value="rascunho">Rascunho</option>
        </select>
        <button type="submit" className="bg-violet-600 text-white px-6 py-2 rounded font-semibold" disabled={uploading}>
          Salvar Alterações
        </button>
        {saved && (
          <div className="mt-4 text-green-700 text-center font-semibold">Alterações salvas!</div>
        )}
      </form>
    </section>
  );
} 