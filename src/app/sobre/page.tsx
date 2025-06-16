import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sobre a Bebaby: Plataforma de Relacionamento Sugar',
  description:
    'Conheça a história, visão e diferenciais da Bebaby — a plataforma de relacionamento sugar baseada em autenticidade, clareza e liberdade.',
};

export default function SobrePage() {
  return (
    <main className="max-w-3xl mx-auto py-10 px-4">
      <h1 className="text-3xl md:text-4xl font-bold mb-8 text-[#6b21a8] text-center">Sobre a Bebaby: Plataforma de Relacionamento Sugar</h1>
      <section className="space-y-6 text-lg leading-relaxed text-gray-800">
        <p>
          <strong>Conectamos pessoas que sabem o que querem da vida na Bebaby</strong>
        </p>
        <p>
          A Bebaby nasceu de uma ideia simples, mas ousada: e se existisse uma plataforma de relacionamento sugar onde tudo fosse baseado em clareza, admiração e generosidade — sem julgamentos, sem rótulos, sem joguinhos?
        </p>
        <p>
          Portanto, em um mundo cheio de encontros vazios, perfis rasos e interesses escondidos, criamos um espaço onde sugar daddies e sugar babys pudessem se encontrar com autenticidade, estilo e liberdade.
        </p>
        <h2 className="text-2xl font-semibold mt-8 mb-2">A origem da Bebaby</h2>
        <p>
          A história começou com uma frustração real: navegar por sites de relacionamento onde tudo parecia falso, forçado e automatizado. Era sempre a mesma coisa — ou seja, promessas vazias, perfis fantasmas e um total descaso com quem buscava algo especial.
        </p>
        <p>
          Por isso, criamos a Bebaby: uma plataforma sugar moderna, elegante e 100% segura, feita para quem valoriza o tempo, a vida e o outro.
        </p>
        <h2 className="text-2xl font-semibold mt-8 mb-2">Nossa visão</h2>
        <p>
          Enxergamos o relacionamento sugar como ele realmente é: um modelo adulto, transparente e legítimo de conexão entre pessoas conscientes.
        </p>
        <ul className="list-disc pl-6 space-y-1">
          <li>Isto é, aqui, não tem tabu.</li>
          <li>Bem como, tem escolha, respeito e propósito.</li>
          <li>Além disso, tem liberdade para sugar babys e segurança para sugar daddies que sabem o que estão buscando.</li>
        </ul>
        <h2 className="text-2xl font-semibold mt-8 mb-2">O que torna a Bebaby diferente?</h2>
        <p>
          A Bebaby não é cópia de sites como "Meu Patrocínio" ou "Universo Sugar". Logo, criamos nosso próprio caminho — mais humano, mais verdadeiro, mais leve.
        </p>
        <p className="font-semibold">Veja o que nos destaca:</p>
        <ul className="list-disc pl-6 space-y-1">
          <li>Perfis verificados com moderação real, sem robôs</li>
          <li>Layout limpo, intuitivo, feito pra fluir</li>
          <li>Incentivo a acordos claros, sem imposições</li>
          <li>Código de conduta vivo e respeitado</li>
          <li>Equipe ativa e dedicada à comunidade</li>
          <li>Total respeito à inteligência e ao valor das pessoas</li>
        </ul>
        <p>
          Na Bebaby, você entra porque quer, não porque precisa. <a href="https://bebaby.app" className="text-violet-700 underline hover:text-violet-900">Acesse nossa plataforma</a>
        </p>
        <h2 className="text-2xl font-semibold mt-8 mb-2">Nosso propósito na Bebaby</h2>
        <p>
          Mais do que juntar sugar daddies e sugar babys, queremos construir um ecossistema de relações conscientes — com estilo, afeto e liberdade de verdade.
        </p>
        <p className="font-semibold">Em outras palavras, a Bebaby é o espaço ideal para quem:</p>
        <ul className="list-disc pl-6 space-y-1">
          <li>Sabe o que quer</li>
          <li>Valoriza experiências com propósito</li>
          <li>Não aceita menos do que merece</li>
          <li>Quer viver algo real, com leveza e segurança</li>
        </ul>
        <h2 className="text-2xl font-semibold mt-8 mb-2">Quer mergulhar ainda mais no universo Bebaby?</h2>
        <p>
          Sendo assim, acompanhe a Bebaby nas redes sociais e descubra dicas exclusivas, histórias reais, conteúdos interativos e tudo que rola por trás da nossa comunidade. Estamos no TikTok, Instagram, Pinterest, YouTube, Rede X (Twitter) e Facebook — sempre com novidades pensadas pra quem sabe o que quer da vida.
        </p>
      </section>
    </main>
  );
} 