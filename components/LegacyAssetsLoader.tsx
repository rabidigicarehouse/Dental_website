'use client';

import { useEffect } from 'react';

const DEFERRED_STYLES = [
  '/css/plugins.css',
  '/css/swiper.css',
  '/fonts/fontawesome4/css/font-awesome.css',
  '/fonts/fontawesome6/css/fontawesome.css',
  '/fonts/fontawesome6/css/brands.css',
  '/fonts/fontawesome6/css/solid.css',
  '/fonts/elegant_font/HTML_CSS/style.css',
  '/fonts/et-line-font/style.css',
  '/fonts/icofont/icofont.min.css',
];

const LEGACY_SCRIPTS = [
  '/js/plugins.js',
  '/js/on3step.js',
  '/js/swiper.js',
  '/js/custom-marquee.js',
];

function runWhenIdle(callback: () => void) {
  const idleWindow = window as Window & {
    requestIdleCallback?: (handler: () => void, options?: { timeout: number }) => number;
    cancelIdleCallback?: (id: number) => void;
  };

  if (idleWindow.requestIdleCallback && idleWindow.cancelIdleCallback) {
    const id = idleWindow.requestIdleCallback(callback, { timeout: 2200 });
    return () => idleWindow.cancelIdleCallback?.(id);
  }

  const id = window.setTimeout(callback, 700);
  return () => window.clearTimeout(id);
}

function loadStylesheet(href: string) {
  if (document.querySelector(`link[data-deferred-style="${href}"]`)) return;
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = href;
  link.dataset.deferredStyle = href;
  document.head.appendChild(link);
}

function loadScript(src: string) {
  return new Promise<void>((resolve) => {
    if (document.querySelector(`script[data-legacy-script="${src}"]`)) {
      resolve();
      return;
    }

    const script = document.createElement('script');
    script.src = src;
    script.async = false;
    script.defer = true;
    script.dataset.legacyScript = src;
    script.onload = () => resolve();
    script.onerror = () => resolve();
    document.body.appendChild(script);
  });
}

export default function LegacyAssetsLoader() {
  useEffect(() => {
    let cancelled = false;
    const cancelIdle = runWhenIdle(async () => {
      DEFERRED_STYLES.forEach(loadStylesheet);

      for (const src of LEGACY_SCRIPTS) {
        if (cancelled) return;
        await loadScript(src);
      }

      window.dispatchEvent(new Event('uedi:legacy-assets-ready'));
    });

    return () => {
      cancelled = true;
      cancelIdle();
    };
  }, []);

  return null;
}
