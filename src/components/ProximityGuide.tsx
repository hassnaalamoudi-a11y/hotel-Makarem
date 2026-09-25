"use client";

import { useEffect, useRef } from "react";
import { Clock, Footprints, Landmark, MapPin, Navigation, TrainFront } from "lucide-react";
import { hotel, landmarks } from "@/lib/hotel-data";
import { useI18n } from "@/lib/i18n";
import { SectionHeading } from "@/components/SectionHeading";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function ProximityGuide() {
  const { t, locale } = useI18n();
  const isAr = locale === "ar";

  const sectionRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // 1. PIN + SCRUB on Desktop: Spotlight Banner pins while landmarks scrub
      const mm = gsap.matchMedia();
      mm.add("(min-width: 1024px)", () => {
        if (pinRef.current && sectionRef.current) {
          ScrollTrigger.create({
            trigger: sectionRef.current,
            start: "top 15%",
            end: "bottom 85%",
            pin: pinRef.current,
            pinSpacing: false,
            scrub: 1.2,
          });
        }
      });

      // 2. SCRUBBED CARDS REVEAL with smooth staggered float
      if (cardsRef.current) {
        const cards = cardsRef.current.querySelectorAll(".proximity-card");
        gsap.fromTo(
          cards,
          { opacity: 0.25, y: 35, scale: 0.96 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            stagger: 0.18,
            ease: "power2.out",
            scrollTrigger: {
              trigger: cardsRef.current,
              start: "top 78%",
              end: "bottom 65%",
              scrub: 0.8,
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 md:py-24 lg:px-8 relative"
    >
      <SectionHeading
        overline={{ ar: "موقع استثنائي", en: "Prime Location" }}
        title={{ ar: "على بُعد خطوات من الحرم المكي الشريف", en: "Steps Away from the Holy Haram" }}
        subtitle={{
          ar: "موقع استراتيجي على طريق أجياد يضعك في قلب المشاعر، مع سهولة تامة للوصول إلى كافة البوابات والمعالم.",
          en: "Strategic location on Ajyad Street placing you in the heart of devotions, with effortless access to all gates and landmarks.",
        }}
      />

      <div className="mt-12 grid gap-8 lg:grid-cols-12 items-start">
        {/* Landmarks Cards with Scrubbed Stagger */}
        <div ref={cardsRef} className="lg:col-span-7 grid gap-4 sm:grid-cols-2">
          {landmarks.map((l, i) => (
            <div
              key={l.name.en}
              className="proximity-card group relative overflow-hidden rounded-3xl bg-card p-6 card-shadow border border-line/50 transition-all duration-500 hover:-translate-y-1.5 hover:border-gold hover:card-shadow-hover hover:scale-[1.02]"
            >
              <div className="flex items-center justify-between">
                <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gold-soft text-gold transition-all duration-500 group-hover:bg-gold group-hover:text-white group-hover:scale-110">
                  {i === 3 ? <TrainFront className="h-5 w-5" /> : <Footprints className="h-5 w-5" />}
                </span>
                <span className="rounded-full bg-gold-soft/60 px-3 py-1 text-xs font-bold text-gold">
                  {t(l.time)}
                </span>
              </div>
              <h3 className="mt-4 font-bold text-heading group-hover:text-gold transition-colors">
                {t(l.name)}
              </h3>
              <p className="mt-1.5 text-xs text-muted leading-relaxed">
                {t(l.desc)}
              </p>
              <div className="mt-4 flex items-center justify-between border-t border-line/60 pt-3 text-xs">
                <span className="text-muted">{isAr ? "المسافة التقريبية:" : "Distance:"}</span>
                <span className="font-extrabold text-heading font-mono" dir="ltr">{t(l.distance)}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Location Spotlight Feature Banner (Pinned on desktop during scrub) */}
        <div ref={pinRef} className="lg:col-span-5 will-change-transform">
          <div className="relative overflow-hidden rounded-[2.5rem] bg-brand p-8 text-[var(--on-brand)] card-shadow border border-gold/30">
              <div className="absolute top-0 end-0 -mt-8 -me-8 h-44 w-44 rounded-full bg-gold/15 blur-3xl pointer-events-none" />
              <div className="relative z-10 flex flex-col gap-5">
                <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-semibold text-gold backdrop-blur-sm self-start">
                  <MapPin className="h-3.5 w-3.5" />
                  {isAr ? "شارع أجياد العام" : "Ajyad Main Street"}
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                  {isAr ? "٣٠٠ متر فقط تفصلك عن ساحات الحرم" : "Only 300m Away from the Haram Piazza"}
                </h3>
                <p className="text-sm leading-relaxed opacity-85">
                  {isAr
                    ? "لا حاجة لوسائل المواصلات أو الانتظار؛ خطوات يسيرة سيراً على الأقدام تأخذك مباشرة إلى ساحات الطواف والصلوات."
                    : "No need for shuttles or long waits; effortless walking steps take you directly to the Holy Mosque."}
                </p>

                <div className="flex flex-col gap-3 pt-2">
                  <a
                    href={hotel.directionsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="pill pill-gold btn-sweep h-12 text-sm font-bold"
                  >
                    <Navigation className="h-4 w-4" />
                    {isAr ? "فتح الموقع في خرائط Google" : "Open in Google Maps"}
                  </a>
                </div>
              </div>
            </div>
        </div>
      </div>
    </section>
  );
}
