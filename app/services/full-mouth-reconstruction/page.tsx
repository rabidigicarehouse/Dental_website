import ServicePageTemplate from '@/components/ServicePageTemplate';

export default function FullMouthReconstruction() {
  return (
    <ServicePageTemplate
      name="Full-Mouth Reconstruction"
      introHeadline="Comprehensive Rebuilds for Severely Damaged Smiles"
      introParagraph="Full-mouth reconstruction combines multiple restorative and cosmetic procedures into one coordinated treatment plan. Whether from wear, accident, or years of neglect, we can rebuild your entire smile to optimal function and beauty."
      introQuote="A complete transformation, planned around your goals"
      introImage="/dental services/Restorative dentistry.webp"
      whyChooseHeadline="Why Choose Us for Full-Mouth Work?"
      whyChooseBullets={[
        'Comprehensive treatment planning with 3D imaging and bite analysis',
        'Master clinician with extensive complex case experience',
        'Sedation options for longer appointments',
        'Step-by-step phasing so treatment fits your timeline and budget',
        'Coordination with specialists when complex cases require it',
        'Long-term warranties on major restorations',
      ]}
      treatmentsHeadline="What Full-Mouth Reconstruction May Include"
      treatments={[
        { title: 'Multiple Crowns', desc: 'Rebuild worn or damaged teeth to proper shape and bite.' },
        { title: 'Veneers Sets', desc: 'Aesthetic transformation for visible teeth.' },
        { title: 'Dental Implants', desc: 'Replace missing teeth with permanent, natural-feeling implants.' },
        { title: 'Bite Reconstruction', desc: 'Restore lost vertical dimension and correct improper bite relationships.' },
        { title: 'TMJ Therapy', desc: 'Address jaw joint issues that often accompany severe wear.' },
        { title: 'Periodontal Care', desc: 'Treat underlying gum disease before rebuilding the smile above.' },
      ]}
      faqs={[
        { q: 'How long does full-mouth reconstruction take?', a: 'Typically 6 months to over a year depending on case complexity and which procedures are involved.' },
        { q: 'How much does it cost?', a: 'Costs vary widely. We provide detailed estimates after diagnosis, with phased payment options.' },
        { q: 'Will my insurance cover it?', a: 'Insurance typically covers some restorative components. We help maximize benefits and offer financing for the balance.' },
        { q: 'How will I look during treatment?', a: 'You\'ll always leave with provisional restorations — you\'re never without a complete smile.' },
      ]}
    />
  );
}
