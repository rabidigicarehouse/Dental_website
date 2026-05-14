'use client';
import { useRef } from 'react';

const conditions = [
  ['Anemia','Allergies','Rheumatism'],
  ['Heart Disease','Sinus Problems','Glaucoma'],
  ['High Blood Pressure','Diabetes','Venereal Disease'],
  ['Heart Murmur','Blood Disease','Arthritis'],
  ['Stroke','Excessive Bleeding','Dizziness/Fainting'],
  ['Artificial Joints','Hemophilia','Epilepsy/Seizures'],
  ['Mitral Valve Prolapse','Cancer','Mental Disorders'],
  ['Rheumatic Fever','Growths/Tumors','Nervous Disorders'],
  ['Pacemaker','Chemotherapy','Anxiety'],
  ['Heart Attack','Radiation Treatment','Depression'],
  ['Angina Pectoris','Hepatitis Type','Drug Addiction'],
  ['Blood Transfusion','Bruise Easily','Head Injuries'],
  ['Respiratory Disease','Ulcers','Cold Sores'],
  ['Tuberculosis','Jaundice','Frequent Headaches'],
  ['Asthma','Liver Disease','TMJ'],
  ['High Fever','Kidney Disease','Pain in Jaw Joints'],
];

export default function MedicalHistoryPage() {
  const formRef = useRef<HTMLDivElement>(null);

  const handleDownload = () => {
    const pw = window.open('', '_blank');
    if (!pw || !formRef.current) return;
    pw.document.write(`<html><head><title>Medical History Form</title><style>
      body{font-family:Arial,sans-serif;padding:40px;color:#333;font-size:13px}
      h1{color:#1a5276;text-align:center;margin-bottom:30px}
      h3{color:#1a5276;margin:20px 0 10px;text-align:center;font-size:18px}
      label{font-weight:600;font-size:13px}
      input{padding:6px;border:1px solid #ccc;border-radius:4px;font-size:13px}
      .row{display:flex;gap:12px}.row>div{flex:1}
      table{width:100%;border-collapse:collapse;margin:12px 0}
      td{padding:4px 8px;font-size:13px}
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
        <h1 style={{ color: '#1a5276', textAlign: 'center', marginBottom: 30 }}>Medical History Form</h1>

        <h3 style={{ color: '#1a5276', borderBottom: '2px solid #1a5276', paddingBottom: 6 }}>Patient Name</h3>
        <div style={{ display: 'flex', gap: 16 }}>
          <div style={{ flex: 1 }}><label>First Name</label><input type="text" placeholder="First Name" style={{ width: '100%', padding: 8 }} /></div>
          <div style={{ flex: 1 }}><label>Last Name</label><input type="text" placeholder="Last Name" style={{ width: '100%', padding: 8 }} /></div>
          <div style={{ flex: 1 }}><label>MI(Preferred Name)</label><input type="text" placeholder="MI(Preferred Name)" style={{ width: '100%', padding: 8 }} /></div>
        </div>

        <div style={{ display: 'flex', gap: 16, marginTop: 12 }}>
          <div style={{ flex: 1 }}><label>Gender</label><input type="text" placeholder="Enter gender" style={{ width: '100%', padding: 8 }} /></div>
          <div style={{ flex: 1 }}><label>Family Status</label><input type="text" placeholder="Enter family status" style={{ width: '100%', padding: 8 }} /></div>
          <div style={{ flex: 1 }}><label>SS#:</label><input type="text" placeholder="Enter SS#" style={{ width: '100%', padding: 8 }} /></div>
        </div>

        <div style={{ display: 'flex', gap: 16, marginTop: 12 }}>
          <div style={{ flex: 1 }}><label>Birth Date</label><input type="date" style={{ width: '100%', padding: 8 }} /></div>
          <div style={{ flex: 1 }}><label>Home Phone/Work Phone</label><input type="tel" placeholder="e.g. 718-583-6750" style={{ width: '100%', padding: 8 }} /></div>
        </div>

        <div style={{ display: 'flex', gap: 16, marginTop: 12 }}>
          <div style={{ flex: 1 }}><label>Mobile Phone / Pager</label><input type="tel" placeholder="e.g. 718-583-6750" style={{ width: '100%', padding: 8 }} /></div>
          <div style={{ flex: 1 }}><label>E-mail</label><input type="email" placeholder="Enter email" style={{ width: '100%', padding: 8 }} /></div>
        </div>

        <label style={{ display: 'block', marginTop: 12 }}>Address</label>
        <div style={{ display: 'flex', gap: 10 }}>
          <input type="text" placeholder="Street" style={{ flex: 2, padding: 8 }} />
          <input type="text" placeholder="Apartment#" style={{ flex: 1, padding: 8 }} />
          <input type="text" placeholder="City" style={{ flex: 1, padding: 8 }} />
          <input type="text" placeholder="State" style={{ flex: 1, padding: 8 }} />
          <input type="text" placeholder="Zip Code" style={{ flex: 1, padding: 8 }} />
        </div>

        <div style={{ margin: '12px 0' }}>
          <span style={{ fontWeight: 600 }}>Any changes to your dental insurance?</span>
          <label style={{ marginLeft: 12 }}><input type="radio" name="insurance" /> Yes</label>
          <label style={{ marginLeft: 12 }}><input type="radio" name="insurance" /> No</label>
        </div>

        <h3 style={{ color: '#1a5276', textAlign: 'center', marginTop: 30, fontSize: 20, fontWeight: 700 }}>HEALTH INFORMATION</h3>

        <ul style={{ listStyle: 'disc', paddingLeft: 20, margin: '12px 0' }}>
          <li><span style={{ color: '#1a5276' }}>Are you allergic to any of the following (please check all that apply):</span>
            <label style={{ marginLeft: 12 }}><input type="radio" name="allergic" /> Yes</label>
            <label style={{ marginLeft: 8 }}><input type="radio" name="allergic" /> No</label>
          </li>
        </ul>

        <p style={{ fontWeight: 700, fontStyle: 'italic', margin: '16px 0 12px' }}>
          Have you ever had any of the following? Please answer Yes or No to each question by marking the boxes below.
        </p>

        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <tbody>
            {conditions.map((row, i) => (
              <tr key={i}>
                {row.map((cond, j) => (
                  <td key={j} style={{ padding: '3px 0', fontSize: 13 }}>
                    <span style={{ color: '#1a5276' }}>{cond}</span>
                    <label style={{ marginLeft: 8 }}><input type="radio" name={`cond-${i}-${j}`} /> Yes</label>
                    <label style={{ marginLeft: 4 }}><input type="radio" name={`cond-${i}-${j}`} /> <span style={{ color: 'red' }}>No</span></label>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>

        <ul style={{ listStyle: 'disc', paddingLeft: 20, marginTop: 16, lineHeight: 2.2 }}>
          {[
            'Do you have any other health problems or conditions?',
            'Are you taking any medications at this time?',
            'Have you been admitted to a hospital or needed emergency care during the past year?',
            'Are you now under the care of a physician?',
            'Do you smoke?',
            'Have you ever taken any diet drugs such as Phen-Phen, Redux, other?',
            'Women: Are you pregnant now?',
            'Do you take any birth control medication?',
          ].map((q, i) => (
            <li key={i}>
              <span style={{ color: '#1a5276' }}>{q}</span>
              <label style={{ marginLeft: 12 }}><input type="radio" name={`q-${i}`} /> Yes</label>
              <label style={{ marginLeft: 8 }}><input type="radio" name={`q-${i}`} /> No</label>
            </li>
          ))}
        </ul>

        <p style={{ fontStyle: 'italic', marginTop: 20, fontSize: 13, color: '#1a5276' }}>
          To the best of my knowledge, all of the preceding answers and information provided are true and correct. If I ever have any change in my health, I will inform the doctors at the next appointment without fail.
        </p>

        <div style={{ marginTop: 12, padding: 12, border: '1px solid #ccc', borderRadius: 8, fontSize: 13 }}>
          <label><input type="checkbox" /> Reviewed the medical and Dental history directly with the Patient and hereby certify that I have read and understand the above. I acknowledge that my questions, if any about the above have been answered to my satisfaction. I will not hold my dentist or any other member of their staff, responsible for any errors or omission that I may have made in the completion of this form.</label>
        </div>

        <label style={{ display: 'block', marginTop: 20, fontWeight: 700 }}>Signature of Patient</label>
        <input type="text" placeholder="Patient name" style={{ width: '50%', padding: 8, marginTop: 4 }} />

        <div style={{ textAlign: 'center', marginTop: 24 }}>
          <button type="submit" className="btn-main fx-slide" data-hover="Submit" style={{ cursor: 'pointer' }}><span>Submit</span></button>
        </div>
      </div>
    </div>
  );
}
