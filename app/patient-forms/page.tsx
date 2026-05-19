'use client';

import Link from 'next/link';
import MapContactSection from '@/components/MapContactSection';
import Footer from '@/components/Footer';

export default function PatientForms() {
  const forms = [
    {
      name: "Patient Form",
      description: "General registration form for new and returning patients.",
      link: "/forms/patient-form",
      image: "/office tour/1.png"
    },
    {
      name: "Medical History Form",
      description: "Complete your medical history to help us provide tailored care.",
      link: "/forms/medical-history",
      image: "/office tour/2.png"
    },
    {
      name: "Covid-19 Form",
      description: "Mandatory screening form for patient and staff safety.",
      link: "/forms/covid19",
      image: "/office tour/3.png"
    },
    {
      name: "Patient Screening Form",
      description: "Preliminary health screening for specific dental procedures.",
      link: "/forms/patient-screening",
      image: "/office tour/4.png"
    }
  ];

  return (
    <>
      {/* Subheader */}
      <section
        id="subheader"
        className="page-subheader text-center"
        style={{
          backgroundImage: 'url("/office tour/8.jpeg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="container relative z-2">
          <div className="page-subheader-eyebrow" style={{ color: 'rgba(255,255,255,0.85)' }}>Digital Care</div>
          <h1 className="page-subheader-title" style={{ color: '#fff' }}>Patient Forms</h1>
          <ul className="crumb">
            <li><Link href="/" style={{ color: 'rgba(255,255,255,0.8)' }}>Home</Link></li>
            <li className="active" style={{ color: '#fff' }}>Patient Forms</li>
          </ul>
        </div>
      </section>

      {/* Forms Grid */}
      <section className="bg-light">
        <div className="container">
          <div className="row justify-content-center text-center mb-5">
            <div className="col-lg-8">
              <div className="subtitle id-color wow fadeInUp mb-3">Save Time Online</div>
              <h2 className="wow fadeInUp" data-wow-delay=".2s">Complete Your Forms Digitally</h2>
              <p className="wow fadeInUp" data-wow-delay=".3s">
                To streamline your visit, please complete the necessary forms before your appointment. This helps us serve you faster and focus on your dental health.
              </p>
            </div>
          </div>

          <div className="row g-4">
            {forms.map((form, idx) => (
              <div className="col-lg-3 col-md-6" key={idx}>
                <div className="contact-info-card wow fadeInUp" data-wow-delay={`${idx * 0.1}s`}>
                  <div className="rounded-20 overflow-hidden mb-4 shadow-sm w-100" style={{ height: '180px' }}>
                    <img src={form.image} className="w-100 h-100 object-cover" alt={form.name} />
                  </div>
                  <h4 className="fw-700 mb-2">{form.name}</h4>
                  <p className="fs-14 text-muted mb-4 px-3">{form.description}</p>
                  <Link href={form.link} className="btn-main w-100 rounded-10 py-2 fs-15">
                    <span>Fill the form</span>
                  </Link>
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
              <h3 className="mb-0 fs-32 text-white">Have questions about which forms you need?</h3>
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
