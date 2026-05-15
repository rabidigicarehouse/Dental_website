import ServicePageTemplate from '@/components/ServicePageTemplate';

export default function HolisticDentistry() {
  return (
    <ServicePageTemplate
      name="Holistic Dentistry"
      introHeadline="Whole-Body Dental Care for Total Wellness"
      introParagraph="Holistic dentistry recognizes that your mouth and your body are deeply connected. We use biocompatible materials, mercury-safe protocols, and treatment approaches that respect the impact dental care has on your overall health and well-being."
      introQuote="Healthy mouth. Healthy body. Healthy life."
      introImage="/dental services/Holistic Dentistry.webp"
      whyChooseHeadline="Why Choose Holistic Care?"
      whyChooseBullets={[
        'Member of the Holistic Dental Association',
        'BPA-free, mercury-free composite fillings',
        'SMART protocol for safe mercury amalgam removal',
        'Biocompatibility testing available for sensitive patients',
        'Ozone therapy for cavities and infections',
        'Focus on prevention through nutrition and habit education',
      ]}
      treatmentsHeadline="Holistic Treatments We Offer"
      treatments={[
        { title: 'Mercury-Safe Removal', desc: 'SMART-protocol amalgam removal that protects you and the environment.' },
        { title: 'Biocompatible Fillings', desc: 'Mercury-free, BPA-free composites tested for individual biocompatibility.' },
        { title: 'Ozone Therapy', desc: 'Natural antimicrobial treatment for cavities, gum disease, and infections.' },
        { title: 'Fluoride-Free Care', desc: 'Alternative preventive protocols for fluoride-sensitive patients.' },
        { title: 'Materials Testing', desc: 'Pre-treatment compatibility testing for highly sensitive patients.' },
        { title: 'Nutrition Counseling', desc: 'Whole-body nutritional guidance for optimal oral and overall health.' },
      ]}
      faqs={[
        { q: 'What is holistic dentistry?', a: 'A philosophy that considers how dental treatments affect the whole body. It emphasizes biocompatible materials, mercury-safe practices, and prevention.' },
        { q: 'Are silver fillings really dangerous?', a: 'Amalgam fillings contain mercury, which off-gases over time. While the FDA considers them safe for most people, we offer mercury-free alternatives for patients who prefer them.' },
        { q: 'What is the SMART protocol?', a: 'Safe Mercury Amalgam Removal Technique — uses rubber dams, high-volume suction, and special air filters to protect you during amalgam removal.' },
        { q: 'Do you still use anesthesia?', a: 'Yes, when needed. We use safe, well-tolerated anesthetics. We can also offer minimally-invasive options when appropriate.' },
      ]}
    />
  );
}
