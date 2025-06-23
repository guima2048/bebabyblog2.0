export default function Footer() {
  return (
    <footer className="bg-zinc-950 text-zinc-400 text-sm mt-20 border-t border-zinc-800">
      <div className="max-w-7xl mx-auto px-6 py-10 space-y-4">
        <nav className="flex flex-wrap justify-center gap-6">
          <a href="/" className="hover:text-white transition-colors">Blog</a>
          <a href="/ferramentas" className="hover:text-white transition-colors">Ferramentas</a>
          <a href="/privacidade" className="hover:text-white transition-colors">Política de Privacidade</a>
          <a href="#contato" className="hover:text-white transition-colors">Contato</a>
        </nav>
        <p className="text-center text-xs text-zinc-500">
          © {new Date().getFullYear()} Bebaby. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  )
} 