'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import MapContactSection from '@/components/MapContactSection';
import Footer from '@/components/Footer';

export default function ZellePayment() {
  const steps = [
    {
      num: "01",
      title: "Open Zelle",
      desc: "Open Zelle in your mobile banking app or online banking portal.",
      icon: "icofont-bank-transfer-alt",
    },
    {
      num: "02",
      title: "Enter UEDI Email",
      desc: "Use our official registered email info@uedi.nyc to send your payment.",
      icon: "icofont-envelope",
    },
    {
      num: "03",
      title: "Receive Receipt",
      desc: "Zelle payment will be received and you will receive a receipt within 24-48 hours.",
      icon: "icofont-checked",
    },
  ];

  return (
    <>
      {/* Subheader */}
      <section
        id="subheader"
        className="page-subheader text-center"
        style={{
          backgroundImage: 'url("/office tour/5.png")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="container relative z-2">
          <div className="page-subheader-eyebrow" style={{ color: 'rgba(255,255,255,0.85)' }}>Easy Payment</div>
          <h1 className="page-subheader-title" style={{ color: '#fff' }}>Pay by Zelle</h1>
          <ul className="crumb">
            <li><Link href="/" style={{ color: 'rgba(255,255,255,0.8)' }}>Home</Link></li>
            <li className="active" style={{ color: '#fff' }}>Zelle Payment</li>
          </ul>
        </div>
      </section>

      {/* 3 Step Cards Section */}
      <section className="relative overflow-hidden pt-100 pb-100" style={{ backgroundColor: '#ffffff' }}>
        <div className="container">
          <div className="row justify-content-center text-center mb-5">
            <div className="col-lg-8">
              <div className="subtitle wow fadeInUp mb-3" style={{ color: '#165369' }}>Simple Steps</div>
              <h2 className="wow fadeInUp" data-wow-delay=".2s" style={{ color: '#1D2C36' }}>How to Pay with Zelle</h2>
              <p className="mb-0 wow fadeInUp text-muted">
                Follow these simple instructions to submit your payment safely and securely via Zelle without any transaction fees.
              </p>
            </div>
          </div>

          <div className="row g-4 justify-content-center mt-3">
            {steps.map((step, idx) => (
              <div className="col-lg-4 col-md-6 col-12 d-flex" key={step.num}>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.15 }}
                  className="w-100 p-5 rounded-30 text-center"
                  style={{
                    background: 'rgba(22, 83, 105, 0.03)',
                    border: '1px solid rgba(22, 83, 105, 0.08)',
                    boxShadow: '0 10px 30px rgba(22, 83, 105, 0.02)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <div className="w-100" style={{ wordBreak: 'break-word', overflowWrap: 'break-word' }}>
                    <div
                      className="fs-18 fw-800 mb-3 d-inline-flex align-items-center justify-content-center"
                      style={{
                        width: '40px',
                        height: '40px',
                        borderRadius: '50%',
                        backgroundColor: '#165369',
                        color: '#ffffff',
                      }}
                    >
                      {step.num}
                    </div>
                    <div className="mb-4 text-center">
                      <i className={`${step.icon} fs-48`} style={{ color: '#165369' }}></i>
                    </div>
                    <h3 className="fs-22 fw-800 mb-3" style={{ color: '#1D2C36', whiteSpace: 'normal' }}>{step.title}</h3>
                    <p className="fs-16 text-muted mb-0" style={{ whiteSpace: 'normal', display: 'block', width: '100%' }}>{step.desc}</p>
                  </div>
                </motion.div>
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
              <h3 className="mb-0 fs-32 text-white">Have questions about your payment or billing?</h3>
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
