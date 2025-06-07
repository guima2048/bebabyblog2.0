import { useState } from 'react'
import Header from '../../components/Header'
import { generateBio } from '../../lib/tools'

export default function GeradorBio() {
  const [personalidade, setPersonalidade] = useState('')
  const [interesse, setInteresse] = useState('')
  const [objetivo, setObjetivo] = useState('')
  const [resultado, setResultado] = useState('')

  const handleGerar = () => {
    const bio = generateBio(personalidade, interesse, objetivo)
    setResultado(bio)
  }

  return (
    <div className="bg-white dark:bg-black text-black dark:text-white min-h-screen">
      <Header />
      <main className="max-w-xl mx-auto py-10 px-4">
        <h1 className="text-2xl font-bold mb-6">Gerador de Bio</h1>
        <div className="space-y-4">
          <input className="input" placeholder="Como você é?" value={personalidade} onChange={e => setPersonalidade(e.target.value)} />
          <input className="input" placeholder="O que você procura?" value={interesse} onChange={e => setInteresse(e.target.value)} />
          <input className="input" placeholder="Qual seu objetivo aqui?" value={objetivo} onChange={e => setObjetivo(e.target.value)} />
          <button className="bg-pink-500 text-white px-4 py-2 rounded" onClick={handleGerar}>Gerar Bio</button>
        </div>

        {resultado && (
          <div className="mt-6 p-4 bg-zinc-100 dark:bg-zinc-800 rounded">
            <p className="mb-2">{resultado}</p>
            <button onClick={() => navigator.clipboard.writeText(resultado)} className="text-sm text-pink-600 hover:underline">Copiar</button>
          </div>
        )}
      </main>
    </div>
  )
}
