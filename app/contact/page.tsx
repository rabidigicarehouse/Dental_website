import Link from 'next/link';
import ContactForm from '@/components/ContactForm';

export default function Contact() {
  return (
    <>
      <section id="subheader" className="bg-color-op-1 text-center">
        <div className="container relative z-2">
          <div className="row align-items-center">
            <div className="col-lg-12">
              <h1 className="wow fadeInUp">Contact Us</h1>
              <div className="border-bottom my-3"></div>
              <ul className="crumb wow fadeInDown">
                <li><Link href="/">Home</Link></li>
                <li className="active">Contact</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          <div className="row g-4">
            <div className="col-lg-6">
              <div className="subtitle">Get In Touch</div>
              <h2 className="wow fadeInUp">We are always ready to help you and answer your questions</h2>

              <p>Whether you have a question, a suggestion, or just want to say hello, this is the place to do it. Please fill out the form below with your details and message, and we&apos;ll get back to you as soon as possible.</p>

              <div className="row g-4 gx-5">
                <div className="col-lg-6">
                  <div className="fw-bold text-dark"><i className="icofont-clock-time me-2 id-color-2"></i>We&apos;re Open</div>
                  MON - Fri (09 am - 06 pm)
                </div>

                <div className="col-lg-6">
                  <div className="fw-bold text-dark"><i className="icofont-location-pin me-2 id-color-2"></i>Clinic Location</div>
                  121 East 60th Street, Suite 1B New York, NY 10022
                </div>

                <div className="col-lg-6">
                  <div className="fw-bold text-dark"><i className="icofont-phone me-2 id-color-2"></i>Call Us Directly</div>
                  <Link href="tel:+12126971701">212.697.1701</Link>
                </div>

                <div className="col-lg-6">
                  <div className="fw-bold text-dark"><i className="icofont-envelope me-2 id-color-2"></i>Send a Message</div>
                  contact@uppereastdentalnyc.com
                </div>
              </div>

            </div>

            <div className="col-lg-6">
              <ContactForm />
            </div>

          </div>
        </div>
      </section>
    </>
  );
}
