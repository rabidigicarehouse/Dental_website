export type BookingService = {
  id: string;
  title: string;
  shortDescription: string;
  duration: string;
  durationMinutes: number;
  price: string;
  priceNote?: string;
  intro?: string;
  includes?: string[];
  detailParagraphs?: string[];
  footerNotes?: string[];
};

export const BOOKING_SERVICES: BookingService[] = [
  {
    id: 'teleconsult',
    title: 'Teleconsult',
    shortDescription:
      'Our practice has gone virtual! We are now offering Tele-Consults to help you with your dental needs.',
    duration: '20 min',
    durationMinutes: 20,
    price: 'Free',
    priceNote:
      'Prices depend on which Dental Insurance Carrier you have - Call us at 212.697.1701 for assistance',
    intro:
      'Our practice has gone virtual! We are now offering Tele-Consults to help you with your dental needs.',
    includes: [
      'A complimentary in-office follow up appointment after your virtual visit',
      'The ability for our office to fill-out your insurance reimbursement form',
      'One-on-one video consult with Dr. Harvey, on a HIPAA compliant and secure video platform',
      'If you have dental insurance, claim may be paid by them. Call to enquire at 212-697-1701.',
    ],
    footerNotes: [
      'After booking this appointment, you will receive the link to use for your Tele-Consult visit.',
      'Please submit a patient form at www.uedi.doxy.me prior to your appointment.',
    ],
  },
  {
    id: 'senior-consult',
    title: '$49. Consultation for Senior Citizens',
    shortDescription: '$49 Consultation for all Senior Citizens',
    duration: '30 min',
    durationMinutes: 30,
    price: 'Free',
    priceNote: '$49 Consultation for all Senior Citizens',
    intro: '$49 Consultation for all Senior Citizens.',
    detailParagraphs: [
      'Schedule a dedicated consultation designed for senior patients. Our team provides gentle, thorough care and clear guidance for your dental health.',
    ],
  },
  {
    id: 'consultation',
    title: 'Consultation',
    shortDescription:
      'Our consultation service offers expert advice, personalized solutions, and professional guidance tailored to your needs.',
    duration: '30 min',
    durationMinutes: 30,
    price: 'Free',
    intro:
      'Our consultation service offers expert advice, personalized solutions, and professional guidance tailored to your needs. Book an appointment today to receive the support and expertise you deserve.',
  },
  {
    id: 'zoom-whitening',
    title: 'Zoom Whitening',
    shortDescription:
      'Experience the confidence-boosting power of our Zoom Whitening service with fast results and effective stain removal.',
    duration: '30 min',
    durationMinutes: 30,
    price: 'Free',
    intro:
      'Experience the confidence-boosting power of our Zoom Whitening service. Our professional teeth whitening treatment guarantees fast results and effective stain removal, leaving your smile radiant and bright. Book your appointment today for a dazzling smile makeover!',
  },
  {
    id: 'bridal',
    title: 'Bridal & Graduation Packages',
    shortDescription:
      'Packages include cleanings, whitening, gum therapy, bondings, Invisalign, crowns, veneers and smile reconstruction.',
    duration: '30 min',
    durationMinutes: 30,
    price: 'Free',
    intro:
      'Our packages include cleanings, whitening, gum therapy, bondings, invisalign, crowns, veneers and smile reconstruction. Ask for a complimentary cosmetic evaluation and see how this variety of treatment can make your day a memorable one where photographs will not be scarce.',
  },
  {
    id: 'veneers',
    title: 'Veneers',
    shortDescription:
      'Transform your smile with our premium veneers service for a stunning, radiant smile.',
    duration: '30 min',
    durationMinutes: 30,
    price: 'Free',
    intro:
      'Transform your smile with our premium veneers service. Book your exclusive appointment now to achieve the perfect smile you have always dreamed of. Our expert team is ready to enhance your confidence and leave you with a stunning, radiant smile.',
  },
  {
    id: 'invisalign',
    title: 'Invisalign',
    shortDescription:
      'Invisalign clear aligners for a straighter smile without traditional braces.',
    duration: '30 min',
    durationMinutes: 30,
    price: 'Free',
    intro:
      'Experience the transformative power of Invisalign - the leading invisible teeth alignment service. With removable clear aligners and comfortable orthodontic treatment, achieve the smile you have always dreamed of. Book your personalized appointment today!',
  },
  {
    id: 'bonding',
    title: 'Bonding',
    shortDescription:
      'Professional bonding for chips, gaps, and minor imperfections with quick, effective results.',
    duration: '30 min',
    durationMinutes: 30,
    price: 'Free',
    intro:
      'Experience the exceptional service of Bonding - a professional appointment where you can benefit from a strong adhesive application that dries quickly. Book now for versatile usage that meets your specific needs.',
  },
  {
    id: 'tmj',
    title: 'TMJ treatment',
    shortDescription:
      'Personalized TMJ treatment focused on pain relief and improved jaw function.',
    duration: '30 min',
    durationMinutes: 30,
    price: 'Free',
    intro:
      'Experience personalized TMJ treatment focused on pain relief and improved jaw function. Our non-invasive techniques are tailored to your specific needs, ensuring a comfortable and effective session. Book your appointment today for a step towards a healthier, pain-free jaw.',
  },
  {
    id: 'test',
    title: 'Test',
    shortDescription:
      'Comprehensive dental test to evaluate your overall oral health.',
    duration: '30 min',
    durationMinutes: 30,
    price: 'Free',
    intro:
      'Our comprehensive dental test is designed to evaluate your overall oral health. This service includes a detailed examination of your teeth, gums, and mouth to detect any signs of cavities, gum disease, or other dental issues. X-rays may be taken if necessary. Ideal for new patients or regular check-ups.',
  },
];

export const BOOKING_STAFF = [
  {
    id: 'dr-harvey',
    title: 'Dr Sharde Harvey',
    shortDescription: 'General Dentist — DDS, MS, FICOI',
    duration: '30 min',
    durationMinutes: 30,
    price: 'Free',
    intro:
      'Schedule with Dr. Sharde Harvey for comprehensive general dentistry, cosmetic care, and personalized treatment planning.',
  },
  {
    id: 'dr-pellegrini',
    title: 'Dr. Pellegrini',
    shortDescription: 'Periodontist — LANAP & LAPIP Protocol',
    duration: '30 min',
    durationMinutes: 30,
    price: 'Free',
    intro:
      'Schedule with Dr. Pellegrini for periodontal care, LANAP, LAPIP, and advanced implant surgery consultations.',
  },
];

export function getBookingItem(id: string): BookingService | undefined {
  return (
    BOOKING_SERVICES.find((s) => s.id === id) ||
    BOOKING_STAFF.find((s) => s.id === id)
  );
}

export const SQUARE_BOOK_URL =
  'https://square.site/book/8YN3X16T15M6W/upper-east-dental-innovations';

export const BUSINESS_NAME = 'upper East Dental Innovations PLLC';
