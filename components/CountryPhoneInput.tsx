'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import {
  PHONE_COUNTRIES,
  formatPhoneForMask,
  getPhoneCountry,
  getPhoneMaskPlaceholder,
} from '@/lib/phone-countries';

type CountryPhoneInputProps = {
  value: string;
  onChange: (value: string) => void;
  countryCode: string;
  onCountryChange: (countryCode: string) => void;
  inputClassName?: string;
};

export default function CountryPhoneInput({
  value,
  onChange,
  countryCode,
  onCountryChange,
  inputClassName = '',
}: CountryPhoneInputProps) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement | null>(null);
  const selectedCountry = useMemo(() => getPhoneCountry(countryCode), [countryCode]);

  useEffect(() => {
    if (!open) return;

    const close = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', close);
    return () => document.removeEventListener('mousedown', close);
  }, [open]);

  return (
    <div ref={rootRef} className="mcf-phone-wrap">
      <div className="mcf-phone-shell">
        <button
          type="button"
          className="mcf-country-trigger"
          onClick={() => setOpen((prev) => !prev)}
          aria-haspopup="listbox"
          aria-expanded={open}
        >
          <img src={selectedCountry.flagUrl} alt={selectedCountry.name} className="mcf-country-flag" />
          <span className="mcf-country-dial">{selectedCountry.dialCode}</span>
          <span className="mcf-country-caret">▼</span>
        </button>

        <input
          type="tel"
          value={value}
          onChange={(event) => onChange(formatPhoneForMask(event.target.value, selectedCountry.mask))}
          placeholder={getPhoneMaskPlaceholder(selectedCountry.mask)}
          autoComplete="tel-national"
          className={`${inputClassName} mcf-phone-number`.trim()}
        />
      </div>

      {open && (
        <div className="mcf-country-dropdown" role="listbox">
          {PHONE_COUNTRIES.map((country) => (
            <button
              key={country.code}
              type="button"
              className={`mcf-country-option${country.code === countryCode ? ' is-selected' : ''}`}
              onClick={() => {
                onCountryChange(country.code);
                onChange('');
                setOpen(false);
              }}
            >
              <img src={country.flagUrl} alt={country.name} className="mcf-country-flag" />
              <span className="mcf-country-name">{country.name}</span>
              <span className="mcf-country-code">{country.dialCode}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
