'use client';

import React, { useState, useEffect, useRef } from 'react';
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

export default function TeethCompareSlider() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [direction, setDirection] = useState(0); // -1 for left, 1 for right
  const [animationCompleted, setAnimationCompleted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const activeViewerRef = useRef<any>(null);

  // Initialize/reinitialize image-compare-viewer only when animation is fully done
  useEffect(() => {
    if (!animationCompleted || !containerRef.current) return;

    // Mount image compare viewer on stable DOM element
    try {
      const host = containerRef.current;
      const viewer = new ImageCompare(host, {
        controlColor: '#4a7bd1',
        controlShadow: false, // Turn off shadows for clean minimalist shutter
        addLabels: true,
        labelBefore: 'Before',
        labelAfter: 'After',
        showLabels: true,
        smoothing: true,
        smoothingAmount: 80,
        hoverStart: false,
        verticalMode: false,
        startingPoint: 50,
      }).mount();

      activeViewerRef.current = viewer;

      const viewerRoot = host.querySelector<HTMLElement>('.icv');
      if (viewerRoot) {
        viewerRoot.classList.add('teeth-compare-icv');
        viewerRoot.setAttribute('tabindex', '0');
        viewerRoot.setAttribute('aria-label', `${cases[currentIdx].title} before and after comparison slider`);
      }
    } catch (err) {
      console.error("Failed to initialize ImageCompare:", err);
    }

    return () => {
      activeViewerRef.current = null;
    };
  }, [currentIdx, animationCompleted]);

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 300 : -300,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (dir: number) => ({
      x: dir < 0 ? 300 : -300,
      opacity: 0
    })
  };

  const handleNext = () => {
    setAnimationCompleted(false);
    setDirection(1);
    setCurrentIdx((prev) => (prev + 1) % cases.length);
  };

  const handlePrev = () => {
    setAnimationCompleted(false);
    setDirection(-1);
    setCurrentIdx((prev) => (prev - 1 + cases.length) % cases.length);
  };

  const handleDotClick = (idx: number) => {
    if (idx === currentIdx) return;
    setAnimationCompleted(false);
    setDirection(idx > currentIdx ? 1 : -1);
    setCurrentIdx(idx);
  };

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
              onAnimationComplete={() => {
                setAnimationCompleted(true);
              }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="teeth-compare-slide"
            >
              {/* image-compare-viewer target container */}
              <div ref={containerRef} className="image-compare-viewer-container">
                <img src={cases[currentIdx].before} alt="Before Treatment" />
                <img src={cases[currentIdx].after} alt="After Treatment" />
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
            onClick={() => handleDotClick(idx)}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
