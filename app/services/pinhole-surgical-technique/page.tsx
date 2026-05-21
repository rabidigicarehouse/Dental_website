'use client';

import { useState } from 'react';
import Link from 'next/link';
import MapContactSection from '@/components/MapContactSection';
import Footer from '@/components/Footer';

const ASSET = '/lanap_&_pinhole';
const SERVICE_NAME = 'Pinhole® Surgical Technique';

const BENEFITS = [
  'Less discomfort for the patient after treatment',
  'Faster recovery for the patient than traditional grafting',
  'No need for uncomfortable sutures',
  'No need for scalpels or invasive surgical tools',
  'No need to take donor tissue from the patient’s palate',
  'Excellent, natural-looking, long-lasting results',
];

const SECTIONS = [
  {
    id: 'recession',
    title: 'What is gum recession?',
    body: 'Gum recession refers to the loss of gum tissue along the gumline. This can occur as a result of periodontal disease (gingivitis, periodontitis, advanced periodontitis), the natural aging process, or abrasive habits when it comes to brushing the teeth.',
    image: `${ASSET}/pinhole.jpg`,
    imageAlt: 'Gum recession treatment with Pinhole Surgical Technique',
  },
  {
    id: 'serious',
    title: 'Why should gum recession be taken seriously?',
    body: 'When gum recession occurs, the root structure of the tooth becomes exposed. This means that tooth decay and other problems can affect the teeth along the gumline and beneath it. Since healthy gums are essential for a healthy mouth, getting gum recession treated is important for lasting dental wellness.',
    image: `${ASSET}/pinhole2.jpg`,
    imageAlt: 'Healthy gums and smile after Pinhole treatment',
  },
  {
    id: 'pst',
    title: 'What is the Chao Pinhole® Surgical Technique (PST)?',
    body: 'The Chao Pinhole® Surgical Technique is a minimally invasive option for treating gum recession. Unlike traditional grafting techniques, PST is incision and suture free. All of the tools and techniques used to perform the Chao Pinhole® Surgical Technique were created by Dr. John Chao, and our doctor was trained in this method.',
    image: `${ASSET}/pinhole logo.png`,
    imageAlt: 'Chao Pinhole Surgical Technique',
  },
  {
    id: 'vs-graft',
    title: 'How does PST differ from traditional gum grafting?',
    body: 'Traditional gum recession treatments involve the use of donor tissue or soft tissue grafts in order to rebuild the gumline. This soft tissue would be sutured in place and would join with existing gum tissue as it healed. While this traditional grafting treatment is effective, comparable results with better patient experience can be achieved through the Chao Pinhole® Surgical Technique.',
    image: `${ASSET}/pinhole before after.png`,
    imageAlt: 'Pinhole vs traditional grafting results',
  },
  {
    id: 'performed',
    title: 'How is Chao Pinhole® Surgical Technique (PST) performed?',
    body: 'During the Chao Pinhole® Surgical Technique, a needle is used to make a small hole in the patient’s existing gum tissue. Through this pinhole, special instruments are used to gently loosen the gum tissue. These tools help expand and slide the gumline to cover the exposed root structure. There are no grafts, no sutures, and no incisions needed with the Chao Pinhole® Surgical Technique. It simply involves the adjustment of the existing tissue.',
    image: `${ASSET}/pinhole before after 2.png`,
    imageAlt: 'Pinhole procedure results',
  },
];

export default function PinholeSurgicalTechnique() {
  const [activeFaq, setActiveFaq] = useState<number | null>(0);

  return (
    <>
      <section
        id="subheader"
        className="page-subheader page-subheader--service text-center"
        style={{
          backgroundImage: `url("${ASSET}/pinhole.jpg")`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="container relative z-2">
          <div className="page-subheader-eyebrow" style={{ color: 'rgba(255,255,255,0.85)' }}>Our Services</div>
          <h1 className="page-subheader-title" style={{ color: '#fff' }}>{SERVICE_NAME}</h1>
          <ul className="crumb">
            <li><Link href="/" style={{ color: 'rgba(255,255,255,0.8)' }}>Home</Link></li>
            <li><Link href="/services" style={{ color: 'rgba(255,255,255,0.8)' }}>Services</Link></li>
            <li className="active" style={{ color: '#fff' }}>{SERVICE_NAME}</li>
          </ul>
        </div>
      </section>

      <section>
        <div className="container">
          <div className="row g-4 align-items-center">
            <div className="col-lg-7">
              <div className="w-100 wow scaleIn">
                <img src={`${ASSET}/pinhole.jpg`} className="w-100 rounded-1" alt={SERVICE_NAME} />
              </div>
            </div>
            <div className="col-lg-5">
              <div className="ps-lg-3">
                <div className="subtitle id-color wow fadeInUp" data-wow-delay=".2s">{SERVICE_NAME}</div>
                <h2 className="wow fadeInUp" data-wow-delay=".4s">A Breakthrough Treatment for Gum Recession</h2>
                <p className="mb-0 wow fadeInUp" data-wow-delay=".6s">
                  The Chao Pinhole® Surgical Technique (PST) is a minimally invasive option for treating gum recession—without scalpels, sutures, or donor tissue from the palate. Our team uses the techniques developed by Dr. John Chao.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {SECTIONS.map((block, idx) => (
        <section
          key={block.id}
          className={idx % 2 === 1 ? 'bg-color-op-1 pt-60 pb-60' : 'pt-20 pb-60'}
        >
          <div className="container">
            <div className={`row g-5 align-items-center ${idx % 2 === 1 ? 'flex-lg-row-reverse' : ''}`}>
              <div className="col-lg-6">
                <h2 className="mb-4 wow fadeInUp">{block.title}</h2>
                <p className="mb-0 fs-18 wow fadeInUp" data-wow-delay=".1s">{block.body}</p>
              </div>
              <div className="col-lg-6">
                <div className="pinhole-content-img-wrap wow fadeInUp" data-wow-delay=".15s">
                  <img src={block.image} className="pinhole-content-img" alt={block.imageAlt} />
                </div>
              </div>
            </div>
          </div>
        </section>
      ))}

      <section className="bg-dark text-light pt-80 pb-80">
        <div className="container">
          <div className="row g-4 align-items-start">
            <div className="col-lg-5">
              <div className="subtitle id-color wow fadeInUp">Patient Benefits</div>
              <h2 className="wow fadeInUp" data-wow-delay=".1s">
                What are the benefits of Chao Pinhole® Surgical Technique (PST)?
              </h2>
              <p className="mb-0 wow fadeInUp" data-wow-delay=".2s">
                The benefits of the Chao Pinhole® Surgical Technique are many:
              </p>
            </div>
            <div className="col-lg-7">
              <ul className="ul-check fs-500 wow fadeInUp" data-wow-delay=".15s">
                {BENEFITS.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="pt-80 pb-80">
        <div className="container">
          <div className="row g-4 justify-content-center text-center mb-4">
            <div className="col-lg-8">
              <div className="subtitle wow fadeInUp">Real Results</div>
              <h2 className="wow fadeInUp" data-wow-delay=".1s">Before &amp; After</h2>
            </div>
          </div>
          <div className="row g-4 pinhole-ba-row">
            {[
              { src: `${ASSET}/pinhole before after.png`, alt: 'Pinhole before and after 1' },
              { src: `${ASSET}/pinhole before after 2.png`, alt: 'Pinhole before and after 2' },
              { src: `${ASSET}/pinhole before after 3.png`, alt: 'Pinhole before and after 3' },
            ].map((img) => (
              <div className="col-md-4 pinhole-ba-col" key={img.src}>
                <div className="pinhole-ba-card wow fadeInUp">
                  <div className="pinhole-ba-img-wrap">
                    <img src={img.src} className="pinhole-ba-img" alt={img.alt} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-light pt-60 pb-60">
        <div className="container">
          <div className="row g-4">
            <div className="col-lg-5">
              <div className="subtitle id-color">Questions</div>
              <h2>Learn More About Pinhole®</h2>
            </div>
            <div className="col-lg-7">
              <div className="react-accordion">
                {[
                  {
                    q: 'Is Pinhole® right for me?',
                    a: 'If you have gum recession from periodontal disease, aging, or aggressive brushing, a consultation can determine whether PST is appropriate for your case.',
                  },
                  {
                    q: 'How long is recovery?',
                    a: 'Most patients experience faster recovery than traditional grafting, with less discomfort and no palatal donor-site healing.',
                  },
                ].map((item, idx) => (
                  <div
                    key={item.q}
                    className={`accordion-item-wrap ${activeFaq === idx ? 'active' : ''}`}
                  >
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
                        transition: 'all 0.35s ease-in-out',
                        padding: activeFaq === idx ? '15px 0' : '0',
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

      <section className="bg-color text-light pt-50 pb-50">
        <div className="container">
          <div className="row g-4 align-items-center">
            <div className="col-md-9">
              <h3 className="mb-0 fs-32">Ready to Book Your Appointment?</h3>
              <p className="mb-0">Schedule a consultation to discuss Chao Pinhole® treatment for gum recession.</p>
            </div>
            <div className="col-lg-3 text-lg-end">
              <Link className="btn-main fx-slide btn-line" href="#book" data-hover="Connect Us">
                <span>Connect Us</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <MapContactSection />
      <Footer />
    </>
  );
}
