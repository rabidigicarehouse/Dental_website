'use client';
import { useRef } from 'react';

export default function PatientFormPage() {
  const formRef = useRef<HTMLDivElement>(null);

  const handleDownload = () => {
    const printWindow = window.open('', '_blank');
    if (!printWindow || !formRef.current) return;
    printWindow.document.write(`<html><head><title>Patient Form</title><style>
      body{font-family:Arial,sans-serif;padding:40px;color:#333}
      h1{color:#1a5276;text-align:center;margin-bottom:30px}
      h3{color:#1a5276;margin:24px 0 12px;border-bottom:2px solid #1a5276;padding-bottom:6px}
      label{display:block;margin:8px 0 4px;font-weight:600;font-size:14px}
      input,select,textarea{width:100%;padding:8px;border:1px solid #ccc;border-radius:4px;margin-bottom:10px;font-size:14px}
      .row{display:flex;gap:16px}.row>div{flex:1}
      .radio-group{display:flex;gap:16px;margin:8px 0}
      .radio-group label{font-weight:400;display:flex;align-items:center;gap:4px}
      @media print{button{display:none!important}}
    </style></head><body>${formRef.current.innerHTML}</body></html>`);
    printWindow.document.close();
    printWindow.print();
  };

  return (
    <div className="container" style={{ maxWidth: 900 }}>
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 20 }}>
        <button onClick={handleDownload} className="btn-main fx-slide" data-hover="Download PDF" style={{ cursor: 'pointer' }}>
          <span>⬇ Download PDF</span>
        </button>
      </div>

      <div ref={formRef} style={{ background: '#f5f5f5', borderRadius: 16, padding: '40px 48px', boxShadow: '0 4px 24px rgba(0,0,0,0.08)' }}>
        <h1 style={{ color: '#1a5276', textAlign: 'center', marginBottom: 30 }}>Patient Form</h1>

        <h3 style={{ color: '#1a5276', borderBottom: '2px solid #1a5276', paddingBottom: 6 }}>Patient Information</h3>
        <div style={{ display: 'flex', gap: 16 }}>
          <div style={{ flex: 1 }}><label>First Name</label><input type="text" placeholder="First Name" /></div>
          <div style={{ flex: 1 }}><label>Last Name</label><input type="text" placeholder="Last Name" /></div>
          <div style={{ flex: 1 }}><label>MI (Preferred Name)</label><input type="text" placeholder="MI(Preferred Name)" /></div>
        </div>
        <div style={{ display: 'flex', gap: 16 }}>
          <div style={{ flex: 1 }}><label>Gender</label><input type="text" placeholder="Enter gender" /></div>
          <div style={{ flex: 1 }}><label>Family Status</label><input type="text" placeholder="Enter family status" /></div>
          <div style={{ flex: 1 }}><label>SS#</label><input type="text" placeholder="Enter SS#" /></div>
        </div>
        <div style={{ display: 'flex', gap: 16 }}>
          <div style={{ flex: 1 }}><label>Birth Date</label><input type="date" /></div>
          <div style={{ flex: 1 }}><label>Home Phone/Work Phone</label><input type="tel" placeholder="e.g. 718-583-6750" /></div>
        </div>
        <div style={{ display: 'flex', gap: 16 }}>
          <div style={{ flex: 1 }}><label>Mobile Phone / Pager</label><input type="tel" placeholder="e.g. 718-583-6750" /></div>
          <div style={{ flex: 1 }}><label>E-mail</label><input type="email" placeholder="Enter email" /></div>
        </div>

        <label>Address</label>
        <div style={{ display: 'flex', gap: 12 }}>
          <input type="text" placeholder="Street" style={{ flex: 2 }} />
          <input type="text" placeholder="Apartment#" style={{ flex: 1 }} />
          <input type="text" placeholder="City" style={{ flex: 1 }} />
          <input type="text" placeholder="State" style={{ flex: 1 }} />
          <input type="text" placeholder="Zip Code" style={{ flex: 1 }} />
        </div>

        <div style={{ margin: '12px 0' }}>
          <span style={{ fontWeight: 600 }}>Any changes to your dental insurance?</span>
          <label style={{ display: 'inline', marginLeft: 12 }}><input type="radio" name="insurance" /> Yes</label>
          <label style={{ display: 'inline', marginLeft: 12 }}><input type="radio" name="insurance" /> No</label>
        </div>

        <h3 style={{ color: '#1a5276', borderBottom: '2px solid #1a5276', paddingBottom: 6, marginTop: 30 }}>Dental Insurance Information</h3>
        <div style={{ display: 'flex', gap: 16 }}>
          <div style={{ flex: 1 }}><label>Insurance Company</label><input type="text" placeholder="Enter company name" /></div>
          <div style={{ flex: 1 }}><label>Policy Number</label><input type="text" placeholder="Enter policy number" /></div>
        </div>
        <div style={{ display: 'flex', gap: 16 }}>
          <div style={{ flex: 1 }}><label>Group Number</label><input type="text" placeholder="Enter group number" /></div>
          <div style={{ flex: 1 }}><label>Subscriber Name</label><input type="text" placeholder="Enter subscriber name" /></div>
        </div>

        <h3 style={{ color: '#1a5276', borderBottom: '2px solid #1a5276', paddingBottom: 6, marginTop: 30 }}>Emergency Contact</h3>
        <div style={{ display: 'flex', gap: 16 }}>
          <div style={{ flex: 1 }}><label>Contact Name</label><input type="text" placeholder="Emergency contact name" /></div>
          <div style={{ flex: 1 }}><label>Phone</label><input type="tel" placeholder="Contact phone number" /></div>
          <div style={{ flex: 1 }}><label>Relationship</label><input type="text" placeholder="Relationship to patient" /></div>
        </div>

        <h3 style={{ color: '#1a5276', borderBottom: '2px solid #1a5276', paddingBottom: 6, marginTop: 30 }}>Responsible Party</h3>
        <div style={{ display: 'flex', gap: 16 }}>
          <div style={{ flex: 1 }}><label>Full Name</label><input type="text" placeholder="Full name" /></div>
          <div style={{ flex: 1 }}><label>Relationship</label><input type="text" placeholder="Relationship" /></div>
        </div>
        <div style={{ display: 'flex', gap: 16 }}>
          <div style={{ flex: 1 }}><label>Phone</label><input type="tel" placeholder="Phone" /></div>
          <div style={{ flex: 1 }}><label>Address</label><input type="text" placeholder="Address" /></div>
        </div>

        <h3 style={{ color: '#1a5276', borderBottom: '2px solid #1a5276', paddingBottom: 6, marginTop: 30 }}>How Did You Hear About Us?</h3>
        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
          {['Internet', 'Insurance Plan', 'Friend/Relative', 'Doctor Referral', 'Walk-by', 'Other'].map(o => (
            <label key={o} style={{ display: 'flex', alignItems: 'center', gap: 4 }}><input type="checkbox" /> {o}</label>
          ))}
        </div>

        <label style={{ marginTop: 20 }}>Signature of Patient</label>
        <input type="text" placeholder="Patient name" />

        <div style={{ textAlign: 'center', marginTop: 24 }}>
          <button type="submit" className="btn-main fx-slide" data-hover="Submit" style={{ cursor: 'pointer' }}><span>Submit</span></button>
        </div>
      </div>
    </div>
  );
}
