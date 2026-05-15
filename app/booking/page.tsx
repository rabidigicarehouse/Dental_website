import Link from 'next/link';
import BookingForm from '@/components/BookingForm';
import MapContactSection from '@/components/MapContactSection';
import Footer from '@/components/Footer';

export default function Booking() {
  return (
    <>
      <section
        id="subheader"
        className="page-subheader text-center"
        style={{
          backgroundImage: 'url(/office tour/7.jpeg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="container relative z-2">
          <div className="page-subheader-eyebrow" style={{ color: 'rgba(255,255,255,0.85)' }}>Schedule Now</div>
          <h1 className="page-subheader-title" style={{ color: '#fff' }}>Book Appointment</h1>
          <ul className="crumb">
            <li><Link href="/" style={{ color: 'rgba(255,255,255,0.8)' }}>Home</Link></li>
            <li className="active" style={{ color: '#fff' }}>Book Appointment</li>
          </ul>
        </div>
      </section>

      <section>
        <div className="container relative z-2">
          <div className="row g-4 gx-5 justify-content-between">

            <div className="col-lg-6">
              <BookingForm />
            </div>

            <div className="col-lg-6">
              <div className="h-100 rounded-1 relative" data-bgimage="url(images/misc/s4.webp) center" style={{ backgroundImage: 'url(/images/misc/s4.webp)', backgroundPosition: 'center', backgroundSize: 'cover' }}>
                <div className="bg-blur text-light shadow-1 abs start-10 bottom-10 p-4 rounded-1 overflow-hidden z-2" data-wow-delay=".5s">
                  <div className="d-flex justify-content-center">
                    <i className="fs-60 text-white icon_clock"></i>
                    <div className="ms-3">
                      <h4 className="mb-0">Opening Hours</h4>
                      Mon to Sat 08:00 - 20:00
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
      <MapContactSection />
      <Footer />
    </>
  );
}
