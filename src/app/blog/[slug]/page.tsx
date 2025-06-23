import PostContent from "./PostContent";

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  return <PostContent slug={params.slug} />;
}
