import modelos from '../data/ferramentas/bio-modelos.json'

export function generateBio(personalidade: string, interesse: string, objetivo: string) {
  const base = modelos[0] || "Sou {p}, procuro {i} e quero {o}."
  return base
    .replace('{p}', personalidade.trim())
    .replace('{i}', interesse.trim())
    .replace('{o}', objetivo.trim())
}
