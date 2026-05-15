import ServicePageTemplate from '@/components/ServicePageTemplate';

export default function TeethWhitening() {
  return (
    <ServicePageTemplate
      name="Teeth Whitening"
      introHeadline="A Brighter, More Confident Smile"
      introParagraph="Professional whitening is the safest, fastest way to dramatically brighten your smile. We use medical-grade gels and customized trays to deliver shades of improvement that store-bought kits can't match — with sensitivity protection built in."
      introQuote="A whiter smile in a single visit"
      introImage="/dental services/Teeth Whitening.webp"
      whyChooseHeadline="Why Choose Our Whitening?"
      whyChooseBullets={[
        'Medical-grade whitening gels not available over the counter',
        'In-office Zoom! whitening for instant 6–8 shade improvement',
        'Custom-fitted take-home trays for ongoing maintenance',
        'Desensitizing pre-treatment to eliminate zingers',
        'Beautiful, natural-looking results — never that "fake-white" look',
        'Touch-up gels available for easy long-term upkeep',
      ]}
      treatmentsHeadline="Whitening Options We Offer"
      treatments={[
        { title: 'In-Office Whitening', desc: 'Dramatic results in under an hour using professional-strength gel and LED activation.' },
        { title: 'Take-Home Trays', desc: 'Custom-fitted trays + medical-grade gel for whitening on your schedule.' },
        { title: 'Combo Treatment', desc: 'Start in-office, maintain at home for the deepest, longest-lasting results.' },
        { title: 'Sensitivity Whitening', desc: 'Gentler formulations and pre-treatment for patients with sensitive teeth.' },
      ]}
      faqs={[
        { q: 'How white will my teeth get?', a: 'Most patients see 6–8 shades of improvement with in-office whitening. Results vary based on starting shade and the cause of staining.' },
        { q: 'Is professional whitening safe?', a: 'Yes — when administered by a dentist, professional whitening is the safest option available. We protect your gums and monitor sensitivity throughout.' },
        { q: 'How long do whitening results last?', a: '1–3 years on average, depending on diet, smoking habits, and oral hygiene. Touch-ups easily extend the result.' },
        { q: 'Will whitening damage my enamel?', a: 'No. Professional whitening gels are pH-balanced and won\'t harm enamel when used as directed.' },
      ]}
    />
  );
}
