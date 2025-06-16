import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Código de Conduta — Bebaby Blog',
  description: 'Conheça as regras de convivência e os princípios éticos do Bebaby Blog para uma comunidade respeitosa.',
};

export default function CodigoDeCondutaPage() {
  return (
    <main className="max-w-3xl mx-auto py-10 px-4">
      <h1 className="text-3xl md:text-4xl font-bold mb-8 text-[#6b21a8] text-center">Código de Conduta – Bebaby funciona</h1>
      <section className="space-y-6 text-lg leading-relaxed text-gray-800">
        <p className="font-semibold">Um relacionamento elegante começa com respeito.</p>
        <p>Na Bebaby, acreditamos que todo encontro — seja ele casual ou profundo — precisa de três pilares: respeito, clareza e consentimento. Então, nosso Código de Conduta existe para garantir que a Bebaby funciona a cada interação na plataforma seja segura, genuína e positiva.</p>

        <h2 className="text-2xl font-semibold mt-8 mb-2">Comportamento Esperado</h2>
        <p>Por isso, ao participar da comunidade Bebaby, você se compromete a:</p>
        <ul className="list-disc pl-6 space-y-1">
          <li>Tratar todos os usuários com respeito, sem julgamentos ou agressividade</li>
          <li>Ser honesto(a) sobre suas intenções, perfil e estilo de vida</li>
          <li>Respeitar os limites e decisões dos outros — "não" é não</li>
          <li>Usar a plataforma de forma civilizada, sem vulgaridades forçadas</li>
          <li>Praticar a elegância digital: sem spam, sem insistência, sem pressão</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-2">Bebaby: Condutas Inaceitáveis que funciona</h2>
        <p>Enquanto isso, a Bebaby zela por uma comunidade refinada. Por isso, os seguintes comportamentos são terminantemente proibidos:</p>
        <ul className="list-disc pl-6 space-y-1">
          <li>Criar perfis falsos ou usar identidade de terceiros</li>
          <li>Publicar fotos de outras pessoas sem autorização</li>
          <li>Solicitar ou oferecer dinheiro como condição para interações</li>
          <li>Forçar conversas, insistir após rejeição ou enviar mensagens ofensivas</li>
          <li>Praticar assédio, manipulação emocional, ameaças ou chantagens</li>
          <li>Compartilhar conteúdo íntimo de terceiros, mesmo com consentimento prévio</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-2">Tolerância Zero que faz Bebaby funcionar</h2>
        <p>No entanto, ao detectar qualquer uma dessas práticas, o perfil será suspenso imediatamente, podendo ser banido permanentemente, mesmo sem aviso prévio.<br/>Por fim, queremos uma plataforma limpa, leve e focada em relacionamentos reais, com classe.</p>

        <h2 className="text-2xl font-semibold mt-8 mb-2">Denúncias</h2>
        <p>Isto é, todos os usuários têm o direito de denunciar comportamentos suspeitos.<br/>Outro exemplo, você pode fazer isso diretamente no perfil da pessoa ou através do e-mail oficial:</p>
        <p className="font-bold text-lg">bebaby@bebaby.app</p>
        <p>Em outras palavras, cada denúncia será analisada com atenção, sigilo e justiça.</p>

        <h2 className="text-2xl font-semibold mt-8 mb-2">Consciência Bebaby Sugar funciona</h2>
        <p>A Bebaby funciona e é um espaço onde sugar babys e sugar daddys podem se encontrar sem julgamentos, mas com regras claras. Nosso foco é criar pontes entre mundos diferentes com elegância, sem transformar a plataforma num mercado de interesses vazios.</p>
        <p>A troca aqui é emocional, vivencial e transparente — nunca imposta, nunca obrigatória.</p>

        <h2 className="text-2xl font-semibold mt-8 mb-2">Quer mergulhar ainda mais no universo sugar da Bebaby?</h2>
        <p>Sendo assim, acompanhe a Bebaby nas redes sociais e descubra dicas exclusivas, histórias reais, conteúdos interativos e tudo que rola por trás da nossa comunidade. Estamos no TikTok, Instagram, Pinterest, YouTube, Rede X (Twitter) e Facebook — sempre com novidades pensadas pra quem sabe o que quer da vida.</p>
        <p className="mt-4">Por fim, estamos aqui — sempre.</p>
        <ul className="list-disc pl-6 space-y-1">
          <li><a href="/privacidade" className="text-violet-700 underline hover:text-violet-900">Leia também nossas Políticas de Privacidade</a></li>
          <li><a href="/termos" className="text-violet-700 underline hover:text-violet-900">Leia também nossos Termos de Uso</a></li>
          <li><a href="/faq" className="text-violet-700 underline hover:text-violet-900">Tire suas dúvidas também em Perguntas Frequentes – FAQ Bebaby</a></li>
        </ul>
      </section>
    </main>
  );
} 