import Header from '../../components/Header'
import ToolCard from '../../components/ToolCard'
import Link from 'next/link'

export default function Ferramentas() {
  return (
    <div className="bg-white dark:bg-black text-black dark:text-white min-h-screen">
      <Header />
      <main className="max-w-5xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold mb-8">Ferramentas Bebaby</h1>
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          <Link href="/ferramentas/gerador-bio">
            <ToolCard
              title="Gerador de Bio"
              description="Crie uma bio irresistível com base em sua personalidade."
              image="/thumbnails/bio.jpg"
            />
          </Link>
          <Link href="/ferramentas/calculadora-mesada">
            <ToolCard
              title="Calculadora de Mesada"
              description="Veja quanto você pode ganhar por mês com base na sua cidade."
              image="/thumbnails/mesada.jpg"
            />
          </Link>
          <Link href="/ferramentas/quiz">
            <ToolCard
              title="Quiz: Que tipo de Sugar você é?"
              description="Responda 5 perguntas e descubra seu perfil sugar."
              image="/thumbnails/quiz.jpg"
            />
          </Link>
        </div>
      </main>
    </div>
  )
}
