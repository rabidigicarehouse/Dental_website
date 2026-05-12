'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import CardSwap, { Card } from '@/components/CardSwap';

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

  const [currentBg, setCurrentBg] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentBg((prev) => (prev + 1) % bgImages.length);
    }, 10000);
    return () => clearTimeout(timer);
  }, [currentBg, bgImages.length]);

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
                  Upper East Dental Innovations is a state-of-the-art New York-based oral healthcare practice where artistry, beauty, craftsmanship and technology are the cornerstones of our truly innovative dental practice.
                </p>

                <div className="d-flex align-items-center gap-4">
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
      <section className="bg-color-op-1">
        <div className="container">
          <div className="row g-4 justify-content-center text-center">
            <div className="col-lg-8">
              <div className="subtitle wow fadeInUp mb-3">Our Services</div>
              <h2 className="wow fadeInUp" data-wow-delay=".2s">Complete Care for Every Smile</h2>
              <p className="mb-0 wow fadeInUp">Personalized dental solutions for patients of all ages.</p>
              <div className="spacer-single"></div>
            </div>
          </div>

          <div className="row g-4">
            {[
              { title: "General Dentistry", icon: "tooth-1.png", desc: "Complete oral care for every smile." },
              { title: "Cosmetic Dentistry", icon: "tooth-2.png", desc: "Enhance your smile’s beauty." },
              { title: "Pediatric Dentistry", icon: "tooth-3.png", desc: "Gentle care for kids." },
              { title: "Restorative Dentistry", icon: "tooth-4.png", desc: "Repair and restore your teeth." }
            ].map((service, idx) => (
              <div className="col-lg-3 col-sm-6" key={idx}>
                <div className="hover">
                  <div className="bg-white h-100 p-40 rounded-1">
                    <img src={`images/icons/${service.icon}`} className="w-70px mb-3 wow scaleIn" alt="" />
                    <div className="relative mt-4 wow fadeInUp">
                      <h4>{service.title}</h4>
                      <p>{service.desc}</p>
                      <Link className="btn-plus" href={`/services/${service.title.toLowerCase().replace(' ', '-')}`}>
                        <i className="fa fa-plus"></i>
                        <span>Read more</span>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="col-lg-12 mt-5 text-center">
            <Link className="btn-main fx-slide" href="/services"><span>View All Services</span></Link>
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section className="portfolio-section">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-5">
              <div className="portfolio-subtitle wow fadeInUp">Our Portfolio</div>
              <h2 className="portfolio-title text-start wow fadeInUp" data-wow-delay=".2s">Real People, Real Results</h2>
              <p className="text-white op-7 mb-4 wow fadeInUp" data-wow-delay=".3s">
                Experience the life-changing impact of our dental expertise. Our portfolio showcases the dedication and precision we bring to every smile transformation.
              </p>
              <div className="wow fadeInUp" data-wow-delay=".4s">
                <Link href="/portfolio" className="btn-main"><span>View All Portfolio</span></Link>
              </div>
            </div>
            <div className="col-lg-7">
              <div className="d-flex justify-content-center wow fadeInRight" data-wow-delay=".5s">
                <CardSwap width={450} height={550} cardDistance={40} verticalDistance={50}>
                  {portfolioImages.map((img, i) => (
                    <Card key={i}>
                      <img src={img} alt={`Transformation ${i + 1}`} />
                    </Card>
                  ))}
                </CardSwap>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Video Testimonials Section */}
      <section className="bg-dark pt-100 pb-100 overflow-hidden">
        <div className="container">
          <div className="row align-items-center flex-row-reverse">
            <div className="col-lg-5">
              <div className="portfolio-subtitle wow fadeInUp">Patient Stories</div>
              <h2 className="portfolio-title text-start wow fadeInUp" data-wow-delay=".2s">Video Testimonials</h2>
              <p className="text-white op-7 mb-4 wow fadeInUp" data-wow-delay=".3s">
                Listen to our patients share their personal journeys and experiences. Discover why UEDI is the trusted choice for premium dental care.
              </p>
              <div className="wow fadeInUp" data-wow-delay=".4s">
                <Link href="/testimonials" className="btn-main"><span>Watch More Stories</span></Link>
              </div>
            </div>
            <div className="col-lg-7">
              <div className="d-flex justify-content-center wow fadeInLeft" data-wow-delay=".5s">
                <CardSwap width={500} height={350} cardDistance={50} verticalDistance={60} easing="power">
                  {[1, 2, 3].map((v) => (
                    <Card key={v}>
                      <div className="w-100 h-100 d-flex align-items-center justify-content-center bg-color-2 text-white p-4 text-center">
                        <div>
                          <i className="fs-60 icon_play mb-3"></i>
                          <h4>Patient Experience {v}</h4>
                          <p className="op-7">Video testimonial coming soon...</p>
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

      {/* Testimonials */}
      <section className="bg-color-op-1">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 offset-lg-3 text-center">
              <div className="subtitle wow fadeInUp mb-3">Testimonials</div>
              <h2 className="wow fadeInUp" data-wow-delay=".2s">Our Happy Customers</h2>
              <p className="wow fadeInUp">Join thousands of happy patients who trust us for gentle, expert care.</p>
              <div className="spacer-single"></div>
            </div>
          </div>
          <div className="row g-4">
            {[
              { name: "Michael S.", text: "I’ve always been nervous about dental visits, but the staff made me feel completely comfortable." },
              { name: "Robert L.", text: "My family and I have been coming here for years. The service is exceptional." },
              { name: "Jake M.", text: "I came in for a whitening treatment and left with a brand new level of confidence." },
              { name: "Alex P.", text: "They’re professional, friendly, and genuinely care about your dental health." }
            ].map((testi, idx) => (
              <div className="col-lg-3 col-md-6" key={idx}>
                <div className="gradient-white-top p-40 py-4 rounded-1 h-100">
                  <blockquote>
                    <i className="fs-32 icofont-quote-left id-color mb-2 d-block"></i>
                    <p className="text-dark op-6">"{testi.text}"</p>
                    <div className="de_testi_by">
                      <div>{testi.name}<span>Customer</span></div>
                    </div>
                  </blockquote>
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
              <h3 className="mb-0 fs-32">Ready to book your dental care session?</h3>
            </div>
            <div className="col-lg-3 text-lg-end">
              <Link className="btn-main btn-line fx-slide" href="/booking"><span>Book Appointment</span></Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
