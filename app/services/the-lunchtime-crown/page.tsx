import ServicePageTemplate from '@/components/ServicePageTemplate';

export default function TheLunchtimeCrown() {
  return (
    <ServicePageTemplate
      name="The Lunchtime Crown"
      introHeadline="Our Signature: A Permanent Crown Over Lunch"
      introParagraph="The Lunchtime Crown is UEDI's flagship CEREC® same-visit restoration. Walk in on your lunch break, walk out with a permanent ceramic crown — designed, milled, and bonded in about 90 minutes using our in-house CAD/CAM technology."
      introQuote="A real crown, in the time it takes to grab lunch"
      introImage="/dental services/Same Day Crown.webp"
      whyChooseHeadline="Why Lunchtime Crowns Changed Everything"
      whyChooseBullets={[
        'No temporary crown that could fall off or fail',
        'No second appointment to fit into your schedule',
        'No lab wait time — your crown is milled while you wait',
        'Designed and color-matched in-office for perfect aesthetics',
        'Highly durable ceramic — clinically proven to last 10–15+ years',
        'A fully digital workflow — no goopy impressions or trays',
      ]}
      treatmentsHeadline="What Makes the Lunchtime Crown Different"
      treatments={[
        { title: '3D Optical Scanning', desc: 'A handheld camera captures your prepped tooth in high-resolution 3D.' },
        { title: 'CAD/CAM Design', desc: 'Your crown is custom-designed on screen for the perfect shape and bite.' },
        { title: 'In-House Milling', desc: 'A precision-milled ceramic crown is fabricated in our office in 15 minutes.' },
        { title: 'Same-Visit Bonding', desc: 'The finished crown is bonded permanently — you walk out finished.' },
      ]}
      faqs={[
        { q: 'What qualifies as a crown emergency?', a: 'A crown emergency includes a broken, loose, or missing crown that causes pain, sensitivity, or exposes your natural tooth.' },
        { q: 'How quickly can you fix a broken crown?', a: 'In many cases, advanced CEREC technology allows us to repair or replace your crown in a single visit.' },
        { q: 'Will I need a temporary crown?', a: 'Not usually — most patients leave with a permanent ceramic crown the same day. Temporary crowns are only used in specific cases.' },
        { q: 'How much does emergency crown repair cost?', a: 'Costs vary depending on the damage and restoration type, but our team provides transparent estimates before treatment begins.' },
      ]}
    />
  );
}
