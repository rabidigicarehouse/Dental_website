import type { Metadata } from 'next';
import SquareBookingChrome from '@/components/SquareBookingChrome';
import SquareStyleBooking from '@/components/SquareStyleBooking';

export const metadata: Metadata = {
  title: 'Book an Appointment — Upper East Dental Innovations',
  description: 'Schedule your appointment with Upper East Dental Innovations PLLC.',
};

export default function BookAppointmentPage() {
  return (
    <>
      <SquareBookingChrome />
      <SquareStyleBooking />
    </>
  );
}
