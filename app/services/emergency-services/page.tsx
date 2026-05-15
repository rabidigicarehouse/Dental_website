import ServicePageTemplate from '@/components/ServicePageTemplate';

export default function EmergencyServices() {
  return (
    <ServicePageTemplate
      name="Emergency Dental Services"
      introHeadline="Same-Day Relief When You Need It Most"
      introParagraph="Dental emergencies can't wait. Whether you've broken a tooth, lost a filling, are in severe pain, or have suffered an injury, we offer same-day emergency care. Call us immediately at 212.697.1701 and we'll get you in quickly."
      introQuote="Call us at 212.697.1701 — same-day care guaranteed"
      introImage="/dental services/Emergency Crown.jpg"
      whyChooseHeadline="Why Choose Our Emergency Care?"
      whyChooseBullets={[
        'Same-day appointments — most cases seen within hours',
        'After-hours phone consultation with the doctor',
        'Full range of emergency procedures performed in-office',
        'Sedation available when severe pain or anxiety is involved',
        '3D imaging in-office for fast, accurate diagnosis',
        'Insurance coordination even for emergency visits',
      ]}
      treatmentsHeadline="Emergency Treatments We Provide"
      treatments={[
        { title: 'Severe Tooth Pain', desc: 'Diagnosis and immediate relief — often through root canal therapy.' },
        { title: 'Broken / Chipped Tooth', desc: 'Same-day repair using bonding, crowns, or emergency restorations.' },
        { title: 'Knocked-Out Tooth', desc: 'Re-implantation when possible — every minute matters, so call immediately.' },
        { title: 'Lost Filling or Crown', desc: 'Quick replacement to protect the underlying tooth structure.' },
        { title: 'Dental Abscess', desc: 'Urgent drainage and antibiotics for dangerous infections.' },
        { title: 'Trauma & Injury', desc: 'Comprehensive treatment for accidents involving teeth, lips, or gums.' },
      ]}
      faqs={[
        { q: 'What counts as a dental emergency?', a: 'Severe pain, swelling, bleeding that won\'t stop, knocked-out or fractured teeth, dental abscess, or trauma. When in doubt, call us.' },
        { q: 'What should I do for a knocked-out tooth?', a: 'Pick it up by the crown (not the root), rinse gently with water, try to reinsert it, or store in milk. Call us immediately — re-implantation success drops every minute.' },
        { q: 'How fast can I be seen?', a: 'Same-day always. Severe cases are seen within 1–2 hours of your call.' },
        { q: 'Does insurance cover emergency visits?', a: 'Most plans cover emergency exams and many treatments. We verify benefits before you arrive and offer payment plans for any balance.' },
      ]}
    />
  );
}
