import Link from 'next/link';
import MapContactSection from '@/components/MapContactSection';
import Footer from '@/components/Footer';
import HashAnchorScroller from '@/components/HashAnchorScroller';

export default function About() {
  return (
    <>
      <HashAnchorScroller />
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
                Upper East Dental Innovations is very pleased to provide clients with a full range of cosmetic, restorative, as well as family and general dental services. Dr. Sharda Harvey, DDS, leads our team to assure that you receive the most advanced, evidence based, caring and aesthetic oral healthcare possible.
              </p>
              <Link className="btn-main fx-slide wow fadeInUp" data-wow-delay=".6s" href="#book"><span>Book Appointment</span></Link>
            </div>
          </div>
        </div>
      </section>

      {/* About the Doctor Section — float layout */}
      <section id="team-directory">
        <div className="container">
          <div id="dr-sharde-harvey" className="anchor-scroll-offset">
            <div className="subtitle id-color wow fadeInUp mb-3">Meet the Doctor</div>
            <h2 className="wow fadeInUp" data-wow-delay=".2s">Dr. Sharda Harvey, DDS, MS, FICOI</h2>
          </div>

          <div className="doctor-float-section">
            {/* Floated image — text wraps around it like in a book */}
            <img
              src="/Dr-harvey-1.jpg"
              alt="Dr. Sharda Harvey, DDS"
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

          <div className="row g-4 wow fadeInUp my-4" data-wow-delay=".75s">
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

          <div className="border-bottom my-5"></div>

          <div id="dr-pellegrini" className="anchor-scroll-offset">
            <div className="subtitle id-color wow fadeInUp mb-3">Meet the Doctor</div>
            <h2 className="wow fadeInUp" data-wow-delay=".2s">Dr. Pellegrini — Periodontist</h2>
          </div>

          <div className="doctor-float-section">
            <img
              src="/Gretel Pellegrini Photo.jpg"
              alt="Dr. Pellegrini, Periodontist"
              className="doctor-float-img doctor-float-img--left wow fadeInLeft"
            />

            <p className="wow fadeInUp" data-wow-delay=".3s">
              Dr. Pellegrini is a Diplomate of the American Board of Periodontology, a recognized specialty of the National Commission on Recognition of Dental Specialties and Certifying Boards. She holds a DDS from Columbia University College of Dental Medicine and completed her surgical training in Periodontics and Implant Surgery, obtaining a Master of Science Degree in Periodontics at Columbia University, where she served as Chief Resident.
            </p>

            <p className="wow fadeInUp" data-wow-delay=".4s">
              In addition, Dr. Pellegrini is certified for LANAP and LAPIP (Laser Assisted New Attachment Procedure and Peri-Implantitis Procedure) protocols. She is also certified for the minimally invasive Pinhole Surgical Technique for treating gum recession.
            </p>

            <p className="wow fadeInUp" data-wow-delay=".5s">
              Dr. Pellegrini holds a DDS degree and PhD degree with honors from the University of Buenos Aires, where she served as Vice-Director of the Dental Hospital as well as faculty for more than 16 years. She pursued postdoctoral training in Bone Biology at Indiana University, a world-renowned bone research center.
            </p>

            <p className="wow fadeInUp" data-wow-delay=".6s">
              Dr. Pellegrini has published multiple peer-reviewed papers and serves as a reviewer for prestigious journals. She has received numerous awards including the Tenenbaum Award in Periodontal Research, the Divisional Excellence in Periodontics Award by the Columbia University College of Dental Medicine Association of Dental Alumni, the Lionel Abzug Scholarship Award, the Ralph and Jessica Kaslick Award, Columbia&apos;s Program for Diversity and Inclusion in Commercialization and Entrepreneurship Award, Omicron Kappa Upsilon Key (Columbia University Chapter), and the American Society for Bone and Mineral Research Young Investigator Award, among others.
            </p>

            <p className="wow fadeInUp" data-wow-delay=".7s">
              Dr. Pellegrini is director and scientific advisor of multiple trials for bone regeneration devices for the approval of the U.S. Food and Drug Administration (FDA) and the Conformité Européenne (CE).
            </p>
          </div>

          <div className="row g-4 wow fadeInUp my-4" data-wow-delay=".8s">
            <div className="col-md-4">
              <h5>Board &amp; Training</h5>
              <ul className="about-memberships" style={{ listStyle: 'none', padding: 0 }}>
                <li><i className="fa fa-check-circle id-color me-2"></i>Diplomate, American Board of Periodontology</li>
                <li><i className="fa fa-check-circle id-color me-2"></i>DDS, Columbia University College of Dental Medicine</li>
                <li><i className="fa fa-check-circle id-color me-2"></i>MS in Periodontics, Columbia University (Chief Resident)</li>
                <li><i className="fa fa-check-circle id-color me-2"></i>DDS &amp; PhD with Honors, University of Buenos Aires</li>
                <li><i className="fa fa-check-circle id-color me-2"></i>Postdoctoral Training, Bone Biology — Indiana University</li>
              </ul>
            </div>
            <div className="col-md-4">
              <h5>Awards &amp; Honors</h5>
              <ul className="about-memberships" style={{ listStyle: 'none', padding: 0 }}>
                <li><i className="fa fa-trophy id-color me-2"></i>Tenenbaum Award in Periodontal Research</li>
                <li><i className="fa fa-trophy id-color me-2"></i>Divisional Excellence in Periodontics Award (Columbia Alumni)</li>
                <li><i className="fa fa-trophy id-color me-2"></i>Lionel Abzug Scholarship Award</li>
                <li><i className="fa fa-trophy id-color me-2"></i>Ralph and Jessica Kaslick Award</li>
                <li><i className="fa fa-trophy id-color me-2"></i>Columbia Diversity &amp; Inclusion in Commercialization Award</li>
                <li><i className="fa fa-trophy id-color me-2"></i>Omicron Kappa Upsilon Key, Columbia University Chapter</li>
                <li><i className="fa fa-trophy id-color me-2"></i>ASBMR Young Investigator Award</li>
              </ul>
            </div>
            <div className="col-md-4">
              <h5>Certifications &amp; Research</h5>
              <ul className="about-memberships" style={{ listStyle: 'none', padding: 0 }}>
                <li><i className="fa fa-certificate id-color me-2"></i>LANAP &amp; LAPIP Protocol Certified</li>
                <li><i className="fa fa-certificate id-color me-2"></i>Pinhole Surgical Technique Certified</li>
                <li><i className="fa fa-certificate id-color me-2"></i>Peer-reviewed publications; journal reviewer</li>
                <li><i className="fa fa-certificate id-color me-2"></i>FDA &amp; CE trials — Director &amp; Scientific Advisor</li>
              </ul>
            </div>
          </div>

          <div className="border-bottom my-5"></div>

          <div id="paola-cruz" className="anchor-scroll-offset">
            <div className="subtitle id-color wow fadeInUp mb-3">Meet the Team</div>
            <h2 className="wow fadeInUp" data-wow-delay=".2s">Paola Cruz</h2>
            <p className="wow fadeInUp mb-4" data-wow-delay=".25s">
              Dental Assistant &amp; Front Office Coordinator
            </p>
          </div>

          <div className="doctor-float-section">
            <img
              src="/Paola-Image.jpg"
              alt="Paola Cruz"
              className="doctor-float-img wow fadeInRight"
            />

            <p className="wow fadeInUp" data-wow-delay=".3s">
              Paola Cruz is a dedicated Dental Assistant and Front Office Coordinator with a passion for patient care and healthcare administration. Before moving to the United States in 2019, she completed her first year of Medical Technology studies at Centro Escolar University (CEU) Las Piñas, where she developed a strong foundation in biology, laboratory sciences, and healthcare practices.
            </p>

            <p className="wow fadeInUp" data-wow-delay=".4s">
              After relocating to the U.S., she continued pursuing her healthcare career by completing the Medical and Dental Assistant Program at The School for Medical and Dental Assistants. Through her education and professional experience, she gained expertise in dental assisting, patient care, scheduling, insurance verification, treatment coordination, and front office management.
            </p>

            <p className="wow fadeInUp" data-wow-delay=".5s">
              Currently working as a Dental Assistant and Front Office Coordinator, Paola is committed to providing compassionate care and creating positive patient experiences. She is also working toward her long-term goal of becoming a Registered Dental Hygienist, with aspirations to further her education and expand her role in preventive oral healthcare and patient education.
            </p>
          </div>

          <div className="row g-4 wow fadeInUp my-4" data-wow-delay=".6s">
            <div className="col-md-4">
              <h5>Clinical Foundation</h5>
              <ul className="about-memberships" style={{ listStyle: 'none', padding: 0 }}>
                <li><i className="fa fa-check-circle id-color me-2"></i>Medical Technology studies at CEU Las Piñas</li>
                <li><i className="fa fa-check-circle id-color me-2"></i>Strong background in biology and laboratory sciences</li>
                <li><i className="fa fa-check-circle id-color me-2"></i>Healthcare practices rooted in patient-first care</li>
              </ul>
            </div>
            <div className="col-md-4">
              <h5>Professional Expertise</h5>
              <ul className="about-memberships" style={{ listStyle: 'none', padding: 0 }}>
                <li><i className="fa fa-check-circle id-color me-2"></i>Dental assisting and chairside support</li>
                <li><i className="fa fa-check-circle id-color me-2"></i>Scheduling and treatment coordination</li>
                <li><i className="fa fa-check-circle id-color me-2"></i>Insurance verification and front office management</li>
              </ul>
            </div>
            <div className="col-md-4">
              <h5>Future Goals</h5>
              <ul className="about-memberships" style={{ listStyle: 'none', padding: 0 }}>
                <li><i className="fa fa-globe id-color me-2"></i>Becoming a Registered Dental Hygienist</li>
                <li><i className="fa fa-globe id-color me-2"></i>Expanding into preventive oral healthcare</li>
                <li><i className="fa fa-globe id-color me-2"></i>Growing her role in patient education</li>
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
