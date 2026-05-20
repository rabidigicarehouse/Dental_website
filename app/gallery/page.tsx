'use client';

import Link from 'next/link';
import { useState } from 'react';
import MapContactSection from '@/components/MapContactSection';
import Footer from '@/components/Footer';

export default function Gallery() {
  const [filter, setFilter] = useState('*');

  const galleryItems = [
    { id: 1, category: 'facilities', image: '/images/gallery/l1.webp' },
    { id: 2, category: 'facilities', image: '/images/gallery/l2.webp' },
    { id: 3, category: 'facilities', image: '/images/gallery/l3.webp' },
    { id: 4, category: 'facilities', image: '/images/gallery/l4.webp' },
    { id: 5, category: 'facilities', image: '/images/gallery/l5.webp' },
    { id: 6, category: 'dentists', image: '/images/gallery/l6.webp' },
    { id: 7, category: 'dentists', image: '/images/gallery/l7.webp' },
    { id: 8, category: 'dentists', image: '/images/gallery/l8.webp' },
    { id: 9, category: 'services', image: '/images/gallery/l9.webp' },
    { id: 10, category: 'services', image: '/images/gallery/l10.webp' },
    { id: 11, category: 'services', image: '/images/gallery/l11.webp' },
    { id: 12, category: 'services', image: '/images/gallery/l12.webp' },
  ];

  const filteredItems = filter === '*' 
    ? galleryItems 
    : galleryItems.filter(item => item.category === filter);

  const portfolioImages = [
    '/before and after/01-259x300.webp',
    '/before and after/02-259x300.webp',
    '/before and after/03-259x300.webp',
    '/before and after/01-259x300 (1).webp'
  ];

  return (
    <>
      <section
        id="subheader"
        className="page-subheader text-center"
        style={{
          backgroundImage: 'url(/office tour/5.jpeg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="container relative z-2">
          <div className="page-subheader-eyebrow" style={{ color: 'rgba(255,255,255,0.85)' }}>Visual Tour</div>
          <h1 className="page-subheader-title" style={{ color: '#fff' }}>Gallery</h1>
          <ul className="crumb">
            <li><Link href="/" style={{ color: 'rgba(255,255,255,0.8)' }}>Home</Link></li>
            <li className="active" style={{ color: '#fff' }}>Gallery</li>
          </ul>
        </div>
      </section>

      {/* Smile Gallery Intro Section */}
      <section className="no-top no-bottom relative overflow-hidden">
        <div 
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: 'url("/dental services/Cosmetic Dentistry.webp")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div 
          className="absolute inset-0 z-1"
          style={{
            backgroundColor: 'rgba(22, 83, 105, 0.85)',
          }}
        />
        
        <div className="container relative z-2 py-100">
          <div className="row justify-content-center text-center">
            <div className="col-lg-8">
              <div className="subtitle text-white op-8 wow fadeInUp mb-3">Our Artistry</div>
              <h2 className="text-white wow fadeInUp" data-wow-delay=".2s">Upper East Dental Innovations</h2>
              <p className="text-white fs-20 wow fadeInUp" data-wow-delay=".4s">
                Where artistry, craftsmanship and technology are the cornerstones of a truly innovative dental practice. Home of the Lunchtime Crown, cosmetic and restorative dentistry, i.e. implants, veneers, bonding, and tooth whitening all holistically designed for the perfect smile.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Before and After Section */}
      <section className="bg-light">
        <div className="container">
          <div className="row justify-content-center text-center mb-5">
            <div className="col-lg-8">
              <div className="subtitle id-color-2 wow fadeInUp mb-3">Before & After</div>
              <h2 className="wow fadeInUp" data-wow-delay=".2s">Smile Transformations</h2>
              <p className="wow fadeInUp">Witness the incredible results we achieve for our patients.</p>
            </div>
          </div>

          <div className="row g-4">
            {portfolioImages.map((img, idx) => (
              <div className="col-lg-3 col-md-6" key={idx}>
                <div className="relative overflow-hidden rounded-10 shadow-sm wow zoomIn" data-wow-delay={`${idx * 0.1}s`}>
                  <img src={img} className="w-100 hover-scale-1-2" alt={`Transformation ${idx + 1}`} />
                  <div className="absolute bottom-0 start-0 w-100 p-3 text-white text-center" style={{ background: 'linear-gradient(transparent, rgba(0,0,0,0.8))' }}>
                    <span className="fs-12 fw-bold text-uppercase ls-2">Result {idx + 1}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Gallery Section */}
      <section id="section-gallery">
        <div className="container">
          <div className="row justify-content-center text-center mb-4">
            <div className="col-lg-8">
              <div className="subtitle id-color wow fadeInUp mb-3">Office Tour</div>
              <h2 className="wow fadeInUp" data-wow-delay=".2s">Our Facilities</h2>
            </div>
          </div>

          <div className="row">
            <div className="col-md-12 text-center">
              <ul id="filters" className="wow fadeInUp" data-wow-delay="0s">
                <li><a href="#" onClick={(e) => { e.preventDefault(); setFilter('*'); }} className={filter === '*' ? "selected" : ""}>View All</a></li>
                <li><a href="#" onClick={(e) => { e.preventDefault(); setFilter('dentists'); }} className={filter === 'dentists' ? "selected" : ""}>dentists</a></li>
                <li><a href="#" onClick={(e) => { e.preventDefault(); setFilter('facilities'); }} className={filter === 'facilities' ? "selected" : ""}>facilities</a></li>
                <li><a href="#" onClick={(e) => { e.preventDefault(); setFilter('services'); }} className={filter === 'services' ? "selected" : ""}>services</a></li>
              </ul>
            </div>
          </div>

          <div id="gallery" className="row g-3 wow fadeIn" data-wow-delay=".3s">
            {filteredItems.map(item => (
              <div key={item.id} className={`col-md-3 col-sm-6 col-12 item ${item.category}`}>
                <a href={item.image} className="image-popup d-block hover" target="_blank">
                  <div className="relative overflow-hidden rounded-1">
                    <div className="absolute start-0 w-100 hover-op-1 p-5 abs-middle z-2 text-center text-white z-3">
                      View
                    </div>
                    <div className="absolute start-0 w-100 h-100 overlay-black-5 hover-op-1 z-2"></div>
                    <img src={item.image} className="w-100 hover-scale-1-2" alt="" />
                  </div>
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="bg-color text-light pt-40 pb-40">
        <div className="container">
          <div className="row g-4 align-items-center">
            <div className="col-md-9">
              <h3 className="mb-0 fs-32 text-white">Inspired by what you see?</h3>
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
