'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function AccessibilityWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [textSize, setTextSize] = useState(0);
  const [grayscale, setGrayscale] = useState(false);
  const [highContrast, setHighContrast] = useState(false);
  const [negativeContrast, setNegativeContrast] = useState(false);
  const [lightBg, setLightBg] = useState(false);
  const [linksUnderline, setLinksUnderline] = useState(false);
  const [readableFont, setReadableFont] = useState(false);

  // Text-to-Speech selection state
  const [selection, setSelection] = useState({ text: '', x: 0, y: 0, show: false });

  useEffect(() => {
    const html = document.documentElement;
    
    // Applying text size zoom
    if (textSize !== 0) {
      (html as any).style.zoom = 1 + (textSize * 0.1);
    } else {
      (html as any).style.zoom = '';
    }

    html.classList.toggle('a11y-grayscale', grayscale);
    html.classList.toggle('a11y-high-contrast', highContrast);
    html.classList.toggle('a11y-negative-contrast', negativeContrast);
    html.classList.toggle('a11y-light-background', lightBg);
    html.classList.toggle('a11y-links-underline', linksUnderline);
    html.classList.toggle('a11y-readable-font', readableFont);

  }, [textSize, grayscale, highContrast, negativeContrast, lightBg, linksUnderline, readableFont]);

  // Handle Text Selection for Speech
  useEffect(() => {
    const handleMouseUp = (e: MouseEvent) => {
      const selectedText = window.getSelection()?.toString().trim();
      if (selectedText && selectedText.length > 0) {
        setSelection({
          text: selectedText,
          x: e.clientX - 40, // Position slightly centered horizontally to cursor
          y: e.clientY - 55, // Position slightly above cursor
          show: true
        });
      } else {
        setSelection(s => ({ ...s, show: false }));
      }
    };

    const handleMouseDown = (e: MouseEvent) => {
      // Don't hide if clicking on the speech button itself
      const target = e.target as HTMLElement;
      if (!target.closest('.a11y-speech-btn')) {
        setSelection(s => ({ ...s, show: false }));
        if (window.speechSynthesis) {
          window.speechSynthesis.cancel();
        }
      }
    };

    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mousedown', handleMouseDown);

    return () => {
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mousedown', handleMouseDown);
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const speakText = () => {
    if ('speechSynthesis' in window && selection.text) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(selection.text);
      window.speechSynthesis.speak(utterance);
      setSelection(s => ({ ...s, show: false }));
    }
  };

  const resetAll = () => {
    setTextSize(0);
    setGrayscale(false);
    setHighContrast(false);
    setNegativeContrast(false);
    setLightBg(false);
    setLinksUnderline(false);
    setReadableFont(false);
  };

  const sidebarWidth = 260;

  return (
    <>
      <AnimatePresence>
        {selection.show && (
          <motion.button
            initial={{ opacity: 0, scale: 0.5, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: 10 }}
            className="a11y-speech-btn shadow-lg"
            style={{ left: selection.x, top: selection.y }}
            onClick={speakText}
            title="Read selected text"
            aria-label="Read selected text aloud"
          >
            <i className="fa fa-microphone" style={{ fontSize: '16px', marginRight: '6px' }}></i>
            <span style={{ fontSize: '13px', fontWeight: 600 }}>Listen</span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Overlay backdrop when open */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.3 }}
            exit={{ opacity: 0 }}
            className="a11y-overlay"
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>

      <motion.div
        initial={false}
        animate={{ x: isOpen ? 0 : -sidebarWidth }}
        transition={{ type: 'spring', bounce: 0, duration: 0.4 }}
        style={{
          position: 'fixed',
          top: '50%',
          left: 0,
          y: '-50%',
          zIndex: 999999,
          display: 'flex',
          alignItems: 'center'
        }}
      >
        {/* Sidebar */}
        <div className="a11y-sidebar" style={{ width: sidebarWidth }}>
          <div className="a11y-sidebar-header">
            <h3 className="m-0 fs-18 fw-700" style={{ color: '#333' }}>Accessibility</h3>
            <button onClick={() => setIsOpen(false)} className="a11y-close-btn" aria-label="Close menu">
              <i className="fa fa-times"></i>
            </button>
          </div>
          <div className="a11y-sidebar-content">
            <div className="a11y-options">
              <button onClick={() => setTextSize(p => Math.min(p + 1, 3))}>
                <i className="fa fa-search-plus"></i> Increase Text
              </button>
              <button onClick={() => setTextSize(p => Math.max(p - 1, -2))}>
                <i className="fa fa-search-minus"></i> Decrease Text
              </button>
              <button className={grayscale ? 'active' : ''} onClick={() => setGrayscale(!grayscale)}>
                <i className="fa fa-barcode"></i> Grayscale
              </button>
              <button className={highContrast ? 'active' : ''} onClick={() => setHighContrast(!highContrast)}>
                <i className="fa fa-adjust"></i> High Contrast
              </button>
              <button className={negativeContrast ? 'active' : ''} onClick={() => setNegativeContrast(!negativeContrast)}>
                <i className="fa fa-eye"></i> Negative Contrast
              </button>
              <button className={lightBg ? 'active' : ''} onClick={() => setLightBg(!lightBg)}>
                <i className="fa fa-lightbulb-o"></i> Light Background
              </button>
              <button className={linksUnderline ? 'active' : ''} onClick={() => setLinksUnderline(!linksUnderline)}>
                <i className="fa fa-link"></i> Links Underline
              </button>
              <button className={readableFont ? 'active' : ''} onClick={() => setReadableFont(!readableFont)}>
                <i className="fa fa-font"></i> Readable Font
              </button>
              <button onClick={resetAll} className="a11y-reset">
                <i className="fa fa-refresh"></i> Reset Settings
              </button>
            </div>
          </div>
        </div>

        {/* Toggle Button attached to the right of the sidebar */}
        <button
          className="a11y-toggle-btn shadow-lg"
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? "Close Accessibility Menu" : "Open Accessibility Menu"}
          style={{
            borderTopLeftRadius: 0,
            borderBottomLeftRadius: 0,
            borderTopRightRadius: '8px',
            borderBottomRightRadius: '8px'
          }}
        >
          <motion.i 
            animate={{ rotate: isOpen ? 360 : 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="fa fa-wheelchair text-white" 
            style={{ fontSize: '22px' }}
          />
        </button>
      </motion.div>
    </>
  );
}
