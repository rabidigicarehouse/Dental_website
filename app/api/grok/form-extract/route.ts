import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

const GROQ_ENDPOINT = 'https://api.groq.com/openai/v1/chat/completions';
const GROQ_MODEL = 'llama-3.3-70b-versatile';

function cleanKey(raw: string | undefined | null): string | null {
  if (!raw) return null;
  const m = raw.match(/gsk_[A-Za-z0-9_-]+/);
  return m ? m[0] : null;
}

async function readApiKey(): Promise<string | null> {
  let key = cleanKey(process.env.GROQ_API_KEY_2) || cleanKey(process.env.GROQ_API_KEY);
  if (key) return key;

  try {
    const filePath = path.join(process.cwd(), 'apikey.txt');
    const raw = await fs.readFile(filePath, 'utf-8');
    const match = raw.match(/gsk_[A-Za-z0-9_-]+/);
    return match ? match[0] : null;
  } catch {
    return null;
  }
}

function extractJsonObject(text: string): Record<string, string> | null {
  const match = text.match(/\{[\s\S]*\}/);
  if (!match) return null;
  try {
    const parsed = JSON.parse(match[0]);
    return parsed && typeof parsed === 'object' ? parsed : null;
  } catch {
    return null;
  }
}

export async function POST(request: NextRequest) {
  let body: { utterance?: string; currentField?: string; knownData?: Record<string, string> } = {};
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON.' }, { status: 400 });
  }

  const utterance = String(body.utterance || '').trim();
  const currentField = String(body.currentField || '').trim();
  const knownData = body.knownData && typeof body.knownData === 'object' ? body.knownData : {};

  if (!utterance) {
    return NextResponse.json({ error: 'Missing utterance.' }, { status: 400 });
  }

  const apiKey = await readApiKey();
  if (!apiKey) {
    return NextResponse.json({ error: 'Groq API key not configured.' }, { status: 500 });
  }

  const systemPrompt = `
You extract booking-form fields from a patient's spoken reply for Upper East Dental Innovations.
Return JSON only. No markdown. No commentary.

Allowed keys:
firstName, lastName, dob, phone, email, sex, reason, date, time

Rules:
- Extract only what the patient actually said or what is strongly implied.
- If first and last name are both present, return both.
- For dob, return MM/DD/YYYY.
- For date, return a natural appointment-date string like "May 15, 2026".
- For time, return a string like "3:00 PM".
- If nothing useful can be extracted, return {}.
- Do not invent missing values.
- Focus especially on the current requested field, but include any other explicit booking fields spoken in the same utterance.
`.trim();

  const userPrompt = JSON.stringify({
    currentField,
    knownData,
    utterance,
  });

  try {
    const res = await fetch(GROQ_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: GROQ_MODEL,
        temperature: 0,
        max_tokens: 180,
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt },
        ],
      }),
      signal: AbortSignal.timeout(20000),
    });

    const data = await res.json().catch(() => null);
    if (!res.ok) {
      return NextResponse.json(
        { error: data?.error?.message || data?.error || `Groq returned HTTP ${res.status}` },
        { status: res.status }
      );
    }

    const content = data?.choices?.[0]?.message?.content;
    const text =
      typeof content === 'string'
        ? content
        : Array.isArray(content)
          ? content.map((part: any) => (typeof part === 'string' ? part : part?.text || '')).join('')
          : '';

    const fields = extractJsonObject(text) || {};
    return NextResponse.json({ fields });
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || 'Could not extract booking fields.' },
      { status: 502 }
    );
  }
}
