'use client';

import Link from 'next/link';
import MapContactSection from '@/components/MapContactSection';
import Footer from '@/components/Footer';
import { BLOG_POSTS } from '@/lib/blog-posts';

export default function BlogIndex() {
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
            Insights &amp; Tips
          </div>
          <h1 className="page-subheader-title" style={{ color: '#fff' }}>
            Our Blog
          </h1>
          <ul className="crumb">
            <li>
              <Link href="/" style={{ color: 'rgba(255,255,255,0.8)' }}>
                Home
              </Link>
            </li>
            <li className="active" style={{ color: '#fff' }}>
              Blog
            </li>
          </ul>
        </div>
      </section>

      <section className="uedi-blog-section">
        <div className="container">
          <div className="uedi-blog-grid">
            {BLOG_POSTS.map((post) => (
              <article key={post.slug} className="uedi-blog-card">
                <Link href={`/blog/${post.slug}`} className="uedi-blog-photo-link">
                  <div className="uedi-blog-photo">
                    <img src={post.hero} alt={post.title} loading="lazy" />
                    <div className="uedi-blog-datebadge">
                      <span className="uedi-blog-date-day">{post.dateBadge.day}</span>
                      <span className="uedi-blog-date-month">{post.dateBadge.month}</span>
                    </div>
                  </div>
                </Link>
                <div className="uedi-blog-body">
                  <div className="uedi-blog-category">{post.category}</div>
                  <Link href={`/blog/${post.slug}`} className="uedi-blog-title-link">
                    <h3 className="uedi-blog-title">{post.title}</h3>
                  </Link>
                  <p className="uedi-blog-excerpt">{post.excerpt}</p>
                  <div className="uedi-blog-meta">
                    <span className="uedi-blog-author">{post.author}</span>
                    <Link href={`/blog/${post.slug}`} className="uedi-blog-readmore">
                      Read more <span aria-hidden="true">→</span>
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <MapContactSection />
      <Footer />
    </>
  );
}
