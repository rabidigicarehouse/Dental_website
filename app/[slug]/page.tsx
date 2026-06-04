import { notFound } from 'next/navigation';
import BlogPostPage from '@/components/blog/BlogPostPage';
import { BLOG_SLUGS, getBlogPostBySlug, isBlogSlug } from '@/lib/blog-posts';

interface Params {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return BLOG_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Params) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) return { title: 'Page not found' };
  return {
    title: `${post.title} - Upper East Dental Innovations`,
    description: post.excerpt,
  };
}

export default async function RootBlogSlugPage({ params }: Params) {
  const { slug } = await params;
  if (!isBlogSlug(slug)) notFound();

  return (
    <BlogPostPage
      slug={slug}
      buildPostHref={(postSlug) => `/${postSlug}`}
    />
  );
}
