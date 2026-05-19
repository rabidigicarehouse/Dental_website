'use client';

import { useRef, useState } from 'react';

export default function MapContactSection() {
  const formRef = useRef<HTMLFormElement>(null);
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;
    const d = new FormData(formRef.current);
    const link = `mailto:info@uedi.nyc?subject=Website Inquiry&body=Name: ${d.get('hcname')}%0D%0AEmail: ${d.get('hcemail')}%0D%0APhone: ${d.get('hcphone')}%0D%0AMessage: ${d.get('hcmsg')}`;
    window.location.href = link;
    setSent(true);
    formRef.current.reset();
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
                    <button type="submit" className="mcf-submit">Submit</button>
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
