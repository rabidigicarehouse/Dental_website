'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

const EVENT_IMAGES = [
  {
    src: '/images/events/image (3).png',
    alt: 'Dr. Sharda Harvey at the Royal Versailles Ball 2026',
    mobilePosition: 'center 68%',
  },
  {
    src: '/images/events/image (4).png',
    alt: 'Dr. Sharda Harvey at the Royal Versailles Ball portrait setting',
    mobilePosition: 'center top',
  },
  {
    src: '/images/events/image (5).png',
    alt: 'Dr. Sharda Harvey at the Royal Versailles Ball event wall',
    mobilePosition: 'center 62%',
  },
];

export default function EventImageCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % EVENT_IMAGES.length);
    }, 3000);

    return () => window.clearInterval(timer);
  }, []);

  return (
    <>
      <div className="story-event-collage story-event-collage--desktop">
        <div className="story-event-collage__hero">
          <Image src={EVENT_IMAGES[0].src} alt={EVENT_IMAGES[0].alt} width={1200} height={800} sizes="26vw" />
        </div>
        <div className="story-event-collage__side">
          {EVENT_IMAGES.slice(1).map((image) => (
            <div className="story-event-collage__tile" key={image.src}>
              <Image src={image.src} alt={image.alt} width={1200} height={800} sizes="18vw" />
            </div>
          ))}
        </div>
      </div>

      <div className="story-event-mobile-slider" aria-roledescription="carousel">
        <div className="story-event-mobile-viewport">
          {EVENT_IMAGES.map((image, index) => (
            <div
              className={`story-event-mobile-slide${index === activeIndex ? ' is-active' : ''}`}
              aria-hidden={index !== activeIndex}
              key={image.src}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes="(max-width: 992px) calc(100vw - 72px), 1px"
                style={{ objectPosition: image.mobilePosition }}
              />
            </div>
          ))}
        </div>
        <div className="story-event-mobile-dots" aria-label="Event images">
          {EVENT_IMAGES.map((image, index) => (
            <button
              type="button"
              className={index === activeIndex ? 'is-active' : ''}
              onClick={() => setActiveIndex(index)}
              aria-label={`Show event image ${index + 1}`}
              aria-current={index === activeIndex}
              key={image.src}
            />
          ))}
        </div>
      </div>
    </>
  );
}
