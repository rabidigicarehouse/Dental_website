import Link from 'next/link';
import ContactForm from '@/components/ContactForm';
import MapContactSection from '@/components/MapContactSection';
import Footer from '@/components/Footer';

export default function Contact() {
  return (
    <>
      <section
        id="subheader"
        className="page-subheader text-center"
        style={{
          backgroundImage: 'url("/heading_background/contact us.jpg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="container relative z-2">
          <div className="page-subheader-eyebrow" style={{ color: 'rgba(255,255,255,0.85)' }}>Get In Touch</div>
          <h1 className="page-subheader-title" style={{ color: '#fff' }}>Contact Us</h1>
          <ul className="crumb">
            <li><Link href="/" style={{ color: 'rgba(255,255,255,0.8)' }}>Home</Link></li>
            <li className="active" style={{ color: '#fff' }}>Contact</li>
          </ul>
        </div>
      </section>

      <section>
        <div className="container">
          <div className="row justify-content-center text-center">
            <div className="col-lg-10">
              <div className="subtitle wow fadeInUp">Get In Touch</div>
              <h2 className="wow fadeInUp" data-wow-delay=".2s">We are always ready to help you and answer your questions</h2>
              <p className="wow fadeInUp" data-wow-delay=".3s">
                Whether you have a question, a suggestion, or just want to say hello, this is the place to do it. Our team is dedicated to providing you with the best possible care and information. Reach out to us through any of the channels below.
              </p>

              <div className="spacer-single"></div>

              <div className="row g-4 gx-5 justify-content-center">
                {/* Card 1: We're Open */}
                <div className="col-lg-3 col-md-6">
                  <div className="contact-info-card wow fadeInRight" data-wow-delay=".1s">
                    <div className="contact-info-icon"><i className="icofont-clock-time"></i></div>
                    <h4 className="contact-info-title">We&apos;re Open</h4>
                    <p className="contact-info-text">MON - Fri (09 am - 06 pm)</p>
                  </div>
                </div>

                {/* Card 2: Clinic Location */}
                <div className="col-lg-3 col-md-6">
                  <div className="contact-info-card wow fadeInRight" data-wow-delay=".2s">
                    <div className="contact-info-icon"><i className="icofont-location-pin"></i></div>
                    <h4 className="contact-info-title">Clinic Location</h4>
                    <p className="contact-info-text">121 East 60th Street, Suite 1B<br/>New York, NY 10022</p>
                  </div>
                </div>

                {/* Card 3: Call Us Directly */}
                <div className="col-lg-3 col-md-6">
                  <div className="contact-info-card wow fadeInRight" data-wow-delay=".3s">
                    <div className="contact-info-icon"><i className="icofont-phone"></i></div>
                    <h4 className="contact-info-title">Call Us Directly</h4>
                    <p className="contact-info-text">
                      <Link href="tel:+12126971701" className="id-color-2 fw-bold">212.697.1701</Link>
                    </p>
                  </div>
                </div>

                {/* Card 4: Send an Email */}
                <div className="col-lg-3 col-md-6">
                  <div className="contact-info-card wow fadeInRight" data-wow-delay=".4s">
                    <div className="contact-info-icon"><i className="icofont-envelope"></i></div>
                    <h4 className="contact-info-title">Send an Email</h4>
                    <p className="contact-info-text">
                      <Link href="mailto:info@uedi.nyc" className="id-color-2 fw-bold">info@uedi.nyc</Link>
                    </p>
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
