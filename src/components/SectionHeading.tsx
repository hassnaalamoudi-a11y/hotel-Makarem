"use client";

import { useI18n } from "@/lib/i18n";
import type { L } from "@/lib/hotel-data";
import { Reveal } from "./motion";

/** Centered section heading with gold overline tag */
export function SectionHeading({
  overline,
  title,
  subtitle,
  align = "center",
}: {
  overline: L;
  title: L;
  subtitle?: L;
  align?: "center" | "start";
}) {
  const { t } = useI18n();
  const alignCls =
    align === "center" ? "items-center text-center" : "items-start text-start";
  return (
    <Reveal
      className={`flex flex-col gap-4 ${alignCls}`}
    >
      <span className="overline-tag">{t(overline)}</span>
      <h2 className="font-display text-2xl sm:text-3xl font-extrabold leading-[1.15] tracking-tight text-heading md:text-[2.75rem]">
        {t(title)}
      </h2>
      {subtitle ? (
        <p className="max-w-2xl text-sm sm:text-base leading-relaxed text-muted md:text-lg">
          {t(subtitle)}
        </p>
      ) : null}
    </Reveal>
  );
}
