"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  ChevronDown,
  Star,
  Copy,
  CheckCircle2,
  ExternalLink,
  Phone,
  Sparkles,
  BadgePercent,
} from "lucide-react";
import {
  amenities,
  faqs,
  features,
  hotel,
  offers,
  roomTypes,
  rooms,
  stats,
  type Room,
  type Offer,
} from "@/lib/hotel-data";
import { useI18n } from "@/lib/i18n";
import { Reveal, SlideFrom, StaggerGroup, StaggerItem } from "@/components/motion";
import { SectionHeading } from "@/components/SectionHeading";
import { RoomCard } from "@/components/RoomCard";
import { AnimatedCounter } from "@/components/AnimatedCounter";
import { Testimonials } from "@/components/Testimonials";
import { HeroSection } from "@/components/HeroSection";
import { DirectPerksRibbon } from "@/components/DirectPerksRibbon";
import { ProximityGuide } from "@/components/ProximityGuide";
import { DiningSection } from "@/components/DiningSection";
import { RoomQuickViewModal } from "@/components/RoomQuickViewModal";
import { SpiritualFeatures } from "@/components/SpiritualFeatures";
import { PaymentCardsRibbon } from "@/components/PaymentCardsRibbon";
import { iconMap } from "@/components/icons";
import { SkeletonImage } from "@/components/SkeletonImage";
import { GsapEffects } from "@/components/GsapEffects";

/* ───────── About: text + overlapping images + 2×2 features ───────── */
function About() {
  const { t, locale } = useI18n();

  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-20 sm:px-6 md:py-28 lg:px-8">
      <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
        {/* Text side */}
        <Reveal>
          <span className="overline-tag !text-gold">{locale === "ar" ? "عن مكارم أجياد" : "About Makarem Ajyad"}</span>
          <h2 className="mt-4 text-2xl sm:text-3xl font-extrabold leading-[1.18] tracking-tight text-heading md:text-[2.75rem] font-display">
            {locale === "ar" ? (
              <>
                ضيافة سعودية أصيلة
                <br />
                <span className="text-gold">بجوار بيت الله الحرام</span>
              </>
            ) : (
              <>
                Authentic Saudi Hospitality,
                <br />
                <span className="text-gold">Steps from the Holy Kaaba</span>
              </>
            )}
          </h2>
          <p className="mt-6 text-sm sm:text-base leading-loose text-body md:text-lg">{t(hotel.intro)}</p>

          {/* 2×2 feature grid */}
          <StaggerGroup className="mt-10 grid gap-x-8 gap-y-7 sm:grid-cols-2">
            {features.map((f) => {
              const Icon = iconMap[f.icon] ?? iconMap["concierge-bell"];
              return (
                <StaggerItem key={f.title.en} className="flex items-start gap-4">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gold-soft text-gold">
                    <Icon className="h-5 w-5" />
                  </span>
                  <span>
                    <span className="block font-bold text-heading">{t(f.title)}</span>
                    <span className="mt-1 block text-sm leading-relaxed text-muted">
                      {t(f.text)}
                    </span>
                  </span>
                </StaggerItem>
              );
            })}
          </StaggerGroup>
        </Reveal>

        {/* Overlapping images with scrubbed parallax & zoom */}
        <div className="relative mx-auto h-[420px] w-full max-w-[480px] md:h-[520px]">
          <SlideFrom from="start" className="absolute start-0 top-0 w-[72%]">
            <div className="about-image-zoom img-zoom-hover relative h-[340px] overflow-hidden rounded-[2rem] card-shadow md:h-[440px] border border-line/60">
              <SkeletonImage
                src="https://makaremhotels.com/_next/image?url=https%3A%2F%2Ftbi-p-001.sitecorecontenthub.cloud%2Fapi%2Fpublic%2Fcontent%2F0b9d5595c9314954aaba0c4f2908e7dcxmc-gallery-desktop%3Fv%3D9197bbd2&w=1920&q=75"
                alt={locale === "ar" ? "بهو فندق مكارم أجياد" : "Makarem Ajyad Grand Lobby"}
                className="object-cover"
                sizes="(max-width: 1024px) 70vw, 30vw"
              />
            </div>
          </SlideFrom>
          <SlideFrom from="end" delay={0.25} className="absolute bottom-0 end-0 w-[54%]">
            <div className="about-image-zoom img-zoom-hover relative h-[220px] overflow-hidden rounded-[2rem] border-8 border-[var(--bg)] card-shadow md:h-[280px]">
              <SkeletonImage
                src="https://makaremhotels.com/_next/image?url=https%3A%2F%2Ftbi-p-001.sitecorecontenthub.cloud%2Fapi%2Fpublic%2Fcontent%2F8ca9ffd61581420c80a829a6f4254461%3Fv%3D9ea28d2b&w=1920&q=75"
                alt={locale === "ar" ? "أجنحة مكارم أجياد الفاخرة" : "Makarem Ajyad Luxury Suites"}
                className="object-cover"
                sizes="(max-width: 1024px) 50vw, 22vw"
              />
            </div>
          </SlideFrom>
          {/* Floating badge with GSAP Parallax Float */}
          <div className="gsap-float absolute -bottom-2 start-6 z-20">
            <div className="rounded-2xl bg-brand px-6 py-4 text-[var(--on-brand)] card-shadow border border-gold/30 badge-shimmer">
              <p className="text-2xl font-extrabold leading-none font-mono" dir="ltr">
                300<span className="text-sm"> {locale === "ar" ? "متر" : "m"}</span>
              </p>
              <p className="mt-1 text-xs opacity-90 font-bold">
                {locale === "ar" ? "من الحرم وبرج الساعة" : "to Haram & Clock Tower"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ───────── Featured Rooms: pill filters + animated grid + QuickView ───────── */
function FeaturedRooms({ onQuickView }: { onQuickView: (room: Room) => void }) {
  const { t, locale } = useI18n();
  const [filter, setFilter] = useState<"all" | "single" | "double" | "suite" | "family">("all");

  const list = rooms.filter((r) => filter === "all" || r.type === filter).slice(0, 4);

  const tabs: ("all" | "single" | "double" | "suite" | "family")[] = [
    "all",
    "suite",
    "family",
    "double",
  ];

  return (
    <section className="py-12 md:py-16">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          overline={{ ar: "الإقامة الفاخرة", en: "Luxury Accommodation" }}
          title={{ ar: "غرف وأجنحة فندق مكارم أجياد", en: "Makarem Ajyad Rooms & Suites" }}
          subtitle={{
            ar: "٤١١ غرفة وجناحاً ملكياً صُممت بعناية لتناسب كل ضيف — من الغرف المريحة إلى الأجنحة العائلية والتنفيذية المطلة على الحرم.",
            en: "411 luxury rooms and royal suites thoughtfully crafted for your utmost comfort — from cozy rooms to executive suites overlooking the Haram.",
          }}
        />

        {/* Pill filter tabs */}
        <Reveal className="mt-8 flex flex-wrap justify-center gap-2" delay={0.1}>
          {tabs.map((key) => (
            <button
              key={key}
              onClick={() => setFilter(key)}
              aria-pressed={filter === key}
              className={`pill h-10 px-5 text-xs sm:text-sm font-bold transition-all ${
                filter === key ? "pill-primary" : "pill-ghost"
              }`}
            >
              {key === "all" ? (locale === "ar" ? "الكل" : "All") : t(roomTypes[key])}
            </button>
          ))}
        </Reveal>

        {/* Cards grid */}
        <div key={filter} className="stagger-run mt-10 grid gap-7 sm:grid-cols-2 lg:grid-cols-4">
          {list.map((room) => (
            <RoomCard key={room.slug} room={room} onQuickView={onQuickView} />
          ))}
        </div>

        <Reveal className="mt-12 text-center" delay={0.1}>
          <Link href="/rooms" className="pill pill-ghost h-12 px-8 text-xs sm:text-sm font-bold">
            {locale === "ar" ? "عرض جميع الغرف والأجنحة (٤١١ غرفة)" : "View All Rooms & Suites (411 Keys)"}
          </Link>
        </Reveal>
      </div>
    </section>
  );
}

/* ───────── Amenities: full-width band + 4 white cards ───────── */
function Amenities() {
  const { t, locale } = useI18n();
  return (
    <section className="mt-8 w-full bg-band py-20 md:py-24 border-y border-line/60">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <Reveal>
            <span className="overline-tag !text-gold">
              {locale === "ar" ? "المرافق والخدمات" : "Amenities & Services"}
            </span>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-heading md:text-4xl font-display">
              {locale === "ar" ? "كل ما تحتاجه لإقامة روحانية مثالية" : "Everything for a Serene Spiritual Stay"}
            </h2>
          </Reveal>
          <Reveal delay={0.15}>
            <Link href="/contact" className="pill pill-primary h-11 px-6 text-xs sm:text-sm font-bold">
              {locale === "ar" ? "تواصل للاستفسار والحجز" : "Inquire & Book"}
            </Link>
          </Reveal>
        </div>

        <StaggerGroup className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {amenities.slice(0, 4).map((a) => {
            const Icon = iconMap[a.icon] ?? iconMap["concierge-bell"];
            return (
              <StaggerItem
                key={a.title.en}
                className="group rounded-3xl bg-card p-8 card-shadow transition-all duration-500 hover:-translate-y-1.5 hover:card-shadow-hover border border-line/50 hover:border-gold"
              >
                <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gold-soft text-gold transition-colors duration-500 group-hover:bg-gold group-hover:text-white">
                  <Icon className="h-6 w-6" />
                </span>
                <h3 className="mt-5 font-bold text-heading text-lg">{t(a.title)}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {a.desc ? t(a.desc) : ""}
                </p>
              </StaggerItem>
            );
          })}
        </StaggerGroup>
      </div>
    </section>
  );
}

/* ───────── Stats Row: animated counters on home ───────── */
function StatsRow() {
  const { t } = useI18n();
  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="grid grid-cols-2 gap-4 rounded-[2.5rem] bg-card p-8 card-shadow border border-line/60 md:grid-cols-4 md:p-10">
        {stats.map((s, i) => (
          <Reveal key={s.label.en} delay={i * 0.08} className="text-center">
            <p className="text-3xl font-extrabold text-heading md:text-5xl font-mono" dir="ltr">
              <AnimatedCounter target={s.value} decimals={s.decimals} />
              {s.suffix ? t(s.suffix) : ""}
            </p>
            <p className="mt-2 text-xs sm:text-sm font-bold text-muted">{t(s.label)}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ───────── Offers Section: Interactive Cards with Copyable Codes ───────── */
function OffersSection() {
  const { t, locale } = useI18n();
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const list = offers.slice(0, 3);
  const isAr = locale === "ar";

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 3000);
  };

  return (
    <section className="py-14 md:py-20">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          overline={{ ar: "عروض حصرية", en: "Exclusive Deals" }}
          title={{ ar: "عروض وباقات مكارم أجياد الخاصة", en: "Makarem Ajyad Signature Offers" }}
          subtitle={{
            ar: "استفد من كود خصم اليوم الوطني السعودي SND96، وخصم الحجز المباشر ١٠٪، وباقات العمرة الشاملة.",
            en: "Take advantage of Saudi National Day promo code SND96, 10% direct booking discount, and comprehensive Umrah packages.",
          }}
        />

        {/* 3 Interactive Offer Cards */}
        <div className="mt-12 grid gap-7 md:grid-cols-3">
          {list.map((o) => (
            <Reveal key={o.slug}>
              <div className="card-shadow card-3d-hover img-zoom-hover group flex h-full flex-col justify-between overflow-hidden rounded-[2rem] bg-card border border-line/60">
                <div className="relative h-56 overflow-hidden">
                  <SkeletonImage
                    src={o.image}
                    alt={t(o.title)}
                    className="object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <span className="absolute top-4 start-4 rounded-full bg-card/90 px-3 py-1 text-xs font-bold text-heading backdrop-blur shadow-sm">
                    {t(o.validUntil)}
                  </span>
                  {o.discountPercentage ? (
                    <span className="absolute top-4 end-4 flex items-center gap-1 rounded-full bg-red-600 px-3 py-1 text-xs font-extrabold text-white shadow-md">
                      <BadgePercent className="h-3.5 w-3.5" />
                      <span>{isAr ? `خصم ${o.discountPercentage}٪` : `${o.discountPercentage}% OFF`}</span>
                    </span>
                  ) : null}
                </div>

                <div className="flex flex-1 flex-col gap-4 p-6">
                  <div>
                    <h3 className="text-xl font-extrabold text-heading">{t(o.title)}</h3>
                    <p className="mt-1 text-xs font-semibold text-gold leading-relaxed">{t(o.subtitle)}</p>
                  </div>

                  {o.promoCode ? (
                    <div className="flex items-center justify-between rounded-xl bg-band px-3.5 py-2 border border-line/60">
                      <div className="flex items-center gap-2">
                        <span className="text-[0.7rem] text-muted font-bold">{isAr ? "الكود:" : "Code:"}</span>
                        <span className="font-mono text-sm font-extrabold text-gold" dir="ltr">
                          {o.promoCode}
                        </span>
                      </div>
                      <button
                        onClick={() => handleCopyCode(o.promoCode!)}
                        className="flex items-center gap-1 text-xs font-bold text-heading hover:text-gold transition-colors"
                      >
                        {copiedCode === o.promoCode ? (
                          <>
                            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
                            <span className="text-emerald-500 text-[0.7rem]">{isAr ? "تم النسخ" : "Copied"}</span>
                          </>
                        ) : (
                          <>
                            <Copy className="h-3 w-3 text-muted" />
                            <span className="text-[0.7rem]">{isAr ? "نسخ" : "Copy"}</span>
                          </>
                        )}
                      </button>
                    </div>
                  ) : null}

                  {o.oldPrice && o.newPrice ? (
                    <div className="flex items-baseline gap-2">
                      <span className="text-xs text-muted/70 line-through" dir="ltr">
                        {o.oldPrice}
                      </span>
                      <span className="text-2xl font-extrabold text-heading" dir="ltr">
                        {o.newPrice}
                      </span>
                      <span className="text-xs text-muted">
                        {isAr ? "ر.س / ليلة" : "SAR / night"}
                      </span>
                    </div>
                  ) : null}

                  <p className="flex-1 text-xs leading-relaxed text-body">{t(o.description)}</p>

                  <div className="pt-2">
                    <a
                      href={hotel.bookingUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="pill pill-primary btn-sweep h-10 w-full text-xs font-extrabold flex items-center justify-center gap-1.5"
                    >
                      <span>{isAr ? "احجز العرض" : "Book Offer"}</span>
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-12 text-center">
          <Link href="/offers" className="pill pill-ghost h-12 px-8 text-xs sm:text-sm font-bold">
            {isAr ? "استعراض جميع العروض والباقات" : "Browse All Offers & Packages"}
          </Link>
        </Reveal>
      </div>
    </section>
  );
}

/* ───────── Pilgrim FAQ Accordion on Home ───────── */
function HomeFaq() {
  const { t } = useI18n();
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <section className="bg-surface/50 py-16 md:py-24 border-t border-line/60">
      <div className="mx-auto w-full max-w-4xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          overline={{ ar: "الأسئلة الشائعة", en: "FAQ" }}
          title={{ ar: "استفسارات ضيوف الرحمن حول فندق مكارم أجياد", en: "Frequently Asked Questions" }}
          subtitle={{
            ar: "كل ما يهمك معرفته حول موقع الفندق والقرب من الحرم المكي الشريف وحجوزات الغرف.",
            en: "Everything you need to know regarding location, Haram proximity, and reservations.",
          }}
        />

        <div className="mt-12 flex flex-col">
          {faqs.slice(0, 5).map((f, i) => {
            const open = openIdx === i;
            return (
              <Reveal key={f.q.en} delay={i * 0.06}>
                <div className="border-b border-line">
                  <button
                    onClick={() => setOpenIdx(open ? null : i)}
                    className="flex w-full items-center justify-between gap-4 py-5 text-start"
                    aria-expanded={open}
                  >
                    <span
                      className={`font-bold transition-colors text-sm sm:text-base ${
                        open ? "text-gold" : "text-heading"
                      }`}
                    >
                      {t(f.q)}
                    </span>
                    <span
                      className={`shrink-0 text-muted transition-transform duration-300 ${
                        open ? "rotate-180" : ""
                      }`}
                    >
                      <ChevronDown className="h-5 w-5" />
                    </span>
                  </button>
                  <div className={`faq-body ${open ? "faq-body-open" : ""}`}>
                    <div>
                      <p className="pb-5 text-sm leading-loose text-body">{t(f.a)}</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ───────── Testimonials band ───────── */
function HomeTestimonials() {
  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto w-full max-w-4xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          overline={{ ar: "آراء ضيوفنا", en: "Guest Stories" }}
          title={{ ar: "ماذا قال ضيوف الرحمن عن إقامتهم في مكارم أجياد؟", en: "What Our Guests Say" }}
        />
        <Reveal className="mt-14" delay={0.1}>
          <Testimonials />
        </Reveal>
      </div>
    </section>
  );
}

/* ───────── Final CTA ───────── */
function FinalCta() {
  const { t, locale } = useI18n();
  const isAr = locale === "ar";

  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-14 sm:px-6 md:py-20 lg:px-8">
      <Reveal>
        <div className="relative overflow-hidden rounded-[2.5rem] bg-footer px-6 py-16 text-center card-shadow md:py-20 border border-gold/30">
          <div
            className="absolute inset-0 opacity-25"
            style={{
              backgroundImage:
                "url(https://makaremhotels.com/_next/image?url=https%3A%2F%2Ftbi-p-001.sitecorecontenthub.cloud%2Fapi%2Fpublic%2Fcontent%2Fbb055cf86d30485a9670d214cf17c073-xmc-hero-desktop%3Fv%3D3575d7f7&w=1920&q=75)",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
            aria-hidden
          />
          <div
            className="absolute inset-0 bg-[#16120F]/80"
            aria-hidden
          />
          <div className="relative flex flex-col items-center gap-5">
            <span className="overline-tag !text-gold">
              {isAr ? "ابدأ رحلتك المباركة معنا" : "Begin Your Blessed Journey"}
            </span>
            <h2 className="max-w-2xl text-2xl sm:text-3xl font-extrabold tracking-tight text-white md:text-5xl font-display">
              {isAr ? "احجز إقامتكم في فندق مكارم أجياد مكة" : "Book Your Stay at Makarem Ajyad Makkah"}
            </h2>
            <div className="mt-2 flex flex-wrap justify-center gap-3">
              <a
                href={hotel.bookingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="pill pill-gold btn-sweep h-12 px-9 text-xs sm:text-sm font-extrabold flex items-center gap-2"
              >
                <span>{isAr ? "احجز الآن مباشرة" : "Book Direct Now"}</span>
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
              <a
                href={`tel:${hotel.phoneHref}`}
                className="pill h-12 border border-white/30 px-9 text-xs sm:text-sm font-bold text-white transition-colors hover:border-gold hover:text-gold"
              >
                <span dir="ltr">{hotel.phone}</span>
              </a>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

export default function Home() {
  const [quickViewRoom, setQuickViewRoom] = useState<Room | null>(null);

  return (
    <>
      <GsapEffects />
      <HeroSection />
      <DirectPerksRibbon />
      <About />
      <SpiritualFeatures />
      <FeaturedRooms onQuickView={(r) => setQuickViewRoom(r)} />
      <ProximityGuide />
      <DiningSection />
      <Amenities />
      <OffersSection />
      <PaymentCardsRibbon />
      <StatsRow />
      <HomeTestimonials />
      <HomeFaq />
      <FinalCta />

      {/* Quick View Modal */}
      <RoomQuickViewModal
        room={quickViewRoom}
        onClose={() => setQuickViewRoom(null)}
      />
    </>
  );
}
