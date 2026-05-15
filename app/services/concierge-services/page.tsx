import ServicePageTemplate from '@/components/ServicePageTemplate';

export default function ConciergeServices() {
  return (
    <ServicePageTemplate
      name="Concierge Dental Services"
      introHeadline="VIP Dental Care, On Your Terms"
      introParagraph="Our concierge program offers personalized, white-glove dental care for executives, busy professionals, and patients who value privacy and convenience. From after-hours appointments to in-residence treatment, every detail is tailored to you."
      introQuote="The most personalized dental experience in NYC"
      introImage="/dental services/Concierge.jpg"
      whyChooseHeadline="Why Choose Our Concierge Service?"
      whyChooseBullets={[
        'Direct phone line to the doctor — 24/7 availability',
        'After-hours and weekend appointments available',
        'Private patient suites with discreet entry',
        'Comprehensive annual exam scheduled around your calendar',
        'Coordination with personal physician and specialists',
        'Travel-related dental coordination worldwide',
      ]}
      treatmentsHeadline="What's Included in Concierge Care"
      treatments={[
        { title: 'Annual Comprehensive Exam', desc: 'Extended diagnostic appointment with full imaging and risk assessment.' },
        { title: 'Direct Doctor Access', desc: 'Direct phone and text line to your dentist for urgent questions.' },
        { title: 'Priority Scheduling', desc: 'Same-day or next-day availability whenever you need care.' },
        { title: 'In-Residence Visits', desc: 'For select services, the dentist comes to you.' },
        { title: 'Travel Coordination', desc: 'Dental records and referrals coordinated for international trips.' },
        { title: 'Pre-Event Prep', desc: 'Whitening, bonding, and last-minute cosmetic touch-ups for important events.' },
      ]}
      faqs={[
        { q: 'How do I join the concierge program?', a: 'By private consultation. Membership is by invitation or referral, with annual fees that include comprehensive care benefits.' },
        { q: 'Is concierge dentistry only for the wealthy?', a: 'It\'s for anyone who values their time and privacy. Many busy professionals, executives, and time-conscious patients find the value compelling.' },
        { q: 'Does concierge replace insurance?', a: 'No — we still bill insurance for covered services. Concierge fees cover the premium access and coordination services.' },
        { q: 'What if I travel internationally?', a: 'We coordinate with international colleagues, arrange emergency referrals, and transfer records securely worldwide.' },
      ]}
    />
  );
}
