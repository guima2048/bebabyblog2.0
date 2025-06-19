import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#e9d8fd] p-8">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full text-center">
        <h2 className="text-2xl font-bold text-[#6b21a8] mb-4">Página Não Encontrada</h2>
        <p className="text-gray-600 mb-6">A página que você está procurando não existe no painel administrativo.</p>
        <div className="flex gap-4 justify-center">
          <Link 
            href="/XBBTXAI9x7R0kQLF2v38JhY4bE6MuZCqNPtdVn0fT/"
            className="bg-violet-600 hover:bg-violet-700 text-white px-4 py-2 rounded font-semibold"
          >
            Voltar ao Início
          </Link>
          <Link 
            href="/"
            className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded font-semibold"
          >
            Ir para o Site
          </Link>
        </div>
      </div>
    </div>
  );
} 