'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import {
  BOOKING_SERVICES,
  BOOKING_STAFF,
  BUSINESS_NAME,
  SQUARE_BOOK_URL,
  getBookingItem,
  type BookingService,
} from '@/lib/booking-services';

type View = 'list' | 'detail' | 'schedule';

const DAY_LABELS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'] as const;

function formatLongDate(d: Date): string {
  return d.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
}

function formatMonthYear(d: Date): string {
  return d.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
}

function isSameDay(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

function startOfDay(d: Date): Date {
  const x = new Date(d);
  x.setHours(0, 0, 0, 0);
  return x;
}

function addDays(d: Date, n: number): Date {
  const x = new Date(d);
  x.setDate(x.getDate() + n);
  return x;
}

function isClosedDay(d: Date): boolean {
  const day = d.getDay();
  return day === 0 || day === 6;
}

function buildTimeSlots(date: Date): { morning: string[]; afternoon: string[]; evening: string[] } {
  if (isClosedDay(date)) {
    return { morning: [], afternoon: [], evening: [] };
  }

  const morning = ['9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM'];
  const afternoon = ['12:00 PM', '12:30 PM', '1:00 PM', '1:30 PM', '2:00 PM', '2:30 PM', '3:00 PM', '3:30 PM', '4:00 PM', '4:30 PM'];
  const evening = ['5:00 PM', '5:30 PM', '6:00 PM'];

  const today = startOfDay(new Date());
  const selected = startOfDay(date);
  if (selected < today) {
    return { morning: [], afternoon: [], evening: [] };
  }

  if (!isSameDay(selected, today)) {
    return { morning, afternoon, evening };
  }

  const now = new Date();
  const filterPast = (slots: string[]) =>
    slots.filter((label) => {
      const match = label.match(/^(\d+):(\d+)\s*(AM|PM)$/i);
      if (!match) return true;
      let h = parseInt(match[1], 10);
      const m = parseInt(match[2], 10);
      const ap = match[3].toUpperCase();
      if (ap === 'PM' && h !== 12) h += 12;
      if (ap === 'AM' && h === 12) h = 0;
      const slotDate = new Date(date);
      slotDate.setHours(h, m, 0, 0);
      return slotDate > now;
    });

  return {
    morning: filterPast(morning),
    afternoon: filterPast(afternoon),
    evening: filterPast(evening),
  };
}

function ServiceListCard({
  service,
  onBook,
}: {
  service: BookingService;
  onBook: () => void;
}) {
  const [expanded, setExpanded] = useState(false);
  const isLong = service.shortDescription.length > 120;

  return (
    <article className="sq-service-card">
      <div className="sq-service-card__body">
        <h3 className="sq-service-card__title">{service.title}</h3>
        <p className={`sq-service-card__desc${service.id === 'dr-harvey' ? ' doctor-designation-nowrap' : ''}`}>
          {isLong && !expanded
            ? `${service.shortDescription.slice(0, 120)}…`
            : service.shortDescription}
          {isLong && (
            <button
              type="button"
              className="sq-link sq-service-card__more"
              onClick={() => setExpanded((v) => !v)}
            >
              {expanded ? ' Less' : ' More'}
            </button>
          )}
        </p>
        <p className="sq-service-card__meta">
          {service.price} · {service.duration}
        </p>
      </div>
      <button
        type="button"
        className="sq-service-card__book"
        data-sq-book-flow="true"
        onClick={(e) => {
          e.stopPropagation();
          onBook();
        }}
      >
        Book now
      </button>
    </article>
  );
}

function ServiceDetailView({
  service,
  listLabel,
  onBack,
  onBook,
}: {
  service: BookingService;
  listLabel: string;
  onBack: () => void;
  onBook: () => void;
}) {
  return (
    <div className="sq-flow sq-flow--detail">
      <nav className="sq-breadcrumb" aria-label="Breadcrumb">
        <button type="button" className="sq-link" onClick={onBack}>
          {listLabel}
        </button>
        <span className="sq-breadcrumb__sep"> / </span>
        <span className="sq-breadcrumb__current">{service.title}</span>
      </nav>

      <h1 className="sq-detail__title">{service.title}</h1>

      <p className="sq-detail__meta">
        {service.priceNote || `${service.price} · ${service.duration}`}
        {service.priceNote && (
          <>
            {' '}
            <span className="sq-detail__meta-dot">·</span> {service.duration}
          </>
        )}
      </p>

      {service.intro && <p className="sq-detail__text">{service.intro}</p>}

      {service.includes && service.includes.length > 0 && (
        <>
          <p className="sq-detail__text sq-detail__text--bold">Each consult includes:</p>
          <ol className="sq-detail__list">
            {service.includes.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ol>
        </>
      )}

      {service.detailParagraphs?.map((p) => (
        <p key={p} className="sq-detail__text">
          {p}
        </p>
      ))}

      {service.footerNotes?.map((note) => (
        <p key={note} className="sq-detail__text">
          {note.includes('www.uedi.doxy.me') ? (
            <>
              {note.split('www.uedi.doxy.me')[0]}
              <a
                href="https://www.uedi.doxy.me"
                target="_blank"
                rel="noopener noreferrer"
                className="sq-link"
              >
                www.uedi.doxy.me
              </a>
              {note.split('www.uedi.doxy.me')[1]}
            </>
          ) : (
            note
          )}
        </p>
      ))}

      <button
        type="button"
        className="sq-detail__book-btn"
        data-sq-book-flow="true"
        onClick={(e) => {
          e.stopPropagation();
          onBook();
        }}
      >
        Book
      </button>
    </div>
  );
}

function ScheduleView({
  service,
  onEditService,
  onComplete,
  confirmed,
}: {
  service: BookingService;
  onEditService: () => void;
  onComplete: (date: Date, time: string) => void;
  confirmed: { date: Date; time: string } | null;
}) {
  const [weekStart, setWeekStart] = useState(() => startOfDay(new Date()));
  const [selectedDate, setSelectedDate] = useState(() => startOfDay(new Date()));
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [summaryOpen, setSummaryOpen] = useState(true);

  const weekDays = useMemo(
    () => Array.from({ length: 7 }, (_, i) => addDays(weekStart, i)),
    [weekStart]
  );

  const today = startOfDay(new Date());
  const slots = useMemo(() => buildTimeSlots(selectedDate), [selectedDate]);

  const priceSummary = service.priceNote
    ? `${service.priceNote.slice(0, 8)}…`
    : service.price;

  const handlePrevWeek = () => setWeekStart((d) => addDays(d, -7));
  const handleNextWeek = () => setWeekStart((d) => addDays(d, 7));

  const isTodaySelected = isSameDay(selectedDate, today);

  return (
    <div className="sq-flow sq-flow--schedule">
      <p className="sq-schedule__business">{BUSINESS_NAME}</p>

      <div className="sq-schedule__grid">
        <div className="sq-schedule__main">
          <div className="sq-schedule__month-row">
            <h2 className="sq-schedule__month">{formatMonthYear(selectedDate)}</h2>
            <div className="sq-schedule__nav">
              <button type="button" className="sq-schedule__nav-btn" onClick={handlePrevWeek} aria-label="Previous week">
                ‹
              </button>
              <button type="button" className="sq-schedule__nav-btn" onClick={handleNextWeek} aria-label="Next week">
                ›
              </button>
            </div>
          </div>

          <div className="sq-schedule__week">
            {weekDays.map((day) => {
              const past = day < today;
              const closed = isClosedDay(day);
              const unavailable = past || closed;
              const selected = isSameDay(day, selectedDate);
              return (
                <button
                  key={day.toISOString()}
                  type="button"
                  disabled={unavailable}
                  className={`sq-schedule__day ${selected ? 'sq-schedule__day--selected' : ''} ${unavailable ? 'sq-schedule__day--off' : ''}`}
                  onClick={() => {
                    setSelectedDate(startOfDay(day));
                    setSelectedTime(null);
                  }}
                >
                  <span className="sq-schedule__day-label">{DAY_LABELS[day.getDay()]}</span>
                  <span className="sq-schedule__day-num">{day.getDate()}</span>
                </button>
              );
            })}
          </div>

          <p className="sq-schedule__tz">Times are shown in EDT.</p>

          <h3 className="sq-schedule__day-title">
            {isTodaySelected ? 'Today, ' : ''}
            {formatLongDate(selectedDate)}
          </h3>

          <div className="sq-schedule__periods">
            {(
              [
                { label: 'Morning', times: slots.morning },
                { label: 'Afternoon', times: slots.afternoon },
                { label: 'Evening', times: slots.evening },
              ] as const
            ).map(({ label, times }) => (
              <div key={label} className="sq-schedule__period-block">
                <h4 className="sq-schedule__period">{label}</h4>
                {times.length === 0 ? (
                  <p className="sq-schedule__none">No availability</p>
                ) : (
                  <div className="sq-schedule__slots">
                    {times.map((t) => (
                      <button
                        key={t}
                        type="button"
                        className={`sq-schedule__slot ${selectedTime === t ? 'sq-schedule__slot--active' : ''}`}
                        onClick={() => setSelectedTime(t)}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {confirmed ? (
            <div className="sq-schedule__confirmed" role="status">
              <p className="sq-schedule__confirmed-title">Appointment requested</p>
              <p className="sq-schedule__confirmed-text">
                <strong>{service.title}</strong>
                <br />
                {formatLongDate(confirmed.date)} at {confirmed.time}
              </p>
              <p className="sq-schedule__confirmed-note">
                Our office will confirm your appointment shortly. For questions call{' '}
                <a href="tel:+12126971701" className="sq-link">
                  (212) 697-1701
                </a>{' '}
                or email{' '}
                <a href="mailto:info@uedi.nyc" className="sq-link">
                  info@uedi.nyc
                </a>
                .
              </p>
            </div>
          ) : (
            selectedTime && (
              <button
                type="button"
                className="sq-detail__book-btn sq-schedule__confirm"
                data-sq-book-flow="true"
                onClick={(e) => {
                  e.stopPropagation();
                  onComplete(selectedDate, selectedTime);
                }}
              >
                Book
              </button>
            )
          )}
        </div>

        <aside className="sq-schedule__summary-col">
          <h3 className="sq-schedule__summary-title">Appointment summary</h3>
          <div className="sq-schedule__summary-card">
            <button
              type="button"
              className="sq-schedule__summary-head"
              onClick={() => setSummaryOpen((o) => !o)}
            >
              <div>
                <div className="sq-schedule__summary-name">{service.title}</div>
                {summaryOpen && (
                  <div className="sq-schedule__summary-meta">
                    {priceSummary} · {service.duration}
                  </div>
                )}
              </div>
              <span className={`sq-schedule__chevron ${summaryOpen ? 'sq-schedule__chevron--up' : ''}`}>
                ›
              </span>
            </button>
            <div className="sq-schedule__summary-foot">
              <span className="sq-schedule__summary-name-sm">{service.title}</span>
              <span className="sq-schedule__summary-dotted">{priceSummary}</span>
              <button
                type="button"
                className="sq-schedule__edit"
                onClick={onEditService}
                aria-label="Edit service"
              >
                ✎
              </button>
            </div>
            {selectedTime && (
              <p className="sq-schedule__summary-time">
                {formatLongDate(selectedDate)} at {selectedTime}
              </p>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
}

function BookingSidebar() {
  return (
    <aside className="sq-sidebar">
      <div className="sq-sidebar__brand">
        <div className="sq-sidebar__logo" aria-hidden="true">
          U
        </div>
        <h1 className="sq-sidebar__name">{BUSINESS_NAME}</h1>
      </div>

      <button
        type="button"
        className="sq-sidebar__cta"
        onClick={() => {
          window.location.href = '/book-appointment';
        }}
      >
        Book an appointment
      </button>

      <section className="sq-sidebar__block">
        <h2 className="sq-sidebar__heading">Location &amp; hours</h2>
        <div className="sq-sidebar__map">
          <iframe
            title="Upper East Dental Innovations location"
            src="https://maps.google.com/maps?q=121+East+60th+Street+Suite+1B+New+York+NY+10022&z=15&output=embed"
            width="100%"
            height="160"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
        <p className="sq-sidebar__line">
          <i className="fa fa-map-marker sq-sidebar__icon" aria-hidden="true" />
          121 east 60th street, suite 1B, Ste 1B, New York, NY 10022-1164
        </p>
        <p className="sq-sidebar__line">
          <i className="fa fa-clock-o sq-sidebar__icon" aria-hidden="true" />
          Mon - Fri, 9:00 AM - 6:00 PM
          <br />
          Saturday as per request
        </p>
      </section>

      <section className="sq-sidebar__block">
        <h2 className="sq-sidebar__heading">Connect</h2>
        <p className="sq-sidebar__line">
          <i className="fa fa-globe sq-sidebar__icon" aria-hidden="true" />
          <a
            href="https://www.uppereastdentalinnovations.com"
            target="_blank"
            rel="noopener noreferrer"
            className="sq-link"
          >
            www.uppereastdentalinnovations.com
          </a>
        </p>
        <p className="sq-sidebar__line">
          <i className="fa fa-envelope-o sq-sidebar__icon" aria-hidden="true" />
          <a href="mailto:info@uedi.nyc" className="sq-link">
            info@uedi.nyc
          </a>
        </p>
        <p className="sq-sidebar__line">
          <i className="fa fa-phone sq-sidebar__icon" aria-hidden="true" />
          <a href="tel:+12126971701" className="sq-link">
            (212) 697-1701
          </a>
        </p>
      </section>
    </aside>
  );
}

export default function SquareStyleBooking() {
  const [view, setView] = useState<View>('list');
  const [tab, setTab] = useState<'services' | 'staff'>('services');
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [confirmedSlot, setConfirmedSlot] = useState<{ date: Date; time: string } | null>(null);

  const selectedService = selectedId ? getBookingItem(selectedId) : null;
  const listLabel = tab === 'staff' ? 'All staff' : 'All services';

  const openDetail = (id: string) => {
    setSelectedId(id);
    setConfirmedSlot(null);
    setView('detail');
    window.scrollTo(0, 0);
  };

  const goList = () => {
    setView('list');
    setSelectedId(null);
    setConfirmedSlot(null);
    window.scrollTo(0, 0);
  };

  const goSchedule = () => {
    setConfirmedSlot(null);
    setView('schedule');
    window.scrollTo(0, 0);
  };

  const handleComplete = (date: Date, time: string) => {
    setConfirmedSlot({ date, time });
    window.scrollTo(0, 0);
  };

  if (view === 'detail' && selectedService) {
    return (
      <div className="sq-booking">
        <header className="sq-booking__topbar">
          <a
            href={SQUARE_BOOK_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="sq-link sq-booking__signin"
          >
            Sign in
          </a>
        </header>
        <div className="sq-booking__flow-wrap">
          <ServiceDetailView
            service={selectedService}
            listLabel={listLabel}
            onBack={goList}
            onBook={goSchedule}
          />
        </div>
        <footer className="sq-booking__footer">
          <Link href="/privacy" className="sq-link">
            Cookie policy
          </Link>
        </footer>
      </div>
    );
  }

  if (view === 'schedule' && selectedService) {
    return (
      <div className="sq-booking">
        <header className="sq-booking__topbar">
          <a
            href={SQUARE_BOOK_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="sq-link sq-booking__signin"
          >
            Sign in
          </a>
        </header>
        <div className="sq-booking__flow-wrap sq-booking__flow-wrap--wide">
          <ScheduleView
            service={selectedService}
            onEditService={() => setView('detail')}
            onComplete={handleComplete}
            confirmed={confirmedSlot}
          />
        </div>
        <footer className="sq-booking__footer">
          <Link href="/privacy" className="sq-link">
            Cookie policy
          </Link>
        </footer>
      </div>
    );
  }

  return (
    <div className="sq-booking">
      <header className="sq-booking__topbar">
        <a
          href={SQUARE_BOOK_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="sq-link sq-booking__signin"
        >
          Sign in
        </a>
      </header>

      <div className="sq-booking__layout">
        <BookingSidebar />

        <main className="sq-main">
          <h2 className="sq-main__title">Book an appointment</h2>

          <div className="sq-tabs" role="tablist">
            <button
              type="button"
              role="tab"
              aria-selected={tab === 'services'}
              className={`sq-tabs__btn ${tab === 'services' ? 'sq-tabs__btn--active' : ''}`}
              onClick={() => setTab('services')}
            >
              Services
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={tab === 'staff'}
              className={`sq-tabs__btn ${tab === 'staff' ? 'sq-tabs__btn--active' : ''}`}
              onClick={() => setTab('staff')}
            >
              Staff
            </button>
          </div>

          {tab === 'services' ? (
            <div className="sq-service-list">
              {BOOKING_SERVICES.map((s) => (
                <ServiceListCard key={s.id} service={s} onBook={() => openDetail(s.id)} />
              ))}
            </div>
          ) : (
            <div className="sq-staff-list">
              {BOOKING_STAFF.map((member) => (
                <ServiceListCard key={member.id} service={member} onBook={() => openDetail(member.id)} />
              ))}
            </div>
          )}
        </main>
      </div>

      <footer className="sq-booking__footer">
        <Link href="/privacy" className="sq-link">
          Cookie policy
        </Link>
      </footer>
    </div>
  );
}
