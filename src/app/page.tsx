"use client";
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
  const { posts, total } = await getPosts({ page: 1, limit: 10 });

  return (
    <>
      <Hero />
      <div className="container mx-auto px-4 py-8">
        <h2 className={`font-oswald text-4xl font-bold text-center text-gray-800 mb-12`}>
          Últimas do Blog
        </h2>
        {/* ... */}
      </div>
      <LeadForm />
    </>
  )
}
