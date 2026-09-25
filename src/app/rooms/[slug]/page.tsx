"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  BedDouble,
  Check,
  ChevronLeft,
  ChevronRight,
  Expand,
  Maximize,
  MessageCircle,
  Phone,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react";
import { hotel, rooms, type Room } from "@/lib/hotel-data";
import { useI18n } from "@/lib/i18n";
import { EASE, Reveal, StaggerGroup, StaggerItem } from "@/components/motion";
import { RoomCard } from "@/components/RoomCard";
import { SkeletonImage } from "@/components/SkeletonImage";
import { RoomQuickViewModal } from "@/components/RoomQuickViewModal";

export default function RoomDetailPage() {
  const params = useParams<{ slug: string }>();
  const { t, locale, dir } = useI18n();
  const [activeImg, setActiveImg] = useState(0);
  const [lightbox, setLightbox] = useState(false);
  const [quickViewRoom, setQuickViewRoom] = useState<Room | null>(null);

  const room = rooms.find((r) => r.slug === params.slug);
  const GoNext = dir === "rtl" ? ChevronLeft : ChevronRight;
  const GoPrev = dir === "rtl" ? ChevronRight : ChevronLeft;

  const isAr = locale === "ar";

  if (!room) {
    return (
      <section className="flex min-h-[70vh] flex-col items-center justify-center gap-6 px-5 pt-28 text-center">
        <h1 className="text-3xl font-extrabold text-heading">
          {isAr ? "الغرفة غير موجودة" : "Room not found"}
        </h1>
        <Link href="/rooms" className="pill pill-primary h-12 px-8 text-sm font-bold">
          {isAr ? "العودة لجميع الغرف" : "Back to All Rooms"}
        </Link>
      </section>
    );
  }

  const others = rooms.filter((r) => r.slug !== room.slug).slice(0, 3);

  const specs = [
    { icon: Maximize, value: room.size, label: isAr ? "المساحة الإجمالية" : "Total Size" },
    { icon: Users, value: t(room.capacity), label: isAr ? "السعة القصوى" : "Capacity" },
    { icon: BedDouble, value: t(room.beds), label: isAr ? "ترتيب الأسرة" : "Beds Layout" },
    { icon: Check, value: t(room.view), label: isAr ? "نوع الإطلالة" : "View Type" },
  ];

  return (
    <>
      {/* Breadcrumb + gallery */}
      <section className="mx-auto w-full max-w-7xl px-4 pt-28 sm:px-6 lg:px-8">
        <Reveal>
          <nav aria-label="Breadcrumb" className="mb-5 flex items-center gap-1.5 text-xs text-muted">
            <Link href="/" className="transition-colors hover:text-heading font-medium">
              {isAr ? "الرئيسية" : "Home"}
            </Link>
            <GoPrev className="h-3.5 w-3.5 opacity-60" aria-hidden />
            <Link href="/rooms" className="transition-colors hover:text-heading font-medium">
              {isAr ? "الغرف والأجنحة" : "Rooms"}
            </Link>
            <GoPrev className="h-3.5 w-3.5 opacity-60" aria-hidden />
            <span aria-current="page" className="font-bold text-gold">
              {t(room.name)}
            </span>
          </nav>
        </Reveal>

        <div className="grid gap-3 lg:grid-cols-[2.4fr_1fr]">
          <button
            onClick={() => setLightbox(true)}
            className="group relative h-[320px] cursor-zoom-in overflow-hidden rounded-[2.5rem] card-shadow border border-line/60 focus-visible:outline-gold md:h-[540px]"
            aria-label={isAr ? "فتح المعرض بالحجم الكامل" : "Open gallery fullscreen"}
          >
            <div key={activeImg} className="absolute inset-0 anim-fade">
              <SkeletonImage
                src={room.images[activeImg]}
                alt={t(room.name)}
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 66vw"
                priority
              />
            </div>
            {room.badge ? (
              <span className="absolute top-5 start-5 z-10 rounded-full bg-gold px-4 py-2 text-xs font-bold text-white shadow-md">
                {t(room.badge)}
              </span>
            ) : null}
            <span className="absolute top-5 end-5 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-surface/90 text-heading opacity-0 backdrop-blur-md transition-opacity duration-300 group-hover:opacity-100 shadow-md">
              <Expand className="h-5 w-5" />
            </span>
          </button>

          <div className="grid grid-cols-3 gap-3 lg:grid-cols-1">
            {room.images.map((img, i) => (
              <button
                key={img}
                onClick={() => setActiveImg(i)}
                className={`relative h-24 overflow-hidden rounded-2xl transition-all duration-300 lg:h-[172px] border-2 ${
                  activeImg === i
                    ? "border-gold scale-[0.98] shadow-md"
                    : "border-transparent opacity-60 hover:opacity-100"
                }`}
                aria-label={`Image ${i + 1}`}
              >
                <SkeletonImage src={img} alt="" sizes="250px" />
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Details */}
      <section className="mx-auto w-full max-w-7xl px-4 py-14 sm:px-6 md:py-20 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.6fr_1fr]">
          <div>
            <Reveal>
              <span className="overline-tag">{isAr ? "تفاصيل الإقامة" : "Stay Details"}</span>
              <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-heading md:text-5xl">
                {t(room.name)}
              </h1>
              <p className="mt-5 text-base leading-loose text-body md:text-lg">
                {t(room.description)}
              </p>
            </Reveal>

            {/* Specs Grid */}
            <StaggerGroup className="mt-9 grid grid-cols-2 gap-4 md:grid-cols-4">
              {specs.map((s) => (
                <StaggerItem
                  key={s.label}
                  className="flex flex-col items-center gap-2 rounded-2xl bg-card p-5 text-center card-shadow border border-line/50"
                >
                  <s.icon className="h-6 w-6 text-gold" />
                  <span className="text-sm font-extrabold text-heading">{s.value}</span>
                  <span className="text-xs text-muted font-medium">{s.label}</span>
                </StaggerItem>
              ))}
            </StaggerGroup>

            {/* Room Amenities */}
            <Reveal className="mt-12" delay={0.05}>
              <h2 className="text-2xl font-extrabold tracking-tight text-heading">
                {isAr ? "مرافق وخدمات الغرفة" : "Room Amenities & Perks"}
              </h2>
              <ul className="mt-6 grid gap-x-8 gap-y-3.5 sm:grid-cols-2">
                {room.features[locale].map((f) => (
                  <li key={f} className="flex items-center gap-3 text-body text-sm">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gold-soft text-gold">
                      <Check className="h-3.5 w-3.5" />
                    </span>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </Reveal>

            {/* Direct Booking Guarantee Card */}
            <Reveal className="mt-12" delay={0.1}>
              <div className="rounded-3xl bg-surface p-6 border border-line/70 card-shadow flex items-start gap-4">
                <ShieldCheck className="h-7 w-7 text-gold shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-heading text-base">
                    {isAr ? "ضمان الحجز المباشر عبر الموقع" : "Direct Booking Guarantee"}
                  </h3>
                  <p className="mt-1 text-xs sm:text-sm text-muted leading-relaxed">
                    {isAr
                      ? "احجز هذه الغرفة مباشرة لتحصل على أفضل سعر مضمون، تأكيد فوري، وأولوية في الطوابق العليا مع ضيافة القهوة الحجازية."
                      : "Book this room directly for guaranteed best rates, instant confirmation, high floor priority, and welcome treats."}
                  </p>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Sticky booking panel */}
          <aside>
            <Reveal delay={0.1} className="sticky top-28">
              <div className="overflow-hidden rounded-[2.5rem] bg-card card-shadow border border-line/70">
                <div className="bg-[#221B17] px-7 py-7 text-white border-b border-gold/30">
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-gold">
                    {isAr ? "سعر الليلة الواحدة ابتداءً من" : "Per Night Starting From"}
                  </p>
                  <p className="mt-2 flex items-baseline gap-3">
                    {room.oldPrice ? (
                      <span className="text-lg text-white/50 line-through" dir="ltr">
                        {room.oldPrice}
                      </span>
                    ) : null}
                    <span className="text-4xl font-extrabold text-gold" dir="ltr">
                      {room.priceFrom}
                    </span>
                    <span className="text-sm text-white/80">
                      {isAr ? "ر.س / ليلة" : "SAR / night"}
                    </span>
                  </p>
                </div>

                <div className="flex flex-col gap-3.5 p-7">
                  <Link
                    href={`/contact?room=${room.slug}#booking`}
                    className="pill pill-gold btn-sweep h-13 text-sm font-extrabold text-center justify-center shadow-md"
                  >
                    {isAr ? "احجز هذه الغرفة الآن" : "Book This Room Now"}
                  </Link>

                  <a
                    href={`https://wa.me/${hotel.whatsapp.replace("+", "")}?text=${encodeURIComponent(
                      isAr
                        ? `مرحباً، أود حجز ${t(room.name)} في فندق مكارم أجياد مكة`
                        : `Hello, I would like to book ${t(room.name)} at Makarem Ajyad Makkah Hotel`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="pill pill-primary h-12 text-sm font-bold"
                  >
                    <MessageCircle className="h-4 w-4" />
                    {isAr ? "حجز سريع عبر واتساب" : "Instant WhatsApp Booking"}
                  </a>

                  <a href={`tel:${hotel.phoneHref}`} className="pill pill-ghost h-11 text-xs font-semibold">
                    <Phone className="h-3.5 w-3.5 text-gold" />
                    <span dir="ltr">{hotel.phone}</span>
                  </a>

                  <div className="mt-2 flex items-center justify-center gap-2 text-center text-xs text-muted border-t border-line/60 pt-3">
                    <Sparkles className="h-3.5 w-3.5 text-gold" />
                    <span>
                      {isAr
                        ? "إلغاء مجاني حتى ٤٨ ساعة قبل الوصول"
                        : "Free cancellation up to 48h before arrival"}
                    </span>
                  </div>
                </div>
              </div>
            </Reveal>
          </aside>
        </div>
      </section>

      {/* Other rooms */}
      <section className="bg-band py-16 md:py-24">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal className="flex items-end justify-between gap-6">
            <div>
              <span className="overline-tag">{isAr ? "اكتشف المزيد" : "Explore More"}</span>
              <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-heading md:text-4xl">
                {isAr ? "خيارات إقامة أخرى قد تناسبك" : "You May Also Like"}
              </h2>
            </div>
            <Link
              href="/rooms"
              className="group hidden items-center gap-2 text-sm font-bold text-heading hover:text-gold md:flex"
            >
              {isAr ? "عرض جميع الغرف" : "All Rooms"}
              {dir === "rtl" ? (
                <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
              ) : (
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              )}
            </Link>
          </Reveal>

          <StaggerGroup className="mt-10 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {others.map((r) => (
              <StaggerItem key={r.slug}>
                <RoomCard room={r} onQuickView={(rm) => setQuickViewRoom(rm)} />
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>

      {/* Lightbox */}
      {lightbox ? (
        <div
          className="fixed inset-0 z-[120] flex items-center justify-center bg-black/95 p-4 backdrop-blur-md"
          style={{ animation: "fade-in 0.35s ease both" }}
          onClick={() => setLightbox(false)}
          role="dialog"
          aria-modal="true"
          aria-label={t(room.name)}
        >
          <button
            onClick={() => setLightbox(false)}
            className="absolute top-5 end-5 flex h-12 w-12 items-center justify-center rounded-full border border-white/30 text-white transition-colors hover:bg-white hover:text-black"
            aria-label="Close"
          >
            ✕
          </button>
          <div
            className="relative h-[76vh] w-full max-w-5xl"
            style={{ animation: `modal-in 0.45s ${EASE} both` }}
            onClick={(e) => e.stopPropagation()}
          >
            <SkeletonImage
              src={room.images[activeImg]}
              alt={t(room.name)}
              className="object-contain"
              sizes="100vw"
              priority
            />
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setActiveImg((i) => (i - 1 + room.images.length) % room.images.length);
            }}
            className="absolute top-1/2 start-4 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 text-white transition-colors hover:bg-white hover:text-black"
            aria-label="Previous image"
          >
            <GoPrev className="h-6 w-6" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setActiveImg((i) => (i + 1) % room.images.length);
            }}
            className="absolute top-1/2 end-4 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 text-white transition-colors hover:bg-white hover:text-black"
            aria-label="Next image"
          >
            <GoNext className="h-6 w-6" />
          </button>
          <div className="absolute bottom-6 start-1/2 flex -translate-x-1/2 gap-2 rtl:translate-x-1/2">
            {room.images.map((img, i) => (
              <button
                key={img}
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveImg(i);
                }}
                className={`relative h-14 w-20 overflow-hidden rounded-xl transition-all ${
                  activeImg === i ? "ring-2 ring-gold scale-105" : "opacity-50 hover:opacity-90"
                }`}
                aria-label={`Image ${i + 1}`}
              >
                <SkeletonImage src={img} alt="" sizes="80px" />
              </button>
            ))}
          </div>
        </div>
      ) : null}

      {/* Quick View Modal */}
      <RoomQuickViewModal
        room={quickViewRoom}
        onClose={() => setQuickViewRoom(null)}
      />
    </>
  );
}
