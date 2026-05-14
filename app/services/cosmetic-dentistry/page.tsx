import ServicePageTemplate from '@/components/ServicePageTemplate';

export default function CosmeticDentistry() {
  return (
    <ServicePageTemplate
      name="Cosmetic Dentistry"
      introHeadline="Enhancing Your Smile with Art and Precision"
      introParagraph="We believe your smile is your best accessory. Our cosmetic dentistry services are designed to improve the appearance of your teeth, gums, and overall smile — boosting your confidence and helping you look your best."
      introQuote="Your natural beauty begins with a confident smile"
      introImage="/dental services/Cosmetic Dentistry.webp"
      whyChooseHeadline="Why Choose Our Cosmetic Dental Services?"
      whyChooseBullets={[
        'Experienced cosmetic dentists with an eye for detail and artistry',
        'Advanced technology, including digital smile design and mock-up previews',
        'Customized treatment plans tailored to your aesthetic goals and lifestyle',
        'Gentle techniques with a focus on patient comfort and minimal discomfort',
        'Natural-looking results that enhance your facial features and confidence',
        'Comprehensive smile solutions — from simple touch-ups to full makeovers',
        'Clean, modern clinic environment with a warm and welcoming team',
      ]}
      treatmentsHeadline="Cosmetic Treatments We Offer"
      treatments={[
        { title: 'Teeth Whitening', desc: 'Brighten your smile safely with professional whitening that works in just one visit.' },
        { title: 'Dental Veneers', desc: 'Ultra-thin porcelain shells that cover imperfections and create a flawless smile.' },
        { title: 'Cosmetic Bonding', desc: 'An affordable way to repair chips, cracks, and small gaps using tooth-colored resin.' },
        { title: 'Smile Makeovers', desc: 'A customized combination of treatments to fully transform and enhance your smile.' },
        { title: 'Tooth Contouring', desc: 'Refine tooth shape and smooth rough edges for a more symmetrical, balanced smile.' },
        { title: 'Gum Contouring', desc: 'Reshape your gum line to correct a gummy smile and improve symmetry.' },
        { title: 'Invisalign & Clear Aligners', desc: 'Straighten teeth discreetly with clear aligners — no brackets or wires needed.' },
        { title: 'Metal-Free Crowns', desc: 'Restore damaged teeth with all-ceramic crowns that blend seamlessly with your smile.' },
      ]}
      faqs={[
        { q: 'How often should I visit the dentist?', a: 'It’s recommended to see your dentist every 6 months for a routine check-up and cleaning, unless advised otherwise.' },
        { q: 'What should I do in a dental emergency?', a: 'Call our office immediately. We offer same-day emergency care for issues like severe pain, broken teeth, or swelling.' },
        { q: 'Are veneers permanent?', a: 'Veneers require a small amount of enamel removal, so they are considered a permanent cosmetic change. With proper care, they last 10–15+ years.' },
        { q: 'How long does teeth whitening last?', a: 'Professional whitening results typically last 1–3 years depending on your diet and oral hygiene habits.' },
        { q: 'Is cosmetic dentistry painful?', a: 'Modern cosmetic procedures are very comfortable. We use gentle techniques and local anesthesia when needed for a pain-free experience.' },
      ]}
    />
  );
}
