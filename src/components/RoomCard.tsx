"use client";

import Link from "next/link";
import { ArrowLeft, ArrowRight, BedDouble, Eye, Maximize, Users } from "lucide-react";
import type { Room } from "@/lib/hotel-data";
import { useI18n } from "@/lib/i18n";
import { SkeletonImage } from "./SkeletonImage";

export function RoomCard({
  room,
  onQuickView,
}: {
  room: Room;
  onQuickView?: (room: Room) => void;
}) {
  const { t, locale } = useI18n();

  return (
    <article className="card-shadow group flex h-full flex-col overflow-hidden rounded-3xl bg-card border border-line/50 transition-all duration-500 hover:-translate-y-1.5 hover:card-shadow-hover hover:border-gold">
      <div className="relative block h-60 overflow-hidden">
        <Link
          href={`/rooms/${room.slug}`}
          className="absolute inset-0"
          aria-label={t(room.name)}
        >
          <SkeletonImage
            src={room.images[0]}
            alt={t(room.name)}
            className="object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        </Link>
        <div
          className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none"
        />
        {room.badge ? (
          <span className="absolute top-4 start-4 rounded-full bg-gold px-3.5 py-1.5 text-xs font-semibold text-white shadow-md pointer-events-none">
            {t(room.badge)}
          </span>
        ) : null}
        
        {/* Quick view floating action button */}
        {onQuickView ? (
          <button
            onClick={() => onQuickView(room)}
            className="absolute top-4 end-4 flex h-9 w-9 items-center justify-center rounded-full bg-card/90 text-heading backdrop-blur-md opacity-100 sm:opacity-0 transition-all duration-300 sm:group-hover:opacity-100 hover:bg-gold hover:text-white shadow-sm"
            title={locale === "ar" ? "عرض سريع" : "Quick view"}
            aria-label={locale === "ar" ? "عرض سريع" : "Quick view"}
          >
            <Eye className="h-4 w-4" />
          </button>
        ) : null}

        <span className="absolute bottom-4 end-4 rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-heading backdrop-blur-sm pointer-events-none shadow-xs">
          {t(room.view)}
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-3.5 p-6">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-xl font-bold tracking-tight text-heading">
            <Link href={`/rooms/${room.slug}`} className="transition-colors hover:text-gold">
              {t(room.name)}
            </Link>
          </h3>
        </div>

        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-muted">
          <span className="flex items-center gap-1.5">
            <Maximize className="h-3.5 w-3.5 text-gold" />
            {room.size}
          </span>
          <span className="flex items-center gap-1.5">
            <Users className="h-3.5 w-3.5 text-gold" />
            {t(room.capacity)}
          </span>
          <span className="flex items-center gap-1.5">
            <BedDouble className="h-3.5 w-3.5 text-gold" />
            {t(room.beds)}
          </span>
        </div>

        <p className="flex-1 text-sm leading-relaxed text-body">{t(room.short)}</p>

        <div className="mt-1 flex flex-col gap-3 border-t border-line/60 pt-4">
          <div className="flex flex-wrap items-baseline justify-between gap-x-2">
            <span className="text-xs text-muted">{locale === "ar" ? "ابتداءً من" : "From"}</span>
            <div className="flex items-baseline gap-2">
              {room.oldPrice ? (
                <span className="text-xs text-muted/70 line-through" dir="ltr">
                  {room.oldPrice}
                </span>
              ) : null}
              <span className="text-2xl font-extrabold text-heading" dir="ltr">
                {room.priceFrom}
              </span>
              <span className="text-xs text-muted">{locale === "ar" ? "ر.س" : "SAR"}</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <Link
              href={`/rooms/${room.slug}`}
              className="group/link inline-flex min-h-[42px] items-center justify-center gap-1.5 rounded-full bg-gold-soft px-3 py-2 text-xs font-bold text-heading transition-colors hover:bg-gold hover:text-white"
            >
              {locale === "ar" ? "التفاصيل" : "Details"}
              {locale === "ar" ? (
                <ArrowLeft className="h-3 w-3 transition-transform duration-300 group-hover/link:-translate-x-0.5" />
              ) : (
                <ArrowRight className="h-3 w-3 transition-transform duration-300 group-hover/link:translate-x-0.5" />
              )}
            </Link>

            <Link
              href={`/contact?room=${room.slug}#booking`}
              className="pill pill-primary btn-sweep min-h-[42px] text-xs font-bold"
            >
              {locale === "ar" ? "احجز الآن" : "Book"}
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
