'use client';

import { useState } from 'react';
import Link from 'next/link';
import CardSwap, { Card } from '@/components/CardSwap';
import TeethCompareSlider from '@/components/TeethCompareSlider';
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
          backgroundImage: 'url("/heading_background/smile_gallery.jpg")',
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
              <h2 className="portfolio-title text-start wow fadeInUp" data-wow-delay=".2s" style={{ color: '#165369' }}>Real People, Real Results</h2>
              <p className="text-dark op-7 mb-4 wow fadeInUp" data-wow-delay=".3s">
                Experience the life-changing impact of our dental expertise. Our portfolio showcases the dedication and precision we bring to every smile transformation. From subtle enhancements to full-mouth reconstructions, our work speaks for itself.
              </p>
              <div className="wow fadeInUp" data-wow-delay=".4s">
                <Link href="#book" className="btn-main fx-slide" data-hover="Book Your Consultation"><span>Book Your Consultation</span></Link>
              </div>
            </div>
            <div className="col-lg-7 order-1 order-lg-2">
              <TeethCompareSlider />
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
              <Link className="btn-main btn-line fx-slide" href="#book" data-hover="Connect Us"><span>Connect Us</span></Link>
            </div>
          </div>
        </div>
      </section>

      <MapContactSection />
      <Footer />
    </>
  );
}
