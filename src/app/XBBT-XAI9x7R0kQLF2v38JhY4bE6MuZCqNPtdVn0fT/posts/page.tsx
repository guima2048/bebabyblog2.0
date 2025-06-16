'use client';

import { useState, useRef } from "react";
import Image from "next/image";
import { toast } from "sonner";

export default function CriarPost() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [slug, setSlug] = useState("");
  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [status, setStatus] = useState<"ativo" | "rascunho">("ativo");
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const post = {
      slug,
      title,
      description,
      content,
      image: imageUrl,
      status,
    };

    const res = await fetch("/api/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(post),
    });

    if (res.ok) {
      alert("Post salvo com sucesso!");
      setTitle("");
      setSlug("");
      setDescription("");
      setContent("");
      setImageUrl("");
    } else {
      const data = await res.json();
      alert("Erro: " + data.error);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validação de tipo
    if (!['image/jpeg', 'image/png', 'image/webp', 'image/gif'].includes(file.type)) {
      setUploadError('Tipo de arquivo não permitido. Use apenas imagens (JPEG, PNG, WebP ou GIF)');
      return;
    }

    // Validação de tamanho (5MB)
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

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-4 p-6">
      <input
        type="text"
        value={slug}
        onChange={(e) => setSlug(e.target.value)}
        placeholder="Slug (ex: como-pedir-mimos)"
        className="w-full border p-2 rounded"
        required
      />

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

      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Conteúdo do post"
        className="w-full border p-2 rounded h-40"
        required
      />

      <div className="flex flex-col gap-2">
        <label className="text-sm text-gray-700">Imagem de capa (WebP)</label>
        <input
          type="file"
          accept="image/jpeg,image/png,image/webp,image/gif"
          ref={fileInputRef}
          onChange={handleImageUpload}
          className="w-full border p-2 rounded bg-white"
          disabled={uploading}
        />
        {uploading && (
          <div className="flex items-center gap-2 text-sm text-purple-700">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-purple-700"></div>
            Enviando imagem...
          </div>
        )}
        {uploadError && (
          <div className="text-sm text-red-600 bg-red-50 p-2 rounded">
            {uploadError}
          </div>
        )}
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
        <input
          type="text"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          placeholder="URL da imagem (ex: /uploads/xyz.webp)"
          className="w-full border p-2 rounded"
          required
        />
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
        className="bg-violet-600 text-white px-6 py-2 rounded"
      >
        Salvar
      </button>
    </form>
  );
} 