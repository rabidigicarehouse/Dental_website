'use client';

import React, { useState, useEffect, ReactNode } from 'react';
import { motion, PanInfo } from 'framer-motion';

interface StackedSectionSliderProps {
  children: ReactNode;
  labels: string[]; // tab/dot labels per card
}

export default function StackedSectionSlider({ children, labels }: StackedSectionSliderProps) {
  const cards = React.Children.toArray(children);
  const count = cards.length;
  const [activeIdx, setActiveIdx] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile viewport
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 992);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Handle automatic swapping
  useEffect(() => {
    if (count <= 1) return;
    
    const timer = setInterval(() => {
      moveToNext();
    }, 5000);

    return () => clearInterval(timer);
  }, [activeIdx, count]);

  const goTo = (idx: number) => {
    setActiveIdx(idx);
  };

  const moveToNext = () => {
    setActiveIdx((prev) => (prev + 1) % count);
  };

  const moveToPrev = () => {
    setActiveIdx((prev) => (prev - 1 + count) % count);
  };

  // Fluid drag-to-swap handler
  const handleDragEnd = (idx: number, { offset, velocity }: PanInfo) => {
    if (idx !== activeIdx) {
      goTo(idx);
      return;
    }

    const swipe = offset.x;
    const threshold = 80;
    const velocityThreshold = 400;

    // Dragged left -> Next
    if (swipe < -threshold || velocity.x < -velocityThreshold) {
      moveToNext();
    } 
    // Dragged right -> Prev
    else if (swipe > threshold || velocity.x > velocityThreshold) {
      moveToPrev();
    }
  };

  const getRelativeOffset = (idx: number, active: number, total: number) => {
    let diff = idx - active;
    if (diff > Math.floor(total / 2)) diff -= total;
    if (diff < -Math.floor(total / 2)) diff += total;
    return diff;
  };

  return (
    <div className="stacked-slider">
      {/* Tabs */}
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

      <div className="stacked-stage" style={{ paddingTop: isMobile ? '28px' : '54px' }}>
        <div className="stacked-cards-wrap">
          {cards.map((card, idx) => {
            const isActive = idx === activeIdx;
            const relativeOffset = getRelativeOffset(idx, activeIdx, count);
            
            const spreadX = isMobile ? 26 : 58;
            const spreadY = isMobile ? -18 : -30;
            const angle = isMobile ? 4 : 7;

            const xOffset = isActive ? 0 : relativeOffset * spreadX;
            const yOffset = isActive ? 0 : spreadY;
            const scale = isActive ? 1 : 0.94;
            const rotate = isActive ? 0 : relativeOffset * angle;

            const opacity = isActive ? 1 : 0.42;
            const zIndex = 10 - Math.abs(relativeOffset);

            return (
              <motion.div
                key={idx}
                className={`stacked-card${isActive ? ' is-active' : ''}`}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.14}
                onDragStart={() => {
                  if (!isActive) {
                    goTo(idx);
                  }
                }}
                onDragEnd={(_, info) => handleDragEnd(idx, info)}
                initial={false}
                animate={{
                  x: xOffset,
                  y: yOffset,
                  scale,
                  rotate,
                  opacity,
                  zIndex,
                }}
                transition={{
                  type: 'spring',
                  stiffness: 240,
                  damping: 24,
                  mass: 0.9
                }}
                style={{ 
                  zIndex,
                  pointerEvents: 'auto',
                  position: 'absolute',
                  inset: 0,
                  transformOrigin: 'center center' 
                }}
                onClick={() => {
                  if (!isActive) {
                    goTo(idx);
                  }
                }}
              >
                <div className="stacked-card-inner">
                  {card}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

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
