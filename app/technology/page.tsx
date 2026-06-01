'use client';

import Link from 'next/link';
import MapContactSection from '@/components/MapContactSection';
import Footer from '@/components/Footer';

export default function Technology() {
  const techData = [
    {
      title: "A World of Possibilities",
      img: "/technology/1.png",
      content: (
        <>
          <p>
            Upper East Dental Innovations offers cutting-edge advanced dental care by utilizing the most modern, state-of-the-art technology available. New advancements in dentistry have opened up a world of possibilities, and we want you to have their benefits. There is virtually no oral health or appearance concern that can’t be solved when treated quickly enough. Early detection and advanced treatment is important, and with ongoing care, patients can keep most of their teeth and retain a beautiful natural smile as they age.
          </p>
          <p>
            Technology has also made it possible for dental work to be performed in a way that keeps patients completely comfortable. By using sedation dentistry, at Upper East Dental Innovations, our patients are able to relax while having dental work performed.
          </p>
        </>
      )
    },
    {
      title: "Galileos 3D Imaging",
      img: "/technology/2.png",
      content: (
        <p>
          Upper East Dental Innovations is proud to provide new options for preoperative planning that enables clear navigation and diagnosis in panoramic, cephalometric, and cross-sectional images. Our Galileos 3D imaging system goes beyond traditional diagnostics and treatment capabilities by generating a large volume 3D image set. A single low-dose 3D scan provides us with the ability to do a comprehensive diagnosis of the entire oral-maxillofacial region. Galileo 3D is the only “all-in-one” system that offers everything from intuitive operation of the 3D X-ray equipment to diagnostic and therapeutic planning of implants, even including the preparation of implant surgical guides.
        </p>
      )
    },
    {
      title: "CEREC by Sirona Dental Systems",
      img: "/technology/3.png",
      content: (
        <>
          <p>
            With CEREC in our office, you can be in and out in a single visit with a permanent all-ceramic crown, onlay, or veneer!
          </p>
          <p>
            CEREC by Sirona Dental Systems is the world’s best system for the fabrication of ceramic dental restorations in one office visit. Watch how CEREC can help you achieve all-ceramic restorations in a single dental appointment.
          </p>
        </>
      )
    }
  ];

  return (
    <>
      {/* Subheader */}
      <section
        id="subheader"
        className="page-subheader text-center"
        style={{
          backgroundImage: 'url(/images/background/6.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="container relative z-2">
          <div className="page-subheader-eyebrow" style={{ color: 'rgba(255,255,255,0.85)' }}>Advanced Care</div>
          <h1 className="page-subheader-title" style={{ color: '#fff' }}>Dental Technology</h1>
          <ul className="crumb">
            <li><Link href="/" style={{ color: 'rgba(255,255,255,0.8)' }}>Home</Link></li>
            <li className="active" style={{ color: '#fff' }}>Technology</li>
          </ul>
        </div>
      </section>

      {/* Technology Stacking Cards Section */}
      <section className="bg-light pb-100 pt-60">
        <div className="container">
          {/* <div className="row">
            <div className="col-lg-12 text-center">
              <div className="subtitle wow fadeInUp mb-3">Advanced Care</div>
              <h2 className="wow fadeInUp mb-5" data-wow-delay=".2s">Dental Technology</h2>
            </div>
          </div> */}

          <div className="tech-stack-container">
            {techData.map((tech, idx) => (
              <div className="tech-sticky-card" key={idx}>
                {/* Top: landscape hero image with counter overlay */}
                <div className="tech-card-photo relative">
                  <img src={tech.img} alt={tech.title} />
                  <div className="tech-card-counter">
                    {idx + 1} —
                  </div>
                </div>

                {/* Bottom: text content */}
                <div className="tech-card-body">
                  <div className="tech-card-eyebrow">Technology</div>
                  <h2 className="tech-card-title">{tech.title}</h2>
                  <div className="tech-card-text">
                    {tech.content}
                  </div>
                  <div className="tech-card-actions">
                    <Link href="#book" className="btn-main fx-slide">
                      <span>Book Appointment</span>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-color text-light pt-40 pb-40">
        <div className="container">
          <div className="row g-4 align-items-center">
            <div className="col-md-9">
              <h3 className="mb-0 fs-32 text-white">Experience the future of dentistry today.</h3>
            </div>
            <div className="col-lg-3 text-lg-end">
              <Link className="btn-main btn-line fx-slide" href="#book" data-hover="Connect Us"><span>Connect Us</span></Link>
            </div>
          </div>
        </div>
      </section>

      <MapContactSection />
      <Footer />
    </>
  );
}
