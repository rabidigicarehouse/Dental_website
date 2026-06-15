export const CLINIC_TIME_ZONE = 'America/New_York';
export const CLINIC_OPEN_MINUTES = 9 * 60;
export const CLINIC_CLOSE_MINUTES = 18 * 60;
export const LATEST_APPOINTMENT_START_MINUTES = 17 * 60 + 30;

export type SlotValidation =
  | { ok: true; dateKey: string; time: string; slotKey: string }
  | { ok: false; reason: string };

function clinicDateParts(date: Date) {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: CLINIC_TIME_ZONE,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23',
  }).formatToParts(date);
  const value = (type: Intl.DateTimeFormatPartTypes) =>
    Number(parts.find((part) => part.type === type)?.value || 0);

  return {
    year: value('year'),
    month: value('month'),
    day: value('day'),
    hour: value('hour'),
    minute: value('minute'),
  };
}

export function getClinicTodayKey(now = new Date()) {
  const parts = clinicDateParts(now);
  return `${parts.year}-${String(parts.month).padStart(2, '0')}-${String(parts.day).padStart(2, '0')}`;
}

export function getClinicCurrentMinutes(now = new Date()) {
  const parts = clinicDateParts(now);
  return parts.hour * 60 + parts.minute;
}

export function normalizeAppointmentDateKey(value: string) {
  const trimmed = value.trim();
  const isoMatch = trimmed.match(/^(\d{4})-(\d{2})-(\d{2})/);
  if (isoMatch) {
    return `${isoMatch[1]}-${isoMatch[2]}-${isoMatch[3]}`;
  }

  const parsed = new Date(trimmed);
  if (Number.isNaN(parsed.getTime())) return null;
  const year = parsed.getFullYear();
  const month = parsed.getMonth() + 1;
  const day = parsed.getDate();
  return `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
}

export function parseAppointmentTime(value: string) {
  const match = value.trim().match(/^(\d{1,2})(?::(\d{2}))?\s*(am|pm)?$/i);
  if (!match) return null;

  let hour = Number(match[1]);
  const minute = match[2] ? Number(match[2]) : 0;
  const suffix = (match[3] || '').toLowerCase();

  if (suffix) {
    if (hour < 1 || hour > 12) return null;
    if (suffix === 'pm' && hour < 12) hour += 12;
    if (suffix === 'am' && hour === 12) hour = 0;
  }

  if (hour < 0 || hour > 23 || minute < 0 || minute > 59) return null;

  const totalMinutes = hour * 60 + minute;
  const displayHour = ((hour + 11) % 12) + 1;
  return {
    totalMinutes,
    display: `${displayHour}:${String(minute).padStart(2, '0')} ${hour >= 12 ? 'PM' : 'AM'}`,
  };
}

export function validateAppointmentSlot(dateValue: string, timeValue: string, now = new Date()): SlotValidation {
  const dateKey = normalizeAppointmentDateKey(dateValue);
  if (!dateKey) {
    return { ok: false, reason: 'I could not read that date. Please choose a valid appointment date.' };
  }

  const clinicToday = getClinicTodayKey(now);
  if (dateKey < clinicToday) {
    return { ok: false, reason: 'That date has already passed. Please choose a current or future weekday.' };
  }

  const dateAtNoonUtc = new Date(`${dateKey}T12:00:00Z`);
  const weekday = dateAtNoonUtc.getUTCDay();
  if (weekday === 0 || weekday === 6) {
    return { ok: false, reason: 'The clinic is open Monday through Friday. Please choose a weekday.' };
  }

  const parsedTime = parseAppointmentTime(timeValue);
  if (!parsedTime) {
    return { ok: false, reason: 'I could not read that time. Could you say it again?' };
  }

  if (
    parsedTime.totalMinutes < CLINIC_OPEN_MINUTES ||
    parsedTime.totalMinutes > LATEST_APPOINTMENT_START_MINUTES
  ) {
    return {
      ok: false,
      reason: 'Appointments are available Monday through Friday from 9:00 AM, with the latest start time at 5:30 PM.',
    };
  }

  if (dateKey === clinicToday) {
    const currentMinutes = getClinicCurrentMinutes(now);
    if (parsedTime.totalMinutes <= currentMinutes) {
      return { ok: false, reason: 'That time has already passed today. Please choose a later available time.' };
    }
  }

  return {
    ok: true,
    dateKey,
    time: parsedTime.display,
    slotKey: `${dateKey}|${parsedTime.display}`,
  };
}
