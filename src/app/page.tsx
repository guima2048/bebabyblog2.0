import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import Hero from '@/components/Hero'
import PostCard from '@/components/PostCard'
import LeadForm from '@/components/LeadForm'
import { getPosts } from '@/lib/posts';

interface Post {
  titulo: string;
  slug: string;
  conteudo: string;
  seoTitle?: string;
  seoDescription?: string;
  categoria?: string;
  autor?: string;
  imagemCapa: string;
  data: string;
  status: string;
  image: string;
  title: string;
  description: string;
  createdAt?: string;
}

export default async function Home() {
  const { posts, totalPages } = await getPosts({ page: 1, limit: 10 });

  return (
    <>
      <Hero />
      <div className="container mx-auto px-4 py-8">
        <h2 className={`font-oswald text-4xl font-bold text-center text-gray-800 mb-12`}>
          Últimas do Blog
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <PostCard 
              key={post.slug} 
              slug={post.slug}
              title={post.title}
              image={post.image}
              date={new Date(post.data).toLocaleDateString('pt-BR')}
              snippet={post.description}
            />
          ))}
        </div>
        {totalPages > 1 && (
          <div className="flex justify-center mt-12">
            <Link href="/blog/page/2" className="bg-violet-600 text-white px-6 py-2 rounded-md font-semibold hover:bg-violet-700 transition-colors">
              Ver mais posts
            </Link>
          </div>
        )}
      </div>
      <LeadForm />
    </>
  )
}
