'use client';

import { useState, useRef } from "react";
import Image from "next/image";

export default function CriarPost() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [slug, setSlug] = useState("");
  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [status, setStatus] = useState<"ativo" | "rascunho">("ativo");
  const [uploading, setUploading] = useState(false);
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
    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });
    const data = await res.json();
    setImageUrl(data.url);
    setUploading(false);
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
          accept="image/*"
          ref={fileInputRef}
          onChange={handleImageUpload}
          className="w-full border p-2 rounded bg-white"
        />
        {uploading && <span className="text-xs text-purple-700">Enviando imagem...</span>}
        {imageUrl && (
          <Image src={imageUrl} alt="Preview" width={400} height={160} className="w-full max-h-40 object-cover rounded border mt-2" />
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