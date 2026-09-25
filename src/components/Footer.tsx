"use client";

import Link from "next/link";
import { useState } from "react";
import { Check, Clock, Mail, MapPin, Navigation, Phone, Send } from "lucide-react";
import { hotel, nav } from "@/lib/hotel-data";
import { useI18n } from "@/lib/i18n";

function SocialIcon({ name, className }: { name: string; className?: string }) {
  const cls = className ?? "h-4 w-4";
  switch (name) {
    case "instagram":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={cls} aria-hidden>
          <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
          <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
        </svg>
      );
    case "twitter":
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={cls} aria-hidden>
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      );
    case "facebook":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={cls} aria-hidden>
          <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
        </svg>
      );
    case "youtube":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={cls} aria-hidden>
          <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
          <path d="m10 15 5-3-5-3z" />
        </svg>
      );
    default:
      return null;
  }
}

export function Footer() {
  const { t, locale } = useI18n();
  const year = new Date().getFullYear();
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "done">("idle");

  const subscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return;
    setState("done");
    setEmail("");
    setTimeout(() => setState("idle"), 3000);
  };

  const ar = locale === "ar";

  return (
    <footer className="footer-dark mt-auto bg-footer pb-24 text-white/85 md:pb-0">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 md:grid-cols-2 lg:grid-cols-[1.4fr_0.8fr_1fr_1fr] lg:px-8">
        {/* Brand + newsletter */}
        <div className="flex flex-col gap-5">
          <div className="flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gold text-lg font-black text-[#1C1613]">
              {ar ? "م" : "M"}
            </span>
            <div className="leading-tight">
              <p className="text-xl font-extrabold text-white font-display">{t(hotel.name)}</p>
              <p className="mt-1 text-[0.65rem] font-bold uppercase tracking-[0.2em] text-gold">
                {ar ? "فنادق مكارم · طيبة للاستثمار" : "Makarem Hotels · Taiba Investment"}
              </p>
            </div>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-white/75">
            {t(hotel.tagline)} —{" "}
            {ar
              ? "ضيافة سعودية وحجازية أصيلة على بُعد ٣٠٠ متر من الحرم المكي الشريف."
              : "Authentic Saudi & Hijazi hospitality just 300m from the Holy Haram."}
          </p>

          {/* Newsletter */}
          <div>
            <p className="mb-2.5 text-sm font-bold text-white">
              {ar ? "اشترك في نشرتنا" : "Subscribe to our newsletter"}
            </p>
            <form onSubmit={subscribe} className="flex max-w-sm items-center gap-2">
              <label htmlFor="newsletter-email" className="sr-only">
                {ar ? "البريد الإلكتروني" : "Email address"}
              </label>
              <input
                id="newsletter-email"
                type="email"
                required
                dir="ltr"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={ar ? "بريدك الإلكتروني" : "your@email.com"}
                className="h-11 min-w-0 flex-1 rounded-full border border-white/15 bg-white/10 px-4 text-sm text-white placeholder:text-white/40 focus:border-gold focus:outline-none"
              />
              <button
                type="submit"
                aria-label={ar ? "اشترك" : "Subscribe"}
                className="pill pill-gold btn-sweep h-11 w-11 shrink-0 !p-0"
              >
                {state === "done" ? <Check className="h-4 w-4" /> : <Send className="h-4 w-4" />}
              </button>
            </form>
            {state === "done" ? (
              <p
                className="mt-2 text-xs font-semibold text-gold"
                style={{ animation: "fade-in 0.3s ease both" }}
              >
                {ar ? "تم الاشتراك بنجاح — أهلاً بك!" : "Subscribed — welcome!"}
              </p>
            ) : null}
          </div>

          <div className="flex gap-2.5">
            {hotel.socials.map((s) => (
              <a
                key={s.icon}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white/70 transition-all duration-300 hover:border-gold hover:bg-gold hover:text-[#241d17]"
              >
                <SocialIcon name={s.icon} />
              </a>
            ))}
          </div>
        </div>

        {/* Quick links */}
        <nav aria-label="Footer">
          <h3 className="mb-5 text-sm font-bold uppercase tracking-wider text-white">
            {ar ? "روابط سريعة" : "Quick Links"}
          </h3>
          <ul className="flex flex-col gap-3 text-sm">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-white/65 transition-colors hover:text-gold"
                >
                  {t(item.label)}
                </Link>
              </li>
            ))}
            <li>
              <Link href={hotel.bookingUrl} className="text-white/65 transition-colors hover:text-gold">
                {ar ? "احجز إقامتك" : "Book Your Stay"}
              </Link>
            </li>
          </ul>
        </nav>

        {/* Contact */}
        <div>
          <h3 className="mb-5 text-sm font-bold uppercase tracking-wider text-white">
            {ar ? "تواصل معنا" : "Contact"}
          </h3>
          <ul className="flex flex-col gap-4 text-sm text-white/65">
            <li className="flex items-start gap-3">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
              <span>{t(hotel.address)}</span>
            </li>
            <li>
              <a href={`tel:${hotel.phoneHref}`} className="flex items-center gap-3 transition-colors hover:text-gold">
                <Phone className="h-4 w-4 shrink-0 text-gold" />
                <span dir="ltr">{hotel.phone}</span>
              </a>
            </li>
            <li>
              <a
                href={`https://wa.me/${hotel.whatsapp.replace("+", "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 transition-colors hover:text-gold"
              >
                <Send className="h-4 w-4 shrink-0 text-gold" />
                {ar ? "واتساب" : "WhatsApp"}
              </a>
            </li>
            <li>
              <a href={`mailto:${hotel.email}`} className="flex items-center gap-3 break-all transition-colors hover:text-gold">
                <Mail className="h-4 w-4 shrink-0 text-gold" />
                {hotel.email}
              </a>
            </li>
          </ul>
        </div>

        {/* Hours + directions */}
        <div>
          <h3 className="mb-5 text-sm font-bold uppercase tracking-wider text-white">
            {ar ? "ساعات العمل" : "Working Hours"}
          </h3>
          <p className="flex items-start gap-3 text-sm leading-relaxed text-white/65">
            <Clock className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
            {t(hotel.hours)}
          </p>
          <a
            href={hotel.directionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="pill mt-6 inline-flex h-11 border border-white/20 px-5 text-sm text-white transition-colors hover:border-gold hover:text-gold"
          >
            <Navigation className="h-4 w-4" />
            {ar ? "كيف تصل إلينا" : "How to reach us"}
          </a>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-5 py-6 text-xs text-white/50 md:flex-row lg:px-8">
          <p>
            © {year} {t(hotel.name)} — {ar ? "جميع الحقوق محفوظة" : "All rights reserved"}
          </p>
          <p className="font-semibold uppercase tracking-[0.2em]">
            {ar ? "فندق ٥ نجوم — مكة المكرمة" : "5-Star Hotel — Makkah"}
          </p>
        </div>
      </div>
    </footer>
  );
}
