import ServicePageTemplate from '@/components/ServicePageTemplate';

export default function GeneralDentistry() {
  return (
    <ServicePageTemplate
      name="General Dentistry"
      introHeadline="Complete Oral Care for Every Smile"
      introParagraph="Our general dentistry services form the foundation of lifelong oral health. From routine cleanings and exams to fillings and preventive care, we keep your smile healthy, strong, and beautiful at every stage of life."
      introQuote="A healthy smile starts with great everyday care"
      introImage="/dental services/Family Dentistry.jpg"
      whyChooseHeadline="Why Choose Our General Dental Services?"
      whyChooseBullets={[
        'Comprehensive exams using the latest digital imaging technology',
        'Gentle hygienists who make every cleaning a comfortable experience',
        'Tooth-colored fillings that blend seamlessly with your natural teeth',
        'Patient education so you understand every step of your treatment',
        'Same-day care available for many common dental needs',
        'A warm, welcoming team that treats you like family',
        'Insurance verification and flexible payment options',
      ]}
      treatmentsHeadline="General Treatments We Offer"
      treatments={[
        { title: 'Routine Checkups', desc: 'Comprehensive exams every six months to catch issues early and keep your smile healthy.' },
        { title: 'Professional Cleanings', desc: 'Deep, gentle cleanings that remove plaque and tartar build-up your toothbrush can’t reach.' },
        { title: 'Tooth-Colored Fillings', desc: 'Mercury-free composite fillings that match your tooth color for a natural look.' },
        { title: 'Digital X-Rays', desc: 'Low-radiation digital imaging that gives us a complete view of your oral health.' },
        { title: 'Oral Cancer Screening', desc: 'Quick, painless screening at every checkup for early detection and peace of mind.' },
        { title: 'Fluoride Treatment', desc: 'Strengthen enamel and prevent decay with a quick, comfortable fluoride application.' },
        { title: 'Dental Sealants', desc: 'A protective coating on molars to prevent cavities in hard-to-clean grooves.' },
        { title: 'Custom Mouthguards', desc: 'Sport guards and night guards crafted to protect your teeth from grinding or impact.' },
      ]}
      faqs={[
        { q: 'How often should I visit the dentist?', a: 'It’s recommended to see your dentist every 6 months for a routine check-up and cleaning, unless advised otherwise.' },
        { q: 'Are dental X-rays safe?', a: 'Yes. Our digital X-rays use up to 90% less radiation than traditional film, and we only take them when necessary.' },
        { q: 'What should I do in a dental emergency?', a: 'Call our office immediately. We offer same-day emergency care for issues like severe pain, broken teeth, or swelling.' },
        { q: 'Do you accept insurance?', a: 'Yes, we accept most major dental insurance plans and will help verify your benefits before your visit.' },
        { q: 'Do you treat children?', a: 'Absolutely! Our friendly team welcomes patients of all ages, from toddlers to seniors.' },
      ]}
    />
  );
}
