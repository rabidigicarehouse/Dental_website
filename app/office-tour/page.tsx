import Link from 'next/link';
import MapContactSection from '@/components/MapContactSection';
import Footer from '@/components/Footer';

const officeTourImages = [
  { src: '/office tour/1.png', alt: 'Office Reception Area' },
  { src: '/office tour/2.png', alt: 'Patient Waiting Lounge' },
  { src: '/office tour/3.png', alt: 'Treatment Room' },
  { src: '/office tour/4.png', alt: 'Modern Dental Equipment' },
  { src: '/office tour/5.png', alt: 'Consultation Room' },
  { src: '/office tour/5.jpeg', alt: 'Office Hallway' },
  { src: '/office tour/7.jpeg', alt: 'Sterilization Center' },
  { src: '/office tour/8.jpeg', alt: 'Digital X-Ray Station' },
  { src: '/office tour/9.png', alt: 'Patient Care Area' },
  { src: '/office tour/10.jpeg', alt: 'Office Exterior' },
];

export default function OfficeTour() {
  return (
    <>
      {/* Subheader with office tour background */}
      <section
        id="subheader"
        className="page-subheader text-center"
        style={{
          backgroundImage: 'url("/heading_background/office tour.jpg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="container relative z-2">
          <div className="page-subheader-eyebrow" style={{ color: 'rgba(255,255,255,0.85)' }}>Explore Our Space</div>
          <h1 className="page-subheader-title" style={{ color: '#fff' }}>Office Tour</h1>
          <ul className="crumb">
            <li><Link href="/" style={{ color: 'rgba(255,255,255,0.8)' }}>Home</Link></li>
            <li><Link href="/about" style={{ color: 'rgba(255,255,255,0.8)' }}>About</Link></li>
            <li className="active" style={{ color: '#fff' }}>Office Tour</li>
          </ul>
        </div>
      </section>

      {/* Office Insights Gallery */}
      <section>
        <div className="container">
          <div className="row g-4 justify-content-center text-center mb-5">
            <div className="col-lg-8">
              <div className="subtitle id-color wow fadeInUp mb-3">A Glimpse Inside</div>
              <h2 className="wow fadeInUp" data-wow-delay=".2s">Our Office Insights</h2>
              <p className="mb-0 wow fadeInUp" data-wow-delay=".3s">
                Step inside Upper East Dental Innovations and experience our state-of-the-art facility designed for your comfort and well-being. Every detail has been thoughtfully curated to make your dental visit a premium experience.
              </p>
            </div>
          </div>

          <div className="row g-4">
            {officeTourImages.map((img, i) => (
              <div
                className={`${i < 2 ? 'col-lg-6' : 'col-lg-4'} col-md-6 col-12`}
                key={i}
              >
                <div
                  className="office-tour-card rounded-1 overflow-hidden wow fadeInUp"
                  data-wow-delay={`${(i % 4) * 0.1}s`}
                >
                  <img
                    src={img.src}
                    alt={img.alt}
                    className="office-tour-img"
                  />
                  <div className="office-tour-overlay">
                    <span className="office-tour-label">{img.alt}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Our Office Section */}
      <section className="bg-color-op-1">
        <div className="container">
          <div className="row g-5 align-items-center">
            <div className="col-lg-6">
              <div className="subtitle id-color wow fadeInUp mb-3">Designed for You</div>
              <h2 className="wow fadeInUp" data-wow-delay=".2s">A Modern Space Built for Comfort</h2>
              <p className="wow fadeInUp" data-wow-delay=".4s">
                Our office was designed with your experience in mind. From the calming reception area to the advanced treatment rooms equipped with the latest technology, every corner reflects our commitment to excellence.
              </p>
              <ul className="ul-check text-dark fw-600 mb-4 wow fadeInUp" data-wow-delay=".6s">
                <li>State-of-the-art CEREC and digital scanning technology</li>
                <li>Comfortable, spa-like treatment rooms</li>
                <li>Advanced sterilization and safety protocols</li>
                <li>Conveniently located in the heart of Midtown Manhattan</li>
              </ul>
              <Link className="btn-main fx-slide wow fadeInUp" data-wow-delay=".8s" href="/booking"><span>Book a Visit</span></Link>
            </div>
            <div className="col-lg-6">
              <div className="rounded-1 overflow-hidden wow zoomIn">
                <img src="/office tour/3.png" className="w-100" alt="Treatment Room" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-color text-light pt-40 pb-40">
        <div className="container">
          <div className="row g-4 align-items-center">
            <div className="col-md-9">
              <h3 className="mb-0 fs-32 text-white">Want to see our office in person?</h3>
              <p className="mb-0 text-white op-7">Schedule your first visit and experience premium dental care firsthand.</p>
            </div>
            <div className="col-lg-3 text-lg-end">
              <Link className="btn-main btn-line fx-slide" href="https://scheduling.simplifeye.co/#key=7O4hoFG2aH6pBmQ2YLegk45hvPEJrqZ&gaID=null" data-hover="Connect Us"><span>Connect Us</span></Link>
            </div>
          </div>
        </div>
      </section>

      <MapContactSection />
      <Footer />
    </>
  );
}
