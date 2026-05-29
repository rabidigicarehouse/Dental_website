import Link from 'next/link';
import { notFound } from 'next/navigation';
import MapContactSection from '@/components/MapContactSection';
import Footer from '@/components/Footer';
import { BLOG_POSTS } from '@/lib/blog-posts';
import type { BlogBlock } from '@/lib/blog-posts';

interface Params {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Params) {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);
  if (!post) return { title: 'Article not found' };
  return {
    title: `${post.title} — Upper East Dental Innovations`,
    description: post.excerpt,
  };
}

function BlockRenderer({ block }: { block: BlogBlock }) {
  switch (block.type) {
    case 'p':
      return <p className="blog-post-p">{block.text}</p>;
    case 'h2':
      return <h2 className="blog-post-h2">{block.text}</h2>;
    case 'ul':
      return (
        <ul className="blog-post-ul">
          {block.items.map((it, i) => (
            <li key={i}>{it}</li>
          ))}
        </ul>
      );
    case 'ol':
      return (
        <ol className="blog-post-ol">
          {block.items.map((it, i) => (
            <li key={i}>{it}</li>
          ))}
        </ol>
      );
    case 'callout':
      return (
        <div className="blog-post-callout">
          <strong>{block.label}</strong> {block.text}
        </div>
      );
    default:
      return null;
  }
}

export default async function BlogPostPage({ params }: Params) {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);
  if (!post) notFound();

  // "Latest Post" sidebar = every post in the dataset (newest first).
  // Putting the current post at the top still mirrors the client site.
  const latestPosts = BLOG_POSTS;

  return (
    <>
      <section
        id="subheader"
        className="page-subheader text-center"
        style={{
          background: 'linear-gradient(135deg, #1d2c36 0%, #165369 100%)',
        }}
      >
        <div className="container relative z-2">
          <div className="page-subheader-eyebrow" style={{ color: 'rgba(255,255,255,0.85)' }}>
            {post.category}
          </div>
          <h1
            className="page-subheader-title"
            style={{ color: '#fff', fontSize: 'clamp(28px, 4vw, 44px)', lineHeight: 1.2 }}
          >
            {post.title}
          </h1>
          <ul className="crumb">
            <li>
              <Link href="/" style={{ color: 'rgba(255,255,255,0.8)' }}>
                Home
              </Link>
            </li>
            <li>
              <Link href="/blog" style={{ color: 'rgba(255,255,255,0.8)' }}>
                Blog
              </Link>
            </li>
            <li className="active" style={{ color: '#fff' }}>
              {post.category}
            </li>
          </ul>
        </div>
      </section>

      <section className="blog-post-section">
        <div className="container">
          <div className="blog-post-grid">
            {/* ─── Main article ─── */}
            <article className="blog-post-article">
              <div className="blog-post-hero">
                <img src={post.hero} alt={post.title} />
              </div>

              <h2 className="blog-post-headline">{post.title}</h2>

              <div className="blog-post-meta">
                <span className="blog-post-meta-item">
                  <i className="icofont-doctor-alt" aria-hidden="true" /> {post.author}
                </span>
                <span className="blog-post-meta-item">
                  <i className="icofont-calendar" aria-hidden="true" /> {post.date}
                </span>
                <span className="blog-post-meta-item">
                  <i className="icofont-clock-time" aria-hidden="true" /> {post.time}
                </span>
              </div>

              <div className="blog-post-body">
                {post.body.map((block, i) => (
                  <BlockRenderer key={i} block={block} />
                ))}
              </div>
            </article>

            {/* ─── Sidebar: Latest Posts ─── */}
            <aside className="blog-post-sidebar">
              <div className="blog-post-sidebar-card">
                <h3 className="blog-post-sidebar-title">Latest Post</h3>
                <ul className="blog-post-sidebar-list">
                  {latestPosts.map((p) => {
                    const isCurrent = p.slug === post.slug;
                    return (
                      <li
                        key={p.slug}
                        className={
                          'blog-post-sidebar-item' + (isCurrent ? ' is-current' : '')
                        }
                      >
                        <Link href={`/blog/${p.slug}`} className="blog-post-sidebar-link">
                          <div className="blog-post-sidebar-thumb">
                            <img src={p.thumb} alt={p.title} loading="lazy" />
                          </div>
                          <div className="blog-post-sidebar-meta">
                            <span className="blog-post-sidebar-headline">{p.title}</span>
                            <span className="blog-post-sidebar-date">{p.date}</span>
                          </div>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <MapContactSection />
      <Footer />
    </>
  );
}
