import ServicePageTemplate from '@/components/ServicePageTemplate';

export default function SedationDentistry() {
  return (
    <ServicePageTemplate
      name="Sedation Dentistry"
      introHeadline="Anxiety-Free Dental Care for Every Patient"
      introParagraph="If fear of the dentist has kept you away from care, sedation dentistry changes everything. Multiple levels of sedation — from a calming pill to deeper IV options — let you relax completely or even sleep through your treatment."
      introQuote="The care you need, without the anxiety"
      introImage="/dental services/Sedation Dentistry.webp"
      whyChooseHeadline="Why Choose Our Sedation Care?"
      whyChooseBullets={[
        'Multiple sedation levels to match your comfort needs',
        'Continuous vital-sign monitoring throughout your treatment',
        'Trained anesthesia team for the deepest sedation options',
        'A calm, welcoming environment designed for anxious patients',
        'Long appointments compressed into one sedated visit',
        'Most patients have no memory of the procedure afterward',
      ]}
      treatmentsHeadline="Sedation Options Available"
      treatments={[
        { title: 'Nitrous Oxide ("Laughing Gas")', desc: 'Mild relaxation through a nose mask. Wears off in minutes — you can drive home.' },
        { title: 'Oral Sedation', desc: 'A pill taken before your appointment that deeply relaxes you while staying conscious.' },
        { title: 'IV Sedation', desc: 'Deeper sedation administered intravenously — you\'ll likely have no memory of the procedure.' },
        { title: 'General Anesthesia', desc: 'Full unconsciousness for complex procedures, monitored by a dental anesthesiologist.' },
        { title: 'Pediatric Sedation', desc: 'Specialized sedation safe for anxious children.' },
        { title: 'Special-Needs Care', desc: 'Accommodating sedation for patients with developmental or sensory differences.' },
      ]}
      faqs={[
        { q: 'Is sedation dentistry safe?', a: 'Yes — when administered by trained professionals with proper monitoring. We follow strict safety protocols at every level.' },
        { q: 'Will I be completely asleep?', a: 'Only with general anesthesia. Most levels of sedation keep you conscious but deeply relaxed.' },
        { q: 'Will I remember the appointment?', a: 'With deeper sedation, most patients have little to no memory of the procedure — a benefit for the very anxious.' },
        { q: 'Can I drive after sedation?', a: 'After nitrous oxide, yes. After oral or IV sedation, you\'ll need a friend or family member to drive you home.' },
      ]}
    />
  );
}
