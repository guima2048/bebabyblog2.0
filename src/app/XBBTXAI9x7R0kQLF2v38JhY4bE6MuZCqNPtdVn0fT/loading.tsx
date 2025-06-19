export default function Loading() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#e9d8fd]">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-violet-600 mx-auto mb-4"></div>
        <h2 className="text-xl font-semibold text-[#6b21a8] mb-2">Carregando...</h2>
        <p className="text-gray-600">Aguarde enquanto carregamos o painel administrativo.</p>
      </div>
    </div>
  );
} 