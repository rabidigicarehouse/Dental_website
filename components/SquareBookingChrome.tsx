'use client';

import { useEffect } from 'react';

/** Hides site header/marquee/footer on the Square-style booking page */
export default function SquareBookingChrome() {
  useEffect(() => {
    document.body.classList.add('square-booking-active');
    return () => document.body.classList.remove('square-booking-active');
  }, []);
  return null;
}
