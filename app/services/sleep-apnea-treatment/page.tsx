import ServicePageTemplate from '@/components/ServicePageTemplate';

export default function SleepApneaTreatment() {
  return (
    <ServicePageTemplate
      name="Sleep Apnea Treatment"
      introHeadline="Better Sleep, Better Health — Without the CPAP"
      introParagraph="If you snore, wake up gasping, or feel exhausted no matter how long you sleep, you may have obstructive sleep apnea. Our dental sleep medicine team offers custom oral appliances — a comfortable, effective alternative to CPAP machines."
      introQuote="A simple oral appliance can change your life"
      introImage="/dental services/Sleep Apnea Treatment.jpg"
      whyChooseHeadline="Why Choose Our Sleep Treatment?"
      whyChooseBullets={[
        'American Academy of Dental Sleep Medicine member dentist',
        'In-office home sleep tests for accurate diagnosis',
        'Custom-fitted oral appliances — far more comfortable than CPAP',
        'Coordination with your sleep physician for complete care',
        'Insurance verification and Medicare-approved billing',
        'Follow-up adjustments to ensure long-term comfort and effectiveness',
      ]}
      treatmentsHeadline="Sleep Apnea Solutions"
      treatments={[
        { title: 'Home Sleep Testing', desc: 'Convenient overnight study performed in your own bed to diagnose sleep apnea.' },
        { title: 'Custom Oral Appliances', desc: 'FDA-approved devices that gently position your jaw to keep airways open.' },
        { title: 'CPAP Alternative Therapy', desc: 'For patients who can\'t tolerate CPAP, oral appliances offer proven results.' },
        { title: 'Snoring Solutions', desc: 'Anti-snoring devices for patients with primary snoring but no apnea.' },
        { title: 'TMJ Co-Treatment', desc: 'Coordinated care when sleep apnea is associated with jaw joint issues.' },
        { title: 'Follow-Up Monitoring', desc: 'Periodic re-evaluation and adjustment as needed for ongoing effectiveness.' },
      ]}
      faqs={[
        { q: 'How do I know if I have sleep apnea?', a: 'Common signs: loud snoring, gasping at night, daytime exhaustion, morning headaches. A home sleep test can confirm.' },
        { q: 'Are oral appliances as effective as CPAP?', a: 'For mild to moderate sleep apnea, yes. For severe cases, CPAP may still be recommended, but appliances are excellent for CPAP-intolerant patients.' },
        { q: 'How long does an oral appliance last?', a: 'Typically 3–5 years with proper care. We provide cleaning instructions and periodic adjustments.' },
        { q: 'Does insurance cover oral appliances?', a: 'Yes — medical insurance (not dental) typically covers them when prescribed for diagnosed sleep apnea. Medicare also covers them.' },
      ]}
    />
  );
}
