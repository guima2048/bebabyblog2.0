import Header from '../components/Header'
import Hero from '../components/Hero'
import PostCard from '../components/PostCard'
import posts from '../data/posts.json'

export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-950 font-sans">
      <Header />
      <Hero />
      <main className="pt-20 max-w-7xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-white mb-12 text-center">Destaques</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {posts.map((post) => (
            <div key={post.slug} className="relative group rounded-3xl overflow-hidden shadow-2xl hover:scale-105 transition-all duration-300">
              <img src={post.image} alt={post.title} className="w-full h-72 object-cover group-hover:brightness-75 transition-all duration-300" />
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
                <h3 className="text-2xl font-bold text-white">{post.title}</h3>
                <p className="text-zinc-300 mt-2">{post.snippet}</p>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}

// Adicione este CSS global para esconder a barra de rolagem:
// .hide-scrollbar::-webkit-scrollbar { display: none; }
// .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
