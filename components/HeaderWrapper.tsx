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
  let headerClass = "scroll-light smaller uedi-subpage-header";

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

  /* on3step.js removes `.smaller` at scrollY === 0; keep it always so the
     navbar stays white-bg + dark links (same as subpages) at every scroll position. */
  useEffect(() => {
    const header = document.querySelector('header.uedi-subpage-header');
    if (!header) return;

    const lockSubpageHeader = () => {
      if (!header.classList.contains('smaller')) {
        header.classList.add('smaller');
      }
    };

    lockSubpageHeader();

    const observer = new MutationObserver(lockSubpageHeader);
    observer.observe(header, { attributes: true, attributeFilter: ['class'] });

    window.addEventListener('scroll', lockSubpageHeader, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', lockSubpageHeader);
    };
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

  /* Close mega menu instantly on route change (e.g. clicking a service link). */
  useEffect(() => {
    document.querySelectorAll('#mainmenu > li.mega-open').forEach((el) => {
      el.classList.remove('mega-open');
    });
  }, [pathname]);

  /* Desktop mega menu — .mega-open only (no CSS :hover ghost after navigation). */
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const clearMegaOpen = () => {
      document.querySelectorAll('#mainmenu > li.mega-open').forEach((el) => {
        el.classList.remove('mega-open');
      });
    };

    const isInsideMegaZone = (li: HTMLElement, mega: HTMLElement, node: Node | null) => {
      if (!node) return false;
      return li.contains(node) || mega.contains(node);
    };

    const bind = () => {
      if (window.innerWidth <= 1024) {
        clearMegaOpen();
        return () => undefined;
      }

      const items = Array.from(
        document.querySelectorAll<HTMLElement>('#mainmenu > li')
      ).filter((li) => li.querySelector(':scope > ul.mega') !== null);

      const cleanups: (() => void)[] = [];

      items.forEach((li) => {
        const mega = li.querySelector<HTMLElement>(':scope > ul.mega');
        if (!mega) return;

        const show = () => {
          li.classList.add('mega-open');
        };

        const hideNow = () => {
          li.classList.remove('mega-open');
        };

        const onLiLeave = (e: MouseEvent) => {
          if (isInsideMegaZone(li, mega, e.relatedTarget as Node | null)) return;
          hideNow();
        };

        const onMegaLeave = (e: MouseEvent) => {
          if (isInsideMegaZone(li, mega, e.relatedTarget as Node | null)) return;
          hideNow();
        };

        li.addEventListener('mouseenter', show);
        li.addEventListener('mouseleave', onLiLeave);
        mega.addEventListener('mouseenter', show);
        mega.addEventListener('mouseleave', onMegaLeave);

        mega.querySelectorAll('a').forEach((anchor) => {
          anchor.addEventListener('click', hideNow);
        });

        cleanups.push(() => {
          li.removeEventListener('mouseenter', show);
          li.removeEventListener('mouseleave', onLiLeave);
          mega.removeEventListener('mouseenter', show);
          mega.removeEventListener('mouseleave', onMegaLeave);
          mega.querySelectorAll('a').forEach((anchor) => {
            anchor.removeEventListener('click', hideNow);
          });
          li.classList.remove('mega-open');
        });
      });

      const onDocumentClick = (e: MouseEvent) => {
        const target = e.target as Node | null;
        const inside = items.some((li) => {
          const mega = li.querySelector<HTMLElement>(':scope > ul.mega');
          return mega && isInsideMegaZone(li, mega, target);
        });
        if (!inside) clearMegaOpen();
      };

      document.addEventListener('click', onDocumentClick, true);

      return () => {
        cleanups.forEach((fn) => fn());
        document.removeEventListener('click', onDocumentClick, true);
      };
    };

    clearMegaOpen();

    let cleanup = bind();
    const rebindTimer = window.setTimeout(() => {
      cleanup?.();
      cleanup = bind();
    }, 1100);

    const onResize = () => {
      cleanup?.();
      cleanup = bind();
    };
    window.addEventListener('resize', onResize);

    return () => {
      window.clearTimeout(rebindTimer);
      window.removeEventListener('resize', onResize);
      cleanup?.();
      clearMegaOpen();
    };
  }, [pathname]);

  return <Header className={headerClass} useHeaderInner={useHeaderInner} />;
}

