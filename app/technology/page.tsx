'use client';

import Link from 'next/link';
import StackedSectionSlider from '@/components/StackedSectionSlider';
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

      {/* Technology Carousel Section */}
      <section className="bg-light pb-100">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 text-center">
              <div className="subtitle wow fadeInUp mb-3">Our Advanced Equipment</div>
              <h2 className="wow fadeInUp" data-wow-delay=".2s">Cutting-Edge Technology for Your Comfort</h2>
              <div className="spacer-single"></div>
            </div>
          </div>

          <StackedSectionSlider labels={techData.map(d => d.title)}>
            {techData.map((tech, idx) => (
              <div className="row g-5 align-items-center w-100 m-0" key={idx}>
                <div className="col-lg-6">
                  <div className="about-img-container">
                    <img src={tech.img} className="about-img-main rounded-20 shadow-lg" alt={tech.title} />
                  </div>
                </div>

                <div className="col-lg-6">
                  <div className="ps-lg-4">
                    <div className="about-subtitle">Technology</div>
                    <h2 className="about-title">{tech.title}</h2>
                    <div className="about-text mt-4">
                      {tech.content}
                    </div>
                    <div className="mt-4">
                      <Link href="/booking" className="btn-main fx-slide"><span>Book Appointment</span></Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </StackedSectionSlider>
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
              <Link className="btn-main btn-line fx-slide" href="/booking" data-hover="Book Appointment"><span>Book Appointment</span></Link>
            </div>
          </div>
        </div>
      </section>

      <MapContactSection />
      <Footer />
    </>
  );
}
