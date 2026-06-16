import { NextRequest, NextResponse } from 'next/server';
import { formatLongDate, getAdditionalClinicNotificationEmails, getLogoAttachment, getPrimaryClinicEmail, getTransporter } from '@/lib/server/clinic-utils';
import { normalizeAppointmentDateKey, validateAppointmentSlot } from '@/lib/appointment-schedule';
import { getBookedTimes, releaseSlot, reserveSlot } from '@/lib/server/booking-slot-store';

export const runtime = 'nodejs';

export async function GET(request: NextRequest) {
  const dateKey = normalizeAppointmentDateKey(request.nextUrl.searchParams.get('date') || '');
  if (!dateKey) {
    return NextResponse.json({ error: 'A valid date is required.' }, { status: 400 });
  }
  return NextResponse.json({ date: dateKey, bookedTimes: await getBookedTimes(dateKey) });
}

export async function POST(request: NextRequest) {
  let reservedSlotKey = '';
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: 'Invalid JSON in request body.' },
      { status: 400 }
    );
  }

  try {
    const firstName = String(body.firstName || '').trim();
    const lastName = String(body.lastName || '').trim();
    const dob = String(body.dob || '').trim();
    const phone = String(body.phone || '').trim();
    const email = String(body.email || '').trim();
    const sex = String(body.sex || '').trim();
    const reason = String(body.reason || '').trim();
    const date = String(body.date || '').trim();
    const time = String(body.time || '').trim();
    if (!firstName || !email || !date || !time) {
      return NextResponse.json({ error: 'Required fields are missing.' }, { status: 400 });
    }

    const slotValidation = validateAppointmentSlot(String(date), String(time));
    if (!slotValidation.ok) {
      return NextResponse.json({ error: slotValidation.reason }, { status: 400 });
    }

    const patientName = [firstName, lastName].filter(Boolean).join(' ');
    const reserved = await reserveSlot({
      slotKey: slotValidation.slotKey,
      date: slotValidation.dateKey,
      time: slotValidation.time,
      createdAt: new Date().toISOString(),
    });
    if (!reserved) {
      return NextResponse.json(
        { error: 'Sorry, that appointment time is already booked. Please select another available time.' },
        { status: 409 }
      );
    }
    reservedSlotKey = slotValidation.slotKey;

    const formattedDate = formatLongDate(slotValidation.dateKey);
    const appointmentTime = slotValidation.time;
    const clinicEmail = getPrimaryClinicEmail();
    const additionalNotificationEmails = getAdditionalClinicNotificationEmails();

    const patientHtml = `
      <!DOCTYPE html><html><head><meta charset="utf-8"><title>Appointment Confirmed</title>
      <style>body{font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;background-color:#f7f9fa;color:#2e3e4a;margin:0;padding:0;-webkit-font-smoothing:antialiased}.container{max-width:600px;margin:40px auto;background-color:#fff;border-radius:16px;overflow:hidden;box-shadow:0 10px 30px rgba(0,0,0,.05);border:1px solid #eef1f2}.header{background:linear-gradient(135deg,#1d2c36 0%,#165369 100%);padding:35px 20px;text-align:center}.header img{max-width:200px;height:auto}.content{padding:40px 35px}.welcome{font-size:24px;font-weight:700;color:#1d2c36;margin-top:0;margin-bottom:12px}.intro{font-size:16px;line-height:1.6;color:#5c6c75;margin-bottom:28px}.card{background-color:#f3f7f9;border-radius:12px;padding:24px;border-left:5px solid #4CB85C;margin-bottom:28px}.card-row{display:flex;margin-bottom:14px}.card-row:last-child{margin-bottom:0}.card-label{width:120px;font-weight:700;color:#165369;font-size:14px;text-transform:uppercase;letter-spacing:.5px}.card-value{flex:1;font-size:15px;color:#2e3e4a;font-weight:600}.clinic-info{font-size:14px;color:#7d8a93;line-height:1.5;margin-top:15px;border-top:1px dashed #dbe3e6;padding-top:15px}.footer{background-color:#f7f9fa;padding:25px;text-align:center;font-size:13px;color:#9aa7b0;border-top:1px solid #eef1f2}.footer a{color:#165369;text-decoration:none;font-weight:bold}</style></head>
      <body><div class="container"><div class="header"><img src="cid:logo" alt="Upper East Dental Innovations"></div><div class="content">
      <h1 class="welcome">Appointment Confirmed!</h1>
      <p class="intro">Dear ${firstName}, your appointment at Upper East Dental Innovations has been successfully scheduled. We look forward to providing you with exceptional dental care.</p>
      <div class="card">
      <div class="card-row"><div class="card-label">Date</div><div class="card-value">${formattedDate}</div></div>
      <div class="card-row"><div class="card-label">Time Slot</div><div class="card-value">${appointmentTime}</div></div>
      <div class="card-row"><div class="card-label">Provider</div><div class="card-value">Dr. Harvey</div></div>
      <div class="card-row"><div class="card-label">Reason</div><div class="card-value">${reason}</div></div>
      </div>
      <div class="clinic-info"><strong>Location Details:</strong><br>Upper East Dental Innovations<br>121 East 60th Street, Suite 1B (Between Park & Lexington)<br>New York, NY 10022<br>Phone: +1 (212) 697-1701 | Email: info@uedi.nyc</div>
      <p class="intro" style="margin-top:20px;font-size:14px;"><em>If you need to reschedule or cancel your appointment, please contact us at least 24 hours in advance.</em></p>
      </div><div class="footer">© ${new Date().getFullYear()} Upper East Dental Innovations. All rights reserved.<br>Visit us at <a href="https://uedi.nyc">uedi.nyc</a></div></div></body></html>`;

    const clinicHtml = `
      <!DOCTYPE html><html><head><meta charset="utf-8"><title>New Appointment Booked</title>
      <style>body{font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;background-color:#f7f9fa;color:#2e3e4a;margin:0;padding:0}.container{max-width:600px;margin:40px auto;background-color:#fff;border-radius:16px;overflow:hidden;box-shadow:0 10px 30px rgba(0,0,0,.05);border:1px solid #eef1f2}.header{background:#1d2c36;padding:25px 20px;text-align:center}.header img{max-width:180px;height:auto}.content{padding:40px 35px}.title{font-size:22px;font-weight:700;color:#1d2c36;margin-top:0;margin-bottom:20px;border-bottom:2px solid #eef1f2;padding-bottom:12px}.grid{width:100%;border-collapse:collapse;margin-bottom:25px}.grid th{background-color:#f3f7f9;text-align:left;padding:12px 16px;font-size:13px;font-weight:700;color:#165369;text-transform:uppercase;letter-spacing:.5px;border-bottom:1px solid #eef1f2}.grid td{padding:14px 16px;font-size:15px;color:#2e3e4a;border-bottom:1px solid #eef1f2}.grid tr:last-child td{border-bottom:none}.footer{background-color:#f7f9fa;padding:20px;text-align:center;font-size:13px;color:#9aa7b0;border-top:1px solid #eef1f2}</style></head>
      <body><div class="container"><div class="header"><img src="cid:logo" alt="Upper East Dental Innovations"></div><div class="content"><h1 class="title">New Appointment Request</h1>
      <p style="font-size:15px;color:#5c6c75;margin-bottom:25px;">A new appointment has been scheduled through the website. Here are the details:</p>
      <table class="grid"><thead><tr><th colspan="2">Patient Information</th></tr></thead><tbody>
      <tr><td style="width:140px;font-weight:bold;">Full Name</td><td>${patientName}</td></tr>
      <tr><td style="font-weight:bold;">Date of Birth</td><td>${dob || 'Not provided'}</td></tr>
      <tr><td style="font-weight:bold;">Sex</td><td>${sex || 'Not provided'}</td></tr>
      <tr><td style="font-weight:bold;">Phone</td><td>${phone}</td></tr>
      <tr><td style="font-weight:bold;">Email</td><td><a href="mailto:${email}">${email}</a></td></tr>
      <tr><td style="font-weight:bold;">Reason</td><td>${reason}</td></tr>
      </tbody></table>
      <table class="grid"><thead><tr><th colspan="2">Schedule Details</th></tr></thead><tbody><tr><td style="width:140px;font-weight:bold;">Requested Slot</td><td style="font-weight:bold;color:#4CB85C;">${formattedDate} at ${appointmentTime}</td></tr></tbody></table>
      </div><div class="footer">Website Booking Engine Notification</div></div></body></html>`;

    const transporter = getTransporter();
    const logoAttachment = getLogoAttachment(true);

    await transporter.sendMail({
      from: `"Upper East Dental Innovations" <${process.env.SMTP_USER || 'info@uedi.nyc'}>`,
      to: email,
      replyTo: clinicEmail,
      subject: 'Your Appointment is Confirmed! - Upper East Dental Innovations',
      text: `Dear ${firstName}, your appointment has been scheduled for ${formattedDate} at ${appointmentTime} for ${reason}. We look forward to seeing you!`,
      html: patientHtml,
      attachments: logoAttachment,
    });

    await transporter.sendMail({
      from: `"UEDI Web Engine" <${process.env.SMTP_USER || 'info@uedi.nyc'}>`,
      to: clinicEmail,
      replyTo: email,
      subject: `New Appt: ${patientName} - ${formattedDate} @ ${appointmentTime}`,
      text: `New appointment request from ${patientName} (${phone}, ${email}) on ${formattedDate} at ${appointmentTime} for ${reason}.`,
      html: clinicHtml,
      attachments: logoAttachment,
    });

    for (const notifyEmail of additionalNotificationEmails) {
      await transporter.sendMail({
        from: `"UEDI Web Engine" <${process.env.SMTP_USER || 'info@uedi.nyc'}>`,
        to: notifyEmail,
        replyTo: email,
        subject: `New Appt: ${patientName} - ${formattedDate} @ ${appointmentTime}`,
        text: `New appointment request from ${patientName} (${phone}, ${email}) on ${formattedDate} at ${appointmentTime} for ${reason}.`,
        html: clinicHtml,
        attachments: logoAttachment,
      });
    }

    return NextResponse.json({ success: true, message: 'Emails sent successfully.' });
  } catch (error) {
    if (reservedSlotKey) {
      await releaseSlot(reservedSlotKey);
    }
    console.error('❌ [API] Error processing booking emails:', error);
    return NextResponse.json({ error: 'Failed to process booking emails.' }, { status: 500 });
  }
}
