import ServicePageTemplate from '@/components/ServicePageTemplate';

export default function BestInvisalign() {
  return (
    <ServicePageTemplate
      name="Invisalign Teeth Straightening"
      introHeadline="The Clear Alternative to Braces — NYC's Premier Provider"
      introParagraph="Invisalign uses a series of clear, custom-made aligners to gradually move your teeth into their ideal positions. No metal, no wires, no food restrictions — and most adults complete treatment in 12–18 months with predictable, beautiful results."
      introQuote="Straighten your smile invisibly, on your schedule"
      introImage="/dental services/Invisalign.webp"
      whyChooseHeadline="Why Choose Our Invisalign Care?"
      whyChooseBullets={[
        'Premier Invisalign provider with thousands of successful cases',
        '3D iTero scanner — no goopy impressions, ever',
        'Digital outcome simulation — see your new smile before treatment',
        'Predictable timelines with bi-monthly check-ins',
        'Discreet, removable aligners that fit any lifestyle',
        'Transparent pricing and flexible monthly payment plans',
      ]}
      treatmentsHeadline="Invisalign Treatment Options"
      treatments={[
        { title: 'Invisalign Full', desc: 'Comprehensive correction for moderate to complex cases — typically 12–24 months.' },
        { title: 'Invisalign Lite', desc: 'Faster, more affordable option for mild to moderate cases (14 aligners).' },
        { title: 'Invisalign Express', desc: 'Quick correction for minor relapse or single-tooth issues (under 6 months).' },
        { title: 'Invisalign Teen', desc: 'Designed around teen lifestyles with compliance indicators and free replacements.' },
      ]}
      faqs={[
        { q: 'How long does Invisalign treatment take?', a: 'Average treatment is 12–18 months. Simple cases finish in 6 months; complex cases may take 24+ months.' },
        { q: 'Does Invisalign hurt?', a: 'You may feel mild pressure for a day or two when changing aligners. Most patients find it far more comfortable than braces.' },
        { q: 'How many hours per day must I wear my aligners?', a: '20–22 hours per day for predictable results. Remove only to eat, drink (anything but water), and brush.' },
        { q: 'How much does Invisalign cost?', a: 'Cost depends on case complexity. We offer transparent estimates and flexible monthly payment plans.' },
      ]}
    />
  );
}
