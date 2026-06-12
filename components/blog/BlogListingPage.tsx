import Image from 'next/image';
import Link from 'next/link';
import MapContactSection from '@/components/MapContactSection';
import Footer from '@/components/Footer';
import { getBlogListingHref, getBlogPostsForPage } from '@/lib/blog-posts';

interface BlogListingPageProps {
  pageNumber: 1 | 2;
  basePath: '/doctors-blog';
  buildPostHref: (slug: string) => string;
  eyebrow: string;
  title: string;
  breadcrumbLabel: string;
}

export default function BlogListingPage({
  pageNumber,
  basePath,
  buildPostHref,
  eyebrow,
  title,
  breadcrumbLabel,
}: BlogListingPageProps) {
  const posts = getBlogPostsForPage(pageNumber);

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
            {eyebrow}
          </div>
          <h1 className="page-subheader-title" style={{ color: '#fff' }}>
            {title}
          </h1>
          <ul className="crumb">
            <li>
              <Link href="/" style={{ color: 'rgba(255,255,255,0.8)' }}>
                Home
              </Link>
            </li>
            <li className="active" style={{ color: '#fff' }}>
              {breadcrumbLabel}
            </li>
          </ul>
        </div>
      </section>

      <section className="uedi-blog-section">
        <div className="container">
          <div className="uedi-blog-grid">
            {posts.map((post) => (
              <article key={post.slug} className="uedi-blog-card">
                <Link href={buildPostHref(post.slug)} className="uedi-blog-photo-link">
                  <div className="uedi-blog-photo">
                    <Image src={post.hero} alt={post.title} loading="lazy" width={1200} height={800} />
                    <div className="uedi-blog-datebadge">
                      <span className="uedi-blog-date-day">{post.dateBadge.day}</span>
                      <span className="uedi-blog-date-month">{post.dateBadge.month}</span>
                    </div>
                  </div>
                </Link>
                <div className="uedi-blog-body">
                  <div className="uedi-blog-category">{post.category}</div>
                  <Link href={buildPostHref(post.slug)} className="uedi-blog-title-link">
                    <h3 className="uedi-blog-title">{post.title}</h3>
                  </Link>
                  <p className="uedi-blog-excerpt">{post.excerpt}</p>
                  <div className="uedi-blog-meta">
                    <span className="uedi-blog-author">{post.author}</span>
                    <Link href={buildPostHref(post.slug)} className="uedi-blog-readmore">
                      Read more <span aria-hidden="true">→</span>
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="d-flex justify-content-center align-items-center gap-3 mt-5 flex-wrap">
            <Link
              href={getBlogListingHref(1, basePath)}
              className={'btn-main fx-slide' + (pageNumber === 1 ? ' active' : '')}
              data-hover="Page 1"
            >
              <span>Page 1</span>
            </Link>
            <Link
              href={getBlogListingHref(2, basePath)}
              className={'btn-main fx-slide' + (pageNumber === 2 ? ' active' : '')}
              data-hover="Page 2"
            >
              <span>Page 2</span>
            </Link>
          </div>
        </div>
      </section>

      <MapContactSection />
      <Footer />
    </>
  );
}
