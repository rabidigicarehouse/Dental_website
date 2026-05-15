'use client';

import { useRef } from 'react';
import Link from 'next/link';
import Footer from '@/components/Footer';


const questions: Array<{ q: string; type?: 'text'; options?: string[]; hint?: string }> = [
  {
    q: 'What brings you to our practice? (e.g., preventive care, cosmetic dentistry, second opinion, long-term oral health partner)',
    options: [
      'Emergency / urgent issue',
      'Looking for a high-quality dental provider',
      'Interested in cosmetic or comprehensive treatment',
      'Just shopping around',
    ],
  },
  {
    q: "What are the top 3 qualities you're looking for in a dentist or dental practice?",
    type: 'text',
    hint: '(e.g., trust, advanced technology, no wait time, affordability, detailed communication, long-term planning)',
  },
  {
    q: 'How would you describe your past dental experiences?',
    options: [
      'Positive and consistent',
      'Avoided due to fear or discomfort',
      'Frustrated with rushed or impersonal care',
      "I haven't prioritized it until now",
    ],
  },
  {
    q: 'How important is it to you to maintain your dental health long-term?',
    options: [
      'Extremely - I want to preserve my teeth and smile',
      'Somewhat - when needed',
      "Only when there's a problem",
    ],
  },
  {
    q: "Are you open to investing in long-term dental health and appearance, even if it's not covered by insurance?",
    options: [
      'Yes, I understand quality care is an investment',
      'Maybe, depending on cost',
      'No, I only want what insurance covers',
    ],
  },
  {
    q: 'How do you typically plan for medical or dental expenses?',
    options: [
      "I save and budget for care that's important to me",
      'I prefer financing or payment plans',
      'I only do procedures insurance pays for',
    ],
  },
  {
    q: 'Are you prepared to make an initial investment in your care if we determine that treatment is necessary?',
    options: ['Yes', 'Possibly', 'No'],
  },
  {
    q: 'Would you be open to a financial consultation if your care requires planning?',
    options: ['Yes, I appreciate transparency and guidance', 'Only if necessary', 'No'],
  },
  {
    q: 'Our practice provides meticulous, comprehensive care with a focus on relationships, long-term results, and a high standard of excellence. Are you looking for that kind of dental provider?',
    options: [
      "Yes - that's exactly what I value",
      "I'm not sure",
      "I'm just looking for something basic or covered",
    ],
  },
];

export default function PatientScreeningPage() {
  const formRef = useRef<HTMLFormElement>(null);

  const handleDownload = () => {
    if (!formRef.current) return;
    const w = window.open('', '_blank');
    if (!w) return;
    w.document.write(`<html><head><title>Patient Screening Form</title><style>
      body{font-family:Arial,sans-serif;padding:40px;color:#1a3352}
      h1{color:#1a3352;text-align:center;margin-bottom:24px}
      ol li{font-weight:700;padding:10px 0}
      label{display:block;font-weight:400;padding:4px 0}
      textarea,input{width:100%;padding:8px;border:1px solid #dde3ee;border-radius:6px;margin-top:6px}
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
          backgroundImage: 'url(/office tour/9.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="container relative z-2">
          <div className="page-subheader-eyebrow" style={{ color: 'rgba(255,255,255,0.85)' }}>Patient Resources</div>
          <h1 className="page-subheader-title" style={{ color: '#fff' }}>Patient Screening Form</h1>
          <ul className="crumb">
            <li><Link href="/" style={{ color: 'rgba(255,255,255,0.8)' }}>Home</Link></li>
            <li><Link href="/patient-forms" style={{ color: 'rgba(255,255,255,0.8)' }}>Patient Forms</Link></li>
            <li className="active" style={{ color: '#fff' }}>Patient Screening</li>
          </ul>
        </div>
      </section>

      <section className="form-page-wrap">
        <div className="container">
          <form ref={formRef} className="dental-form" onSubmit={(e) => e.preventDefault()}>
            <h2 className="dental-form-title">Patient Screening Form</h2>

            <ol className="dental-q-bullets" style={{ counterReset: 'q' }}>
              {questions.map((item, i) => (
                <li key={i}>
                  <span style={{ marginRight: 6 }}>{i + 1}.</span>{item.q}
                  {item.hint && <div className="dental-form-hint">{item.hint}</div>}
                  {item.type === 'text' ? (
                    <textarea className="dental-form-textarea" style={{ marginTop: 10, minHeight: 90 }} />
                  ) : (
                    <div className="dental-q-options">
                      {item.options?.map((opt) => (
                        <label key={opt}>
                          <input type="checkbox" /> {opt}
                        </label>
                      ))}
                    </div>
                  )}
                </li>
              ))}
            </ol>

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
