import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const backendUrl = process.env.BACKEND_URL || 'http://localhost:5000';
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON in request body.' }, { status: 400 });
  }

  console.log('[Next API /api/forms/submit] Forwarding to', `${backendUrl}/api/forms/submit`);

  let response: Response;
  try {
    response = await fetch(`${backendUrl}/api/forms/submit`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
  } catch (error: any) {
    const code = error?.cause?.code || error?.code;
    const isConnRefused = code === 'ECONNREFUSED' || code === 'ENOTFOUND';
    console.error('[Next API /api/forms/submit] Cannot reach backend:', code || error?.message);
    return NextResponse.json(
      {
        error: isConnRefused
          ? `Forms backend is not reachable at ${backendUrl}. Start the Express server (cd backend && npm start) and try again.`
          : 'Failed to connect to forms service. Please try again.',
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
  console.log('[Next API /api/forms/submit] Backend responded:', response.status, data);

  return NextResponse.json(data, { status: response.status });
}
