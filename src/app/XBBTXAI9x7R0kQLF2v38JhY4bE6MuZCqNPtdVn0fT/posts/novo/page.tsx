"use client";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Heading from '@tiptap/extension-heading';
import Blockquote from '@tiptap/extension-blockquote';
import HorizontalRule from '@tiptap/extension-horizontal-rule';
import ImageExt from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import TextAlign from '@tiptap/extension-text-align';
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
import { lowlight } from 'lowlight/lib/common';

function slugify(text: string) {
  return text
    .toString()
    .toLowerCase()
    .trim() // Remove espaços do início e do fim
    .replace(/\s+/g, '-') // Substitui espaços por -
    .replace(/[^\w\-]+/g, '') // Remove caracteres inválidos
    .replace(/\-\-+/g, '-'); // Substitui múltiplos - por um único -
}

export default function NovoPost() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [slug, setSlug] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [status, setStatus] = useState<"ativo" | "rascunho">("ativo");
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const [faqs, setFaqs] = useState<{ question: string; answer: string }[]>([]);
  const [faqQuestion, setFaqQuestion] = useState("");
  const [faqAnswer, setFaqAnswer] = useState("");
  const [slugDuplicado, setSlugDuplicado] = useState(false);
  const [slugSugestao, setSlugSugestao] = useState("");

  const editor = useEditor({
    extensions: [
      StarterKit,
      Heading.configure({ levels: [2, 3] }),
      Blockquote,
      HorizontalRule,
      ImageExt,
      Link,
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
      CodeBlockLowlight.configure({ lowlight }),
    ],
    content: '',
  });

  useEffect(() => {
    if (!slug) return;
    const checkSlug = async () => {
      const res = await fetch(`/api/posts?slug=${slug}`);
      const data = await res.json();
      if (data && data.slug === slug) {
        setSlugDuplicado(true);
        setSlugSugestao(`${slug}-2`);
        toast.error(`Slug já existe! Sugestão: ${slug}-2`);
      } else {
        setSlugDuplicado(false);
        setSlugSugestao("");
      }
    };
    checkSlug();
  }, [slug]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const post = {
      slug,
      title,
      description,
      content: editor?.getHTML() || '',
      image: imageUrl,
      status,
      faqs,
    };
    const res = await fetch("/api/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(post),
    });
    if (res.ok) {
      toast.success("Post criado com sucesso!");
      router.push("/XBBTXAI9x7R0kQLF2v38JhY4bE6MuZCqNPtdVn0fT/posts/list");
    } else {
      const data = await res.json();
      toast.error("Erro: " + data.error);
    }
  };

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

  const addFaq = () => {
    if (faqQuestion.trim() && faqAnswer.trim()) {
      setFaqs([...faqs, { question: faqQuestion, answer: faqAnswer }]);
      setFaqQuestion("");
      setFaqAnswer("");
    }
  };

  const removeFaq = (idx: number) => {
    setFaqs(faqs.filter((_, i) => i !== idx));
  };

  return (
    <section className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Novo Post</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          value={slug}
          onChange={(e) => setSlug(slugify(e.target.value))}
          placeholder="Slug (ex: como-pedir-mimos)"
          className={`w-full border p-2 rounded ${slugDuplicado ? 'border-red-500' : ''}`}
          required
        />
        {slugDuplicado && (
          <div className="text-red-600 text-sm mb-2">Slug já existe! Sugestão: <span className="font-bold">{slugSugestao}</span></div>
        )}
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Título"
          className="w-full border p-2 rounded"
          required
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Descrição"
          className="w-full border p-2 rounded"
          required
        />
        <div>
          <label className="block mb-2 text-sm text-gray-700">Conteúdo do post</label>
          <div className="border rounded bg-white min-h-[200px] p-2">
            <EditorContent editor={editor} />
          </div>
          <div className="flex gap-2 mt-2">
            <button type="button" onClick={() => editor?.chain().focus().toggleHeading({ level: 2 }).run()} className="px-2 py-1 border rounded">H2</button>
            <button type="button" onClick={() => editor?.chain().focus().toggleHeading({ level: 3 }).run()} className="px-2 py-1 border rounded">H3</button>
            <button type="button" onClick={() => editor?.chain().focus().toggleBlockquote().run()} className="px-2 py-1 border rounded">Citação</button>
            <button type="button" onClick={() => editor?.chain().focus().setHorizontalRule().run()} className="px-2 py-1 border rounded">Linha</button>
            <button type="button" onClick={() => fileInputRef.current?.click()} className="px-2 py-1 border rounded">Imagem</button>
          </div>
          <input
            type="file"
            accept="image/jpeg,image/png,image/webp,image/gif"
            ref={fileInputRef}
            onChange={handleImageUpload}
            className="hidden"
            disabled={uploading}
          />
          {uploading && (
            <div className="flex items-center gap-2 text-sm text-purple-700 mt-2">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-purple-700"></div>
              Enviando imagem...
            </div>
          )}
          {uploadError && (
            <div className="text-sm text-red-600 bg-red-50 p-2 rounded mt-2">
              {uploadError}
            </div>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm text-gray-700">Imagem de capa (WebP)</label>
          <input
            type="file"
            accept="image/jpeg,image/png,image/webp,image/gif"
            onChange={handleImageUpload}
            className="w-full border p-2 rounded bg-white"
            disabled={uploading}
          />
          {imageUrl && (
            <div className="relative">
              <Image
                src={imageUrl}
                alt="Preview"
                width={400}
                height={160}
                className="w-full max-h-40 object-cover rounded border mt-2"
              />
              <button
                type="button"
                onClick={() => {
                  setImageUrl('');
                  if (fileInputRef.current) fileInputRef.current.value = '';
                }}
                className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          )}
        </div>
        <div>
          <label className="block mb-2 text-sm text-gray-700">FAQ do post</label>
          <div className="flex gap-2 mb-2">
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
            <button type="button" onClick={addFaq} className="bg-violet-600 text-white px-4 py-2 rounded">Adicionar</button>
          </div>
          <ul className="mb-4">
            {faqs.map((faq, idx) => (
              <li key={idx} className="flex items-center gap-2 mb-1">
                <span className="font-semibold">{faq.question}</span>
                <span className="text-gray-600">{faq.answer}</span>
                <button type="button" onClick={() => removeFaq(idx)} className="text-red-600 ml-2">Remover</button>
              </li>
            ))}
          </ul>
        </div>
        <select
          value={status}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setStatus(e.target.value as "ativo" | "rascunho")}
          className="w-full border p-2 rounded"
        >
          <option value="ativo">Ativo</option>
          <option value="rascunho">Rascunho</option>
        </select>
        <button
          type="submit"
          className="bg-violet-600 hover:bg-violet-700 text-white px-6 py-2 rounded font-semibold shadow text-center"
          disabled={slugDuplicado}
        >
          Salvar
        </button>
      </form>
    </section>
  );
} 