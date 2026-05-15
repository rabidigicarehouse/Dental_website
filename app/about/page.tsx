import Link from 'next/link';
import MapContactSection from '@/components/MapContactSection';
import Footer from '@/components/Footer';

export default function About() {
  return (
    <>
      {/* Subheader with office tour background */}
      <section
        id="subheader"
        className="page-subheader text-center"
        style={{
          backgroundImage: 'url("/heading_background/about.jpg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="container relative z-2">
          <div className="page-subheader-eyebrow" style={{ color: 'rgba(255,255,255,0.85)' }}>Who We Are</div>
          <h1 className="page-subheader-title" style={{ color: '#fff' }}>About Us</h1>
          <ul className="crumb">
            <li><Link href="/" style={{ color: 'rgba(255,255,255,0.8)' }}>Home</Link></li>
            <li className="active" style={{ color: '#fff' }}>About Us</li>
          </ul>
        </div>
      </section>

      {/* Intro Video + Text Section */}
      <section>
        <div className="container">
          <div className="row g-5 align-items-center">
            <div className="col-lg-6">
              <div className="about-video-embed wow fadeInUp">
                <iframe
                  src="https://player.vimeo.com/video/189150636?h=&title=0&byline=0&portrait=0"
                  title="Upper East Dental Innovations"
                  allow="autoplay; fullscreen; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>
            <div className="col-lg-6">
              <div className="subtitle id-color wow fadeInUp mb-3">Our Practice</div>
              <h2 className="wow fadeInUp" data-wow-delay=".2s">Welcome to Upper East Dental Innovations</h2>
              <p className="wow fadeInUp" data-wow-delay=".4s">
                Upper East Dental Innovations is very pleased to provide clients with a full range of cosmetic, restorative, as well as family and general dental services. Dr. Sharde Harvey, DDS, leads our team to assure that you receive the most advanced, evidence based, caring and aesthetic oral healthcare possible.
              </p>
              <Link className="btn-main fx-slide wow fadeInUp" data-wow-delay=".6s" href="/booking"><span>Book Appointment</span></Link>
            </div>
          </div>
        </div>
      </section>

      {/* Meet the Team Section (same as homepage) */}
      <section className="bg-color-op-1">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 offset-lg-3 text-center">
              <div className="subtitle wow fadeInUp mb-3">Meet Our Dental Team</div>
              <h2 className="wow fadeInUp" data-wow-delay=".2s">Committed to Your Smile</h2>
              <p className="wow fadeInUp">Our experienced dental team is here to make every visit positive and personalized. With gentle hands and caring hearts.</p>
              <div className="spacer-single"></div>
            </div>
          </div>
          <div className="row g-4">
            {[
              { name: "Dr. Sarah Bennett", role: "Lead Dentist", img: "1.webp" },
              { name: "Dr. Maya Lin", role: "Cosmetic Dentist", img: "2.webp" },
              { name: "Dr. Michael Reyes", role: "Pediatric Specialist", img: "3.webp" },
              { name: "Dr. James Carter", role: "Dental Hygienist", img: "4.webp" },
            ].map((member, idx) => (
              <div className="col-lg-3 col-md-6" key={idx}>
                <div className="relative rounded-1 overflow-hidden">
                  <div className="rounded-1 overflow-hidden wow fadeIn zoomIn">
                    <img src={`/images/team/${member.img}`} className="w-100 wow scaleIn" alt={member.name} />
                  </div>
                  <div className="abs w-100 start-0 bottom-0 z-3">
                    <div className="p-2 rounded-10 m-3 text-center bg-white wow fadeInDown">
                      <h4 className="mb-0">{member.name}</h4>
                      <p className="mb-2">{member.role}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About the Doctor Section — float layout */}
      <section>
        <div className="container">
          <div className="subtitle id-color wow fadeInUp mb-3">Meet the Doctor</div>
          <h2 className="wow fadeInUp" data-wow-delay=".2s">Dr. Sharde Harvey, DDS, MS, FICOI</h2>

          <div className="doctor-float-section">
            {/* Floated image — text wraps around it like in a book */}
            <img
              src="/Dr harvey 2.jpg"
              alt="Dr. Sharde Harvey, DDS"
              className="doctor-float-img wow fadeInRight"
            />

            <p className="wow fadeInUp" data-wow-delay=".3s">
              DR. SHARDE HARVEY, DDS, MS, FICOI is a skilled New York City General Dentist with extensive training in full mouth cosmetic rehabilitation and dental implants.
            </p>

            <p className="wow fadeInUp" data-wow-delay=".4s">
              Dr. Harvey is currently in the Department of Otolaryngology Head and Neck Surgery, Lenox Hill Hospital and is a clinical instructor on faculty in the Department of Cariology and Comprehensive Care at New York University College of Dentistry. She is a graduate of New York University College of Dentistry and served as a clinical instructor at NYU for 6 years, spent her last year at NYU in the Honors Esthetics program doing full mouth veneers, similar to those seen on television programs such as Extreme Makeover.
            </p>

            <p className="wow fadeInUp" data-wow-delay=".5s">
              Immediately after completing a one-year postgraduate program in full-mouth reconstruction at NYU, she also received advanced training and certification in Invisalign. After dental school, she attended a rigorous one year residency program at Long Island College Hospital. After residency, Dr. Harvey finished a two-year post-graduate program in implant surgery and prosthetics at NYU. She is also certified in Invisalign as well as Botox administration, useful in treatment of TMJ (Temporomandibular Joint Disorder) and headaches.
            </p>

            <p className="wow fadeInUp" data-wow-delay=".6s">
              She has been seen on ABC-TV Eyewitness News in a special program on technology and cavity detection using lasers. She has been revered as an innovative, cutting-edge dentist on the Upper East Side and was one of the first dentists to accept cryptocurrency.
            </p>

            <p className="wow fadeInUp" data-wow-delay=".7s">
              Dr. Harvey is proud of her volunteer work helping the Brooklyn community, which was broadcast on NY1 with Mayor Eric Adams. For more details go to our News section.
            </p>
          </div>

          <div className="border-bottom my-4"></div>

          <div className="row g-4 wow fadeInUp" data-wow-delay=".8s">
            <div className="col-md-4">
              <h5>Professional Memberships</h5>
              <ul className="about-memberships" style={{ listStyle: 'none', padding: 0 }}>
                <li><i className="fa fa-check-circle id-color me-2"></i>The American Dental Association</li>
                <li><i className="fa fa-check-circle id-color me-2"></i>The New York State Dental Association</li>
                <li><i className="fa fa-check-circle id-color me-2"></i>The New York County Dental Association</li>
                <li><i className="fa fa-check-circle id-color me-2"></i>The International Congress of Oral Implantologists</li>
                <li><i className="fa fa-check-circle id-color me-2"></i>Holistic Dental Association</li>
              </ul>
            </div>
            <div className="col-md-4">
              <h5>Awards &amp; Certifications</h5>
              <ul className="about-memberships" style={{ listStyle: 'none', padding: 0 }}>
                <li><i className="fa fa-trophy id-color me-2"></i>Certificate of Achievement in Aesthetic Dentistry</li>
                <li><i className="fa fa-trophy id-color me-2"></i>Certified in Botox for Treatment of TMJ and Headaches</li>
              </ul>
            </div>
            <div className="col-md-4">
              <h5>Languages Spoken</h5>
              <ul className="about-memberships" style={{ listStyle: 'none', padding: 0 }}>
                <li><i className="fa fa-globe id-color me-2"></i>English</li>
                <li><i className="fa fa-globe id-color me-2"></i>French</li>
                <li><i className="fa fa-globe id-color me-2"></i>Spanish</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Doctor Video Section */}
      <section className="bg-dark text-light">
        <div className="container">
          <div className="row g-5 align-items-center">
            <div className="col-lg-6">
              <div className="subtitle id-color wow fadeInUp mb-3">Watch Dr. Harvey</div>
              <h2 className="wow fadeInUp text-white" data-wow-delay=".2s">See Dr. Harvey in Action</h2>
              <p className="wow fadeInUp op-7" data-wow-delay=".4s">
                If you have any questions contact our helpful general staff and friendly hygienists, as well as our highly qualified dentists. We strive to make your visit a pleasant one.
              </p>
            </div>
            <div className="col-lg-6">
              <div className="about-video-embed wow fadeInUp" data-wow-delay=".3s">
                <iframe
                  src="https://www.youtube.com/embed/kHyw2sZRWzM?rel=0"
                  title="Dr. Harvey Video"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                />
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
              <h3 className="mb-0 fs-32 text-white">Ready to schedule your visit?</h3>
              <p className="mb-0 text-white op-7">Contact us today and take the first step toward a healthier, more confident smile.</p>
            </div>
            <div className="col-lg-3 text-lg-end">
              <Link className="btn-main btn-line fx-slide" href="/contact"><span>Get In Touch</span></Link>
            </div>
          </div>
        </div>
      </section>

      <MapContactSection />
      <Footer />
    </>
  );
}
