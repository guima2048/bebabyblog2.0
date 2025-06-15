import Image from 'next/image';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sobre o Bebaby Blog — Conheça nossa missão',
  description:
    'Descubra quem somos, o que acreditamos e como ajudamos mulheres a viverem o melhor do universo sugar.',
};

export default function SobrePage() {
  return (
    <main className="max-w-4xl mx-auto px-4 py-16 text-white">
      <h1 className="text-4xl font-bold mb-10 text-center">Quem somos</h1>

      <section className="space-y-8 text-lg leading-relaxed">
        <p>
          O <strong>Bebaby Blog</strong> nasceu com um propósito ousado: ser a fonte mais confiável e inspiradora sobre o universo sugar no Brasil.
          Aqui falamos de liberdade, luxo, inteligência emocional e oportunidades reais para mulheres que buscam crescer com elegância.
        </p>

        <div className="grid md:grid-cols-3 gap-6 mt-10">
          <div>
            <h2 className="text-xl font-semibold mb-2">🌟 Missão</h2>
            <p>Empoderar mulheres com conteúdo de qualidade sobre relações modernas, luxo acessível e escolhas conscientes.</p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">🎯 Visão</h2>
            <p>Transformar o Bebaby na principal plataforma de estilo de vida sugar da América Latina.</p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">💎 Valores</h2>
            <p>Autenticidade, privacidade, respeito, prosperidade e beleza real.</p>
          </div>
        </div>

        <div className="mt-12">
          <Image
            src="/images/sobre-nos.jpg"
            alt="Equipe Bebaby"
            width={1000}
            height={600}
            className="rounded-2xl shadow-xl"
          />
        </div>
      </section>
    </main>
  );
} 