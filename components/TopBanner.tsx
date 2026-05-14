import Link from 'next/link';
import Image from 'next/image';

export default function TopBanner() {
  return (
    <div className="top-banner">
      <div className="top-banner-inner">
        {/* Hours */}
        <div className="tb-item tb-hours">
          <i className="icofont-clock-time tb-icon"></i>
          <span>Mon – Fri ( 09 am – 06 pm )</span>
        </div>

        {/* Phone */}
        <div className="tb-item tb-phone">
          <i className="icofont-phone tb-icon"></i>
          <Link href="tel:+12126971701">Call Us: 212.697.1701</Link>
        </div>

        {/* Socials */}
        <div className="tb-item tb-socials">
          <Link
            href="https://www.instagram.com/uppereastdentalnyc/?hl=en"
            target="_blank"
            className="tb-social"
            aria-label="Instagram"
          >
            <Image src="/social icons/instagram.png" alt="Instagram" width={18} height={18} />
          </Link>
          <Link
            href="https://www.facebook.com/UpperEastDental/"
            target="_blank"
            className="tb-social"
            aria-label="Facebook"
          >
            <Image src="/social icons/facebook.png" alt="Facebook" width={18} height={18} />
          </Link>
          <Link
            href="https://www.linkedin.com/in/shardeharvey/?_l=en_US"
            target="_blank"
            className="tb-social"
            aria-label="LinkedIn"
          >
            <Image src="/social icons/linkedin.png" alt="LinkedIn" width={18} height={18} />
          </Link>
          <Link
            href="https://x.com/uppereastdental"
            target="_blank"
            className="tb-social"
            aria-label="X (Twitter)"
          >
            <Image src="/social icons/twitter.png" alt="X (Twitter)" width={18} height={18} />
          </Link>
          <Link
            href="https://www.youtube.com/@askadentistaskdr.harvey7701"
            target="_blank"
            className="tb-social"
            aria-label="YouTube"
          >
            <Image src="/social icons/youtube.png" alt="YouTube" width={18} height={18} />
          </Link>
        </div>

        {/* Address */}
        <div className="tb-item tb-address">
          <i className="icofont-location-pin tb-icon"></i>
          <Link
            href="https://maps.google.com/maps?q=121+E+60th+St+Suite+1B,New+York,NY+10022"
            target="_blank"
          >
            121 East 60th Street, Suite 1B  New York, NY 10022
          </Link>
        </div>
      </div>
    </div>
  );
}
