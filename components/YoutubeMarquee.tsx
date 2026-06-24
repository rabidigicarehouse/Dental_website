'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function YoutubeMarquee() {
  const channelUrl = 'https://www.youtube.com/@askadentistaskdr.harvey7701';

  const marqueeContent = (
    <div className="marquee-content-group">
      <div className="marquee-item-bubble marquee-doctor-group">
        <span className="marquee-yt-dot" aria-hidden="true">
          <Image src="/social icons/youtube.png" alt="" width={22} height={22} />
        </span>
        <span className="marquee-text font-bold">Dr. Sharda Harvey - General Cosmetic and Implant Dentist</span>
      </div>

      <div className="marquee-item-bubble">
        <span className="marquee-text-channel">Ask a Dentist</span>
      </div>

      <div className="marquee-separator" aria-hidden="true">
        <Image src="/social icons/youtube.png" alt="" width={22} height={22} />
      </div>

      <div className="marquee-item-bubble">
        <span className="marquee-text font-medium opacity-90">@askadentistaskdr.harvey7701</span>
      </div>

      <div className="marquee-separator" aria-hidden="true">
        <Image src="/social icons/youtube.png" alt="" width={22} height={22} />
      </div>

      <div className="marquee-item-bubble highlight">
        <span className="subscribe-badge">SUBSCRIBE</span>
        <span className="marquee-text font-bold">For Weekly Oral Health Tips</span>
      </div>

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
