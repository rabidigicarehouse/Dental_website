'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

const AIWidget = dynamic(() => import('@/components/ai/AIWidget'), {
  ssr: false,
});

export default function LazyAIWidget() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const enable = () => setEnabled(true);
    const timer = window.setTimeout(enable, 1800);

    window.addEventListener('pointerdown', enable, { once: true, passive: true });
    window.addEventListener('keydown', enable, { once: true });

    return () => {
      window.clearTimeout(timer);
      window.removeEventListener('pointerdown', enable);
      window.removeEventListener('keydown', enable);
    };
  }, []);

  return enabled ? <AIWidget /> : null;
}
