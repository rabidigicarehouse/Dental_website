import ServicePageTemplate from '@/components/ServicePageTemplate';

export default function PeriodontalGumDisease() {
  return (
    <ServicePageTemplate
      name="Periodontal Gum Disease"
      introHeadline="Save Your Smile from Silent, Progressive Gum Disease"
      introParagraph="Gum disease is the #1 cause of adult tooth loss — and most people don't know they have it until it's advanced. From early gingivitis to severe periodontitis, we offer the full spectrum of treatments, including the latest laser and minimally invasive techniques."
      introQuote="Healthy gums are the foundation of every great smile"
      introImage="/dental services/Periodontal Gum Disease.jpg"
      whyChooseHeadline="Why Choose Our Periodontal Care?"
      whyChooseBullets={[
        'Comprehensive evaluation with 6-point pocket measurement',
        'Earliest-possible intervention for the best outcomes',
        'LANAP® laser therapy — proven to regenerate lost tissue',
        'Pinhole® and traditional grafting for recession',
        'Connection between gum health and overall body health emphasized',
        'Long-term maintenance program to keep disease from returning',
      ]}
      treatmentsHeadline="Gum Disease Treatments"
      treatments={[
        { title: 'Scaling & Root Planing', desc: 'Deep cleaning below the gum line to remove plaque, tartar, and bacteria.' },
        { title: 'LANAP® Laser Therapy', desc: 'FDA-cleared laser treatment that regenerates lost bone and tissue.' },
        { title: 'Pinhole® Recession Repair', desc: 'Minimally invasive correction for receding gums.' },
        { title: 'Gum Grafting', desc: 'Traditional grafting for complex recession or thin gum tissue.' },
        { title: 'Periodontal Maintenance', desc: 'Specialized 3–4 month cleanings to maintain gum health long-term.' },
        { title: 'Antibiotic Therapy', desc: 'Targeted antimicrobials placed directly into gum pockets for severe cases.' },
      ]}
      faqs={[
        { q: 'How do I know if I have gum disease?', a: 'Early signs: bleeding when brushing, persistent bad breath, red/swollen gums. Later signs: receding gums, loose teeth. We screen at every visit.' },
        { q: 'Can gum disease be reversed?', a: 'Gingivitis (early stage) is fully reversible. Periodontitis can be stopped and stabilized, with some regeneration possible through LANAP and other techniques.' },
        { q: 'Is gum disease linked to other health problems?', a: 'Yes — strongly linked to heart disease, diabetes, stroke, and pregnancy complications. Treating gum disease benefits whole-body health.' },
        { q: 'How often do I need periodontal maintenance?', a: 'Most patients with treated gum disease benefit from cleanings every 3–4 months rather than every 6 months.' },
      ]}
    />
  );
}
