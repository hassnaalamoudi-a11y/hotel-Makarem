"use client";

import { useEffect, useState } from "react";
import { Star } from "lucide-react";
import { hotel } from "@/lib/hotel-data";
import { useI18n } from "@/lib/i18n";

export function SplashScreen() {
  const { t, locale } = useI18n();
  const [show, setShow] = useState(true);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    // Only show once per session to maintain excellent UX, but always on fresh visit
    const hasSeen = sessionStorage.getItem("agied_splash_seen");
    if (hasSeen) {
      setShow(false);
      return;
    }

    const timer1 = setTimeout(() => {
      setFading(true);
    }, 1400);

    const timer2 = setTimeout(() => {
      setShow(false);
      sessionStorage.setItem("agied_splash_seen", "true");
    }, 2000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  if (!show) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#1C1613] text-[#FAF6F1] transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
        fading ? "pointer-events-none opacity-0 scale-105" : "opacity-100 scale-100"
      }`}
      aria-hidden="true"
    >
      {/* Subtle glowing radial background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(185,150,87,0.15)_0%,rgba(28,22,19,0.95)_70%)] pointer-events-none" />

      {/* Decorative Islamic geometric subtle pattern */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(#B99657 1px, transparent 1px)`,
          backgroundSize: "24px 24px",
        }}
      />

      <div className="relative z-10 flex flex-col items-center text-center px-6">
        {/* Monogram with pulsing gold halo */}
        <div className="relative mb-6 flex items-center justify-center">
          <div className="absolute -inset-3 rounded-3xl bg-[#B99657]/20 blur-xl animate-pulse" />
          <div className="relative flex h-20 w-20 items-center justify-center rounded-3xl border border-[#B99657]/40 bg-gradient-to-br from-[#2F2820] to-[#1C1613] shadow-[0_0_40px_rgba(185,150,87,0.35)]">
            <span className="text-3xl font-extrabold text-[#B99657] font-display">
              {locale === "ar" ? "إ" : "A"}
            </span>
          </div>
        </div>

        {/* 5 Stars */}
        <div className="mb-3 flex items-center gap-1.5">
          {[1, 2, 3, 4, 5].map((s) => (
            <Star
              key={s}
              className="h-3.5 w-3.5 fill-[#B99657] text-[#B99657]"
              style={{
                animation: "fade-in 0.6s ease both",
                animationDelay: `${0.1 * s}s`,
              }}
            />
          ))}
        </div>

        {/* Brand Name */}
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white mb-2 font-display">
          {t(hotel.name)}
        </h1>

        {/* Tagline */}
        <p className="text-xs sm:text-sm font-medium tracking-widest text-[#B99657] uppercase">
          {locale === "ar"
            ? "أهلاً بكم في رحاب مكة المكرمة"
            : "Welcome to the Sanctuary of Makkah"}
        </p>

        {/* Shimmer loading indicator */}
        <div className="mt-8 h-1 w-36 overflow-hidden rounded-full bg-white/10">
          <div className="h-full w-full bg-gradient-to-r from-transparent via-[#B99657] to-transparent animate-[shimmer_1.2s_infinite]" />
        </div>
      </div>
    </div>
  );
}
