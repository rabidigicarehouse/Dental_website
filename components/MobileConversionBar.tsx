'use client';

import { useEffect } from 'react';
import { useBookingModal } from '@/components/BookingModalProvider';

export default function MobileConversionBar() {
  const { open, isOpen } = useBookingModal();

  useEffect(() => {
    const shouldShow = !isOpen;
    document.body.classList.toggle('mobile-conversion-visible', shouldShow);
    return () => document.body.classList.remove('mobile-conversion-visible');
  }, [isOpen]);

  if (isOpen) {
    return null;
  }

  return (
    <nav className="mobile-conversion-bar" aria-label="Quick contact actions">
      <a href="tel:+12126971701" className="mobile-conversion-action" aria-label="Call now">
        <i className="icofont-phone" aria-hidden="true" />
        <span>Call Now</span>
      </a>
      <button type="button" className="mobile-conversion-action mobile-conversion-action--book" onClick={open} aria-label="Book consultation">
        <i className="icofont-calendar" aria-hidden="true" />
        <span>Book Consultation</span>
      </button>
    </nav>
  );
}
