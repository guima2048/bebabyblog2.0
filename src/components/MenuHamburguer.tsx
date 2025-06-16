"use client";
import { useState } from "react";
import Link from "next/link";
import { Oswald } from "next/font/google";
const oswald = Oswald({ subsets: ["latin"], weight: ["400","700"] });

export default function MenuHamburguer() {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <>
      <button className="text-2xl" onClick={() => setMenuOpen(true)}>≡</button>
      {menuOpen && (
        <>
          {/* Overlay com blur e escurecimento */}
          <div
            className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm transition-opacity"
            onClick={() => setMenuOpen(false)}
          />
          {/* Drawer lateral esquerdo */}
          <aside className="fixed top-0 left-0 h-full w-72 bg-[#0a101a] z-50 flex flex-col p-8 shadow-2xl">
            <button className="text-3xl text-white self-end mb-8" onClick={() => setMenuOpen(false)}>&times;</button>
            <nav className="flex flex-col gap-7 text-white text-lg" style={{fontFamily: oswald.style.fontFamily}}>
              <Link href="/" onClick={() => setMenuOpen(false)}>Início</Link>
              <Link href="https://bebaby.app" onClick={() => setMenuOpen(false)}>Entrar</Link>
              <Link href="https://bebaby.app" onClick={() => setMenuOpen(false)}>Cadastre-se</Link>
              <Link href="/sobre" onClick={() => setMenuOpen(false)}>Como funciona</Link>
              <Link href="/faq" onClick={() => setMenuOpen(false)}>Perguntas frequentes</Link>
              <Link href="/contato" onClick={() => setMenuOpen(false)}>Fale conosco</Link>
            </nav>
          </aside>
        </>
      )}
    </>
  );
} 