'use client';

import { FormEvent, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import MapContactSection from '@/components/MapContactSection';
import Footer from '@/components/Footer';
import { buildBackendUrl } from '@/lib/api-base-url';

type FormState = {
  amount: string;
};

const initialState: FormState = {
  amount: '',
};

export default function BillPaymentPage() {
  const searchParams = useSearchParams();
  const [form, setForm] = useState<FormState>(initialState);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const statusMessage =
    searchParams.get('status') === 'cancelled'
      ? 'Your Square checkout was cancelled. You can update the amount and try again anytime.'
      : '';

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');

    const amount = Number(form.amount);
    if (!Number.isFinite(amount) || amount <= 0) {
      setError('Please enter an amount greater than zero.');
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch(buildBackendUrl('/api/payments/square/create-link'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount,
        }),
      });

      const payload = await response.json().catch(() => ({}));
      if (!response.ok || !payload?.url) {
        setError(payload?.error || 'Could not start the Square checkout. Please try again.');
        return;
      }

      window.location.href = payload.url;
    } catch {
      setError('Could not reach the payment service. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

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
          <div className="page-subheader-eyebrow" style={{ color: 'rgba(255,255,255,0.85)' }}>Secure Online Payment</div>
          <h1 className="page-subheader-title" style={{ color: '#fff' }}>Bill Payment</h1>
          <ul className="crumb">
            <li><Link href="/" style={{ color: 'rgba(255,255,255,0.8)' }}>Home</Link></li>
            <li><Link href="/payments" style={{ color: 'rgba(255,255,255,0.8)' }}>Payments</Link></li>
            <li className="active" style={{ color: '#fff' }}>Bill Payment</li>
          </ul>
        </div>
      </section>

      <section>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-xl-8 col-lg-10">
              <div className="text-center mb-5">
                <div className="subtitle wow fadeInUp mb-3">Square Hosted Checkout</div>
                <h2 className="wow fadeInUp" data-wow-delay=".2s">Pay Your Bill Securely</h2>
                <p className="wow fadeInUp mb-0" data-wow-delay=".3s">
                  Enter the amount you would like to pay. You will be redirected to Square&apos;s secure checkout page to complete your payment.
                </p>
              </div>

              <div className="bill-payment-panel bill-payment-panel--compact wow fadeInUp">
                {statusMessage ? (
                  <div className="bill-payment-alert bill-payment-alert--info">{statusMessage}</div>
                ) : null}
                {error ? (
                  <div className="bill-payment-alert bill-payment-alert--error">{error}</div>
                ) : null}

                <form className="bill-payment-form" onSubmit={handleSubmit}>
                  <div className="bill-payment-amount-wrap">
                    <label className="bill-payment-label" htmlFor="bill-amount">Amount (USD)</label>
                    <div className="bill-payment-money-field">
                      <span className="bill-payment-money-prefix">$</span>
                      <input
                        id="bill-amount"
                        className="bill-payment-input bill-payment-input--money"
                        type="number"
                        min="0.01"
                        step="0.01"
                        placeholder="0.00"
                        value={form.amount}
                        onChange={(event) => setForm((prev) => ({ ...prev, amount: event.target.value }))}
                        required
                      />
                    </div>
                  </div>

                  <div className="bill-payment-actions">
                    <button type="submit" className="btn-main fx-slide" disabled={isSubmitting}>
                      <span>{isSubmitting ? 'Redirecting...' : 'Continue to Square Checkout'}</span>
                    </button>
                  </div>
                </form>
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
