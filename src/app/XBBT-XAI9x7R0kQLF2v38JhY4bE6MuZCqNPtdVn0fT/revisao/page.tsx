"use client";

const status = {
  home: true, // posts dinâmicos
  post: true, // post dinâmico
  adminAuth: false, // autenticação
  crudPosts: true, // CRUD funciona, mas não integra
  crudPostsPublic: true, // integração CRUD ↔ público
  faqAdmin: true, // CRUD FAQ
  newsletter: true, // tela existe
  autores: true, // tela existe
  seo: true, // tela existe
  comments: true, // tela existe
  uploads: false, // depende de permissão VPS
  seguranca: false, // sem autenticação
};

export default function RevisaoAdmin() {
  return (
    <div className="min-h-screen bg-gray-900 p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold text-white mb-8">Revisão Operacional do Projeto</h1>
        <ul className="space-y-6 text-base">
          <li className="bg-gray-800 p-4 rounded text-white flex items-center gap-3">
            <span className="text-2xl">✔️</span>
            <span><b>Home:</b> Posts dinâmicos<br /><span className="text-gray-400">OK! A Home exibe posts reais vindos da API/backend.</span></span>
          </li>
          <li className="bg-gray-800 p-4 rounded text-white flex items-center gap-3">
            <span className="text-2xl">✔️</span>
            <span><b>Página de Post:</b> Conteúdo dinâmico<br /><span className="text-gray-400">OK! A página de post busca e exibe dados reais da API/backend.</span></span>
          </li>
          <li className="bg-gray-800 p-4 rounded text-white flex items-center gap-3">
            <span className="text-2xl">{status.crudPosts ? "✔️" : "❌"}</span>
            <span><b>CRUD de Posts no Admin:</b> <br /><span className="text-gray-400">{status.crudPosts ? "Formulários funcionam, mas não integram com o site público." : "CRUD não funcional."}</span></span>
          </li>
          <li className="bg-gray-800 p-4 rounded text-white flex items-center gap-3">
            <span className="text-2xl">✔️</span>
            <span><b>Integração CRUD ↔ Público:</b> <br /><span className="text-gray-400">OK! Posts criados/editados/excluídos no admin aparecem no site público.</span></span>
          </li>
          <li className="bg-gray-800 p-4 rounded text-white flex items-center gap-3">
            <span className="text-2xl">✔️</span>
            <span><b>FAQ Admin:</b> <br /><span className="text-gray-400">OK! CRUD de FAQ implementado e funcional.</span></span>
          </li>
          <li className="bg-gray-800 p-4 rounded text-white flex items-center gap-3">
            <span className="text-2xl">{status.adminAuth ? "✔️" : "❌"}</span>
            <span><b>Autenticação/Admin Seguro:</b> <br /><span className="text-gray-400">{status.adminAuth ? "OK" : "Qualquer pessoa pode acessar o admin. Precisa de login/senha."}</span></span>
          </li>
          <li className="bg-gray-800 p-4 rounded text-white flex items-center gap-3">
            <span className="text-2xl">{status.uploads ? "✔️" : "❌"}</span>
            <span><b>Uploads:</b> <br /><span className="text-gray-400">{status.uploads ? "OK" : "Uploads dependem de permissão de escrita no VPS e não têm fallback/aviso robusto."}</span></span>
          </li>
          <li className="bg-gray-800 p-4 rounded text-white flex items-center gap-3">
            <span className="text-2xl">{status.seguranca ? "✔️" : "❌"}</span>
            <span><b>Segurança:</b> <br /><span className="text-gray-400">{status.seguranca ? "OK" : "Sem autenticação, sem logs, sem proteção de rotas."}</span></span>
          </li>
          <li className="bg-gray-800 p-4 rounded text-white flex items-center gap-3">
            <span className="text-2xl">{status.newsletter ? "✔️" : "❌"}</span>
            <span><b>Newsletter Admin:</b> <br /><span className="text-gray-400">{status.newsletter ? "Tela existe e lista e-mails." : "Tela não funcional."}</span></span>
          </li>
          <li className="bg-gray-800 p-4 rounded text-white flex items-center gap-3">
            <span className="text-2xl">{status.autores ? "✔️" : "❌"}</span>
            <span><b>Autores Admin:</b> <br /><span className="text-gray-400">{status.autores ? "Tela existe e permite CRUD." : "Tela não funcional."}</span></span>
          </li>
          <li className="bg-gray-800 p-4 rounded text-white flex items-center gap-3">
            <span className="text-2xl">{status.seo ? "✔️" : "❌"}</span>
            <span><b>SEO Admin:</b> <br /><span className="text-gray-400">{status.seo ? "Tela existe." : "Tela não funcional."}</span></span>
          </li>
          <li className="bg-gray-800 p-4 rounded text-white flex items-center gap-3">
            <span className="text-2xl">{status.comments ? "✔️" : "❌"}</span>
            <span><b>Comentários Admin:</b> <br /><span className="text-gray-400">{status.comments ? "Tela existe." : "Tela não funcional."}</span></span>
          </li>
        </ul>
        <div className="mt-10 text-gray-300 text-sm">
          <p>Para um blog realmente operacional, dinâmico e seguro, é fundamental resolver os pontos acima.</p>
          <p className="mt-2">Se quiser um plano de ação detalhado para cada item, posso gerar para você!</p>
        </div>
      </div>
    </div>
  );
} 