import Link from 'next/link'

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur px-6 py-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <span className="text-white font-bold text-xl">Bebaby</span>
        <nav className="space-x-6 text-sm text-zinc-300">
          <a href="/" className="hover:text-white transition-colors">Blog</a>
          <a href="/ferramentas" className="hover:text-white transition-colors">Ferramentas</a>
          <a href="#contato" className="hover:text-white transition-colors">Contato</a>
        </nav>
      </div>
    </header>
  )
}
