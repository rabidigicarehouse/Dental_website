'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import MapContactSection from '@/components/MapContactSection';
import Footer from '@/components/Footer';

const videoIds = [
  't9qpsdYNPc0',
  '1grIDPK_6uE',
  'iCoNhlEWBjY',
  '79R0SBKLAVw',
  'CzpEq6RZimI',
  'EPEo5ivNLhA',
  'PcZKc9Fn5yw',
  'vluu5GbOQs8',
];

const textTestimonials = [
  {
    name: 'Stefania',
    img: '1.webp',
    stars: 5,
    text: "Dr. Harvey wants your smile to be perfect so get ready! She is precise and very attentive to details. She will work with your schedule and your needs. Friendly and patient oriented. Highly recommended!",
    source: 'Google',
  },
  {
    name: 'Michael S.',
    img: '2.webp',
    stars: 5,
    text: "I've always been nervous about dental visits, but the staff made me feel completely comfortable. Their gentle care and attention to detail truly stand out.",
    source: 'Google',
  },
  {
    name: 'Robert L.',
    img: '3.webp',
    stars: 5,
    text: 'My family and I have been coming here for years. The service is exceptional, and the team always goes the extra mile to make sure we\u2019re happy.',
    source: 'Google',
  },
];

export default function Testimonials() {
  const [videoPreview, setVideoPreview] = useState<string | null>(null);
  const [currentTesti, setCurrentTesti] = useState(0);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setVideoPreview(null);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  useEffect(() => {
    document.body.style.overflow = videoPreview ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [videoPreview]);

  return (
    <>
      {/* Subheader */}
      <section
        id="subheader"
        className="page-subheader text-center"
        style={{
          backgroundImage: 'url("/heading_background/testimonial.jpg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="container relative z-2">
          <div className="page-subheader-eyebrow" style={{ color: 'rgba(255,255,255,0.85)' }}>What Patients Say</div>
          <h1 className="page-subheader-title" style={{ color: '#fff' }}>Testimonials</h1>
          <ul className="crumb">
            <li><Link href="/" style={{ color: 'rgba(255,255,255,0.8)' }}>Home</Link></li>
            <li className="active" style={{ color: '#fff' }}>Testimonials</li>
          </ul>
        </div>
      </section>

      {/* Video Testimonials Grid */}
      <section className="testi-video-section">
        <div className="container">
          <div className="row g-4 justify-content-center text-center mb-5">
            <div className="col-lg-8">
              <div className="subtitle id-color wow fadeInUp mb-3">Real Stories from Real Patients</div>
              <h2 className="wow fadeInUp" data-wow-delay=".2s">Our Happy Customer</h2>
              <p className="mb-0 wow fadeInUp">
                Watch our patients share their personal journey, treatment experiences and the transformations they&apos;ve
                received at Upper East Dental Innovations.
              </p>
            </div>
          </div>

          <div className="row g-4">
            {videoIds.map((id, i) => (
              <div className="col-lg-3 col-md-6 col-12 d-flex" key={id}>
                <div
                  className="testi-video-card w-100 wow fadeInUp"
                  data-wow-delay={`${(i % 4) * 0.08}s`}
                  onClick={() => setVideoPreview(id)}
                >
                  <div className="testi-video-thumb">
                    <img
                      src={`https://img.youtube.com/vi/${id}/hqdefault.jpg`}
                      alt={`Patient Testimonial ${i + 1}`}
                    />
                    <div className="testi-video-overlay" />
                    <div className="testi-video-play">
                      <div className="testi-video-play-tri" />
                    </div>
                  </div>
                  <div className="testi-video-meta">
                    <span className="testi-video-tag">Patient Story</span>
                    <span className="testi-video-num">#{String(i + 1).padStart(2, '0')}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Text Testimonials — same Premium Single Slide as homepage */}
      <section className="bg-color-op-1 pt-100 pb-100">
        <div className="container text-center">
          <div className="subtitle id-color wow fadeInUp mb-3">Testimonials Revealed</div>
          <h2 className="wow fadeInUp fs-60 mb-5" data-wow-delay=".2s">Hear Why Our Patients Love Us</h2>

          <div className="testimonial-single-wrapper relative wow fadeInUp" data-wow-delay=".4s">
            <div
              className="testimonial-nav-btn prev"
              onClick={() => setCurrentTesti((p) => (p - 1 + textTestimonials.length) % textTestimonials.length)}
            >
              <i className="arrow_carrot-left"></i>
            </div>

            <div className="testimonial-content-area">
              <div className="d-flex align-items-center justify-content-center mb-4">
                <img
                  src={`/images/testimonial/${textTestimonials[currentTesti].img}`}
                  className="testi-avatar-premium"
                  alt={textTestimonials[currentTesti].name}
                />
                <div className="text-start ms-3">
                  <h4 className="mb-1">{textTestimonials[currentTesti].name}</h4>
                  <div className="stars-rating">
                    {[...Array(textTestimonials[currentTesti].stars)].map((_, i) => (
                      <i key={i} className="fa fa-star text-warning"></i>
                    ))}
                  </div>
                </div>
              </div>
              <p className="testi-text-premium mb-4">{textTestimonials[currentTesti].text}</p>
              <div className="testi-source-premium">
                Posted On{' '}
                <Link href="https://google.com" target="_blank" className="id-color fw-bold">
                  {textTestimonials[currentTesti].source}
                </Link>
              </div>
            </div>

            <div
              className="testimonial-nav-btn next"
              onClick={() => setCurrentTesti((p) => (p + 1) % textTestimonials.length)}
            >
              <i className="arrow_carrot-right"></i>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-color text-light pt-40 pb-40">
        <div className="container">
          <div className="row g-4 align-items-center">
            <div className="col-md-9">
              <h3 className="mb-0 fs-32 text-white">Ready to become our next happy patient?</h3>
            </div>
            <div className="col-lg-3 text-lg-end">
              <Link className="btn-main btn-line fx-slide" href="https://scheduling.simplifeye.co/#key=7O4hoFG2aH6pBmQ2YLegk45hvPEJrqZ&gaID=null" data-hover="Connect Us"><span>Connect Us</span></Link>
            </div>
          </div>
        </div>
      </section>

      <MapContactSection />
      <Footer />

      {/* Video Modal */}
      <AnimatePresence>
        {videoPreview && (
          <motion.div
            className="preview-modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => setVideoPreview(null)}
            style={{
              position: 'fixed', inset: 0,
              background: 'rgba(0,0,0,0.96)',
              backdropFilter: 'blur(24px)',
              zIndex: 2147483647,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              perspective: '1400px',
              padding: '20px',
            }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.35, rotateY: -22, rotateX: 10, y: 80 }}
              animate={{ opacity: 1, scale: 1, rotateY: 0, rotateX: 0, y: 0 }}
              exit={{ opacity: 0, scale: 0.35, rotateY: 22, y: 80 }}
              transition={{ type: 'spring', damping: 22, stiffness: 270 }}
              onClick={(e) => e.stopPropagation()}
              style={{ position: 'relative', width: 'min(82vw, 920px)' }}
            >
              <div style={{
                background: 'linear-gradient(135deg, #1D2C36 0%, #165369 55%, #C0C2C3 100%)',
                padding: '4px', borderRadius: '22px',
                boxShadow: '0 30px 90px rgba(0,0,0,0.95), 0 0 80px rgba(22, 83, 105,0.6)',
              }}>
                <div style={{ borderRadius: '18px', overflow: 'hidden', aspectRatio: '16/9', background: '#000' }}>
                  <iframe
                    width="100%" height="100%"
                    src={`https://www.youtube.com/embed/${videoPreview}?autoplay=1&rel=0`}
                    title="Patient Testimonial"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                    style={{ border: 'none', display: 'block', width: '100%', height: '100%' }}
                  />
                </div>
              </div>

              <button onClick={() => setVideoPreview(null)} style={{
                position: 'absolute', top: '-18px', right: '-18px',
                width: '44px', height: '44px', background: '#fff', border: 'none',
                borderRadius: '50%', fontSize: '20px', fontWeight: 800, cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: '#1D2C36', boxShadow: '0 6px 24px rgba(0,0,0,0.6)', lineHeight: 1,
              }}>&times;</button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
