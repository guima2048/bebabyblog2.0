import fs from 'fs';
import path from 'path';

const autoresPath = path.join(process.cwd(), 'src/data/autores.json');

type Autor = {
  slug: string;
  nome: string;
  bio: string;
  avatar: string;
  redes: {
    instagram?: string;
    twitter?: string;
    facebook?: string;
    youtube?: string;
    tiktok?: string;
  };
};

export async function getTodosAutores() {
  const file = fs.readFileSync(autoresPath, 'utf-8');
  return JSON.parse(file);
}

export async function getAutorPorSlug(slug: string) {
  const autores: Autor[] = await getTodosAutores();
  return autores.find((a) => a.slug === slug);
} 