'use client';

import Link from 'next/link';
import MapContactSection from '@/components/MapContactSection';
import Footer from '@/components/Footer';

/* Timeline data, ordered newest → oldest. Each entry maps to one
   alternating row on the vertical timeline. */
type TimelineLink = { label: string; href: string };
type TimelineEntry = {
  date: string;
  side: 'left' | 'right';
  highlight?: boolean; // first / featured entry — adds the "NEXT TOPIC" pill
  heading: string;
  intro?: string;
  image?: string; // path under /public
  links?: TimelineLink[];
  subBlocks?: { heading: string; href?: string }[];
};

const TIMELINE: TimelineEntry[] = [
  {
    date: 'December 2024',
    side: 'right',
    highlight: true,
    heading: 'Upper East Dental Innovations',
    intro: 'Introduced',
    image: '/in the news/December 2024 - Introduction.webp',
  },
  {
    date: 'March 2022',
    side: 'left',
    heading: 'This Manhattan Dental Clinic Is Now Accepting Payment In Dogecoin',
    subBlocks: [
      { heading: 'Dogecoin Accepted by UEDI', href: 'https://u.today/dogecoin-now-accepted-by-manhattan-dental-firm' },
      { heading: 'Manhattan Dental Office Accepting Cryptocurrency', href: 'https://us.kandid-tribune.com/news/manhattan-dental-office-accepting-cryptocurrency/' },
      { heading: 'Viva Learning', href: 'https://www.vivalearning.com/news/dl/?p_review.asp?I_id=1851' },
    ],
  },
  {
    date: 'February 2022',
    side: 'right',
    heading: 'Is there a place for cryptocurrency in dental?',
    links: [
      { label: 'https://www.beckersdental.com/featured-perspectives/37340-is-there-a-place-for-cryptocurrency-in-dental.html', href: 'https://www.beckersdental.com/featured-perspectives/37340-is-there-a-place-for-cryptocurrency-in-dental.html' },
    ],
    subBlocks: [
      { heading: 'Cosmetic and Implant Dentist in Manhattan to accept Cryptocurrency', href: 'https://www.prnewswire.com/news-releases/cosmetic-and-implant-dentist-in-manhattan-to-accept-cryptocurrency-301483163.html' },
    ],
  },
  {
    date: 'May 2021',
    side: 'left',
    highlight: true,
    heading: 'Age Of the lunch time crown',
    image: '/in the news/May 2021.webp',
  },
  {
    date: 'June/July 2020',
    side: 'right',
    heading: 'Teledentistry Bridges the Gap for Patient Care in Trying Times',
    links: [
      { label: 'https://www.dentalproductshopper.com/article/teledentistry-patient-care', href: 'https://www.dentalproductshopper.com/article/teledentistry-patient-care' },
    ],
  },
  {
    date: 'January 2020',
    side: 'left',
    heading: 'Hold On Tight: Implant Dentistry Is Surging Forward',
  },
  {
    date: 'November 2019',
    side: 'right',
    heading: '3D Printing Dentistry gets faster and faster',
    links: [
      { label: 'https://www.implantdental.co/news/3d-printing-dentistry-gets-faster-and-faster.html', href: 'https://www.implantdental.co/news/3d-printing-dentistry-gets-faster-and-faster.html' },
    ],
    subBlocks: [
      { heading: 'Why More Dentists Should Screen for Bruxism', href: 'https://www.dentalproductshopper.com/blog/bruxism-screening' },
    ],
  },
  {
    date: 'February 2019',
    side: 'left',
    heading: 'Rescuing Teeth with the Least Invasive Approach',
    links: [
      { label: 'https://www.dentalproductshopper.com/article/rescuing-teeth-least-invasive', href: 'https://www.dentalproductshopper.com/article/rescuing-teeth-least-invasive' },
    ],
  },
  {
    date: 'July 2018',
    side: 'right',
    heading: 'The Mouth Is Connected to … the Rest of the Body',
    links: [
      { label: 'https://www.dentalproductshopper.com/blog/the-mouth-is-connected-to-the-rest-of-the-body', href: 'https://www.dentalproductshopper.com/blog/the-mouth-is-connected-to-the-rest-of-the-body' },
    ],
  },
  {
    date: 'June 2015',
    side: 'left',
    heading: 'Meet the Evaluator',
    subBlocks: [
      { heading: 'Virtual Dentistry — Dr. Sharde-Harvey DDS launches Teledentistry at Upper East Dental Innovations' },
      { heading: 'http://www.newswire.com/press-releases/dr-sharde-harvey-d-d-s-serves-up-lunchtime-dentistry-he', href: 'http://www.newswire.com/press-releases/dr-sharde-harvey-d-d-s-serves-up-lunchtime-dentistry-he' },
    ],
  },
  {
    date: 'May 2015',
    side: 'right',
    heading: '8 Common Mistakes You Make When Whitening Teeth',
    links: [
      { label: 'https://www.bustle.com/articles/80014-how-to-whiten-your-teeth-because-youre-probably-making-these-8-common-mistakes', href: 'https://www.bustle.com/articles/80014-how-to-whiten-your-teeth-because-youre-probably-making-these-8-common-mistakes' },
    ],
  },
  {
    date: 'March 2015',
    side: 'left',
    heading: 'Dentists will soon be able to 3D print you a new tooth in minutes',
    subBlocks: [
      { heading: 'Dentists will soon be able to 3D print you a new tooth in minutes', href: 'https://www.smcscience.com/medicine/3d-printing-tooth-19022015/' },
      { heading: 'https://bjz.com/06718373d-printed-teeth', href: 'https://bjz.com/06718373d-printed-teeth' },
    ],
  },
  {
    date: 'February 2015',
    side: 'right',
    heading: '10 Warning Signs: What the Mouth Says About Overall Health',
    links: [
      { label: 'https://www.prweb.com/releases/2015/02/prweb12530647.htm', href: 'https://www.prweb.com/releases/2015/02/prweb12530647.htm' },
    ],
    subBlocks: [
      { heading: 'Food That Stain and Whiten Your Teeth', href: 'https://bigthingsthoper.com/blogs/beauty-blog/foods-that-stain-and-whiten-your-teeth' },
    ],
  },
];

export default function InTheNewsPage() {
  return (
    <>
      <section
        id="subheader"
        className="page-subheader text-center"
        style={{
          background: 'linear-gradient(135deg, #1d2c36 0%, #165369 100%)',
        }}
      >
        <div className="container relative z-2">
          <div className="page-subheader-eyebrow" style={{ color: 'rgba(255,255,255,0.85)' }}>
            Press &amp; Media
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

      {/* Timeline */}
      <section className="news-timeline-section">
        <div className="container">
          <div className="news-timeline">
            {/* center spine line */}
            <div className="news-timeline-spine" aria-hidden="true" />

            {TIMELINE.map((entry, idx) => (
              <div
                key={idx}
                className={`news-timeline-row news-timeline-row--${entry.side}`}
              >
                {/* date label */}
                <div className="news-timeline-date">
                  <span>{entry.date}</span>
                </div>

                {/* center marker */}
                <div className="news-timeline-marker" aria-hidden="true">
                  <span className="news-timeline-dot" />
                </div>

                {/* content card */}
                <div className="news-timeline-card">
                  {entry.highlight && (
                    <div className="news-timeline-pill">Next Topic</div>
                  )}
                  <h3 className="news-timeline-heading">{entry.heading}</h3>
                  {entry.intro && (
                    <p className="news-timeline-intro">{entry.intro}</p>
                  )}
                  {entry.image && (
                    <div className="news-timeline-image-wrap">
                      <img
                        src={entry.image}
                        alt={entry.heading}
                        className="news-timeline-image"
                        loading="lazy"
                      />
                    </div>
                  )}
                  {entry.links && entry.links.length > 0 && (
                    <ul className="news-timeline-links">
                      {entry.links.map((l, i) => (
                        <li key={i}>
                          <a href={l.href} target="_blank" rel="noopener noreferrer">
                            {l.label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  )}
                  {entry.subBlocks && entry.subBlocks.length > 0 && (
                    <div className="news-timeline-subblocks">
                      {entry.subBlocks.map((sb, i) => (
                        <div key={i} className="news-timeline-subblock">
                          <h4 className="news-timeline-subheading">{sb.heading}</h4>
                          {sb.href && (
                            <a
                              href={sb.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="news-timeline-sublink"
                            >
                              {sb.href}
                            </a>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Dr. Sharde Harvey video feature */}
      <section className="news-video-section">
        <div className="container">
          <div className="row align-items-center g-5">
            <div className="col-lg-4">
              <div className="news-video-eyebrow">In Print, Broadcast &amp; Online</div>
              <p className="news-video-copy">
                New York dentist <strong>Dr. Sharde Harvey, DDS</strong>, has
                appeared in numerous print, broadcast and online media outlets.
                She is frequently pursued to offer her expertise on such topics
                as the latest dental innovations, the proper choice of a pacifier
                for a newborn, and even on food choices that naturally whiten your
                teeth. Below is just a sampling.
              </p>
              <p className="news-video-caption">
                Dr. Sharde Harvey, DDS, interviewed by NY1 Television during oral care
                screening at Brooklyn Borough Hall.
              </p>
            </div>
            <div className="col-lg-8">
              <div className="news-video-frame">
                <iframe
                  src="https://player.vimeo.com/video/229786110?title=0&byline=0&portrait=0"
                  title="Dr. Sharde Harvey — NY1 Television Interview"
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
