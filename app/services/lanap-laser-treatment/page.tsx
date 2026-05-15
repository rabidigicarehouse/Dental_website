import ServicePageTemplate from '@/components/ServicePageTemplate';

export default function LANAPLaserTreatment() {
  return (
    <ServicePageTemplate
      name="LANAP® Laser Treatment"
      introHeadline="Treat Gum Disease Without Cutting or Stitches"
      introParagraph="LANAP® (Laser-Assisted New Attachment Procedure) is the only FDA-cleared laser treatment for advanced gum disease. It treats periodontitis without scalpels, sutures, or significant downtime — and is clinically proven to actually regenerate lost bone and tissue."
      introQuote="Treat gum disease without cutting — a paradigm shift"
      introImage="/dental services/Periodontal Gum Disease.jpg"
      whyChooseHeadline="Why Choose LANAP® Laser Therapy?"
      whyChooseBullets={[
        'FDA-cleared protocol — the only laser approach proven for regeneration',
        'No scalpel, no sutures, no gum-line reshaping',
        'Same-day procedure with minimal downtime',
        'Less post-op pain and faster healing than traditional surgery',
        'Targets bacteria selectively while preserving healthy tissue',
        'Clinically proven to regenerate bone around teeth',
      ]}
      treatmentsHeadline="The LANAP® Process"
      treatments={[
        { title: 'Initial Assessment', desc: 'Comprehensive periodontal exam with 3D imaging and pocket depth measurements.' },
        { title: 'Laser Bacterial Removal', desc: 'PerioLase® MVP-7 selectively eliminates infected tissue and bacteria.' },
        { title: 'Bone-Stimulating Phase', desc: 'A second laser pass stimulates new bone and tissue attachment.' },
        { title: 'Blood-Clot Formation', desc: 'A natural clot forms over each tooth — your body\'s healing scaffold.' },
        { title: 'Bite Adjustment', desc: 'Subtle bite refinement to remove forces that contribute to gum loss.' },
        { title: 'Maintenance Visits', desc: 'Specialized periodontal cleanings to maintain your results long-term.' },
      ]}
      faqs={[
        { q: 'Is LANAP® painful?', a: 'Most patients report significantly less pain than traditional gum surgery. Local anesthesia is used and recovery is much faster.' },
        { q: 'How is LANAP® different from regular laser dentistry?', a: 'LANAP uses a specific FDA-cleared protocol with the PerioLase® MVP-7 — the only laser approach scientifically proven to regenerate periodontal tissue.' },
        { q: 'Will I need stitches?', a: 'No. That\'s a major LANAP advantage — no scalpels, no sutures.' },
        { q: 'How long is recovery?', a: 'Most patients return to normal activity the same or next day. Diet restrictions for 7–10 days while healing.' },
      ]}
    />
  );
}
