import rawPosts from "@/data/posts.json";

export type Post = {
  slug: string;
  title: string;
  description: string;
  content: string;
  image: string;
  status: "ativo" | "rascunho";
  data: string;
};

type PostJson = {
  slug: string;
  title: string;
  description: string;
  content: string;
  image: string;
  status: string;
  data: string;
};

// Forçar o tipo do import
const posts = rawPosts as PostJson[];

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
  const post = posts.find((post: PostJson) => post.slug === slug);
  return post ? normalizePost(post) : undefined;
}

export async function getPosts({ page, limit }: { page: number; limit: number }) {
  const allPosts = getAllPosts()
    .filter(post => post.status === 'ativo')
    .sort((a, b) => new Date(b.data).getTime() - new Date(a.data).getTime());
  
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  
  const paginatedPosts = allPosts.slice(startIndex, endIndex);

  return {
    posts: paginatedPosts,
    total: allPosts.length,
    totalPages: Math.ceil(allPosts.length / limit),
  };
}
