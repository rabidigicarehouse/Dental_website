'use client';

import { useState } from 'react';
import Link from 'next/link';

const SQUARE_BOOK_URL =
  'https://square.site/book/8YN3X16T15M6W/upper-east-dental-innovations';

const SERVICES = [
  {
    id: 'teleconsult',
    title: 'Teleconsult',
    description:
      'Our practice has gone virtual! We are now offering Tele-Consults. Schedule your virtual consultation today and speak with our team from the comfort of your home.',
    duration: '20 minutes',
    price: 'Free',
  },
  {
    id: 'senior-consult',
    title: '$49. Consultation for Senior Citizens',
    description: '$49 Consultation for all Senior Citizens.',
    duration: '30 minutes',
    price: 'Free',
  },
  {
    id: 'consultation',
    title: 'Consultation',
    description:
      'Our consultation service offers expert advice and personalized recommendations to help you achieve your dental health goals.',
    duration: '30 minutes',
    price: 'Free',
  },
  {
    id: 'zoom-whitening',
    title: 'Zoom Whitening',
    description:
      'Experience the confidence-boosting power of our Zoom Whitening service. Our professional team uses advanced techniques for a brighter, whiter smile.',
    duration: '30 minutes',
    price: 'Free',
  },
  {
    id: 'bridal',
    title: 'Bridal & Graduation Packages',
    description:
      'Our packages include cleanings, whitening, gum therapy, and more — tailored for your special day.',
    duration: '30 minutes',
    price: 'Free',
  },
  {
    id: 'veneers',
    title: 'Veneers',
    description:
      'Transform your smile with our premium veneers service. Custom-crafted for a natural, stunning appearance.',
    duration: '30 minutes',
    price: 'Free',
  },
  {
    id: 'invisalign',
    title: 'Invisalign',
    description:
      'Experience the transformative power of Invisalign clear aligners for a straighter smile without traditional braces.',
    duration: '30 minutes',
    price: 'Free',
  },
  {
    id: 'bonding',
    title: 'Bonding',
    description:
      'Experience the exceptional service of Bonding — a quick, effective solution for chips, gaps, and minor imperfections.',
    duration: '30 minutes',
    price: 'Free',
  },
  {
    id: 'tmj',
    title: 'TMJ treatment',
    description:
      'Experience personalized TMJ treatment focused on pain relief and improved jaw function.',
    duration: '30 minutes',
    price: 'Free',
  },
  {
    id: 'test',
    title: 'Test',
    description:
      'Our comprehensive dental test is designed to evaluate your overall oral health and identify any areas that need attention.',
    duration: '30 minutes',
    price: 'Free',
  },
];

const STAFF = [
  { name: 'Dr. Sharde Harvey, DDS, MS, FICOI', role: 'General Dentist' },
  { name: 'Dr. Pellegrini', role: 'Periodontist — LANAP & LAPIP' },
];

function ServiceCard({
  title,
  description,
  duration,
  price,
}: {
  title: string;
  description: string;
  duration: string;
  price: string;
}) {
  const [expanded, setExpanded] = useState(false);
  const isLong = description.length > 120;

  return (
    <article className="sq-service-card">
      <div className="sq-service-card__body">
        <h3 className="sq-service-card__title">{title}</h3>
        <p className="sq-service-card__desc">
          {isLong && !expanded ? `${description.slice(0, 120)}…` : description}
          {isLong && (
            <button
              type="button"
              className="sq-link sq-service-card__more"
              onClick={() => setExpanded((v) => !v)}
            >
              {expanded ? ' Less' : ' More'}
            </button>
          )}
        </p>
        <p className="sq-service-card__meta">
          {price} · {duration}
        </p>
      </div>
      <a
        href={SQUARE_BOOK_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="sq-service-card__book"
      >
        Book now
      </a>
    </article>
  );
}

export default function SquareStyleBooking() {
  const [tab, setTab] = useState<'services' | 'staff'>('services');

  return (
    <div className="sq-booking">
      <header className="sq-booking__topbar">
        <a
          href={SQUARE_BOOK_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="sq-link sq-booking__signin"
        >
          Sign in
        </a>
      </header>

      <div className="sq-booking__layout">
        <aside className="sq-sidebar">
          <div className="sq-sidebar__brand">
            <div className="sq-sidebar__logo" aria-hidden="true">
              U
            </div>
            <h1 className="sq-sidebar__name">upper East Dental Innovations PLLC</h1>
          </div>

          <a
            href={SQUARE_BOOK_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="sq-sidebar__cta"
          >
            Book an appointment
          </a>

          <section className="sq-sidebar__block">
            <h2 className="sq-sidebar__heading">Location &amp; hours</h2>
            <div className="sq-sidebar__map">
              <iframe
                title="Upper East Dental Innovations location"
                src="https://maps.google.com/maps?q=121+East+60th+Street+Suite+1B+New+York+NY+10022&z=15&output=embed"
                width="100%"
                height="160"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
            <p className="sq-sidebar__line">
              <i className="fa fa-map-marker sq-sidebar__icon" aria-hidden="true" />
              121 east 60th street, suite 1B, Ste 1B, New York, NY 10022-1164
            </p>
            <p className="sq-sidebar__line">
              <i className="fa fa-clock-o sq-sidebar__icon" aria-hidden="true" />
              Open today until 6:00 PM{' '}
              <button type="button" className="sq-link sq-sidebar__more-btn">
                More
              </button>
            </p>
          </section>

          <section className="sq-sidebar__block">
            <h2 className="sq-sidebar__heading">Connect</h2>
            <p className="sq-sidebar__line">
              <i className="fa fa-globe sq-sidebar__icon" aria-hidden="true" />
              <a
                href="https://www.uppereastdentalinnovations.com"
                target="_blank"
                rel="noopener noreferrer"
                className="sq-link"
              >
                www.uppereastdentalinnovations.com
              </a>
            </p>
            <p className="sq-sidebar__line">
              <i className="fa fa-envelope-o sq-sidebar__icon" aria-hidden="true" />
              <a href="mailto:info@uedi.nyc" className="sq-link">
                info@uedi.nyc
              </a>
            </p>
            <p className="sq-sidebar__line">
              <i className="fa fa-phone sq-sidebar__icon" aria-hidden="true" />
              <a href="tel:+12126971701" className="sq-link">
                (212) 697-1701
              </a>
            </p>
          </section>
        </aside>

        <main className="sq-main">
          <h2 className="sq-main__title">Book an appointment</h2>

          <div className="sq-tabs" role="tablist">
            <button
              type="button"
              role="tab"
              aria-selected={tab === 'services'}
              className={`sq-tabs__btn ${tab === 'services' ? 'sq-tabs__btn--active' : ''}`}
              onClick={() => setTab('services')}
            >
              Services
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={tab === 'staff'}
              className={`sq-tabs__btn ${tab === 'staff' ? 'sq-tabs__btn--active' : ''}`}
              onClick={() => setTab('staff')}
            >
              Staff
            </button>
          </div>

          {tab === 'services' ? (
            <div className="sq-service-list">
              {SERVICES.map((s) => (
                <ServiceCard key={s.id} {...s} />
              ))}
            </div>
          ) : (
            <div className="sq-staff-list">
              {STAFF.map((member) => (
                <article key={member.name} className="sq-service-card">
                  <div className="sq-service-card__body">
                    <h3 className="sq-service-card__title">{member.name}</h3>
                    <p className="sq-service-card__desc">{member.role}</p>
                  </div>
                  <a
                    href={SQUARE_BOOK_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="sq-service-card__book"
                  >
                    Book now
                  </a>
                </article>
              ))}
            </div>
          )}
        </main>
      </div>

      <footer className="sq-booking__footer">
        <Link href="/privacy" className="sq-link">
          Cookie policy
        </Link>
      </footer>
    </div>
  );
}
