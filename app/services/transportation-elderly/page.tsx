import ServicePageTemplate from '@/components/ServicePageTemplate';

export default function TransportationElderly() {
  return (
    <ServicePageTemplate
      name="Transportation for the Elderly"
      introHeadline="Stress-Free Dental Care for Seniors"
      introParagraph="We provide complimentary door-to-door transportation for elderly patients in Manhattan and select boroughs. Our drivers help patients to and from their appointments — making dental care accessible regardless of mobility or transportation challenges."
      introQuote="Caring for your loved ones — door to door"
      introImage="/dental services/Transportation For The Elderly.jpg"
      whyChooseHeadline="Why Choose Our Transportation Service?"
      whyChooseBullets={[
        'Complimentary service for qualifying senior patients',
        'Trained drivers who assist with mobility',
        'Door-to-door pickup and return',
        'Wheelchair-accessible vehicle available',
        'Family members welcome to ride along',
        'Scheduling coordinated with appointment timing',
      ]}
      treatmentsHeadline="What's Included in Our Service"
      treatments={[
        { title: 'Eligibility Assessment', desc: 'Quick review to confirm transportation service eligibility.' },
        { title: 'Pickup Coordination', desc: 'Our office calls the day before to confirm pickup time and location.' },
        { title: 'Door-to-Door Service', desc: 'Driver assists from home to vehicle and into our office.' },
        { title: 'Wheelchair Access', desc: 'Lift-equipped vehicle available for wheelchair users.' },
        { title: 'Companion Welcome', desc: 'Family or caregiver welcome to accompany the patient.' },
        { title: 'Return Transportation', desc: 'After your appointment, driver returns you home safely.' },
      ]}
      faqs={[
        { q: 'Who qualifies for free transportation?', a: 'Senior patients (typically 70+) who have difficulty traveling alone qualify. Eligibility is reviewed during scheduling.' },
        { q: 'What areas do you serve?', a: 'Primarily Manhattan, with limited service to nearby Brooklyn and Queens. Distance limits apply.' },
        { q: 'Is the vehicle wheelchair accessible?', a: 'Yes — we have a lift-equipped vehicle available. Please request at the time of scheduling.' },
        { q: 'Can family members ride along?', a: 'Absolutely. We encourage a family member or caregiver to accompany the patient.' },
      ]}
    />
  );
}
