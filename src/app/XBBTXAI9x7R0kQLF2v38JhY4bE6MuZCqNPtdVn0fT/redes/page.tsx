"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const redesPadrao = {
  instagram: "",
  facebook: "",
  tiktok: "",
  x: "",
  pinterest: "",
  youtube: ""
};

export default function EditarRedes() {
  const [redes, setRedes] = useState(redesPadrao);
  const [salvo, setSalvo] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    fetch("/api/redes")
      .then(res => res.json())
      .then(data => {
        if (data) setRedes(data);
      });
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRedes({ ...redes, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSalvo(false);
    const res = await fetch("/api/redes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(redes),
    });
    setLoading(false);
    if (res.ok) setSalvo(true);
  };

  return (
    <section className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6 text-[#6b21a8]">Editar URLs das Redes Sociais</h1>
      <form onSubmit={handleSubmit} className="space-y-4 bg-white border rounded-xl shadow p-6">
        <div className="flex flex-col gap-2">
          <label>Instagram</label>
          <input name="instagram" value={redes.instagram} onChange={handleChange} className="border p-2 rounded" placeholder="https://instagram.com/sua_pagina" />
        </div>
        <div className="flex flex-col gap-2">
          <label>Facebook</label>
          <input name="facebook" value={redes.facebook} onChange={handleChange} className="border p-2 rounded" placeholder="https://facebook.com/sua_pagina" />
        </div>
        <div className="flex flex-col gap-2">
          <label>TikTok</label>
          <input name="tiktok" value={redes.tiktok} onChange={handleChange} className="border p-2 rounded" placeholder="https://tiktok.com/@sua_pagina" />
        </div>
        <div className="flex flex-col gap-2">
          <label>Rede X</label>
          <input name="x" value={redes.x} onChange={handleChange} className="border p-2 rounded" placeholder="https://x.com/sua_pagina" />
        </div>
        <div className="flex flex-col gap-2">
          <label>Pinterest</label>
          <input name="pinterest" value={redes.pinterest} onChange={handleChange} className="border p-2 rounded" placeholder="https://pinterest.com/sua_pagina" />
        </div>
        <div className="flex flex-col gap-2">
          <label>YouTube</label>
          <input name="youtube" value={redes.youtube} onChange={handleChange} className="border p-2 rounded" placeholder="https://youtube.com/@sua_pagina" />
        </div>
        <button type="submit" className="bg-violet-600 text-white px-6 py-2 rounded font-semibold mt-4" disabled={loading}>{loading ? "Salvando..." : "Salvar URLs"}</button>
        {salvo && <div className="text-green-700 mt-2">Salvo com sucesso!</div>}
      </form>
    </section>
  );
} 