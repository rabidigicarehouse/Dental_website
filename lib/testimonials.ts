/**
 * Single source of truth for the 10 real patient testimonials transcribed
 * verbatim from https://uppereastdentalinnovations.com/ . Imported by:
 *   - app/page.tsx                    (homepage testimonial slider)
 *   - app/testimonials/page.tsx       (full testimonials page)
 *   - components/ServicePageTemplate  (per-service-page testimonial slider)
 *
 * `img` is the filename inside /public/images/testimonial/ — the client
 * will drop the matching headshot file at the corresponding sequence
 * number (1.webp, 2.webp, ...).
 *
 * GOOGLE_REVIEWS_URL is the canonical Google search link the client
 * wants every "Posted on Google" credit to deep-link into.
 */

export type Testimonial = {
  name: string;
  img: string;
  stars: number;
  text: string;
  source: 'Google';
  sourceUrl: string;
};

export const GOOGLE_REVIEWS_URL =
  'https://www.google.com/search?q=uppereastdentalinnovations&oq=uppereastdentalinnovations&gs_lcrp=EgZjaHJvbWUyBggAEEUYOTIGCAEQRRg8Mg8IAhAuGA0YrwEYxwEYgAQyBwgDEAAY7wUyCggEEAAYgAQYogQyCggFEAAYogQYiQUyBggGEEUYPDIGCAcQRRg80gEIMjY4NGowajeoAgiwAgHxBbdpBYf5R-628QW3aQWH-Ufutg&sourceid=chrome&ie=UTF-8';

export const TEXT_TESTIMONIALS: Testimonial[] = [
  {
    name: 'Daniel',
    img: '1.png',
    stars: 5,
    text: "This was my first time at the dentist office. Henry was amazing and super efficient at taking my xray scans. The receptionist was accommodating and explaining my insurance with detail. The office provides these cool glasses during treatment so you aren't blinded by the lights and has computer displays to show you images of your teeth during the treatment. Doctor Harvey explained my teeth in a detailed manner which as an engineer I appreciate. I can't wait to be back again.",
    source: 'Google',
    sourceUrl: GOOGLE_REVIEWS_URL,
  },
  {
    name: 'Matthew',
    img: '2.webp',
    stars: 5,
    text: "Dr. Harvey was amazing! As someone who experiences dentophobia, she made sure to help me remain calm throughout the entire visit. She was very thorough and informative, which made it one of the best dental experiences I've had. I will definitely make her my number one choice from now on!",
    source: 'Google',
    sourceUrl: GOOGLE_REVIEWS_URL,
  },
  {
    name: 'Ilya',
    img: '3.png',
    stars: 5,
    text: "Dr Harvey and her staff are phenomenal. Extremely detailed, explaining treatments in detail regarding processes and their necessity. Treatments are made to be as comfortable as possible. Dr Harvey was also able to treat my wife, whose dental situation is quite complex, with compassion and professionalism. I could recommend this office enough.",
    source: 'Google',
    sourceUrl: GOOGLE_REVIEWS_URL,
  },
  {
    name: 'Catherine',
    img: '4.png',
    stars: 5,
    text: "FIVE STAR bedside manners!!! Dr. Harvey is fantastic. This doctor gets it. I am always afraid to come to the dentist but Dr. Harvey makes me extremely comfortable. I am very thankful for her human touch.",
    source: 'Google',
    sourceUrl: GOOGLE_REVIEWS_URL,
  },
  {
    name: 'Ruah',
    img: '5.png',
    stars: 5,
    text: "Dr. Sharda Harvey is not only an expert dentist, she is efficient, thoughtful, patient, kind and a delightful person to know. Dr Harvey and her team are clearly committed to helping the patient have the best experience possible while also expressing the facts and recommendations that they see for reaching your fullest dental health potential. My only issue is that I wish I had come to her office sooner in my life!",
    source: 'Google',
    sourceUrl: GOOGLE_REVIEWS_URL,
  },
  {
    name: 'David',
    img: '6.webp',
    stars: 5,
    text: "I have used Dr. Harvey and her team for both regular cleanings and for highly complex dental procedures. I have always been extremely satisfied with the results and the level of service that I've received. In addition to her extraordinary skill and professionalism, Dr. Harvey is super nice, caring, and dedicated. The same goes for her staff. I could not be a more happy and grateful client!",
    source: 'Google',
    sourceUrl: GOOGLE_REVIEWS_URL,
  },
  {
    name: 'Stefania',
    img: '7.png',
    stars: 5,
    text: "Dr. Harvey wants your smile to be perfect so get ready! She is precise and very attentive to details. She will work with your schedule and your needs. Friendly and patient oriented. Highly recommended!",
    source: 'Google',
    sourceUrl: GOOGLE_REVIEWS_URL,
  },
  {
    name: 'Erica Sofia',
    img: '8.webp',
    stars: 5,
    text: "Dr. Harvey is incredibly considerate, kind, and attentive to details. She keeps my teeth in the best health they have ever been!",
    source: 'Google',
    sourceUrl: GOOGLE_REVIEWS_URL,
  },
  {
    name: 'Mal',
    img: '9.png',
    stars: 5,
    text: "This was my son's (8) first visit and his first time back to a dentist since Covid. This experience was great!! They're all so friendly and very gentle. The assistant seems great with kids, he was so patient and I truly appreciated that. My appointment is next Friday. 😉",
    source: 'Google',
    sourceUrl: GOOGLE_REVIEWS_URL,
  },
  {
    name: 'Katie',
    img: '10.webp',
    stars: 5,
    text: "I really like this office and always feel confident in the care I receive. Dr. Harvey and her staff are excellent and I appreciate having an office I can trust with my full dental care plan. I would highly recommend Dr. Harvey to all",
    source: 'Google',
    sourceUrl: GOOGLE_REVIEWS_URL,
  },
];
