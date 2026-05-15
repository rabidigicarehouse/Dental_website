import ServicePageTemplate from '@/components/ServicePageTemplate';

export default function GumRecessionSurgery() {
  return (
    <ServicePageTemplate
      name="Gum Recession Surgery"
      introHeadline="Restore Your Gum Line, Protect Your Teeth"
      introParagraph="Gum recession exposes tooth roots, causes sensitivity, and threatens tooth stability. Our gum recession treatments — including the Pinhole® technique and traditional grafting — restore the gum line, eliminate sensitivity, and protect your smile for the long term."
      introQuote="A healthier gum line, a healthier smile"
      introImage="/dental services/Periodontal Gum Disease.jpg"
      whyChooseHeadline="Why Choose Us for Recession Treatment?"
      whyChooseBullets={[
        'Multiple treatment options matched to your specific recession pattern',
        'Pinhole® certified — minimally invasive option available',
        'Traditional grafting expertise for advanced cases',
        'Address the CAUSE of recession to prevent future progression',
        'Patient comfort prioritized with sedation options',
        'Long-term monitoring and maintenance plans',
      ]}
      treatmentsHeadline="Recession Treatment Options"
      treatments={[
        { title: 'Pinhole® Surgical Technique', desc: 'Minimally invasive — no scalpels or stitches needed.' },
        { title: 'Connective Tissue Graft', desc: 'The gold standard for predictable, long-lasting recession coverage.' },
        { title: 'Free Gingival Graft', desc: 'Builds thicker, more resistant gum tissue around vulnerable teeth.' },
        { title: 'Pedicle Graft', desc: 'Uses adjacent gum tissue to cover an area of recession.' },
        { title: 'AlloDerm® Grafting', desc: 'Donor tissue option that avoids harvesting from your own palate.' },
        { title: 'Bite Adjustment', desc: 'Address occlusal forces that may be contributing to recession.' },
      ]}
      faqs={[
        { q: 'Why are my gums receding?', a: 'Common causes include aggressive brushing, gum disease, genetics, grinding/clenching, and improper bite forces. We identify the cause to prevent recurrence.' },
        { q: 'Which treatment is right for me?', a: 'Pinhole works best for multiple-tooth recession with adequate gum tissue. Traditional grafting works for severe single-tooth cases or when extra tissue thickness is needed.' },
        { q: 'How long is recovery?', a: 'Pinhole: 24–48 hours. Traditional grafting: 1–2 weeks of soft-food diet and careful brushing in the area.' },
        { q: 'Will the results last?', a: 'Yes — when the underlying cause is addressed. We work with you on brushing technique, bite adjustment, or night-guard use to protect your investment.' },
      ]}
    />
  );
}
