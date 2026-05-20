'use client';

import { useRef, useState } from 'react';

export default function MapContactSection() {
  const formRef = useRef<HTMLFormElement>(null);
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;
    setSubmitting(true);
    setErrorMsg('');

    try {
      const d = new FormData(formRef.current);
      const name = d.get('hcname') as string;
      const email = d.get('hcemail') as string;
      const phone = d.get('hcphone') as string;
      const message = d.get('hcmsg') as string;

      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, phone, message }),
      });

      if (!response.ok) {
        throw new Error('Failed to send message. Please try again.');
      }

      setSent(true);
      formRef.current.reset();
    } catch (err: any) {
      console.error('Map contact form submission error:', err);
      setErrorMsg(err.message || 'Failed to send message. Please try again later.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="map-contact-section">
      <div className="container">
        <div className="row g-0 map-contact-card">
          {/* Left — Google Map */}
          <div className="col-lg-6 map-embed-col">
            <div className="map-iframe-wrapper">
              <iframe
                src="https://maps.google.com/maps?q=121+E+60th+St+Suite+1B,New+York,NY+10022&t=&z=16&ie=UTF8&iwloc=&output=embed"
                width="100%" height="100%"
                style={{ border: 0, display: 'block' }}
                allowFullScreen loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Upper East Dental Innovations Location"
              />
            </div>
          </div>

          {/* Right — Get In Touch */}
          <div className="col-lg-6 map-form-col">
            <div className="map-form-inner">
              {sent ? (
                <div style={{ textAlign: 'center', padding: '30px 0' }}>
                  <div style={{ fontSize: '44px', marginBottom: '12px', color: '#165369' }}>✓</div>
                  <h3 style={{ color: '#1D2C36', marginBottom: '8px' }}>Message Sent!</h3>
                  <p style={{ color: '#888' }}>We&apos;ll get back to you shortly.</p>
                  <button
                    onClick={() => setSent(false)}
                    className="btn-main mt-4"
                    style={{ border: 'none', cursor: 'pointer' }}
                  >
                    <span>Send Another</span>
                  </button>
                </div>
              ) : (
                <>
                  <div className="map-form-tag">Get in Touch</div>
                  <h2 className="map-form-title">Book an appointment</h2>
                  <p className="map-form-sub">Fill out the form and our team will get back to you shortly.</p>

                  <form ref={formRef} onSubmit={handleSubmit} className="map-contact-form">
                    <div className="mcf-row">
                      <div className="mcf-group">
                        <input type="text" name="hcname" placeholder="Your Name" required className="mcf-input" />
                      </div>
                      <div className="mcf-group">
                        <input type="email" name="hcemail" placeholder="Your Email" required className="mcf-input" />
                      </div>
                    </div>
                    <div className="mcf-group">
                      <input type="tel" name="hcphone" placeholder="Phone Number" className="mcf-input" />
                    </div>
                    <div className="mcf-group">
                      <textarea name="hcmsg" placeholder="Write your Message" rows={4} className="mcf-input mcf-textarea" />
                    </div>
                    <p className="mcf-consent">
                      I consent to receive SMS text messages from UPPER EAST DENTAL INNOVATIONS for appointment
                      reminders and general communication. Msg &amp; data rates may apply. Reply STOP to opt out.
                    </p>
                     {errorMsg && (
                      <div className="mcf-error" style={{ color: '#dc2626', fontSize: '13px', marginBottom: '12px' }}>
                        {errorMsg}
                      </div>
                    )}
                    <button type="submit" className="mcf-submit" disabled={submitting}>
                      {submitting ? 'Submitting...' : 'Submit'}
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
