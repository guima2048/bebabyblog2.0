import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Política de Privacidade — Bebaby Blog',
  description: 'Entenda como protegemos seus dados e respeitamos sua privacidade ao navegar pelo Bebaby Blog.',
};

export default function PoliticaPrivacidadePage() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-16 text-white">
      <h1 className="text-4xl font-bold mb-8">Política de Privacidade</h1>
      <p className="text-sm text-gray-400 mb-8">Última atualização: Junho de 2025</p>

      <section className="space-y-8 text-lg leading-relaxed">
        <div>
          <h2 className="text-2xl font-semibold mb-2">1. Coleta de informações</h2>
          <p>Coletamos dados fornecidos por você, como nome, e-mail e informações de navegação em nosso site.</p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-2">2. Uso das informações</h2>
          <p>Utilizamos os dados para personalizar sua experiência, melhorar nossos conteúdos e enviar comunicações relevantes.</p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-2">3. Cookies</h2>
          <p>Usamos cookies para análise de tráfego, preferências de navegação e melhorias no desempenho do site.</p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-2">4. Compartilhamento</h2>
          <p>Não compartilhamos suas informações com terceiros, exceto quando exigido por lei.</p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-2">5. Seus direitos</h2>
          <p>Você pode solicitar acesso, alteração ou exclusão de seus dados a qualquer momento através do nosso canal de contato.</p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-2">6. Alterações na política</h2>
          <p>Reservamo-nos o direito de alterar esta política a qualquer momento. Mudanças serão atualizadas nesta página.</p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-2">7. Contato</h2>
          <p>Para dúvidas sobre privacidade, entre em contato via <a href="/contato" className="underline text-pink-400">nossa página de suporte</a>.</p>
        </div>
      </section>
    </main>
  );
} 