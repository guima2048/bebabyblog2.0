"use client";
import { useState } from "react";
import Link from "next/link";
import { Oswald } from "next/font/google";
const oswald = Oswald({ subsets: ["latin"], weight: ["400","700"] });

export default function MenuHamburguer() {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <>
      <button 
        className="p-2 rounded-md text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-purple-500" 
        onClick={() => setMenuOpen(true)}
        aria-label="Abrir menu"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
      {menuOpen && (
        <>
          {/* Overlay com blur e escurecimento */}
          <div
            className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm transition-opacity"
            onClick={() => setMenuOpen(false)}
          />
          {/* Drawer lateral esquerdo */}
          <aside className="fixed top-0 left-0 h-full w-72 bg-[#210d41] z-50 flex flex-col p-6 shadow-2xl">
            <button 
              className="text-3xl text-gray-300 self-end mb-6 hover:text-white" 
              onClick={() => setMenuOpen(false)}
              aria-label="Fechar menu"
            >
              &times;
            </button>
            <nav className="flex flex-col gap-6 text-gray-200 text-lg" style={{fontFamily: oswald.style.fontFamily}}>
              <Link href="/" className="hover:text-white" onClick={() => setMenuOpen(false)}>Início</Link>
              <Link href="https://bebaby.app" className="hover:text-white" onClick={() => setMenuOpen(false)}>Entrar</Link>
              <Link href="https://bebaby.app" className="hover:text-white" onClick={() => setMenuOpen(false)}>Cadastre-se</Link>
              <Link href="/sobre" className="hover:text-white" onClick={() => setMenuOpen(false)}>Como funciona</Link>
              <Link href="/faq" className="hover:text-white" onClick={() => setMenuOpen(false)}>Perguntas frequentes</Link>
              <Link href="/contato" className="hover:text-white" onClick={() => setMenuOpen(false)}>Fale conosco</Link>
            </nav>
          </aside>
        </>
      )}
    </>
  );
} 