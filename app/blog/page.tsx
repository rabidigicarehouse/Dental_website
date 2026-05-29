'use client';

import Link from 'next/link';
import MapContactSection from '@/components/MapContactSection';
import Footer from '@/components/Footer';

type Post = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  date: { day: string; month: string };
  image: string;
};

const POSTS: Post[] = [
  {
    slug: 'single',
    title: 'Discover 10 Easy Tips to Maintain a Healthier and Brighter Smile Today',
    excerpt:
      'Simple, everyday habits — from rinsing after coffee to gentle brushing technique — can keep your smile dazzling between visits.',
    category: 'Oral Care',
    author: 'Dr. Sharde Harvey',
    date: { day: '20', month: 'Jun' },
    image: '/images/blog/l1.webp',
  },
  {
    slug: 'single',
    title: 'Is Teeth Whitening Safe and Effective? Here’s What You Need to Know',
    excerpt:
      'Professional in-office whitening is faster and safer than over-the-counter strips. Here’s how to choose the right method for you.',
    category: 'Cosmetic',
    author: 'Dr. Sharde Harvey',
    date: { day: '15', month: 'Jun' },
    image: '/images/blog/l2.webp',
  },
  {
    slug: 'single',
    title: 'Braces vs. Clear Aligners: Which Orthodontic Option Fits You Best?',
    excerpt:
      'Both options can straighten teeth — but lifestyle, age, and complexity all play a role in choosing the right path.',
    category: 'Orthodontics',
    author: 'Dr. Sharde Harvey',
    date: { day: '08', month: 'Jun' },
    image: '/images/blog/l3.webp',
  },
  {
    slug: 'single',
    title: 'What to Expect During Your First Visit to the Dentist’s Office',
    excerpt:
      'A friendly walk-through of your first UEDI visit — from check-in to comprehensive exam to your personalized care plan.',
    category: 'New Patient',
    author: 'Dr. Sharde Harvey',
    date: { day: '02', month: 'Jun' },
    image: '/images/blog/l4.webp',
  },
  {
    slug: 'single',
    title: '5 Warning Signs You May Need a Root Canal — and Why It’s Not So Bad',
    excerpt:
      'Modern root canal therapy is painless and saves your natural tooth. Here are the early signs you should never ignore.',
    category: 'Restorative',
    author: 'Dr. Sharde Harvey',
    date: { day: '24', month: 'May' },
    image: '/images/blog/l5.webp',
  },
  {
    slug: 'single',
    title: 'How to Protect Your Child’s Teeth and Prevent Cavities Early On',
    excerpt:
      'Pediatric-friendly habits that build lifelong oral health — from brushing routines to first sealant appointments.',
    category: 'Pediatric',
    author: 'Dr. Sharde Harvey',
    date: { day: '18', month: 'May' },
    image: '/images/blog/l6.webp',
  },
];

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
            {POSTS.map((post, idx) => (
              <article key={idx} className="uedi-blog-card">
                <Link href={`/blog/${post.slug}`} className="uedi-blog-photo-link">
                  <div className="uedi-blog-photo">
                    <img src={post.image} alt={post.title} loading="lazy" />
                    <div className="uedi-blog-datebadge">
                      <span className="uedi-blog-date-day">{post.date.day}</span>
                      <span className="uedi-blog-date-month">{post.date.month}</span>
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
