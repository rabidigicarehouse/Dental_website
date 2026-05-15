import ServicePageTemplate from '@/components/ServicePageTemplate';

export default function Endodontics() {
  return (
    <ServicePageTemplate
      name="Endodontics"
      introHeadline="Modern Root Canal Therapy — Comfortable and Effective"
      introParagraph="A root canal saves a tooth that would otherwise need extraction. Modern endodontic techniques are far more comfortable than the reputation suggests — most patients say the procedure is no worse than a routine filling, while delivering decades of pain-free function."
      introQuote="Saving your natural tooth — comfortably"
      introImage="/dental services/Endodontics.jpg"
      whyChooseHeadline="Why Choose Our Root Canal Care?"
      whyChooseBullets={[
        'Advanced rotary endodontic instruments for faster, smoother treatment',
        'Digital X-rays and 3D imaging for precise diagnosis',
        'Local anesthesia + sedation options for total comfort',
        'Most root canals completed in a single visit',
        'Same-day crowns to restore the treated tooth to full strength',
        'Same-day emergency root canal availability for severe pain',
      ]}
      treatmentsHeadline="Endodontic Services"
      treatments={[
        { title: 'Single-Visit Root Canal', desc: 'Most root canals completed in just one visit — diagnosis, treatment, and seal.' },
        { title: 'Re-Treatment', desc: 'Revision of a previous root canal that didn\'t fully heal.' },
        { title: 'Apicoectomy', desc: 'Surgical root-tip treatment when conventional retreatment isn\'t enough.' },
        { title: 'Emergency Root Canal', desc: 'Same-day relief for severe tooth pain caused by infected nerve.' },
        { title: 'Cracked Tooth Therapy', desc: 'Specialized treatment for cracked or fractured teeth.' },
        { title: 'Pulp Capping', desc: 'Conservative treatment to preserve a tooth\'s pulp when possible.' },
      ]}
      faqs={[
        { q: 'Are root canals painful?', a: 'No. With modern anesthesia and techniques, a root canal feels essentially the same as getting a filling. The pain you feel BEFORE the procedure is what we eliminate.' },
        { q: 'How long does the procedure take?', a: 'Typically 60–90 minutes per tooth. Most root canals are completed in a single visit.' },
        { q: 'Will I need a crown afterward?', a: 'Usually yes — root-canaled teeth become brittle and benefit from a protective crown to prevent fracture.' },
        { q: 'Can I avoid a root canal?', a: 'Only by extracting the tooth. A root canal saves your natural tooth, which is almost always the better long-term choice.' },
      ]}
    />
  );
}
