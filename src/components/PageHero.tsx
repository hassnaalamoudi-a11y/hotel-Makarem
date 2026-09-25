"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { L } from "@/lib/hotel-data";
import { useI18n } from "@/lib/i18n";

/** Inner-page hero: large rounded photo banner with breadcrumb */
export function PageHero({ image, overline, title, subtitle, crumbs }: {
  image: string;
  overline: L;
  title: L;
  subtitle?: L;
  crumbs?: { href: string; label: L }[];
}) {
  const { t, locale, dir } = useI18n();
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    const id = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(id);
  }, []);
  const StartChevron = dir === "rtl" ? ChevronRight : ChevronLeft;

  const rise = (delay: number) => ({
    animation: mounted ? `reveal-up 0.8s cubic-bezier(0.22,1,0.36,1) ${delay}s both` : "none",
    opacity: mounted ? undefined : 0,
  });

  return (
    <section className="mx-auto w-full max-w-7xl px-4 pt-28 sm:px-6 lg:px-8">
      <div className="relative flex min-h-[300px] items-end overflow-hidden rounded-[2rem] md:min-h-[360px]">
        {/* Slow zoom-out on load */}
        <div
          className="absolute inset-0"
          style={{
            animation: mounted ? "zoom-soft 2.4s cubic-bezier(0.22,1,0.36,1) both" : "none",
            transformOrigin: "center",
          }}
        >
          <Image src={image} alt={t(title)} fill priority className="object-cover" sizes="100vw" />
        </div>
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to top, rgb(var(--overlay-ink) / 0.85), rgb(var(--overlay-ink) / 0.35) 55%, rgb(var(--overlay-ink) / 0.15))",
          }}
          aria-hidden
        />

        <div className="relative w-full p-7 md:p-12">
          {/* Breadcrumb */}
          {crumbs ? (
            <nav
              aria-label="Breadcrumb"
              style={rise(0.1)}
              className="mb-4 flex flex-wrap items-center gap-1.5 text-xs text-white/75"
            >
              {crumbs.map((c, i) => (
                <span key={c.href} className="flex items-center gap-1.5">
                  {i > 0 && <StartChevron className="h-3.5 w-3.5 opacity-60" aria-hidden />}
                  {i === crumbs.length - 1 ? (
                    <span aria-current="page" className="font-semibold text-gold">
                      {t(c.label)}
                    </span>
                  ) : (
                    <Link href={c.href} className="transition-colors hover:text-white">
                      {t(c.label)}
                    </Link>
                  )}
                </span>
              ))}
            </nav>
          ) : null}

          <span className="overline-tag !text-gold" style={rise(0.2)}>
            {t(overline)}
          </span>
          <h1 style={rise(0.3)} className="mt-3 text-3xl sm:text-4xl font-extrabold tracking-tight text-white md:text-5xl">
            {t(title)}
          </h1>
          {subtitle ? (
            <p style={rise(0.45)} className="mt-4 max-w-2xl text-sm sm:text-base leading-relaxed text-white/85 md:text-lg">
              {t(subtitle)}
            </p>
          ) : null}
        </div>
      </div>
    </section>
  );
}
