'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import ImageCompare from 'image-compare-viewer';
import 'image-compare-viewer/dist/image-compare-viewer.min.css';
import { motion, AnimatePresence } from 'framer-motion';

interface BeforeAfterCase {
  title: string;
  before: string;
  after: string;
}

const cases: BeforeAfterCase[] = [
  {
    title: "Case 01 Smile Transformation",
    before: "/before and after/before1.png",
    after: "/before and after/after1.png",
  },
  {
    title: "Case 02 Smile Transformation",
    before: "/before and after/before2.png",
    after: "/before and after/after2.png",
  },
  {
    title: "Case 03 Smile Transformation",
    before: "/before and after/before3.png",
    after: "/before and after/after3.png",
  },
  {
    title: "Britt Smile Transformation",
    before: "/before and after/britt before V.png",
    after: "/before and after/britt after  V.JPG",
  },
  {
    title: "Eikerson Smile Transformation",
    before: "/before and after/Eikerson before 2 V.png",
    after: "/before and after/Eikerson after2 V.jpg",
  },
  {
    title: "Glenys Smile Transformation",
    before: "/before and after/Glenys before V.JPG",
    after: "/before and after/Glenys after V.png",
  },
  {
    title: "Janet Smile Transformation",
    before: "/before and after/Janet Before V.JPG",
    after: "/before and after/Janet after V.JPG",
  },
  {
    title: "Kristina Smile Transformation",
    before: "/before and after/kristina before2 V.png",
    after: "/before and after/Kristina after2 V.png",
  },
  {
    title: "Natalia Smile Transformation",
    before: "/before and after/natalia before V.JPG",
    after: "/before and after/natalia after V.png",
  },
  {
    title: "Souad Amghar Smile Transformation",
    before: "/before and after/Souad Amghar before V.png",
    after: "/before and after/Souad Amghar after V.png",
  },
  {
    title: "Velmer Smile Transformation",
    before: "/before and after/Velmer before V.png",
    after: "/before and after/Velmer after V.png",
  }
];

// ─── Easing helper ───────────────────────────────────────────────────────────
const easeInOut = (t: number) => 0.5 - Math.cos(t * Math.PI) / 2;

export default function TeethCompareSlider() {
  const [currentIdx, setCurrentIdx]           = useState(0);
  const [direction, setDirection]             = useState(0);
  const [animationCompleted, setAnimationCompleted] = useState(true);

  const containerRef      = useRef<HTMLDivElement>(null);
  const rafRef            = useRef<number | null>(null);
  const pauseTimerRef     = useRef<ReturnType<typeof setTimeout> | null>(null);
  const resumeTimerRef    = useRef<ReturnType<typeof setTimeout> | null>(null);
  const userPausedRef     = useRef(false);
  const positionRef       = useRef(50); // current slider position 0-100

  // ─── Cancel all pending animation/timers ─────────────────────────────────
  const cancelAll = useCallback(() => {
    if (rafRef.current !== null)      { cancelAnimationFrame(rafRef.current); rafRef.current = null; }
    if (pauseTimerRef.current !== null)  { clearTimeout(pauseTimerRef.current);  pauseTimerRef.current = null; }
    if (resumeTimerRef.current !== null) { clearTimeout(resumeTimerRef.current); resumeTimerRef.current = null; }
  }, []);

  // ─── Low-level: write position into the DOM ──────────────────────────────
  const applyPosition = useCallback((host: HTMLDivElement, pct: number) => {
    const clamped  = Math.max(0, Math.min(100, pct));
    const control  = host.querySelector<HTMLElement>('.icv__control');
    const wrapper  = host.querySelector<HTMLElement>('.icv__wrapper');
    if (!control || !wrapper) return;
    const hw = control.offsetWidth || 56;
    control.style.left    = `calc(${clamped}% - ${hw / 2}px)`;
    wrapper.style.width   = `calc(${100 - clamped}%)`;
    positionRef.current   = clamped;
  }, []);

  // ─── Animate from `from` → `to` over `duration` ms, then call `done` ────
  const animateTo = useCallback(
    (host: HTMLDivElement, from: number, to: number, duration: number, done: () => void) => {
      const startTime = performance.now();

      const step = (now: number) => {
        if (userPausedRef.current) return; // user took over — stop silently

        const elapsed  = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased    = easeInOut(progress);
        applyPosition(host, from + (to - from) * eased);

        if (progress < 1) {
          rafRef.current = requestAnimationFrame(step);
        } else {
          rafRef.current = null;
          done();
        }
      };

      rafRef.current = requestAnimationFrame(step);
    },
    [applyPosition]
  );

  // ─── Full sweep sequence for one slide ───────────────────────────────────
  //   center(50) → left(0) → right(100) → center(50) → [advance slide]
  const runSweepSequence = useCallback(
    (host: HTMLDivElement) => {
      if (userPausedRef.current) return;

      const FULL_DURATION   = 3000; // ms for a full 0→100 sweep
      const PAUSE_AT_ENDS   = 400;  // brief hold at each edge
      const PAUSE_AT_CENTER = 1200; // hold at center before slide change

      const distToLeft  = positionRef.current / 100;        // 0→1
      const durToLeft   = FULL_DURATION * distToLeft;

      // Phase 1 – sweep to left edge
      animateTo(host, positionRef.current, 0, durToLeft, () => {
        if (userPausedRef.current) return;

        // tiny pause at left edge
        pauseTimerRef.current = setTimeout(() => {
          if (userPausedRef.current) return;

          // Phase 2 – sweep all the way to right edge
          animateTo(host, 0, 100, FULL_DURATION, () => {
            if (userPausedRef.current) return;

            // tiny pause at right edge
            pauseTimerRef.current = setTimeout(() => {
              if (userPausedRef.current) return;

              // Phase 3 – sweep back to center
              animateTo(host, 100, 50, FULL_DURATION * 0.5, () => {
                if (userPausedRef.current) return;

                // hold at center, then advance slide
                pauseTimerRef.current = setTimeout(() => {
                  if (userPausedRef.current) return;
                  setAnimationCompleted(false);
                  setDirection(1);
                  setCurrentIdx(prev => (prev + 1) % cases.length);
                }, PAUSE_AT_CENTER);
              });
            }, PAUSE_AT_ENDS);
          });
        }, PAUSE_AT_ENDS);
      });
    },
    [animateTo]
  );

  // ─── Mount / remount image-compare-viewer when slide settles ─────────────
  useEffect(() => {
    if (!animationCompleted || !containerRef.current) return;

    const host = containerRef.current;
    cancelAll();
    userPausedRef.current = false;

    let viewer: any = null;
    let cleanedUp   = false;

    try {
      viewer = new ImageCompare(host, {
        controlColor:   '#165369',
        controlShadow:  false,
        addLabels:      true,
        labelBefore:    'Before',
        labelAfter:     'After',
        showLabels:     true,
        smoothing:      true,
        smoothingAmount: 80,
        hoverStart:     false,
        verticalMode:   false,
        startingPoint:  50,
      }).mount();
    } catch (err) {
      console.error('ImageCompare mount failed', err);
      return;
    }

    // Accessibility attributes
    const viewerRoot = host.querySelector<HTMLElement>('.icv');
    if (viewerRoot) {
      viewerRoot.classList.add('teeth-compare-icv');
      viewerRoot.setAttribute('tabindex', '0');
      viewerRoot.setAttribute(
        'aria-label',
        `${cases[currentIdx].title} before and after comparison slider`
      );
    }

    // Wait for the DOM to be fully laid-out before starting animation
    const startDelay = setTimeout(() => {
      if (cleanedUp) return;

      const control = host.querySelector<HTMLElement>('.icv__control');
      if (!control) return;

      positionRef.current = 50;

      // ── Pointer events: pause on drag, resume after ──
      const onPointerDown = () => {
        userPausedRef.current = true;
        cancelAll();
      };

      const onPointerUp = () => {
        // Read current visual position from DOM after user dragged
        const ctrl = host.querySelector<HTMLElement>('.icv__control');
        if (ctrl) {
          const hostW  = host.offsetWidth || 1;
          const ctrlW  = ctrl.offsetWidth  || 56;
          const ctrlL  = parseFloat(ctrl.style.left || '0') + ctrlW / 2;
          positionRef.current = Math.max(0, Math.min(100, (ctrlL / hostW) * 100));
        }

        userPausedRef.current = false;
        // Short delay so the user feels in control before auto resumes
        resumeTimerRef.current = setTimeout(() => {
          if (!cleanedUp && !userPausedRef.current) runSweepSequence(host);
        }, 1200);
      };

      control.addEventListener('pointerdown', onPointerDown);
      window.addEventListener('pointerup',    onPointerUp);
      window.addEventListener('touchend',     onPointerUp);

      // Kick off the first sweep
      runSweepSequence(host);

      // Store cleanup on the host element
      (host as any)._compareCleanup = () => {
        control.removeEventListener('pointerdown', onPointerDown);
        window.removeEventListener('pointerup',    onPointerUp);
        window.removeEventListener('touchend',     onPointerUp);
      };
    }, 80); // 80 ms is enough for the viewer to finish painting

    return () => {
      cleanedUp = true;
      clearTimeout(startDelay);
      cancelAll();
      if ((host as any)._compareCleanup) {
        (host as any)._compareCleanup();
        delete (host as any)._compareCleanup;
      }
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentIdx, animationCompleted]);

  // ─── Slide transition variants ────────────────────────────────────────────
  const slideVariants = {
    enter:  (dir: number) => ({ x: dir > 0 ?  300 : -300, opacity: 0 }),
    center:                  ({ x: 0,                       opacity: 1 }),
    exit:   (dir: number) => ({ x: dir < 0 ?  300 : -300, opacity: 0 }),
  };

  const goTo = (idx: number) => {
    if (idx === currentIdx) return;
    cancelAll();
    userPausedRef.current = false;
    setAnimationCompleted(false);
    setDirection(idx > currentIdx ? 1 : -1);
    setCurrentIdx(idx);
  };

  const handleNext = () => goTo((currentIdx + 1) % cases.length);
  const handlePrev = () => goTo((currentIdx - 1 + cases.length) % cases.length);

  return (
    <div className="teeth-compare-carousel">
      {/* Main Slider Window */}
      <div className="teeth-compare-window">
        <div className="teeth-compare-slider-container">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={currentIdx}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              onAnimationComplete={() => setAnimationCompleted(true)}
              transition={{ duration: 0.4, ease: 'easeInOut' }}
              className="teeth-compare-slide"
            >
              <div ref={containerRef} className="image-compare-viewer-container">
                <img src={cases[currentIdx].before} alt="Before Treatment" />
                <img src={cases[currentIdx].after}  alt="After Treatment"  />
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Dots Indicator */}
      <div className="teeth-compare-dots">
        {cases.map((_, idx) => (
          <button
            key={idx}
            className={`teeth-compare-dot${idx === currentIdx ? ' active' : ''}`}
            onClick={() => goTo(idx)}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
}