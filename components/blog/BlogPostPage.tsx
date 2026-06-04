import Link from 'next/link';
import { notFound } from 'next/navigation';
import MapContactSection from '@/components/MapContactSection';
import Footer from '@/components/Footer';
import {
  BLOG_POSTS,
  getBlogPostBySlug,
  type BlogBlock,
} from '@/lib/blog-posts';

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

interface BlogPostPageProps {
  slug: string;
  buildPostHref: (slug: string) => string;
}

export default function BlogPostPage({
  slug,
  buildPostHref,
}: BlogPostPageProps) {
  const post = getBlogPostBySlug(slug);
  if (!post) notFound();

  const latestPosts = BLOG_POSTS;

  return (
    <>
      <section className="blog-post-section">
        <div className="container">
          <div className="blog-post-grid">
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

            <aside className="blog-post-sidebar">
              <div className="blog-post-sidebar-card">
                <h3 className="blog-post-sidebar-title">Latest Post</h3>
                <ul className="blog-post-sidebar-list">
                  {latestPosts.map((item) => {
                    const isCurrent = item.slug === post.slug;
                    return (
                      <li
                        key={item.slug}
                        className={'blog-post-sidebar-item' + (isCurrent ? ' is-current' : '')}
                      >
                        <Link href={buildPostHref(item.slug)} className="blog-post-sidebar-link">
                          <div className="blog-post-sidebar-thumb">
                            <img src={item.thumb} alt={item.title} loading="lazy" />
                          </div>
                          <div className="blog-post-sidebar-meta">
                            <span className="blog-post-sidebar-headline">{item.title}</span>
                            <span className="blog-post-sidebar-date">{item.date}</span>
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
