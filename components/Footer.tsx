import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="section-dark">
      <div className="container">
        <div className="row gx-5">
          <div className="col-lg-4 col-sm-6">
            <img src="/main logo.png" className="logo-footer" alt="Dentia Logo" />
            <div className="spacer-20"></div>
            <p>At Dentia, we’re dedicated to providing high-quality, personalized dental care for patients of all ages. Our skilled team uses the latest technology to ensure comfortable, efficient treatments and beautiful, healthy smiles for life.</p>

            <div className="social-icons mb-sm-30">
              <Link href="https://www.facebook.com/UpperEastDental/" target="_blank"><i style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}><img src="/social icons/facebook.png" alt="Facebook" style={{ width: '18px', height: '18px', objectFit: 'contain' }} /></i></Link>
              <Link href="https://x.com/uppereastdental" target="_blank"><i style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}><img src="/social icons/twitter.png" alt="X (Twitter)" style={{ width: '18px', height: '18px', objectFit: 'contain' }} /></i></Link>
              <Link href="https://www.linkedin.com/in/shardeharvey/?_l=en_US" target="_blank"><i style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}><img src="/social icons/linkedin.png" alt="LinkedIn" style={{ width: '18px', height: '18px', objectFit: 'contain' }} /></i></Link>
              <Link href="https://www.instagram.com/uppereastdentalnyc/?hl=en" target="_blank"><i style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}><img src="/social icons/instagram.png" alt="Instagram" style={{ width: '18px', height: '18px', objectFit: 'contain' }} /></i></Link>
              <Link href="https://www.youtube.com/@askadentistaskdr.harvey7701" target="_blank"><i style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}><img src="/social icons/youtube.png" alt="YouTube" style={{ width: '18px', height: '18px', objectFit: 'contain' }} /></i></Link>
            </div>
          </div>
          <div className="col-lg-4 col-sm-12 order-lg-1 order-sm-2">
            <div className="row">
              <div className="col-lg-6 col-sm-6">
                <div className="widget">
                  <h5>Company</h5>
                  <ul>
                    <li><Link href="/about">About</Link></li>
                    <li><Link href="/services">Our Services</Link></li>
                    <li><Link href="/smile-gallery">Smile Gallery</Link></li>
                    <li><Link href="/payments">Payments</Link></li>
                    <li><Link href="/testimonials">Testimonials</Link></li>
                    <li><Link href="/contact">Contact</Link></li>
                  </ul>
                </div>
              </div>
              <div className="col-lg-6 col-sm-6">
                <div className="widget">
                  <h5>Our Services</h5>
                  <ul>
                    <li><Link href="/services/cosmetic-dentistry">Cosmetic Dentistry</Link></li>
                    <li><Link href="/services/restorative-dentistry">Restorative Dentistry</Link></li>
                    <li><Link href="/services/pediatric-dentistry">Pediatric Dentistry</Link></li>
                    <li><Link href="/services/dental-implants">Dental Implants</Link></li>
                    <li><Link href="/services/endodontics">Endodontics</Link></li>
                    <li><Link href="/services/tele-dentistry">Virtual Dentistry</Link></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-sm-6 order-lg-2 order-sm-1">
            <div className="widget">
              <h5>Contact Us</h5>
              <div className="fw-bold text-white"><i className="icofont-location-pin me-2 id-color"></i>Clinic Location</div>
              121 East 60th Street, Suite 1B New York, NY 10022

              <div className="spacer-20"></div>

              <div className="fw-bold text-white"><i className="icofont-phone me-2 id-color"></i>Call Us</div>
              <Link href="tel:+12126971701" className="text-white">212.697.1701</Link>

              <div className="spacer-20"></div>

              <div className="fw-bold text-white"><i className="icofont-clock-time me-2 id-color"></i>Opening Hours</div>
              MON - Fri (09 am - 06 pm)

              <div className="spacer-20"></div>

              <div className="fw-bold text-white"><i className="icofont-envelope me-2 id-color"></i>Email Us</div>
              <Link href="mailto:info@uedi.nyc" className="text-white">info@uedi.nyc</Link>
            </div>
          </div>
        </div>
      </div>
      <div className="subfooter">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="de-flex">
                <div className="de-flex-col">
                  Copyright {new Date().getFullYear()} - Dentia by on3step
                </div>
                <ul className="menu-simple">
                  <li><Link href="#">Terms &amp; Conditions</Link></li>
                  <li><Link href="#">Privacy Policy</Link></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
