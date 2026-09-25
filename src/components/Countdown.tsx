"use client";

import { useEffect, useState } from "react";
import { Timer } from "lucide-react";
import { useI18n } from "@/lib/i18n";

const AR_DIGITS = ["٠", "١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩"];

function toDigits(n: number, locale: string) {
  const s = String(n).padStart(2, "0");
  return locale === "ar" ? s.replace(/\d/g, (d) => AR_DIGITS[Number(d)]) : s;
}

/** Live countdown to an ISO deadline — hides itself when expired */
export function Countdown({ deadline, compact = false }: { deadline: string; compact?: boolean }) {
  const { locale } = useI18n();
  const [now, setNow] = useState<number | null>(null);

  useEffect(() => {
    setNow(Date.now());
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  if (now === null) return null; // avoid hydration mismatch

  const target = new Date(deadline).getTime();
  const diff = Math.max(0, target - now);
  if (diff === 0) return null;

  const days = Math.floor(diff / 86400000);
  const hours = Math.floor((diff % 86400000) / 3600000);
  const mins = Math.floor((diff % 3600000) / 60000);
  const secs = Math.floor((diff % 60000) / 1000);

  const units = [
    { v: days, label: locale === "ar" ? "يوم" : "Days" },
    { v: hours, label: locale === "ar" ? "ساعة" : "Hours" },
    { v: mins, label: locale === "ar" ? "دقيقة" : "Min" },
    { v: secs, label: locale === "ar" ? "ثانية" : "Sec" },
  ];

  return (
    <div className="flex flex-wrap items-center gap-3">
      <span className="overline-tag flex items-center gap-1.5 !text-gold">
        <Timer className="h-4 w-4" />
        {locale === "ar" ? "ينتهي خلال" : "Ends in"}
      </span>
      <div className="flex gap-1.5" dir="ltr">
        {units.map((u) => (
          <div
            key={u.label}
            className={`flex flex-col items-center rounded-xl border border-line bg-card px-2 ${
              compact ? "min-w-[44px] py-1.5" : "min-w-[52px] py-2"
            }`}
          >
            <span
              className={`tabular-nums font-bold text-heading ${
                compact ? "text-base" : "text-xl"
              }`}
            >
              {toDigits(u.v, locale)}
            </span>
            <span className="text-[0.6rem] text-muted">{u.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
