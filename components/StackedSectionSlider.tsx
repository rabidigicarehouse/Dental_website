'use client';

import { useState, useMemo, ReactNode } from 'react';
import { motion, AnimatePresence, PanInfo } from 'framer-motion';

interface StackedSectionSliderProps {
  children: ReactNode[];
  labels: string[]; // tab/dot labels per card
}

/**
 * Stacked horizontal card slider (like GSAP's stacked deck effect):
 * - The active card is fully visible in front
 * - The other cards are visible behind it, dimmer, slightly offset to the side
 * - User can drag the front card to either side OR tap a label to swap to that card
 */
export default function StackedSectionSlider({ children, labels }: StackedSectionSliderProps) {
  const cards = useMemo(() => (Array.isArray(children) ? children : [children]), [children]);
  const count = cards.length;
  const [activeIdx, setActiveIdx] = useState(0);
  const [dragDir, setDragDir] = useState<1 | -1>(1);

  const goTo = (idx: number) => {
    const normalized = ((idx % count) + count) % count;
    setDragDir(idx > activeIdx ? 1 : -1);
    setActiveIdx(normalized);
  };

  const next = () => goTo(activeIdx + 1);
  const prev = () => goTo(activeIdx - 1);

  const onDragEnd = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const threshold = 80;
    if (info.offset.x < -threshold || info.velocity.x < -400) next();
    else if (info.offset.x > threshold || info.velocity.x > 400) prev();
  };

  // Compute relative position for each card around the active one
  const positionOf = (idx: number) => {
    const diff = idx - activeIdx;
    // wrap into shortest distance
    const wrapped = ((diff % count) + count) % count;
    const half = Math.floor(count / 2);
    if (wrapped > half) return wrapped - count;
    return wrapped;
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
        <button
          className="stacked-nav stacked-nav-prev"
          onClick={prev}
          aria-label="Previous"
          type="button"
        >
          ‹
        </button>

        <div className="stacked-cards-wrap">
          {cards.map((card, idx) => {
            const pos = positionOf(idx);
            const isActive = pos === 0;
            const absPos = Math.abs(pos);

            // Dramatic "newspaper-stack" offsets for back cards
            const xOffset = pos * 110;
            const yOffset = absPos * 22;
            const scale = isActive ? 1 : 1 - absPos * 0.08;
            const rotate = pos * 10; // strong tilt like papers fanned out
            const opacity = isActive ? 1 : Math.max(0.5 - absPos * 0.1, 0.28);
            const zIndex = count - absPos;

            return (
              <motion.div
                key={idx}
                className={`stacked-card${isActive ? ' is-active' : ''}`}
                drag={isActive ? 'x' : false}
                dragElastic={0.15}
                dragConstraints={{ left: 0, right: 0 }}
                onDragEnd={onDragEnd}
                animate={{
                  x: xOffset,
                  y: yOffset,
                  scale,
                  rotate,
                  opacity,
                  zIndex,
                }}
                transition={{ type: 'spring', stiffness: 220, damping: 28 }}
                style={{ zIndex }}
              >
                <div className="stacked-card-inner">
                  {card}
                </div>
              </motion.div>
            );
          })}
        </div>

        <button
          className="stacked-nav stacked-nav-next"
          onClick={next}
          aria-label="Next"
          type="button"
        >
          ›
        </button>
      </div>
    </div>
  );
}
