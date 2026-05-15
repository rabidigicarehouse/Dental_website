import ServicePageTemplate from '@/components/ServicePageTemplate';

export default function DenturesAndPartial() {
  return (
    <ServicePageTemplate
      name="Dentures & Partial"
      introHeadline="Comfortable, Natural-Looking Replacement Teeth"
      introParagraph="Modern dentures look and feel dramatically more natural than those of even a decade ago. From traditional full dentures to implant-secured options, we craft replacements that fit comfortably, function reliably, and restore your confident smile."
      introQuote="Eat, smile, and laugh with confidence again"
      introImage="/dental services/Dentures and Partial.webp"
      whyChooseHeadline="Why Choose Our Denture Care?"
      whyChooseBullets={[
        'Custom-fitted dentures designed for maximum comfort',
        'Premium materials that resist staining and breakage',
        'Natural-looking teeth selected to match your facial features',
        'Implant-supported options for non-slipping security',
        'Smooth adjustment process with multiple fittings included',
        'Long-term care with relines and repairs as needed',
      ]}
      treatmentsHeadline="Denture Options We Offer"
      treatments={[
        { title: 'Full Dentures', desc: 'Complete upper or lower replacement when all teeth are missing.' },
        { title: 'Partial Dentures', desc: 'Replace several missing teeth while preserving healthy remaining ones.' },
        { title: 'Implant-Supported Dentures', desc: 'Secure, non-slipping dentures anchored by 2–4 dental implants.' },
        { title: 'All-on-4® Dentures', desc: 'A full arch of fixed teeth supported by just 4 implants.' },
        { title: 'Same-Day Dentures', desc: 'Walk in with missing teeth, walk out with a beautiful smile.' },
        { title: 'Denture Repair & Relining', desc: 'Restore the fit and comfort of older dentures.' },
      ]}
      faqs={[
        { q: 'How long does it take to get used to dentures?', a: 'Most patients adjust within 2–4 weeks. Eating and speaking become natural very quickly.' },
        { q: 'Will dentures slip when I talk or eat?', a: 'Traditional dentures can slip; implant-supported options are completely secure. We\'ll discuss the right fit for you.' },
        { q: 'How long do dentures last?', a: 'Quality dentures last 5–10 years before needing replacement. Implant-supported options last much longer.' },
        { q: 'Are implant-supported dentures worth it?', a: 'For most patients, absolutely. They\'re secure, look more natural, and preserve jawbone — a major long-term benefit.' },
      ]}
    />
  );
}
