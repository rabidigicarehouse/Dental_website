'use client';

import { useRef } from 'react';
import Link from 'next/link';
import Footer from '@/components/Footer';


export default function PatientFormPage() {
  const formRef = useRef<HTMLFormElement>(null);

  const handleDownload = () => {
    if (!formRef.current) return;
    const w = window.open('', '_blank');
    if (!w) return;
    w.document.write(`<html><head><title>Patient Form</title><style>
      body{font-family:Arial,sans-serif;padding:40px;color:#1a3352}
      h1{color:#1a3352;text-align:center;margin-bottom:24px}
      h3{color:#1a3352;border-bottom:2px solid #4A7CD2;padding-bottom:6px;margin:24px 0 12px;text-transform:uppercase;letter-spacing:1.5px;font-size:15px}
      label{display:block;margin:6px 0 4px;font-weight:600;font-size:13px}
      input,select,textarea{width:100%;padding:8px;border:1px solid #dde3ee;border-radius:6px;margin-bottom:10px;font-size:13px}
      .row{display:flex;gap:16px}.row>div{flex:1}
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
          backgroundImage: 'url(/office tour/1.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="container relative z-2">
          <div className="page-subheader-eyebrow" style={{ color: 'rgba(255,255,255,0.85)' }}>Patient Resources</div>
          <h1 className="page-subheader-title" style={{ color: '#fff' }}>Patient Form</h1>
          <ul className="crumb">
            <li><Link href="/" style={{ color: 'rgba(255,255,255,0.8)' }}>Home</Link></li>
            <li><Link href="/patient-forms" style={{ color: 'rgba(255,255,255,0.8)' }}>Patient Forms</Link></li>
            <li className="active" style={{ color: '#fff' }}>Patient Form</li>
          </ul>
        </div>
      </section>

      <section className="form-page-wrap">
        <div className="container">
          <form ref={formRef} className="dental-form" onSubmit={(e) => e.preventDefault()}>
            <h2 className="dental-form-title">Patient Form</h2>

            {/* Personal info */}
            <div className="dental-form-row">
              <div>
                <label className="dental-form-label">First Name</label>
                <input type="text" className="dental-form-input" placeholder="First Name" />
              </div>
              <div>
                <label className="dental-form-label">Last Name</label>
                <input type="text" className="dental-form-input" placeholder="Last Name" />
              </div>
            </div>

            <div className="dental-form-row">
              <div>
                <label className="dental-form-label">Which gender do you identify with?</label>
                <div className="dental-radio-group">
                  <label><input type="radio" name="gender" /> Male</label>
                  <label><input type="radio" name="gender" /> Female</label>
                  <label><input type="radio" name="gender" /> Other</label>
                </div>
              </div>
            </div>

            <div className="dental-form-row">
              <div>
                <label className="dental-form-label">Address</label>
                <input type="text" className="dental-form-input" placeholder="Street Address" />
              </div>
            </div>

            <div className="dental-form-row">
              <div>
                <label className="dental-form-label">City</label>
                <input type="text" className="dental-form-input" placeholder="City" />
              </div>
              <div>
                <label className="dental-form-label">State</label>
                <select className="dental-form-select" defaultValue="">
                  <option value="" disabled>Choose…</option>
                  <option>NY</option><option>NJ</option><option>CT</option>
                </select>
              </div>
              <div>
                <label className="dental-form-label">Zip</label>
                <input type="text" className="dental-form-input" placeholder="Zip" />
              </div>
            </div>

            <div className="dental-form-row">
              <div>
                <label className="dental-form-label">Telephone (Home)</label>
                <input type="tel" className="dental-form-input" placeholder="718-xxxxxxx" />
              </div>
              <div>
                <label className="dental-form-label">Telephone (Work)</label>
                <input type="tel" className="dental-form-input" placeholder="718-xxxxxxx" />
              </div>
              <div>
                <label className="dental-form-label">Telephone (Cell)</label>
                <input type="tel" className="dental-form-input" placeholder="718-xxxxxxx" />
              </div>
            </div>

            <div className="dental-form-row">
              <div>
                <label className="dental-form-label">Email Address</label>
                <input type="email" className="dental-form-input" />
              </div>
            </div>

            <div className="dental-form-row">
              <div>
                <label className="dental-form-label">Marital Status</label>
                <div className="dental-radio-group">
                  <label><input type="radio" name="marital" /> Single</label>
                  <label><input type="radio" name="marital" /> Married</label>
                  <label><input type="radio" name="marital" /> Divorced</label>
                  <label><input type="radio" name="marital" /> Widowed</label>
                  <label><input type="radio" name="marital" /> Other</label>
                </div>
              </div>
            </div>

            <div className="dental-form-row">
              <div>
                <label className="dental-form-label">Date of Birth</label>
                <input type="date" className="dental-form-input" />
              </div>
              <div>
                <label className="dental-form-label">Age</label>
                <input type="number" className="dental-form-input" />
              </div>
              <div>
                <label className="dental-form-label">S.S #</label>
                <input type="text" className="dental-form-input" placeholder="xxx-xx-xxxx" />
              </div>
            </div>

            <div className="dental-form-row">
              <div>
                <label className="dental-form-label">Company Name &amp; Address</label>
                <input type="text" className="dental-form-input" />
              </div>
            </div>

            <div className="dental-form-row">
              <div>
                <label className="dental-form-label">Occupation</label>
                <input type="text" className="dental-form-input" />
              </div>
            </div>

            <div className="dental-form-row">
              <div>
                <label className="dental-form-label">Preferred Appointment Days</label>
                <input type="text" className="dental-form-input" placeholder="sat, sun, mon" />
              </div>
              <div>
                <label className="dental-form-label">Time</label>
                <input type="time" className="dental-form-input" />
              </div>
              <div>
                <label className="dental-form-label">Referred By</label>
                <input type="text" className="dental-form-input" />
              </div>
            </div>

            <div className="dental-form-row">
              <div>
                <label className="dental-form-label">In Case of Emergency, Contact</label>
                <input type="text" className="dental-form-input" />
              </div>
              <div>
                <label className="dental-form-label">Telephone</label>
                <input type="tel" className="dental-form-input" placeholder="929-xxxxxxx" />
              </div>
            </div>

            <div className="dental-form-row">
              <div>
                <label className="dental-form-label">Name of Last Dentist</label>
                <input type="text" className="dental-form-input" />
              </div>
              <div>
                <label className="dental-form-label">Telephone</label>
                <input type="tel" className="dental-form-input" placeholder="929-xxxxxxx" />
              </div>
            </div>

            <div className="dental-form-row">
              <div>
                <label className="dental-form-label">Date of Last Dental Examination</label>
                <input type="date" className="dental-form-input" />
              </div>
              <div>
                <label className="dental-form-label">Date of Last Series of Full Mouth X-Rays</label>
                <input type="date" className="dental-form-input" />
              </div>
            </div>

            {/* General health questions */}
            <h3 className="dental-form-section-title">General Health</h3>

            {[
              'Are you in good health?',
              'Has there been any change in your general health within the past five years?',
              'Do your gums bleed when you brush?',
              'Are you happy with your Smile?',
              'Do you smoke cigarettes, cigars, or pipes?',
              'Are you interested in whitening your teeth?',
              'Do you have any problem eating certain foods?',
              'Do you have sensitivity to hot or cold foods?',
              'Have you ever been Pre-Medicated with antibiotics before any dental treatment?',
              'Have you had orthodontics?',
            ].map((q, i) => (
              <div className="dental-q-row" key={i}>
                <span className="dental-q-row-text">{q}</span>
                <div className="dental-radio-group">
                  <label><input type="radio" name={`gh${i}`} /> Yes</label>
                  <label><input type="radio" name={`gh${i}`} /> No</label>
                </div>
              </div>
            ))}

            <div className="dental-form-row" style={{ marginTop: 18 }}>
              <div>
                <label className="dental-form-label">List ALL hospitalizations and serious illnesses</label>
                <textarea className="dental-form-textarea" />
              </div>
              <div>
                <label className="dental-form-label">Date</label>
                <input type="date" className="dental-form-input" />
              </div>
            </div>

            {/* Conditions checklist */}
            <h3 className="dental-form-section-title">Do you have or ever had any of the following?</h3>
            <div className="dental-conditions-grid">
              {[
                'Diabetes', 'Tuberculosis', 'Swollen Ankles', 'Thyroid Problems', 'Psychiatric treatment',
                'High Blood Pressure', 'Recent increase in thirst', 'Arthritis or Rheumatism',
                'AIDS, ARC, HIV Infection', 'Prosthetic or Artificial joint',
                'Recent increase in urination', 'Prosthetic or Artificial heart valve',
                'Kidney trouble or Renal Dialysis', 'Irregular heartbeat or pacemaker',
                'Stroke, seizures, or convulsions', 'Hepatitis, liver disease, or jaundice',
                'Hearing or vision problems', 'Persistent cough or coughing up blood',
                'Venereal disease/ Syphilis/ Gonorrhea', 'Enlarged lymph nodes or swollen glands',
                'Stomach ulcers or stomach problems', 'Shortness of breath after mild exercise',
                'Asthma, emphysema, or difficulty breathing', 'Heart attack, angina, or other heart disease',
                'Diagnosed with a Heart Murmur/Mitral Valve?', 'Autoimmune disease or lupus erythematosus',
                'Rheumatic Fever or Rheumatic Heart Disease', 'Cancer, radiation treatment, or chemotherapy',
                'Blood disorder, bleeding tendency or frequent bruising',
              ].map((cond, i) => (
                <div className="dental-condition-row" key={i}>
                  <span>{cond}</span>
                  <input type="checkbox" />
                </div>
              ))}
            </div>

            <h3 className="dental-form-section-title">Allergies &amp; Medications</h3>

            {[
              ['Do you have any allergies?', 'allg'],
              ['Have you ever taken penicillin?', 'pen'],
              ['Have you ever had a bad reaction to any drug or medication?', 'rxn'],
            ].map(([q, n]) => (
              <div className="dental-q-row" key={n}>
                <span className="dental-q-row-text">{q}</span>
                <div className="dental-radio-group">
                  <label><input type="radio" name={n} /> Yes</label>
                  <label><input type="radio" name={n} /> No</label>
                </div>
              </div>
            ))}

            <div className="dental-form-row" style={{ marginTop: 14 }}>
              <div>
                <label className="dental-form-label">What type of drug or medication?</label>
                <div className="dental-radio-group">
                  <label><input type="checkbox" /> Penicillin or other antibiotic</label>
                  <label><input type="checkbox" /> Aspirin</label>
                  <label><input type="checkbox" /> Dental anesthetic</label>
                  <label><input type="checkbox" /> Codeine or other narcotics</label>
                  <label><input type="checkbox" /> Other</label>
                </div>
              </div>
            </div>

            <div className="dental-form-row">
              <div>
                <label className="dental-form-label">(WOMEN ONLY) Are you pregnant?</label>
                <div className="dental-radio-group">
                  <label><input type="radio" name="preg" /> Yes</label>
                  <label><input type="radio" name="preg" /> No</label>
                </div>
              </div>
              <div>
                <label className="dental-form-label">Are you under the care of a physician?</label>
                <div className="dental-radio-group">
                  <label><input type="radio" name="phys" /> Yes</label>
                  <label><input type="radio" name="phys" /> No</label>
                </div>
              </div>
            </div>

            <h3 className="dental-form-section-title">Personal Dental Needs Survey</h3>

            <div className="dental-q-row">
              <span className="dental-q-row-text">Would you like to have Nitrous Sedation for your dental treatment(s)?</span>
              <div className="dental-radio-group">
                <label><input type="radio" name="nitro" /> Yes</label>
                <label><input type="radio" name="nitro" /> No</label>
              </div>
            </div>

            <p className="dental-form-hint" style={{ marginTop: 16 }}>
              Please rate on a scale of 1–5 the importance of each of the following regarding your dental care (5 most important).
            </p>

            <div className="dental-form-row">
              <div>
                <label className="dental-form-label">Preventive dental health care</label>
                <input type="number" min={1} max={5} className="dental-form-input" />
              </div>
              <div>
                <label className="dental-form-label">Excellence and quality of service</label>
                <input type="number" min={1} max={5} className="dental-form-input" />
              </div>
            </div>
            <div className="dental-form-row">
              <div>
                <label className="dental-form-label">Freedom from pain</label>
                <input type="number" min={1} max={5} className="dental-form-input" />
              </div>
              <div>
                <label className="dental-form-label">Cost and Affordability</label>
                <input type="number" min={1} max={5} className="dental-form-input" />
              </div>
            </div>

            <div className="dental-form-row">
              <div>
                <label className="dental-form-label">Other</label>
                <input type="text" className="dental-form-input" />
              </div>
            </div>

            <h3 className="dental-form-section-title">Signature</h3>
            <div className="dental-form-row">
              <div>
                <label className="dental-form-label">Patient/Guardian Signature</label>
                <input type="text" className="dental-form-input" placeholder="Your name" />
              </div>
              <div>
                <label className="dental-form-label">Date</label>
                <input type="date" className="dental-form-input" />
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
