import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const backendUrl = process.env.BACKEND_URL || 'http://localhost:5000';
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: 'Invalid JSON in request body.' },
      { status: 400 }
    );
  }

  console.log('[Next API /api/book] Forwarding to', `${backendUrl}/api/book`);

  let response: Response;
  try {
    response = await fetch(`${backendUrl}/api/book`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
  } catch (error: any) {
    // Network-level failure — almost always means the Express backend
    // isn't running on backendUrl. Make the message explicit so the
    // frontend can show actionable text.
    const code = error?.cause?.code || error?.code;
    const isConnRefused = code === 'ECONNREFUSED' || code === 'ENOTFOUND';
    console.error(
      '[Next API /api/book] Cannot reach backend:',
      code || error?.message,
    );
    return NextResponse.json(
      {
        error: isConnRefused
          ? `Booking backend is not reachable at ${backendUrl}. Start the Express server (cd backend && npm start) and try again.`
          : 'Failed to connect to booking service. Please try again.',
      },
      { status: 502 } // 502 = Bad Gateway, semantically correct for a broken upstream
    );
  }

  // Mirror whatever the backend returned, verbatim, so the frontend can show
  // the real success/failure message.
  let data: unknown;
  try {
    data = await response.json();
  } catch {
    data = { error: `Backend returned non-JSON response (HTTP ${response.status}).` };
  }
  console.log('[Next API /api/book] Backend responded:', response.status, data);

  return NextResponse.json(data, { status: response.status });
}
