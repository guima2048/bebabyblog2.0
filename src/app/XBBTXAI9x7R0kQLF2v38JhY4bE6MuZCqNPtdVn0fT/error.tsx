"use client";

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#e9d8fd] p-8">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full text-center">
        <h2 className="text-2xl font-bold text-[#6b21a8] mb-4">Erro no Painel Admin</h2>
        <p className="text-gray-600 mb-4">Ocorreu um erro inesperado no painel administrativo.</p>
        <pre className="text-red-500 text-sm bg-red-50 p-3 rounded mb-4 overflow-auto">
          {error.message}
        </pre>
        <div className="flex gap-4 justify-center">
          <button 
            onClick={() => reset()} 
            className="bg-violet-600 hover:bg-violet-700 text-white px-4 py-2 rounded font-semibold"
          >
            Tentar Novamente
          </button>
          <button 
            onClick={() => window.location.href = '/XBBTXAI9x7R0kQLF2v38JhY4bE6MuZCqNPtdVn0fT/'}
            className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded font-semibold"
          >
            Voltar ao Início
          </button>
        </div>
      </div>
    </div>
  );
} 