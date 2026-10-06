"use client";

import { useImperativeHandle, useRef, useState, type FormEvent, type Ref } from "react";
import { CalendarCheck, CircleCheck, MessageCircle, X } from "lucide-react";
import { contact } from "@/data/site";
import { buttonClassName, Ornament } from "../ui";

export type ReservationDialogHandle = { open: () => void };

// Kitchen is open 11:00 AM – 11:00 PM, so the last seating is 10:30 PM.
const timeSlots = Array.from({ length: 24 }, (_, i) => {
  const minutes = 11 * 60 + i * 30;
  const h24 = Math.floor(minutes / 60);
  const m = minutes % 60;
  const h12 = ((h24 + 11) % 12) + 1;
  return `${h12}:${m.toString().padStart(2, "0")} ${h24 < 12 ? "AM" : "PM"}`;
});

const guestOptions = [...Array.from({ length: 10 }, (_, i) => `${i + 1}`), "More than 10"];
const occasions = ["None", "Birthday", "Anniversary", "Family get-together", "Business meal", "Other"];

function todayISO() {
  const d = new Date();
  d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
  return d.toISOString().slice(0, 10);
}

function formatDate(iso: string) {
  return new Date(`${iso}T00:00:00`).toLocaleDateString("en-IN", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

type Booking = {
  name: string;
  phone: string;
  date: string;
  time: string;
  guests: string;
  occasion: string;
  notes: string;
};

function whatsappLink(b: Booking) {
  const lines = [
    "Hello Kundeep Kitchen, I'd like to reserve a table.",
    "",
    `Name: ${b.name}`,
    `Phone: ${b.phone}`,
    `Date: ${formatDate(b.date)}`,
    `Time: ${b.time}`,
    `Guests: ${b.guests}`,
    b.occasion !== "None" ? `Occasion: ${b.occasion}` : "",
    b.notes ? `Requests: ${b.notes}` : "",
  ].filter((l, i) => l || i === 1);
  const number = contact.phoneHref.replace(/\D/g, "");
  return `https://wa.me/${number}?text=${encodeURIComponent(lines.join("\n"))}`;
}

const labelClass = "mb-1.5 block text-[13px] font-medium text-ink";
const fieldClass =
  "w-full rounded-md border border-[#d9cfbf] bg-white px-3.5 py-3 text-sm text-ink outline-none transition-colors placeholder:text-[#8a8a8a] focus:border-forest focus:ring-2 focus:ring-forest/20";

export default function ReservationDialog({ ref }: { ref?: Ref<ReservationDialogHandle> }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [minDate, setMinDate] = useState("");
  const [booking, setBooking] = useState<Booking | null>(null);

  useImperativeHandle(ref, () => ({
    open() {
      setMinDate(todayISO());
      setBooking(null);
      dialogRef.current?.showModal();
    },
  }));

  const close = () => dialogRef.current?.close();

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget)) as Booking;
    const b = { ...data, name: data.name.trim(), notes: data.notes.trim() };
    setBooking(b);
    window.open(whatsappLink(b), "_blank", "noopener,noreferrer");
    e.currentTarget.reset();
  }

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby="reservation-title"
      // Clicking the dimmed backdrop (the dialog element itself) closes it.
      onClick={(e) => e.target === e.currentTarget && close()}
      className="m-auto w-[min(560px,calc(100vw-2rem))] max-h-[calc(100dvh-2rem)] overflow-y-auto rounded-2xl bg-cream p-0 text-ink shadow-2xl backdrop:bg-[#1f3115]/60 backdrop:backdrop-blur-sm open:animate-[reserve-in_220ms_ease-out]"
    >
      <div className="relative px-6 pt-7 pb-6 sm:px-9 sm:pt-9 sm:pb-8">
        <button
          type="button"
          onClick={close}
          aria-label="Close"
          className="absolute top-3 right-3 flex size-11 items-center justify-center rounded-full text-forest transition-colors hover:bg-sand"
        >
          <X size={20} />
        </button>

        {booking ? (
          <div className="flex flex-col items-center gap-4 py-6 text-center">
            <CircleCheck size={52} strokeWidth={1.5} className="text-forest" aria-hidden="true" />
            <h2 id="reservation-title" className="font-serif text-3xl text-forest">
              Almost done, {booking.name.split(" ")[0]}!
            </h2>
            <p className="max-w-sm text-sm leading-relaxed text-[#3a3a3a]">
              We’ve opened WhatsApp with your booking for{" "}
              <strong className="font-medium text-ink">
                {booking.guests} {booking.guests === "1" ? "guest" : "guests"}
              </strong>{" "}
              on{" "}
              <strong className="font-medium text-ink">
                {formatDate(booking.date)} at {booking.time}
              </strong>
              . Press send there and we’ll confirm your table shortly.
            </p>
            <div className="mt-2 flex flex-wrap justify-center gap-3">
              <a
                href={whatsappLink(booking)}
                target="_blank"
                rel="noopener noreferrer"
                className={buttonClassName("solid")}
              >
                <MessageCircle size={16} aria-hidden="true" />
                Open WhatsApp again
              </a>
              <button type="button" onClick={close} className={buttonClassName("outline")}>
                Done
              </button>
            </div>
            <p className="text-xs text-muted">
              Prefer to call?{" "}
              <a href={contact.phoneHref} className="font-medium text-forest underline">
                {contact.phoneDisplay}
              </a>
            </p>
          </div>
        ) : (
          <>
            <header className="mb-6 flex flex-col items-center gap-2 text-center">
              <p className="text-[12px] font-medium tracking-[0.12em] text-clay uppercase">
                Book your experience
              </p>
              <h2 id="reservation-title" className="font-serif text-[32px] leading-tight text-forest">
                Reserve a Table
              </h2>
              <Ornament className="text-gold" />
            </header>

            <form onSubmit={handleSubmit} className="grid gap-4 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label htmlFor="res-name" className={labelClass}>
                  Full name
                </label>
                <input id="res-name" name="name" required autoFocus autoComplete="name" placeholder="Your name" className={fieldClass} />
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="res-phone" className={labelClass}>
                  Phone number
                </label>
                <input
                  id="res-phone"
                  name="phone"
                  type="tel"
                  required
                  autoComplete="tel"
                  inputMode="tel"
                  // Browsers compile `pattern` with the regex `v` flag, so a bare `-` in a class must be escaped.
                  pattern="(\+91[\s\-]?)?[6-9]\d{4}[\s\-]?\d{5}"
                  title="Enter a 10-digit Indian mobile number"
                  placeholder="98765 43210"
                  className={fieldClass}
                />
              </div>

              <div>
                <label htmlFor="res-date" className={labelClass}>
                  Date
                </label>
                <input id="res-date" name="date" type="date" required min={minDate} defaultValue={minDate} key={minDate} className={fieldClass} />
              </div>

              <div>
                <label htmlFor="res-time" className={labelClass}>
                  Time
                </label>
                <select id="res-time" name="time" required defaultValue="" className={fieldClass}>
                  <option value="" disabled>
                    Select a time
                  </option>
                  {timeSlots.map((t) => (
                    <option key={t}>{t}</option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="res-guests" className={labelClass}>
                  Guests
                </label>
                <select id="res-guests" name="guests" required defaultValue="2" className={fieldClass}>
                  {guestOptions.map((g) => (
                    <option key={g}>{g}</option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="res-occasion" className={labelClass}>
                  Occasion <span className="font-normal text-muted">(optional)</span>
                </label>
                <select id="res-occasion" name="occasion" defaultValue="None" className={fieldClass}>
                  {occasions.map((o) => (
                    <option key={o}>{o}</option>
                  ))}
                </select>
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="res-notes" className={labelClass}>
                  Special requests <span className="font-normal text-muted">(optional)</span>
                </label>
                <textarea
                  id="res-notes"
                  name="notes"
                  rows={3}
                  maxLength={300}
                  placeholder="High chair, window seat, Jain food…"
                  className={`${fieldClass} resize-none`}
                />
              </div>

              <button type="submit" className={buttonClassName("solid", "mt-2 w-full sm:col-span-2")}>
                <CalendarCheck size={17} aria-hidden="true" />
                Confirm via WhatsApp
              </button>
              <p className="text-center text-xs leading-relaxed text-muted sm:col-span-2">
                We’ll confirm your table on WhatsApp or by phone. {contact.hours}.
              </p>
            </form>
          </>
        )}
      </div>
    </dialog>
  );
}
