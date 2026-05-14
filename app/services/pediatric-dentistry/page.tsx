import ServicePageTemplate from '@/components/ServicePageTemplate';

export default function PediatricDentistry() {
  return (
    <ServicePageTemplate
      name="Pediatric Dentistry"
      introHeadline="Gentle Care for Growing Smiles"
      introParagraph="Your child’s first dental experiences shape their relationship with oral health for life. Our pediatric dentistry focuses on creating positive, fun, and educational visits that build lifelong healthy habits."
      introQuote="A happy child today is a confident smiler tomorrow"
      introImage="/dental services/Pediatric Dentistry.webp"
      whyChooseHeadline="Why Choose Our Pediatric Dental Services?"
      whyChooseBullets={[
        'A kid-friendly clinic designed to feel safe and welcoming',
        'Patient, gentle hygienists trained in child behavior management',
        'Show-tell-do approach so kids understand what’s happening',
        'Early prevention focus to avoid pain and major procedures later',
        'Nutritional counseling and home-care tips for parents',
        'Special needs accommodation with extra time and care',
        'Movies, headphones, and small prizes to make visits fun',
      ]}
      treatmentsHeadline="Pediatric Treatments We Offer"
      treatments={[
        { title: 'First Dental Visit', desc: 'A gentle, no-pressure introduction so your child loves the dentist from day one.' },
        { title: 'Kids Cleanings', desc: 'Quick, comfortable cleanings tailored to small mouths and short attention spans.' },
        { title: 'Cavity Prevention', desc: 'Sealants and fluoride that stop cavities before they start in tiny teeth.' },
        { title: 'Tooth-Colored Fillings', desc: 'Safe, mercury-free fillings that match your child’s natural tooth color.' },
        { title: 'Mouth Habit Counseling', desc: 'Help with thumb sucking, pacifier use and tongue thrust before they affect development.' },
        { title: 'Sport Mouthguards', desc: 'Custom-fitted mouthguards that protect young athletes from sports injuries.' },
        { title: 'Early Orthodontic Eval', desc: 'Catch alignment issues by age 7 — early intervention often means simpler treatment later.' },
        { title: 'Special Needs Care', desc: 'Patient, accommodating care for children with sensory or developmental needs.' },
      ]}
      faqs={[
        { q: 'When should my child have their first dental visit?', a: 'We recommend the first visit by age 1, or within 6 months of their first tooth coming in. Early visits prevent problems and build trust.' },
        { q: 'How often should kids visit the dentist?', a: 'Every 6 months for a routine cleaning and exam — same as adults — to monitor growth and catch issues early.' },
        { q: 'Are dental X-rays safe for children?', a: 'Yes. We use digital X-rays with very low radiation, lead aprons, and only when truly necessary for diagnosis.' },
        { q: 'My child is scared of the dentist — how do you handle that?', a: 'We specialize in anxious kids! We use show-tell-do, kid-friendly language, and never rush. Most kids leave smiling.' },
        { q: 'Do you accept pediatric insurance?', a: 'Yes — we accept most major insurance plans including those covering children, and we’ll verify benefits before your visit.' },
      ]}
    />
  );
}
