'use client';

import { useRef } from 'react';
import Link from 'next/link';
import Footer from '@/components/Footer';


export default function Covid19FormPage() {
  const formRef = useRef<HTMLFormElement>(null);

  const handleDownload = () => {
    if (!formRef.current) return;
    const w = window.open('', '_blank');
    if (!w) return;
    w.document.write(`<html><head><title>COVID-19 Emergency Consent for Treatment</title><style>
      body{font-family:Arial,sans-serif;padding:40px;color:#1D2C36}
      h1{color:#1D2C36;text-align:center;margin-bottom:24px}
      input{border:none;border-bottom:1px solid #165369;min-width:180px;padding:2px}
      ul{padding-left:28px}
      @media print{button{display:none!important}}
    </style></head><body>${formRef.current.outerHTML}</body></html>`);
    w.document.close();
    w.print();
  };

  return (
    <>
      <section
        id="subheader"
        className="page-subheader text-center"
        style={{
          backgroundImage: 'url(/office tour/7.jpeg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="container relative z-2">
          <div className="page-subheader-eyebrow" style={{ color: 'rgba(255,255,255,0.85)' }}>Patient Resources</div>
          <h1 className="page-subheader-title" style={{ color: '#fff' }}>COVID-19 Emergency Consent</h1>
          <ul className="crumb">
            <li><Link href="/" style={{ color: 'rgba(255,255,255,0.8)' }}>Home</Link></li>
            <li><Link href="/patient-forms" style={{ color: 'rgba(255,255,255,0.8)' }}>Patient Forms</Link></li>
            <li className="active" style={{ color: '#fff' }}>COVID-19 Consent</li>
          </ul>
        </div>
      </section>

      <section className="form-page-wrap">
        <div className="container">
          <form ref={formRef} className="dental-form" onSubmit={(e) => e.preventDefault()}>
            <h2 className="dental-form-title">COVID-19 Emergency Consent for Treatment</h2>

            <div className="dental-consent-body">
              <p>
                I, <input type="text" className="dental-inline-blank" placeholder="Your Name" /> (patient or guardian)
                knowingly and willingly consent to have emergency dental treatment for during the COVID-19 pandemic.
              </p>

              <p>
                I understand the COVID-19 virus has a long incubation period during which carriers of the virus may
                not show symptoms, and still be highly contagious. It is impossible to determine who has it and who
                does not, given the current limits in virus testing.
              </p>

              <p>
                Dental procedures create water spray (aerosols) which is how the disease is spread. The ultra-fine
                nature of the spray can linger in the air for minutes to sometimes hours, which can transmit the
                COVID-19 virus.
              </p>

              <ul>
                <li>
                  I understand that due to the frequency of visits of other patients, the characteristics of the
                  virus, and the characteristics of dental procedures, that I have an elevated risk of contracting
                  the virus simply by being in a dental office.{' '}
                  <input type="text" className="dental-inline-blank" placeholder="Initial" style={{ minWidth: 120 }} /> (Initial)
                </li>
                <li>
                  I have been made aware of the NY state of emergency, CDS, and ADA guidelines that under the current
                  pandemic all non-urgent dental care is not recommended. Dental visits should be limited to the
                  treatment of pain, infection, conditions that significantly inhibit normal function of teeth and
                  mouth, and issues that may cause anything listed above within the next 3-6 months. I confirm I am
                  seeking treatment for a condition that meets these criteria.{' '}
                  <input type="text" className="dental-inline-blank" placeholder="Initial" style={{ minWidth: 120 }} /> (Initial)
                </li>
              </ul>

              <p>
                I consent to having my temperature taken, and confirm that I am not presenting any of the following
                symptoms of COVID-19 listed below:{' '}
                <input type="text" className="dental-inline-blank" placeholder="Initial" style={{ minWidth: 120 }} /> (Initial)
              </p>

              <ul>
                <li>Fever</li>
                <li>Shortness of breath</li>
                <li>Dry cough</li>
                <li>Runny nose</li>
                <li>Sore throat</li>
              </ul>

              <p>
                As a precondition to rendering treatment, I have not within the past 14 days travelled in a
                commercial airline, been in close proximity (less than 6 feet proximity) at a gathering of 10 or
                more persons, or have had close contact with a person who has confirmed positive or suspected to be
                positive for COVID-19.
              </p>

              <p>I consent to the proposed treatment by my dentist.</p>
            </div>

            <div className="dental-q-row">
              <span className="dental-q-row-text">Have you tested positive for COVID-19?</span>
              <div className="dental-radio-group">
                <label><input type="radio" name="covid" /> Yes</label>
                <label><input type="radio" name="covid" /> No</label>
              </div>
            </div>

            <div className="dental-form-row" style={{ marginTop: 18 }}>
              <div>
                <label className="dental-form-label">Signature (Patient or Guardian)</label>
                <input type="text" className="dental-form-input" placeholder="Enter Name" />
              </div>
            </div>

            <div className="dental-form-actions">
              <button type="submit" className="dental-btn-submit"><span>Submit</span></button>
              <button type="button" className="dental-btn-download" onClick={handleDownload}><span>⬇ Download PDF</span></button>
            </div>
          </form>
        </div>
      </section>

      <Footer />
    </>
  );
}
