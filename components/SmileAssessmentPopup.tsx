'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { buildBackendUrl } from '@/lib/api-base-url';
import { useBookingModal } from '@/components/BookingModalProvider';
import CountryPhoneInput from '@/components/CountryPhoneInput';
import { isPhoneValidForCountry, toInternationalPhone } from '@/lib/phone-countries';

type SubmitState = 'idle' | 'sending' | 'success' | 'error';

export default function SmileAssessmentPopup() {
  const pathname = usePathname();
  const { isOpen: isBookingOpen } = useBookingModal();
  const [isOpen, setIsOpen] = useState(false);
  const [status, setStatus] = useState<SubmitState>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [phoneCountryCode, setPhoneCountryCode] = useState('US');
  const [phoneValue, setPhoneValue] = useState('');

  const shouldHide = pathname !== '/';

  useEffect(() => {
    setIsOpen(false);
    if (shouldHide || isBookingOpen) return;

    const timer = window.setTimeout(() => setIsOpen(true), 4500);
    return () => window.clearTimeout(timer);
  }, [isBookingOpen, pathname, shouldHide]);

  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isOpen]);

  const close = () => {
    setIsOpen(false);
  };

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus('sending');
    setErrorMessage('');

    const data = new FormData(event.currentTarget);
    const name = String(data.get('name') || '').trim();
    const email = String(data.get('email') || '').trim();
    const phone = phoneValue.trim();

    try {
      if (!phone) {
        throw new Error('Please enter your phone number so we can contact you.');
      }

      if (!isPhoneValidForCountry(phoneCountryCode, phone)) {
        throw new Error('Please enter a valid phone number for the selected country.');
      }

      const response = await fetch(buildBackendUrl('/api/contact'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          phone: toInternationalPhone(phoneCountryCode, phone),
          source: 'Free Smile Assessment',
          message: 'Free Smile Assessment lead submitted from the website popup. Please contact this visitor to discuss their smile goals and consultation options.',
        }),
      });

      const payload = await response.json().catch(() => ({}));
      if (!response.ok) {
        throw new Error(payload.error || 'We could not submit your assessment request. Please try again.');
      }

      setStatus('success');
    } catch (error) {
      setStatus('error');
      setErrorMessage(error instanceof Error ? error.message : 'Please try again or call 212.697.1701.');
    }
  };

  if (shouldHide || isBookingOpen || !isOpen) return null;

  return (
    <div className="smile-lead-backdrop" role="presentation" onMouseDown={close}>
      <div
        className="smile-lead-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="smile-assessment-title"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <button type="button" className="smile-lead-close" onClick={close} aria-label="Close free smile assessment">
          &times;
        </button>

        <div className="smile-lead-accent">
          <span>Complimentary</span>
          <strong>Free Smile Assessment</strong>
          <p>Tell us how to reach you and our team will help you explore the best next step for your smile.</p>
          <div className="smile-lead-trust">
            <span><i className="fa fa-check-circle" aria-hidden="true" /> Personalized guidance</span>
            <span><i className="fa fa-check-circle" aria-hidden="true" /> No-pressure consultation</span>
          </div>
        </div>

        <div className="smile-lead-form-wrap">
          {status === 'success' ? (
            <div className="smile-lead-success">
              <i className="fa fa-check-circle" aria-hidden="true" />
              <h3>Thank you!</h3>
              <p>Your assessment request was sent to the clinic. Our team will contact you shortly.</p>
              <button type="button" onClick={close}>Close</button>
            </div>
          ) : (
            <>
              <span className="smile-lead-form-kicker">Start your conversation</span>
              <h3 id="smile-assessment-title">Request Your Free Smile Assessment</h3>
              <form onSubmit={submit}>
                <label>
                  Full Name
                  <input name="name" type="text" autoComplete="name" required placeholder="Your name" />
                </label>
                <label>
                  Email Address
                  <input name="email" type="email" autoComplete="email" required placeholder="you@example.com" />
                </label>
                <label>
                  Phone Number
                  <CountryPhoneInput
                    value={phoneValue}
                    onChange={setPhoneValue}
                    countryCode={phoneCountryCode}
                    onCountryChange={setPhoneCountryCode}
                    inputClassName="smile-lead-phone-shell"
                  />
                </label>
                <button type="submit" disabled={status === 'sending'}>
                  {status === 'sending' ? 'Sending...' : 'Get My Free Assessment'}
                </button>
                {status === 'error' && <p className="smile-lead-error">{errorMessage}</p>}
                <small>By submitting, you agree that our clinic may contact you about your request.</small>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
