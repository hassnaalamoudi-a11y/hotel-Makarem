"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import {
  Calendar,
  ChevronDown,
  MapPin,
  BedDouble,
  Sparkles,
  Search,
  Users,
} from "lucide-react";
import { hotel } from "@/lib/hotel-data";
import { useI18n } from "@/lib/i18n";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function HeroSection() {
  const router = useRouter();
  const { locale } = useI18n();
  const isAr = locale === "ar";

  const containerRef = useRef<HTMLElement>(null);
  const ambientRef = useRef<HTMLDivElement>(null);
  const bgImageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  // Default dates for search
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const nextThreeDays = new Date(today);
  nextThreeDays.setDate(nextThreeDays.getDate() + 4);

  const [checkin, setCheckin] = useState(tomorrow.toISOString().split("T")[0]);
  const [checkout, setCheckout] = useState(nextThreeDays.toISOString().split("T")[0]);
  const [guests, setGuests] = useState("2");

  // GSAP Entrance Timeline & ScrollTrigger Parallax
  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const ctx = gsap.context(() => {
      if (!prefersReducedMotion) {
        // A. CINEMATIC HERO ENTRANCE TIMELINE
        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

        tl.fromTo(
          bgImageRef.current,
          { scale: 1.2, opacity: 0 },
          { scale: 1.05, opacity: 1, duration: 1.5, ease: "power2.out" }
        )
          .fromTo(
            ".hero-tag",
            { opacity: 0, y: -20, letterSpacing: "0.4em" },
            { opacity: 1, y: 0, letterSpacing: "0.28em", duration: 0.75 },
            "-=1.1"
          )
          .fromTo(
            ".hero-title",
            { opacity: 0, y: 40, filter: "blur(6px)" },
            { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.9 },
            "-=0.6"
          )
          .fromTo(
            ".hero-subtitle",
            { opacity: 0, y: 25 },
            { opacity: 1, y: 0, duration: 0.75 },
            "-=0.55"
          )
          .fromTo(
            ".hero-pillar",
            { opacity: 0, y: 25, scale: 0.92 },
            { opacity: 1, y: 0, scale: 1, stagger: 0.1, duration: 0.65, ease: "back.out(1.5)" },
            "-=0.5"
          )
          .fromTo(
            ".hero-search-bar",
            { opacity: 0, y: 35, scale: 0.94 },
            { opacity: 1, y: 0, scale: 1, duration: 0.85, ease: "back.out(1.4)" },
            "-=0.4"
          )
          .fromTo(
            ".hero-emblem",
            { opacity: 0, scaleX: 0.6 },
            { opacity: 1, scaleX: 1, duration: 0.8 },
            "-=0.4"
          );

        // B. SCROLLTRIGGER PARALLAX (Continuous Scrub synced with Lenis)
        gsap.to(bgImageRef.current, {
          yPercent: 22,
          scale: 1.15,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 1.2,
          },
        });

        gsap.to(ambientRef.current, {
          yPercent: 12,
          scale: 1.2,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 1.5,
          },
        });

        gsap.to(contentRef.current, {
          yPercent: -15,
          opacity: 0.05,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "70% top",
            scrub: 0.8,
          },
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (checkin) params.set("checkin", checkin);
    if (checkout) params.set("checkout", checkout);
    if (guests) params.set("guests", guests);
    router.push(`/contact?${params.toString()}#booking`);
  };

  return (
    <section
      ref={containerRef}
      className="relative w-full overflow-hidden bg-[#0A0706] text-white pt-24 pb-12 sm:pt-28 sm:pb-16 min-h-[100dvh] flex flex-col justify-between"
    >
      {/* ── Layer 1: Blurred ambient fill with GSAP Parallax ── */}
      <div
        ref={ambientRef}
        className="absolute inset-0 z-0 overflow-hidden will-change-transform"
      >
        <Image
          src="/images/exterior-dusk.png"
          alt=""
          fill
          priority
          aria-hidden
          className="object-cover object-center select-none pointer-events-none scale-105"
          style={{ filter: "blur(28px) brightness(0.55) saturate(1.3)" }}
          sizes="100vw"
        />
      </div>

      {/* ── Layer 2: Sharp full hotel image with GSAP ScrollTrigger ── */}
      <div
        ref={bgImageRef}
        className="absolute inset-0 z-[1] will-change-transform"
      >
        <Image
          src="/images/exterior-dusk.png"
          alt={isAr ? "فندق مكارم أجياد مكة المكرمة" : "Makarem Ajyad Makkah Hotel"}
          fill
          priority
          unoptimized
          className="object-cover object-center select-none pointer-events-none"
          sizes="100vw"
          quality={100}
        />
      </div>

      {/* ── Layer 3: Gradient overlays for text legibility ── */}
      <div className="absolute inset-0 z-[2] pointer-events-none">
        {/* Left-side dark gradient so text is readable */}
        <div
          className="absolute inset-0 bg-gradient-to-r from-[#0C0908]/88 via-[#0C0908]/45 via-50% to-transparent"
          aria-hidden
        />
        {/* Top fade for navbar */}
        <div
          className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black/65 to-transparent"
          aria-hidden
        />
        {/* Bottom fade */}
        <div
          className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-[#0A0706]/75 to-transparent"
          aria-hidden
        />
      </div>

      {/* Main Content Area with GSAP scrubbed upward float & fade */}
      <div
        ref={contentRef}
        className="relative z-10 mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-12 flex-1 flex flex-col justify-center pt-8 sm:pt-12 will-change-transform"
      >
        <div className="max-w-2xl text-start">
          {/* Top Label */}
          <p className="hero-tag text-xs sm:text-sm font-extrabold uppercase tracking-[0.28em] text-[#D8C29D] mb-3">
            MAKAREM AJYAD HOTEL
          </p>

          {/* Main Headline */}
          <h1 className="hero-title text-3xl sm:text-5xl lg:text-[3.5rem] font-extrabold leading-[1.18] tracking-tight text-white font-display">
            {isAr ? "إقامة مريحة وقريبة من الحرم المكي" : "Comfortable Stay Steps from the Holy Haram"}
          </h1>

          {/* Subtitle */}
          <p className="hero-subtitle mt-4 max-w-xl text-sm sm:text-base leading-relaxed text-white/85">
            {isAr
              ? "في قلب مكة المكرمة .. حيث الراحة والسكينة تلتقي بخدمة ضيافة استثنائية"
              : "In the heart of Makkah .. where peace and comfort meet exceptional Saudi hospitality"}
          </p>

          {/* 3 Pillars / Feature Highlights with Dividers */}
          <div className="mt-8 flex flex-wrap items-center gap-4 sm:gap-6 pt-2">
            {/* Feature 1: Location */}
            <div className="hero-pillar flex items-center gap-3 transition-transform duration-300 hover:scale-105">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/10 text-[#EAD8B7] border border-white/15 backdrop-blur-sm shadow-sm">
                <MapPin className="h-5 w-5" />
              </div>
              <div className="flex flex-col leading-tight">
                <span className="text-xs sm:text-sm font-extrabold text-white">
                  {isAr ? "موقع مميز" : "Prime Location"}
                </span>
                <span className="text-[0.7rem] sm:text-xs text-white/70 mt-0.5">
                  {isAr ? "بالقرب من الحرم" : "Near the Haram"}
                </span>
              </div>
            </div>

            {/* Vertical Divider */}
            <span className="h-9 w-px bg-white/20 hidden sm:block" aria-hidden />

            {/* Feature 2: Rooms */}
            <div className="hero-pillar flex items-center gap-3 transition-transform duration-300 hover:scale-105">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/10 text-[#EAD8B7] border border-white/15 backdrop-blur-sm shadow-sm">
                <BedDouble className="h-5 w-5" />
              </div>
              <div className="flex flex-col leading-tight">
                <span className="text-xs sm:text-sm font-extrabold text-white">
                  {isAr ? "غرف مريحة" : "Comfortable Rooms"}
                </span>
                <span className="text-[0.7rem] sm:text-xs text-white/70 mt-0.5">
                  {isAr ? "بمستوى عالٍ من الراحة" : "High Level Comfort"}
                </span>
              </div>
            </div>

            {/* Vertical Divider */}
            <span className="h-9 w-px bg-white/20 hidden sm:block" aria-hidden />

            {/* Feature 3: Service */}
            <div className="hero-pillar flex items-center gap-3 transition-transform duration-300 hover:scale-105">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/10 text-[#EAD8B7] border border-white/15 backdrop-blur-sm shadow-sm">
                <Sparkles className="h-5 w-5" />
              </div>
              <div className="flex flex-col leading-tight">
                <span className="text-xs sm:text-sm font-extrabold text-white">
                  {isAr ? "خدمة متميزة" : "Signature Service"}
                </span>
                <span className="text-[0.7rem] sm:text-xs text-white/70 mt-0.5">
                  {isAr ? "تجربة ضيافة فريدة" : "Unique Experience"}
                </span>
              </div>
            </div>
          </div>

          {/* Floating Booking Search Bar */}
          <div className="hero-search-bar mt-10">
            <form
              onSubmit={handleSearch}
              className="flex flex-col sm:flex-row items-stretch sm:items-center rounded-3xl sm:rounded-full bg-white p-2 sm:p-2.5 shadow-[0_15px_40px_rgba(0,0,0,0.45)] border border-white/30 text-[#1C1613] gap-2 max-w-2xl w-full transition-all duration-300 hover:shadow-[0_20px_50px_rgba(0,0,0,0.55)]"
            >
              {/* Check-in Date */}
              <div className="flex flex-1 items-center gap-2.5 px-3.5 py-2 hover:bg-black/5 rounded-full transition-colors">
                <Calendar className="h-4 w-4 text-[#9D7743] shrink-0" />
                <div className="flex flex-col leading-none text-start">
                  <span className="text-[0.65rem] font-bold text-neutral-500 uppercase">
                    {isAr ? "تاريخ الوصول" : "Check-in"}
                  </span>
                  <input
                    type="date"
                    value={checkin}
                    onChange={(e) => setCheckin(e.target.value)}
                    className="bg-transparent text-xs font-bold text-[#1C1613] outline-none cursor-pointer mt-0.5"
                  />
                </div>
              </div>

              {/* Divider */}
              <span className="h-7 w-px bg-neutral-200 hidden sm:block" aria-hidden />

              {/* Check-out Date */}
              <div className="flex flex-1 items-center gap-2.5 px-3.5 py-2 hover:bg-black/5 rounded-full transition-colors">
                <Calendar className="h-4 w-4 text-[#9D7743] shrink-0" />
                <div className="flex flex-col leading-none text-start">
                  <span className="text-[0.65rem] font-bold text-neutral-500 uppercase">
                    {isAr ? "تاريخ المغادرة" : "Check-out"}
                  </span>
                  <input
                    type="date"
                    value={checkout}
                    min={checkin}
                    onChange={(e) => setCheckout(e.target.value)}
                    className="bg-transparent text-xs font-bold text-[#1C1613] outline-none cursor-pointer mt-0.5"
                  />
                </div>
              </div>

              {/* Divider */}
              <span className="h-7 w-px bg-neutral-200 hidden sm:block" aria-hidden />

              {/* Guests Selector */}
              <div className="flex flex-1 items-center gap-2.5 px-3.5 py-2 hover:bg-black/5 rounded-full transition-colors">
                <Users className="h-4 w-4 text-[#9D7743] shrink-0" />
                <div className="flex flex-col leading-none text-start">
                  <span className="text-[0.65rem] font-bold text-neutral-500 uppercase">
                    {isAr ? "عدد النزلاء" : "Guests"}
                  </span>
                  <select
                    value={guests}
                    onChange={(e) => setGuests(e.target.value)}
                    className="bg-transparent text-xs font-bold text-[#1C1613] outline-none cursor-pointer mt-0.5 pr-2"
                  >
                    {[1, 2, 3, 4, 5, 6].map((num) => (
                      <option key={num} value={num}>
                        {num} {isAr ? (num === 1 ? "بالغ" : num === 2 ? "بالغين" : "نزلاء") : num === 1 ? "Guest" : "Guests"}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Submit Search Button */}
              <button
                type="submit"
                className="flex items-center justify-center gap-2 rounded-full bg-[#9D7743] hover:bg-[#8B6734] active:scale-95 text-white px-6 py-3.5 text-xs font-extrabold shadow-md transition-all sm:shrink-0"
              >
                <Search className="h-3.5 w-3.5" />
                <span>{isAr ? "البحث عن الغرف" : "Search Rooms"}</span>
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Bottom Center Decorative Islamic Emblem and Motif */}
      <div className="hero-emblem relative z-10 mx-auto w-full max-w-4xl px-4 mt-8 flex flex-col items-center justify-center text-center">
        <div className="flex items-center gap-4 w-full justify-center">
          <span className="h-px bg-gradient-to-r from-transparent via-gold/40 to-gold/70 flex-1" />
          
          {/* Islamic Arch Motif */}
          <div className="flex items-center gap-2 text-[#D8C29D]">
            <svg
              viewBox="0 0 24 24"
              fill="currentColor"
              className="h-5 w-5 opacity-90"
              aria-hidden
            >
              <path d="M12 2C9 5.5 4 8 4 13.5C4 18 7.5 21 12 21C16.5 21 20 18 20 13.5C20 8 15 5.5 12 2ZM12 4.5C14.2 7.2 18 9.5 18 13.5C18 16.8 15.3 19 12 19C8.7 19 6 16.8 6 13.5C6 9.5 9.8 7.2 12 4.5Z" />
            </svg>
            <span className="text-[0.65rem] sm:text-xs font-extrabold uppercase tracking-[0.28em] text-[#D8C29D]">
              MAKAREM AJYAD HOTEL • MAKKAH
            </span>
          </div>

          <span className="h-px bg-gradient-to-l from-transparent via-gold/40 to-gold/70 flex-1" />
        </div>
      </div>
    </section>
  );
}
