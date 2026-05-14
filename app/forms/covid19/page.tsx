'use client';
import { useRef } from 'react';

export default function Covid19FormPage() {
  const formRef = useRef<HTMLDivElement>(null);

  const handleDownload = () => {
    const pw = window.open('', '_blank');
    if (!pw || !formRef.current) return;
    pw.document.write(`<html><head><title>COVID-19 Emergency Consent</title><style>
      body{font-family:Arial,sans-serif;padding:40px;color:#333;font-size:14px;line-height:1.7}
      h1{color:#1a5276;text-align:center;margin-bottom:30px}
      ul{margin:12px 0 12px 20px}
      li{margin:4px 0;color:#1a5276}
      input{padding:6px;border:1px solid #ccc;border-radius:4px}
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

      <div ref={formRef} style={{ background: '#f5f5f5', borderRadius: 16, padding: '40px 48px', boxShadow: '0 4px 24px rgba(0,0,0,0.08)', lineHeight: 1.8 }}>
        <h1 style={{ color: '#1a5276', textAlign: 'center', marginBottom: 30 }}>COVID-19 Emergency Consent for Treatment</h1>

        <p>
          I, <input type="text" placeholder="Your Name" style={{ width: 300, padding: '4px 8px', borderBottom: '1px solid #333', border: 'none', borderRadius: 0, background: 'transparent' }} /> (patient or guardian) knowingly and willingly consent to have emergency dental treatment for during the COVID-19 pandemic.
        </p>

        <p style={{ color: '#1a5276' }}>
          I understand the COVID-19 virus has a long incubation period during which carriers of the virus may not show symptoms, and still be highly contagious. It is impossible to determine who has it and who does not, given the current limits in virus testing.
        </p>

        <p style={{ color: '#1a5276' }}>
          Dental procedures create water spray (aerosols) which is how the disease is spread. The ultra-fine nature of the spray can linger in the air for minutes to sometimes hours, which can transmit the COVID-19 virus.
        </p>

        <ul style={{ listStyle: 'disc', paddingLeft: 24 }}>
          <li>
            I understand that due to the frequency of visits of other patients, the characteristics of the virus, and the characteristics of dental procedures, that I have an elevated risk of contracting the virus simply by being in a dental office.
            <span style={{ marginLeft: 20 }}>(Initial) <input type="text" style={{ width: 100, padding: '2px 6px' }} /></span>
          </li>
          <li>
            I have been made aware of the NY state of emergency, CDS, and ADA guidelines that under the current pandemic all non-urgent dental care is not recommended. Dental visits should be limited to the treatment of pain, infection, conditions that significantly inhibit normal function of teeth and mouth, and issues that may cause anything listed above in the next 3-6 months. I confirm I am seeking treatment for a condition that meets these criteria.
            <span style={{ marginLeft: 20 }}>(Initial) <input type="text" style={{ width: 100, padding: '2px 6px' }} /></span>
          </li>
        </ul>

        <p>
          I consent to having my temperature taken, and confirm that I am not presenting any of the following symptoms of COVID-19 listed below:
          <span style={{ marginLeft: 20 }}>(Initial) <input type="text" style={{ width: 100, padding: '2px 6px' }} /></span>
        </p>

        <ul style={{ listStyle: 'disc', paddingLeft: 24 }}>
          {['Fever', 'Shortness of breath', 'Dry cough', 'Runny nose', 'Sore throat'].map(s => (
            <li key={s} style={{ color: '#1a5276', fontWeight: 600 }}>{s}</li>
          ))}
        </ul>

        <p style={{ color: '#1a5276' }}>
          As a precondition to rendering treatment, I have not within the past 14 days travelled in a commercial airline, been in close proximity (less than 6 feet proximity) at a gathering of 10 or more persons, or have had close contact with a person who has confirmed positive or suspected to be positive for COVID-19.
        </p>

        <p>I consent to the proposed treatment by my dentist</p>

        <div style={{ margin: '16px 0' }}>
          <span style={{ color: '#1a5276' }}>Have you tested positive for COVID -19 ?</span>
          <label style={{ marginLeft: 16 }}><input type="radio" name="covid-positive" /> Yes</label>
          <label style={{ marginLeft: 12 }}><input type="radio" name="covid-positive" /> No</label>
        </div>

        <div style={{ marginTop: 20 }}>
          <span style={{ fontWeight: 700 }}>Signature (Patient or Guardian)</span>
          <input type="text" placeholder="Enter Name" style={{ marginLeft: 12, width: 300, padding: '4px 8px', borderBottom: '1px solid #333', border: 'none', borderRadius: 0, background: 'transparent' }} />
        </div>

        <div style={{ textAlign: 'center', marginTop: 30 }}>
          <button type="submit" className="btn-main fx-slide" data-hover="Submit" style={{ cursor: 'pointer' }}><span>Submit</span></button>
        </div>
      </div>
    </div>
  );
}
