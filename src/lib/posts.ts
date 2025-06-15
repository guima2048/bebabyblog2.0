import posts from "@/data/posts.json";

export type Post = {
  slug: string;
  title: string;
  description: string;
  content: string;
  image: string;
  status: "ativo" | "rascunho";
};

type PostJson = {
  slug: string;
  title: string;
  description: string;
  content: string;
  image: string;
  status: string;
};

function normalizePost(post: PostJson): Post {
  return {
    ...post,
    status: post.status === "ativo" ? "ativo" : "rascunho",
  };
}

export function getAllPosts(): Post[] {
  return posts.map(normalizePost);
}

export function getPostBySlug(slug: string): Post | undefined {
  const post = posts.find((post) => post.slug === slug);
  return post ? normalizePost(post) : undefined;
} 