'use client';

import Image from 'next/image';
import { useBookingModal } from '@/components/BookingModalProvider';

export default function ConsultationOfferSection() {
  const { open } = useBookingModal();

  return (
    <section className="consultation-offer-section">
      <div className="consultation-offer-shell">
        <div className="consultation-offer-visual" aria-hidden="true">
          <Image
            src="/smile.jpg"
            alt=""
            fill
            sizes="(max-width: 991px) 100vw, 42vw"
            className="consultation-smile-image"
          />
        </div>

        <div className="consultation-offer-copy">
          <span className="consultation-offer-kicker">Your Next Smile Starts Here</span>
          <h2>A complimentary consultation designed around your smile.</h2>
          <p>
            Meet with our team to discuss your goals, explore personalized treatment options,
            and understand the next steps toward a healthy, confident smile.
          </p>
          <button type="button" className="consultation-offer-button" onClick={open}>
            Book Your Complimentary Consultation
          </button>
        </div>
      </div>
    </section>
  );
}
