import ServicePageTemplate from '@/components/ServicePageTemplate';

export default function StemCellDentistry() {
  return (
    <ServicePageTemplate
      name="Stem Cell Dentistry"
      introHeadline="Banking Your Child's Dental Stem Cells for Future Health"
      introParagraph="Baby teeth and wisdom teeth contain valuable stem cells. We partner with leading stem cell banks to safely collect and preserve these cells — providing your family with a potential lifesaving health resource for future regenerative medicine."
      introQuote="A simple step today, a powerful health investment for tomorrow"
      introImage="/dental services/Stem Cell Dentistry.jpg"
      whyChooseHeadline="Why Choose Dental Stem Cell Banking?"
      whyChooseBullets={[
        'Painless collection from teeth that would be discarded anyway',
        'Ideal source — teeth contain mesenchymal stem cells (MSCs)',
        'Partnered with leading FDA-registered stem cell banks',
        'Available for baby teeth and wisdom teeth extractions',
        'Cells remain viable for decades when properly stored',
        'Coordination with extraction appointment — no extra visit',
      ]}
      treatmentsHeadline="Our Stem Cell Process"
      treatments={[
        { title: 'Eligibility Consultation', desc: 'We evaluate the tooth and confirm it\'s suitable for stem cell harvesting.' },
        { title: 'Collection Kit', desc: 'A sterile shipping kit is prepared and ready for your tooth-extraction appointment.' },
        { title: 'Same-Visit Extraction', desc: 'Tooth is removed and immediately placed in transport media.' },
        { title: 'Express Shipping', desc: 'Same-day pickup and overnight shipping to the storage facility.' },
        { title: 'Long-Term Storage', desc: 'Cells are processed and cryopreserved at a top tissue bank.' },
        { title: 'Health Records', desc: 'You receive certification documents for your family\'s permanent records.' },
      ]}
      faqs={[
        { q: 'Why bank dental stem cells?', a: 'Stem cells from teeth are being studied for many regenerative therapies including diabetes, spinal cord injury, and cardiac repair. Banking them preserves the option for future use.' },
        { q: 'Which teeth can be banked?', a: 'Healthy baby teeth (especially those with intact roots) and wisdom teeth being extracted for any reason are excellent candidates.' },
        { q: 'How much does it cost?', a: 'Collection during an extraction visit is minimal. Long-term storage fees are paid to the partner stem cell bank — typically $1,500–$3,000 plus annual fees.' },
        { q: 'Is this an established science?', a: 'Dental stem cell harvesting is well-established. Therapies using these cells are emerging — banking now preserves them for current and future therapies.' },
      ]}
    />
  );
}
