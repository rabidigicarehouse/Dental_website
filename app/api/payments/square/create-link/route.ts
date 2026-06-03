import { NextRequest, NextResponse } from 'next/server';
import { getFrontendBaseUrl, getSquareBaseUrl } from '@/lib/server/clinic-utils';

export const runtime = 'nodejs';

export async function POST(request: NextRequest) {
  const { amount } = await request.json().catch(() => ({}));
  const parsedAmount = Number(amount);

  if (!Number.isFinite(parsedAmount) || parsedAmount <= 0) {
    return NextResponse.json({ error: 'An amount greater than zero is required.' }, { status: 400 });
  }

  const accessToken = process.env.SQUARE_ACCESS_TOKEN;
  const locationId = process.env.SQUARE_LOCATION_ID;
  if (!accessToken || !locationId) {
    return NextResponse.json(
      { error: 'Square is not configured yet. Please add the Square access token and location ID.' },
      { status: 500 }
    );
  }

  const frontendBaseUrl = getFrontendBaseUrl();
  const idempotencyKey = `bill-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
  const amountInCents = Math.round(parsedAmount * 100);

  const payload = {
    idempotency_key: idempotencyKey,
    description: 'Bill payment via website',
    quick_pay: {
      name: 'Bill Payment',
      price_money: { amount: amountInCents, currency: 'USD' },
      location_id: locationId,
    },
    checkout_options: {
      redirect_url: `${frontendBaseUrl}/payments/bill-payment/success`,
      merchant_support_email: process.env.CLINIC_EMAIL || 'info@uedi.nyc',
      ask_for_shipping_address: false,
      enable_coupon: false,
    },
  };

  try {
    const response = await fetch(`${getSquareBaseUrl()}/v2/online-checkout/payment-links`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Square-Version': '2026-05-20',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json().catch(() => ({}));
    if (!response.ok) {
      const message = data?.errors?.[0]?.detail || data?.message || 'Square could not create the checkout link.';
      return NextResponse.json({ error: message }, { status: response.status });
    }

    const paymentLinkUrl = data?.payment_link?.url || data?.paymentLink?.url;
    if (!paymentLinkUrl) {
      return NextResponse.json({ error: 'Square did not return a checkout URL.' }, { status: 502 });
    }

    return NextResponse.json({ url: paymentLinkUrl });
  } catch (error) {
    console.error('[Square] create-link failed:', error);
    return NextResponse.json({ error: 'Could not reach Square. Please try again.' }, { status: 502 });
  }
}
