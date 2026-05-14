import ServicePageTemplate from '@/components/ServicePageTemplate';

export default function Orthodontics() {
  return (
    <ServicePageTemplate
      name="Orthodontics"
      introHeadline="Straighter Teeth, Greater Confidence"
      introParagraph="Whether you’re considering Invisalign, traditional braces, or a discreet retainer system, our orthodontic care is designed to deliver beautiful, healthy results — with the comfort and precision today’s patients expect."
      introQuote="A perfectly aligned smile is worth the journey"
      introImage="/dental services/Invisalign.webp"
      whyChooseHeadline="Why Choose Our Orthodontic Services?"
      whyChooseBullets={[
        'Premier Invisalign provider with advanced digital treatment planning',
        '3D scanning that eliminates messy impressions',
        'Predictable timelines with regular progress check-ins',
        'Comfortable, low-profile options for adults and teens',
        'Convenient appointment scheduling around your lifestyle',
        'Beautiful, long-lasting results backed by a retention plan',
        'Transparent pricing and flexible monthly payment options',
      ]}
      treatmentsHeadline="Orthodontic Treatments We Offer"
      treatments={[
        { title: 'Invisalign®', desc: 'Clear, removable aligners that straighten teeth discreetly — no brackets, no wires.' },
        { title: 'Clear Aligners', desc: 'Premium alternatives to Invisalign for mild to moderate alignment cases.' },
        { title: 'Traditional Braces', desc: 'Time-tested metal brackets that handle even the most complex cases efficiently.' },
        { title: 'Ceramic Braces', desc: 'Tooth-colored brackets that blend with your smile while still delivering results.' },
        { title: 'Lingual Braces', desc: 'Hidden behind the teeth for a virtually invisible orthodontic experience.' },
        { title: 'Bite Correction', desc: 'Fix overbites, underbites, and crossbites for better function and comfort.' },
        { title: 'Retainers', desc: 'Custom retainers that protect your investment and keep your new smile in place.' },
        { title: 'Teen Orthodontics', desc: 'Programs designed around teen schedules with options that fit their lifestyle.' },
      ]}
      faqs={[
        { q: 'How long does Invisalign treatment take?', a: 'Most adult cases finish in 12–18 months. Teen and complex cases may take longer, while minor cases can be completed in as little as 6 months.' },
        { q: 'Is Invisalign painful?', a: 'You may feel mild pressure when switching to a new aligner, but most patients describe it as far more comfortable than braces.' },
        { q: 'How often do I need to visit during treatment?', a: 'Typically every 6–8 weeks for a quick progress check. Many appointments take less than 15 minutes.' },
        { q: 'Can adults get orthodontic treatment?', a: 'Absolutely. Today, over a third of orthodontic patients are adults. It’s never too late for a beautiful smile.' },
        { q: 'How much does Invisalign cost?', a: 'Cost depends on case complexity. We offer transparent estimates, insurance verification, and flexible monthly payment plans.' },
      ]}
    />
  );
}
