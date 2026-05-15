import ServicePageTemplate from '@/components/ServicePageTemplate';

export default function FamilyDentistry() {
  return (
    <ServicePageTemplate
      name="Family Dentistry"
      introHeadline="Comprehensive Dental Care for Every Member of Your Family"
      introParagraph="From your toddler's first checkup to grandma's denture adjustment, we provide expert care for patients of every age — all under one warm, welcoming roof. One trusted office for your entire family's smile."
      introQuote="One trusted home for your whole family's smiles"
      introImage="/dental services/Family Dentistry.jpg"
      whyChooseHeadline="Why Choose Us for Family Care?"
      whyChooseBullets={[
        'One office for every age — toddlers to seniors',
        'Pediatric specialists trained in child behavior management',
        'Family scheduling — book multiple appointments back-to-back',
        'Health-history continuity across generations',
        'Insurance coordination for the whole family',
        'Patient and kid-friendly team that treats you like family',
      ]}
      treatmentsHeadline="Family Treatments We Offer"
      treatments={[
        { title: 'Children\'s Dentistry', desc: 'Gentle, fun visits that build positive lifelong dental habits.' },
        { title: 'Teen Care', desc: 'Orthodontics, sealants, and cosmetic prep tailored to teenagers.' },
        { title: 'Adult Care', desc: 'Preventive, restorative, and cosmetic care for working adults.' },
        { title: 'Senior Dentistry', desc: 'Specialized care including dentures, implants, and dry-mouth management.' },
        { title: 'Family Cleanings', desc: 'Routine cleanings tailored to each family member\'s needs.' },
        { title: 'Emergency Care', desc: 'Same-day care for unexpected dental problems for any family member.' },
      ]}
      faqs={[
        { q: 'What ages do you treat?', a: 'All ages — from a baby\'s first tooth (around age 1) to grandparents in their 90s.' },
        { q: 'Can my family book appointments together?', a: 'Yes! We love family blocks. Call ahead and we\'ll schedule everyone in consecutive appointments.' },
        { q: 'Do you accept multiple insurance plans?', a: 'Yes — we accept most major insurance plans and can coordinate benefits across family members.' },
        { q: 'How early should kids start coming?', a: 'By age 1 or within 6 months of their first tooth. Early visits prevent problems and build trust.' },
      ]}
    />
  );
}
