"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Calendar, ChevronDown, Globe, Menu, X } from "lucide-react";
import { hotel, nav } from "@/lib/hotel-data";
import { useI18n } from "@/lib/i18n";
import { ThemeToggle } from "@/components/ThemeToggle";

function Wordmark() {
  const { locale } = useI18n();
  const isAr = locale === "ar";

  return (
    <Link href="/" className="flex shrink-0 items-center gap-2 sm:gap-3.5 group text-white">
      {/* English Makarem Logo Script */}
      <div className="flex flex-col text-start leading-none">
        <span className="font-serif italic text-lg sm:text-xl font-bold tracking-wide text-[#EAD8B7] group-hover:text-gold transition-colors">
          Makarem
        </span>
        <span className="text-[0.55rem] sm:text-[0.62rem] font-extrabold uppercase tracking-[0.18em] sm:tracking-[0.28em] text-white/90 mt-0.5">
          AJYAD HOTEL
        </span>
      </div>

      {/* Vertical Divider - only on tablet/desktop */}
      <span className="h-8 w-px bg-white/25 mx-0.5 hidden sm:block" aria-hidden />

      {/* Arabic Calligraphy Style - only on tablet/desktop */}
      <div className="hidden sm:flex flex-col text-start leading-none">
        <span className="font-display text-lg font-black tracking-tight text-[#EAD8B7] group-hover:text-gold transition-colors">
          {isAr ? "مكارم أجياد" : "فندق مكارم"}
        </span>
        <span className="text-[0.62rem] font-bold uppercase tracking-[0.2em] text-white/80 mt-0.5">
          {isAr ? "فندق ٥ نجوم" : "Makkah Hotel"}
        </span>
      </div>
    </Link>
  );
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const { t, locale, toggle } = useI18n();

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => setScrolled(scrollY > 40));
    };
    onScroll();
    addEventListener("scroll", onScroll, { passive: true });
    return () => {
      removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const isAr = locale === "ar";

  return (
    <header className="fixed inset-x-0 top-0 z-50 transition-all duration-500 w-full overflow-hidden">
      {/* Navbar Container */}
      <div
        className={`mx-auto flex h-16 sm:h-20 w-full max-w-7xl items-center justify-between px-3.5 sm:px-8 transition-all duration-500 ${
          scrolled
            ? "bg-[#140F0C]/90 backdrop-blur-xl border-b border-gold/20 shadow-2xl py-2 sm:py-3"
            : "bg-gradient-to-b from-black/80 via-black/40 to-transparent py-2.5 sm:py-4"
        }`}
      >
        {/* Left: Responsive Logo */}
        <Wordmark />

        {/* Center Desktop Navigation */}
        <nav className="hidden items-center gap-7 lg:flex" aria-label="Main Navigation">
          {nav.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`relative py-1 text-sm font-semibold transition-all duration-300 ${
                  active
                    ? "text-[#EAD8B7] font-bold"
                    : "text-white/80 hover:text-white"
                }`}
              >
                {t(item.label)}
                {active ? (
                  <span className="absolute inset-x-0 -bottom-1.5 h-0.5 rounded-full bg-gradient-to-r from-gold/40 via-gold to-gold/40 shadow-[0_0_8px_rgba(185,150,87,0.8)]" />
                ) : (
                  <span className="absolute inset-x-0 -bottom-1.5 h-0.5 rounded-full bg-gold/0 transition-all group-hover:bg-gold/50" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Right Desktop Actions */}
        <div className="hidden items-center gap-3 lg:flex">
          {/* Theme Mode Toggle with circular reveal animation */}
          <ThemeToggle variant="icon" />

          {/* Language Switcher */}
          <button
            onClick={toggle}
            aria-label="Switch language"
            className="flex h-9 items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-3 text-xs font-semibold text-white/90 hover:text-white hover:border-gold/60 hover:bg-white/20 transition-all backdrop-blur-md"
          >
            <Globe className="h-3.5 w-3.5 text-gold" />
            <span>{isAr ? "العربية" : "English"}</span>
            <ChevronDown className="h-3 w-3 opacity-70" />
          </button>

          {/* Booking Button */}
          <a
            href={hotel.bookingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-10 items-center gap-2 rounded-full bg-[#B99657] hover:bg-[#A88546] px-5 text-xs font-black text-[#1A1410] shadow-[0_4px_15px_rgba(185,150,87,0.35)] transition-all hover:scale-105 active:scale-95"
          >
            <Calendar className="h-3.5 w-3.5 text-[#1A1410]" />
            <span>{isAr ? "احجز الآن" : "Book Now"}</span>
          </a>
        </div>

        {/* Mobile menu triggers */}
        <div className="flex items-center gap-1.5 sm:gap-2 lg:hidden">
          <ThemeToggle variant="icon" />

          <button
            onClick={toggle}
            aria-label="Switch language"
            className="flex h-8 sm:h-9 items-center justify-center rounded-full bg-white/10 px-2.5 text-xs font-bold text-white border border-white/20 hover:bg-white/20 transition-colors"
          >
            <span>{isAr ? "EN" : "عربي"}</span>
          </button>

          <button
            onClick={() => setOpen((o) => !o)}
            className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-full bg-white/10 text-white border border-white/20 hover:bg-white/20 transition-colors"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            {open ? <X className="h-4 w-4 sm:h-5 sm:w-5 text-gold" /> : <Menu className="h-4 w-4 sm:h-5 sm:w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {open ? (
        <nav
          aria-label="Mobile"
          className="anim-drawer-in mx-4 mt-2 overflow-hidden rounded-3xl border border-gold/30 bg-[#16110E]/95 p-5 shadow-2xl backdrop-blur-2xl lg:hidden"
        >
          <div className="flex flex-col gap-2">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`block rounded-2xl px-4 py-3 text-sm font-bold transition-colors ${
                  pathname === item.href
                    ? "bg-gold/20 text-gold"
                    : "text-white/80 hover:bg-white/5 hover:text-white"
                }`}
              >
                {t(item.label)}
              </Link>
            ))}

            {/* Mobile Drawer Theme Mode Switcher */}
            <div className="pt-2 border-t border-white/10">
              <ThemeToggle variant="row" />
            </div>

            <a
              href={hotel.bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="pill pill-gold mt-2 h-12 w-full text-xs font-extrabold justify-center"
            >
              <Calendar className="h-4 w-4" />
              <span>{isAr ? "احجز إقامتكم الآن" : "Book Your Stay"}</span>
            </a>
          </div>
        </nav>
      ) : null}
    </header>
  );
}
