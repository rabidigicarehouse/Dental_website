'use client';

import { useState } from 'react';
import Link from 'next/link';
import MapContactSection from '@/components/MapContactSection';
import Footer from '@/components/Footer';

const FAQS = [
  { q: 'How far in advance should I start?', a: 'For best results we recommend 6 months. For whitening-only packages, 4 weeks is enough.' },
  { q: 'Do I need to commit to all services?', a: 'No — packages are fully customizable. We\'ll recommend only what fits your goals and budget.' },
  { q: 'What if my event is in less than a month?', a: 'We have express options including same-day whitening and bonding for last-minute brides.' },
  { q: 'Do you offer group bridesmaid pricing?', a: 'Yes! Group bookings for the wedding party qualify for special pricing. Ask us during your consultation.' },
];

const PACKAGES = [
  {
    tier: 'Bronze',
    price: '999',
    recommendation: 'Minimum 2 People. Recommended 2 weeks before the event.',
    image: '/graduation and bridal/bronze.webp',
    includes: [
      'Comprehensive Evaluation',
      'Fluoride Varnish Application',
      'Take Home Tray',
      'Zoom Whitening',
      'Cleaning',
    ],
  },
  {
    tier: 'Silver',
    price: '1,699',
    recommendation: 'Minimum 2 People. Recommended 1 month before the event.',
    image: '/graduation and bridal/silver.webp',
    includes: [
      'Comprehensive Evaluation',
      'Fluoride Varnish Application',
      'Teeth Bonding (2 Teeth)',
      'Take Home Tray',
      'Zoom Whitening',
      'Cleaning',
    ],
    featured: true,
  },
  {
    tier: 'Gold',
    price: '2,999',
    recommendation: 'Minimum 2 People. Recommended 2 weeks before the event.',
    image: '/graduation and bridal/gold.webp',
    includes: [
      'Comprehensive Evaluation',
      'Fluoride Varnish Application',
      'Take Home Tray',
      'Zoom Whitening',
      '4 quadrants of deep cleaning',
      'Antibiotic treatments',
    ],
  },
];

export default function BridalGraduationPackages() {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  return (
    <>
      {/* Subheader */}
      <section
        id="subheader"
        className="page-subheader page-subheader--service text-center"
        style={{
          backgroundImage: 'url("/dental services/Bridal & Graduation Packages.jpg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="container relative z-2">
          <div className="page-subheader-eyebrow" style={{ color: 'rgba(255,255,255,0.85)' }}>Our Services</div>
          <h1 className="page-subheader-title" style={{ color: '#fff' }}>Bridal &amp; Graduation Packages</h1>
          <ul className="crumb">
            <li><Link href="/" style={{ color: 'rgba(255,255,255,0.8)' }}>Home</Link></li>
            <li><Link href="/services" style={{ color: 'rgba(255,255,255,0.8)' }}>Services</Link></li>
            <li className="active" style={{ color: '#fff' }}>Bridal &amp; Graduation Packages</li>
          </ul>
        </div>
      </section>

      {/* Intro */}
      <section className="pt-60 pb-40">
        <div className="container">
          <div className="row g-5 align-items-center">
            <div className="col-lg-6 wow fadeInUp">
              <div className="subtitle id-color mb-3">Bridal &amp; Graduation Packages</div>
              <h2 className="mb-3" style={{ fontSize: 42, lineHeight: 1.15 }}>
                Look Your Absolute Best on the Biggest Day of Your Life
              </h2>
              <p style={{ fontSize: 16, lineHeight: 1.75, color: '#5c6c75' }}>
                From wedding day photos to senior portraits, we design custom cosmetic
                treatment plans timed perfectly for your big moment. Combine whitening,
                contouring, veneers, and Invisalign in a coordinated plan that fits
                your timeline and budget.
              </p>
            </div>
            <div className="col-lg-6 wow fadeInUp">
              <div
                style={{
                  borderRadius: 16,
                  overflow: 'hidden',
                  boxShadow: '0 24px 60px rgba(29, 44, 54, 0.18)',
                }}
              >
                <img
                  src="/dental services/Bridal & Graduation Packages.jpg"
                  alt="Bridal and graduation packages"
                  style={{ width: '100%', display: 'block' }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Picture Perfect Wedding Or Graduation Smile — two cards */}
      <section className="bridal-perfect-section">
        <div className="container">
          <div className="text-center wow fadeInUp">
            <h2 className="bridal-perfect-title">Picture Perfect Wedding Or Graduation Smile</h2>
          </div>

          <div className="bridal-perfect-grid wow fadeInUp">
            <article className="bridal-perfect-card">
              <div className="bridal-perfect-photo">
                <img src="/graduation and bridal/1.webp" alt="For Bridal Parties" />
              </div>
              <h3 className="bridal-perfect-heading">For Bridal Parties</h3>
              <p className="bridal-perfect-subhead">Purchase For The Whole Bridal Party</p>
              <ul className="bridal-perfect-list">
                <li>Your special day comes only once, we&rsquo;re here to make sure your smile is as dazzling as your dress.</li>
                <li>We offer special packages for the bride and groom, mothers of the bride and groom, and the entire bridal party!</li>
                <li>Our packages include cleanings, whitening, gum therapy, bondings, invisalign, crowns, veneers and smile reconstruction.</li>
                <li>Ask for a complimentary cosmetic evaluation and see how this variety of treatment can make your day a memorable one.</li>
              </ul>
            </article>

            <div className="bridal-perfect-divider" aria-hidden="true" />

            <article className="bridal-perfect-card">
              <div className="bridal-perfect-photo">
                <img src="/graduation and bridal/2.webp" alt="Gift For Grads" />
              </div>
              <h3 className="bridal-perfect-heading">Gift For Grads</h3>
              <p className="bridal-perfect-subhead">Make Your Mark &amp; Keep The Memory Forever</p>
              <ul className="bridal-perfect-list">
                <li>Be a larger part of the graduation milestone they will not soon forget.</li>
                <li>This purchase will make them smile bigger and brighter on their special day where photographs will not be scarce.</li>
                <li>Celebrate this year&rsquo;s graduating class with a customized dental package made especially for them.</li>
                <li>Ask for a complimentary cosmetic evaluation and see how this variety of treatment can make your day a memorable one.</li>
              </ul>
            </article>
          </div>
        </div>
      </section>

      {/* Pricing tiers — Bronze / Silver / Gold */}
      <section className="bridal-pricing-section">
        <div className="container">
          <div className="bridal-pricing-grid">
            {PACKAGES.map((pkg) => (
              <article
                key={pkg.tier}
                className={'bridal-pricing-card' + (pkg.featured ? ' is-featured' : '')}
              >
                <div className="bridal-pricing-photo">
                  <img src={pkg.image} alt={`${pkg.tier} package`} />
                </div>
                <div className="bridal-pricing-body">
                  <h3 className="bridal-pricing-tier">{pkg.tier}</h3>
                  <p className="bridal-pricing-rec">{pkg.recommendation}</p>
                  <div className="bridal-pricing-amount">
                    <span className="bridal-pricing-currency">$</span>
                    <span className="bridal-pricing-figure">{pkg.price}</span>
                    <span className="bridal-pricing-suffix"> / Patient</span>
                  </div>
                  <ul className="bridal-pricing-includes">
                    {pkg.includes.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                  <Link href="#book" className="bridal-pricing-cta">
                    Purchase Now
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="pt-80 pb-80">
        <div className="container">
          <div className="row g-5">
            <div className="col-lg-5">
              <div className="subtitle id-color mb-3">Frequently Asked Questions</div>
              <h2 className="mb-3" style={{ fontSize: 36, lineHeight: 1.2 }}>
                Common Questions About Our Bridal &amp; Graduation Packages
              </h2>
              <p style={{ fontSize: 15, lineHeight: 1.7, color: '#5c6c75' }}>
                Wondering how to time your treatments around your event? Here are
                the questions we hear most often.
              </p>
            </div>
            <div className="col-lg-7">
              <div className="react-accordion">
                {FAQS.map((item, idx) => (
                  <div key={idx} className={`accordion-item-wrap ${activeFaq === idx ? 'active' : ''}`}>
                    <div
                      className="accordion-title-custom"
                      onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                    >
                      {item.q}
                    </div>
                    {activeFaq === idx && (
                      <div className="accordion-content-custom">{item.a}</div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <MapContactSection />
      <Footer />
    </>
  );
}
