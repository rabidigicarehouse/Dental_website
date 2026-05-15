import ServicePageTemplate from '@/components/ServicePageTemplate';

export default function TeleDentistry() {
  return (
    <ServicePageTemplate
      name="Tele-Dentistry"
      introHeadline="Expert Dental Care from Anywhere"
      introParagraph="Tele-dentistry brings the doctor to you — wherever you are. From travel emergencies to second opinions to follow-up consults, our secure video platform connects you with the doctor on demand. Quick advice, simple prescriptions, and peace of mind from your phone."
      introQuote="See the doctor from your couch, hotel, or office"
      introImage="/dental services/Tele-Dentistry On Demand.jpg"
      whyChooseHeadline="Why Choose Tele-Dentistry?"
      whyChooseBullets={[
        'Secure HIPAA-compliant video platform',
        'Same-day appointments available',
        'Convenient for travel, vacation, or busy schedules',
        'Effective for many common dental questions',
        'Prescriptions and referrals when appropriate',
        'Records securely tied to your patient chart',
      ]}
      treatmentsHeadline="When Tele-Dentistry Works Best"
      treatments={[
        { title: 'Pain Assessment', desc: 'Help determining urgency and providing relief guidance until in-person care.' },
        { title: 'Post-Op Follow-Up', desc: 'Check healing after procedures without making an extra trip.' },
        { title: 'Second Opinions', desc: 'Get a second perspective on a treatment recommendation.' },
        { title: 'Travel Emergencies', desc: 'On vacation or business trip? Talk to your dentist before seeking local care.' },
        { title: 'Cosmetic Consultations', desc: 'Discuss veneers, whitening, or Invisalign options before coming in.' },
        { title: 'Prescription Refills', desc: 'Quick consults for legitimate medication needs between visits.' },
      ]}
      faqs={[
        { q: 'How does it work?', a: 'Book online, receive a secure link, and connect with the doctor via video. Most consults take 15–20 minutes.' },
        { q: 'What does it cost?', a: 'Tele-dentistry visits are typically lower-cost than in-office visits. Insurance increasingly covers them — we verify before your appointment.' },
        { q: 'Can the doctor prescribe medication?', a: 'Yes, when clinically appropriate. Most pharmacies receive prescriptions electronically within minutes.' },
        { q: 'What if I need in-person care after?', a: 'We\'ll schedule you in-office promptly. Your tele-dentistry consult is part of your record and saves time when you arrive.' },
      ]}
    />
  );
}
