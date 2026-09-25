"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { BedDouble, Check, Maximize, Phone, Users, X } from "lucide-react";
import { hotel, Room } from "@/lib/hotel-data";
import { useI18n } from "@/lib/i18n";
import { SkeletonImage } from "@/components/SkeletonImage";

interface RoomQuickViewModalProps {
  room: Room | null;
  onClose: () => void;
}

export function RoomQuickViewModal({ room, onClose }: RoomQuickViewModalProps) {
  const { t, locale } = useI18n();
  const [activeImg, setActiveImg] = useState(0);

  useEffect(() => {
    setActiveImg(0);
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (room) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [room, onClose]);

  if (!room) return null;

  const isAr = locale === "ar";

  const specs = [
    { icon: Maximize, value: room.size, label: isAr ? "المساحة" : "Size" },
    { icon: Users, value: t(room.capacity), label: isAr ? "السعة" : "Capacity" },
    { icon: BedDouble, value: t(room.beds), label: isAr ? "الأسرة" : "Beds" },
    { icon: Check, value: t(room.view), label: isAr ? "الإطلالة" : "View" },
  ];

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/75 p-4 backdrop-blur-md transition-opacity duration-300 animate-[fade-in_0.3s_ease_both]"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={t(room.name)}
    >
      <div
        className="relative max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-[2.5rem] bg-card card-shadow border border-line animate-[modal-in_0.35s_cubic-bezier(0.22,1,0.36,1)_both]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 end-4 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-surface/80 text-heading backdrop-blur-md transition-colors hover:bg-gold hover:text-white"
          aria-label={isAr ? "إغلاق" : "Close"}
        >
          <X className="h-5 w-5" />
        </button>

        <div className="grid lg:grid-cols-12 gap-6 p-6 sm:p-8">
          {/* Photos side */}
          <div className="lg:col-span-6 flex flex-col gap-3">
            <div className="relative h-64 sm:h-80 w-full overflow-hidden rounded-2xl card-shadow">
              <SkeletonImage
                src={room.images[activeImg] || room.images[0]}
                alt={t(room.name)}
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
              {room.badge ? (
                <span className="absolute top-4 start-4 rounded-full bg-gold px-3.5 py-1.5 text-xs font-bold text-white shadow-md">
                  {t(room.badge)}
                </span>
              ) : null}
            </div>

            {/* Thumbnails */}
            {room.images.length > 1 ? (
              <div className="grid grid-cols-4 gap-2">
                {room.images.map((img, idx) => (
                  <button
                    key={img}
                    onClick={() => setActiveImg(idx)}
                    className={`relative h-16 overflow-hidden rounded-xl border-2 transition-all ${
                      activeImg === idx ? "border-gold scale-95" : "border-transparent opacity-60 hover:opacity-100"
                    }`}
                  >
                    <SkeletonImage src={img} alt="" sizes="100px" />
                  </button>
                ))}
              </div>
            ) : null}
          </div>

          {/* Details side */}
          <div className="lg:col-span-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2">
                <span className="overline-tag">{isAr ? "نظرة سريعة" : "Quick View"}</span>
              </div>
              <h2 className="mt-2 text-2xl font-extrabold text-heading">
                {t(room.name)}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-body">
                {t(room.description)}
              </p>

              {/* Specs Grid */}
              <div className="mt-5 grid grid-cols-2 gap-2.5">
                {specs.map((s) => (
                  <div key={s.label} className="flex items-center gap-2.5 rounded-xl bg-surface p-2.5 border border-line/50">
                    <s.icon className="h-4 w-4 text-gold shrink-0" />
                    <div>
                      <p className="text-[0.65rem] text-muted">{s.label}</p>
                      <p className="text-xs font-bold text-heading truncate">{s.value}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Top features */}
              <div className="mt-5">
                <p className="text-xs font-bold text-heading mb-2">
                  {isAr ? "أبرز مميزات الغرفة:" : "Key Features:"}
                </p>
                <ul className="grid grid-cols-2 gap-1.5 text-xs text-muted">
                  {room.features[locale].slice(0, 4).map((f) => (
                    <li key={f} className="flex items-center gap-1.5 truncate">
                      <Check className="h-3 w-3 text-gold shrink-0" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Price & Action */}
            <div className="mt-6 border-t border-line/60 pt-4 flex flex-col gap-3">
              <div className="flex items-baseline justify-between">
                <div>
                  <span className="text-xs text-muted block">{isAr ? "سعر الليلة من" : "Starting from"}</span>
                  <div className="flex items-baseline gap-2">
                    {room.oldPrice ? (
                      <span className="text-sm text-muted/70 line-through" dir="ltr">
                        {room.oldPrice}
                      </span>
                    ) : null}
                    <span className="text-3xl font-extrabold text-heading" dir="ltr">
                      {room.priceFrom}
                    </span>
                    <span className="text-xs text-muted">
                      {isAr ? "ر.س / ليلة" : "SAR / night"}
                    </span>
                  </div>
                </div>

                <Link
                  href={`/rooms/${room.slug}`}
                  className="text-xs font-bold text-gold hover:underline"
                >
                  {isAr ? "عرض التفاصيل الكاملة ←" : "View Full Details →"}
                </Link>
              </div>

              <div className="flex flex-col sm:grid sm:grid-cols-2 gap-2">
                <Link
                  href={`/contact?room=${room.slug}`}
                  className="pill pill-primary btn-sweep h-12 text-sm font-bold"
                  onClick={onClose}
                >
                  {isAr ? "احجز الغرفة الآن" : "Book Room Now"}
                </Link>
                <a
                  href={`tel:${hotel.phoneHref}`}
                  className="pill pill-ghost h-12 text-sm font-bold"
                >
                  <Phone className="h-4 w-4" />
                  <span dir="ltr">{hotel.phone}</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
