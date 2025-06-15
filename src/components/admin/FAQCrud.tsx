'use client';

import { useState } from 'react';

type FAQ = {
  question: string;
  answer: string;
};

export default function FAQCrud() {
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [newQuestion, setNewQuestion] = useState('');
  const [newAnswer, setNewAnswer] = useState('');

  const addFaq = () => {
    if (!newQuestion || !newAnswer) return;
    setFaqs([...faqs, { question: newQuestion, answer: newAnswer }]);
    setNewQuestion('');
    setNewAnswer('');
  };

  const removeFaq = (index: number) => {
    setFaqs(faqs.filter((_, i) => i !== index));
  };

  const saveToJson = async () => {
    const jsonLd = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": faqs.map(faq => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.answer
        }
      }))
    };

    await fetch('/api/faq', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(jsonLd),
    });
    alert('FAQ exportado para schema.org!');
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">FAQ Bebaby</h2>
      <div className="flex flex-col gap-2">
        <input
          type="text"
          value={newQuestion}
          onChange={(e) => setNewQuestion(e.target.value)}
          placeholder="Pergunta"
          className="border p-2 rounded"
        />
        <textarea
          value={newAnswer}
          onChange={(e) => setNewAnswer(e.target.value)}
          placeholder="Resposta"
          className="border p-2 rounded"
        />
        <button onClick={addFaq} className="bg-violet-600 text-white px-4 py-2 rounded">Adicionar</button>
      </div>

      <ul className="divide-y">
        {faqs.map((faq, i) => (
          <li key={i} className="py-2 flex justify-between items-center">
            <div>
              <strong>{faq.question}</strong><br />
              <span>{faq.answer}</span>
            </div>
            <button onClick={() => removeFaq(i)} className="text-red-600 font-bold">Remover</button>
          </li>
        ))}
      </ul>

      <button onClick={saveToJson} className="bg-green-600 text-white px-4 py-2 rounded">Exportar para schema.org</button>
    </div>
  );
} 