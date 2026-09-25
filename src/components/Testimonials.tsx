"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";
import { testimonials } from "@/lib/hotel-data";
import { useI18n } from "@/lib/i18n";

/**
 * Large rounded testimonial card with quote, name, avatar and
 * slider arrows. Auto-advances, pauses on hover, swipeable.
 */
export function Testimonials() {
  const { t, locale, dir } = useI18n();
  const [idx, setIdx] = useState(0);
  const [paused, setPaused] = useState(false);
  const touchX = useRef<number | null>(null);
  const count = testimonials.length;

  const go = useCallback((d: number) => setIdx((i) => (i + d + count) % count), [count]);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => go(1), 6500);
    return () => clearInterval(id);
  }, [paused, go]);

  const item = testimonials[idx];
  const Prev = dir === "rtl" ? ChevronRight : ChevronLeft;
  const Next = dir === "rtl" ? ChevronLeft : ChevronRight;

  const initials = (name: string) =>
    name
      .split(" ")
      .slice(0, 2)
      .map((w) => w[0])
      .join("");

  return (
    <div
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={(e) => {
        touchX.current = e.touches[0].clientX;
      }}
      onTouchEnd={(e) => {
        if (touchX.current === null) return;
        const dx = e.changedTouches[0].clientX - touchX.current;
        if (Math.abs(dx) > 48) go(dx < 0 ? 1 : -1);
        touchX.current = null;
      }}
    >
      <figure
        key={idx}
        className={`card-shadow relative flex min-h-[320px] flex-col items-center gap-5 rounded-[2rem] bg-surface px-7 py-10 text-center md:min-h-[280px] md:px-14 ${
          dir === "rtl" ? "anim-slide-rtl" : "anim-slide-ltr"
        }`}
      >
        <Quote
          className="absolute -top-6 start-1/2 h-12 w-12 -translate-x-1/2 rounded-full bg-gold p-2.5 text-white rtl:translate-x-1/2"
          aria-hidden
        />
        <div className="flex gap-1 pt-2" aria-label={`${item.rating}/5`}>
          {Array.from({ length: item.rating }).map((_, i) => (
            <Star key={i} className="h-4 w-4 fill-gold text-gold" />
          ))}
        </div>
        <blockquote className="text-lg leading-loose text-body md:text-xl">
          “{t(item.text)}”
        </blockquote>
        <figcaption className="mt-auto flex flex-col items-center gap-2.5">
          {item.avatar ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={item.avatar}
              alt={t(item.name)}
              className="h-12 w-12 rounded-full object-cover ring-2 ring-gold"
            />
          ) : (
            <span
              className="flex h-12 w-12 items-center justify-center rounded-full bg-gold-soft text-sm font-bold text-brand"
              aria-hidden
            >
              {initials(t(item.name))}
            </span>
          )}
          <p className="font-bold text-heading">{t(item.name)}</p>
          <p className="text-xs text-muted">{t(item.country)}</p>
        </figcaption>
      </figure>

      {/* Controls */}
      <div className="mt-7 flex items-center justify-center gap-5">
        <button
          onClick={() => go(-1)}
          aria-label={locale === "ar" ? "السابق" : "Previous"}
          className="flex h-11 w-11 items-center justify-center rounded-full border border-line text-heading transition-all hover:border-brand hover:bg-brand hover:text-[var(--on-brand)]"
        >
          <Prev className="h-5 w-5" />
        </button>
        <div className="flex gap-2">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setIdx(i)}
              aria-label={`Testimonial ${i + 1}`}
              className={`h-2 rounded-full transition-all duration-500 ${
                i === idx ? "w-7 bg-gold" : "w-2 bg-line hover:bg-gold/50"
              }`}
            />
          ))}
        </div>
        <button
          onClick={() => go(1)}
          aria-label={locale === "ar" ? "التالي" : "Next"}
          className="flex h-11 w-11 items-center justify-center rounded-full border border-line text-heading transition-all hover:border-brand hover:bg-brand hover:text-[var(--on-brand)]"
        >
          <Next className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
