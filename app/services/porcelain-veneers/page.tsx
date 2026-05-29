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
        { q: 'How durable are porcelain veneers?', a: "Porcelain veneers are remarkably strong and can maintain their appearance and function for well over ten years with proper care. They're designed to resist stains and maintain their luster." },
        { q: 'Do veneers ruin natural teeth?', a: 'No. Veneers require minimal enamel removal and do not damage natural teeth when properly placed by an experienced dentist.' },
        { q: 'How much do veneers cost in NYC?', a: "Costs vary based on the number of veneers and individual needs. We'll provide a detailed estimate during your consultation." },
      ]}
    />
  );
}
