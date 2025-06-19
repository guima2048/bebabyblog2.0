"use client";
import { useEffect, useState } from "react";

const redesPadrao = {
  instagram: "",
  facebook: "",
  tiktok: "",
  x: "",
  pinterest: "",
  youtube: ""
};

export default function EditarRedesPage() {
  const [redes, setRedes] = useState(redesPadrao);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    fetch("/api/redes")
      .then(res => res.json())
      .then(data => setRedes({ ...redesPadrao, ...data }));
  }, []);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setRedes({ ...redes, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMsg("");
    const res = await fetch("/api/redes", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(redes)
    });
    setLoading(false);
    if (res.ok) setMsg("Redes sociais atualizadas com sucesso!");
    else setMsg("Erro ao atualizar redes sociais.");
  }

  return (
    <div className="max-w-lg mx-auto py-10 px-4">
      <h1 className="text-2xl font-bold mb-6 text-[#6b21a8]">Editar URLs das Redes Sociais</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {Object.keys(redesPadrao).map((rede) => (
          <div key={rede}>
            <label className="block font-semibold mb-1 capitalize" htmlFor={rede}>{rede}</label>
            <input
              type="url"
              id={rede}
              name={rede}
              value={redes[rede as keyof typeof redes]}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
              placeholder={`URL do ${rede}`}
              required
            />
          </div>
        ))}
        <button type="submit" className="bg-violet-600 hover:bg-violet-700 text-white py-3 px-6 rounded font-semibold mt-4" disabled={loading}>
          {loading ? "Salvando..." : "Salvar"}
        </button>
        {msg && <div className="mt-2 text-center text-green-600 font-bold">{msg}</div>}
      </form>
    </div>
  );
} 