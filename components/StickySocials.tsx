'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

/**
 * Sticky vertical social-icon bar that floats on the side of every page.
 * Extracted out of AIWidget so the chat panel can be disabled while the
 * social icons keep working. Hides itself when the #extra-wrap drawer is
 * open or when the user scrolls close to the footer (same logic the old
 * widget used).
 */
export default function StickySocials() {
  const [mounted, setMounted] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!mounted) return;

    const checkVisibility = () => {
      const extraWrap = document.getElementById('extra-wrap');
      const extraOpen = extraWrap?.classList.contains('open') ?? false;
      const footer = document.querySelector('footer');
      let nearFooter = false;
      if (footer) {
        const rect = footer.getBoundingClientRect();
        nearFooter = rect.top < window.innerHeight - 80;
      }
      setHidden(extraOpen || nearFooter);
    };

    checkVisibility();
    window.addEventListener('scroll', checkVisibility, { passive: true });
    window.addEventListener('resize', checkVisibility);

    const extraWrap = document.getElementById('extra-wrap');
    let observer: MutationObserver | null = null;
    if (extraWrap) {
      observer = new MutationObserver(checkVisibility);
      observer.observe(extraWrap, { attributes: true, attributeFilter: ['class'] });
    }
    return () => {
      window.removeEventListener('scroll', checkVisibility);
      window.removeEventListener('resize', checkVisibility);
      observer?.disconnect();
    };
  }, [mounted]);

  if (!mounted) return null;

  return (
    <div
      className={
        'fixed z-[9999] ai-widget-floating-container flex flex-col items-center gap-3 transition-all duration-500 ease-in-out' +
        (hidden ? ' sticky-hidden' : '')
      }
    >
      <div className="sticky-social-bar-integrated items-center justify-center">
        <Link
          href="https://www.youtube.com/@askadentistaskdr.harvey7701"
          target="_blank"
          className="social-icon-btn"
        >
          <Image
            src="/social icons/youtube.png"
            alt="YouTube"
            width={20}
            height={20}
            className="w-4 h-4 lg:w-5 lg:h-5 object-contain"
          />
        </Link>
        <Link
          href="https://www.facebook.com/UpperEastDental/"
          target="_blank"
          className="social-icon-btn"
        >
          <Image
            src="/social icons/facebook.png"
            alt="Facebook"
            width={20}
            height={20}
            className="w-4 h-4 lg:w-5 lg:h-5 object-contain"
          />
        </Link>
        <Link
          href="https://www.instagram.com/uppereastdentalnyc/?hl=en"
          target="_blank"
          className="social-icon-btn"
        >
          <Image
            src="/social icons/instagram.png"
            alt="Instagram"
            width={20}
            height={20}
            className="w-4 h-4 lg:w-5 lg:h-5 object-contain"
          />
        </Link>
        <Link
          href="https://twitter.com/uppereastdental"
          target="_blank"
          className="social-icon-btn"
        >
          <Image
            src="/social icons/twitter.png"
            alt="X (Twitter)"
            width={20}
            height={20}
            className="w-4 h-4 lg:w-5 lg:h-5 object-contain"
          />
        </Link>
        <Link
          href="https://www.linkedin.com/in/shardeharvey/?_l=en_US"
          target="_blank"
          className="social-icon-btn"
        >
          <Image
            src="/social icons/linkedin.png"
            alt="LinkedIn"
            width={20}
            height={20}
            className="w-4 h-4 lg:w-5 lg:h-5 object-contain"
          />
        </Link>
      </div>
    </div>
  );
}
