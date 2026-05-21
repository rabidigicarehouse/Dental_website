'use client';

import Link from 'next/link';
import Footer from '@/components/Footer';
import MapContactSection from '@/components/MapContactSection';

export default function TermsPage() {
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
            Terms &amp; Conditions
          </h1>
          <ul className="crumb">
            <li>
              <Link href="/" style={{ color: 'rgba(255,255,255,0.8)' }}>
                Home
              </Link>
            </li>
            <li className="active" style={{ color: '#fff' }}>
              Terms &amp; Conditions
            </li>
          </ul>
        </div>
      </section>

      <section className="legal-page-section">
        <div className="container">
          <div className="legal-card">
            <p className="legal-intro">
              This Practice Web Site is offered to you conditioned on your acceptance without
              modification of the terms, conditions, and notices contained herein. Your use of this
              Practice Web Site constitutes your agreement to all such terms, conditions, and notices.
            </p>

            <h3 className="legal-heading">Modification of These Terms of Use</h3>
            <p>
              This Practice reserves the right to change the terms, conditions, and notices under
              which this Practice Web Site is offered, including but not limited to the charges
              associated with the use of this Practice Web Site.
            </p>

            <h3 className="legal-heading">Links to Third-Party Sites</h3>
            <p>
              This Practice Web Site may contain links to other Web Sites (&ldquo;Linked Sites&rdquo;).
              The Linked Sites are not under the control of this Practice and this Practice is not
              responsible for the contents of any Linked Site, including without limitation any link
              contained in a Linked Site, or any changes or updates to a Linked Site. This Practice
              is not responsible for webcasting or any other form of transmissions received from any
              Linked Site. This Practice is providing these links to you only as a convenience, and
              the inclusion of any link does not imply endorsement by this Practice of the site or
              any association with its operators.
            </p>

            <h3 className="legal-heading">No Unlawful or Prohibited Use</h3>
            <p>
              As a condition of your use of this Practice Web Site, you warrant to this Practice that
              you will not use this Practice Web Site for any purpose that is unlawful or prohibited
              by these terms, conditions, and notices. You may not use this Practice Web Site in any
              manner which could damage, disable, overburden, or impair this Practice Web Site or
              interfere with any other party&rsquo;s use and enjoyment of this Practice Web Site. You
              may not obtain or attempt to obtain any materials or information through any means not
              intentionally made available or provided for through this Practice Web Sites.
            </p>

            <h3 className="legal-heading">Use of Communication Services</h3>
            <p>
              This Practice Web Site may contain bulletin board services, chat areas, news groups,
              forums, communities, personal web pages, calendars, and/or other message or
              communication facilities designed to enable you to communicate with the public at large
              or with a group (collectively, &ldquo;Communication Services&rdquo;), you agree to use
              the Communication Services only to post, send and receive messages and material that
              are proper and related to the particular Communication Service. By way of example, and
              not as a limitation, you agree that when using a Communication Service, you will not:
            </p>
            <ul className="legal-bullets">
              <li>
                Defame, abuse, harass, stalk, threaten or otherwise violate the legal rights (such as
                rights of privacy and publicity) of others.
              </li>
              <li>
                Publish, post, upload, distribute or disseminate any inappropriate, profane,
                defamatory, infringing, obscene, indecent or unlawful topic, name, material or
                information.
              </li>
              <li>
                Upload files that contain software or other material protected by intellectual
                property laws (or by rights of privacy of publicity) unless you own or control the
                rights thereto or have received all necessary consents.
              </li>
              <li>
                Upload files that contain viruses, corrupted files, or any other similar software or
                programs that may damage the operation of another&rsquo;s computer.
              </li>
              <li>
                Advertise or offer to sell or buy any goods or services for any business purpose,
                unless such Communication Service specifically allows such messages.
              </li>
              <li>Conduct or forward surveys, contests, pyramid schemes or chain letters.</li>
              <li>
                Download any file posted by another user of a Communication Service that you know, or
                reasonably should know, cannot be legally distributed in such manner.
              </li>
              <li>
                Falsify or delete any author attributions, legal or other proper notices or
                proprietary designations or labels of the origin or source of software or other
                material contained in a file that is uploaded.
              </li>
              <li>Restrict or inhibit any other user from using and enjoying the Communication Services.</li>
              <li>
                Violate any code of conduct or other guidelines which may be applicable for any
                particular Communication Service.
              </li>
              <li>
                Harvest or otherwise collect information about others, including e-mail addresses,
                without their consent.
              </li>
              <li>Violate any applicable laws or regulations.</li>
            </ul>

            <p>
              This Practice has no obligation to monitor the Communication Services. However, this
              Practice reserves the right to review materials posted to a Communication Service and
              to remove any materials in its sole discretion. This Practice reserves the right to
              terminate your access to any or all of the Communication Services at any time without
              notice for any reason whatsoever.
            </p>
            <p>
              Materials uploaded to a Communication Service may be subject to posted limitations on
              usage, reproduction and/or dissemination. You are responsible for adhering to such
              limitations if you download the materials.
            </p>

            <h3 className="legal-heading">SMS Communication Disclosure</h3>
            <p>
              By providing your phone number and consenting to receive SMS communications, you agree
              to the following terms:
            </p>
            <ul className="legal-points">
              <li>
                <strong>Types of Messages:</strong> You may receive messages related to your account,
                transactions, updates about our services, promotional offers, or other information
                relevant to your relationship with us.
              </li>
              <li>
                <strong>Texting Cadence:</strong> The frequency of messages will vary based on your
                interaction with our services, but you can expect to receive messages only as
                necessary or as consented to.
              </li>
              <li>
                <strong>Message and Data Rates:</strong> Standard message and data rates may apply as
                per your mobile carrier&rsquo;s terms and conditions. Please check with your carrier
                for details.
              </li>
              <li>
                <strong>Privacy Policy:</strong> Your personal information is handled in accordance
                with our Privacy Policy. We do not share your phone number with third parties for
                marketing purposes without your explicit consent.
              </li>
              <li>
                <strong>Opt-Out Instructions:</strong> You may opt out of receiving SMS messages at
                any time by replying STOP to any message. For assistance, reply HELP or contact our
                support team.
              </li>
              <li>
                <strong>Consent:</strong> By opting in, you confirm that you are the owner of the
                phone number provided or have the owner&rsquo;s permission to receive SMS messages.
              </li>
            </ul>

            <h3 className="legal-heading">Liability Disclaimer</h3>
            <p>
              The information, software, products, and services included in or available through this
              Practice Web Site may include inaccuracies or typographical errors. Changes are
              periodically added to the information herein. This Practice and/or its suppliers may
              make improvements and/or changes in this Practice Web Site at any time. Advice received
              via this Practice Web Site should not be relied upon for personal, medical, legal or
              financial decisions and you should consult an appropriate professional for specific
              advice tailored to your situation.
            </p>
            <p>
              This Practice and/or its suppliers make no representations about the suitability,
              reliability, availability, timeliness, and accuracy of the information, software,
              products, services and related graphics contained on this Practice Web Site for any
              purpose. To the maximum extent permitted by applicable law, all such information,
              software, products, services and related graphics are provided &ldquo;as is&rdquo;
              without warranty or condition of any kind. This Practice and/or its suppliers hereby
              disclaim all warranties and conditions with regard to this information, software,
              products, services and related graphics, including all implied warranties or conditions
              of merchantability, fitness for a particular purpose, title and non-infringement.
            </p>
            <p>
              To the maximum extent permitted by applicable law, in no event shall this Practice
              and/or its suppliers be liable for any direct, indirect, punitive, incidental, special,
              consequential damages or any damages whatsoever including, without limitation, damages
              for loss of use, data or profits, arising out of or in any way connected with the use
              or performance of this Practice Web Site, with the delay or inability to use this
              Practice Web Site or related services, the provision of or failure to provide services,
              or for any information, software, products, services and related graphics obtained
              through this Practice Web Site, or otherwise arising out of the use of this Practice
              Web Site, whether based on contract, tort, negligence, strict liability or otherwise,
              even if this Practice or any of its suppliers has been advised of the possibility of
              damages. Because some states/jurisdictions do not allow the exclusion or limitation of
              liability for consequential or incidental damages, the above limitation may not apply
              to you. If you are dissatisfied with any portion of this Practice Web Site, or with any
              of these terms of use, your sole and exclusive remedy is to discontinue using this
              Practice Web Site.
            </p>

            <h3 className="legal-heading">Copyright and Trademark Notices</h3>
            <p>
              All contents of this website are Copyright © 2019 PatientPop Inc. All Rights Reserved.
              All logos are trademarks and service marks of PatientPop Inc. All other trademarks,
              service marks and logos used in this website are the property of their respective
              owners.
            </p>

            <h3 className="legal-heading">Trademarks</h3>
            <p>
              The names of actual companies and products mentioned herein may be the trademarks of
              their respective owners.
            </p>
            <p>
              The example companies, organizations, products, people and events depicted herein are
              fictitious. No association with any real company, organization, product, person, or
              event is intended or should be inferred.
            </p>
            <p>Any rights not expressly granted herein are reserved.</p>

            <h3 className="legal-heading">Notices</h3>
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
