import type { Metadata } from "next";
import Script from "next/script";
import Link from "next/link";
import "./globals.css";
import HeaderWrapper from "@/components/HeaderWrapper";
import Preloader from "@/components/Preloader";
import Footer from "@/components/Footer";
import ScriptHandler from "@/components/ScriptHandler";
import AIWidget from "@/components/ai/AIWidget";
import TopBanner from "@/components/TopBanner";
import YoutubeMarquee from "@/components/YoutubeMarquee";
import Image from "next/image";
import AccessibilityWidget from "@/components/AccessibilityWidget";
import CursorGlow from "@/components/CursorGlow";
import BookingModalProvider from "@/components/BookingModalProvider";

export const metadata: Metadata = {
  title: "Upper East Dental — Dentist & Dental Clinic",
  description: "Upper East Dental — Dentist & Dental Clinic",
  icons: {
    icon: "/favicon.png?v=4",
    shortcut: "/favicon.png?v=4",
    apple: "/favicon.png?v=4",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" type="image/png" href="/favicon.png?v=4" />
        <link rel="shortcut icon" href="/favicon.png?v=4" />
        <link rel="apple-touch-icon" href="/favicon.png?v=4" />
        <link href="/css/bootstrap.min.css" rel="stylesheet" type="text/css" id="bootstrap" />
        <link href="/css/plugins.css" rel="stylesheet" type="text/css" />
        <link href="/css/swiper.css" rel="stylesheet" type="text/css" />
        <link href="/css/style.css" rel="stylesheet" type="text/css" />
        <link id="colors" href="/css/colors/scheme-01.css" rel="stylesheet" type="text/css" />
      </head>
      <body suppressHydrationWarning>
        <ScriptHandler />
        <CursorGlow />
        <BookingModalProvider>
        <div id="wrapper">
          <a href="#" id="back-to-top"></a>

          {/* preloader begin */}
          <Preloader />
          {/* preloader end */}

          <YoutubeMarquee />
          <TopBanner />
          <HeaderWrapper />
          <AccessibilityWidget />

          {/* content begin */}
          <div className="no-bottom no-top" id="content">
            <div id="top"></div>
            {children}
          </div>
          {/* content end */}

        </div>

        {/* overlay content begin */}
        <div id="extra-wrap" className="text-light">
          <div id="btn-close">
            <span></span>
            <span></span>
          </div>

          <div id="extra-content">
            <img src="/main logo.png" className="w-150px" alt="Dentia Logo" />

            <div className="spacer-30-line"></div>

            <h5>Our Services</h5>
            <ul className="ul-check">
              <li><Link href="/services/general-dentistry">General Dentistry</Link></li>
              <li><Link href="/services/cosmetic-dentistry">Cosmetic Dentistry</Link></li>
              <li><Link href="/services/pediatric-dentistry">Pediatric Dentistry</Link></li>
              <li><Link href="/services/restorative-dentistry">Restorative Dentistry</Link></li>
              <li><Link href="/services/preventive-dentistry">Preventive Dentistry</Link></li>
              <li><Link href="/services/orthodontics">Orthodontics</Link></li>
            </ul>

            <div className="spacer-30-line"></div>

            <h5>Contact Us</h5>
            <div><i className="icofont-clock-time me-2 op-5"></i>Monday - Friday 08.00 - 18.00</div>
            <div><i className="icofont-location-pin me-2 op-5"></i>100 S Main St, New York, </div>
            <div><i className="icofont-envelope me-2 op-5"></i>info@uedi.nyc </div>

            <div className="spacer-30-line"></div>

            <h5>About Us</h5>
            <p>At Dentia, we’re dedicated to providing high-quality, personalized dental care for patients of all ages. Our skilled team uses the latest technology to ensure comfortable, efficient treatments and beautiful, healthy smiles for life.</p>

            <div className="social-icons">
              <Link href="https://www.facebook.com/UpperEastDental/" target="_blank">
                <Image src="/social icons/facebook.png" alt="Facebook" width={18} height={18} className="object-contain" />
              </Link>
              <Link href="https://www.instagram.com/uppereastdentalnyc/?hl=en" target="_blank">
                <Image src="/social icons/instagram.png" alt="Instagram" width={18} height={18} className="object-contain" />
              </Link>
              <Link href="https://www.linkedin.com/in/shardeharvey/?_l=en_US" target="_blank">
                <Image src="/social icons/linkedin.png" alt="LinkedIn" width={18} height={18} className="object-contain" />
              </Link>
              <Link href="https://x.com/uppereastdental" target="_blank">
                <Image src="/social icons/twitter.png" alt="X (Twitter)" width={18} height={18} className="object-contain" />
              </Link>
              <Link href="https://www.youtube.com/@askadentistaskdr.harvey7701" target="_blank">
                <Image src="/social icons/youtube.png" alt="YouTube" width={18} height={18} className="object-contain" />
              </Link>
            </div>
          </div>
        </div>

        </BookingModalProvider>

        <Script src="/js/plugins.js" strategy="beforeInteractive" />
        <Script src="/js/on3step.js" strategy="lazyOnload" />
        <Script src="/js/swiper.js" strategy="lazyOnload" />
        <Script src="/js/custom-marquee.js" strategy="lazyOnload" />
        <AIWidget />
      </body>
    </html>
  );
}
