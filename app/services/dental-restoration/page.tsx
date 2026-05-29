import ServicePageTemplate from '@/components/ServicePageTemplate';

export default function DentalRestoration() {
  return (
    <ServicePageTemplate
      name="Dental Restoration"
      introHeadline="Bringing Damaged Teeth Back to Health"
      introParagraph="Whether it's a chipped tooth, a deep cavity, or a worn-down bite, our restorative dentistry brings damaged teeth back to full function and beauty. Modern materials and techniques mean restorations look completely natural and last for years."
      introQuote="Rebuilding smiles, restoring confidence"
      introImage="/dental services/Dental Restorations.jpg"
      whyChooseHeadline="Why Choose Our Restoration Services?"
      whyChooseBullets={[
        'Tooth-colored fillings that blend invisibly with your teeth',
        'Mercury-free, BPA-free composite materials',
        'Conservative techniques that preserve maximum natural tooth',
        'Same-day CEREC restorations for crowns, inlays, and onlays',
        'Comprehensive treatment planning for complex cases',
        'Long-term warranty on major restorations',
      ]}
      treatmentsHeadline="Restoration Treatments"
      treatments={[
        { title: 'Composite Fillings', desc: 'Mercury-free tooth-colored fillings that bond directly to the tooth.' },
        { title: 'Inlays & Onlays', desc: 'Durable porcelain restorations for teeth too damaged for fillings.' },
        { title: 'Crowns', desc: 'Full-coverage restorations for severely damaged or weakened teeth.' },
        { title: 'Bonding', desc: 'Quick, affordable cosmetic repair for chips and minor damage.' },
        { title: 'Tooth Replacement', desc: 'Bridges, implants, and dentures for missing teeth.' },
        { title: 'Bite Restoration', desc: 'Comprehensive treatment for worn or collapsed bites.' },
      ]}
      faqs={[
        { q: 'Why are dental restorations a necessity?', a: 'Patients frequently need tooth repairs due to accidents like car wrecks, sports injuries, or falls. It is important to fix the tooth right away — otherwise, discomfort or other problems can develop.' },
        { q: 'What are the various types of dental restorations?', a: 'We offer customized treatment plans based on individual patient needs rather than one-size-fits-all solutions. Common restorations include dental veneers, tooth-colored fillings, bondings, dental bridges, and dental implants.' },
      ]}
    />
  );
}
