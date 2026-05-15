import ServicePageTemplate from '@/components/ServicePageTemplate';

export default function BadBreathDentistry() {
  return (
    <ServicePageTemplate
      name="Bad Breath Dentistry"
      introHeadline="Eliminate Chronic Bad Breath — At Its Source"
      introParagraph="Chronic bad breath (halitosis) affects millions and isn't something to hide. Our specialized halitosis program identifies the real cause — whether oral, sinus, digestive, or systemic — and treats it directly. No more mints, no more mouthwash temporary fixes."
      introQuote="Confidence comes from real, lasting freshness"
      introImage="/dental services/Family Dentistry.jpg"
      whyChooseHeadline="Why Choose Our Halitosis Treatment?"
      whyChooseBullets={[
        'Diagnostic halimeter measures volatile sulfur compounds objectively',
        'Identifies bacterial, dietary, sinus, and systemic causes',
        'Treatment plans address the root cause, not just symptoms',
        'Tongue scraping techniques and product recommendations',
        'Coordination with ENT and primary care when needed',
        'Long-term monitoring to ensure lasting results',
      ]}
      treatmentsHeadline="Halitosis Treatments"
      treatments={[
        { title: 'Halimeter Diagnostic', desc: 'Objective measurement of breath quality to track improvement.' },
        { title: 'Periodontal Treatment', desc: 'Gum disease is the #1 cause of bad breath. Treating it transforms breath.' },
        { title: 'Tongue Therapy', desc: 'Up to 90% of bad breath bacteria live on the tongue — specialized cleaning eliminates them.' },
        { title: 'Sinus Coordination', desc: 'Referral and coordination with ENT for sinus-related halitosis.' },
        { title: 'Dry Mouth Treatment', desc: 'Saliva-stimulating treatments for xerostomia, a common cause of bad breath.' },
        { title: 'Custom Hygiene Plan', desc: 'At-home protocol tailored to your specific halitosis cause.' },
      ]}
      faqs={[
        { q: 'Why do mouthwashes only work briefly?', a: 'Most mouthwashes mask odor temporarily. They don\'t address the underlying cause, which is why breath returns within hours.' },
        { q: 'Can bad breath be caused by something serious?', a: 'Rarely. Most causes are oral (gum disease, tongue bacteria, dry mouth). But persistent halitosis warrants evaluation.' },
        { q: 'How long does treatment take?', a: 'Initial improvement is typically within 1–2 weeks. Long-term results require addressing the root cause and ongoing care.' },
        { q: 'Will I always notice my own bad breath?', a: 'Surprisingly, no — your nose desensitizes to your own scent. We use objective measurement to evaluate truly.' },
      ]}
    />
  );
}
