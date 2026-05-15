import ServicePageTemplate from '@/components/ServicePageTemplate';

export default function PinholeSurgicalTechnique() {
  return (
    <ServicePageTemplate
      name="Pinhole® Surgical Technique"
      introHeadline="Reverse Gum Recession Without Cutting or Stitches"
      introParagraph="The Chao Pinhole® Surgical Technique treats gum recession through a tiny pinhole instead of a scalpel incision and stitches. Recovery is dramatically faster, results look beautifully natural, and the procedure is far more comfortable than traditional gum grafting."
      introQuote="Beautiful gums, no scalpel required"
      introImage="/dental services/Periodontal Gum Disease.jpg"
      whyChooseHeadline="Why Choose Pinhole® Over Traditional Grafting?"
      whyChooseBullets={[
        'No scalpels, sutures, or donor tissue required',
        'Up to 14 teeth can be treated in a single visit',
        'Minimal post-op pain — most patients take only over-the-counter relief',
        'Same-day improvement — see immediate visual results',
        'No second surgical site (no roof-of-mouth donor area)',
        'Trained by Dr. Chao\'s certified faculty',
      ]}
      treatmentsHeadline="The Pinhole® Process"
      treatments={[
        { title: 'Recession Assessment', desc: 'Comprehensive measurement of gum recession on each tooth.' },
        { title: 'Pinhole Creation', desc: 'A tiny pinhole is made in the gum above the receded area.' },
        { title: 'Tissue Repositioning', desc: 'Special instruments gently slide healthy gum over exposed root surfaces.' },
        { title: 'Collagen Insertion', desc: 'Tiny strips of collagen stabilize the new gum position during healing.' },
        { title: 'Immediate Coverage', desc: 'Patients see dramatic improvement immediately, before leaving the office.' },
        { title: 'Quick Recovery', desc: 'Most patients return to normal activity within 24 hours.' },
      ]}
      faqs={[
        { q: 'Is the Pinhole Technique painful?', a: 'Far less than traditional grafting. Most patients only need over-the-counter pain medication for a day or two.' },
        { q: 'How many teeth can be treated?', a: 'Up to 14 teeth can be treated in a single 1–2 hour appointment — far more than traditional grafting allows.' },
        { q: 'What\'s the difference from traditional grafting?', a: 'Traditional grafting requires harvesting tissue from the roof of the mouth and stitching it in place. Pinhole uses only your existing gum tissue, repositioned through a tiny opening.' },
        { q: 'How long do the results last?', a: 'Pinhole results are designed to be permanent. Long-term studies show outcomes comparable to traditional grafting.' },
      ]}
    />
  );
}
