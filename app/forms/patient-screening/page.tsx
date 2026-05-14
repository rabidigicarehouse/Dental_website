'use client';
import { useRef } from 'react';

const questions = [
  {
    q: '1. What brings you to our practice? (e.g., preventive care, cosmetic dentistry, second opinion, long-term oral health partner)',
    options: ['Emergency / urgent issue', 'Looking for a high-quality dental provider', 'Interested in cosmetic or comprehensive treatment', 'Just shopping around']
  },
  {
    q: '2. What are the top 3 qualities you\'re looking for in a dentist or dental practice?',
    type: 'textarea',
    hint: '(e.g., trust, advanced technology, no wait time, affordability, detailed communication, long-term planning)'
  },
  {
    q: '3. How would you describe your past dental experiences?',
    options: ['Positive and consistent', 'Avoided due to fear or discomfort', 'Frustrated with rushed or impersonal care', 'I haven\'t prioritized it until now']
  },
  {
    q: '4. How important is it to you to maintain your dental health long-term?',
    options: ['Extremely – I want to preserve my teeth and smile', 'Somewhat – when needed', 'Only when there\'s a problem']
  },
  {
    q: '5. Are you open to investing in long-term dental health and appearance, even if it\'s not covered by insurance?',
    options: ['Yes, I understand quality care is an investment', 'Maybe, depending on cost', 'No, I only want what insurance covers']
  },
  {
    q: '6. How do you typically plan for medical or dental expenses?',
    options: ['I save and budget for care that\'s important to me', 'I prefer financing or payment plans', 'I only do procedures insurance pays for']
  },
  {
    q: '7. Are you prepared to make an initial investment in your care if we determine that treatment is necessary?',
    options: ['Yes', 'Possibly', 'No']
  },
  {
    q: '8. Would you be open to a financial consultation if your care requires planning?',
    options: ['Yes, I appreciate transparency and guidance', 'Only if necessary', 'No']
  },
  {
    q: '9. Our practice provides meticulous, comprehensive care with a focus on relationships, long-term results, and a high standard of excellence. Are you looking for that kind of dental provider?',
    options: ['Yes – that\'s exactly what I value', 'I\'m not sure', 'I\'m just looking for something basic or covered']
  },
];

export default function PatientScreeningPage() {
  const formRef = useRef<HTMLDivElement>(null);

  const handleDownload = () => {
    const pw = window.open('', '_blank');
    if (!pw || !formRef.current) return;
    pw.document.write(`<html><head><title>Patient Screening Form</title><style>
      body{font-family:Arial,sans-serif;padding:40px;color:#333;font-size:14px;line-height:1.7}
      h1{color:#1a5276;text-align:center;margin-bottom:30px}
      h4{margin:20px 0 10px;font-size:15px}
      label{display:block;margin:4px 0;font-weight:400}
      textarea{width:100%;min-height:80px;padding:8px;border:1px solid #ccc;border-radius:4px}
      @media print{button{display:none!important}}
    </style></head><body>${formRef.current.innerHTML}</body></html>`);
    pw.document.close();
    pw.print();
  };

  return (
    <div className="container" style={{ maxWidth: 900 }}>
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 20 }}>
        <button onClick={handleDownload} className="btn-main fx-slide" data-hover="Download PDF" style={{ cursor: 'pointer' }}>
          <span>⬇ Download PDF</span>
        </button>
      </div>

      <div ref={formRef} style={{ background: '#f5f5f5', borderRadius: 16, padding: '40px 48px', boxShadow: '0 4px 24px rgba(0,0,0,0.08)' }}>
        <h1 style={{ color: '#1a5276', textAlign: 'center', marginBottom: 30 }}>Patient Screening Form</h1>

        {questions.map((item, idx) => (
          <div key={idx} style={{ marginBottom: 24 }}>
            <h4 style={{ fontWeight: 700, fontSize: 15, color: '#222' }}>{item.q}</h4>
            {item.hint && <p style={{ fontSize: 13, color: '#1a5276', marginBottom: 8 }}>{item.hint}</p>}
            {'type' in item && item.type === 'textarea' ? (
              <textarea style={{ width: '100%', minHeight: 80, padding: 8, border: '1px solid #ccc', borderRadius: 4, resize: 'vertical' }} />
            ) : (
              item.options?.map((opt, j) => (
                <label key={j} style={{ display: 'flex', alignItems: 'center', gap: 8, margin: '6px 0', fontWeight: 400 }}>
                  <input type="checkbox" /> <span style={{ color: '#1a5276' }}>{opt}</span>
                </label>
              ))
            )}
          </div>
        ))}

        <div style={{ textAlign: 'center', marginTop: 24 }}>
          <button type="submit" className="btn-main fx-slide" data-hover="Submit" style={{ cursor: 'pointer' }}><span>Submit</span></button>
        </div>
      </div>
    </div>
  );
}
