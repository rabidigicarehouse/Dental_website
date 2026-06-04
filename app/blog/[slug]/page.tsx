import { redirect } from 'next/navigation';
import { BLOG_SLUGS, getBlogPostBySlug } from '@/lib/blog-posts';

interface Params {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return BLOG_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Params) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) return { title: 'Article not found' };
  return {
    title: `${post.title} - Upper East Dental Innovations`,
    description: post.excerpt,
  };
}

export default async function BlogSlugPage({ params }: Params) {
  const { slug } = await params;
  redirect(`/${slug}`);
}
