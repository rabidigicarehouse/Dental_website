import ServicePageTemplate from '@/components/ServicePageTemplate';

export default function BridalGraduationPackages() {
  return (
    <ServicePageTemplate
      name="Bridal & Graduation Packages"
      introHeadline="Look Your Absolute Best on the Biggest Day of Your Life"
      introParagraph="From wedding day photos to senior portraits, we design custom cosmetic treatment plans timed perfectly for your big moment. Combine whitening, contouring, veneers, and Invisalign in a coordinated plan that fits your timeline and budget."
      introQuote="A perfect smile for a perfect day"
      introImage="/dental services/Bridal & Graduation Packages.jpg"
      whyChooseHeadline="Why Choose Our Special Event Packages?"
      whyChooseBullets={[
        'Custom timeline working backward from your event date',
        'Package pricing — bundled services at a meaningful discount',
        'Photography-ready results designed to look stunning on camera',
        'Stress-free coordination with our concierge service team',
        'Touch-up appointment included in the week before your event',
        'Discreet payment plans so beauty doesn\'t break your budget',
      ]}
      treatmentsHeadline="What's Included in Our Packages"
      treatments={[
        { title: 'Professional Whitening', desc: 'Brighten your smile 6–8 shades for camera-perfect photos.' },
        { title: 'Veneers Consultation', desc: 'Custom porcelain veneers for a complete smile transformation.' },
        { title: 'Express Invisalign', desc: 'Quick orthodontic touch-ups for the months leading up to your event.' },
        { title: 'Smile Photography Prep', desc: 'Pre-event polish and contouring for flawless professional photos.' },
      ]}
      faqs={[
        { q: 'How far in advance should I start?', a: 'For best results we recommend 6 months. For whitening-only packages, 4 weeks is enough.' },
        { q: 'Do I need to commit to all services?', a: 'No — packages are fully customizable. We\'ll recommend only what fits your goals and budget.' },
        { q: 'What if my event is in less than a month?', a: 'We have express options including same-day whitening and bonding for last-minute brides.' },
        { q: 'Do you offer group bridesmaid pricing?', a: 'Yes! Group bookings for the wedding party qualify for special pricing. Ask us during your consultation.' },
      ]}
    />
  );
}
