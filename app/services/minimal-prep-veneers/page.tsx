import ServicePageTemplate from '@/components/ServicePageTemplate';

export default function MinimalPrepVeneers() {
  return (
    <ServicePageTemplate
      name="Minimal Prep Veneers"
      introHeadline="Beautiful Veneers, Conservative Approach"
      introParagraph="Minimal and no-prep veneers preserve more of your natural tooth than traditional veneers. Ultra-thin, hand-crafted shells bond directly to your enamel — giving you a stunning smile transformation without irreversible drilling."
      introQuote="A flawless smile, your natural tooth preserved"
      introImage="/dental services/No Prep or Minimal Prep Veneers.webp"
      whyChooseHeadline="Why Choose Minimal-Prep?"
      whyChooseBullets={[
        'Preserves the maximum amount of your natural tooth',
        'No drilling means no shots and no temporaries needed',
        'Reversible — they can be removed without damage to teeth',
        'Same dramatic cosmetic results as traditional veneers',
        'Often no local anesthesia required during placement',
        'Quicker treatment timeline than traditional veneers',
      ]}
      treatmentsHeadline="No / Minimal-Prep Options"
      treatments={[
        { title: 'Lumineers®', desc: 'Ultra-thin contact-lens-thin veneers bonded with no enamel removal.' },
        { title: 'DURAthin® Veneers', desc: 'Premium minimal-prep porcelain designed for longevity and beauty.' },
        { title: 'Composite Veneers', desc: 'Same-day, hand-sculpted veneers using premium composite resin.' },
        { title: 'Snap-On Smile®', desc: 'Removable cosmetic option to preview your new smile or as an interim solution.' },
      ]}
      faqs={[
        { q: 'Are minimal-prep veneers as strong as traditional veneers?', a: 'Modern minimal-prep porcelain is exceptionally strong — comparable to traditional veneers when properly bonded.' },
        { q: 'Will minimal-prep veneers look bulky?', a: 'No. Today\'s materials are so thin they sit virtually flush with your natural teeth. The result looks completely natural.' },
        { q: 'Am I a candidate for no-prep veneers?', a: 'Most patients with healthy teeth and minor cosmetic concerns are candidates. We\'ll evaluate during your consultation.' },
        { q: 'How long do they last?', a: 'With proper care, 10–15+ years on average.' },
      ]}
    />
  );
}
