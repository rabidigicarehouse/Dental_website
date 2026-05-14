'use client';

import { useState } from 'react';
import Link from 'next/link';
import MapContactSection from './MapContactSection';
import Footer from './Footer';

export type ServiceTreatment = {
  title: string;
  desc: string;
};

export type ServiceFaq = {
  q: string;
  a: string;
};

export type ServiceTestimonial = {
  name: string;
  img: string;
  stars: number;
  text: string;
  source: string;
};

export interface ServicePageProps {
  /** e.g. "Cosmetic Dentistry" */
  name: string;
  /** Big hero/intro headline (under the section subtitle) */
  introHeadline: string;
  /** Long-form intro paragraph */
  introParagraph: string;
  /** The quote shown over the intro image */
  introQuote: string;
  /** Path of the main hero image (left side) */
  introImage: string;
  /** Bullet points under "Why Choose Our X Services?" */
  whyChooseBullets: string[];
  /** "Why Choose Our X Services?" headline */
  whyChooseHeadline: string;
  /** "X Treatments We Offer" headline */
  treatmentsHeadline: string;
  /** List of treatment cards */
  treatments: ServiceTreatment[];
  /** FAQ block items */
  faqs: ServiceFaq[];
}

// Shared homepage-style testimonials (Premium Single Slide design)
const TESTIMONIALS: ServiceTestimonial[] = [
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
    text: 'My family and I have been coming here for years. The service is exceptional, and the team always goes the extra mile to make sure we’re happy.',
    source: 'Google',
  },
];

export default function ServicePageTemplate(props: ServicePageProps) {
  const {
    name,
    introHeadline,
    introParagraph,
    introQuote,
    introImage,
    whyChooseHeadline,
    whyChooseBullets,
    treatmentsHeadline,
    treatments,
    faqs,
  } = props;

  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [currentTesti, setCurrentTesti] = useState(0);

  return (
    <>
      {/* Subheader */}
      <section id="subheader" className="bg-color-op-1 text-center">
        <div className="container relative z-2">
          <div className="row align-items-center">
            <div className="col-lg-12">
              <h1 className="wow fadeInUp">{name}</h1>
              <div className="border-bottom my-3"></div>
              <ul className="crumb wow fadeInDown">
                <li><Link href="/">Home</Link></li>
                <li><Link href="/services">Services</Link></li>
                <li className="active">{name}</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Intro */}
      <section>
        <div className="container">
          <div className="row g-4 align-items-center">
            <div className="col-lg-7">
              <div className="relative">
                <div className="w-100 pe-5 pb-5 wow scaleIn">
                  <img src={introImage} className="w-100 rounded-1" alt={name} />
                </div>
                <div className="bg-color rounded-1 text-light w-50 p-4 abs end-0 bottom-0 z-2 soft-shadow wow scaleIn" data-wow-delay=".2s">
                  <i className="fa fa-quote-left fs-32 abs"></i>
                  <h4 className="ps-50">{introQuote}</h4>
                </div>
              </div>
            </div>
            <div className="col-lg-5">
              <div className="ps-lg-3">
                <div className="subtitle id-color wow fadeInUp" data-wow-delay=".2s">{name}</div>
                <h2 className="wow fadeInUp" data-wow-delay=".4s">{introHeadline}</h2>
                <p className="mb-0 wow fadeInUp" data-wow-delay=".6s">{introParagraph}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-dark text-light">
        <div className="container">
          <div className="row g-4">
            <div className="col-lg-5">
              <div className="subtitle id-color wow fadeInUp" data-wow-delay=".0s">Why Choose Us</div>
              <h2 className="wow fadeInUp" data-wow-delay=".2s">{whyChooseHeadline}</h2>
            </div>
            <div className="col-lg-7">
              <ul className="ul-check fs-500">
                {whyChooseBullets.map((b, i) => <li key={i}>{b}</li>)}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Treatments We Offer */}
      <section>
        <div className="container">
          <div className="row g-4 justify-content-center">
            <div className="col-lg-8 text-center">
              <div className="subtitle wow fadeInUp mb-3">{name}</div>
              <h2 className="wow fadeInUp" data-wow-delay=".2s">{treatmentsHeadline}</h2>
            </div>
          </div>

          <div className="row g-4">
            {treatments.map((t) => (
              <div className="col-lg-3 col-md-6 d-flex" key={t.title}>
                <div className="border-gray p-40 rounded-1 w-100" style={{ display: 'flex', flexDirection: 'column' }}>
                  <div className="relative wow fadeInUp" style={{ flex: 1 }}>
                    <h4>{t.title}</h4>
                    <p className="mb-0">{t.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials — Premium Single Slide (matches homepage) */}
      <section className="bg-color-op-1 pt-100 pb-100">
        <div className="container text-center">
          <div className="subtitle id-color wow fadeInUp mb-3">Testimonials Revealed</div>
          <h2 className="wow fadeInUp fs-60 mb-5" data-wow-delay=".2s">Hear Why Our Patients Love Us</h2>

          <div className="testimonial-single-wrapper relative wow fadeInUp" data-wow-delay=".4s">
            <div
              className="testimonial-nav-btn prev"
              onClick={() => setCurrentTesti((p) => (p - 1 + TESTIMONIALS.length) % TESTIMONIALS.length)}
            >
              <i className="arrow_carrot-left"></i>
            </div>

            <div className="testimonial-content-area">
              <div className="d-flex align-items-center justify-content-center mb-4">
                <img
                  src={`/images/testimonial/${TESTIMONIALS[currentTesti].img}`}
                  className="testi-avatar-premium"
                  alt={TESTIMONIALS[currentTesti].name}
                />
                <div className="text-start ms-3">
                  <h4 className="mb-1">{TESTIMONIALS[currentTesti].name}</h4>
                  <div className="stars-rating">
                    {[...Array(TESTIMONIALS[currentTesti].stars)].map((_, i) => (
                      <i key={i} className="fa fa-star text-warning"></i>
                    ))}
                  </div>
                </div>
              </div>
              <p className="testi-text-premium mb-4">{TESTIMONIALS[currentTesti].text}</p>
              <div className="testi-source-premium">
                Posted On{' '}
                <Link href="https://google.com" target="_blank" className="id-color fw-bold">
                  {TESTIMONIALS[currentTesti].source}
                </Link>
              </div>
            </div>

            <div
              className="testimonial-nav-btn next"
              onClick={() => setCurrentTesti((p) => (p + 1) % TESTIMONIALS.length)}
            >
              <i className="arrow_carrot-right"></i>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-light">
        <div className="container">
          <div className="row g-4">
            <div className="col-lg-5">
              <div className="subtitle id-color wow fadeInUp" data-wow-delay=".0s">Everything You Need to Know</div>
              <h2 className="wow fadeInUp" data-wow-delay=".2s">Frequently Asked Questions</h2>
            </div>
            <div className="col-lg-7">
              <div className="react-accordion">
                {faqs.map((item, idx) => (
                  <div key={idx} className={`accordion-item-wrap ${activeFaq === idx ? 'active' : ''}`}>
                    <div
                      className="accordion-title-custom"
                      onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                    >
                      {item.q}
                      <i className={`arrow_carrot-${activeFaq === idx ? 'up' : 'down'}`}></i>
                    </div>
                    <div
                      className="accordion-content-custom"
                      style={{
                        maxHeight: activeFaq === idx ? '240px' : '0',
                        opacity: activeFaq === idx ? 1 : 0,
                        overflow: 'hidden',
                        transition: 'all 0.4s ease-in-out',
                        padding: activeFaq === idx ? '15px 0' : '0',
                      }}
                    >
                      {item.a}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-color text-light pt-50 pb-50">
        <div className="container">
          <div className="row g-4 align-items-center">
            <div className="col-md-9">
              <h3 className="mb-0 fs-32">Ready to Book Your Appointment?</h3>
              <p className="mb-0">Contact us today to schedule your visit and take the first step toward a healthier smile.</p>
            </div>
            <div className="col-lg-3 text-lg-end">
              <Link className="btn-main fx-slide btn-line" href="/booking"><span>Book Appointment</span></Link>
            </div>
          </div>
        </div>
      </section>

      <MapContactSection />
      <Footer />
    </>
  );
}
