'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import Header from './Header';

export default function HeaderWrapper() {
  const pathname = usePathname();

  let useHeaderInner = false;
  const isHomepage = pathname === '/' || pathname.startsWith('/homepage-');

  /* Default: solid-white "subpage" navbar (same look on every page,
     including the main homepage). Variant homepage demos keep their
     own transparent treatment. */
  let headerClass = "transparent scroll-light smaller uedi-subpage-header";

  if (pathname === '/homepage-2') {
    headerClass = "transparent header-light";
  } else if (pathname === '/homepage-6') {
    headerClass = "transparent header-light";
  } else if (pathname === '/homepage-5') {
    headerClass = "transparent header-light nav-up";
  } else if (pathname === '/homepage-3' || pathname === '/homepage-7') {
    headerClass = "transparent header-light header-float";
    useHeaderInner = true;
  }

  /* on3step.js strips `autoshow` from header on ≤992px, so the theme's
     scroll-handler never adds `smaller` on mobile. We force `.smaller`
     unconditionally — every page (including the main homepage) uses the
     solid white "subpage" header look. */
  useEffect(() => {
    const onScroll = () => {
      const header = document.querySelector('header');
      if (!header) return;
      header.classList.add('smaller');
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [pathname, isHomepage]);

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

  /* Desktop mega menu: keep open while cursor is over the Services <li>
     OR the mega panel. Uses a 200ms close delay so the cursor can cross
     the small gap between the navbar and the mega without losing hover. */
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.innerWidth <= 1024) return;

    const bind = () => {
      const items = Array.from(
        document.querySelectorAll<HTMLElement>('#mainmenu > li')
      ).filter((li) => li.querySelector(':scope > ul.mega') !== null);

      const cleanups: (() => void)[] = [];

      items.forEach((li) => {
        const mega = li.querySelector<HTMLElement>(':scope > ul.mega');
        if (!mega) return;

        let hideTimer: number | null = null;

        const show = () => {
          if (hideTimer !== null) {
            window.clearTimeout(hideTimer);
            hideTimer = null;
          }
          li.classList.add('mega-open');
        };
        const scheduleHide = () => {
          if (hideTimer !== null) window.clearTimeout(hideTimer);
          hideTimer = window.setTimeout(() => {
            li.classList.remove('mega-open');
            hideTimer = null;
          }, 200);
        };

        li.addEventListener('mouseenter', show);
        li.addEventListener('mouseleave', scheduleHide);
        mega.addEventListener('mouseenter', show);
        mega.addEventListener('mouseleave', scheduleHide);

        cleanups.push(() => {
          if (hideTimer !== null) window.clearTimeout(hideTimer);
          li.removeEventListener('mouseenter', show);
          li.removeEventListener('mouseleave', scheduleHide);
          mega.removeEventListener('mouseenter', show);
          mega.removeEventListener('mouseleave', scheduleHide);
          li.classList.remove('mega-open');
        });
      });

      return cleanups;
    };

    /* Rebind after the theme finishes mounting the menu (on3step.js
       reshuffles the markup, which detaches our listeners). */
    let cleanups = bind();
    const rebindTimer = window.setTimeout(() => {
      cleanups.forEach((fn) => fn());
      cleanups = bind();
    }, 1100);

    return () => {
      window.clearTimeout(rebindTimer);
      cleanups.forEach((fn) => fn());
    };
  }, [pathname]);

  return <Header className={headerClass} useHeaderInner={useHeaderInner} />;
}

