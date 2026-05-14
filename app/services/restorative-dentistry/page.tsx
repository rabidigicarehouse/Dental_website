import ServicePageTemplate from '@/components/ServicePageTemplate';

export default function RestorativeDentistry() {
  return (
    <ServicePageTemplate
      name="Restorative Dentistry"
      introHeadline="Bringing Damaged Smiles Back to Life"
      introParagraph="From a single chipped tooth to full-mouth reconstruction, restorative dentistry rebuilds the function, comfort and beauty of your smile. Our advanced techniques deliver results that look natural and last for decades."
      introQuote="Renewing function, restoring confidence"
      introImage="/dental services/Restorative dentistry.webp"
      whyChooseHeadline="Why Choose Our Restorative Services?"
      whyChooseBullets={[
        'Same-day crowns with our in-house CEREC technology',
        'Implant placement and restoration under one roof',
        '3D imaging for surgical precision and predictable outcomes',
        'Natural-looking, metal-free materials that match your tooth color',
        'Comfortable sedation options for longer procedures',
        'Step-by-step treatment plans tailored to your timeline and budget',
        'Long-term warranties on major restorations',
      ]}
      treatmentsHeadline="Restorative Treatments We Offer"
      treatments={[
        { title: 'Dental Implants', desc: 'Permanent tooth replacement that looks, feels and functions just like a real tooth.' },
        { title: 'Same-Day Crowns', desc: 'CEREC technology lets us design and place a permanent crown in a single visit.' },
        { title: 'Crowns & Bridges', desc: 'Restore broken teeth or fill gaps with strong, beautiful porcelain restorations.' },
        { title: 'Dentures & Partials', desc: 'Comfortable, secure dentures custom-fitted for a natural look and feel.' },
        { title: 'Root Canal Therapy', desc: 'Save a damaged tooth from extraction with modern, comfortable root canal treatment.' },
        { title: 'Tooth Bonding', desc: 'Quickly repair chips, cracks and minor damage with tooth-colored composite resin.' },
        { title: 'Full-Mouth Reconstruction', desc: 'Comprehensive rebuilding of severely damaged or worn dentition.' },
        { title: 'Inlays & Onlays', desc: 'Durable, conservative restorations for teeth too damaged for fillings.' },
      ]}
      faqs={[
        { q: 'How long do dental implants last?', a: 'With proper care, dental implants can last 25+ years and often a lifetime. They have a success rate above 95%.' },
        { q: 'How long does a same-day crown take?', a: 'About 1.5–2 hours from start to finish. You walk out with a permanent crown in place — no second visit needed.' },
        { q: 'Are implants painful?', a: 'Surprisingly, most patients report less discomfort than a tooth extraction. We use local anesthesia and offer sedation when needed.' },
        { q: 'How long do crowns and bridges last?', a: 'High-quality porcelain crowns and bridges typically last 10–15 years with good oral hygiene and regular checkups.' },
        { q: 'Will insurance cover restorative work?', a: 'Most plans cover a portion of restorative treatments. We verify benefits in advance and offer payment plans for the balance.' },
      ]}
    />
  );
}
