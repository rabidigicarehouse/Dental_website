'use client';

import { useEffect } from 'react';

export default function HashAnchorScroller() {
  useEffect(() => {
    const scrollToHash = () => {
      const hash = window.location.hash.replace('#', '').trim();
      if (!hash) return;

      const target = document.getElementById(hash);
      if (!target) return;

      window.requestAnimationFrame(() => {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    };

    const timer = window.setTimeout(scrollToHash, 120);
    window.addEventListener('hashchange', scrollToHash);

    return () => {
      window.clearTimeout(timer);
      window.removeEventListener('hashchange', scrollToHash);
    };
  }, []);

  return null;
}
