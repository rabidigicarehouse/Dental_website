'use client';

import { useRef, type InputHTMLAttributes } from 'react';

type DateInputWithIconProps = InputHTMLAttributes<HTMLInputElement>;

export default function DateInputWithIcon({
  className = '',
  ...props
}: DateInputWithIconProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const openPicker = () => {
    const input = inputRef.current;
    if (!input) return;

    if (typeof input.showPicker === 'function') {
      input.showPicker();
      return;
    }

    input.focus();
    input.click();
  };

  return (
    <div className="date-input-with-icon">
      <input ref={inputRef} {...props} className={`${className} date-input-control`.trim()} />
      <button
        type="button"
        className="date-input-trigger"
        onClick={openPicker}
        aria-label="Open date picker"
      >
        <svg viewBox="0 0 24 24" aria-hidden="true" className="date-input-icon">
          <path d="M7 2a1 1 0 0 1 1 1v1h8V3a1 1 0 1 1 2 0v1h1a3 3 0 0 1 3 3v11a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V7a3 3 0 0 1 3-3h1V3a1 1 0 0 1 1-1Zm13 8H4v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8ZM6 6a1 1 0 0 0-1 1v1h15V7a1 1 0 0 0-1-1H6Zm2 6h2v2H8v-2Zm4 0h2v2h-2v-2Z" />
        </svg>
      </button>
    </div>
  );
}
