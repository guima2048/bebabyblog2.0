import fs from 'fs';
import path from 'path';

const postsJsonPath = path.join(process.cwd(), 'data/posts.json');

interface Post {
  slug: string;
  title: string;
  description: string;
  image: string;
  data: string;
  [key: string]: any;
}

function getPostsData(): Post[] {
  if (fs.existsSync(postsJsonPath)) {
    const fileContent = fs.readFileSync(postsJsonPath, 'utf-8');
    if (fileContent.trim() === '') {
      return [];
    }
    return JSON.parse(fileContent) as Post[];
  }
  return [];
}

export function getPosts({ page = 1, limit = 10 }: { page?: number; limit?: number }) {
  const allPosts = getPostsData()
    .sort((a, b) => new Date(b.data).getTime() - new Date(a.data).getTime());

  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  
  const posts = allPosts.slice(startIndex, endIndex);
  const totalPages = Math.ceil(allPosts.length / limit);

  return { posts, totalPages, totalPosts: allPosts.length };
}

export function getPostBySlug(slug: string): Post | undefined {
  const allPosts = getPostsData();
  return allPosts.find(post => post.slug === slug);
}
