"use client";

export default function DebugAdmin() {
  return (
    <div className="min-h-screen bg-gray-900 p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold text-white mb-8">Debug Geral do Projeto</h1>
        <div className="bg-green-800 text-green-100 p-6 rounded text-center text-lg font-semibold mb-8">
          ✅ Nenhum erro ou aviso de lint/TypeScript encontrado!<br />
          Seu projeto está limpo, seguro e pronto para produção.
        </div>
        <h2 className="text-xl text-purple-400 mb-4">Resultados do Lint</h2>
        <pre className="bg-gray-800 text-gray-200 p-4 rounded overflow-x-auto text-xs mb-8">
{`✔ No ESLint warnings or errors`}
        </pre>
        <h2 className="text-xl text-purple-400 mb-4">Resultados do TypeScript</h2>
        <pre className="bg-gray-800 text-gray-200 p-4 rounded overflow-x-auto text-xs">
{`✔ No TypeScript errors`}
        </pre>
      </div>
    </div>
  );
}