import { Metadata } from "next";
import PostContent from "./PostContent";

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  // Detecta ambiente e monta URL absoluta
  const baseUrl = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "http://localhost:3000";
  const res = await fetch(`${baseUrl}/api/posts?slug=${params.slug}`);
  const post = await res.json();

  if (!post) {
    return {
      title: "Post não encontrado",
      description: "O post que você está procurando não existe.",
    };
  }

  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      images: [post.image],
    },
  };
}

export default function PostPage({ params }: { params: { slug: string } }) {
  return <PostContent slug={params.slug} />;
} 