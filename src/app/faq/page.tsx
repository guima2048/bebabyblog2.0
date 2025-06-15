"use client";

import { useEffect, useState } from "react";
import Head from 'next/head';

interface Faq {
  id: number;
  pergunta: string;
  resposta: string;
}

export default function FaqPage() {
  const [faqs, setFaqs] = useState<Faq[]>([]);
  const [loading, setLoading] = useState(true);

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
      <section className="max-w-2xl mx-auto p-6">
        <h1 className="text-3xl font-bold text-[#6b21a8] mb-8 text-center">Perguntas Frequentes</h1>
        {loading ? (
          <div className="text-center text-[#6b21a8]">Carregando FAQs...</div>
        ) : faqs.length === 0 ? (
          <div className="text-center text-[#6b21a8]">Nenhuma FAQ cadastrada ainda.</div>
        ) : (
          <ul className="space-y-6">
            {faqs.map((faq) => (
              <li key={faq.id} className="bg-white rounded-xl shadow p-6 border border-[#c4b5fd]">
                <div className="font-semibold text-lg text-[#6b21a8] mb-2">{faq.pergunta}</div>
                <div className="text-gray-700 leading-relaxed">{faq.resposta}</div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </>
  );
} 