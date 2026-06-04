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
        { q: 'What are dental crowns?', a: 'A dental crown is a cap that surrounds the tooth. Dr. Sharda Harvey, DDS typically uses a crown to restore a damaged tooth, though they can also enhance smile appearance cosmetically. Crowns come in three materials: all-metal, ceramic-on-metal, and all-ceramic. Front teeth work best with all-ceramic for natural appearance, while ceramic-on-metal crowns balance natural looks with durability.' },
        { q: 'What is a single appointment dental crown or The Lunchtime Crown?', a: 'Most restorative dental methods need multiple visits, but Upper East Dental Innovations uses CEREC technology to complete crowns in one appointment. Your crown can often be done in a single appointment, start to finish — allowing patients to restore tooth functionality and smile without obvious dental work.' },
        { q: 'What are dental bridges?', a: 'A dental bridge replaces a missing tooth without dentures or surgery. The new tooth is held by two crowns and made from ceramic or porcelain to match surrounding teeth. Dr. Sharda Harvey, DDS ensures the replacement looks and feels amazing, making this a popular patient option.' },
      ]}
    />
  );
}
