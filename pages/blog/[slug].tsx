// ⚠️ ESTE BLOCO ESTÁ BOM E NÃO DEVE SER MODIFICADO SEM AUTORIZAÇÃO EXPRESSA
// ✅ ETAPA 3 FINALIZADA. NÃO MODIFICAR ESTE BLOCO SEM AUTORIZAÇÃO EXPRESSA

import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

import Header from '../../components/Header';
import VideoEmbed from '../../components/VideoEmbed';
import LeadForm from '../../components/LeadForm';
import posts from '../../data/posts.json';

type PostProps = {
  title: string;
  date: string;
  content: string;
  videoUrl: string;
};

export default function PostPage({ title, date, content, videoUrl }: PostProps) {
  const router = useRouter();
  if (router.isFallback) return <div>Carregando...</div>;

  return (
    <>
      <Header />
      <main className="max-w-3xl mx-auto px-4 py-10 prose dark:prose-invert">
        <h1>{title}</h1>
        <p className="text-sm text-gray-500">{date}</p>
        <VideoEmbed url={videoUrl} />
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
        <LeadForm />
      </main>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = posts.map((post) => ({ params: { slug: post.slug } }));
  return { paths, fallback: true };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.slug as string;
  const filePath = path.join(process.cwd(), 'data', 'posts', `${slug}.md`);
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const { data, content } = matter(fileContent);

  return {
    props: {
      title: data.title,
      date: data.date,
      content,
      videoUrl: data.video,
    },
  };
};

// ✅ ETAPA 3 FINALIZADA. NÃO MODIFICAR ESTE BLOCO SEM AUTORIZAÇÃO EXPRESSA
