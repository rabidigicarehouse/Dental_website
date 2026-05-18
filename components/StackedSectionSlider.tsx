'use client';

import React, { useState, useEffect, ReactNode } from 'react';

interface StackedSectionSliderProps {
  children: ReactNode;
  labels: string[]; // tab/dot labels per card
}

export default function StackedSectionSlider({ children, labels }: StackedSectionSliderProps) {
  // Safely convert React children to an array
  const cards = React.Children.toArray(children);
  const count = cards.length;
  const [activeIdx, setActiveIdx] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile viewport for responsive fanned deck offsets
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 992);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Handle automatic swapping every 5 seconds
  useEffect(() => {
    if (count <= 1) return; // No auto-swap if only 1 card
    
    const timer = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % count);
    }, 5000);

    return () => clearInterval(timer);
  }, [activeIdx, count]);

  const goTo = (idx: number) => {
    setActiveIdx(idx);
  };

  return (
    <div className="stacked-slider">
      {/* Tabs / labels at top */}
      <div className="stacked-tabs">
        {labels.map((label, idx) => (
          <button
            key={label}
            className={`stacked-tab${idx === activeIdx ? ' active' : ''}`}
            onClick={() => goTo(idx)}
            type="button"
          >
            {label}
          </button>
        ))}
      </div>

      <div className="stacked-stage">
        <div className="stacked-cards-wrap">
          {cards.map((card, idx) => {
            const isActive = idx === activeIdx;
            
            // Dramatic, unmissable envelope-stack calculations!
            // The back card is centered, but rotated massively so its corners stick out boldly.
            const xOffset = 0; 
            const yOffset = isActive ? 0 : (isMobile ? -25 : -35); // Shifted UP
            const scale = isActive ? 1 : 0.98; // Keeps it large enough to peek out
            
            // Apply a dramatic 12-degree tilt for desktop, 8-degree for mobile
            const tiltAngle = isMobile ? 8 : 12;
            const rotate = isActive ? 0 : (idx === 0 ? -tiltAngle : tiltAngle); 
            
            const opacity = isActive ? 1 : 0.55; 
            const zIndex = isActive ? 10 : 5;

            // Pure CSS transforms for 100% reliable, fluid rendering (zero Framer Motion bugs)
            const transform = `translate3d(${xOffset}px, ${yOffset}px, 0) scale(${scale}) rotate(${rotate}deg)`;

            return (
              <div
                key={idx}
                className={`stacked-card${isActive ? ' is-active' : ''}`}
                style={{
                  transform,
                  opacity,
                  zIndex,
                  pointerEvents: isActive ? 'auto' : 'none',
                  transition: 'all 0.65s cubic-bezier(0.25, 1, 0.15, 1)', // Smooth, premium spring-like CSS ease
                  position: 'absolute',
                  inset: 0,
                  transformOrigin: 'center center' // Rotates exactly from the middle like an envelope
                }}
              >
                <div className="stacked-card-inner">
                  {card}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Dots navigation at the bottom (replaces the arrows) */}
      <div className="stacked-dots">
        {cards.map((_, idx) => (
          <button
            key={idx}
            className={`stacked-dot${idx === activeIdx ? ' active' : ''}`}
            onClick={() => goTo(idx)}
            aria-label={`Go to slide ${idx + 1}`}
            type="button"
          />
        ))}
      </div>
    </div>
  );
}
