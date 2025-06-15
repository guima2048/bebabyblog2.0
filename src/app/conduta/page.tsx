import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Código de Conduta — Bebaby Blog',
  description: 'Conheça as regras de convivência e os princípios éticos do Bebaby Blog para uma comunidade respeitosa.',
};

export default function CodigoDeCondutaPage() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-16 text-white">
      <h1 className="text-4xl font-bold mb-8">Código de Conduta</h1>
      <p className="text-sm text-gray-400 mb-8">Última atualização: Junho de 2025</p>

      <section className="space-y-8 text-lg leading-relaxed">
        <div>
          <h2 className="text-2xl font-semibold mb-2">1. Respeito mútuo</h2>
          <p>Todos os usuários devem tratar uns aos outros com respeito, independentemente de suas crenças, orientação, aparência ou classe social.</p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-2">2. Liberdade com responsabilidade</h2>
          <p>Valorizamos a liberdade de expressão, mas não toleramos discurso de ódio, assédio, ameaças ou intimidação.</p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-2">3. Segurança em primeiro lugar</h2>
          <p>Não compartilhe dados sensíveis de terceiros e evite práticas que possam comprometer a segurança da plataforma ou de seus usuários.</p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-2">4. Canal de denúncia</h2>
          <p>Conteúdos ou comportamentos inadequados podem ser denunciados. Analisamos todas as denúncias com seriedade e confidencialidade.</p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-2">5. Penalidades</h2>
          <p>O descumprimento das normas pode resultar em advertência, suspensão ou banimento do usuário, conforme a gravidade.</p>
        </div>
      </section>
    </main>
  );
} 