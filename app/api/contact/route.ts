import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    console.log('[Next API /api/contact] Received contact request, forwarding to backend...');

    const backendUrl = process.env.BACKEND_URL || 'http://localhost:5000';
    const response = await fetch(`${backendUrl}/api/contact`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();
    console.log('[Next API /api/contact] Backend responded with status:', response.status, data);

    return NextResponse.json(data, { status: response.status });
  } catch (error: any) {
    console.error('[Next API /api/contact] Error proxying to backend:', error);
    return NextResponse.json(
      { error: 'Failed to connect to contact service. Please try again.' },
      { status: 500 }
    );
  }
}
