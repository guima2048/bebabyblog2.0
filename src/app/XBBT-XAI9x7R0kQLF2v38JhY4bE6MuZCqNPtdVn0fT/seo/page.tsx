'use client';

import { useState, useEffect } from 'react';
import { siteSEO } from '@/config/seo';

export default function SEOConfigPage() {
  const [googleVerification, setGoogleVerification] = useState('');
  const [gaId, setGaId] = useState('');
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setGoogleVerification(siteSEO.googleVerification);
    setGaId(siteSEO.gaId);
  }, []);

  const handleSave = async () => {
    const body = JSON.stringify({ googleVerification, gaId });
    const res = await fetch('/api/seo', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body,
    });
    if (res.ok) setSaved(true);
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Configurações de SEO</h1>

      <label className="block mb-2 text-sm font-medium">Google Verification</label>
      <input
        type="text"
        value={googleVerification}
        onChange={(e) => setGoogleVerification(e.target.value)}
        className="w-full mb-4 px-3 py-2 border rounded"
      />

      <label className="block mb-2 text-sm font-medium">Google Analytics ID (GA4)</label>
      <input
        type="text"
        value={gaId}
        onChange={(e) => setGaId(e.target.value)}
        placeholder="Ex: G-XXXXXXX"
        className="w-full mb-4 px-3 py-2 border rounded"
      />

      <button
        onClick={handleSave}
        className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition"
      >
        Salvar configurações
      </button>

      {saved && <p className="mt-3 text-green-600">Configurações salvas!</p>}
    </div>
  );
} 