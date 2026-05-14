import ServicePageTemplate from '@/components/ServicePageTemplate';

export default function PreventiveDentistry() {
  return (
    <ServicePageTemplate
      name="Preventive Dentistry"
      introHeadline="Stop Problems Before They Start"
      introParagraph="The best dental care is the kind you never need. Our preventive dentistry program focuses on stopping problems before they start — saving you discomfort, time, and money over a lifetime of healthy smiles."
      introQuote="An ounce of prevention is worth a pound of cure"
      introImage="/dental services/Teeth Whitening.webp"
      whyChooseHeadline="Why Choose Our Preventive Services?"
      whyChooseBullets={[
        'Thorough exams with high-resolution digital imaging',
        'Personalized hygiene plans based on your specific risk factors',
        'Early detection of cavities, gum disease, and oral cancer',
        'Patient education with at-home care tips that actually work',
        'Modern tools like intraoral cameras for transparent diagnosis',
        'Pediatric and adult specialists under one roof',
        'Insurance pre-verification so you know costs upfront',
      ]}
      treatmentsHeadline="Preventive Treatments We Offer"
      treatments={[
        { title: 'Comprehensive Exams', desc: 'Full dental, gum, and oral cancer evaluation every 6 months.' },
        { title: 'Hygiene Cleanings', desc: 'Professional cleanings to remove plaque, tartar and stains gently.' },
        { title: 'Deep Cleanings', desc: 'Scaling and root planing for early gum disease before it advances.' },
        { title: 'Fluoride Treatments', desc: 'Strengthen enamel and reverse early decay with topical fluoride.' },
        { title: 'Dental Sealants', desc: 'Thin protective coatings that block cavity-causing bacteria on molars.' },
        { title: 'Oral Cancer Screening', desc: 'Quick, painless screening at every checkup for early detection.' },
        { title: 'Night Guards', desc: 'Custom guards that protect your teeth from grinding and clenching damage.' },
        { title: 'Nutrition Counseling', desc: 'Diet advice that supports strong teeth and healthy gums.' },
      ]}
      faqs={[
        { q: 'How often should I get my teeth professionally cleaned?', a: 'Every 6 months for most patients. Those with gum disease or other risk factors may need cleanings every 3–4 months.' },
        { q: 'Are dental sealants only for kids?', a: 'Sealants are most effective on children’s molars, but adults at high risk for cavities can also benefit from them.' },
        { q: 'How do I know if I have gum disease?', a: 'Early signs include red, swollen, or bleeding gums when brushing. We screen for it at every cleaning.' },
        { q: 'Is oral cancer screening necessary?', a: 'Absolutely. Early-detected oral cancer has an 80%+ survival rate, but late-stage detection drops it significantly. We screen every visit.' },
        { q: 'Do I need fluoride if my water already has it?', a: 'Topical fluoride from professional treatments is far more concentrated than tap water and provides extra protection for at-risk teeth.' },
      ]}
    />
  );
}
