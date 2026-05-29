import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

const SITE_URL = 'https://uppereastdentalinnovations.vercel.app/';
const SITE_PAGES = [
  '/',
  '/about',
  '/services',
  '/payments',
  '/testimonials',
  '/smile-gallery',
  '/technology',
  '/contact',
  '/membership',
  '/office-tour',
];

// Groq's OpenAI-compatible chat-completions endpoint.
const GROQ_ENDPOINT = 'https://api.groq.com/openai/v1/chat/completions';
// Current Groq production-grade model. Llama 3.3 70B is fast on Groq
// hardware and produces high-quality conversational replies.
const GROQ_MODEL = 'llama-3.3-70b-versatile';

const OFF_TOPIC_REPLY =
  "This question isn't about Upper East Dental. Sorry, I can't help with that — feel free to ask me anything about our services, doctors, location, hours, or how to book an appointment.";

/** Pull a clean `gsk_…` Groq key out of an env value (the .env may have
 *  trailing comments/labels like "gsk_xxx Rabi"). */
function cleanKey(raw: string | undefined | null): string | null {
  if (!raw) return null;
  const m = raw.match(/gsk_[A-Za-z0-9_-]+/);
  return m ? m[0] : null;
}

/** Two-key strategy:
 *   - key A (GROQ_API_KEY)    → used to build the knowledge document once.
 *   - key B (GROQ_API_KEY_2)  → used for every per-user chat reply.
 *  Splitting the workload across two keys doubles the effective TPM
 *  budget on Groq's free tier. If only one key is set, the same key is
 *  used for both roles. */
async function readApiKeys(): Promise<{ scrape: string | null; chat: string | null }> {
  let scrape = cleanKey(process.env.GROQ_API_KEY);
  let chat = cleanKey(process.env.GROQ_API_KEY_2) || cleanKey(process.env.GROQ_API_KEY);

  // Fallback: pull from apikey.txt if env not set
  if (!scrape || !chat) {
    try {
      const filePath = path.join(process.cwd(), 'apikey.txt');
      const raw = await fs.readFile(filePath, 'utf-8');
      const all = raw.match(/gsk_[A-Za-z0-9_-]+/g) || [];
      if (!scrape && all[0]) scrape = all[0];
      if (!chat) chat = all[1] || all[0] || null;
    } catch {
      /* file missing — ignore */
    }
  }

  return { scrape, chat };
}

/** Strip HTML to a compact plain-text representation. */
function htmlToText(html: string): string {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/<style[\s\S]*?<\/style>/gi, '')
    .replace(/<noscript[\s\S]*?<\/noscript>/gi, '')
    .replace(/<svg[\s\S]*?<\/svg>/gi, '')
    .replace(/<!--[\s\S]*?-->/g, '')
    .replace(/<(?:br|hr)\s*\/?>/gi, '\n')
    .replace(/<\/(?:p|div|li|h[1-6]|section|article|header|footer|nav|main)>/gi, '\n')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/&nbsp;/g, ' ')
    .replace(/[\t ]+/g, ' ')
    .replace(/\n[\t ]+/g, '\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

type Section = { path: string; text: string };
let cachedSections: Section[] | null = null;
let cachedAt = 0;
const CONTEXT_TTL_MS = 1000 * 60 * 60; // 1 hour

// Per-page text cap + how many top-matching pages to include per request.
// These two numbers are what keep us under Groq's free-tier 12k TPM —
// each chat request now stuffs ~2.5k tokens of context instead of ~7k.
const PER_PAGE_CHAR_CAP = 2200;
const MAX_SECTIONS_PER_REQUEST = 4;

/** Scrape the live site once, cache its plain-text content per page. */
async function getSiteSections(): Promise<Section[]> {
  if (cachedSections && Date.now() - cachedAt < CONTEXT_TTL_MS) {
    return cachedSections;
  }

  const sections: Section[] = [];
  await Promise.allSettled(
    SITE_PAGES.map(async (p) => {
      try {
        const res = await fetch(SITE_URL.replace(/\/$/, '') + p, {
          headers: { 'User-Agent': 'UEDI-Groq-Context/1.0' },
          signal: AbortSignal.timeout(8000),
        });
        if (!res.ok) return;
        const html = await res.text();
        const text = htmlToText(html).slice(0, PER_PAGE_CHAR_CAP);
        if (text) sections.push({ path: p, text });
      } catch {
        /* skip failed pages */
      }
    })
  );

  cachedSections = sections;
  cachedAt = Date.now();
  return sections;
}

/** Pick the N most-relevant scraped pages for a user question using a
 * simple keyword-overlap score. Avoids dumping the whole site into the
 * prompt and keeps us well under Groq's free-tier TPM limit. */
function pickRelevantContext(sections: Section[], question: string): string {
  const STOP = new Set([
    'a','an','and','are','as','at','be','but','by','do','does','did','for','from','has','have',
    'he','her','him','his','how','i','if','in','into','is','it','its','me','my','of','on','or',
    'our','she','so','that','the','their','them','they','this','to','was','we','were','what',
    'when','where','which','who','whom','why','will','with','you','your','yours','about','can',
    'could','should','would','may','might','tell','say','give','need','want','please','thanks',
  ]);
  const tokens = (question.toLowerCase().match(/[a-z0-9]+/g) || [])
    .filter((t) => t.length > 2 && !STOP.has(t));

  // If the question is empty / pure stopwords, just take the first N
  // sections (homepage + about + services) — they're the broad overview.
  if (tokens.length === 0) {
    return sections
      .slice(0, MAX_SECTIONS_PER_REQUEST)
      .map((s) => `### Page: ${s.path}\n${s.text}`)
      .join('\n\n');
  }

  const scored = sections
    .map((s) => {
      const lc = s.text.toLowerCase();
      let score = 0;
      for (const tok of tokens) {
        // count occurrences (cheap substring scan; good enough for ~10 pages)
        let from = 0;
        while ((from = lc.indexOf(tok, from)) !== -1) {
          score += 1;
          from += tok.length;
        }
        // bonus if the path itself matches a keyword (e.g. "services")
        if (s.path.toLowerCase().includes(tok)) score += 3;
      }
      return { section: s, score };
    })
    .sort((a, b) => b.score - a.score);

  // Always include the homepage as a baseline anchor, then up to N-1 best
  // matches. If nothing scored at all, fall back to homepage + about + services.
  const picked: Section[] = [];
  const homepage = sections.find((s) => s.path === '/');
  if (homepage) picked.push(homepage);
  for (const { section, score } of scored) {
    if (picked.length >= MAX_SECTIONS_PER_REQUEST) break;
    if (picked.find((p) => p.path === section.path)) continue;
    if (score > 0 || picked.length < 2) picked.push(section);
  }

  return picked.map((s) => `### Page: ${s.path}\n${s.text}`).join('\n\n');
}

/* ============================================================
   Hard-coded clinic facts + social handles. Always included in the
   system prompt so the model can answer these questions without
   needing to find them inside scraped HTML.
   ============================================================ */
const CLINIC_FACTS = `
PRACTICE NAME : Upper East Dental Innovations (UEDI)
LEAD DOCTOR   : Dr. Sharde Harvey, DDS
ADDRESS       : 121 East 60th Street, Suite 1B, New York, NY 10022
PHONE         : 212.697.1701  (also written as +1 212-697-1701)
EMAIL         : info@uedi.nyc
HOURS         : Monday – Friday, 09:00 AM – 06:00 PM
WEBSITE       : https://uppereastdentalinnovations.vercel.app/

SOCIAL ACCOUNTS (use these EXACT URLs when the user asks for any social handle):
  • YouTube   – "Ask a Dentist with Dr. Harvey" channel
                https://www.youtube.com/@askadentistaskdr.harvey7701
  • Facebook  – https://www.facebook.com/UpperEastDental/
  • Instagram – https://www.instagram.com/uppereastdentalnyc/?hl=en
  • LinkedIn  – https://www.linkedin.com/in/shardeharvey/?_l=en_US
  • X / Twitter – https://x.com/uppereastdental
                  (legacy alias: https://twitter.com/uppereastdental)

If the user asks for any social link, give the FULL URL above and the
account/handle name. Do not paraphrase the URL or make one up.
`.trim();

/* ============================================================
   Knowledge-document builder. Uses the "scrape" Groq key (A) to
   condense the entire scraped site into a tight ~1500-token
   document. Runs ONCE (cached for 1 hour), so per-chat requests
   stay small and well within Groq's free-tier TPM.
   ============================================================ */
let cachedKnowledge: string | null = null;
let knowledgeBuiltAt = 0;
const KNOWLEDGE_TTL_MS = 1000 * 60 * 60; // 1 hour
let knowledgeBuildPromise: Promise<string> | null = null;

async function buildKnowledgeDocument(scrapeKey: string): Promise<string> {
  const sections = await getSiteSections();
  const allText = sections
    .map((s) => `### Page: ${s.path}\n${s.text}`)
    .join('\n\n')
    .slice(0, 32000);

  const summarizationPrompt = `
You are a knowledge-extraction assistant. From the raw website pages
below for Upper East Dental Innovations (a NYC dental practice), extract
a concise but COMPLETE structured knowledge document covering EVERY
factual detail a patient might ask about. Use plain text, no markdown
formatting beyond simple headings and bullet dashes. Aim for ~1500
words. Cover at minimum:

- Practice overview & specialties
- Lead doctor + staff bios (name, role, qualifications, languages)
- Full list of services / treatments, each with a short description
- Pricing or "starting from" notes (if mentioned anywhere on the site)
- Hours of operation, address, phone, email
- Insurance, payments, financing options (Care Credit, Cherry, Zelle, etc.)
- Membership / loyalty program details
- Patient forms & onboarding process
- Notable equipment / technology
- Testimonials/reviews (key quotes if useful)
- Any policies (cancellation, late, COVID-19, etc.)

If a fact is not in the source pages, OMIT it. Never invent details.

RAW SITE PAGES:
${allText}
`.trim();

  const res = await fetch(GROQ_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${scrapeKey}`,
    },
    body: JSON.stringify({
      model: GROQ_MODEL,
      messages: [
        {
          role: 'system',
          content:
            'You compress raw HTML-derived dental-website text into a clean factual reference document. Output plain text only. Never invent facts.',
        },
        { role: 'user', content: summarizationPrompt },
      ],
      temperature: 0.2,
      max_tokens: 2000,
    }),
    signal: AbortSignal.timeout(45000),
  });

  if (!res.ok) {
    const body = await res.text().catch(() => '');
    throw new Error(`Knowledge build failed (HTTP ${res.status}): ${body.slice(0, 200)}`);
  }
  const data = await res.json();
  const text = extractAssistantText(data);
  if (!text) throw new Error('Knowledge build returned empty content.');
  return text;
}

async function getKnowledgeDocument(scrapeKey: string): Promise<string> {
  if (cachedKnowledge && Date.now() - knowledgeBuiltAt < KNOWLEDGE_TTL_MS) {
    return cachedKnowledge;
  }
  // De-duplicate concurrent builds (first user request triggers it; any
  // requests that arrive during the build await the same promise).
  if (!knowledgeBuildPromise) {
    knowledgeBuildPromise = buildKnowledgeDocument(scrapeKey)
      .then((doc) => {
        cachedKnowledge = doc;
        knowledgeBuiltAt = Date.now();
        return doc;
      })
      .catch((err) => {
        knowledgeBuildPromise = null;
        throw err;
      })
      .finally(() => {
        knowledgeBuildPromise = null;
      });
  }
  return knowledgeBuildPromise;
}

function buildSystemPrompt(siteContext: string, userName?: string): string {
  const patientInstructions = userName
    ? `IMPORTANT: The patient's name is ${userName}. Address the patient directly by their name (${userName}) in your replies (e.g., "Certainly, ${userName}..." or "Yes, ${userName}..."), keeping the tone personal, warm, and highly professional.`
    : '';

  return [
    'You are the official AI dental assistant for Upper East Dental Innovations',
    '(UEDI) — a cosmetic and restorative dental practice in New York City led',
    'by Dr. Sharde Harvey. The website below is your ONLY source of truth.',
    '',
    patientInstructions,
    '',
    `Website: ${SITE_URL}`,
    '',
    '═══════════════════════════════════════════════════════════════════════',
    'STRICT TOPIC GUARD — this is the most important instruction.',
    '═══════════════════════════════════════════════════════════════════════',
    'You may ONLY answer questions related to:',
    '  • Upper East Dental Innovations (the practice itself)',
    '  • Its services, treatments, doctors, hours, location, pricing,',
    '    insurance, payments, appointment booking, patient forms',
    '  • General dental health / oral-care topics that a UEDI patient',
    '    would reasonably ask their dentist about',
    '',
    'If the user asks ANY question that is NOT about one of the topics above',
    '(e.g. politics, programming, weather, math, news, other businesses,',
    'general knowledge, jokes, opinions, etc.), respond with EXACTLY this',
    'sentence and nothing else:',
    '',
    `  "${OFF_TOPIC_REPLY}"`,
    '',
    'Do not engage with off-topic prompts, do not joke, do not offer to help',
    'with something else — just return the sentence above verbatim.',
    '═══════════════════════════════════════════════════════════════════════',
    '',
    'Style guide for on-topic answers:',
    '  • Keep replies to 1–3 short sentences (the reply will be spoken aloud).',
    '  • Never identify yourself as an AI / language model.',
    '  • Never start with "Hi" or with a question restated.',
    '  • Always use the practice name "Upper East Dental Innovations".',
    '  • If a fact (price, time, policy) isn\'t in the website content',
    '    below, say: "I would need to check with the clinic — you can call',
    '    212.697.1701" instead of guessing.',
    '  • For booking, tell the user to click the "Book Appointment" button',
    '    on the page to open the booking form.',
    '',
    '═════════════════════ CLINIC FACTS (always reliable) ═════════════════════',
    CLINIC_FACTS,
    '══════════════════════════════════════════════════════════════════════════',
    '',
    '════════════════════ WEBSITE KNOWLEDGE BASE ════════════════════',
    siteContext || '(knowledge base unavailable — answer only generic dental questions; otherwise return the off-topic refusal sentence)',
    '═════════════════════════════════════════════════════════════════',
  ].join('\n');
}

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

/** Extract assistant text from Groq's OpenAI-compatible response. */
function extractAssistantText(data: any): string {
  const m = data?.choices?.[0]?.message?.content;
  if (typeof m === 'string') return m.trim();
  // Some SDKs return an array of content parts
  if (Array.isArray(m)) {
    return m
      .map((p: any) => (typeof p === 'string' ? p : p?.text || ''))
      .join('')
      .trim();
  }
  return '';
}

export async function POST(request: NextRequest) {
  let body: { message?: string; history?: ChatMessage[]; userName?: string } = {};
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON.' }, { status: 400 });
  }

  const message = (body.message || '').trim();
  const userName = (body.userName || '').trim();
  if (!message) {
    return NextResponse.json({ error: 'Empty message.' }, { status: 400 });
  }

  const { scrape: scrapeKey, chat: chatKey } = await readApiKeys();
  if (!scrapeKey && !chatKey) {
    return NextResponse.json(
      {
        error:
          'Groq API key not configured. Set GROQ_API_KEY (+ optional GROQ_API_KEY_2) in .env.local or place a gsk_… key in apikey.txt.',
      },
      { status: 500 }
    );
  }

  /* Build (or reuse) the knowledge document using KEY A. This is the
     one heavyweight summarization call — it runs at most once per hour.
     If KEY A is missing we fall through to per-question retrieval. */
  let siteContext = '';
  try {
    if (scrapeKey) {
      siteContext = await getKnowledgeDocument(scrapeKey);
    } else {
      const sections = await getSiteSections();
      siteContext = pickRelevantContext(sections, message);
    }
  } catch (err: any) {
    console.warn('[api/grok] knowledge build failed, falling back to per-question retrieval:', err?.message || err);
    const sections = await getSiteSections();
    siteContext = pickRelevantContext(sections, message);
  }

  const systemPrompt = buildSystemPrompt(siteContext, userName);

  // Last ~6 turns of history → keep payload small.
  const history = Array.isArray(body.history) ? body.history.slice(-6) : [];
  const messages = [
    { role: 'system', content: systemPrompt },
    ...history.map((m) => ({
      role: m.role === 'assistant' ? 'assistant' : 'user',
      content: String(m.content || ''),
    })),
    { role: 'user', content: message },
  ];

  // KEY B handles the actual chat reply. Falls back to KEY A if KEY B
  // isn't configured (single-key setup).
  const answerKey = chatKey || scrapeKey || '';

  let groqResponse: Response;
  try {
    groqResponse = await fetch(GROQ_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${answerKey}`,
      },
      body: JSON.stringify({
        model: GROQ_MODEL,
        messages,
        // Low temperature so the off-topic guard stays consistent and
        // factual answers don't drift away from the website content.
        temperature: 0.3,
        // Trimmed from 400 → 280 so each request lands well under Groq's
        // free-tier 12k TPM limit even with multi-turn conversations.
        max_tokens: 280,
      }),
      signal: AbortSignal.timeout(30000),
    });
  } catch (err: any) {
    console.error('[api/grok] network error:', err?.message || err);
    return NextResponse.json(
      { error: 'Could not reach Groq. Please try again in a moment.' },
      { status: 502 }
    );
  }

  let data: any = null;
  try {
    data = await groqResponse.json();
  } catch {
    /* non-JSON */
  }

  if (!groqResponse.ok) {
    const msg =
      data?.error?.message ||
      data?.error ||
      `Groq returned HTTP ${groqResponse.status}`;
    console.error('[api/grok] upstream error:', msg);
    return NextResponse.json({ error: String(msg) }, { status: groqResponse.status });
  }

  const text = extractAssistantText(data);
  if (!text) {
    return NextResponse.json(
      { error: 'Groq returned an empty response.' },
      { status: 502 }
    );
  }

  return NextResponse.json({ text });
}
