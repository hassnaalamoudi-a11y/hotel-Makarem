"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { CalendarCheck, Phone } from "lucide-react";
import { hotel } from "@/lib/hotel-data";
import { useI18n } from "@/lib/i18n";

/** Sticky bottom "Book Now" bar — mobile only, hides on scroll down */
export function MobileBookBar() {
  const { locale } = useI18n();
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    let last = scrollY;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const v = scrollY;
        setVisible(v < last || v < 80);
        last = v;
      });
    };
    addEventListener("scroll", onScroll, { passive: true });
    return () => {
      removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      className="safe-bottom fixed inset-x-0 bottom-0 z-[55] border-t border-line bg-surface/95 p-3 backdrop-blur-md transition-transform duration-300 md:hidden"
      style={{
        transform: visible ? "translateY(0)" : "translateY(110%)",
        transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
      }}
    >
      <div className="flex items-center gap-3">
        <a
          href={`tel:${hotel.phoneHref}`}
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-line text-heading"
          aria-label={locale === "ar" ? "اتصل بنا" : "Call us"}
        >
          <Phone className="h-5 w-5" />
        </a>
        <Link href={hotel.bookingUrl} className="pill pill-primary btn-sweep h-12 flex-1 text-base">
          <CalendarCheck className="h-5 w-5" />
          {locale === "ar" ? "احجز الآن" : "Book Now"}
        </Link>
      </div>
    </div>
  );
}
