'use client';

import { useRef } from 'react';
import Link from 'next/link';
import Footer from '@/components/Footer';


const conditions = [
  ['Anemia', 'Allergies', 'Rheumatism'],
  ['Heart Disease', 'Sinus Problems', 'Glaucoma'],
  ['High Blood Pressure', 'Diabetes', 'Venereal Disease'],
  ['Heart Murmur', 'Blood Disease', 'Arthritis'],
  ['Stroke', 'Excessive Bleeding', 'Dizziness/ Fainting'],
  ['Artificial Joints', 'Hemophilia', 'Epilepsy/ Seizures'],
  ['Mitral Valve Prolapse', 'Cancer', 'Mental Disorders'],
  ['Rheumatic Fever', 'Growths/ Tumors', 'Nervous Disorders'],
  ['Pacemaker', 'Chemotherapy', 'Anxiety'],
  ['Heart Attack', 'Radiation Treatment', 'Depression'],
  ['Angina Pectoris', 'Hepatitis Type', 'Drug Addiction'],
  ['Blood Transfusion', 'Bruise Easily', 'Head Injuries'],
  ['Respiratory Disease', 'Ulcers', 'Cold Sores'],
  ['Tuberculosis', 'Jaundice', 'Frequent Headaches'],
  ['Asthma', 'Liver Disease', 'TMJ'],
  ['High Fever', 'Kidney Disease', 'Pain in Jaw Joints'],
];

const otherQuestions = [
  'Do you have any other health problems or conditions?',
  'Are you taking any medications at this time?',
  'Have you been admitted to a hospital or needed emergency care during the past year?',
  'Are you now under the care of a physician?',
  'Do you smoke?',
  'Have you ever taken any diet drugs such as Phen-Phen, Redux, other?',
  'Women: Are you pregnant now?',
  'Do you take any birth control medication?',
];

export default function MedicalHistoryPage() {
  const formRef = useRef<HTMLFormElement>(null);

  const handleDownload = () => {
    if (!formRef.current) return;
    const w = window.open('', '_blank');
    if (!w) return;
    w.document.write(`<html><head><title>Medical History Form</title><style>
      body{font-family:Arial,sans-serif;padding:40px;color:#1a3352}
      h1{color:#1a3352;text-align:center;margin-bottom:24px}
      h3{color:#1a3352;border-bottom:2px solid #4A7CD2;padding-bottom:6px;margin:24px 0 12px;text-transform:uppercase;letter-spacing:1.5px;font-size:15px}
      label{display:block;margin:6px 0 4px;font-weight:600;font-size:13px}
      input{width:100%;padding:8px;border:1px solid #dde3ee;border-radius:6px;margin-bottom:10px;font-size:13px}
      table{width:100%;border-collapse:collapse}
      table td{padding:6px;border-bottom:1px solid #f0f3f8;font-size:13px}
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
          backgroundImage: 'url(/office tour/8.jpeg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="container relative z-2">
          <div className="page-subheader-eyebrow" style={{ color: 'rgba(255,255,255,0.85)' }}>Patient Resources</div>
          <h1 className="page-subheader-title" style={{ color: '#fff' }}>Medical History Form</h1>
          <ul className="crumb">
            <li><Link href="/" style={{ color: 'rgba(255,255,255,0.8)' }}>Home</Link></li>
            <li><Link href="/patient-forms" style={{ color: 'rgba(255,255,255,0.8)' }}>Patient Forms</Link></li>
            <li className="active" style={{ color: '#fff' }}>Medical History</li>
          </ul>
        </div>
      </section>

      <section className="form-page-wrap">
        <div className="container">
          <form ref={formRef} className="dental-form" onSubmit={(e) => e.preventDefault()}>
            <h2 className="dental-form-title">Medical History Form</h2>

            <h3 className="dental-form-section-title">Patient Name</h3>
            <div className="dental-form-row">
              <div>
                <label className="dental-form-label">First Name</label>
                <input type="text" className="dental-form-input" placeholder="First Name" />
              </div>
              <div>
                <label className="dental-form-label">Last Name</label>
                <input type="text" className="dental-form-input" placeholder="Last Name" />
              </div>
              <div>
                <label className="dental-form-label">MI (Preferred Name)</label>
                <input type="text" className="dental-form-input" placeholder="MI(Preferred Name)" />
              </div>
            </div>

            <div className="dental-form-row">
              <div>
                <label className="dental-form-label">Gender</label>
                <input type="text" className="dental-form-input" placeholder="Enter gender" />
              </div>
              <div>
                <label className="dental-form-label">Family Status</label>
                <input type="text" className="dental-form-input" placeholder="Enter family status" />
              </div>
              <div>
                <label className="dental-form-label">SS#:</label>
                <input type="text" className="dental-form-input" placeholder="Enter SS#" />
              </div>
            </div>

            <div className="dental-form-row">
              <div>
                <label className="dental-form-label">Birth Date</label>
                <input type="date" className="dental-form-input" />
              </div>
              <div>
                <label className="dental-form-label">Home Phone / Work Phone</label>
                <input type="tel" className="dental-form-input" placeholder="e.g. 718-583-6750" />
              </div>
            </div>

            <div className="dental-form-row">
              <div>
                <label className="dental-form-label">Mobile Phone / Pager</label>
                <input type="tel" className="dental-form-input" placeholder="e.g. 718-583-6750" />
              </div>
              <div>
                <label className="dental-form-label">E-mail</label>
                <input type="email" className="dental-form-input" placeholder="Enter email" />
              </div>
            </div>

            <h3 className="dental-form-section-title">Address</h3>
            <div className="dental-form-row">
              <div><input type="text" className="dental-form-input" placeholder="Street" /></div>
              <div><input type="text" className="dental-form-input" placeholder="Apartment#" /></div>
              <div><input type="text" className="dental-form-input" placeholder="City" /></div>
              <div><input type="text" className="dental-form-input" placeholder="State" /></div>
              <div><input type="text" className="dental-form-input" placeholder="Zip Code" /></div>
            </div>

            <div className="dental-q-row" style={{ marginTop: 14 }}>
              <span className="dental-q-row-text">Any changes to your dental insurance?</span>
              <div className="dental-radio-group">
                <label><input type="radio" name="ins" /> Yes</label>
                <label><input type="radio" name="ins" /> No</label>
              </div>
            </div>

            <div className="dental-form-centered-header">Health Information</div>

            <div className="dental-q-row">
              <span className="dental-q-row-text">Are you allergic to any of the following (please check all that apply):</span>
              <div className="dental-radio-group">
                <label><input type="radio" name="allg" /> Yes</label>
                <label><input type="radio" name="allg" /> No</label>
              </div>
            </div>

            <p style={{ fontWeight: 700, color: '#1a3352', margin: '18px 0 10px', fontSize: 14 }}>
              Have you ever had any of the following? Please answer Yes or No to each question by marking the boxes below.
            </p>

            <div className="dental-conditions-grid">
              {conditions.flat().map((cond, i) => (
                <div className="dental-condition-row" key={i}>
                  <span>{cond}</span>
                  <div className="dental-radio-group">
                    <label><input type="radio" name={`c${i}`} /> Yes</label>
                    <label><input type="radio" name={`c${i}`} /> No</label>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ marginTop: 24 }}>
              {otherQuestions.map((q, i) => (
                <div className="dental-q-row" key={i}>
                  <span className="dental-q-row-text">• {q}</span>
                  <div className="dental-radio-group">
                    <label><input type="radio" name={`oq${i}`} /> Yes</label>
                    <label><input type="radio" name={`oq${i}`} /> No</label>
                  </div>
                </div>
              ))}
            </div>

            <p style={{ fontSize: 14, color: '#1a3352', marginTop: 24, lineHeight: 1.6 }}>
              To the best of my knowledge, all of the preceding answers and information provided are true and correct. If I ever have any change in my health, I will inform the doctors at the next appointment without fail.
            </p>

            <label style={{ display: 'flex', alignItems: 'flex-start', gap: 8, marginTop: 14, fontSize: 13, color: '#1a3352' }}>
              <input type="checkbox" style={{ marginTop: 4 }} />
              <span>Reviewed the medical and Dental history directly with the Patient and hereby certify that I have read and understand the above. I acknowledge that my questions, if any about the above have been answered to my satisfaction, I will not hold my dentist or any other member of their staff, responsible for any errors or omissions that I may have made in the completion of this form.</span>
            </label>

            <div className="dental-form-row" style={{ marginTop: 20 }}>
              <div>
                <label className="dental-form-label">Signature of Patient</label>
                <input type="text" className="dental-form-input" placeholder="Patient name" />
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
