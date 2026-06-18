import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";
import HeaderWrapper from "@/components/HeaderWrapper";
import Preloader from "@/components/Preloader";
import Footer from "@/components/Footer";
import ScriptHandler from "@/components/ScriptHandler";
import TopBanner from "@/components/TopBanner";
import YoutubeMarquee from "@/components/YoutubeMarquee";
import Image from "next/image";
import AccessibilityWidget from "@/components/AccessibilityWidget";
import CursorGlow from "@/components/CursorGlow";
import BookingModalProvider from "@/components/BookingModalProvider";
import MobileConversionBar from "@/components/MobileConversionBar";
import LegacyAssetsLoader from "@/components/LegacyAssetsLoader";
import LazyAIWidget from "@/components/LazyAIWidget";
import LazySmileAssessmentPopup from "@/components/LazySmileAssessmentPopup";

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
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:ital,wght@0,200;0,300;0,400;0,500;0,600;0,700;0,800;1,200;1,300;1,400;1,500;1,600;1,700;1,800&family=Urbanist:ital,wght@0,200;0,300;0,400;0,500;0,600;0,700;0,800;1,200;1,300;1,400;1,500;1,600;1,700;1,800&display=swap"
          rel="stylesheet"
        />
        <link href="/css/bootstrap.min.css" rel="stylesheet" type="text/css" id="bootstrap" />
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
              <Image src="/main logo.png" className="w-150px" alt="Upper East Dental Innovations" width={420} height={160} sizes="150px" />

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
              <div><i className="icofont-clock-time me-2 op-5"></i>Monday - Friday 9:00 AM - 6:00 PM · Saturday as per request</div>
              <div><i className="icofont-location-pin me-2 op-5"></i>121 East 60th Street, Suite 1B, New York, NY 10022</div>
              <div><i className="icofont-envelope me-2 op-5"></i>info@uedi.nyc </div>

              <div className="spacer-30-line"></div>

              <h5>About Us</h5>
              <p>At Upper East Dental Innovations, we provide personalized dental care supported by advanced technology, thoughtful service, and a commitment to healthy, confident smiles.</p>

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
          <MobileConversionBar />
          <LazySmileAssessmentPopup />
        </BookingModalProvider>

        <LegacyAssetsLoader />
        <LazyAIWidget />
      </body>
    </html>
  );
}
