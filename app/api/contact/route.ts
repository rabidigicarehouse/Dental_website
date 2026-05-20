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

  console.log('[Next API /api/contact] Forwarding to', `${backendUrl}/api/contact`);

  let response: Response;
  try {
    response = await fetch(`${backendUrl}/api/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
  } catch (error: any) {
    const code = error?.cause?.code || error?.code;
    const isConnRefused = code === 'ECONNREFUSED' || code === 'ENOTFOUND';
    console.error(
      '[Next API /api/contact] Cannot reach backend:',
      code || error?.message,
    );
    return NextResponse.json(
      {
        error: isConnRefused
          ? `Contact backend is not reachable at ${backendUrl}. Start the Express server (cd backend && npm start) and try again.`
          : 'Failed to connect to contact service. Please try again.',
      },
      { status: 502 }
    );
  }

  let data: unknown;
  try {
    data = await response.json();
  } catch {
    data = { error: `Backend returned non-JSON response (HTTP ${response.status}).` };
  }
  console.log('[Next API /api/contact] Backend responded:', response.status, data);

  return NextResponse.json(data, { status: response.status });
}
