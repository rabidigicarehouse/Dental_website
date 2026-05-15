import ServicePageTemplate from '@/components/ServicePageTemplate';

export default function PorcelainVeneers() {
  return (
    <ServicePageTemplate
      name="Porcelain Veneers"
      introHeadline="Hand-Crafted Smiles That Look Perfectly Natural"
      introParagraph="Porcelain veneers are ultra-thin shells custom-crafted to cover the front of your teeth. They correct chips, gaps, stains, and shape issues — delivering a beautiful, natural-looking smile that can last decades with proper care."
      introQuote="The smile you've always imagined, made real"
      introImage="/dental services/Porcelain Veneers.jpg"
      whyChooseHeadline="Why Choose Our Veneers?"
      whyChooseBullets={[
        'Artistic eye honed through years of cosmetic case experience',
        'Custom shade matching that respects your natural facial harmony',
        'Premium porcelain that mimics enamel\'s translucency exactly',
        'Digital smile design — preview your new smile before treatment',
        'Mock-up try-in so you approve the look before anything is permanent',
        'Bonded with techniques that maximize longevity',
      ]}
      treatmentsHeadline="Veneer Services We Offer"
      treatments={[
        { title: 'Traditional Porcelain Veneers', desc: 'Premium long-lasting veneers crafted by master ceramists for flawless results.' },
        { title: 'No-Prep Veneers', desc: 'Ultra-thin veneers that require little to no enamel removal — fully reversible.' },
        { title: 'Smile Makeover Sets', desc: 'Coordinated 6 to 12-veneer designs for a complete smile transformation.' },
        { title: 'Single Veneer Repair', desc: 'Cosmetic correction for one or two teeth that don\'t match the rest.' },
      ]}
      faqs={[
        { q: 'How long do porcelain veneers last?', a: 'With proper care, premium porcelain veneers typically last 10–20+ years.' },
        { q: 'Are veneers reversible?', a: 'Traditional veneers require minor enamel removal, so they are considered permanent. No-prep veneers are fully reversible.' },
        { q: 'How many appointments does it take?', a: 'Usually 2–3 visits: consultation/design, prep + temporaries, then placement of final veneers.' },
        { q: 'Do veneers stain?', a: 'Porcelain is highly stain-resistant — far more than natural enamel. They maintain their color beautifully over time.' },
      ]}
    />
  );
}
