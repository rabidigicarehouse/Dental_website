import ServicePageTemplate from '@/components/ServicePageTemplate';

export default function SameDayCrown() {
  return (
    <ServicePageTemplate
      name="Same-Day Crown"
      introHeadline="One Visit. One Permanent Crown."
      introParagraph="Our in-house CEREC® technology lets us design, mill, and place a permanent ceramic crown in a single appointment. No temporaries, no second visit, no impression goop — just a beautiful, durable crown in about two hours."
      introQuote="The Lunchtime Crown — a permanent restoration in one visit"
      introImage="/dental services/Same Day Crown.webp"
      whyChooseHeadline="Why Choose Same-Day CEREC Crowns?"
      whyChooseBullets={[
        'Permanent crown placed in a single 90-minute visit',
        'No messy impressions — digital scanning is precise and comfortable',
        'No temporary crown to lose, crack, or worry about',
        'No second appointment — saves time off work',
        'Ceramic blocks color-matched to your existing teeth',
        'Strong, long-lasting porcelain that looks completely natural',
      ]}
      treatmentsHeadline="Same-Day Restoration Options"
      treatments={[
        { title: 'Same-Day Crowns', desc: 'Full crown coverage milled and placed in a single visit.' },
        { title: 'CEREC Inlays/Onlays', desc: 'Conservative restorations for moderate damage, milled in-office.' },
        { title: 'Crown Replacements', desc: 'Replace failing crowns with modern ceramic in just one visit.' },
        { title: 'Front Tooth Crowns', desc: 'Highly aesthetic crowns for visible teeth designed for natural beauty.' },
      ]}
      faqs={[
        { q: 'How long does a same-day crown appointment take?', a: 'About 90 minutes to 2 hours from start to finish — including prep, scan, milling, and placement.' },
        { q: 'Are same-day crowns as strong as lab-made crowns?', a: 'Yes. CEREC ceramic blocks are clinically proven to match or exceed traditional crown durability.' },
        { q: 'How long do they last?', a: 'With good oral hygiene and regular checkups, 10–15+ years is typical.' },
        { q: 'Will my insurance cover it?', a: 'Most plans cover same-day crowns at the same rate as traditional crowns. We verify before treatment.' },
      ]}
    />
  );
}
