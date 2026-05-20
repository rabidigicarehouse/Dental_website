import Link from 'next/link';

export default function Header({
  className = "transparent scroll-light",
  useHeaderInner = false
}: {
  className?: string;
  useHeaderInner?: boolean;
}) {
  const isLightHeader = className.includes('header-light');
  const rowClassName = useHeaderInner ? "de-flex sm-pt10 header-inner" : "de-flex sm-pt10";

  return (
    <header className={className} data-base-class={className}>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className={rowClassName}>
              <div className="de-flex-col">
                {/* logo begin */}
                <div id="logo">
                  <Link href="/">
                    <img className="logo-main logo" src="/main logo.png" alt="UpperEast Logo" />
                    <img className="logo-scroll logo-2" src="/main logo dark.png" alt="UpperEast Logo" />
                    <img className="logo-mobile" src="/main logo.png" alt="UpperEast Logo" />
                    <img className="logo-mobile-dark" src="/main logo dark.png" alt="UpperEast Logo" />
                  </Link>
                </div>
                {/* logo end */}
              </div>
              <div className="de-flex-col header-col-mid">
                {/* mainemenu begin */}
                <ul id="mainmenu">
                  <li>
                    <Link className="menu-item" href="/about">About</Link>
                    <ul>
                      <li><Link href="/about">Our Doctors, Dental implants, Cosmetics Dentist, NYC</Link></li>
                      <li><Link href="/office-tour">Office tour</Link></li>
                    </ul>
                  </li>
                  <li>
                    <Link className="menu-item" href="/services">Services</Link>
                    <ul className="mega mega-services">
                      <li>
                        <div className="container">
                          <div className="row">
                            {/* Column 1 — Cosmetic */}
                            <div className="col-lg-3">
                              <ul>
                                <li className="title">Cosmetic Dentistry</li>
                                <li><Link href="/services/cosmetic-dentistry">Cosmetic Dentistry</Link></li>
                                <li><Link href="/services/teeth-whitening">Teeth Whitening</Link></li>
                                <li><Link href="/services/porcelain-veneers">Porcelain Veneers</Link></li>
                                <li><Link href="/services/minimal-prep-veneers">Minimal Prep Veneers</Link></li>
                                <li><Link href="/services/best-invisalign">Invisalign Teeth Straightening</Link></li>
                                <li><Link href="/services/same-day-crown">Same Day Crown</Link></li>
                                <li><Link href="/services/bridal-graduation-packages">Bridal &amp; Graduation Packages</Link></li>
                              </ul>
                            </div>

                            {/* Column 2 — Restorative + Family */}
                            <div className="col-lg-3">
                              <ul>
                                <li className="title">Restorative Dentistry</li>
                                <li><Link href="/services/the-lunchtime-crown">The Lunchtime Crown</Link></li>
                                <li><Link href="/services/crown-and-bridges">Crown &amp; Bridges</Link></li>
                                <li><Link href="/services/dental-implants">Dental Implants</Link></li>
                                <li><Link href="/services/dental-restoration">Dental Restoration</Link></li>
                                <li><Link href="/services/dentures-and-partial">Dentures &amp; Partial</Link></li>
                                <li><Link href="/services/full-mouth-reconstruction">Full-Mouth Reconstruction</Link></li>
                              </ul>
                              <ul>
                                <li className="title">Pediatric &amp; Family</li>
                                <li><Link href="/services/family-dentistry">Family Dentistry</Link></li>
                                <li><Link href="/services/pediatric-dentistry">Pediatric Dentistry</Link></li>
                              </ul>
                            </div>

                            {/* Column 3 — Advanced + Periodontal */}
                            <div className="col-lg-3">
                              <ul>
                                <li className="title">Advanced &amp; Specialized</li>
                                <li><Link href="/services/endodontics">Endodontics</Link></li>
                                <li><Link href="/services/sedation-dentistry">Sedation Dentistry</Link></li>
                                <li><Link href="/services/sleep-apnea-treatment">Sleep Apnea Treatment</Link></li>
                                <li><Link href="/services/stem-cell-dentistry">Stem Cell Dentistry</Link></li>
                                <li><Link href="/services/emergency-services">Emergency Services</Link></li>
                              </ul>
                              <ul>
                                <li className="title">Periodontal Care</li>
                                <li><Link href="/services/lanap-laser-treatment">LANAP® Laser Treatment</Link></li>
                                <li><Link href="/services/pinhole-surgical-technique">Pinhole® Surgical Technique</Link></li>
                                <li><Link href="/services/gum-recession-surgery">Gum Recession Surgery</Link></li>
                                <li><Link href="/services/periodontal-gum-disease">Periodontal Gum Disease</Link></li>
                              </ul>
                            </div>

                            {/* Column 4 — Holistic + Concierge + Virtual */}
                            <div className="col-lg-3">
                              <ul>
                                <li className="title">Holistic Dentistry</li>
                                <li><Link href="/services/holistic-dentistry">Holistic Dentistry</Link></li>
                                <li><Link href="/services/bad-breath-dentistry">Bad Breath Dentistry</Link></li>
                              </ul>
                              <ul>
                                <li className="title">Concierge Dentistry</li>
                                <li><Link href="/services/concierge-services">Concierge Services</Link></li>
                                <li><Link href="/services/transportation-elderly">Transportation for the Elderly</Link></li>
                              </ul>
                              <ul>
                                <li className="title">Virtual Dentistry</li>
                                <li><Link href="/services/tele-dentistry">Tele-Dentistry</Link></li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </li>
                  <li><Link className="menu-item" href="/payments">Payments</Link></li>
                  <li><Link className="menu-item" href="/testimonials">Testimonials</Link></li>
                  <li><Link className="menu-item" href="/smile-gallery">Smile Gallery</Link></li>
                  <li><Link className="menu-item" href="/technology">Technology</Link></li>
                  <li><Link className="menu-item" href="/contact">Contact Us</Link></li>
                  <li><Link className="menu-item" href="/membership">Membership</Link></li>
                  <li>
                    <Link className="menu-item" href="/patient-forms">Patient Form</Link>
                    <ul>
                      <li><Link href="/forms/patient-form">Patient Form</Link></li>
                      <li><Link href="/forms/medical-history">Medical History Form</Link></li>
                      <li><Link href="/forms/covid19">Covid19 Form</Link></li>
                      <li><Link href="/forms/patient-screening">Patient Screening Form</Link></li>
                    </ul>
                  </li>
                </ul>
                {/* mainmenu end */}
              </div>
              <div className="de-flex-col">
                <div className="menu_side_area">
                  <Link href="#book" className="btn-main fx-slide" data-hover="Book Appointment"><span>Book Appointment</span></Link>
                  <span id="menu-btn"></span>
                </div>
              </div>
              <div className="de-flex-col">
                <div id="btn-extra">
                  <span></span>
                  <span></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
