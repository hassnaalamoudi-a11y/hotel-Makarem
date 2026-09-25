"use client";

import { useEffect, useState } from "react";
import { useI18n } from "@/lib/i18n";
import { useInViewOnce } from "./motion";

const AR_DIGITS = ["٠", "١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩"];

/** Counts up from 0 when scrolled into view (easeOutExpo) */
export function AnimatedCounter({
  value,
  suffix = "",
  decimals = 0,
  duration = 1800,
}: {
  value: number;
  suffix?: string;
  decimals?: number;
  duration?: number;
}) {
  const { ref, inView } = useInViewOnce<HTMLSpanElement>("-40px");
  const [display, setDisplay] = useState(0);
  const { locale } = useI18n();

  useEffect(() => {
    if (!inView) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDisplay(value);
      return;
    }
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = p === 1 ? 1 : 1 - Math.pow(2, -10 * p);
      setDisplay(eased * value);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value, duration]);

  const formatted = display.toFixed(decimals);
  const numStr =
    locale === "ar"
      ? formatted.replace(/\d/g, (d) => AR_DIGITS[Number(d)]).replace(".", "٫")
      : formatted;

  return (
    <span ref={ref} className="tabular-nums">
      {numStr}
      {suffix}
    </span>
  );
}
