'use client';

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  ReactNode,
} from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/* ============================================================
   Context for opening/closing the booking modal from any page
   ============================================================ */
type BookingModalContextValue = {
  open: () => void;
  close: () => void;
  isOpen: boolean;
};

const BookingModalContext = createContext<BookingModalContextValue | null>(null);

export function useBookingModal() {
  const ctx = useContext(BookingModalContext);
  if (!ctx) {
    throw new Error('useBookingModal must be used inside <BookingModalProvider>');
  }
  return ctx;
}

/* ============================================================
   Form & calendar types
   ============================================================ */
type FormData = {
  firstName: string;
  lastName: string;
  dob: string;
  phone: string;
  email: string;
  sex: 'M' | 'F' | '';
  reason: string;
};

const initialForm: FormData = {
  firstName: '',
  lastName: '',
  dob: '',
  phone: '',
  email: '',
  sex: '',
  reason: '',
};

const REASONS = [
  'New Patient Exam',
  'Cleaning',
  'Cosmetic Consultation',
  'Invisalign Consultation',
  'Implant Consultation',
  'Emergency Visit',
  'Whitening',
  'Other',
];

const MORNING_SLOTS = ['9:10 AM', '9:40 AM', '10:10 AM', '10:40 AM', '11:10 AM', '11:40 AM'];
const AFTERNOON_SLOTS = [
  '12:10 PM', '12:40 PM', '1:10 PM', '1:40 PM', '2:10 PM', '2:40 PM',
  '3:10 PM', '3:40 PM', '4:10 PM',
];

const WEEKDAYS = ['S', 'M', 'T', 'W', 'Th', 'F', 'Sa'];
const MONTHS = [
  'JANUARY', 'FEBRUARY', 'MARCH', 'APRIL', 'MAY', 'JUNE',
  'JULY', 'AUGUST', 'SEPTEMBER', 'OCTOBER', 'NOVEMBER', 'DECEMBER',
];

function buildMonthCells(year: number, month: number) {
  const firstDay = new Date(year, month, 1);
  const startWeekday = firstDay.getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells: { date: Date; inMonth: boolean }[] = [];
  // Previous month tail
  const prevDays = new Date(year, month, 0).getDate();
  for (let i = startWeekday - 1; i >= 0; i--) {
    cells.push({ date: new Date(year, month - 1, prevDays - i), inMonth: false });
  }
  // Current month
  for (let d = 1; d <= daysInMonth; d++) {
    cells.push({ date: new Date(year, month, d), inMonth: true });
  }
  // Pad to 6 rows (42 cells)
  let next = 1;
  while (cells.length < 42) {
    cells.push({ date: new Date(year, month + 1, next++), inMonth: false });
  }
  return cells;
}

function isSameDay(a: Date, b: Date) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

function formatLongDate(d: Date) {
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

/* ============================================================
   The 3-step Booking Modal
   ============================================================ */
/* ============================================================
   Country & Formatting Helpers for Phone & DOB
   ============================================================ */
const COUNTRIES = [
  { code: 'US', dialCode: '+1', flagUrl: 'https://flagcdn.com/w40/us.png', name: 'United States', mask: '(999) 999-9999', regex: /^\(\d{3}\)\s\d{3}-\d{4}$/ },
  { code: 'CA', dialCode: '+1', flagUrl: 'https://flagcdn.com/w40/ca.png', name: 'Canada', mask: '(999) 999-9999', regex: /^\(\d{3}\)\s\d{3}-\d{4}$/ },
  { code: 'GB', dialCode: '+44', flagUrl: 'https://flagcdn.com/w40/gb.png', name: 'United Kingdom', mask: '99999 999999', regex: /^\d{5}\s\d{6}$/ },
  { code: 'AU', dialCode: '+61', flagUrl: 'https://flagcdn.com/w40/au.png', name: 'Australia', mask: '9999 999 999', regex: /^\d{4}\s\d{3}\s\d{3}$/ },
  { code: 'IN', dialCode: '+91', flagUrl: 'https://flagcdn.com/w40/in.png', name: 'India', mask: '99999-99999', regex: /^\d{5}-\d{5}$/ },
  { code: 'DE', dialCode: '+49', flagUrl: 'https://flagcdn.com/w40/de.png', name: 'Germany', mask: '9999 9999999', regex: /^\d{4}\s\d{7,8}$/ },
  { code: 'FR', dialCode: '+33', flagUrl: 'https://flagcdn.com/w40/fr.png', name: 'France', mask: '99 99 99 99 99', regex: /^\d{2}\s\d{2}\s\d{2}\s\d{2}\s\d{2}$/ },
  { code: 'MX', dialCode: '+52', flagUrl: 'https://flagcdn.com/w40/mx.png', name: 'Mexico', mask: '999 999 9999', regex: /^\d{3}\s\d{3}\s\d{4}$/ },
  { code: 'BR', dialCode: '+55', flagUrl: 'https://flagcdn.com/w40/br.png', name: 'Brazil', mask: '(99) 99999-9999', regex: /^\(\d{2}\)\s\d{5}-\d{4}$/ },
  { code: 'JP', dialCode: '+81', flagUrl: 'https://flagcdn.com/w40/jp.png', name: 'Japan', mask: '999-9999-9999', regex: /^\d{3}-\d{4}-\d{4}$/ },
  { code: 'KR', dialCode: '+82', flagUrl: 'https://flagcdn.com/w40/kr.png', name: 'South Korea', mask: '999-9999-9999', regex: /^\d{3}-\d{4}-\d{4}$/ },
  { code: 'CN', dialCode: '+86', flagUrl: 'https://flagcdn.com/w40/cn.png', name: 'China', mask: '999 9999 9999', regex: /^\d{3}\s\d{4}\s\d{4}$/ },
  { code: 'IT', dialCode: '+39', flagUrl: 'https://flagcdn.com/w40/it.png', name: 'Italy', mask: '999 999 9999', regex: /^\d{3}\s\d{3}\s\d{4}$/ },
  { code: 'ES', dialCode: '+34', flagUrl: 'https://flagcdn.com/w40/es.png', name: 'Spain', mask: '999 999 999', regex: /^\d{3}\s\d{3}\s\d{3}$/ },
  { code: 'AE', dialCode: '+971', flagUrl: 'https://flagcdn.com/w40/ae.png', name: 'UAE', mask: '99 999 9999', regex: /^\d{2}\s\d{3}\s\d{4}$/ },
  { code: 'SA', dialCode: '+966', flagUrl: 'https://flagcdn.com/w40/sa.png', name: 'Saudi Arabia', mask: '99 999 9999', regex: /^\d{2}\s\d{3}\s\d{4}$/ },
  { code: 'PK', dialCode: '+92', flagUrl: 'https://flagcdn.com/w40/pk.png', name: 'Pakistan', mask: '999 9999999', regex: /^\d{3}\s\d{7}$/ },
  { code: 'PH', dialCode: '+63', flagUrl: 'https://flagcdn.com/w40/ph.png', name: 'Philippines', mask: '999 999 9999', regex: /^\d{3}\s\d{3}\s\d{4}$/ },
  { code: 'NG', dialCode: '+234', flagUrl: 'https://flagcdn.com/w40/ng.png', name: 'Nigeria', mask: '999 999 9999', regex: /^\d{3}\s\d{3}\s\d{4}$/ },
  { code: 'IL', dialCode: '+972', flagUrl: 'https://flagcdn.com/w40/il.png', name: 'Israel', mask: '99-999-9999', regex: /^\d{2}-\d{3}-\d{4}$/ },
];

const formatDOB = (value: string): string => {
  const digits = value.replace(/\D/g, '').slice(0, 8);
  let formatted = '';
  if (digits.length > 0) {
    formatted += digits.slice(0, 2);
  }
  if (digits.length > 2) {
    formatted += '/' + digits.slice(2, 4);
  }
  if (digits.length > 4) {
    formatted += '/' + digits.slice(4, 8);
  }
  return formatted;
};

const validateDOB = (dobStr: string): boolean => {
  if (!/^\d{2}\/\d{2}\/\d{4}$/.test(dobStr)) return false;
  const [m, d, y] = dobStr.split('/').map(Number);
  if (m < 1 || m > 12) return false;
  if (d < 1 || d > 31) return false;
  const currentYear = new Date().getFullYear();
  if (y < 1900 || y > currentYear) return false;
  return true;
};

const formatPhone = (value: string, mask: string): string => {
  const digits = value.replace(/\D/g, '');
  let formatted = '';
  let digitIndex = 0;
  
  for (let i = 0; i < mask.length && digitIndex < digits.length; i++) {
    if (mask[i] === '9') {
      formatted += digits[digitIndex++];
    } else {
      formatted += mask[i];
    }
  }
  return formatted;
};

/* ============================================================
   The 3-step Booking Modal
   ============================================================ */
function BookingModal({ onClose }: { onClose: () => void }) {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [form, setForm] = useState<FormData>(initialForm);
  const [selectedCountryCode, setSelectedCountryCode] = useState('US');
  const [countryDropdownOpen, setCountryDropdownOpen] = useState(false);

  const today = useMemo(() => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d;
  }, []);

  const [viewYear, setViewYear] = useState<number>(today.getFullYear());
  const [viewMonth, setViewMonth] = useState<number>(today.getMonth());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Lock body scroll and add blur class while open
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    document.body.classList.add('booking-modal-open');
    return () => {
      document.body.style.overflow = prev;
      document.body.classList.remove('booking-modal-open');
    };
  }, []);

  // ESC to close
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  // Click outside to close country dropdown
  useEffect(() => {
    if (!countryDropdownOpen) return;
    const handleClose = () => setCountryDropdownOpen(false);
    document.addEventListener('click', handleClose);
    return () => document.removeEventListener('click', handleClose);
  }, [countryDropdownOpen]);

  const selectedCountry = useMemo(() => {
    return COUNTRIES.find((c) => c.code === selectedCountryCode) || COUNTRIES[0];
  }, [selectedCountryCode]);

  const step1Valid = useMemo(() => {
    return (
      form.firstName.trim().length > 0 &&
      form.lastName.trim().length > 0 &&
      validateDOB(form.dob) &&
      selectedCountry.regex.test(form.phone) &&
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim()) &&
      form.reason.trim().length > 0
    );
  }, [form, selectedCountry]);

  const step2Valid = selectedDate !== null && selectedTime !== null;

  const setField = <K extends keyof FormData>(k: K, v: FormData[K]) =>
    setForm((f) => ({ ...f, [k]: v }));

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputVal = e.target.value;
    const digits = inputVal.replace(/\D/g, '');
    const maxDigits = selectedCountry.mask.split('9').length - 1;
    const limitedDigits = digits.slice(0, maxDigits);
    const formatted = formatPhone(limitedDigits, selectedCountry.mask);
    setField('phone', formatted);
  };

  const handleDOBChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputVal = e.target.value;
    const formatted = formatDOB(inputVal);
    setField('dob', formatted);
  };

  const monthCells = useMemo(
    () => buildMonthCells(viewYear, viewMonth),
    [viewYear, viewMonth]
  );

  const goMonth = (delta: number) => {
    const d = new Date(viewYear, viewMonth + delta, 1);
    setViewYear(d.getFullYear());
    setViewMonth(d.getMonth());
  };

  const handleBook = async () => {
    setSubmitting(true);
    setSubmitError(null);
    try {
      const response = await fetch('/api/book', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName: form.firstName,
          lastName: form.lastName,
          dob: form.dob,
          phone: `${selectedCountry.dialCode} ${form.phone}`,
          email: form.email,
          sex: form.sex,
          reason: form.reason,
          date: selectedDate ? selectedDate.toISOString() : '',
          time: selectedTime,
        }),
      });

      // Always try to read the body so we can surface a useful message
      let payload: { success?: boolean; error?: string; message?: string } = {};
      try {
        payload = await response.json();
      } catch {
        /* response had no JSON body — fine, we'll fall back to status text */
      }

      if (!response.ok) {
        const backendMsg = payload.error || payload.message;
        const looksLikeBackendDown =
          response.status === 502 ||
          (typeof backendMsg === 'string' &&
            /backend is not reachable|failed to connect to booking service/i.test(
              backendMsg
            ));

        const friendly = looksLikeBackendDown
          ? 'We couldn’t reach our booking service. Please try again in a moment, or call us directly at 212.697.1701.'
          : backendMsg || `Booking failed (${response.status}). Please try again.`;
        throw new Error(friendly);
      }

      setSubmitted(true);
    } catch (err: any) {
      console.error('Booking submission error:', err);
      const message =
        err?.name === 'TypeError'
          ? 'Network error — please check your internet connection and try again.'
          : err?.message || 'Something went wrong. Please try again.';
      setSubmitError(message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <motion.div
      key="booking-modal-backdrop"
      className="bmp-backdrop"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.18 }}
      onClick={onClose}
    >
      <motion.div
        className="bmp-modal"
        initial={{ opacity: 0, y: 24, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 24, scale: 0.96 }}
        transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="bmp-title"
      >
        {/* Header Block (always white) */}
        <div className="bmp-modal-header">
          <button className="bmp-close" onClick={onClose} aria-label="Close booking">
            ×
          </button>

          {/* Step indicator */}
          <div className="bmp-stepbar">
            {[1, 2, 3].map((n) => (
              <React.Fragment key={n}>
                <div
                  className={
                    'bmp-step-node' +
                    (step > n ? ' is-done' : '') +
                    (step === n ? ' is-active' : '')
                  }
                >
                  {step > n ? <span className="bmp-check">✓</span> : n}
                </div>
                {n < 3 && (
                  <div
                    className={'bmp-step-line' + (step > n ? ' is-done' : '')}
                  />
                )}
              </React.Fragment>
            ))}
          </div>

          <h2 id="bmp-title" className="bmp-title">
            {step === 1 && 'Patient Information'}
            {step === 2 && 'Select a Date and Time'}
            {step === 3 && 'Confirm Details'}
          </h2>
        </div>

        {submitted ? (
          <div className="bmp-modal-body is-success-screen">
            <div className="bmp-success">
              <div className="bmp-success-icon">✓</div>
              <h3>Appointment Booked!</h3>
              <p>
                We&apos;ve received your request for <strong>{selectedDate && formatLongDate(selectedDate)}</strong> at <strong>{selectedTime}</strong>.
              </p>
              <p>A confirmation email is on its way to <strong>{form.email}</strong>.</p>
              <button className="bmp-btn bmp-btn-primary" onClick={onClose}>
                Done
              </button>
            </div>
          </div>
        ) : (
          <>
            {/* Body Block (displays step form inside gradient / styled viewports) */}
            <div className={`bmp-modal-body step-${step}`}>
              {step === 1 && (
                <div className="bmp-step1">
                  <p className="bmp-step-intro">Please provide the following information</p>
                  <div className="bmp-grid">
                    <label className="bmp-field">
                      <span className="bmp-label">First Name*</span>
                      <input
                        type="text"
                        value={form.firstName}
                        onChange={(e) => setField('firstName', e.target.value)}
                        autoComplete="given-name"
                      />
                    </label>
                    <label className="bmp-field">
                      <span className="bmp-label">Last Name*</span>
                      <input
                        type="text"
                        value={form.lastName}
                        onChange={(e) => setField('lastName', e.target.value)}
                        autoComplete="family-name"
                      />
                    </label>
                    
                    {/* Row 2 starts */}
                    <label className="bmp-field field-dob">
                      <span className="bmp-label">Date of Birth*</span>
                      <input
                        type="text"
                        value={form.dob}
                        onChange={handleDOBChange}
                        placeholder="MM/DD/YYYY"
                        autoComplete="bday"
                      />
                    </label>
                    
                    <div className="bmp-field field-phone">
                      <span className="bmp-label">Phone*</span>
                      <div className="bmp-phone-field-container">
                        <div className="bmp-country-select-wrapper">
                          <button
                            type="button"
                            className="bmp-country-select-btn"
                            onClick={(e) => {
                              e.stopPropagation();
                              setCountryDropdownOpen(!countryDropdownOpen);
                            }}
                          >
                            <img src={selectedCountry.flagUrl} alt={selectedCountry.name} className="bmp-flag-img" />
                            <span className="bmp-caret-icon">▼</span>
                          </button>
                          {countryDropdownOpen && (
                            <div className="bmp-country-dropdown-list" onClick={(e) => e.stopPropagation()}>
                              {COUNTRIES.map((c) => (
                                <button
                                  key={c.code}
                                  type="button"
                                  className={`bmp-country-option${c.code === selectedCountryCode ? ' is-selected' : ''}`}
                                  onClick={() => {
                                    setSelectedCountryCode(c.code);
                                    setCountryDropdownOpen(false);
                                    setField('phone', ''); // Reset on change
                                  }}
                                >
                                  <img src={c.flagUrl} alt={c.name} className="bmp-flag-img" />
                                  <span className="bmp-country-name">{c.name}</span>
                                  <span className="bmp-dial-code">{c.dialCode}</span>
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                        <input
                          type="tel"
                          value={form.phone}
                          onChange={handlePhoneChange}
                          placeholder={selectedCountry.mask.replace(/9/g, 'X')}
                          autoComplete="tel"
                          className="bmp-phone-number-input"
                        />
                      </div>
                    </div>
                    
                    <label className="bmp-field field-email">
                      <span className="bmp-label">Email Address*</span>
                      <input
                        type="email"
                        value={form.email}
                        onChange={(e) => setField('email', e.target.value)}
                        autoComplete="email"
                      />
                    </label>
                    
                    <div className="bmp-field field-sex">
                      <span className="bmp-label">Sex</span>
                      <div className="bmp-sex-capsule">
                        <button
                          type="button"
                          className={`bmp-sex-btn ${form.sex === 'M' ? 'is-active' : ''}`}
                          onClick={() => setField('sex', 'M')}
                        >
                          M
                        </button>
                        <div className="bmp-sex-divider" />
                        <button
                          type="button"
                          className={`bmp-sex-btn ${form.sex === 'F' ? 'is-active' : ''}`}
                          onClick={() => setField('sex', 'F')}
                        >
                          F
                        </button>
                      </div>
                    </div>
                    {/* Row 2 ends */}
                    
                    {/* Row 3 starts */}
                    <label className="bmp-field field-reason">
                      <span className="bmp-label">Reason for Appointment*</span>
                      <select
                        value={form.reason}
                        onChange={(e) => setField('reason', e.target.value)}
                      >
                        <option value="">Select Reason for Appointment</option>
                        {REASONS.map((r) => (
                          <option key={r} value={r}>
                            {r}
                          </option>
                        ))}
                      </select>
                    </label>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="bmp-step2">
                  <div className="bmp-cal-grid">
                    <div className="bmp-cal">
                      <div className="bmp-cal-head">
                        <button
                          type="button"
                          className="bmp-cal-nav"
                          onClick={() => goMonth(-1)}
                          aria-label="Previous month"
                        >
                          ‹
                        </button>
                        <div className="bmp-cal-title">
                          {MONTHS[viewMonth]} {viewYear}
                        </div>
                        <button
                          type="button"
                          className="bmp-cal-nav"
                          onClick={() => goMonth(1)}
                          aria-label="Next month"
                        >
                          ›
                        </button>
                      </div>
                      <div className="bmp-cal-weekdays">
                        {WEEKDAYS.map((w) => (
                          <div key={w} className="bmp-cal-wd">{w}</div>
                        ))}
                      </div>
                      <div className="bmp-cal-days">
                        {monthCells.map(({ date, inMonth }, i) => {
                          const isPast = date < today;
                          const isSelected = selectedDate && isSameDay(date, selectedDate);
                          const isToday = isSameDay(date, today);
                          return (
                            <button
                              key={i}
                              type="button"
                              disabled={isPast}
                              className={
                                'bmp-cal-day' +
                                (inMonth ? '' : ' is-other-month') +
                                (isPast ? ' is-disabled' : '') +
                                (isSelected ? ' is-selected' : '') +
                                (isToday ? ' is-today' : '')
                              }
                              onClick={() => {
                                if (isPast) return;
                                setSelectedDate(date);
                                setSelectedTime(null);
                              }}
                            >
                              {date.getDate()}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <div className="bmp-times">
                      <div className="bmp-times-title">
                        Next Available Appointment
                        <span className="bmp-times-sub">
                          {selectedDate ? formatLongDate(selectedDate) : 'Select a date'}
                        </span>
                        <span className="bmp-times-tz">(All appointments are shown in EDT)</span>
                      </div>

                      <div className="bmp-times-group">
                        <div className="bmp-times-label">Morning</div>
                        <div className="bmp-times-list">
                          {MORNING_SLOTS.map((slot) => (
                            <button
                              key={slot}
                              type="button"
                              disabled={!selectedDate}
                              className={
                                'bmp-time' + (selectedTime === slot ? ' is-active' : '')
                              }
                              onClick={() => setSelectedTime(slot)}
                            >
                              {slot}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="bmp-times-group">
                        <div className="bmp-times-label">Afternoon</div>
                        <div className="bmp-times-list">
                          {AFTERNOON_SLOTS.map((slot) => (
                            <button
                              key={slot}
                              type="button"
                              disabled={!selectedDate}
                              className={
                                'bmp-time' + (selectedTime === slot ? ' is-active' : '')
                              }
                              onClick={() => setSelectedTime(slot)}
                            >
                              {slot}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="bmp-step3">
                  <p className="bmp-step-intro">
                    We&apos;re about to schedule your appointment. Please review the details:
                  </p>
                  <div className="bmp-confirm-card">
                    <div className="bmp-confirm-icon" aria-hidden="true">
                      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect x="3" y="4" width="18" height="18" rx="3" stroke="white" strokeWidth="1.5" fill="rgba(255,255,255,0.15)" />
                        <line x1="3" y1="9" x2="21" y2="9" stroke="white" strokeWidth="1.5" />
                        <line x1="8" y1="2" x2="8" y2="6" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
                        <line x1="16" y1="2" x2="16" y2="6" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
                        <rect x="7" y="12" width="3" height="2.5" rx="0.5" fill="rgba(255,255,255,0.6)" />
                        <rect x="10.5" y="12" width="3" height="2.5" rx="0.5" fill="rgba(255,255,255,0.6)" />
                        <rect x="14" y="12" width="3" height="2.5" rx="0.5" fill="rgba(255,255,255,0.6)" />
                        <rect x="7" y="16" width="3" height="2.5" rx="0.5" fill="rgba(255,255,255,0.6)" />
                        <rect x="10.5" y="16" width="3" height="2.5" rx="0.5" fill="rgba(255,255,255,0.6)" />
                        <rect x="14" y="16" width="3" height="2.5" rx="0.5" fill="rgba(255,255,255,0.6)" />
                      </svg>
                    </div>
                    <div className="bmp-confirm-datetime">
                      <div className="bmp-confirm-date">
                        {selectedDate ? formatLongDate(selectedDate) : '—'}
                      </div>
                      <div className="bmp-confirm-time">{selectedTime ?? '—'}</div>
                    </div>
                    <div className="bmp-confirm-divider" />
                    <div className="bmp-confirm-clinic">
                      <strong>Upper East Dental Innovations</strong>
                      <div>121 East 60th Street, Suite 1B</div>
                      <div>New York, NY 10022</div>
                    </div>
                    <div className="bmp-confirm-divider" />
                    <div className="bmp-confirm-patient">
                      <div className="bmp-confirm-patient-name">{form.firstName} {form.lastName}</div>
                      <div>{form.email} · {selectedCountry.dialCode} {form.phone}</div>
                      <div>Reason: {form.reason}</div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {submitError && (
              <div className="bmp-submit-error" style={{ color: '#dc2626', backgroundColor: '#fef2f2', padding: '10px 14px', borderRadius: '8px', margin: '12px 24px 0', fontSize: '13px', border: '1px solid #fee2e2', textAlign: 'center' }}>
                {submitError}
              </div>
            )}

            {/* Footer Block (always white background, centered NEXT button) */}
            <div className="bmp-modal-footer">
              {step > 1 && (
                <button
                  type="button"
                  className="bmp-btn-back-left"
                  onClick={() => setStep((s) => (s - 1) as 1 | 2 | 3)}
                >
                  ← Back
                </button>
              )}
              <button
                type="button"
                className="bmp-btn bmp-btn-next-centered"
                disabled={step === 1 ? !step1Valid : step === 2 ? !step2Valid : submitting}
                onClick={step === 3 ? handleBook : () => setStep((s) => (s + 1) as 1 | 2 | 3)}
              >
                {step === 3 ? (submitting ? 'Booking…' : 'BOOK APPOINTMENT ›') : 'NEXT ›'}
              </button>
            </div>
          </>
        )}
      </motion.div>
    </motion.div>
  );
}

/* ============================================================
   Provider
   ============================================================ */
export default function BookingModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);

  // Open the modal whenever a Book-Appointment-style CTA is clicked.
  // Match: href ending with `#book`, the legacy scheduling URL (in case
  // any was missed), explicit `data-booking` attribute, or buttons whose
  // visible text is a booking call-to-action.
  useEffect(() => {
    const LEGACY_URL = 'scheduling.simplifeye.co';
    const BOOK_TEXT_RE =
      /^(book\s+(an\s+)?appointment|book\s+now|book\s+your\s+consultation|connect\s+us)\b/i;

    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented) return;
      const target = e.target as HTMLElement | null;
      if (!target || typeof target.closest !== 'function') return;

      // CRITICAL: never intercept clicks that originate INSIDE the booking
      // modal itself, otherwise the Step 3 "BOOK APPOINTMENT" button is
      // swallowed by this listener (matches BOOK_TEXT_RE) and the form
      // never submits.
      if (target.closest('.bmp-backdrop') || target.closest('.bmp-modal')) {
        return;
      }

      const el = target.closest('a, button') as HTMLElement | null;
      if (!el) return;

      const hrefAttr = el.getAttribute('href') || '';
      const hrefAbs = (el as HTMLAnchorElement).href || '';
      const text = (el.textContent || '').trim();

      const isBookHash = hrefAttr === '#book' || hrefAttr.endsWith('#book');
      const isBookLegacy = hrefAbs.includes(LEGACY_URL) || hrefAttr.includes(LEGACY_URL);
      const isBookData = el.hasAttribute('data-booking');
      const isBookText = BOOK_TEXT_RE.test(text);

      if (isBookHash || isBookLegacy || isBookData || isBookText) {
        e.preventDefault();
        e.stopPropagation();
        setIsOpen(true);
      }
    };
    document.addEventListener('click', onClick, true);
    return () => document.removeEventListener('click', onClick, true);
  }, []);

  return (
    <BookingModalContext.Provider value={{ open, close, isOpen }}>
      {children}
      <AnimatePresence>
        {isOpen && <BookingModal onClose={close} />}
      </AnimatePresence>
    </BookingModalContext.Provider>
  );
}
