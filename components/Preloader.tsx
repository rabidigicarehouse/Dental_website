'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

export default function Preloader() {
  const pathname = usePathname();
  const [show, setShow] = useState(true);

  useEffect(() => {
    // Show preloader on route change
    setShow(true);
    const loader = document.getElementById('de-loader');
    if (loader) loader.style.display = 'flex';

    const hidePreloader = () => {
      if (loader) loader.style.display = 'none';
      setShow(false);
    };

    // Keep the transition cue brief so it never delays usable content.
    const timeout = setTimeout(hidePreloader, 180);

    return () => clearTimeout(timeout);
  }, [pathname]);

  return <div id="de-loader"></div>;
}
