"use client";

import { useState } from 'react';

export default function ContatoPage() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [form, setForm] = useState({ nome: '', email: '', assunto: '', mensagem: '', sobrenome: '', emailConfirm: '', usuario: '', premium: '', pagamento: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');

    try {
      const res = await fetch('/api/contato', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (res.ok) setStatus('success');
      else throw new Error();
    } catch {
      setStatus('error');
    }
  };

  return (
    <main className="max-w-3xl mx-auto px-6 py-16 text-white">
      <h1 className="text-4xl font-bold mb-4">Fale com a gente</h1>
      <p className="mb-8 text-gray-400">Envie sua dúvida, sugestão ou proposta.</p>

      <div className="bg-white/10 rounded-xl p-6 mb-8 text-gray-800 space-y-4 font-sans">
        <h2 className="text-2xl font-semibold text-[#6b21a8]">Fale Aqui com a Bebaby – Suporte e Contato</h2>
        <p>Estamos aqui por você, sempre que precisar.<br/>
        Assim, na Bebaby, acreditamos que uma plataforma confiável começa com comunicação aberta, respeito e escuta ativa.<br/>
        Por isso, se você tiver dúvidas, sugestões, elogios ou encontrar algo fora do lugar, fale com a gente. Nosso time de atendimento está disponível 24 horas por dia, pronto pra te ouvir, orientar e garantir a melhor experiência possível.<br/>
        Basta procurar por aqui "bebaby suporte" e reclame! Você verá que estamos presentes, acessíveis e prontos pra resolver qualquer situação com transparência.</p>
        <p>Enquanto isso, a Bebaby atua com total responsabilidade, segue rigorosamente a LGPD, protege seus dados com segurança de ponta e garante que tudo dentro da plataforma é real, verificado e construído para oferecer uma experiência verdadeira e segura.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 bg-white rounded-xl p-8 shadow font-sans">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block font-semibold mb-1 text-gray-900">Nome Completo <span className="text-red-600">*</span></label>
            <input
              type="text"
              placeholder="Nome"
              className="w-full p-3 rounded bg-gray-100 border border-gray-300 text-gray-900"
              required
              value={form.nome}
              onChange={(e) => setForm({ ...form, nome: e.target.value })}
            />
          </div>
          <div>
            <label className="block font-semibold mb-1 invisible text-gray-900">Sobrenome</label>
            <input
              type="text"
              placeholder="Sobrenome"
              className="w-full p-3 rounded bg-gray-100 border border-gray-300 text-gray-900"
              required
              value={form.sobrenome || ''}
              onChange={(e) => setForm({ ...form, sobrenome: e.target.value })}
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block font-semibold mb-1 text-gray-900">Email <span className="text-red-600">*</span></label>
            <input
              type="email"
              placeholder="E-mail"
              className="w-full p-3 rounded bg-gray-100 border border-gray-300 text-gray-900"
              required
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </div>
          <div>
            <label className="block font-semibold mb-1 invisible text-gray-900">Confirmar e-mail</label>
            <input
              type="email"
              placeholder="Confirmar e-mail"
              className="w-full p-3 rounded bg-gray-100 border border-gray-300 text-gray-900"
              required
              value={form.emailConfirm || ''}
              onChange={(e) => setForm({ ...form, emailConfirm: e.target.value })}
            />
          </div>
        </div>
        <div>
          <label className="block font-semibold mb-1 text-gray-900">Nome de usuário cadastrado no site <span className="text-red-600">*</span></label>
          <input
            type="text"
            placeholder="Nome do usuário cadastrado no site Bebaby.app"
            className="w-full p-3 rounded bg-gray-100 border border-gray-300 text-gray-900"
            maxLength={10}
            required
            value={form.usuario || ''}
            onChange={(e) => setForm({ ...form, usuario: e.target.value })}
          />
          <span className="text-xs text-gray-500">Nome do usuário cadastrado no site Bebaby.app<br/>0 de 10 caracteres no máximo.</span>
        </div>
        <div>
          <label className="block font-semibold mb-1 text-gray-900">É usuário Premium? <span className="text-red-600">*</span></label>
          <input
            type="text"
            placeholder="Responda Sim ou Não"
            className="w-full p-3 rounded bg-gray-100 border border-gray-300 text-gray-900"
            required
            value={form.premium || ''}
            onChange={(e) => setForm({ ...form, premium: e.target.value })}
          />
          <span className="text-xs text-gray-500">Responda Sim ou Não</span>
        </div>
        <div>
          <label className="block font-semibold mb-1 text-gray-900">Quando fez o pagamento?</label>
          <input
            type="text"
            placeholder="Se você não é usuário Premium não responda."
            className="w-full p-3 rounded bg-gray-100 border border-gray-300 text-gray-900"
            value={form.pagamento || ''}
            onChange={(e) => setForm({ ...form, pagamento: e.target.value })}
          />
          <span className="text-xs text-gray-500">Se você não é usuário Premium não responda.</span>
        </div>
        <div>
          <label className="block font-semibold mb-1 text-gray-900">Escreva aqui sua mensagem <span className="text-red-600">*</span></label>
          <textarea
            placeholder="escreva aqui..."
            className="w-full p-3 h-32 rounded bg-gray-100 border border-gray-300 text-gray-900"
            required
            value={form.mensagem}
            onChange={(e) => setForm({ ...form, mensagem: e.target.value })}
          />
          <span className="text-xs text-gray-500">Responderemos o mais breve possível.</span>
        </div>
        <button
          type="submit"
          className="bg-violet-600 hover:bg-violet-700 px-6 py-3 rounded text-white font-semibold"
          disabled={status === 'sending'}
        >
          {status === 'sending' ? 'Enviando...' : 'Enviar mensagem'}
        </button>
        {status === 'success' && <p className="text-green-600">Mensagem enviada com sucesso!</p>}
        {status === 'error' && <p className="text-red-600">Erro ao enviar. Tente novamente.</p>}
      </form>

      <section className="mt-10 space-y-4 text-gray-800 bg-white/70 rounded-xl p-6">
        <h2 className="text-2xl font-semibold text-[#6b21a8] mb-2">Prefere falar com o Bebaby Suporte – Reclame</h2>
        <p>Prefere falar direto?<br />
        Mande um e-mail para nossa equipe humanizada que você será respondido em breve.</p>
        <p className="font-bold text-lg">bebaby@bebaby.app</p>
        <p>Atendimento de segunda a sexta, das 10 horas da manhã até às 18 horas da noite.</p>
        <p>A Bebaby é feita por pessoas para pessoas.<br />
        Mesmo assim, nosso compromisso vai além de conectar sugar babys e sugar daddys. Portanto, oferecemos segurança emocional, suporte real e um espaço onde você se sinta respeitado(a), valorizado(a) e livre para viver conexões verdadeiras, sem julgamentos. Se tiver qualquer dúvida, procure por "bebaby suporte aqui" e reclame e veja como estamos sempre prontos para ouvir e resolver com transparência.</p>
        <p>Por fim, estamos aqui — sempre.</p>
        <ul className="list-disc pl-6 space-y-1">
          <li><a href="/privacidade" className="text-violet-700 underline hover:text-violet-900">Leia também nossas Políticas de Privacidade</a></li>
          <li><a href="/termos" className="text-violet-700 underline hover:text-violet-900">Leia também nossos Termos de Uso</a></li>
          <li><a href="/faq" className="text-violet-700 underline hover:text-violet-900">Tire suas dúvidas também em Perguntas Frequentes – FAQ Bebaby</a></li>
        </ul>
        <h3 className="text-xl font-semibold mt-6">Quer mergulhar ainda mais no universo sugar da Bebaby?</h3>
        <p>Sendo assim, acompanhe a Bebaby nas redes sociais e descubra dicas exclusivas, histórias reais, conteúdos interativos e tudo que rola por trás da nossa comunidade. Estamos no TikTok, Instagram, Pinterest, YouTube, Rede X (Twitter) e Facebook — sempre com novidades pensadas pra quem sabe o que quer da vida.</p>
        <p className="mt-4">A Bebaby é real e você pode confiar no nosso trabalho. Estamos no mercado desde 2021, mudando vidas com responsabilidade, transparência e compromisso. Entregamos com exatidão, segurança e alto índice de sucesso todos os serviços que oferecemos, sempre focando na melhor experiência possível para nossos usuários.</p>
      </section>
    </main>
  );
} 