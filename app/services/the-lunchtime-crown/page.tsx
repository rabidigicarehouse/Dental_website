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
        { q: 'How quickly can I eat after?', a: 'Right away — the crown is permanently bonded before you leave the office.' },
        { q: 'How do Lunchtime Crowns compare to lab-made crowns?', a: 'Clinically equivalent in durability. Many studies show comparable or better long-term outcomes.' },
        { q: 'Are there cases where it\'s NOT recommended?', a: 'Most cases work perfectly. Complex aesthetic cases on front teeth may still benefit from custom lab work.' },
        { q: 'Is the price different than a traditional crown?', a: 'Pricing is comparable, and most insurance plans cover it the same way as a traditional crown.' },
      ]}
    />
  );
}
