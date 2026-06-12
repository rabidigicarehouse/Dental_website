'use client';

import Image from 'next/image';
import Link from 'next/link';
import MapContactSection from '@/components/MapContactSection';
import Footer from '@/components/Footer';

type TimelineEntry = {
  date: string;
  note?: string;
  heading: string;
  summary: string;
  image?: string;
  source?: string;
  href?: string;
};

const EVENT_GALLERY = [
  '/images/events/image (5).png',
  '/images/events/image (4).png',
  '/images/events/image (3).png',
];

const WHITE_CROSS_IMAGE = '/images/events/white cross ball.png';

const TIMELINE: TimelineEntry[] = [
  {
    date: '2026',
    note: 'Community event',
    heading: 'White Cross Ball',
    summary: 'A community-centered appearance supporting children’s wellbeing, public health, and compassionate leadership.',
    image: WHITE_CROSS_IMAGE,
    source: 'White Cross Ball',
  },
  {
    date: 'June 2026',
    note: 'Featured',
    heading: 'Royal Versailles Ball 2026',
    summary: 'A Vogue-noted cultural appearance highlighting Dr. Sharda Harvey’s public voice and community presence.',
    image: '/images/events/image (4).png',
    source: 'Vogue',
    href: 'https://www.vogue.com/slideshow/royal-versailles-ball-2026',
  },
  {
    date: 'December 2024',
    note: 'Introduced',
    heading: 'Upper East Dental Innovations',
    summary: 'A practice feature focused on patient-centered dentistry, aesthetics, and whole-health wellness.',
    image: '/in the news/December 2024 - Introduction.webp',
    source: 'Dental Product Shopper',
  },
  {
    date: 'March 2022',
    heading: 'This Manhattan Dental Clinic Is Now Accepting Payment in Dogecoin',
    summary: 'Press coverage on innovation in dental payments and a forward-thinking Manhattan practice model.',
    source: 'U.Today',
    href: 'https://u.today/dogecoin-now-accepted-by-manhattan-dental-firm',
  },
  {
    date: 'February 2022',
    heading: 'Is There a Place for Cryptocurrency in Dental?',
    summary: 'Industry commentary on financial convenience, trust, and innovation in modern patient care.',
    source: "Becker's Dental + DSO Review",
    href: 'https://www.beckersdental.com/featured-perspectives/37340-is-there-a-place-for-cryptocurrency-in-dental.html',
  },
  {
    date: 'May 2021',
    heading: 'Age of the Lunchtime Crown',
    summary: 'An editorial on efficient restorative dentistry and convenience-driven treatment planning.',
    image: '/in the news/May 2021.webp',
    source: 'Dental Product Shopper',
  },
  {
    date: 'June/July 2020',
    heading: 'Teledentistry Bridges the Gap for Patient Care in Trying Times',
    summary: 'Recognition for expanding virtual dental access and continuity of care during a critical period.',
    source: 'Dental Product Shopper',
    href: 'https://www.dentalproductshopper.com/article/teledentistry-patient-care',
  },
  {
    date: 'January 2020',
    heading: 'Hold On Tight: Implant Dentistry Is Surging Forward',
    summary: 'Coverage reflecting the momentum of implant treatment, digital planning, and modern workflows.',
  },
  {
    date: 'November 2019',
    heading: '3D Printing Dentistry Gets Faster and Faster',
    summary: 'A media feature focused on precision, speed, and the promise of digital fabrication in dentistry.',
    source: 'Implant Dental News',
    href: 'https://www.implantdental.co/news/3d-printing-dentistry-gets-faster-and-faster.html',
  },
  {
    date: 'February 2019',
    heading: 'Rescuing Teeth with the Least Invasive Approach',
    summary: 'A spotlight on conservative dentistry and minimally invasive solutions for preserving natural teeth.',
    source: 'Dental Product Shopper',
    href: 'https://www.dentalproductshopper.com/article/rescuing-teeth-least-invasive',
  },
  {
    date: 'July 2018',
    heading: 'The Mouth Is Connected to the Rest of the Body',
    summary: 'Commentary connecting oral health with prevention, systemic wellness, and total-body awareness.',
    source: 'Dental Product Shopper',
    href: 'https://www.dentalproductshopper.com/blog/the-mouth-is-connected-to-the-rest-of-the-body',
  },
  {
    date: 'June 2015',
    heading: 'Meet the Evaluator',
    summary: "An early feature reflecting Dr. Sharda Harvey's long-standing visibility in dental media.",
    source: 'Newswire',
    href: 'http://www.newswire.com/press-releases/dr-sharde-harvey-d-d-s-serves-up-lunchtime-dentistry-he',
  },
  {
    date: 'May 2015',
    heading: '8 Common Mistakes You Make When Whitening Teeth',
    summary: 'Patient-focused guidance on whitening habits, safety, and protecting enamel health.',
    source: 'Bustle',
    href: 'https://www.bustle.com/articles/80014-how-to-whiten-your-teeth-because-youre-probably-making-these-8-common-mistakes',
  },
  {
    date: 'March 2015',
    heading: 'Dentists Will Soon Be Able to 3D Print You a New Tooth in Minutes',
    summary: 'Forward-looking coverage on 3D printing and the future of restorative dental innovation.',
    source: 'SMC Science',
    href: 'https://www.smcscience.com/medicine/3d-printing-tooth-19022015/',
  },
  {
    date: 'February 2015',
    heading: '10 Warning Signs: What the Mouth Says About Overall Health',
    summary: 'An educational feature linking oral symptoms with broader health awareness and prevention.',
    source: 'PRWeb',
    href: 'https://www.prweb.com/releases/2015/02/prweb12530647.htm',
  },
];

export default function InTheNewsPage() {
  return (
    <>
      <section
        id="subheader"
        className="page-subheader text-center"
        style={{
          backgroundImage: 'url("/in the news/background.jpg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <div className="container relative z-2">
          <div className="page-subheader-eyebrow" style={{ color: 'rgba(255,255,255,0.85)' }}>
            Press, Culture &amp; Community
          </div>
          <h1 className="page-subheader-title" style={{ color: '#fff' }}>
            In The News
          </h1>
          <ul className="crumb">
            <li>
              <Link href="/" style={{ color: 'rgba(255,255,255,0.8)' }}>
                Home
              </Link>
            </li>
            <li className="active" style={{ color: '#fff' }}>
              In The News
            </li>
          </ul>
        </div>
      </section>

      <section className="news-timeline-section">
        <div className="container">
          <div className="news-timeline-header">
            <div className="news-timeline-kicker">Media Timeline</div>
            <h2 className="news-timeline-title">A History of Press Features and Public Visibility</h2>
          </div>

          <div className="news-timeline">
            <div className="news-timeline-spine" aria-hidden="true" />

            {TIMELINE.map((entry, idx) => (
              <div key={idx} className="news-timeline-row">
                <div className="news-timeline-date">
                  <span>{entry.date}</span>
                  {entry.note ? <small>{entry.note}</small> : null}
                </div>

                <div className="news-timeline-marker" aria-hidden="true">
                  <span className="news-timeline-dot">
                    <i className="icofont-clock-time" />
                  </span>
                </div>

                <div className="news-timeline-card">
                  <h3 className="news-timeline-heading">{entry.heading}</h3>
                  <p className="news-timeline-summary">{entry.summary}</p>

                  {entry.image ? (
                    <div className="news-timeline-image-wrap">
                      <Image src={entry.image} alt={entry.heading} className="news-timeline-image" loading="lazy" width={1200} height={800} />
                    </div>
                  ) : null}

                  {(entry.source || entry.href) ? (
                    <div className="news-timeline-meta">
                      {entry.source ? <span className="news-timeline-source">{entry.source}</span> : null}
                      {entry.href ? (
                        <a
                          href={entry.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="news-timeline-link"
                        >
                          View feature
                        </a>
                      ) : null}
                    </div>
                  ) : null}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="royal-versailles-ball-2026" className="news-premium-section news-anchor-section">
        <div className="container">
          <div className="news-premium-card">
            <div className="news-spotlight-editorial">
              {/* Floated Gallery Collage on the Right */}
              <div className="news-spotlight-gallery-float">
                <div className="news-spotlight-tile news-spotlight-tile--top-left">
                  <Image src={EVENT_GALLERY[1]} alt="Dr. Sharda Harvey at a Royal Versailles Ball portrait setting" width={1200} height={800} />
                </div>
                <div className="news-spotlight-tile news-spotlight-tile--top-right">
                  <Image src={EVENT_GALLERY[0]} alt="Dr. Sharda Harvey at the Royal Versailles Ball 2026" width={1200} height={800} />
                </div>
                <div className="news-spotlight-tile news-spotlight-tile--bottom-right">
                  <Image src={EVENT_GALLERY[2]} alt="Dr. Sharda Harvey attending the Royal Versailles Ball with a guest" width={1200} height={800} />
                </div>
              </div>

              {/* Text Content */}
              <div className="news-premium-eyebrow">Featured Appearance</div>
              <h2 className="news-premium-title">Dr. Sharda Harvey at the Royal Versailles Ball 2026</h2>
              
              <p className="news-premium-text">
                Dr. Sharda Harvey&apos;s attendance at the Royal Versailles Ball 2026 reflects the same blend of
                refinement, leadership, and social responsibility that defines her work in dentistry. In public
                settings like this, she represents more than personal achievement. She brings visibility to a
                broader message about modern oral healthcare, preventive education, and the importance of making
                confident, informed dental choices part of everyday life.
              </p>
              <p className="news-premium-text">
                As founder of Upper East Dental Innovations, Dr. Harvey has long connected clinical excellence
                with thoughtful patient advocacy. Her work extends beyond treatment itself and into the larger
                cultural conversation around wellness, self-confidence, and long-term health awareness. Public
                appearances help reinforce that dentistry is not separate from quality of life. It is part of how
                people experience comfort, confidence, communication, and care in the world around them.
              </p>
              <p className="news-premium-text">
                This visibility also supports one of the practice&apos;s most important values: education. Whether
                speaking about smile health, restorative options, or the importance of early intervention for
                families, Dr. Harvey continues to champion preventive dentistry in ways that feel approachable and
                relevant. That includes encouraging stronger oral-health awareness for children, helping parents
                recognize the value of consistent care early, and making dental wellness part of a wider public
                conversation instead of something discussed only in the operatory.
              </p>
              <p className="news-premium-text">
                Moments like the Royal Versailles Ball also highlight the growing role dentists can play as public
                educators and community voices. By showing up in spaces that celebrate culture, philanthropy, and
                leadership, Dr. Harvey helps position Upper East Dental Innovations as a practice that values both
                excellence in care and meaningful impact beyond the office. The result is a stronger connection
                between dentistry, public trust, and the communities it serves.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="white-cross-ball" className="news-premium-section news-premium-section--alt news-anchor-section">
        <div className="container">
          <div className="news-premium-card">
            <div className="news-spotlight-editorial">
              {/* Floated Single Image on the Right */}
              <div className="news-spotlight-single-float">
                <Image
                  src={WHITE_CROSS_IMAGE}
                  alt="Dr. Sharda Harvey at the White Cross Ball"
                  className="news-single-img" width={1200} height={800} />
              </div>

              {/* Text Content */}
              <div className="news-premium-eyebrow">Community Impact</div>
              <h2 className="news-premium-title">Dr. Sharda Harvey Attends the White Cross Ball</h2>
              
              <p className="news-premium-text">
                Dr. Sharda Harvey was honored to attend the White Cross Ball, a distinguished event that brings
                together respected professionals, philanthropists, civic leaders, and healthcare advocates who share
                a commitment to meaningful community impact. Her presence at the event reflects the same polished,
                socially engaged perspective that defines her leadership at Upper East Dental Innovations.
              </p>
              <p className="news-premium-text">
                As a dentist, fundraiser, and public-facing advocate for wellness, Dr. Harvey continues to align
                clinical excellence with service. Events such as the White Cross Ball provide an important platform
                for supporting initiatives that benefit children, families, and underserved communities while also
                advancing the broader conversation around prevention, access, and long-term health education.
              </p>
              <p className="news-premium-text">
                Throughout her career, Dr. Harvey has remained passionate about preventive dental care, family
                education, and early childhood oral-health awareness. She believes that helping people understand the
                importance of oral hygiene early can positively influence confidence, communication, and overall
                quality of life for years to come. That mission makes community-centered events especially meaningful.
              </p>
              <p className="news-premium-text">
                The White Cross Ball also reflects the importance of collaboration between healthcare leaders,
                charitable organizations, and individuals committed to building healthier futures. By supporting
                causes tied to children’s wellbeing and public health awareness, Dr. Harvey reinforces the idea that
                dentistry should remain part of a larger conversation about compassionate care, social responsibility,
                and lasting community impact.
              </p>
              <p className="news-premium-text">
                Her attendance further strengthens the image of Upper East Dental Innovations as a practice shaped by
                sophistication, service, and purpose. It reflects a modern, elite standard of care led by a doctor
                whose work extends beyond the treatment room and into the broader cultural and philanthropic spaces
                where trust, leadership, and influence are built.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="news-video-section">
        <div className="container">
          <div className="row align-items-center g-5">
            <div className="col-lg-4">
              <div className="news-video-eyebrow">Broadcast, Print &amp; Public Voice</div>
              <p className="news-video-copy">
                New York dentist <strong>Dr. Sharda Harvey, DDS</strong>, has appeared in print,
                broadcast, and digital outlets discussing aesthetic dentistry, implant care,
                oral-health awareness, and the everyday decisions that shape long-term patient wellness.
              </p>
              <p className="news-video-copy">
                Her public-facing work supports a broader mission: helping families understand
                preventive care earlier, encouraging confidence through informed treatment choices,
                and keeping children&apos;s dental health part of the public conversation.
              </p>
              <p className="news-video-caption">
                Dr. Sharda Harvey, DDS, interviewed by NY1 Television during oral-care screening in Brooklyn.
              </p>
            </div>
            <div className="col-lg-8">
              <div className="news-video-frame">
                <iframe
                  src="https://player.vimeo.com/video/229786110?title=0&byline=0&portrait=0"
                  title="Dr. Sharda Harvey - NY1 Television Interview"
                  allow="autoplay; fullscreen; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <MapContactSection />
      <Footer />
    </>
  );
}
