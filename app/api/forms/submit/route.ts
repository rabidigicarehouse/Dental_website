import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { escapeHtml, getTransporter } from '@/lib/server/clinic-utils';

export const runtime = 'nodejs';

const LOGO_LIGHT_PATH = path.join(process.cwd(), 'public', 'main logo.png');

async function buildFormPdf({
  formTitle,
  patientName,
  patientEmail,
  fields,
}: {
  formTitle: string;
  patientName?: string;
  patientEmail?: string;
  fields: Array<{ label: string; value: string }>;
}) {
  const PDFDocument = (0, eval)('require')('pdfkit');

  return new Promise<Buffer>((resolve, reject) => {
    try {
      const doc = new PDFDocument({ size: 'A4', margin: 50 });
      const chunks: Buffer[] = [];
      doc.on('data', (c: Buffer) => chunks.push(c));
      doc.on('end', () => resolve(Buffer.concat(chunks)));
      doc.on('error', reject);

      doc.rect(0, 0, doc.page.width, 110).fill('#165369');
      try {
        if (fs.existsSync(LOGO_LIGHT_PATH)) {
          doc.image(LOGO_LIGHT_PATH, 50, 32, { width: 140 });
        }
      } catch {}
      doc.fillColor('#ffffff').font('Helvetica-Bold').fontSize(18)
        .text(formTitle, 50, 75, { align: 'right', width: doc.page.width - 100 });
      doc.fillColor('#000000').moveDown(3);

      const summaryY = 130;
      doc.fillColor('#1d2c36').font('Helvetica-Bold').fontSize(11)
        .text(`Submitted: ${new Date().toLocaleString('en-US', { dateStyle: 'long', timeStyle: 'short' })}`, 50, summaryY);
      if (patientName) doc.text(`Patient: ${patientName}`, 50, summaryY + 16);
      if (patientEmail) doc.text(`Email: ${patientEmail}`, 50, summaryY + 32);

      const startY = summaryY + (patientName || patientEmail ? 60 : 30);
      doc.moveTo(50, startY).lineTo(doc.page.width - 50, startY).strokeColor('#cfd8dc').lineWidth(1).stroke();

      let y = startY + 18;
      const colLabelX = 50;
      const colValueX = 220;
      const valueWidth = doc.page.width - colValueX - 50;

      doc.font('Helvetica').fontSize(10);
      fields.forEach((f) => {
        const label = String(f.label || '').slice(0, 200);
        const value = String(f.value || '').slice(0, 1000);
        const labelHeight = doc.heightOfString(label, { width: colValueX - colLabelX - 10 });
        const valueHeight = doc.heightOfString(value || '—', { width: valueWidth });
        const rowHeight = Math.max(labelHeight, valueHeight) + 10;

        if (y + rowHeight > doc.page.height - 70) {
          doc.addPage();
          y = 50;
        }

        doc.fillColor('#5c6c75').font('Helvetica-Bold').fontSize(9.5)
          .text(label, colLabelX, y, { width: colValueX - colLabelX - 10 });
        doc.fillColor('#1d2c36').font('Helvetica').fontSize(10)
          .text(value || '—', colValueX, y, { width: valueWidth });
        y += rowHeight;
        doc.moveTo(50, y - 4).lineTo(doc.page.width - 50, y - 4).strokeColor('#eef2f5').lineWidth(0.5).stroke();
      });

      const footY = doc.page.height - 50;
      doc.fontSize(8).fillColor('#9aa7b0').text(
        'Upper East Dental Innovations · 121 East 60th Street, Suite 1B, New York, NY 10022 · (212) 697-1701',
        50,
        footY,
        { width: doc.page.width - 100, align: 'center' }
      );

      doc.end();
    } catch (error) {
      reject(error);
    }
  });
}

export async function POST(request: NextRequest) {
  let body: any;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON in request body.' }, { status: 400 });
  }

  try {
    const { formType, patientName, patientEmail, fields, renderedPdfBase64 } = body || {};
    if (!formType || !Array.isArray(fields) || fields.length === 0) {
      return NextResponse.json({ error: 'Missing formType or fields.' }, { status: 400 });
    }

    const missing = fields.filter((f: any) => !f.value || String(f.value).trim() === '');
    if (missing.length > 0) {
      return NextResponse.json({
        error: 'All fields are required.',
        missingLabels: missing.map((f: any) => f.label || '(unnamed)'),
      }, { status: 400 });
    }

    const FORM_TITLES: Record<string, string> = {
      'patient-form': 'New Patient Form',
      'medical-history': 'Medical History Form',
      covid19: 'Covid-19 Screening Form',
      'patient-screening': 'Patient Screening Form',
    };
    const formTitle = FORM_TITLES[formType] || 'Patient Form';
    const clinicEmail = process.env.CLINIC_EMAIL || 'info@uedi.nyc';
    const fromAddress = `"UEDI Patient Forms" <${process.env.SMTP_USER || 'info@uedi.nyc'}>`;

    let pdfBuffer: Buffer | null = null;
    if (typeof renderedPdfBase64 === 'string' && renderedPdfBase64.trim()) {
      try {
        pdfBuffer = Buffer.from(renderedPdfBase64, 'base64');
      } catch (error: any) {
        console.warn('[API] Rendered PDF attachment invalid, falling back to server PDF:', error?.message);
      }
    }
    if (!pdfBuffer) {
      try {
        pdfBuffer = await buildFormPdf({ formTitle, patientName, patientEmail, fields });
      } catch (error: any) {
        console.warn('[API] PDF generation skipped:', error?.message);
      }
    }

    const textLines = [
      `${formTitle}`,
      `Submitted: ${new Date().toLocaleString()}`,
      patientName ? `Patient: ${patientName}` : '',
      patientEmail ? `Email: ${patientEmail}` : '',
      '',
      '------ Submitted Fields ------',
      ...fields.map((f: any) => `${f.label}: ${f.value}`),
    ].filter(Boolean).join('\n');

    const rowsHtml = fields.map((f: any) => `
      <tr>
        <td style="padding:8px 14px;border-bottom:1px solid #eef2f5;font-weight:600;color:#5c6c75;font-size:13px;width:34%;vertical-align:top;">${escapeHtml(f.label)}</td>
        <td style="padding:8px 14px;border-bottom:1px solid #eef2f5;color:#1d2c36;font-size:14px;vertical-align:top;">${escapeHtml(String(f.value)).replace(/\n/g, '<br>')}</td>
      </tr>`).join('');

    const clinicHtml = `
      <div style="font-family:Helvetica,Arial,sans-serif;background:#f7f9fa;padding:32px;color:#2e3e4a;">
        <div style="max-width:720px;margin:0 auto;background:#fff;border-radius:14px;overflow:hidden;border:1px solid #eef1f2;box-shadow:0 10px 30px rgba(0,0,0,.06);">
          <div style="background:linear-gradient(135deg,#1d2c36,#165369);color:#fff;padding:24px 28px;">
            <div style="font-size:11px;letter-spacing:2px;opacity:.7;text-transform:uppercase;">New Submission</div>
            <h2 style="margin:6px 0 0;font-size:22px;">${formTitle}</h2>
          </div>
          <div style="padding:22px 28px;">
            <p style="margin:0 0 6px;font-size:14px;"><strong>Submitted:</strong> ${new Date().toLocaleString()}</p>
            ${patientName ? `<p style="margin:0 0 6px;font-size:14px;"><strong>Patient:</strong> ${escapeHtml(patientName)}</p>` : ''}
            ${patientEmail ? `<p style="margin:0 0 14px;font-size:14px;"><strong>Email:</strong> ${escapeHtml(patientEmail)}</p>` : ''}
            <table style="width:100%;border-collapse:collapse;margin-top:8px;border:1px solid #eef2f5;border-radius:8px;overflow:hidden;">${rowsHtml}</table>
            ${pdfBuffer ? `<p style="margin:18px 0 0;font-size:13px;color:#5c6c75;">The complete form is attached as a PDF.</p>` : ''}
          </div>
        </div>
      </div>`;

    const transporter = getTransporter();
    await transporter.sendMail({
      from: fromAddress,
      to: clinicEmail,
      subject: `[${formTitle}] ${patientName || 'New submission'}`,
      text: textLines,
      html: clinicHtml,
      attachments: pdfBuffer
        ? [{ filename: `${formType}-${Date.now()}.pdf`, content: pdfBuffer, contentType: 'application/pdf' }]
        : [],
    });

    if (patientEmail && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(patientEmail)) {
      const ackHtml = `
        <div style="font-family:Helvetica,Arial,sans-serif;background:#f7f9fa;padding:32px;color:#2e3e4a;">
          <div style="max-width:600px;margin:0 auto;background:#fff;border-radius:14px;overflow:hidden;border:1px solid #eef1f2;">
            <div style="background:linear-gradient(135deg,#1d2c36,#165369);color:#fff;padding:28px;text-align:center;">
              <h2 style="margin:0;font-size:22px;">Thank you, ${escapeHtml(patientName || 'Patient')}</h2>
            </div>
            <div style="padding:26px 28px;line-height:1.65;font-size:15px;">
              <p style="margin:0 0 14px;">We have received your <strong>${formTitle}</strong> submission. Our team will review it and follow up with you shortly.</p>
              <p style="margin:0 0 18px;">If you need to update any details before your appointment, just reply to this email or call us at <strong>(212) 697-1701</strong>.</p>
              <p style="margin:0;color:#5c6c75;font-size:13px;">— Upper East Dental Innovations</p>
            </div>
          </div>
        </div>`;

      await transporter.sendMail({
        from: fromAddress,
        to: patientEmail,
        subject: `We received your ${formTitle} – Upper East Dental Innovations`,
        text: `Hello ${patientName || 'Patient'},\n\nWe have received your ${formTitle} submission. We will follow up with you shortly.\n\n— Upper East Dental Innovations`,
        html: ackHtml,
      });
    }

    return NextResponse.json({ success: true, message: 'Form submitted successfully.' });
  } catch (error) {
    console.error('❌ [API] Error processing form submission:', error);
    return NextResponse.json({ error: 'Failed to send form. Please try again.' }, { status: 500 });
  }
}
