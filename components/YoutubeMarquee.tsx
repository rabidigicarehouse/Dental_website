'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function YoutubeMarquee() {
  const channelUrl = 'https://www.youtube.com/@askadentistaskdr.harvey7701';

  // Standard scrolling sequence items
  const marqueeContent = (
    <div className="marquee-content-group">
      {/* Item 1: Avatar + Name only — no YouTube icon between photo and text */}
      <div className="marquee-item-bubble marquee-doctor-group">
        <div className="avatar-wrapper">
          <Image
            src="/Dr harvey2.webp"
            alt="AI Avatar"
            width={26}
            height={26}
            sizes="26px"
            className="avatar-img"
          />
        </div>
        <span className="marquee-text font-bold">Dr. Sharda Harvey, DDS</span>
      </div>

      {/* Item 2: Channel Name (Ask a Dentist) — separator only after this, not after doctor photo/name */}
      <div className="marquee-item-bubble">
        <span className="marquee-text-channel">Ask a Dentist</span>
      </div>

      {/* YouTube Logo Separator */}
      <div className="marquee-separator" aria-hidden="true">
        <Image src="/social icons/youtube.png" alt="" width={22} height={22} />
      </div>

      {/* Item 3: Channel Handle */}
      <div className="marquee-item-bubble">
        <span className="marquee-text font-medium opacity-90">@askadentistaskdr.harvey7701</span>
      </div>

      {/* YouTube Logo Separator */}
      <div className="marquee-separator" aria-hidden="true">
        <Image src="/social icons/youtube.png" alt="" width={22} height={22} />
      </div>

      {/* Item 4: Subscribe CTA Badge */}
      <div className="marquee-item-bubble highlight">
        <span className="subscribe-badge">SUBSCRIBE</span>
        <span className="marquee-text font-bold">For Weekly Oral Health Tips</span>
      </div>

      {/* YouTube Logo Separator */}
      <div className="marquee-separator" aria-hidden="true">
        <Image src="/social icons/youtube.png" alt="" width={22} height={22} />
      </div>
    </div>
  );

  return (
    <Link href={channelUrl} target="_blank" rel="noopener noreferrer" className="youtube-marquee-banner-link">
      <div className="youtube-marquee-banner">
        <div className="marquee-track">
          {marqueeContent}
          {marqueeContent}
          {marqueeContent}
          {marqueeContent}
        </div>
      </div>
    </Link>
  );
}
