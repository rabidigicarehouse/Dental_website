import ServicePageTemplate from '@/components/ServicePageTemplate';

export default function DentalImplants() {
  return (
    <ServicePageTemplate
      name="Dental Implants"
      introHeadline="Permanent Tooth Replacement That Lasts a Lifetime"
      introParagraph="Dental implants are the gold standard for replacing missing teeth. A titanium post fused with your jawbone holds a custom crown that looks, feels, and functions exactly like a natural tooth — with a clinical success rate above 95%."
      introQuote="Replace your missing tooth permanently — and never look back"
      introImage="/dental services/Dental Implants.jpg"
      whyChooseHeadline="Why Choose Us for Implants?"
      whyChooseBullets={[
        'Surgical placement and crown restoration under one roof',
        '3D CBCT imaging for surgical precision and predictable outcomes',
        'Computer-guided implant surgery for the safest placement',
        'Premium implant systems with proven 25+ year track records',
        'Sedation options available for the most comfortable experience',
        'Step-by-step transparency on cost, timeline, and recovery',
      ]}
      treatmentsHeadline="Implant Services We Offer"
      treatments={[
        { title: 'Single Tooth Implant', desc: 'Replace one missing tooth with a permanent solution that doesn\'t affect neighboring teeth.' },
        { title: 'Multiple Implants', desc: 'Replace several missing teeth without bridges or partial dentures.' },
        { title: 'All-on-4® Implants', desc: 'A full arch of teeth supported by just 4 strategically-placed implants.' },
        { title: 'Implant-Supported Dentures', desc: 'Secure, non-slipping dentures anchored by 2–4 implants.' },
        { title: 'Same-Day Implants', desc: 'Immediate provisional teeth on the same day as your implant placement.' },
        { title: 'Bone Grafting', desc: 'Rebuild jawbone before implant placement when needed.' },
      ]}
      faqs={[
        { q: 'How long do dental implants last?', a: 'With proper care, dental implants can last 25+ years — often a lifetime. They have a 95%+ success rate.' },
        { q: 'Is implant surgery painful?', a: 'Surprisingly, most patients report less discomfort than a tooth extraction. Local anesthesia and sedation are both available.' },
        { q: 'How long does the whole process take?', a: 'From placement to final crown: typically 3–6 months. Same-day options exist for some cases.' },
        { q: 'Am I a candidate for implants?', a: 'Most adults with good oral health are candidates. A 3D scan during consultation tells us for sure.' },
      ]}
    />
  );
}
