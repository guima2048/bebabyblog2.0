"use client";
import { useEffect, useState } from "react";

function FaqRodape() {
  const [faqs, setFaqs] = useState<any[]>([]);
  const [open, setOpen] = useState<number | null>(null);

  useEffect(() => {
    fetch("/api/faq")
      .then(res => res.json())
      .then(data => setFaqs(data));
  }, []);

  if (!faqs.length) return null;

  return (
    <div className="border rounded-xl mt-8 bg-white">
      <h2 className="text-2xl font-bold p-4 border-b">Perguntas Frequentes</h2>
      {faqs.map((faq, idx) => (
        <div key={faq.id} className="border-b last:border-b-0">
          <button
            className="w-full text-left p-4 font-semibold flex justify-between items-center focus:outline-none"
            onClick={() => setOpen(open === idx ? null : idx)}
            aria-expanded={open === idx}
            aria-controls={`faq-rodape-${faq.id}`}
          >
            <span>{faq.pergunta}</span>
            <span>{open === idx ? "−" : "+"}</span>
          </button>
          {open === idx && (
            <div id={`faq-rodape-${faq.id}`} className="p-4 pt-0 text-gray-700">{faq.resposta}</div>
          )}
        </div>
      ))}
    </div>
  );
}

export default function FooterRedes() {
  const [redes, setRedes] = useState({
    instagram: "#",
    facebook: "#",
    tiktok: "#",
    x: "#",
    pinterest: "#",
    youtube: "#"
  });

  useEffect(() => {
    fetch("/api/redes")
      .then(res => res.json())
      .then(data => {
        if (data) setRedes({
          instagram: data.instagram || "#",
          facebook: data.facebook || "#",
          tiktok: data.tiktok || "#",
          x: data.x || "#",
          pinterest: data.pinterest || "#",
          youtube: data.youtube || "#"
        });
      });
  }, []);

  return (
    <div className="flex gap-4 mt-4">
      <a href={redes.instagram} aria-label="Instagram" className="hover:text-violet-600 transition-colors" target="_blank" rel="noopener noreferrer">
        <svg width="24" height="24" fill="none" viewBox="0 0 24 24"><rect width="20" height="20" x="2" y="2" rx="5" stroke="#6b21a8" strokeWidth="2"/><circle cx="12" cy="12" r="5" stroke="#6b21a8" strokeWidth="2"/><circle cx="17.5" cy="6.5" r="1.5" fill="#6b21a8"/></svg>
      </a>
      <a href={redes.facebook} aria-label="Facebook" className="hover:text-violet-600 transition-colors" target="_blank" rel="noopener noreferrer">
        <svg width="24" height="24" fill="none" viewBox="0 0 24 24"><rect width="20" height="20" x="2" y="2" rx="5" stroke="#6b21a8" strokeWidth="2"/><path d="M15 8h-2a1 1 0 0 0-1 1v2h3l-.5 2H12v6h-2v-6H8v-2h2V9a3 3 0 0 1 3-3h2v2Z" fill="#6b21a8"/></svg>
      </a>
      <a href={redes.tiktok} aria-label="TikTok" className="hover:text-violet-600 transition-colors" target="_blank" rel="noopener noreferrer">
        <svg width="24" height="24" fill="none" viewBox="0 0 24 24"><rect width="20" height="20" x="2" y="2" rx="5" stroke="#6b21a8" strokeWidth="2"/><path d="M16 8.5c-1.1 0-2-.9-2-2V6h-2v8.5a1.5 1.5 0 1 1-1.5-1.5" stroke="#6b21a8" strokeWidth="2"/><circle cx="10.5" cy="15.5" r="1.5" fill="#6b21a8"/></svg>
      </a>
      <a href={redes.x} aria-label="X" className="hover:text-violet-600 transition-colors" target="_blank" rel="noopener noreferrer">
        <svg width="24" height="24" fill="none" viewBox="0 0 24 24"><rect width="20" height="20" x="2" y="2" rx="5" stroke="#6b21a8" strokeWidth="2"/><path d="M8 8l8 8M16 8l-8 8" stroke="#6b21a8" strokeWidth="2"/></svg>
      </a>
      <a href={redes.pinterest} aria-label="Pinterest" className="hover:text-violet-600 transition-colors" target="_blank" rel="noopener noreferrer">
        <svg width="24" height="24" fill="none" viewBox="0 0 24 24"><rect width="20" height="20" x="2" y="2" rx="5" stroke="#6b21a8" strokeWidth="2"/><circle cx="12" cy="12" r="5" stroke="#6b21a8" strokeWidth="2"/><path d="M12 17v-3" stroke="#6b21a8" strokeWidth="2"/><circle cx="12" cy="14" r=".5" fill="#6b21a8"/></svg>
      </a>
      <a href={redes.youtube} aria-label="YouTube" className="hover:text-violet-600 transition-colors" target="_blank" rel="noopener noreferrer">
        <svg width="24" height="24" fill="none" viewBox="0 0 24 24"><rect width="20" height="20" x="2" y="2" rx="5" stroke="#6b21a8" strokeWidth="2"/><rect x="9" y="10" width="6" height="4" rx="1" fill="#6b21a8"/><polygon points="12,11 14,12 12,13" fill="#fff"/></svg>
      </a>
    </div>
  );
} 