"use client";
import Link from "next/link";
import { useState } from "react";

const redesIniciais = {
  instagram: "",
  facebook: "",
  tiktok: "",
  x: "",
  pinterest: "",
  youtube: ""
};

export default function AdminHome() {
  const [redes, setRedes] = useState(redesIniciais);

  return (
    <section className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold text-[#6b21a8] mb-4">Bem-vindo ao Painel Admin</h1>
      <p className="text-lg text-[#6b21a8] mb-8">Escolha uma opção para gerenciar o conteúdo do site:</p>
      <nav className="flex flex-col gap-4 w-full max-w-xs mb-8">
        <Link href="/XBBTXAI9x7R0kQLF2v38JhY4bE6MuZCqNPtdVn0fT/revisao" className="bg-violet-600 hover:bg-violet-700 text-white py-3 px-6 rounded text-center font-semibold shadow">
          Revisão do Projeto
        </Link>
        <Link href="/XBBTXAI9x7R0kQLF2v38JhY4bE6MuZCqNPtdVn0fT/posts/list" className="bg-violet-600 hover:bg-violet-700 text-white py-3 px-6 rounded text-center font-semibold shadow">
          Gerenciar Posts
        </Link>
        <Link href="/XBBTXAI9x7R0kQLF2v38JhY4bE6MuZCqNPtdVn0fT/comments" className="bg-violet-600 hover:bg-violet-700 text-white py-3 px-6 rounded text-center font-semibold shadow">
          Moderação de Comentários
        </Link>
        <Link href="/XBBTXAI9x7R0kQLF2v38JhY4bE6MuZCqNPtdVn0fT/redes" className="bg-violet-600 hover:bg-violet-700 text-white py-3 px-6 rounded text-center font-semibold shadow">
          Editar Redes Sociais
        </Link>
        <Link href="/XBBTXAI9x7R0kQLF2v38JhY4bE6MuZCqNPtdVn0fT/login" className="bg-gray-200 hover:bg-gray-300 text-violet-700 py-3 px-6 rounded text-center font-semibold shadow">
          Sair / Login
        </Link>
      </nav>
      <Link
        href="/XBBTXAI9x7R0kQLF2v38JhY4bE6MuZCqNPtdVn0fT/redes"
        className="bg-violet-600 hover:bg-violet-700 text-white py-3 px-6 rounded text-center font-semibold shadow mt-2 w-full max-w-xs"
      >
        Editar URLs das Redes
      </Link>
      <Link
        href="/XBBTXAI9x7R0kQLF2v38JhY4bE6MuZCqNPtdVn0fT/faq"
        className="bg-violet-600 hover:bg-violet-700 text-white py-3 px-6 rounded text-center font-semibold shadow mt-2 w-full max-w-xs"
      >
        Adicionar/Editar Faq do Rodape
      </Link>
    </section>
  );
} 