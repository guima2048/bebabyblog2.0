import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Termos de Uso — Bebaby Blog',
  description: 'Leia os termos e condições para utilização segura e transparente do Bebaby Blog.',
};

export default function TermosPage() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-16 text-white">
      <h1 className="text-4xl font-bold mb-8">Termos de Uso</h1>
      <p className="text-sm text-gray-400 mb-8">Última atualização: Junho de 2025</p>

      <section className="space-y-8 text-lg leading-relaxed">
        <div>
          <h2 className="text-2xl font-semibold mb-2">1. Aceitação dos termos</h2>
          <p>Ao acessar este site, você concorda com os termos e condições aqui apresentados.</p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-2">2. Responsabilidades do usuário</h2>
          <p>Você se compromete a utilizar o conteúdo de maneira ética e respeitosa, sem infringir leis ou direitos de terceiros.</p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-2">3. Direitos autorais</h2>
          <p>Todo o conteúdo é protegido por direitos autorais e não pode ser reproduzido sem autorização prévia.</p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-2">4. Modificações</h2>
          <p>O Bebaby Blog reserva-se o direito de modificar estes termos a qualquer momento sem aviso prévio.</p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-2">5. Suspensão de acesso</h2>
          <p>O acesso ao site pode ser suspenso ou encerrado em caso de violação dos termos.</p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-2">6. Foro e legislação</h2>
          <p>Qualquer disputa será resolvida conforme as leis brasileiras, no foro da comarca de São Paulo/SP.</p>
        </div>
      </section>
    </main>
  );
} 