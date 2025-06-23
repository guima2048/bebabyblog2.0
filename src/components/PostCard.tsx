import Link from 'next/link'

type PostProps = {
  slug: string
  title: string
  date: string
  snippet: string
  image: string
}

export default function PostCard({ slug, title, date, snippet, image }: PostProps) {
  return (
    <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-md overflow-hidden transition-all hover:scale-105 duration-300">
      <img src={image} alt={title} className="w-full aspect-video object-cover rounded-t-2xl" />
      <div className="p-4">
        <p className="text-xs uppercase text-gray-400">{date}</p>
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-zinc-900 dark:text-white">{title}</h2>
        <p className="mt-2 text-base md:text-lg text-gray-500 dark:text-gray-400">{snippet}</p>
        <Link href={`/blog/${slug}`} className="inline-block mt-4 text-blue-500 hover:text-blue-600 transition-colors duration-200">
          <span className="align-middle">Ler mais</span>
          <svg className="inline ml-1 w-4 h-4 align-middle" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
        </Link>
      </div>
    </div>
  )
}
