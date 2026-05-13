'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import CardSwap, { Card } from '@/components/CardSwap';
import MapContactSection from '@/components/MapContactSection';
import Footer from '@/components/Footer';

export default function Home() {
  const bgImages = ['/images/background/5.png', '/images/background/6.png'];
  const heroContent = [
    {
      subtitle: "Leading Midtown Dentist",
      title: "UEDI is the leading dental office in Midtown for Invisalign and veneers"
    },
    {
      subtitle: "New York City Dental",
      title: "Elevated dental experience in the heart of NYC"
    }
  ];

  const portfolioImages = [
    '/before and after/01-259x300.webp',
    '/before and after/02-259x300.webp',
    '/before and after/03-259x300.webp',
    '/before and after/01-259x300 (1).webp'
  ];

  const videoIds = ["t9qpsdYNPc0", "1grIDPK_6uE", "iCoNhlEWBjY"];

  const [currentBg, setCurrentBg] = useState(0);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [currentTesti, setCurrentTesti] = useState(0);
  const [portfolioPreview, setPortfolioPreview] = useState<number | null>(null);
  const [videoPreview, setVideoPreview] = useState<string | null>(null);

  const testimonials = [
    {
      name: "Stefania",
      img: "1.webp",
      stars: 5,
      text: "Dr. Harvey wants your smile to be perfect so get ready! She is precise and very attentive to details. She will work with your schedule and your needs. Friendly and patient oriented. Highly recommended!",
      source: "Google"
    },
    {
      name: "Michael S.",
      img: "2.webp",
      stars: 5,
      text: "I’ve always been nervous about dental visits, but the staff made me feel completely comfortable. Their gentle care and attention to detail truly stand out.",
      source: "Google"
    },
    {
      name: "Robert L.",
      img: "3.webp",
      stars: 5,
      text: "My family and I have been coming here for years. The service is exceptional, and the team always goes the extra mile to make sure we’re happy.",
      source: "Google"
    }
  ];

  const faqs = [
    { q: "How often should I visit the dentist?", a: "It’s recommended to see your dentist every 6 months for a routine checkup and cleaning to maintain optimal oral health." },
    { q: "What should I do in a dental emergency?", a: "Call our office immediately at 212.697.1701 for same-day emergency care. We prioritize urgent cases to provide quick relief." },
    { q: "Do you offer services for kids?", a: "Absolutely! We provide friendly pediatric dental care in a welcoming environment to help children develop healthy habits." },
    { q: "What are my options for replacing missing teeth?", a: "We offer several advanced solutions including dental implants, bridges, and customized dentures to restore your smile." },
    { q: "Is teeth whitening safe?", a: "Yes, when performed by a dental professional, teeth whitening is safe and highly effective for brightening your smile." }
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentBg((prev) => (prev + 1) % bgImages.length);
    }, 10000);
    return () => clearTimeout(timer);
  }, [currentBg, bgImages.length]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { setPortfolioPreview(null); setVideoPreview(null); }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  useEffect(() => {
    document.body.style.overflow = (portfolioPreview !== null || videoPreview !== null) ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [portfolioPreview, videoPreview]);


  return (
    <>
      {/* Hero Section */}
      <section id="section-intro" className="text-light no-top no-bottom relative overflow-hidden">
        <div className="relative">
          <div className="abs abs-centered w-100 z-2">
            <div className="container">
              <div className="row g-4 align-items-center">
                <div className="col-lg-8">
                  <div className="spacer-single sm-hide"></div>
                  <div className="subtitle wow fadeInUp" key={`sub-${currentBg}`}>{heroContent[currentBg].subtitle}</div>
                  <h1 className="wow fadeInUp mb-4" key={`title-${currentBg}`} style={{ maxWidth: '800px' }}>
                    {heroContent[currentBg].title}
                  </h1>
                  <Link className="btn-main btn-line fx-slide" href="/booking"><span>Book Appointment</span></Link>
                </div>
              </div>
            </div>
          </div>

          <div className="mh-800 relative">
            {bgImages.map((img, index) => (
              <div
                key={index}
                className="abs w-100 h-100 swiper-inner"
                style={{
                  backgroundImage: `url(${img})`,
                  backgroundPosition: 'center',
                  backgroundSize: 'cover',
                  backgroundRepeat: 'no-repeat',
                  opacity: currentBg === index ? 1 : 0,
                  transition: 'opacity 1.5s ease-in-out',
                  zIndex: currentBg === index ? 1 : 0,
                  position: 'absolute',
                  top: 0,
                  left: 0
                }}
              >
                <div className="sw-overlay op-5"></div>
                <div className="gradient-edge-left z-2"></div>
              </div>
            ))}

            <div className="abs z-3" style={{ bottom: '40px', left: '50%', transform: 'translateX(-50%)' }}>
              <div className="d-flex justify-content-center gap-3">
                {bgImages.map((_, index) => (
                  <div
                    key={index}
                    onClick={() => setCurrentBg(index)}
                    className="cursor-pointer"
                    style={{
                      width: currentBg === index ? '45px' : '14px',
                      height: '14px',
                      borderRadius: '7px',
                      backgroundColor: currentBg === index ? '#4A7CD2' : 'rgba(255,255,255,0.6)',
                      transition: 'all 0.4s ease',
                      boxShadow: '0 4px 15px rgba(0,0,0,0.3)'
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Info Boxes */}
      <section className="bg-dark text-light pt-50 pb-30">
        <div className="container relative">
          <div className="row g-4 justify-content-center">
            <div className="col-lg-4 col-md-6">
              <Link href="tel:+12126971701" className="info-box-floating">
                <i className="fs-60 id-color icon_phone"></i>
                <div className="ms-3">
                  <h4 className="mb-0">Need Dental Services?</h4>
                  <p className="mb-0">Call: 212.697.1701</p>
                </div>
              </Link>
            </div>

            <div className="col-lg-4 col-md-6">
              <Link href="/booking" className="info-box-floating">
                <i className="fs-60 id-color icon_calendar"></i>
                <div className="ms-3">
                  <h4 className="mb-0">BOOK A TELE-CONSULT</h4>
                  <p className="mb-0">Virtual Consultation</p>
                </div>
              </Link>
            </div>

            <div className="col-lg-4 col-md-6 dropdown-info-box">
              <div className="info-box-floating">
                <i className="fs-60 id-color icon_wallet"></i>
                <div className="ms-3">
                  <h4 className="mb-0">Pay my bill <i className="arrow_carrot-down fs-14 ms-1"></i></h4>
                  <p className="mb-0">Choose payment method</p>
                </div>
              </div>
              <div className="dropdown-content">
                <Link href="/payment/credit-card">Credit Card (3% fee applies)</Link>
                <Link href="/payment/zelle">Pay by Zelle (no fee)</Link>
                <Link href="/payment/cherry">Cherry Financing</Link>
                <Link href="/payment/care-credit">Care Credit</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="bg-light">
        <div className="container">
          <div className="row g-5 align-items-center">
            <div className="col-lg-6 wow fadeInLeft" data-wow-delay=".2s">
              <div className="about-img-container">
                <img src="/about us section main.jpg" className="about-img-main" alt="About Main" />
                <div className="about-img-small-wrap">
                  <img src="/about us section small.webp" className="about-img-small" alt="About Small" />
                </div>
              </div>
            </div>

            <div className="col-lg-6 wow fadeInRight" data-wow-delay=".4s">
              <div className="ps-lg-4">
                <div className="about-subtitle">Our Story</div>
                <h2 className="about-title">Dental Innovations</h2>
                <div className="about-mission">Our Mission at Upper East Dental Innovations</div>
                <p className="about-text">
                  Upper East Dental Innovations is a state-of-the-art New York-based oral healthcare practice where artistry, beauty, craftsmanship and technology are the cornerstones of our truly innovative dental practice. Upper East Dental Innovations utilizes cutting edge technologies that deliver aesthetic, superior outcomes, as well as more accurate and faster diagnosis of oral and overall health conditions. Our technology is so advanced that we can offer our patients a permanent crown over their lunch hour, hence "The Lunchtime Crown."
                </p>

                <hr style={{ borderColor: 'rgba(0,0,0,0.12)', margin: '24px 0' }} />

                <div className="d-flex align-items-center justify-content-between">
                  <Link href="/about" className="btn-main"><span>Read More</span></Link>
                  <Link href="/video" className="btn-watch-video">
                    <div className="play-icon">
                      <i className="arrow_triangle-right"></i>
                    </div>
                    <span>Watch Video</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="services-photo-section">
        <div className="container">
          <div className="row g-4 justify-content-center text-center mb-2">
            <div className="col-lg-8">
              <div className="subtitle wow fadeInUp mb-3">Our Services</div>
              <h2 className="wow fadeInUp" data-wow-delay=".2s">Complete Care for Every Smile</h2>
              <p className="mb-0 wow fadeInUp">World-class dental expertise delivered with artistry and precision.</p>
            </div>
          </div>
          <div className="spacer-single"></div>

          <div className="row g-4">
            {[
              {
                title: "Cosmetic Dentistry",
                img: "/dental services/Cosmetic Dentistry.webp",
                icon: "tooth-2.png",
                desc: "Transform your smile with veneers, Invisalign, whitening and same-day crowns.",
                href: "/services/cosmetic-dentistry",
                badge: "Most Popular"
              },
              {
                title: "Restorative Dentistry",
                img: "/dental services/Restorative dentistry.webp",
                icon: "tooth-4.png",
                desc: "Dental implants, bridges, crowns and full-mouth reconstruction — built to last.",
                href: "/services/restorative-dentistry",
                badge: null
              },
              {
                title: "Holistic Dentistry",
                img: "/dental services/Holistic Dentistry.webp",
                icon: "tooth-1.png",
                desc: "Biocompatible, whole-body dental care for your total health and wellness.",
                href: "/services/holistic-dentistry",
                badge: null
              },
              {
                title: "Advanced & Specialized Treatments",
                img: "/dental services/Advanced & Specialized Treatments.jpeg",
                icon: "tooth-3.png",
                desc: "Endodontics, sedation, sleep apnea treatment, and stem cell dentistry.",
                href: "/services/advanced-treatments",
                badge: null
              }
            ].map((service, idx) => (
              <div className="col-xl-3 col-lg-6 col-md-6 col-12 d-flex" key={idx}>
                <div className="svc-photo-card w-100 wow fadeInUp" data-wow-delay={`${idx * 0.1}s`}>
                  {/* Photo */}
                  <div className="svc-photo-wrap">
                    <img src={service.img} alt={service.title} className="svc-photo-img" />
                    <div className="svc-photo-overlay" />
                    {service.badge && (
                      <div className="svc-badge">{service.badge}</div>
                    )}
                  </div>
                  {/* Body */}
                  <div className="svc-photo-body">
                    <div className="svc-icon-wrap">
                      <img src={`images/icons/${service.icon}`} alt="" />
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

          <div className="col-lg-12 mt-5 text-center">
            <Link className="btn-main fx-slide" href="/services"><span>To learn more about our service</span></Link>
          </div>
        </div>
      </section>

      {/* ── About The Doctor Section ─────────────────────────────────── */}
      <section className="doctor-section">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="text-center mb-5"
          >
            <h2 className="doctor-heading">About The Doctor</h2>
          </motion.div>

          <div className="row g-5 align-items-center">
            {/* Left — Photo */}
            <motion.div
              initial={{ opacity: 0, x: -50, rotateY: -8 }}
              whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="col-lg-5"
            >
              <div className="doctor-photo-wrap">
                <div className="doctor-photo-decor doctor-photo-decor-1" />
                <div className="doctor-photo-decor doctor-photo-decor-2" />
                <div className="doctor-photo-frame">
                  <img src="/Dr harvey.webp" alt="Dr. Sharde Harvey, D.D.S M.S F.I.C.O.I" />
                  <div className="doctor-photo-glow" />
                </div>
              </div>
            </motion.div>

            {/* Right — Bio */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="col-lg-7"
            >
              <h3 className="doctor-name">Dr. Sharde Harvey, D.D.S M.S F.I.C.O.I</h3>
              <p className="doctor-role"><em>is a skilled New York City General Dentist</em></p>

              <div className="doctor-bio">
                <p>
                  Dr. Harvey is currently in the Department of Otolaryngology Head and Neck Surgery, Lenox Hill Hospital and is a clinical instructor on faculty in the Department of Cariology and Comprehensive Care at New York University College of Dentistry.
                </p>
                <p>
                  She is a graduate of New York University College of Dentistry, and spent her last year at NYU in the Honors Esthetics program doing full mouth veneers, similar to those seen on television programs such as Extreme Makeover. After dental school, she attended a rigorous one year residency program at Long Island College Hospital. After residency, Dr. Harvey finished a two-year post-graduate program in implant surgery and prosthetics at NYU. She is also certified in Invisalign® as well as Botox administration, useful in treatment of TMJ (Temporomandibular Joint Disorder) and headaches.
                </p>
              </div>

              <div className="row g-4 mt-3 doctor-credentials">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="col-md-6"
                >
                  <h5 className="doctor-credentials-title">Professional Memberships</h5>
                  <ul className="doctor-list">
                    <li>The American Dental Association</li>
                    <li>The New York State Dental Association</li>
                    <li>The New York County Dental Association</li>
                    <li>Holistic Dental Association</li>
                    <li>American Academy of Dental Sleep Medicine</li>
                  </ul>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  className="col-md-6"
                >
                  <h5 className="doctor-credentials-title">Awards &amp; Publications</h5>
                  <ul className="doctor-list">
                    <li>Certificate of Achievement in Aesthetic Dentistry</li>
                    <li>Certified in Botox for Treatment of TMJ and Headaches</li>
                  </ul>

                  <h5 className="doctor-credentials-title mt-4">Languages Spoken</h5>
                  <div className="doctor-lang-chips">
                    <span>English</span>
                    <span>French</span>
                    <span>Spanish</span>
                  </div>
                </motion.div>
              </div>

              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.7 }}
                className="doctor-hobby"
              >
                In her spare time, Dr. Harvey practices Bikram Yoga and enjoys oil painting.
              </motion.p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Count Section */}
      <section className="bg-dark text-light pt-60 pb-60">
        <div className="container">
          <div className="row g-4">
            <div className="col-md-3 col-sm-6 text-center">
              <div className="de_count wow fadeInRight" data-wow-delay=".0s">
                <h3 className="fs-40 mb-0">10000+</h3>
                Happy Patients
              </div>
            </div>
            <div className="col-md-3 col-sm-6 text-center">
              <div className="de_count wow fadeInRight" data-wow-delay=".2s">
                <h3 className="fs-40 mb-0">2500+</h3>
                Teeth Whitened
              </div>
            </div>
            <div className="col-md-3 col-sm-6 text-center">
              <div className="de_count wow fadeInRight" data-wow-delay=".4s">
                <h3 className="fs-40 mb-0">800+</h3>
                Dental Implants
              </div>
            </div>
            <div className="col-md-3 col-sm-6 text-center">
              <div className="de_count wow fadeInRight" data-wow-delay=".6s">
                <h3 className="fs-40 mb-0">15+</h3>
                Years of Experience
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Section */}
      <section>
        <div className="container">
          <div className="row gy-4 gx-5 align-items-center">
            <div className="col-lg-6">
              <div className="subtitle id-color wow fadeInUp" data-wow-delay=".0s">Why Choose Our Dental Care</div>
              <h2 className="wow fadeInUp" data-wow-delay=".2s">Exceptional Service With a Personal Touch</h2>
              <p className="wow fadeInUp" data-wow-delay=".4s">Choosing the right dental provider matters. We combine expert care, advanced technology, and a warm atmosphere.</p>
              <div className="border-bottom mb-4"></div>
              <div className="row g-4">
                <div className="col-sm-6">
                  <div className="relative wow fadeInUp">
                    <h5>Experienced Dental</h5>
                    <p className="mb-0">Skilled care backed by years of trusted dental experience.</p>
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="relative wow fadeInUp">
                    <h5>Advanced Technology</h5>
                    <p className="mb-0">Modern tools ensure accurate and efficient treatments.</p>
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="relative wow fadeInUp">
                    <h5>Personalized Treatment</h5>
                    <p className="mb-0">Custom care plans made to fit your smile and lifestyle.</p>
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="relative wow fadeInUp">
                    <h5>Family-Friendly</h5>
                    <p className="mb-0">Welcoming space for patients of all ages.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-6">
              <div className="row g-4 align-items-center">
                <div className="col-6 text-end">
                  <div className="w-80 rounded-1 overflow-hidden mb-25 wow zoomIn d-inline-block">
                    <img src="images/misc/s2.webp" className="w-100 wow scaleIn" alt="" />
                  </div>
                  <div className="w-100 rounded-1 overflow-hidden mb-25 wow zoomIn d-inline-block">
                    <img src="images/misc/s3.webp" className="w-100 wow scaleIn" alt="" />
                  </div>
                </div>
                <div className="col-6">
                  <div className="w-100 rounded-1 overflow-hidden mb-25 wow zoomIn d-inline-block">
                    <img src="images/misc/p3.webp" className="w-100 wow scaleIn" alt="" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section className="portfolio-section">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-5 order-2 order-lg-1">
              <div className="portfolio-subtitle wow fadeInUp">Our Portfolio</div>
              <h2 className="portfolio-title text-start wow fadeInUp" data-wow-delay=".2s">Real People, Real Results</h2>
              <p className="text-white op-7 mb-4 wow fadeInUp" data-wow-delay=".3s">
                Experience the life-changing impact of our dental expertise. Our portfolio showcases the dedication and precision we bring to every smile transformation.
              </p>
              <div className="wow fadeInUp" data-wow-delay=".4s">
                <Link href="/portfolio" className="btn-main fx-slide portfolio-btn-custom"><span>View All Portfolio</span></Link>
              </div>
            </div>
            <div className="col-lg-7 order-1 order-lg-2">
              <div className="cardswap-wrap" style={{ height: '620px', position: 'relative' }}>
                <CardSwap
                  cardDistance={60}
                  verticalDistance={70}
                  delay={5000}
                  pauseOnHover={true}
                  width={440}
                  height={540}
                  onCardPreview={(i) => setPortfolioPreview(i)}
                >
                  {portfolioImages.map((img, i) => (
                    <Card key={i} style={{
                      border: '3px solid transparent',
                      background: 'linear-gradient(#000A5B, #000A5B) padding-box, linear-gradient(135deg, #D4AF37 0%, #4A7CD2 55%, #7BA7E8 100%) border-box',
                      boxShadow: '0 28px 70px rgba(0,0,0,0.7), 0 0 50px rgba(74,124,210,0.45), 0 0 100px rgba(212,175,55,0.12)',
                      cursor: 'pointer',
                    }}>
                      <div style={{ position: 'relative', width: '100%', height: '100%' }}>
                        <img src={img} alt={`Smile Transformation ${i + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                        <div style={{
                          position: 'absolute', bottom: 0, left: 0, right: 0,
                          background: 'linear-gradient(transparent, rgba(0,0,10,0.88))',
                          padding: '48px 18px 18px',
                          textAlign: 'center', color: '#fff',
                        }}>
                          <span style={{ fontSize: '10px', letterSpacing: '4px', textTransform: 'uppercase', fontWeight: 700, opacity: 0.85 }}>Before & After</span>
                        </div>
                        <div style={{
                          position: 'absolute', top: '14px', right: '14px',
                          width: '36px', height: '36px',
                          background: 'linear-gradient(135deg, #D4AF37, #4A7CD2)',
                          borderRadius: '50%',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          boxShadow: '0 4px 16px rgba(74,124,210,0.6)',
                          fontSize: '15px', color: '#fff', fontWeight: 700,
                        }}>+</div>
                      </div>
                    </Card>
                  ))}
                </CardSwap>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="bg-color-op-1">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 offset-lg-3 text-center">
              <div className="subtitle wow fadeInUp mb-3">Meet Our Dental Team</div>
              <h2 className="wow fadeInUp" data-wow-delay=".2s">Committed to Your Smile</h2>
              <p className="wow fadeInUp">Our experienced dental team is here to make every visit positive.</p>
              <div className="spacer-single"></div>
            </div>
          </div>
          <div className="row g-4">
            {[
              { name: "Dr. Sarah Bennett", role: "Lead Dentist", img: "1.webp" },
              { name: "Dr. Maya Lin", role: "Cosmetic Dentist", img: "2.webp" },
              { name: "Dr. Michael Reyes", role: "Pediatric Specialist", img: "3.webp" },
              { name: "Dr. James Carter", role: "Dental Hygienist", img: "4.webp" }
            ].map((member, idx) => (
              <div className="col-lg-3 col-md-6" key={idx}>
                <div className="relative rounded-1 overflow-hidden">
                  <div className="rounded-1 overflow-hidden wow fadeIn zoomIn">
                    <img src={`images/team/${member.img}`} className="w-100 wow scaleIn" alt={member.name} />
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

      {/* FAQ Section */}
      <section>
        <div className="container">
          <div className="row g-4">
            <div className="col-lg-5">
              <div className="subtitle id-color wow fadeInUp">Everything You Need to Know</div>
              <h2 className="wow fadeInUp" data-wow-delay=".2s">Frequently Asked Questions</h2>
            </div>
            <div className="col-lg-7">
              <div className="react-accordion">
                {faqs.map((item, idx) => (
                  <div key={idx} className={`accordion-item-wrap ${activeFaq === idx ? 'active' : ''}`}>
                    <div
                      className="accordion-title-custom"
                      onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                    >
                      {item.q}
                      <i className={`arrow_carrot-${activeFaq === idx ? 'up' : 'down'}`}></i>
                    </div>
                    <div
                      className="accordion-content-custom"
                      style={{
                        maxHeight: activeFaq === idx ? '200px' : '0',
                        opacity: activeFaq === idx ? 1 : 0,
                        overflow: 'hidden',
                        transition: 'all 0.4s ease-in-out',
                        padding: activeFaq === idx ? '15px 0' : '0'
                      }}
                    >
                      {item.a}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section - Now positioned after FAQ */}
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

      {/* Testimonials (Premium Single Slide) */}
      <section className="bg-color-op-1 pt-100 pb-100">
        <div className="container text-center">
          <div className="subtitle id-color wow fadeInUp mb-3">Testimonials Revealed</div>
          <h2 className="wow fadeInUp fs-60 mb-5" data-wow-delay=".2s">Hear Why Our Patients Love Us</h2>

          <div className="testimonial-single-wrapper relative wow fadeInUp" data-wow-delay=".4s">
            <div className="testimonial-nav-btn prev" onClick={() => setCurrentTesti((prev) => (prev - 1 + testimonials.length) % testimonials.length)}>
              <i className="arrow_carrot-left"></i>
            </div>

            <div className="testimonial-content-area">
              <div className="d-flex align-items-center justify-content-center mb-4">
                <img src={`images/testimonial/${testimonials[currentTesti].img}`} className="testi-avatar-premium" alt={testimonials[currentTesti].name} />
                <div className="text-start ms-3">
                  <h4 className="mb-1">{testimonials[currentTesti].name}</h4>
                  <div className="stars-rating">
                    {[...Array(testimonials[currentTesti].stars)].map((_, i) => (
                      <i key={i} className="fa fa-star text-warning"></i>
                    ))}
                  </div>
                </div>
              </div>
              <p className="testi-text-premium mb-4">
                {testimonials[currentTesti].text}
              </p>
              <div className="testi-source-premium">
                Posted On <Link href="https://google.com" target="_blank" className="id-color fw-bold">{testimonials[currentTesti].source}</Link>
              </div>
            </div>

            <div className="testimonial-nav-btn next" onClick={() => setCurrentTesti((prev) => (prev + 1) % testimonials.length)}>
              <i className="arrow_carrot-right"></i>
            </div>
          </div>
        </div>
      </section>

      {/* Video Testimonials Section */}
      <section className="bg-dark pt-100 pb-100 overflow-hidden">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-5 order-2 order-lg-2">
              <div className="portfolio-subtitle wow fadeInUp">Patient Stories</div>
              <h2 className="portfolio-title text-start wow fadeInUp" data-wow-delay=".2s">Video Testimonials</h2>
              <p className="text-white op-7 mb-4 wow fadeInUp" data-wow-delay=".3s">
                Listen to our patients share their personal journeys and experiences. Discover why UEDI is the trusted choice for premium dental care.
              </p>
              <div className="wow fadeInUp" data-wow-delay=".4s">
                <Link href="/testimonials" className="btn-main fx-slide"><span>Watch More Stories</span></Link>
              </div>
            </div>
            <div className="col-lg-7 order-1 order-lg-1">
              <div className="cardswap-wrap cardswap-wrap--video" style={{ height: '460px', position: 'relative' }}>
                <CardSwap
                  cardDistance={60}
                  verticalDistance={70}
                  delay={5000}
                  pauseOnHover={true}
                  width={500}
                  height={340}
                  easing="power"
                  onCardPreview={(i) => setVideoPreview(videoIds[i])}
                >
                  {videoIds.map((id) => (
                    <Card key={id} style={{
                      border: '3px solid transparent',
                      background: 'linear-gradient(#0a0f1e, #0a0f1e) padding-box, linear-gradient(135deg, #1a237e 0%, #4A7CD2 55%, #7BA7E8 100%) border-box',
                      boxShadow: '0 24px 60px rgba(0,0,0,0.85), 0 0 45px rgba(74,124,210,0.5)',
                      cursor: 'pointer',
                    }}>
                      <div style={{ position: 'relative', width: '100%', height: '100%' }}>
                        <img
                          src={`https://img.youtube.com/vi/${id}/hqdefault.jpg`}
                          alt="Patient Testimonial"
                          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                        />
                        <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.28)' }} />
                        <div style={{
                          position: 'absolute', top: '50%', left: '50%',
                          transform: 'translate(-50%, -50%)',
                          width: '62px', height: '62px',
                          background: 'rgba(255,255,255,0.96)',
                          borderRadius: '50%',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          boxShadow: '0 8px 32px rgba(0,0,0,0.5), 0 0 0 8px rgba(255,255,255,0.18)',
                        }}>
                          <div style={{ width: 0, height: 0, borderTop: '11px solid transparent', borderBottom: '11px solid transparent', borderLeft: '19px solid #4A7CD2', marginLeft: '5px' }} />
                        </div>
                        <div style={{
                          position: 'absolute', bottom: 0, left: 0, right: 0,
                          background: 'linear-gradient(transparent, rgba(0,0,0,0.88))',
                          padding: '36px 16px 16px',
                          textAlign: 'center', color: '#fff',
                        }}>
                          <span style={{ fontSize: '10px', letterSpacing: '3px', textTransform: 'uppercase', fontWeight: 700, opacity: 0.85 }}>Watch Story</span>
                        </div>
                      </div>
                    </Card>
                  ))}
                </CardSwap>
              </div>
            </div>
          </div>
        </div>
      </section>

      <MapContactSection />

      {/* ── Portfolio Preview Modal ──────────────────────────────────── */}
      <AnimatePresence>
        {portfolioPreview !== null && (
          <motion.div
            className="preview-modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => setPortfolioPreview(null)}
            style={{
              position: 'fixed', inset: 0,
              background: 'rgba(0,4,30,0.96)',
              backdropFilter: 'blur(24px)',
              zIndex: 2147483647,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              perspective: '1400px',
              padding: '20px',
            }}
          >
            {/* Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.3, rotateY: -28, rotateX: 12, y: 100 }}
              animate={{ opacity: 1, scale: 1, rotateY: 0, rotateX: 0, y: 0 }}
              exit={{ opacity: 0, scale: 0.3, rotateY: 28, y: 80 }}
              transition={{ type: 'spring', damping: 22, stiffness: 270 }}
              onClick={(e) => e.stopPropagation()}
              style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '18px' }}
            >
              {/* Gradient border frame — explicit width forces image to scale up */}
              <div style={{
                background: 'linear-gradient(135deg, #D4AF37 0%, #4A7CD2 55%, #7BA7E8 100%)',
                padding: '5px', borderRadius: '26px',
                boxShadow: '0 30px 90px rgba(0,0,0,0.85), 0 0 80px rgba(74,124,210,0.55), 0 0 140px rgba(212,175,55,0.2)',
                width: 'clamp(260px, min(52vw, 520px), 92vw)',
              }}>
                <div style={{ borderRadius: '22px', overflow: 'hidden', position: 'relative', background: '#000A5B', lineHeight: 0 }}>
                  <img
                    src={portfolioImages[portfolioPreview]}
                    alt={`Smile Transformation ${portfolioPreview + 1}`}
                    style={{
                      display: 'block',
                      width: '100%',        /* fill wrapper → image scales up */
                      height: 'auto',
                      maxHeight: '78vh',
                      objectFit: 'cover',
                    }}
                  />
                </div>
              </div>

              {/* Close */}
              <button onClick={() => setPortfolioPreview(null)} style={{
                position: 'absolute', top: '-18px', right: '-18px',
                width: '44px', height: '44px', background: '#fff', border: 'none',
                borderRadius: '50%', fontSize: '20px', fontWeight: 800, cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: '#1a3352', boxShadow: '0 6px 24px rgba(0,0,0,0.5)', lineHeight: 1,
              }}>×</button>

              {/* Dot indicators */}
              <div style={{ display: 'flex', gap: '10px' }}>
                {portfolioImages.map((_, idx) => (
                  <div key={idx} onClick={() => setPortfolioPreview(idx)} style={{
                    width: portfolioPreview === idx ? '32px' : '10px', height: '10px',
                    borderRadius: '5px', cursor: 'pointer',
                    background: portfolioPreview === idx ? 'linear-gradient(90deg,#D4AF37,#4A7CD2)' : 'rgba(255,255,255,0.3)',
                    transition: 'all 0.35s ease',
                  }} />
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Video Preview Modal ──────────────────────────────────────── */}
      <AnimatePresence>
        {videoPreview && (
          <motion.div
            className="preview-modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => setVideoPreview(null)}
            style={{
              position: 'fixed', inset: 0,
              background: 'rgba(0,0,0,0.96)',
              backdropFilter: 'blur(24px)',
              zIndex: 2147483647,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              perspective: '1400px',
            }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.35, rotateY: -22, rotateX: 10, y: 80 }}
              animate={{ opacity: 1, scale: 1, rotateY: 0, rotateX: 0, y: 0 }}
              exit={{ opacity: 0, scale: 0.35, rotateY: 22, y: 80 }}
              transition={{ type: 'spring', damping: 22, stiffness: 270 }}
              onClick={(e) => e.stopPropagation()}
              style={{ position: 'relative', width: 'min(82vw, 920px)' }}
            >
              {/* Gradient border frame */}
              <div style={{
                background: 'linear-gradient(135deg, #1a237e 0%, #4A7CD2 55%, #7BA7E8 100%)',
                padding: '4px', borderRadius: '22px',
                boxShadow: '0 30px 90px rgba(0,0,0,0.95), 0 0 80px rgba(74,124,210,0.6)',
              }}>
                <div style={{ borderRadius: '18px', overflow: 'hidden', aspectRatio: '16/9', background: '#000' }}>
                  <iframe
                    width="100%" height="100%"
                    src={`https://www.youtube.com/embed/${videoPreview}?autoplay=1&rel=0`}
                    title="Patient Testimonial"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                    style={{ border: 'none', display: 'block', width: '100%', height: '100%' }}
                  />
                </div>
              </div>

              {/* Close */}
              <button onClick={() => setVideoPreview(null)} style={{
                position: 'absolute', top: '-20px', right: '-20px',
                width: '48px', height: '48px', background: '#fff', border: 'none',
                borderRadius: '50%', fontSize: '22px', fontWeight: 800, cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: '#1a3352', boxShadow: '0 6px 24px rgba(0,0,0,0.6)',
                lineHeight: 1,
              }}>×</button>

              {/* Video nav dots */}
              <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginTop: '20px' }}>
                {videoIds.map((id) => (
                  <div key={id} onClick={() => setVideoPreview(id)} style={{
                    width: videoPreview === id ? '32px' : '10px', height: '10px',
                    borderRadius: '5px', cursor: 'pointer',
                    background: videoPreview === id ? 'linear-gradient(90deg,#1a237e,#4A7CD2)' : 'rgba(255,255,255,0.25)',
                    transition: 'all 0.35s ease',
                  }} />
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer */}
      <Footer />
    </>
  );
}
