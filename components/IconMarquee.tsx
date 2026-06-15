'use client';

import Image from 'next/image';
import React from 'react';

interface IconItem {
  icon: string;
  label: string;
}

export default function IconMarquee() {
  const items: IconItem[] = [
    { icon: 'tooth-1.png', label: 'Artistry' },
    { icon: 'tooth-2.png', label: 'Beauty' },
    { icon: 'tooth-3.png', label: 'Technology' },
    { icon: 'tooth-4.png', label: 'Craftsmanship' },
    { icon: 'tooth-5.png', label: 'Precision' },
    { icon: 'tooth-6.png', label: 'Wellness' },
    { icon: 'tooth-7.png', label: 'Care' }
  ];

  // Render a single scrolling group of items
  const marqueeGroup = (
    <div className="icon-marquee-group">
      {items.map((item, idx) => (
        <div className="icon-marquee-item" key={idx}>
          <div className="icon-circle">
            <Image
              src={`/images/icons/${item.icon}`} 
              alt={item.label} 
              className="marquee-icon-img" width={160} height={160} sizes="100px" />
          </div>
          <span className="icon-label">{item.label}</span>
        </div>
      ))}
    </div>
  );

  return (
    <section className="icon-marquee-section">
      <div className="icon-marquee-container">
        <div className="icon-marquee-track">
          {marqueeGroup}
          {marqueeGroup}
          {marqueeGroup}
          {marqueeGroup}
        </div>
      </div>
    </section>
  );
}
