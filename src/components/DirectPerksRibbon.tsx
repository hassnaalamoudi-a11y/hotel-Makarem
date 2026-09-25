"use client";

import { CalendarCheck, Coffee, ShieldCheck, Sparkles } from "lucide-react";
import { directPerks } from "@/lib/hotel-data";
import { useI18n } from "@/lib/i18n";
import { StaggerGroup, StaggerItem } from "@/components/motion";

const iconMap = {
  "shield-check": ShieldCheck,
  "calendar-check": CalendarCheck,
  sparkles: Sparkles,
  coffee: Coffee,
};

export function DirectPerksRibbon() {
  const { t } = useI18n();

  return (
    <section className="mx-auto w-full max-w-7xl px-4 pt-14 sm:px-6 lg:px-8">
      <div className="rounded-[2.5rem] bg-gradient-to-r from-surface via-card to-surface p-6 sm:p-8 card-shadow border border-line/70">
        <StaggerGroup className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {directPerks.map((p) => {
            const Icon = iconMap[p.icon as keyof typeof iconMap] ?? Sparkles;
            return (
              <StaggerItem
                key={p.title.en}
                className="group flex items-start gap-4 p-2 rounded-2xl transition-all duration-300 hover:bg-gold-soft/30"
              >
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gold-soft text-gold transition-colors duration-500 group-hover:bg-gold group-hover:text-white">
                  <Icon className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="text-sm font-bold text-heading group-hover:text-gold transition-colors">
                    {t(p.title)}
                  </h3>
                  <p className="mt-1 text-xs leading-relaxed text-muted">
                    {t(p.desc)}
                  </p>
                </div>
              </StaggerItem>
            );
          })}
        </StaggerGroup>
      </div>
    </section>
  );
}
