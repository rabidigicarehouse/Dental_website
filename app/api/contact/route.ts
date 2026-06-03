import { NextRequest, NextResponse } from 'next/server';
import { getLogoAttachment, getTransporter } from '@/lib/server/clinic-utils';

export const runtime = 'nodejs';

export async function POST(request: NextRequest) {
  let body: any;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: 'Invalid JSON in request body.' },
      { status: 400 }
    );
  }

  try {
    const { name, email, phone, message } = body || {};
    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Required fields are missing.' }, { status: 400 });
    }

    const clinicEmail = process.env.CLINIC_EMAIL || 'info@uedi.nyc';
    const contactHtml = `<!DOCTYPE html><html><head><meta charset="utf-8"><title>New Website Inquiry</title><style>body{font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;background-color:#f7f9fa;color:#2e3e4a;margin:0;padding:0}.container{max-width:600px;margin:40px auto;background-color:#fff;border-radius:16px;overflow:hidden;box-shadow:0 10px 30px rgba(0,0,0,.05);border:1px solid #eef1f2}.header{background:#1d2c36;padding:25px 20px;text-align:center}.header img{max-width:180px;height:auto}.content{padding:40px 35px}.title{font-size:22px;font-weight:700;color:#1d2c36;margin-top:0;margin-bottom:20px;border-bottom:2px solid #eef1f2;padding-bottom:12px}.info-block{margin-bottom:20px}.info-label{font-size:13px;font-weight:700;color:#165369;text-transform:uppercase;letter-spacing:.5px;margin-bottom:4px}.info-value{font-size:15px;color:#2e3e4a;font-weight:600}.msg-card{background-color:#f3f7f9;border-radius:8px;padding:18px;border-left:4px solid #165369;margin-top:20px}.msg-text{font-size:15px;color:#2e3e4a;line-height:1.6;white-space:pre-wrap;margin:0}.footer{background-color:#f7f9fa;padding:20px;text-align:center;font-size:13px;color:#9aa7b0;border-top:1px solid #eef1f2}</style></head><body><div class="container"><div class="header"><img src="cid:logo" alt="Upper East Dental Innovations"></div><div class="content"><h1 class="title">New Website Inquiry</h1><div class="info-block"><div class="info-label">Name</div><div class="info-value">${name}</div></div><div class="info-block"><div class="info-label">Email</div><div class="info-value"><a href="mailto:${email}">${email}</a></div></div><div class="info-block"><div class="info-label">Phone</div><div class="info-value">${phone || 'Not provided'}</div></div><div class="info-block" style="margin-bottom:0;"><div class="info-label">Message</div><div class="msg-card"><p class="msg-text">${message}</p></div></div></div><div class="footer">Website Contact Form Submission</div></div></body></html>`;
    const ackHtml = `<!DOCTYPE html><html><head><meta charset="utf-8"><title>Thank you for contacting us</title><style>body{font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;background-color:#f7f9fa;color:#2e3e4a;margin:0;padding:0}.container{max-width:600px;margin:40px auto;background-color:#fff;border-radius:16px;overflow:hidden;box-shadow:0 10px 30px rgba(0,0,0,.05);border:1px solid #eef1f2}.header{background:linear-gradient(135deg,#1d2c36 0%,#165369 100%);padding:35px 20px;text-align:center}.header img{max-width:200px;height:auto}.content{padding:40px 35px}.welcome{font-size:24px;font-weight:700;color:#1d2c36;margin-top:0;margin-bottom:12px}.intro{font-size:16px;line-height:1.6;color:#5c6c75;margin-bottom:28px}.footer{background-color:#f7f9fa;padding:25px;text-align:center;font-size:13px;color:#9aa7b0;border-top:1px solid #eef1f2}.footer a{color:#165369;text-decoration:none;font-weight:bold}</style></head><body><div class="container"><div class="header"><img src="cid:logo" alt="Upper East Dental Innovations"></div><div class="content"><h1 class="welcome">Thank You for Reaching Out!</h1><p class="intro">Dear ${name},<br><br>We have received your message sent via our website contact form. Our team is reviewing your inquiry and we will get back to you as soon as possible.</p><p class="intro">If you need immediate assistance or would like to speak with our office directly, please call us at <strong>+1 (212) 697-1701</strong>.</p><p class="intro">Best regards,<br><strong>Upper East Dental Innovations Team</strong></p></div><div class="footer">© ${new Date().getFullYear()} Upper East Dental Innovations. All rights reserved.<br>Visit us at <a href="https://uedi.nyc">uedi.nyc</a></div></div></body></html>`;

    const transporter = getTransporter();
    const logoAttachment = getLogoAttachment(true);

    await transporter.sendMail({
      from: `"UEDI Contact Form" <${process.env.SMTP_USER || 'info@uedi.nyc'}>`,
      to: clinicEmail,
      subject: `New Web Inquiry: ${name}`,
      text: `New message from ${name} (${phone || 'N/A'}, ${email}):\n\n${message}`,
      html: contactHtml,
      attachments: logoAttachment,
    });

    await transporter.sendMail({
      from: `"Upper East Dental Innovations" <${process.env.SMTP_USER || 'info@uedi.nyc'}>`,
      to: email,
      subject: 'We Received Your Message - Upper East Dental Innovations',
      text: `Hello ${name}, thank you for contacting Upper East Dental Innovations. We have received your message and will get back to you shortly.`,
      html: ackHtml,
      attachments: logoAttachment,
    });

    return NextResponse.json({ success: true, message: 'Messages sent successfully.' });
  } catch (error) {
    console.error('❌ [API] Error processing contact emails:', error);
    return NextResponse.json({ error: 'Failed to process contact message.' }, { status: 500 });
  }
}
