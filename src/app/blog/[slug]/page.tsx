import PostContent from "./PostContent";

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  return <PostContent slug={params.slug} />;
}
