'use client';

import { useEffect, useState } from 'react';
import Head from 'next/head';

export default function SchemaFAQ() {
  const [faqJson, setFaqJson] = useState<string | null>(null);

  useEffect(() => {
    const fetchSchema = async () => {
      try {
        const res = await fetch('/faq-schema.json');
        const json = await res.json();
        setFaqJson(JSON.stringify(json));
      } catch (err) {
        console.error('Erro ao carregar o schema FAQ:', err);
      }
    };
    fetchSchema();
  }, []);

  if (!faqJson) return null;

  return (
    <Head>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: faqJson }}
      />
    </Head>
  );
} 