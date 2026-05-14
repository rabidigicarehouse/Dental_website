'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import Header from './Header';

export default function HeaderWrapper() {
  const pathname = usePathname();

  let headerClass = "transparent scroll-light";
  let useHeaderInner = false;
  const isHomepage = pathname === '/' || pathname.startsWith('/homepage-');

  if (pathname === '/homepage-2') {
    headerClass = "transparent header-light";
  } else if (pathname === '/homepage-6') {
    headerClass = "transparent header-light";
  } else if (pathname === '/homepage-5') {
    headerClass = "transparent header-light nav-up";
  } else if (pathname === '/homepage-3' || pathname === '/homepage-7') {
    headerClass = "transparent header-light header-float";
    useHeaderInner = true;
  } else if (!isHomepage) {
    headerClass = "transparent header-light";
  }

  /* on3step.js strips `autoshow` from header on ≤992px, so the theme's
     scroll-handler never adds `smaller` on mobile. Mirror the desktop
     behavior here: toggle `smaller` based on scroll for all viewports. */
  useEffect(() => {
    const onScroll = () => {
      const header = document.querySelector('header');
      if (!header) return;
      if (window.scrollY >= 50) {
        header.classList.add('smaller');
      } else {
        header.classList.remove('smaller');
      }
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [pathname]);

  /* Tag the body with `is-homepage` / `is-subpage` so CSS can style
     the header differently on subpages (dark on mobile, content pushed
     below the navbar instead of overlaying a hero). */
  useEffect(() => {
    const body = document.body;
    if (isHomepage) {
      body.classList.add('is-homepage');
      body.classList.remove('is-subpage');
    } else {
      body.classList.add('is-subpage');
      body.classList.remove('is-homepage');
    }
  }, [pathname, isHomepage]);

  /* Mobile menu: tap a top-level item with a submenu to expand it inline.
     Uses event delegation so it works regardless of when the menu is
     mounted by on3step.js. */
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (window.innerWidth > 1024) return;

      const target = e.target as HTMLElement;
      const link = target.closest('#mainmenu > li > a');
      if (!link) return;

      const li = link.parentElement;
      if (!li) return;

      const submenu = li.querySelector(':scope > ul');
      if (!submenu) return;

      e.preventDefault();
      e.stopPropagation();
      li.classList.toggle('mobile-expanded');
    };

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);

  return <Header className={headerClass} useHeaderInner={useHeaderInner} />;
}
