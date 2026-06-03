'use client';

import React, { useState, useEffect, ReactNode } from 'react';
import { motion, PanInfo } from 'framer-motion';

interface StackedSectionSliderProps {
  children: ReactNode;
  labels: string[]; // tab/dot labels per card
  hideTabs?: boolean;
  hideBackgroundCards?: boolean;
}

export default function StackedSectionSlider({ 
  children, 
  labels,
  hideTabs = false,
  hideBackgroundCards = false
}: StackedSectionSliderProps) {
  const cards = React.Children.toArray(children);
  const count = cards.length;
  const [activeIdx, setActiveIdx] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [isInteracting, setIsInteracting] = useState(false);

  // Detect mobile viewport
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1024);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Handle automatic swapping
  useEffect(() => {
    if (count <= 1) return;
    if (isInteracting) return;
    
    const timer = setInterval(() => {
      moveToNext();
    }, 5000);

    return () => clearInterval(timer);
  }, [activeIdx, count, isInteracting]);

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

  if (hideBackgroundCards) {
    return (
      <div className="stacked-slider stacked-slider--sticky">
        <div className="stacked-story-stack">
          {cards.map((card, idx) => (
            <section key={idx} className="stacked-story-sticky-card">
              <div className="stacked-card is-active stacked-card--sticky">
                <div className="stacked-card-inner">
                  {card}
                </div>
              </div>
            </section>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="stacked-slider">
      {/* Tabs */}
      {!hideTabs && (
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
      )}

      <div
        className="stacked-stage"
        style={{ paddingTop: hideTabs ? '0px' : (isMobile ? '28px' : '54px') }}
        onMouseEnter={() => setIsInteracting(true)}
        onMouseLeave={() => setIsInteracting(false)}
      >
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

            const opacity = isActive ? 1 : (hideBackgroundCards || isMobile ? 0 : 0.42);
            const zIndex = 10 - Math.abs(relativeOffset);

            if (isMobile && !isActive) {
              return null;
            }

            return (
              <motion.div
                key={idx}
                className={`stacked-card${isActive ? ' is-active' : ''}${isMobile ? ' stacked-card--mobile' : ''}`}
                drag={isMobile || hideBackgroundCards ? false : "x"}
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.14}
                onDragStart={() => {
                  if (!isActive && !hideBackgroundCards) {
                    goTo(idx);
                  }
                }}
                onDragEnd={(_, info) => {
                  if (!hideBackgroundCards) {
                    handleDragEnd(idx, info);
                  }
                }}
                initial={false}
                animate={{
                  x: isMobile || hideBackgroundCards ? 0 : xOffset,
                  y: isMobile || hideBackgroundCards ? 0 : yOffset,
                  scale: isMobile ? 1 : scale,
                  rotate: isMobile || hideBackgroundCards ? 0 : rotate,
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
                  pointerEvents: isActive ? 'auto' : (hideBackgroundCards || isMobile ? 'none' : 'auto'),
                  position: isMobile ? 'relative' : 'absolute',
                  inset: isMobile ? undefined : 0,
                  width: isMobile ? '100%' : undefined,
                  transformOrigin: 'center center' 
                }}
                onClick={() => {
                  if (!isActive && !hideBackgroundCards) {
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
