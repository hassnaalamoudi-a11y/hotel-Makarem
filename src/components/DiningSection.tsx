"use client";

import Link from "next/link";
import { Utensils, Coffee, Clock } from "lucide-react";
import { dining } from "@/lib/hotel-data";
import { useI18n } from "@/lib/i18n";
import { SectionHeading } from "@/components/SectionHeading";
import { SkeletonImage } from "@/components/SkeletonImage";
import { StaggerGroup, StaggerItem, Reveal } from "@/components/motion";

export function DiningSection() {
  const { t, locale } = useI18n();
  const isAr = locale === "ar";

  return (
    <section className="bg-band py-20 md:py-28 section-blend-top">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          overline={{ ar: "المطاعم والضيافة", en: "Dining & Cuisine" }}
          title={{ ar: "نكهات حجازية وعالمية أصيلة", en: "Authentic Hijazi & Global Flavors" }}
          subtitle={{
            ar: "استمتع بتشكيلة فريدة من الأطباق المحضرة بأيدي طهاة محترفين لتكتمل روعة إقامتكم.",
            en: "Savor a unique selection of dishes crafted by professional chefs to enrich your spiritual stay.",
          }}
        />

        <StaggerGroup className="mt-14 grid gap-8 md:grid-cols-3">
          {dining.map((item, i) => (
            <StaggerItem
              key={item.name.en}
              className="card-3d-hover dining-image-zoom group flex flex-col overflow-hidden rounded-[2rem] bg-card card-shadow"
            >
              <div className="relative h-60 overflow-hidden">
                <SkeletonImage
                  src={item.image}
                  alt={t(item.name)}
                  className="object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <span className="absolute top-4 start-4 flex items-center gap-1.5 rounded-full bg-card/90 px-3.5 py-1.5 text-xs font-bold text-heading backdrop-blur">
                  {i === 1 ? <Coffee className="h-3.5 w-3.5 text-gold" /> : <Utensils className="h-3.5 w-3.5 text-gold" />}
                  {isAr ? "خدمة ممتازة" : "5-Star Service"}
                </span>
              </div>

              <div className="flex flex-1 flex-col justify-between p-7">
                <div>
                  <h3 className="text-xl font-extrabold text-heading group-hover:text-gold transition-colors">
                    {t(item.name)}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-body">
                    {t(item.desc)}
                  </p>
                </div>

                <div className="mt-6 flex items-center justify-between border-t border-line/60 pt-4 text-xs text-muted">
                  <span className="flex items-center gap-1.5 font-semibold">
                    <Clock className="h-3.5 w-3.5 text-gold" />
                    {isAr ? "مفتوح يومياً" : "Open Daily"}
                  </span>
                  <Link
                    href="/contact"
                    className="font-bold text-gold hover:underline"
                  >
                    {isAr ? "استفسر عن الحجز ←" : "Inquire Now →"}
                  </Link>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}
