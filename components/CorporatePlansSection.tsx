'use client';

import { useCallback } from 'react';
import { useBookingModal } from '@/components/BookingModalProvider';

const PLAN_HIGHLIGHTS = [
  {
    title: 'Corporate Dental Plans',
    copy: 'Tailored preventive and cosmetic plan options for teams, founders, and executive wellness programs.',
  },
  {
    title: 'Flexible Service Bundles',
    copy: 'Combine cleanings, whitening, Invisalign consults, emergency access, and restorative care in one offering.',
  },
  {
    title: 'White-Glove Coordination',
    copy: 'Concierge scheduling, streamlined onboarding, and a dedicated care experience for every employee group.',
  },
];

const SERVICE_TAGS = [
  'Preventive care',
  'Whitening programs',
  'Invisalign consultations',
  'Emergency visits',
  'Restorative dentistry',
  'Executive scheduling',
];

export default function CorporatePlansSection() {
  const { open } = useBookingModal();

  const handleConnect = useCallback(() => {
    if (typeof window !== 'undefined' && window.matchMedia('(max-width: 1024px)').matches) {
      window.location.href = 'tel:+12126971701';
      return;
    }

    open();
  }, [open]);

  return (
    <section className="corporate-plans-section">
      <div className="container">
        <div className="corporate-plans-shell">
          <div className="corporate-plans-copy">
            <span className="corporate-plans-kicker">Custom Corporate Solutions</span>
            <h2 className="corporate-plans-title">Custom dental plans designed for teams, executives, and modern workplaces.</h2>
            <p className="corporate-plans-text">
              We help companies create polished, practical dental programs that support employee wellness, smile confidence,
              and easy access to premium care across cosmetic, preventive, and restorative services.
            </p>

            <div className="corporate-plan-tags">
              {SERVICE_TAGS.map((tag) => (
                <span key={tag} className="corporate-plan-tag">{tag}</span>
              ))}
            </div>
          </div>

          <div className="corporate-plans-panel">
            <div className="corporate-plans-grid">
              {PLAN_HIGHLIGHTS.map((item) => (
                <article key={item.title} className="corporate-plan-card">
                  <div className="corporate-plan-dot-wrap">
                    <div className="corporate-plan-dot" />
                  </div>
                  <h3>{item.title}</h3>
                  <p>{item.copy}</p>
                </article>
              ))}
            </div>
          </div>

          <div className="corporate-plans-cta">
            <div className="corporate-plans-cta-copy">
              <span className="corporate-plans-cta-label">Build a tailored program</span>
              <h3>Let&apos;s shape a dental plan that fits your team and your schedule.</h3>
            </div>
            <button type="button" className="corporate-plans-button" onClick={handleConnect}>
              Connect With Us
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
