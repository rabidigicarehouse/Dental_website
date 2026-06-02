import Link from 'next/link';
import MapContactSection from '@/components/MapContactSection';
import Footer from '@/components/Footer';

export default function BillPaymentSuccessPage() {
  return (
    <>
      <section
        id="subheader"
        className="page-subheader text-center"
        style={{
          backgroundImage: 'url("/heading_background/payments.jpg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="container relative z-2">
          <div className="page-subheader-eyebrow" style={{ color: 'rgba(255,255,255,0.85)' }}>Payment Completed</div>
          <h1 className="page-subheader-title" style={{ color: '#fff' }}>Thank You</h1>
          <ul className="crumb">
            <li><Link href="/" style={{ color: 'rgba(255,255,255,0.8)' }}>Home</Link></li>
            <li><Link href="/payments" style={{ color: 'rgba(255,255,255,0.8)' }}>Payments</Link></li>
            <li className="active" style={{ color: '#fff' }}>Success</li>
          </ul>
        </div>
      </section>

      <section className="bill-payment-success-section">
        <div className="container">
          <div className="row justify-content-center align-items-center">
            <div className="col-xl-7 col-lg-8">
              <div className="bill-payment-panel bill-payment-panel--success text-center wow fadeInUp">
                <div className="subtitle mb-3">Square Hosted Checkout</div>
                <h2 className="mb-3">Your Payment Was Submitted</h2>
                <p className="mb-4">
                  Thank you. If your payment was completed successfully on Square, it should now be processing with Upper East Dental Innovations.
                </p>
                <div className="bill-payment-success-actions">
                  <Link href="/payments" className="btn-main fx-slide">
                    <span>Back to Payments</span>
                  </Link>
                </div>
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
