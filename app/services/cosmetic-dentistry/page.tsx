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
        { q: "I don't like my teeth or my smile, what can I do?", a: 'A wide variety of options are available to improve tooth function and how your smile looks. Ask us about what options are available.' },
        { q: 'How much does it cost to get a great smile?', a: 'Like most services, cost varies based on the amount of time required and the difficulty of the procedure(s). Generally, improving a smile requires a combination of treatment options such as bleaching, reshaping gums, and using bonded materials (resin or porcelain) to improve the appearance of the teeth. A great way to start is by having a consultation with our dentist to determine how you can reach your goals.' },
        { q: 'I have dental insurance. Will it pay for my new smile?', a: 'We will work to maximize your benefits, and may have suggestions for alternative methods of financing so that you can obtain the treatment of choice. Speak with us about dental insurance and financing.' },
        { q: 'What are some benefits of cosmetic dentistry?', a: 'New techniques and materials are available for back teeth as well as those seen when you smile. A new study shows that a great smile can make you 20% more attractive and people with beautiful smiles make, on average, 12% more money each year.' },
        { q: 'How many office visits will it take to fix my teeth and improve my smile?', a: 'This varies with each individual, depending on the need. Sometimes, you can dramatically improve your oral health and appearance in just a couple of visits. Discuss your goals and concerns so the best plan can be developed for your individual situation.' },
        { q: 'What will my new smile look like?', a: 'Our dentists work with you to develop an attractive holistic look. A smile enhancement can look both dramatic and natural. We can use photographs (in a process called cosmetic imaging) and models to show you what to expect. Sometimes, trial materials can be placed directly on your teeth to help you visualize the change.' },
        { q: 'Is my new smile permanent?', a: 'With good home care and regular visits, modern materials can last for many years, and possibly decades. Like most things, excellent maintenance will extend the life of your dental restorations.' },
        { q: 'What is the cost of cosmetic dentistry in NYC?', a: "Pricing depends on the specific treatments you choose. We'll discuss your options and provide transparent estimates during your consultation." },
        { q: 'How long does a smile makeover take?', a: 'Some treatments, such as whitening, can be completed in just one visit, while procedures like veneers or bonding may require multiple appointments to achieve optimal results.' },
        { q: 'Are cosmetic dental procedures painful?', a: 'Most treatments are minimally invasive and designed for comfort. We use gentle techniques and local anesthesia when necessary to ensure a relaxed experience.' },
      ]}
    />
  );
}
