import Link from 'next/link';
import MapContactSection from '@/components/MapContactSection';
import Footer from '@/components/Footer';

const services = [
  {
    title: 'Cosmetic Dentistry',
    img: '/dental services/Cosmetic Dentistry.webp',
    icon: 'tooth-2.png',
    desc: 'Transform your smile with veneers, Invisalign, whitening and same-day crowns.',
    href: '/services/cosmetic-dentistry',
    badge: 'Most Popular',
  },
  {
    title: 'Restorative Dentistry',
    img: '/dental services/Restorative dentistry.webp',
    icon: 'tooth-4.png',
    desc: 'Dental implants, bridges, crowns and full-mouth reconstruction — built to last.',
    href: '/services/restorative-dentistry',
    badge: null,
  },
  {
    title: 'Holistic Dentistry',
    img: '/dental services/Holistic Dentistry.webp',
    icon: 'tooth-1.png',
    desc: 'Biocompatible, whole-body dental care for your total health and wellness.',
    href: '/services/holistic-dentistry',
    badge: null,
  },
  {
    title: 'Advanced & Specialized Treatments',
    img: '/dental services/Advanced & Specialized Treatments.jpeg',
    icon: 'tooth-3.png',
    desc: 'Endodontics, sedation, sleep apnea treatment, and stem cell dentistry.',
    href: '/services/advanced-treatments',
    badge: null,
  },
  {
    title: 'Pediatric Dentistry',
    img: '/dental services/Pediatric Dentistry.webp',
    icon: 'tooth-3.png',
    desc: 'Gentle, friendly care that helps kids build healthy lifelong smile habits.',
    href: '/services/pediatric-dentistry',
    badge: null,
  },
  {
    title: 'Family Dentistry',
    img: '/dental services/Family Dentistry.jpg',
    icon: 'tooth-1.png',
    desc: 'Comprehensive dental care for every member of your family, all ages.',
    href: '/services/general-dentistry',
    badge: null,
  },
  {
    title: 'Orthodontics & Invisalign',
    img: '/dental services/Invisalign.webp',
    icon: 'tooth-2.png',
    desc: 'Straighten your teeth discreetly with clear aligners — no brackets, no wires.',
    href: '/services/orthodontics',
    badge: null,
  },
  {
    title: 'Preventive Dentistry',
    img: '/dental services/Teeth Whitening.webp',
    icon: 'tooth-1.png',
    desc: 'Cleanings, exams and education to stop problems before they start.',
    href: '/services/preventive-dentistry',
    badge: null,
  },
  {
    title: 'Periodontal Care',
    img: '/dental services/Periodontal Gum Disease.jpg',
    icon: 'tooth-4.png',
    desc: 'LANAP® laser, Pinhole® technique, and gum recession surgery.',
    href: '/services/periodontal-gum-disease',
    badge: null,
  },
  {
    title: 'Dental Implants',
    img: '/dental services/Dental Implants.jpg',
    icon: 'tooth-4.png',
    desc: 'Permanent, natural-looking tooth replacement with surgical precision.',
    href: '/services/dental-implants',
    badge: null,
  },
  {
    title: 'Porcelain Veneers',
    img: '/dental services/Porcelain Veneers.jpg',
    icon: 'tooth-2.png',
    desc: 'Hand-crafted veneers for a flawless, naturally beautiful smile.',
    href: '/services/porcelain-veneers',
    badge: null,
  },
  {
    title: 'Tele-Dentistry',
    img: '/dental services/Teledentistry treatment.jpg',
    icon: 'tooth-3.png',
    desc: 'Virtual consultations from anywhere — convenience meets expert care.',
    href: '/services/tele-dentistry',
    badge: null,
  },
];

export default function Services() {
  return (
    <>
      <section id="subheader" className="bg-color-op-1 text-center">
        <div className="container relative z-2">
          <div className="row align-items-center">
            <div className="col-lg-12">
              <h1 className="wow fadeInUp">Our Services</h1>
              <div className="border-bottom my-3"></div>
              <ul className="crumb wow fadeInDown">
                <li><Link href="/">Home</Link></li>
                <li className="active">Our Services</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="services-photo-section">
        <div className="container">
          <div className="row g-4 justify-content-center text-center mb-2">
            <div className="col-lg-8">
              <div className="subtitle wow fadeInUp mb-3">Complete Care</div>
              <h2 className="wow fadeInUp" data-wow-delay=".2s">Every Service Your Smile Deserves</h2>
              <p className="mb-0 wow fadeInUp">
                World-class dental expertise — from routine checkups to advanced procedures —
                delivered with artistry, precision and a personal touch.
              </p>
            </div>
          </div>
          <div className="spacer-single"></div>

          <div className="row g-4">
            {services.map((service, idx) => (
              <div className="col-xl-3 col-lg-6 col-md-6 col-12 d-flex" key={service.title}>
                <div
                  className="svc-photo-card w-100 wow fadeInUp"
                  data-wow-delay={`${(idx % 4) * 0.1}s`}
                >
                  <div className="svc-photo-wrap">
                    <img src={service.img} alt={service.title} className="svc-photo-img" />
                    <div className="svc-photo-overlay" />
                    {service.badge && <div className="svc-badge">{service.badge}</div>}
                  </div>
                  <div className="svc-photo-body">
                    <div className="svc-icon-wrap">
                      <img src={`/images/icons/${service.icon}`} alt="" />
                    </div>
                    <h4 className="svc-photo-title">{service.title}</h4>
                    <p className="svc-photo-desc">{service.desc}</p>
                    <Link href={service.href} className="svc-photo-btn">
                      Explore <span className="svc-btn-arrow">→</span>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-color text-light pt-40 pb-40">
        <div className="container">
          <div className="row g-4 align-items-center">
            <div className="col-md-9">
              <h3 className="mb-0 fs-32 text-white">Ready to book your dental care session?</h3>
            </div>
            <div className="col-lg-3 text-lg-end">
              <Link className="btn-main btn-line fx-slide" href="/booking"><span>Book Appointment</span></Link>
            </div>
          </div>
        </div>
      </section>

      <MapContactSection />
      <Footer />
    </>
  );
}
