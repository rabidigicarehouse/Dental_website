'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import MapContactSection from '@/components/MapContactSection';
import Footer from '@/components/Footer';

export default function Membership() {
  const planDetails = [
    'Two dental cleanings',
    'Two oral cancer screenings',
    'Two comprehensive dental exams',
    'One emergency exam',
    '1 full set of x-rays',
    '15% off Zoom whitening',
    '10% off all other services',
    '1 Sonicare toothbrush for free'
  ];

  return (
    <>
      {/* Subheader */}
      <section
        id="subheader"
        className="page-subheader text-center"
        style={{
          backgroundImage: 'url("/heading_background/membership.jpg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="container relative z-2">
          <div className="page-subheader-eyebrow" style={{ color: 'rgba(255,255,255,0.85)' }}>Exclusive Care</div>
          <h1 className="page-subheader-title" style={{ color: '#fff' }}>UEDI Membership</h1>
          <ul className="crumb">
            <li><Link href="/" style={{ color: 'rgba(255,255,255,0.8)' }}>Home</Link></li>
            <li className="active" style={{ color: '#fff' }}>Membership</li>
          </ul>
        </div>
      </section>

      {/* Membership Plan Section */}
      <section className="no-top no-bottom relative overflow-hidden" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center' }}>
        {/* Blurred Background */}
        <div 
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: 'url(/images/background/5.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'brightness(0.7) blur(4px)',
            transform: 'scale(1.1)'
          }}
        />

        <div className="container relative z-2 py-100">
          <div className="row align-items-center">
            {/* Plan Card */}
            <div className="col-lg-5">
              <motion.div 
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="membership-card bg-white p-5 rounded-30 shadow-2xl"
              >
                <div className="mb-4">
                  <img src="/dental services/Holistic Dentistry.webp" alt="Dental Plan Icon" style={{ width: '80px', height: '80px', objectFit: 'contain' }} />
                </div>
                <h2 className="fs-40 fw-800 mb-2" style={{ color: '#1D2C36' }}>Dental Plan</h2>
                <div className="d-flex align-items-baseline mb-4">
                  <span className="fs-24 fw-600 me-2" style={{ color: '#165369' }}>$</span>
                  <span className="fs-60 fw-900" style={{ color: '#165369' }}>1299</span>
                </div>
                
                <ul className="membership-list list-unstyled mb-5">
                  {planDetails.map((detail, i) => (
                    <li key={i} className="mb-3 d-flex align-items-start">
                      <i className="icofont-check-circled me-3 fs-20" style={{ color: '#165369', marginTop: '4px' }}></i>
                      <span className="fs-18 text-muted">{detail}</span>
                    </li>
                  ))}
                </ul>

                <Link href="https://uedinyc.securepayments.cardpointe.com/pay?" target="_blank" rel="noopener noreferrer" className="btn-main w-100 py-3 rounded-15 fs-18 fw-700 text-center" style={{ backgroundColor: '#165369', border: 'none', display: 'block' }}>
                  Apply Now
                </Link>
              </motion.div>
            </div>

            {/* Main Membership Image */}
            <div className="col-lg-7 ps-lg-5">
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="rounded-30 overflow-hidden shadow-2xl"
              >
                <img src="/membership.webp" className="w-100" alt="Membership Plan" />
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-color text-light pt-40 pb-40">
        <div className="container">
          <div className="row g-4 align-items-center">
            <div className="col-md-9">
              <h3 className="mb-0 fs-32 text-white">Join our family and save on premium dental care.</h3>
            </div>
            <div className="col-lg-3 text-lg-end">
              <Link className="btn-main btn-line fx-slide" href="https://scheduling.simplifeye.co/#key=7O4hoFG2aH6pBmQ2YLegk45hvPEJrqZ&gaID=null" data-hover="Connect Us"><span>Connect Us</span></Link>
            </div>
          </div>
        </div>
      </section>

      <MapContactSection />
      <Footer />
    </>
  );
}
