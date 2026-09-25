"use client";

import { useMemo, useState } from "react";
import { ArrowUpDown, BedDouble, Phone, Sparkles } from "lucide-react";
import { hotel, rooms, roomTypes, type Room, type RoomType } from "@/lib/hotel-data";
import { useI18n } from "@/lib/i18n";
import { PageHero } from "@/components/PageHero";
import { RoomCard } from "@/components/RoomCard";
import { Reveal } from "@/components/motion";
import { RoomQuickViewModal } from "@/components/RoomQuickViewModal";
import { PaymentCardsRibbon } from "@/components/PaymentCardsRibbon";

type Filter = "all" | RoomType;
type Sort = "default" | "price-asc" | "price-desc" | "size";

export default function RoomsPage() {
  const { t, locale } = useI18n();
  const [filter, setFilter] = useState<Filter>("all");
  const [sort, setSort] = useState<Sort>("default");
  const [quickViewRoom, setQuickViewRoom] = useState<Room | null>(null);

  const list = useMemo(() => {
    let r: Room[] = rooms;
    if (filter !== "all") r = r.filter((x) => x.type === filter);
    switch (sort) {
      case "price-asc":
        return [...r].sort((a, b) => a.priceFrom - b.priceFrom);
      case "price-desc":
        return [...r].sort((a, b) => b.priceFrom - a.priceFrom);
      case "size":
        return [...r].sort((a, b) => parseInt(b.size) - parseInt(a.size));
      default:
        return r;
    }
  }, [filter, sort]);

  const isAr = locale === "ar";

  return (
    <>
      <PageHero
        image="https://makaremhotels.com/_next/image?url=https%3A%2F%2Ftbi-p-001.sitecorecontenthub.cloud%2Fapi%2Fpublic%2Fcontent%2F6f50a810d6a3439aa7d794fd78533d64%3Fv%3D3a8faa18&w=1920&q=75"
        overline={{ ar: "الإقامة الفاخرة", en: "Luxury Accommodation" }}
        title={{ ar: "غرف وأجنحة فندق مكارم أجياد", en: "Makarem Ajyad Rooms & Suites" }}
        subtitle={{
          ar: "٤١١ غرفة وجناحاً ملكياً بإطلالات روحانية مباشرة بالقرب من الحرم المكي الشريف وبوابة الملك عبدالعزيز.",
          en: "411 luxury rooms and royal suites with spiritual vistas steps from the Holy Mosque and King Abdulaziz Gate.",
        }}
        crumbs={[
          { href: "/", label: { ar: "الرئيسية", en: "Home" } },
          { href: "/rooms", label: { ar: "الغرف والأجنحة", en: "Rooms & Suites" } },
        ]}
      />

      <section className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 md:py-20 lg:px-8">
        {/* Filter / sort bar */}
        <Reveal className="mb-10 flex flex-col items-center justify-between gap-5 rounded-3xl bg-card px-5 py-4 card-shadow sm:px-7 md:flex-row border border-line/50">
          <div
            className="flex flex-wrap items-center justify-center gap-2"
            role="tablist"
            aria-label={isAr ? "تصفية الغرف" : "Filter rooms"}
          >
            {(
              [
                ["all", { ar: "الكل", en: "All" }],
                ["single", roomTypes.single],
                ["double", roomTypes.double],
                ["suite", roomTypes.suite],
                ["family", roomTypes.family],
              ] as [Filter, { ar: string; en: string }][]
            ).map(([key, label]) => (
              <button
                key={key}
                role="tab"
                aria-selected={filter === key}
                onClick={() => setFilter(key)}
                className={`pill h-10 px-3 text-xs sm:px-5 sm:text-sm font-bold ${
                  filter === key ? "pill-primary" : "pill-ghost"
                }`}
              >
                {t(label)}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <span className="hidden sm:inline-block text-xs font-semibold text-muted">
              {isAr
                ? `عرض ${list.length} من إجمالي ${rooms.length} غرف`
                : `Showing ${list.length} of ${rooms.length} rooms`}
            </span>
            <label className="flex items-center gap-2.5 text-sm">
              <span className="flex items-center gap-1.5 font-bold text-heading">
                <ArrowUpDown className="h-4 w-4 text-gold" />
                {isAr ? "ترتيب حسب" : "Sort by"}
              </span>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as Sort)}
                className="h-10 rounded-full border border-line bg-card px-4 text-xs font-semibold text-heading outline-none focus:border-gold cursor-pointer"
              >
                <option value="default">{isAr ? "المقترح" : "Recommended"}</option>
                <option value="price-asc">{isAr ? "السعر: الأقل أولاً" : "Price: low to high"}</option>
                <option value="price-desc">{isAr ? "السعر: الأعلى أولاً" : "Price: high to low"}</option>
                <option value="size">{isAr ? "المساحة (الأكبر أولاً)" : "Size (Largest)"}</option>
              </select>
            </label>
          </div>
        </Reveal>

        {/* Grid — stagger re-runs on filter/sort change via key */}
        <div key={`${filter}-${sort}`} className="stagger-run grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((room) => (
            <RoomCard
              key={room.slug}
              room={room}
              onQuickView={(r) => setQuickViewRoom(r)}
            />
          ))}
        </div>

        {list.length === 0 ? (
          <p className="py-16 text-center text-muted">
            {isAr ? "لا توجد نتائج مطابقة." : "No matching results."}
          </p>
        ) : null}

        {/* Help CTA */}
        <Reveal className="mt-16" delay={0.1}>
          <div className="flex flex-col items-center gap-5 rounded-[2.5rem] bg-band px-8 py-12 text-center card-shadow">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gold-soft text-gold">
              <Sparkles className="h-7 w-7" />
            </div>
            <h3 className="text-2xl font-extrabold tracking-tight text-heading md:text-3xl">
              {isAr ? "هل تحتاج مساعدة في اختيار الغرفة المثالية؟" : "Need help choosing your ideal room?"}
            </h3>
            <p className="max-w-xl text-sm sm:text-base leading-relaxed text-body">
              {isAr
                ? "فريق الاستقبال وخدمة الضيوف جاهز على مدار الساعة لمساعدتكم في اختيار الإقامة الأنسب لرحلتكم وتوفير أفضل الأسعار المباشرة."
                : "Our reception and concierge team is available 24/7 to help you choose the best room configuration and provide direct booking benefits."}
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <a href={`tel:${hotel.phoneHref}`} className="pill pill-primary btn-sweep h-12 px-5 text-xs sm:px-8 sm:text-sm font-bold">
                <Phone className="h-4 w-4" />
                {isAr ? "اتصل بمكتب الحجوزات: " : "Call Reservations: "}
                <span dir="ltr">{hotel.phone}</span>
              </a>
              <a
                href={`https://wa.me/${hotel.whatsapp.replace("+", "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="pill pill-gold h-12 px-5 text-xs sm:px-8 sm:text-sm font-bold"
              >
                {isAr ? "محادثة واتساب فورية" : "Instant WhatsApp"}
              </a>
            </div>
          </div>
        </Reveal>
      </section>

      {/* Payment & Credit cards ribbon */}
      <PaymentCardsRibbon />

      {/* Quick View Modal */}
      <RoomQuickViewModal
        room={quickViewRoom}
        onClose={() => setQuickViewRoom(null)}
      />
    </>
  );
}
