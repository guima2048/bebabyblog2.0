"use client";

import { useEffect, useState } from "react";
import Head from 'next/head';

interface Faq {
  id: string;
  pergunta: string;
  resposta: string;
}

export default function FaqPage() {
  const [faqs, setFaqs] = useState<Faq[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState<number | null>(null);

  useEffect(() => {
    fetch("/api/faq")
      .then((res) => res.json())
      .then((data) => {
        setFaqs(data);
        setLoading(false);
      });
  }, []);

  return (
    <>
      <Head>
        <title>Perguntas Frequentes – Bebaby Blog</title>
        <meta name="description" content="FAQ oficial do Bebaby Blog sobre relacionamento sugar, garantias e segurança." />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": faqs.map(item => ({
            "@type": "Question",
            "name": item.pergunta,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": item.resposta
            }
          }))
        }) }} />
      </Head>
      <section className="max-w-3xl mx-auto p-4">
        <div className="border rounded-xl bg-white">
          <h1 className="text-2xl md:text-3xl font-bold p-6 pb-2">Perguntas Frequentes</h1>
          {loading ? (
            <div className="text-center text-[#6b21a8] p-6">Carregando FAQs...</div>
          ) : faqs.length === 0 ? (
            <div className="text-center text-[#6b21a8] p-6">Nenhuma FAQ cadastrada ainda.</div>
          ) : (
            <ul>
              {faqs.map((faq, idx) => (
                <li key={faq.id} className="border-t first:border-t-0 border-black">
                  <button
                    className="w-full text-left p-5 font-semibold flex justify-between items-center focus:outline-none"
                    onClick={() => setOpen(open === idx ? null : idx)}
                    aria-expanded={open === idx}
                    aria-controls={`faq-publico-${faq.id}`}
                  >
                    <span>{faq.pergunta}</span>
                    <span className="text-2xl font-bold">{open === idx ? "−" : "+"}</span>
                  </button>
                  {open === idx && (
                    <div id={`faq-publico-${faq.id}`} className="p-5 pt-0 text-gray-800 border-t border-black">{faq.resposta}</div>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </>
  );
} 