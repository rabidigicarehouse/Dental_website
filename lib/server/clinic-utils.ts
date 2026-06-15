import fs from 'fs';
import path from 'path';
import nodemailer from 'nodemailer';

type MockMailOptions = {
  from?: unknown;
  to?: unknown;
  subject?: unknown;
  text?: unknown;
};

const LOGO_DARK_PATH = path.join(process.cwd(), 'public', 'main logo dark.png');
const LOGO_LIGHT_PATH = path.join(process.cwd(), 'public', 'main logo.png');

export function formatLongDate(dateStr: string) {
  try {
    const d = new Date(/^\d{4}-\d{2}-\d{2}$/.test(dateStr) ? `${dateStr}T12:00:00` : dateStr);
    if (Number.isNaN(d.getTime())) return dateStr;
    return d.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  } catch {
    return dateStr;
  }
}

export function escapeHtml(value: unknown) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

export function getFrontendBaseUrl() {
  return (
    process.env.FRONTEND_URL ||
    process.env.NEXT_PUBLIC_FRONTEND_URL ||
    process.env.SITE_URL ||
    'http://localhost:3000'
  ).replace(/\/+$/, '');
}

export function getClinicNotificationRecipients() {
  const primary = process.env.CLINIC_EMAIL || 'info@uedi.nyc';
  const configured = process.env.CLINIC_NOTIFICATION_EMAILS || primary;
  const extras = ['Ibrahim@digicarehouse.com'];

  return Array.from(
    new Set(
      [...configured.split(','), ...extras]
        .map((value) => value.trim())
        .filter(Boolean)
    )
  ).join(', ');
}

export function getPrimaryClinicEmail() {
  return (process.env.CLINIC_EMAIL || 'info@uedi.nyc').trim();
}

export function getAdditionalClinicNotificationEmails() {
  const primary = getPrimaryClinicEmail().toLowerCase();
  const configured = getClinicNotificationRecipients();

  return Array.from(
    new Set(
      configured
        .split(',')
        .map((value) => value.trim())
        .filter(Boolean)
        .filter((value) => value.toLowerCase() !== primary)
    )
  );
}

export function getSquareBaseUrl() {
  return process.env.SQUARE_ENVIRONMENT === 'production'
    ? 'https://connect.squareup.com'
    : 'https://connect.squareupsandbox.com';
}

export function getLogoAttachment(useLight = false) {
  const filePath = useLight ? LOGO_LIGHT_PATH : LOGO_DARK_PATH;
  if (fs.existsSync(filePath)) {
    return [
      {
        filename: useLight ? 'main logo.png' : 'main logo dark.png',
        path: filePath,
        cid: 'logo',
      },
    ];
  }
  return [];
}

export function getTransporter() {
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!user || !pass) {
    console.warn('\x1b[33m%s\x1b[0m', 'WARNING: SMTP_USER or SMTP_PASS not set. Emails will be logged to console in Mock Mode.');
    return {
      sendMail: async (mailOptions: MockMailOptions) => {
        console.log('\n================== MOCK EMAIL SENT ==================');
        console.log(`From: ${mailOptions.from}`);
        console.log(`To: ${mailOptions.to}`);
        console.log(`Subject: ${mailOptions.subject}`);
        console.log(`Body Snippet:\n${mailOptions.text || '(HTML Content)'}`);
        console.log('=====================================================\n');
        return { messageId: 'mock-id-12345' };
      },
    };
  }

  return nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.SMTP_PORT || '587', 10),
    secure: process.env.SMTP_PORT === '465',
    auth: { user, pass },
  });
}
