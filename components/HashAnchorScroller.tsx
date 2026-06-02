'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function HashAnchorScroller() {
  const pathname = usePathname();

  useEffect(() => {
    const scrollToHash = () => {
      const hash = window.location.hash.replace('#', '').trim();
      if (!hash) return;

      const target = document.getElementById(hash);
      if (!target) return;

      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    const runScrollSequence = () => {
      window.requestAnimationFrame(scrollToHash);
      window.setTimeout(scrollToHash, 120);
      window.setTimeout(scrollToHash, 320);
    };

    const timer = window.setTimeout(runScrollSequence, 60);
    window.addEventListener('hashchange', scrollToHash);
    window.addEventListener('load', runScrollSequence);

    return () => {
      window.clearTimeout(timer);
      window.removeEventListener('hashchange', scrollToHash);
      window.removeEventListener('load', runScrollSequence);
    };
  }, [pathname]);

  return null;
}
