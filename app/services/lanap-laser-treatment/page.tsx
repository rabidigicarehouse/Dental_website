import Image from 'next/image';
import Link from 'next/link';
import MapContactSection from '@/components/MapContactSection';
import Footer from '@/components/Footer';

const ASSET = '/lanap_&_pinhole';
const SERVICE_NAME = 'LANAP® Laser Treatment';

export default function LANAPLaserTreatment() {
  return (
    <>
      {/* Full-width main heading — banner fits edge to edge, fully visible */}
      <section className="lanap-banner-hero" aria-label={SERVICE_NAME}>
        <Image
          src={`${ASSET}/lanap banner.jpg`}
          className="lanap-banner-hero__img"
          alt="LANAP Protocol — laser-assisted periodontal treatment" width={1200} height={800} />
      </section>

      {/* Intro — same structure as other service pages (image + information) */}
      <section>
        <div className="container">
          <div className="row g-4 align-items-center">
            <div className="col-lg-7">
              <div className="w-100 wow scaleIn">
                <Image
                  src={`${ASSET}/lanap.png`}
                  className="w-100 rounded-1 lanap-intro-img"
                  alt="LANAP laser-assisted new attachment procedure" width={1200} height={800} />
              </div>
            </div>
            <div className="col-lg-5">
              <div className="ps-lg-3">
                <div className="subtitle id-color wow fadeInUp" data-wow-delay=".2s">
                  {SERVICE_NAME}
                </div>
                <h2 className="wow fadeInUp" data-wow-delay=".4s">
                  What Is LANAP® Laser Treatment?
                </h2>
                <p className="wow fadeInUp" data-wow-delay=".5s">
                  LANAP® (Laser-Assisted New Attachment Procedure) is the only FDA-cleared laser
                  protocol for treating moderate to severe periodontitis. It eliminates diseased
                  tissue and bacteria without scalpels or sutures—while helping your body regenerate
                  healthy attachment around your teeth.
                </p>
                <p className="mb-0 wow fadeInUp" data-wow-delay=".6s">
                  At Upper East Dental Innovations, LANAP® offers a minimally invasive alternative to
                  traditional gum surgery with less pain, faster healing, and clinically proven
                  results for lasting periodontal health.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PerioLase® MVP-7 machine */}
      <section className="bg-color-op-1 pt-80 pb-80">
        <div className="container">
          <div className="row g-5 align-items-center flex-lg-row-reverse">
            <div className="col-lg-6">
              <div className="lanap-machine-img-wrap wow fadeInUp">
                <Image
                  src={`${ASSET}/lanap machine.jpg`}
                  className="lanap-machine-img"
                  alt="PerioLase MVP-7 laser system for LANAP treatment" width={1200} height={800} />
              </div>
            </div>
            <div className="col-lg-6">
              <div className="subtitle id-color wow fadeInUp">Advanced Technology</div>
              <h2 className="wow fadeInUp" data-wow-delay=".1s">
                PerioLase® MVP-7 Laser System
              </h2>
              <p className="wow fadeInUp" data-wow-delay=".15s">
                The LANAP® protocol is performed with the PerioLase® MVP-7—the dedicated laser
                system designed specifically for periodontal regeneration. Its precise wavelength
                targets infected tissue and bacteria while preserving healthy gum structure.
              </p>
              <ul className="ul-check fs-500 wow fadeInUp" data-wow-delay=".2s">
                <li>FDA-cleared protocol for advanced gum disease</li>
                <li>Selective removal of diseased tissue without cutting the gum line</li>
                <li>Stimulates regeneration of bone and periodontal ligament</li>
                <li>Less post-operative discomfort than traditional osseous surgery</li>
                <li>No scalpel, no sutures, and minimal downtime for most patients</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA — same as other service pages */}
      <section className="bg-color text-light pt-50 pb-50">
        <div className="container">
          <div className="row g-4 align-items-center">
            <div className="col-md-9">
              <h3 className="mb-0 fs-32">Ready to Book Your Appointment?</h3>
              <p className="mb-0">
                Contact us today to schedule your visit and take the first step toward a healthier
                smile.
              </p>
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
