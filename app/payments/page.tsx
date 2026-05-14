import Link from 'next/link';
import MapContactSection from '@/components/MapContactSection';
import Footer from '@/components/Footer';

const methods = [
  {
    title: 'Credit Card',
    icon: 'fa fa-credit-card',
    desc: 'Visa, Mastercard, American Express and Discover accepted.',
    note: '3% processing fee applies',
    href: '/payment/credit-card',
    color: '#4A7CD2',
  },
  {
    title: 'Zelle',
    icon: 'fa fa-paper-plane',
    desc: 'Fast, secure bank-to-bank transfers — no fees, no waiting.',
    note: 'No fee',
    href: '/payment/zelle',
    color: '#6E48AA',
  },
  {
    title: 'Cherry Financing',
    icon: 'fa fa-leaf',
    desc: 'Flexible monthly payment plans for any treatment plan.',
    note: '0% APR available',
    href: '/payment/cherry',
    color: '#D4567A',
  },
  {
    title: 'CareCredit',
    icon: 'fa fa-heart',
    desc: 'Healthcare credit card with promotional financing options.',
    note: 'No interest if paid in full',
    href: '/payment/care-credit',
    color: '#16A99D',
  },
  {
    title: 'Cryptocurrency',
    icon: 'fa fa-bitcoin',
    desc: 'Bitcoin, Ethereum and other major cryptocurrencies accepted.',
    note: 'Network fees may apply',
    href: '/payment/crypto',
    color: '#F7931A',
  },
  {
    title: 'Cash & Check',
    icon: 'fa fa-money',
    desc: 'Traditional payment methods welcome at the front desk.',
    note: 'No fee',
    href: '/payment/cash',
    color: '#2A5298',
  },
  {
    title: 'Insurance',
    icon: 'fa fa-shield',
    desc: 'We accept and bill most major dental insurance plans.',
    note: 'Verification provided',
    href: '/payment/insurance',
    color: '#1a3352',
  },
  {
    title: 'HSA / FSA',
    icon: 'fa fa-medkit',
    desc: 'Use your tax-advantaged Health or Flexible Spending Account.',
    note: 'Eligible expenses',
    href: '/payment/hsa-fsa',
    color: '#D4AF37',
  },
];

export default function Payments() {
  return (
    <>
      <section id="subheader" className="bg-color-op-1 text-center">
        <div className="container relative z-2">
          <div className="row align-items-center">
            <div className="col-lg-12">
              <h1 className="wow fadeInUp">Payment Options</h1>
              <div className="border-bottom my-3"></div>
              <ul className="crumb wow fadeInDown">
                <li><Link href="/">Home</Link></li>
                <li className="active">Payments</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          <div className="row g-4 justify-content-center text-center mb-5">
            <div className="col-lg-8">
              <div className="subtitle wow fadeInUp mb-3">Flexible & Convenient</div>
              <h2 className="wow fadeInUp" data-wow-delay=".2s">Choose How You&apos;d Like to Pay</h2>
              <p className="mb-0 wow fadeInUp">
                At Upper East Dental Innovations, we believe great dental care should be accessible.
                Pick the payment method that works best for you — we accept all major options.
              </p>
            </div>
          </div>

          <div className="row g-4">
            {methods.map((m, i) => (
              <div className="col-lg-3 col-md-6 d-flex" key={m.title}>
                <div
                  className="payment-method-card wow fadeInUp w-100"
                  data-wow-delay={`${i * 0.08}s`}
                >
                  <div className="payment-icon-wrap" style={{ background: m.color }}>
                    <i className={m.icon}></i>
                  </div>
                  <h4 className="payment-method-title">{m.title}</h4>
                  <p className="payment-method-desc">{m.desc}</p>
                  <div className="payment-method-note">{m.note}</div>
                  <Link href={m.href} className="payment-method-link">
                    Details <span>→</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="payment-info-banner mt-5 wow fadeInUp">
            <div className="row align-items-center g-4">
              <div className="col-lg-9">
                <h4 className="mb-2" style={{ color: '#fff' }}>Questions about billing?</h4>
                <p className="mb-0" style={{ color: 'rgba(255,255,255,0.85)' }}>
                  Our front desk team is happy to walk you through your treatment estimate,
                  insurance benefits and the best payment options for your situation.
                </p>
              </div>
              <div className="col-lg-3 text-lg-end">
                <Link href="tel:+12126971701" className="btn-main btn-line fx-slide">
                  <span>Call 212.697.1701</span>
                </Link>
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
