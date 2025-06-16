import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Política de Privacidade — Bebaby Blog',
  description: 'Entenda como protegemos seus dados e respeitamos sua privacidade ao navegar pelo Bebaby Blog.',
};

export default function PoliticaPrivacidadePage() {
  return (
    <main className="max-w-3xl mx-auto py-10 px-4">
      <h1 className="text-3xl md:text-4xl font-bold mb-8 text-[#6b21a8] text-center">Política de Privacidade – bebaby.app</h1>
      <section className="space-y-6 text-lg leading-relaxed text-gray-800">
        <p>A sua privacidade é prioridade para nós. O bebaby.app se compromete a proteger os dados pessoais dos usuários e a garantir uma experiência segura, transparente e responsável.</p>
        <h2 className="text-2xl font-semibold mt-8 mb-2">1. Coleta de informações</h2>
        <p>Coletamos as seguintes informações no momento do cadastro ou uso da plataforma:</p>
        <ul className="list-disc pl-6 space-y-1">
          <li>Nome e apelido de usuário</li>
          <li>Idade, localização (cidade/estado) e gênero</li>
          <li>E-mail para comunicação e segurança</li>
          <li>Imagens e textos inseridos no perfil</li>
          <li>Informações de acesso, como IP, navegador e dispositivo</li>
          <li>Histórico de interações e mensagens (para segurança e moderação)</li>
        </ul>
        <h2 className="text-2xl font-semibold mt-8 mb-2">2. Uso das informações</h2>
        <p>Os dados coletados são utilizados para:</p>
        <ul className="list-disc pl-6 space-y-1">
          <li>Permitir a criação e exibição do seu perfil na plataforma</li>
          <li>Garantir a segurança dos usuários e prevenir fraudes</li>
          <li>Moderação de conteúdo e verificação manual de perfis</li>
          <li>Enviar notificações e comunicações importantes</li>
          <li>Personalizar a experiência de uso</li>
          <li>Melhorar nossos serviços com base em estatísticas e feedbacks</li>
        </ul>
        <h2 className="text-2xl font-semibold mt-8 mb-2">3. Compartilhamento de dados</h2>
        <p>Nós não vendemos, alugamos ou compartilhamos seus dados com terceiros, exceto:</p>
        <ul className="list-disc pl-6 space-y-1">
          <li>Quando exigido por lei ou decisão judicial</li>
          <li>Para cumprir obrigações legais ou regulatórias</li>
          <li>Com empresas parceiras que auxiliam na operação da plataforma (ex: hospedagem, segurança de dados), sempre sob cláusula de sigilo</li>
        </ul>
        <h2 className="text-2xl font-semibold mt-8 mb-2">4. Aprovação manual de perfis</h2>
        <p>Após o cadastro, todos os perfis passam por análise manual da nossa equipe, com o objetivo de manter um ambiente seguro, verdadeiro e livre de conteúdo inadequado.</p>
        <h2 className="text-2xl font-semibold mt-8 mb-2">5. Cookies e tecnologias de rastreamento</h2>
        <p>Utilizamos cookies e ferramentas como Google Analytics e Google Ads para:</p>
        <ul className="list-disc pl-6 space-y-1">
          <li>Medir desempenho do site</li>
          <li>Melhorar a navegação</li>
          <li>Exibir anúncios relevantes (caso esteja ativado)</li>
        </ul>
        <p>Você pode desativar os cookies nas configurações do seu navegador.</p>
        <h2 className="text-2xl font-semibold mt-8 mb-2">6. Armazenamento e segurança</h2>
        <p>Seus dados são armazenados em servidores seguros e protegidos por criptografia e protocolos de segurança avançados. A navegação é protegida por certificado SSL (HTTPS).</p>
        <h2 className="text-2xl font-semibold mt-8 mb-2">7. Seus direitos como usuário</h2>
        <p>Você pode, a qualquer momento:</p>
        <ul className="list-disc pl-6 space-y-1">
          <li>Solicitar a alteração ou remoção do seu perfil</li>
          <li>Corrigir informações pessoais</li>
          <li>Solicitar cópia ou exclusão definitiva dos seus dados</li>
          <li>Retirar consentimentos previamente dados</li>
        </ul>
        <p>Para isso, basta enviar um e-mail para: <a href="mailto:bebaby@bebaby.app" className="text-violet-700 underline hover:text-violet-900">bebaby@bebaby.app</a></p>
        <h2 className="text-2xl font-semibold mt-8 mb-2">8. Alterações nesta política</h2>
        <p>Esta política pode ser atualizada periodicamente. A versão mais recente estará sempre disponível nesta página. O uso contínuo do site após alterações indica sua aceitação.</p>
        <h2 className="text-2xl font-semibold mt-8 mb-2">9. Contato</h2>
        <p>Dúvidas ou solicitações relacionadas à privacidade devem ser enviadas para: <a href="mailto:bebaby@bebaby.app" className="text-violet-700 underline hover:text-violet-900">bebaby@bebaby.app</a></p>
      </section>
    </main>
  );
} 