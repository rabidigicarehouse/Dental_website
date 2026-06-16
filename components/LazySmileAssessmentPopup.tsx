'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

const SmileAssessmentPopup = dynamic(() => import('@/components/SmileAssessmentPopup'), {
  ssr: false,
});

export default function LazySmileAssessmentPopup() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => setEnabled(true), 2500);
    return () => window.clearTimeout(timer);
  }, []);

  return enabled ? <SmileAssessmentPopup /> : null;
}
