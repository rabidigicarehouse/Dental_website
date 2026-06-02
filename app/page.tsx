'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import CardSwap, { Card } from '@/components/CardSwap';
import TeethCompareSlider from '@/components/TeethCompareSlider';
import StackedSectionSlider from '@/components/StackedSectionSlider';
import MapContactSection from '@/components/MapContactSection';
import Footer from '@/components/Footer';
import IconMarquee from '@/components/IconMarquee';
import { TEXT_TESTIMONIALS } from '@/lib/testimonials';

export default function Home() {
  const storyVideoId = "WmNFiHfmM0o";
  const bgImages = [
    '/hero_carousel/image_094.jpg',
    '/hero_carousel/image_119.jpg',
    '/hero_carousel/image_121.jpg',
    '/hero_carousel/image_055.jpg',
    '/hero_carousel/image_126.jpg',
    '/hero_carousel/image_133.jpg'
  ];
  const heroContent = [
    {
      subtitle: "Leading Midtown Dentist",
      title: "UEDI is the leading dental office in Midtown for Invisalign and veneers"
    },
    {
      subtitle: "New York City Dental",
      title: "Elevated dental experience in the heart of NYC"
    },
    {
      subtitle: "Modern Aesthetics",
      title: "State-of-the-art facility designed for your premium comfort"
    },
    {
      subtitle: "World-Class Expertise",
      title: "Compassionate dental care with precision and cosmetic artistry"
    },
    {
      subtitle: "Smile Transformations",
      title: "Crafting beautiful, healthy, and natural-looking smiles"
    },
    {
      subtitle: "Trusted Patient Care",
      title: "Personalized treatment plans backed by decades of dental expertise"
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
  const [isPaused, setIsPaused] = useState(false);
  const [isMobileViewport, setIsMobileViewport] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 1024px)');
    const update = () => setIsMobileViewport(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [currentTesti, setCurrentTesti] = useState(0);
  const [portfolioPreview, setPortfolioPreview] = useState<number | null>(null);
  const [videoPreview, setVideoPreview] = useState<string | null>(null);

  const testimonials = TEXT_TESTIMONIALS;

  const faqs = [
    { q: "How often should I visit the dentist?", a: "It’s recommended to see your dentist every 6 months for a routine checkup and cleaning to maintain optimal oral health." },
    { q: "What should I do in a dental emergency?", a: "Call our office immediately at 212.697.1701 for same-day emergency care. We prioritize urgent cases to provide quick relief." },
    { q: "Do you offer services for kids?", a: "Absolutely! We provide friendly pediatric dental care in a welcoming environment to help children develop healthy habits." },
    { q: "What are my options for replacing missing teeth?", a: "We offer several advanced solutions including dental implants, bridges, and customized dentures to restore your smile." },
    { q: "Is teeth whitening safe?", a: "Yes, when performed by a dental professional, teeth whitening is safe and highly effective for brightening your smile." }
  ];

  useEffect(() => {
    if (isPaused) return;
    const timer = setTimeout(() => {
      setCurrentBg((prev) => (prev + 1) % bgImages.length);
    }, 10000);
    return () => clearTimeout(timer);
  }, [currentBg, bgImages.length, isPaused]);

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

  const modalVideoIds = videoPreview && !videoIds.includes(videoPreview)
    ? [storyVideoId, ...videoIds]
    : videoIds;


  return (
    <>
      {/* Hero Section */}
      <section 
        id="section-intro" 
        className="text-light no-top no-bottom relative" 
        style={{ zIndex: 10, overflow: 'visible' }}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div className="relative">
          <div className="abs abs-centered w-100 z-2 hero-content-layer">
            <div className="container">
              <div className="row g-4 align-items-center">
                <div className="col-lg-8">
                  <div className="spacer-single sm-hide"></div>
                  <div className="hero-glass-container">
                    <div className="subtitle wow fadeInUp" key={`sub-${currentBg}`}>{heroContent[currentBg].subtitle}</div>
                    <h1 className="wow fadeInUp mb-4" key={`title-${currentBg}`} style={{ maxWidth: '800px' }}>
                      {heroContent[currentBg].title}
                    </h1>
                    <Link className="btn-main fx-slide" href="#book" data-hover="Book Appointment"><span>Book Appointment</span></Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mh-950-hero relative" style={{ overflow: 'hidden' }}>
            {bgImages.map((img, index) => (
              <div
                key={index}
                className="abs w-100 h-100 swiper-inner"
                style={{
                  backgroundImage: `url(${img})`,
                  backgroundPosition: isMobileViewport ? 'center 32%' : 'center',
                  backgroundSize: 'cover',
                  backgroundRepeat: 'no-repeat',
                  opacity: currentBg === index ? 1 : 0,
                  transform: currentBg === index
                    ? (isMobileViewport ? 'scale(1.02)' : 'scale(1.06)')
                    : 'scale(1)',
                  transition: currentBg === index 
                    ? 'opacity 1.5s ease-in-out, transform 10s linear' 
                    : 'opacity 1.5s ease-in-out, transform 1.5s ease-in-out',
                  zIndex: currentBg === index ? 1 : 0,
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  transformOrigin: 'center center'
                }}
              />
            ))}
          </div>

          {/* Dots and Buttons Container */}
          <div className="abs w-100 hero-bottom-ui" style={{ bottom: '-25px', left: 0, zIndex: 999, overflow: 'visible', pointerEvents: 'auto' }}>
            <div className="container">
              {/* Carousel Dots */}
              <div className="d-flex justify-content-center gap-3 mb-4 hero-carousel-dots" style={{ pointerEvents: 'auto', position: 'relative', zIndex: 20 }}>
                {bgImages.map((_, index) => (
                  <div
                    key={index}
                    onClick={() => setCurrentBg(index)}
                    role="button"
                    aria-label={`Go to slide ${index + 1}`}
                    className="cursor-pointer"
                    style={{
                      width: currentBg === index ? '45px' : '14px',
                      height: '14px',
                      borderRadius: '7px',
                      backgroundColor: currentBg === index ? '#165369' : 'rgba(255,255,255,0.6)',
                      transition: 'all 0.4s ease',
                      boxShadow: '0 4px 15px rgba(0,0,0,0.3)',
                      cursor: 'pointer',
                      pointerEvents: 'auto'
                    }}
                  />
                ))}
              </div>

              {/* The Three Buttons Row */}
              <div className="cta-glass-section" style={{ background: 'none', backdropFilter: 'none', border: 'none', padding: 0, boxShadow: 'none', overflow: 'visible', pointerEvents: 'auto' }}>
                <div className="row g-4 justify-content-center hero-cta-row">
                  <div className="col-lg-4 col-md-6 hero-cta-item">
                    <Link href="tel:+12126971701" className="info-box-floating" aria-label="Call 212.697.1701">
                      <i className="fs-60 id-color icon_phone" aria-hidden="true"></i>
                      <div className="ms-3 hero-cta-text">
                        <h4 className="mb-0">Need Dental Services?</h4>
                        <p className="mb-0">Call: 212.697.1701</p>
                      </div>
                    </Link>
                  </div>

                  <div className="col-lg-4 col-md-6 hero-cta-item">
                    <Link
                      href="https://square.site/book/AEPT1H3R93QVE/upper-east-dental-innovations-pllc-new-york-ny"
                      className="info-box-floating"
                      data-tele-consult="true"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Book a tele-consult"
                    >
                      <i className="fs-60 id-color icon_calendar" aria-hidden="true"></i>
                      <div className="ms-3 hero-cta-text">
                        <h4 className="mb-0">BOOK A TELE-CONSULT</h4>
                        <p className="mb-0">Virtual Consultation</p>
                      </div>
                    </Link>
                  </div>

                  <div className="col-lg-4 col-md-6 hero-cta-item dropdown-info-box">
                    <div className="info-box-floating" role="button" tabIndex={0} aria-label="Pay my bill">
                      <i className="fs-60 id-color icon_wallet" aria-hidden="true"></i>
                      <div className="ms-3 hero-cta-text">
                        <h4 className="mb-0">Pay my bill <i className="arrow_carrot-down fs-14 ms-1"></i></h4>
                        <p className="mb-0">Choose payment method</p>
                      </div>
                    </div>
                    <div className="dropdown-content">
                      <Link href="/payments/bill-payment">Bill payment</Link>
                      <Link href="https://payment.ipospays.com/api/v1/merchantPay?t=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0cmFuc2FjdGlvbl9pZCI6Ijk3NTAxOTQzNDk4OCIsInRwbiI6IjExODEyMzE1NzY1NyIsIm1lcmNoYW50SWQiOiI1ZmFkZjY2NS01YWNkLTQ3NWYtYWExOC0wYmEwYjA4OTFjMDkiLCJzdG9yZUlkIjoiOTFhZDk3OGMtNzM0My00MjVmLTk0OTYtMTdiODNlZTkyYmIyIn0.tEzAOjtDENZasUqeJXko18J60YjRuyO89g0vw3ZE88Y" target="_blank" rel="noopener noreferrer">Credit Card (3% fee applies)</Link>
                      <Link href="/zelle">Pay by Zelle (no fee)</Link>
                      <Link href="https://pay.withcherry.com/upper-east-dental-innovations-?utm_source=practice&utm_medium=website&m=39005" target="_blank" rel="noopener noreferrer">Cherry Financing</Link>
                      <Link href="https://www.carecredit.com/apply/?utm_source=SA360&utm_medium=paidsearch&utm_campaign=SR_HW_CCD2C_G_G_BR-LF-General-Restructure_AQ_MY_25-27_RRDT&utm_content=care+credit&sitecode=HDLSGOIGBN&gclsrc=aw.ds&gad_source=1&gad_campaignid=207722066&gbraid=0AAAAADrq0Z6Cz4G4uXTCm0nOfNT5ElpYH&gclid=Cj0KCQjwvajDBhCNARIsAEE29Wo6jMR5wHQs2RDEcMgzCOkY6EA3xyd2pBgeDnNvVW1j3GTLDnWMEE8aAlhtEALw_wcB" target="_blank" rel="noopener noreferrer">Care Credit</Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About — Stacked Slider (Our Story + About The Doctor) */}
      <section className="bg-light">
        <div className="container">
          <div className="text-center mb-2">
            <div className="subtitle id-color wow fadeInUp">Get to Know Us</div>
            <h2 className="wow fadeInUp" data-wow-delay=".2s">Two Sides of the Same Smile</h2>
          </div>

          <StackedSectionSlider 
            labels={['Our Story', 'About The Doctor']}
            hideTabs={true}
            hideBackgroundCards={true}
          >
            {/* ── Card 1 — Our Story ─────────────────────────────────────── */}
            <div className="row g-5 align-items-center w-100 m-0">
              <div className="col-lg-6">
                <div className="about-img-container">
                  <img src="/about us section main.jpg" className="about-img-main" alt="About Main" />
                  <div className="about-img-small-wrap">
                    <img src="/about us section small.webp" className="about-img-small" alt="About Small" />
                  </div>
                </div>
              </div>

              <div className="col-lg-6">
                <div className="ps-lg-4">
                  <div className="about-subtitle">Our Story</div>
                  <h2 className="about-title">Dental Innovations</h2>
                  <div className="about-mission">Our Mission at Upper East Dental Innovations</div>
                  <p className="about-text">
                    Upper East Dental Innovations is a state-of-the-art New York-based oral healthcare practice where artistry, beauty, craftsmanship and technology are the cornerstones of our truly innovative dental practice. We utilize cutting-edge technologies that deliver aesthetic, superior outcomes — including our signature &quot;Lunchtime Crown,&quot; a permanent crown delivered over your lunch hour.
                  </p>

                  <hr style={{ borderColor: 'rgba(0,0,0,0.12)', margin: '20px 0' }} />

                  <div className="d-flex align-items-center justify-content-between flex-wrap gap-3">
                    <Link href="/about" className="btn-main fx-slide" data-hover="Read More"><span>Read More</span></Link>
                    <button
                      type="button"
                      className="btn-watch-video"
                      onClick={() => setVideoPreview(storyVideoId)}
                    >
                      <div className="play-icon">
                        <i className="arrow_triangle-right"></i>
                      </div>
                      <span>Watch Video</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* ── Card 2 — About The Doctor ──────────────────────────────── */}
            <div className="row g-5 align-items-center w-100 m-0">
              <div className="col-lg-5">
                <div className="doctor-photo-wrap" style={{ padding: 0, maxWidth: 380, margin: '0 auto' }}>
                  <div className="doctor-photo-decor doctor-photo-decor-1" />
                  <div className="doctor-photo-decor doctor-photo-decor-2" />
                  <div className="doctor-photo-frame">
                    <img src="/Dr harvey.webp" alt="Dr. Sharde Harvey" />
                    <div className="doctor-photo-glow" />
                  </div>
                </div>
              </div>

              <div className="col-lg-7">
                <div className="about-subtitle">About The Doctor</div>
                <h3 className="doctor-name mb-1">Dr. Sharde Harvey, D.D.S M.S F.I.C.O.I</h3>
                <p className="doctor-role mb-3"><em>is a skilled New York City General Dentist</em></p>

                <div className="doctor-bio">
                  <p>
                    Dr. Harvey is currently in the Department of Otolaryngology Head and Neck Surgery at Lenox Hill Hospital and is a clinical instructor at NYU College of Dentistry. She is certified in Invisalign® and Botox administration for TMJ and headache treatment.
                  </p>
                </div>

                <div className="row g-3 mt-1 doctor-credentials-block">
                  <div className="col-md-6">
                    <h5 className="doctor-credentials-title">Memberships</h5>
                    <ul className="doctor-list">
                      <li>American Dental Association</li>
                      <li>NY State Dental Association</li>
                      <li>Holistic Dental Association</li>
                    </ul>
                  </div>
                  <div className="col-md-6">
                    <h5 className="doctor-credentials-title">Languages</h5>
                    <div className="doctor-lang-chips">
                      <span>English</span>
                      <span>French</span>
                      <span>Spanish</span>
                    </div>
                  </div>
                </div>

                <div className="mt-3 text-center">
                  <Link href="/dentists" className="btn-main fx-slide"><span>Read more</span></Link>
                </div>
              </div>
            </div>
          </StackedSectionSlider>
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
                badge: null
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
                href: "/services/lanap-laser-treatment",
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
            <Link className="btn-main fx-slide" href="/services" data-hover="Learn More"><span>To learn more about our service</span></Link>
          </div>
        </div>
      </section>
      {/* Brand Pillars Icon Marquee Section */}
      <IconMarquee />

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
                    <img src="/whychooseus/image_087.jpg" className="w-100 wow scaleIn" alt="Dental care at Upper East Dental" />
                  </div>
                  <div className="w-100 rounded-1 overflow-hidden mb-25 wow zoomIn d-inline-block">
                    <img src="/whychooseus/image_108.jpg" className="w-100 wow scaleIn" alt="Our dental team" />
                  </div>
                </div>
                <div className="col-6">
                  <div className="w-100 rounded-1 overflow-hidden mb-25 wow zoomIn d-inline-block">
                    <img src="/whychooseus/image_013.jpg" className="w-100 wow scaleIn" alt="Happy patient at Upper East Dental" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section className="portfolio-section bg-white">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-5 order-2 order-lg-1">
              <div className="portfolio-subtitle wow fadeInUp">Our Portfolio</div>
              <h2 className="portfolio-title text-start wow fadeInUp" data-wow-delay=".2s" style={{ color: '#1D2C36' }}>Real People, Real Results</h2>
              <p className="text-dark op-7 mb-4 wow fadeInUp" data-wow-delay=".3s">
                Experience the life-changing impact of our dental expertise. Our portfolio showcases the dedication and precision we bring to every smile transformation.
              </p>
              <div className="wow fadeInUp portfolio-cta-wrap" data-wow-delay=".4s">
                <Link href="/smile-gallery" className="btn-main fx-slide portfolio-btn-custom" data-hover="Visit Smile Gallery"><span>Visit Smile Gallery</span></Link>
              </div>
            </div>
            <div className="col-lg-7 order-1 order-lg-2">
              <TeethCompareSlider />
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
              { name: 'Dr. Sharde Harvey', role: 'DDS, MS, FICOI', photo: '/Dr-harvey-1.jpg', href: '/about#dr-sharde-harvey' },
              { name: 'Dr. Pellegrini', role: 'LANAP and LAPIP Protocol', photo: '/Gretel Pellegrini Photo.jpg', href: '/about#dr-pellegrini' },
              { name: 'Paola Cruz', role: 'Front Office Coordinator', photo: '/Paola-Image.jpg', href: '/about#paola-cruz' },
              { name: 'Michelle', role: 'Patient Care Coordinator', placeholder: true, href: '/about#team-directory' },
            ].map((member) => (
              <div className="col-lg-3 col-md-6" key={member.name}>
                <Link href={member.href} scroll={false} className="team-member-link">
                  <div className="relative rounded-1 overflow-hidden team-member-card">
                    <div className="rounded-1 overflow-hidden wow fadeIn zoomIn">
                      <div className="team-card-photo-wrap">
                        {'placeholder' in member && member.placeholder ? (
                          <div className="team-card-placeholder" aria-hidden="true">
                            <i className="icofont-user-alt-3" />
                          </div>
                        ) : (
                          <img
                            src={member.photo}
                            className="w-100 wow scaleIn"
                            alt={member.name}
                          />
                        )}
                      </div>
                    </div>
                    <div className="abs w-100 start-0 bottom-0 z-3">
                      <div className="p-2 rounded-10 m-3 text-center bg-white wow fadeInDown team-card-info">
                        <h4 className="mb-0 team-card-name">{member.name}</h4>
                        <p className="mb-2">{member.role}</p>
                      </div>
                    </div>
                  </div>
                </Link>
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
              <Link className="btn-main btn-line fx-slide" href="#book" data-hover="Connect Us"><span>Connect Us</span></Link>
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
                {['mathew', 'matthew', 'katie', 'eric sofia', 'erica sofia', 'david'].includes(testimonials[currentTesti].name.toLowerCase().trim()) ? (
                  <div className="testi-avatar-premium-placeholder">
                    {testimonials[currentTesti].name.trim().charAt(0).toUpperCase()}
                  </div>
                ) : (
                  <img src={`images/testimonial/${testimonials[currentTesti].img}`} className="testi-avatar-premium" alt={testimonials[currentTesti].name} />
                )}
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
                Posted On{' '}
                <Link
                  href={testimonials[currentTesti].sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="id-color fw-bold"
                >
                  {testimonials[currentTesti].source}
                </Link>
              </div>
            </div>

            <div className="testimonial-nav-btn next" onClick={() => setCurrentTesti((prev) => (prev + 1) % testimonials.length)}>
              <i className="arrow_carrot-right"></i>
            </div>
          </div>
        </div>
      </section>

      {/* Video Testimonials Section */}
      <section className="video-testimonials-section pt-100 pb-100 overflow-hidden">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-5 order-2 order-lg-2 text-center">
              <div className="portfolio-subtitle wow fadeInUp text-center">Patient Stories</div>
              <h2 className="portfolio-title text-center wow fadeInUp" data-wow-delay=".2s">Video Testimonials</h2>
              <p className="text-white op-7 mb-4 wow fadeInUp text-center" data-wow-delay=".3s">
                Listen to our patients share their personal journeys and experiences. Discover why UEDI is the trusted choice for premium dental care.
              </p>
              <div className="wow fadeInUp text-center" data-wow-delay=".4s">
                <Link href="/testimonials" className="btn-main fx-slide" data-hover="Watch More Stories"><span>Watch More Stories</span></Link>
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
                      background: 'linear-gradient(#1D2C36, #1D2C36) padding-box, linear-gradient(135deg, #1D2C36 0%, #165369 55%, #C0C2C3 100%) border-box',
                      boxShadow: '0 24px 60px rgba(0,0,0,0.85), 0 0 45px rgba(22, 83, 105,0.5)',
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
                          <div style={{ width: 0, height: 0, borderTop: '11px solid transparent', borderBottom: '11px solid transparent', borderLeft: '19px solid #165369', marginLeft: '5px' }} />
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
                background: 'linear-gradient(135deg, #C0C2C3 0%, #165369 55%, #1D2C36 100%)',
                padding: '5px', borderRadius: '26px',
                boxShadow: '0 30px 90px rgba(0,0,0,0.85), 0 0 80px rgba(22, 83, 105, 0.55), 0 0 140px rgba(192,194,195,0.2)',
                width: 'clamp(260px, min(52vw, 520px), 92vw)',
              }}>
                <div style={{ borderRadius: '22px', overflow: 'hidden', position: 'relative', background: '#1D2C36', lineHeight: 0 }}>
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
                color: '#1D2C36', boxShadow: '0 6px 24px rgba(0,0,0,0.5)', lineHeight: 1,
              }}>×</button>

              {/* Dot indicators */}
              <div style={{ display: 'flex', gap: '10px' }}>
                {portfolioImages.map((_, idx) => (
                  <div key={idx} onClick={() => setPortfolioPreview(idx)} style={{
                    width: portfolioPreview === idx ? '32px' : '10px', height: '10px',
                    borderRadius: '5px', cursor: 'pointer',
                    background: portfolioPreview === idx ? 'linear-gradient(90deg,#C0C2C3,#165369)' : 'rgba(255,255,255,0.3)',
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
                background: 'linear-gradient(135deg, #1D2C36 0%, #165369 55%, #C0C2C3 100%)',
                padding: '4px', borderRadius: '22px',
                boxShadow: '0 30px 90px rgba(0,0,0,0.95), 0 0 80px rgba(22, 83, 105,0.6)',
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
                color: '#1D2C36', boxShadow: '0 6px 24px rgba(0,0,0,0.6)',
                lineHeight: 1,
              }}>×</button>

              {/* Video nav dots */}
              <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginTop: '20px' }}>
                {modalVideoIds.map((id) => (
                  <div key={id} onClick={() => setVideoPreview(id)} style={{
                    width: videoPreview === id ? '32px' : '10px', height: '10px',
                    borderRadius: '5px', cursor: 'pointer',
                    background: videoPreview === id ? 'linear-gradient(90deg,#1D2C36,#165369)' : 'rgba(255,255,255,0.25)',
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
