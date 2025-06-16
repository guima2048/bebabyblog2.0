"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        router.push("/XBBT-XAI9x7R0kQLF2v38JhY4bE6MuZCqNPtdVn0fT");
      } else {
        setError(data.error || "Usuário ou senha inválidos");
      }
    } catch (err) {
      setError("Erro ao tentar fazer login");
      console.error("Erro no login:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-[#e9d8fd]">
      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg p-8 w-full max-w-sm flex flex-col gap-4 border border-[#c4b5fd]">
        <h1 className="text-2xl font-bold text-[#6b21a8] mb-2 text-center">Login Admin</h1>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="E-mail"
          className="border p-2 rounded"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Senha"
          className="border p-2 rounded"
          required
        />
        {error && <div className="text-red-600 text-sm text-center">{error}</div>}
        <button type="submit" className="bg-violet-600 text-white px-6 py-2 rounded font-semibold" disabled={loading}>
          {loading ? "Entrando..." : "Entrar"}
        </button>
      </form>
    </section>
  );
} 