'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

type OfficeTourImage = {
  src: string;
  alt: string;
};

type OfficeTourGalleryProps = {
  images: OfficeTourImage[];
};

export default function OfficeTourGallery({ images }: OfficeTourGalleryProps) {
  const [activeImage, setActiveImage] = useState<OfficeTourImage | null>(null);

  useEffect(() => {
    if (!activeImage) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setActiveImage(null);
      }
    };

    document.body.classList.add('office-preview-open');
    window.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.classList.remove('office-preview-open');
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [activeImage]);

  return (
    <>
      <div className="row g-4">
        {images.map((img, i) => (
          <div
            className={`${i < 2 ? 'col-lg-6' : 'col-lg-4'} col-md-6 col-12`}
            key={img.src}
          >
            <button
              type="button"
              className="office-tour-card rounded-1 overflow-hidden wow fadeInUp"
              data-wow-delay={`${(i % 4) * 0.1}s`}
              onClick={() => setActiveImage(img)}
              aria-label={`Preview ${img.alt}`}
            >
              <Image
                src={img.src}
                alt={img.alt}
                className="office-tour-img"
                width={1200}
                height={800}
                sizes="(max-width: 767px) 100vw, (max-width: 991px) 50vw, 33vw"
              />
              <span className="office-tour-overlay" aria-hidden="true">
                <span className="office-tour-label">{img.alt}</span>
              </span>
            </button>
          </div>
        ))}
      </div>

      {activeImage && (
        <div
          className="office-preview-modal"
          role="dialog"
          aria-modal="true"
          aria-label={activeImage.alt}
          onClick={() => setActiveImage(null)}
        >
          <div className="office-preview-dialog" onClick={(event) => event.stopPropagation()}>
            <button
              type="button"
              className="office-preview-close"
              aria-label="Close image preview"
              onClick={() => setActiveImage(null)}
            >
              x
            </button>
            <Image
              src={activeImage.src}
              alt={activeImage.alt}
              className="office-preview-img"
              width={1400}
              height={950}
              sizes="(max-width: 767px) 92vw, 80vw"
            />
            <div className="office-preview-caption">{activeImage.alt}</div>
          </div>
        </div>
      )}
    </>
  );
}
