'use client';

import { useState } from 'react';
import Link from 'next/link';
import CardSwap, { Card } from '@/components/CardSwap';
import MapContactSection from '@/components/MapContactSection';
import Footer from '@/components/Footer';

export default function SmileGallery() {
  const [portfolioPreview, setPortfolioPreview] = useState<number | null>(null);

  const portfolioImages = [
    '/before and after/01-259x300.webp',
    '/before and after/02-259x300.webp',
    '/before and after/03-259x300.webp',
    '/before and after/01-259x300 (1).webp'
  ];

  return (
    <>
      {/* Subheader */}
      <section
        id="subheader"
        className="page-subheader text-center"
        style={{
          backgroundImage: 'url(/dental services/Cosmetic Dentistry.webp)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="container relative z-2">
          <div className="page-subheader-eyebrow" style={{ color: 'rgba(255,255,255,0.85)' }}>Our Artistry</div>
          <h1 className="page-subheader-title" style={{ color: '#fff' }}>Smile Gallery</h1>
          <ul className="crumb">
            <li><Link href="/" style={{ color: 'rgba(255,255,255,0.8)' }}>Home</Link></li>
            <li className="active" style={{ color: '#fff' }}>Smile Gallery</li>
          </ul>
        </div>
      </section>

      {/* Portfolio Section (from homepage) */}
      <section className="portfolio-section bg-light py-100">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-5 order-2 order-lg-1">
              <div className="portfolio-subtitle wow fadeInUp">Real Results</div>
              <h2 className="portfolio-title text-start wow fadeInUp" data-wow-delay=".2s" style={{ color: '#4A7CD2' }}>Real People, Real Results</h2>
              <p className="text-dark op-7 mb-4 wow fadeInUp" data-wow-delay=".3s">
                Experience the life-changing impact of our dental expertise. Our portfolio showcases the dedication and precision we bring to every smile transformation. From subtle enhancements to full-mouth reconstructions, our work speaks for itself.
              </p>
              <div className="wow fadeInUp" data-wow-delay=".4s">
                <Link href="/booking" className="btn-main fx-slide" data-hover="Book Your Consultation"><span>Book Your Consultation</span></Link>
              </div>
            </div>
            <div className="col-lg-7 order-1 order-lg-2">
              <div className="cardswap-wrap" style={{ height: '620px', position: 'relative' }}>
                <CardSwap
                  cardDistance={60}
                  verticalDistance={70}
                  delay={5000}
                  pauseOnHover={true}
                  width={440}
                  height={540}
                  onCardPreview={(i) => setPortfolioPreview(i)}
                >
                  {portfolioImages.map((img, i) => (
                    <Card key={i} style={{
                      border: '3px solid transparent',
                      background: 'linear-gradient(#000A5B, #000A5B) padding-box, linear-gradient(135deg, #D4AF37 0%, #4A7CD2 55%, #7BA7E8 100%) border-box',
                      boxShadow: '0 28px 70px rgba(0,0,0,0.7), 0 0 50px rgba(74,124,210,0.45), 0 0 100px rgba(212,175,55,0.12)',
                      cursor: 'pointer',
                    }}>
                      <div style={{ position: 'relative', width: '100%', height: '100%' }}>
                        <img src={img} alt={`Smile Transformation ${i + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                        <div style={{
                          position: 'absolute', bottom: 0, left: 0, right: 0,
                          background: 'linear-gradient(transparent, rgba(0,0,10,0.88))',
                          padding: '48px 18px 18px',
                          textAlign: 'center', color: '#fff',
                        }}>
                          <span style={{ fontSize: '10px', letterSpacing: '4px', textTransform: 'uppercase', fontWeight: 700, opacity: 0.85 }}>Before & After</span>
                        </div>
                        <div style={{
                          position: 'absolute', top: '14px', right: '14px',
                          width: '36px', height: '36px',
                          background: 'linear-gradient(135deg, #D4AF37, #4A7CD2)',
                          borderRadius: '50%',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          boxShadow: '0 4px 16px rgba(74,124,210,0.6)',
                          fontSize: '15px', color: '#fff', fontWeight: 700,
                        }}>+</div>
                      </div>
                    </Card>
                  ))}
                </CardSwap>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="bg-color text-light pt-40 pb-40">
        <div className="container">
          <div className="row g-4 align-items-center">
            <div className="col-md-9">
              <h3 className="mb-0 fs-32 text-white">Inspired by these results? Get your dream smile.</h3>
            </div>
            <div className="col-lg-3 text-lg-end">
              <Link className="btn-main btn-line fx-slide" href="/booking" data-hover="Book Appointment"><span>Book Appointment</span></Link>
            </div>
          </div>
        </div>
      </section>

      <MapContactSection />
      <Footer />
    </>
  );
}
