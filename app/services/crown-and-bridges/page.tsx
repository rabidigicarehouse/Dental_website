import ServicePageTemplate from '@/components/ServicePageTemplate';

export default function CrownAndBridges() {
  return (
    <ServicePageTemplate
      name="Crown & Bridges"
      introHeadline="Restoring Broken Smiles, Filling Missing Gaps"
      introParagraph="Crowns rebuild damaged teeth to full strength and beauty. Bridges fill gaps left by missing teeth using crowns on neighboring teeth as anchors. Both restorations are crafted from durable, natural-looking porcelain that blends seamlessly with your smile."
      introQuote="Rebuild your bite, restore your confidence"
      introImage="/dental services/Crown And Bridges.jpg"
      whyChooseHeadline="Why Choose Our Crown & Bridge Work?"
      whyChooseBullets={[
        'Same-day crowns available with our in-house CEREC technology',
        'Premium all-ceramic materials — no dark metal edges showing',
        'Master-ceramist crafted aesthetic crowns for front teeth',
        'Precision digital impressions for a perfect fit',
        'Strong porcelain rated to last 15+ years',
        'Comprehensive warranty on all major restorations',
      ]}
      treatmentsHeadline="Crown & Bridge Services"
      treatments={[
        { title: 'All-Ceramic Crowns', desc: 'Beautiful, metal-free crowns that look and feel completely natural.' },
        { title: 'Same-Day CEREC Crowns', desc: 'Permanent crown placed in a single 90-minute visit.' },
        { title: 'Porcelain Bridges', desc: 'Replace one or more missing teeth using neighboring teeth as anchors.' },
        { title: 'Implant-Supported Bridges', desc: 'Replace multiple missing teeth using implants instead of natural teeth as anchors.' },
        { title: 'Crown Replacement', desc: 'Upgrade old metal or failing crowns with modern, natural-looking ceramic.' },
        { title: 'Front Tooth Aesthetics', desc: 'Specialized highly-aesthetic crowns and bridges for visible teeth.' },
      ]}
      faqs={[
        { q: 'How long do crowns and bridges last?', a: 'With good oral hygiene, 10–15+ years is typical. Many last 20+ years with proper care.' },
        { q: 'Will it feel like a natural tooth?', a: 'Yes. Modern crowns feel completely natural — you\'ll forget which tooth it is within a few weeks.' },
        { q: 'How long does the procedure take?', a: 'Same-day crowns: about 2 hours. Traditional crowns/bridges: typically 2 visits over 2–3 weeks.' },
        { q: 'Does insurance cover them?', a: 'Most plans cover at least a portion. We verify benefits before treatment and offer flexible payment plans for any balance.' },
      ]}
    />
  );
}
