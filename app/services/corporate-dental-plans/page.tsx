import ServicePageTemplate from '@/components/ServicePageTemplate';

export default function CorporateDentalPlans() {
  return (
    <ServicePageTemplate
      name="Corporate Dental Plans"
      introHeadline="Dental care programs built for modern teams."
      introParagraph="Upper East Dental Innovations partners with businesses, founders, executive teams, and workplace wellness coordinators to create polished dental care plans that make premium oral healthcare easier to access. Each program can be shaped around preventive visits, cosmetic consultations, emergency access, restorative care, and concierge scheduling support."
      introQuote="A refined dental benefit for teams that value health, confidence, and convenience."
      introImage="/dental services/corporate.webp"
      heroImage="/heading_background/about.jpg"
      whyChooseHeadline="Why Choose Our Corporate Dental Plans?"
      whyChooseBullets={[
        'Custom plan design for small teams, executive groups, and workplace wellness programs',
        'Preventive, cosmetic, restorative, and emergency care options under one trusted practice',
        'Concierge scheduling support to reduce friction for busy professionals',
        'Optional smile confidence services such as whitening and Invisalign consultations',
        'Clear communication with your coordinator so employees know how to access care',
      ]}
      treatmentsHeadline="Corporate Plan Options"
      treatments={[
        {
          title: 'Preventive Wellness Packages',
          desc: 'Routine cleanings, exams, digital imaging, and oral health guidance designed to keep teams healthy and proactive.',
        },
        {
          title: 'Executive Smile Programs',
          desc: 'Cosmetic consultations, whitening, Invisalign evaluation, veneers planning, and priority appointment coordination.',
        },
        {
          title: 'Emergency Access Support',
          desc: 'A practical pathway for employees who need help with sudden pain, broken teeth, swelling, or urgent dental concerns.',
        },
        {
          title: 'Restorative Care Coordination',
          desc: 'Guided access to crowns, bridges, implants, dental restorations, and full-mouth reconstruction planning when needed.',
        },
      ]}
      faqs={[
        {
          q: 'Can a corporate dental plan be customized?',
          a: 'Yes. Corporate dental plans are tailored around your team size, scheduling needs, and the services you want to prioritize.',
        },
        {
          q: 'Do you support executive or founder-focused plans?',
          a: 'Yes. We can help design elevated programs for executives, founders, and busy professionals who need discreet scheduling and premium care access.',
        },
        {
          q: 'How does a company get started?',
          a: 'Contact Upper East Dental Innovations at 212.697.1701 or request a consultation so the team can discuss your goals and recommend a suitable plan structure.',
        },
      ]}
    />
  );
}
