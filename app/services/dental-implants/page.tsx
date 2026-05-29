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
        { q: 'How much do dental implants cost in NYC?', a: "Costs depend on the number of implants, materials used, and your treatment plan. During your consultation, we'll provide a detailed estimate to help you make an informed decision." },
        { q: 'Is the implant surgery painful?', a: 'No. The procedure is done under local anesthesia to minimize discomfort. Most patients experience only slight soreness afterward, which can be easily managed with over-the-counter medication.' },
        { q: 'How long does it take to heal?', a: 'Healing typically takes several months, as the implant fuses with your jawbone before the crown placement. The exact duration depends on individual healing and oral health.' },
        { q: 'Are there alternatives to implants?', a: 'Yes. While options such as dental bridges and dentures are available, implants provide the most durable, secure, and natural-looking outcome.' },
      ]}
    />
  );
}
