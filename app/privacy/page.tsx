'use client';

import Link from 'next/link';
import Footer from '@/components/Footer';
import MapContactSection from '@/components/MapContactSection';

export default function PrivacyPage() {
  return (
    <>
      <section
        className="page-subheader text-center"
        style={{
          background: 'linear-gradient(135deg, #1d2c36 0%, #165369 100%)',
        }}
      >
        <div className="container relative z-2">
          <div className="page-subheader-eyebrow" style={{ color: 'rgba(255,255,255,0.85)' }}>
            Legal
          </div>
          <h1 className="page-subheader-title" style={{ color: '#fff' }}>
            Privacy Policy
          </h1>
          <ul className="crumb">
            <li>
              <Link href="/" style={{ color: 'rgba(255,255,255,0.8)' }}>
                Home
              </Link>
            </li>
            <li className="active" style={{ color: '#fff' }}>
              Privacy Policy
            </li>
          </ul>
        </div>
      </section>

      <section className="legal-page-section">
        <div className="container">
          <div className="legal-card">
            <h3 className="legal-heading">Privacy Statement</h3>
            <p>
              We are committed to protecting your privacy and developing technology that gives you
              the most powerful and safe online experience. This Statement of Privacy applies to our
              Practice&rsquo;s Web site and governs data collection and usage. By using this website,
              you consent to the data practices described in this statement.
            </p>

            <h3 className="legal-heading">Collection of Your Personal Information</h3>
            <p>
              This Practice collects personally identifiable information, such as your e-mail
              address, name, home or work address or telephone number. This Practice also collects
              anonymous demographic information, which is not unique to you, such as your ZIP code,
              age, gender, preferences, interests and favorites.
            </p>
            <p>
              There is also information about your computer hardware and software that is
              automatically collected by this website. This information can include: your IP address,
              browser type, domain names, access times and referring Web site addresses. This
              information is used for the operation of the service, to maintain quality of the
              service, and to provide general statistics regarding use of this Web site.
            </p>
            <p>
              Please keep in mind that if you directly disclose personally identifiable information
              or personally sensitive data through public message boards, this information may be
              collected and used by others.
            </p>
            <p>
              This Practice encourages you to review the privacy statements of Web sites you choose
              to link to from the website so that you can understand how those Web sites collect, use
              and share your information. This Practice is not responsible for the privacy statements
              or other content on any other Web sites.
            </p>

            <h3 className="legal-heading">Use of Your Personal Information</h3>
            <p>
              This Practice collects and uses your personal information to operate the Web site and
              deliver the services you have requested. This Practice also uses your personally
              identifiable information to inform you of other products or services available from
              this Practice and its affiliates. This Practice may also contact you via surveys to
              conduct research about your opinion of current services or of potential new services
              that may be offered.
            </p>
            <p>
              We value your privacy and are committed to safeguarding your personal information. We
              do not share, sell, or disclose your information to third parties for marketing
              purposes. Any personal data you provide is used solely to enhance your experience with
              our services, fulfill your requests, and comply with applicable legal obligations. Rest
              assured that your information is handled with the utmost care and is not utilized for
              promotional activities outside of our direct communication with you.
            </p>
            <p>
              This Practice does not use or disclose sensitive personal information, such as race,
              religion, or political affiliations, without your explicit consent.
            </p>
            <p>
              This Practice will disclose your personal information, without notice, only if required
              to do so by law.
            </p>

            <h3 className="legal-heading">Use of Cookies</h3>
            <p>
              The Web site uses &ldquo;cookies&rdquo; to help this Practice personalize your online
              experience. A cookie is a text file that is placed on your hard disk by a Web page
              server. Cookies cannot be used to run programs or deliver viruses to your computer.
              Cookies are uniquely assigned to you, and can only be read by a web server in the
              domain that issued the cookie to you.
            </p>

            <h3 className="legal-heading">Security of Your Personal Information</h3>
            <p>
              This Practice secures your personal information from unauthorized access, use or
              disclosure. This Practice secures the personally identifiable information you provide
              on computer servers in a controlled, secure environment, protected from unauthorized
              access, use or disclosure. When personal information (such as a credit card number) is
              transmitted to other Web sites, it is protected through the use of encryption, such as
              the Secure Socket Layer (SSL) protocol.
            </p>

            <h3 className="legal-heading">Changes to This Statement</h3>
            <p>
              This Practice will occasionally update this Statement of Privacy to reflect company and
              customer feedback. We encourage you to periodically review this Statement to be
              informed of how this Practice is protecting your information.
            </p>

            <h3 className="legal-heading">Contact Information</h3>
            <p>
              Please contact us by phone at{' '}
              <a href="tel:+12126971701" className="legal-link">
                212-697-1701
              </a>{' '}
              or by mail at 121 East 60th Street, Suite 1B, New York, NY 10022.
            </p>
          </div>
        </div>
      </section>

      <MapContactSection />

      <Footer />
    </>
  );
}
