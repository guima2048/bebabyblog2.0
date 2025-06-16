import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Termos de Uso — Bebaby Blog',
  description: 'Leia os termos e condições para utilização segura e transparente do Bebaby Blog.',
};

export default function TermosPage() {
  return (
    <main className="max-w-3xl mx-auto py-10 px-4">
      <h1 className="text-3xl md:text-4xl font-bold mb-8 text-[#6b21a8] text-center">Termos de Uso</h1>
      <section className="space-y-6 text-lg leading-relaxed text-gray-800">
        <p className="font-semibold">Bem-vindo à Bebaby – Plataforma Sugar Baby e Sugar Daddy</p>
        <p>Este Termo de Uso regula sua experiência na Bebaby, a plataforma dedicada a conectar sugar daddys bem-sucedidos com sugar babys empoderadas, sempre com respeito, privacidade e consentimento como base.</p>
        <p>Ao acessar ou usar nossos serviços, você concorda com as regras descritas aqui. Leia com atenção — a elegância começa com transparência.</p>

        <h2 className="text-2xl font-semibold mt-8 mb-2">Objetivo da Plataforma</h2>
        <p>A Bebaby é um ambiente digital criado para facilitar conexões entre adultos dispostos a viver experiências exclusivas. Valorizamos relacionamentos baseados em:</p>
        <ul className="list-disc pl-6 space-y-1">
          <li>Acordos claros</li>
          <li>Valorização mútua</li>
          <li>Estilo de vida elevado</li>
          <li>Objetivos pessoais bem definidos</li>
        </ul>
        <p>Aqui, nada é imposto. Tudo parte do diálogo e do consentimento entre adultos.</p>

        <h2 className="text-2xl font-semibold mt-8 mb-2">Cadastro e Responsabilidade</h2>
        <p>Para usar a plataforma, você precisa:</p>
        <ul className="list-disc pl-6 space-y-1">
          <li>Ter 18 anos ou mais</li>
          <li>Fornecer informações reais e atualizadas</li>
          <li>Manter uma conduta respeitosa, sem assédio, ameaças ou enganações</li>
        </ul>
        <p>Você é totalmente responsável pelo conteúdo que publica, incluindo textos, imagens, fotos e informações no perfil.</p>

        <h2 className="text-2xl font-semibold mt-8 mb-2">❗ Uso de Imagens de Terceiros</h2>
        <p>A Bebaby não se responsabiliza pelo uso indevido de imagens de terceiros por parte dos usuários. No entanto, qualquer perfil que fizer uso de fotos falsas, roubadas ou sem autorização será imediatamente removido assim que identificado.</p>
        <p>Denúncias podem ser feitas por qualquer pessoa através dos canais oficiais da plataforma.</p>

        <h2 className="text-2xl font-semibold mt-8 mb-2">Condutas Proibidas</h2>
        <p>O usuário não pode, sob nenhuma circunstância:</p>
        <ul className="list-disc pl-6 space-y-1">
          <li>Criar perfis falsos ou usar identidade de terceiros</li>
          <li>Usar linguagem ofensiva, discriminatória ou agressiva</li>
          <li>Compartilhar conteúdos íntimos sem consentimento</li>
          <li>Oferecer ou solicitar serviços que violem leis brasileiras</li>
          <li>Fazer spam, aplicar golpes ou manipular emocionalmente outros usuários</li>
          <li>Pedir, cobrar ou exigir dinheiro como condição para conversar ou interagir</li>
        </ul>
        <p className="font-semibold">A prática de pedir dinheiro diretamente como pré-condição para qualquer tipo de conversa ou relação na plataforma é permanentemente proibida. Usuários que fizerem isso serão banidos imediatamente, sem direito a retorno.</p>

        <h2 className="text-2xl font-semibold mt-8 mb-2">Privacidade e Proteção de Dados</h2>
        <p>Todos os dados fornecidos estão protegidos conforme nossa Política de Privacidade. Utilizamos sistemas de segurança e criptografia para manter sua experiência protegida e sigilosa.</p>

        <h2 className="text-2xl font-semibold mt-8 mb-2">Conteúdo Gerado pelo Usuário</h2>
        <p>Você mantém a posse do que publica, mas nos concede uma licença limitada e não exclusiva para exibir seus conteúdos dentro da plataforma, para fins de interação com outros usuários.</p>
        <p>Não usaremos suas imagens, textos ou dados fora do site, nem venderemos a terceiros.</p>

        <h2 className="text-2xl font-semibold mt-8 mb-2">Modificações na Plataforma</h2>
        <p>Podemos alterar, remover ou incluir funcionalidades a qualquer momento, sempre buscando:</p>
        <ul className="list-disc pl-6 space-y-1">
          <li>Melhorar a experiência do usuário</li>
          <li>Reforçar a segurança</li>
          <li>Tornar o ambiente mais justo e acolhedor</li>
        </ul>
        <p>Mudanças nos Termos de Uso serão informadas com destaque no site.</p>

        <h2 className="text-2xl font-semibold mt-8 mb-2">⚖️ Responsabilidades Legais</h2>
        <p>A Bebaby não se responsabiliza por interações fora da plataforma, nem pelo conteúdo publicado pelos usuários. Incentivamos o uso consciente, com respeito mútuo, conversas claras e precaução.</p>
      </section>
    </main>
  );
} 