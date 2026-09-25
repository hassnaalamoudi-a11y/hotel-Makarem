"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { BadgePercent, Check, Copy, Phone, Sparkles, CheckCircle2, ArrowLeft, ArrowRight, ExternalLink } from "lucide-react";
import { hotel, offers, offerTags, type Offer, type OfferTag } from "@/lib/hotel-data";
import { useI18n } from "@/lib/i18n";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/motion";
import { Countdown } from "@/components/Countdown";
import { SkeletonImage } from "@/components/SkeletonImage";
import { PaymentCardsRibbon } from "@/components/PaymentCardsRibbon";

type Tab = "all" | OfferTag;

/** Reusable offer card with copyable promo code */
function OfferCard({
  offer,
  onCopyCode,
  copiedCode,
}: {
  offer: Offer;
  onCopyCode: (code: string) => void;
  copiedCode: string | null;
}) {
  const { t, locale } = useI18n();
  const limited = Boolean(offer.deadline);
  const isAr = locale === "ar";

  return (
    <article className="card-shadow group flex h-full flex-col overflow-hidden rounded-[2rem] bg-card border border-line/50 transition-all duration-500 hover:-translate-y-2 hover:card-shadow-hover hover:border-gold">
      <div className="relative h-64 overflow-hidden">
        <SkeletonImage
          src={offer.image}
          alt={t(offer.title)}
          className="object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        <span className="absolute top-4 start-4 rounded-full bg-card/90 px-3.5 py-1.5 text-xs font-bold text-heading backdrop-blur shadow-sm">
          {t(offer.validUntil)}
        </span>
        {offer.discountPercentage ? (
          <span className="absolute top-4 end-4 flex items-center gap-1 rounded-full bg-red-600 px-3.5 py-1.5 text-xs font-extrabold text-white shadow-md">
            <BadgePercent className="h-3.5 w-3.5" />
            <span>{isAr ? `خصم ${offer.discountPercentage}٪` : `${offer.discountPercentage}% OFF`}</span>
          </span>
        ) : limited ? (
          <span className="absolute top-4 end-4 flex items-center gap-1 rounded-full bg-red-600 px-3.5 py-1.5 text-xs font-bold text-white shadow-md">
            <BadgePercent className="h-3.5 w-3.5" />
            <span>{isAr ? "لفترة محدودة" : "Limited Time"}</span>
          </span>
        ) : null}
      </div>

      <div className="flex flex-1 flex-col gap-4 p-7">
        <div>
          <span className="overline-tag !text-gold">{t(offerTags[offer.tag])}</span>
          <h3 className="mt-1 text-xl font-extrabold tracking-tight text-heading">
            {t(offer.title)}
          </h3>
          <p className="mt-1 text-sm font-semibold text-gold leading-relaxed">{t(offer.subtitle)}</p>
        </div>

        {/* Promo code badge if available */}
        {offer.promoCode ? (
          <div className="flex items-center justify-between rounded-2xl bg-band px-4 py-2.5 border border-line/60">
            <div className="flex items-center gap-2">
              <span className="text-xs text-muted font-bold">{isAr ? "رمز العرض:" : "Promo Code:"}</span>
              <span className="font-mono text-sm font-extrabold text-gold tracking-wider" dir="ltr">
                {offer.promoCode}
              </span>
            </div>
            <button
              onClick={() => onCopyCode(offer.promoCode!)}
              className="flex items-center gap-1 text-xs font-bold text-heading hover:text-gold transition-colors"
              title={isAr ? "نسخ الرمز" : "Copy Code"}
            >
              {copiedCode === offer.promoCode ? (
                <>
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
                  <span className="text-emerald-500">{isAr ? "تم النسخ!" : "Copied!"}</span>
                </>
              ) : (
                <>
                  <Copy className="h-3.5 w-3.5 text-muted" />
                  <span>{isAr ? "نسخ" : "Copy"}</span>
                </>
              )}
            </button>
          </div>
        ) : null}

        {offer.oldPrice && offer.newPrice ? (
          <div className="flex items-baseline gap-3">
            <span className="text-base text-muted/70 line-through" dir="ltr">
              {offer.oldPrice}
            </span>
            <span className="text-3xl font-extrabold text-heading" dir="ltr">
              {offer.newPrice}
            </span>
            <span className="text-xs text-muted">
              {isAr ? "ر.س / ليلة" : "SAR / night"}
            </span>
          </div>
        ) : null}

        {offer.deadline ? <Countdown deadline={offer.deadline} compact /> : null}

        <p className="flex-1 text-sm leading-relaxed text-body">{t(offer.description)}</p>

        <ul className="grid grid-cols-1 gap-2 border-t border-line/60 pt-4">
          {offer.perks[locale].map((p) => (
            <li key={p} className="flex items-center gap-2 text-xs text-body">
              <Check className="h-3.5 w-3.5 shrink-0 text-gold" />
              <span>{p}</span>
            </li>
          ))}
        </ul>

        <div className="flex gap-2.5 pt-2">
          <a
            href={hotel.bookingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="pill pill-primary btn-sweep h-11 flex-1 text-xs font-extrabold flex items-center justify-center gap-1.5"
          >
            <span>{isAr ? "احجز العرض الآن" : "Book This Offer"}</span>
            <ExternalLink className="h-3 w-3" />
          </a>
          <a
            href={`tel:${hotel.phoneHref}`}
            className="pill pill-ghost h-11 w-11 !p-0 shrink-0"
            aria-label={isAr ? "اتصل بالفندق" : "Call Hotel"}
          >
            <Phone className="h-4 w-4 text-gold" />
          </a>
        </div>
      </div>
    </article>
  );
}

export default function OffersPage() {
  const { t, locale } = useI18n();
  const [tab, setTab] = useState<Tab>("all");
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const featured = offers.find((o) => o.featured) ?? offers[0];

  const list = useMemo(
    () => (tab === "all" ? offers : offers.filter((o) => o.tag === tab)),
    [tab],
  );

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 3000);
  };

  const isAr = locale === "ar";

  return (
    <>
      <PageHero
        image="https://makaremhotels.com/_next/image?url=https%3A%2F%2Ftbi-p-001.sitecorecontenthub.cloud%2Fapi%2Fpublic%2Fcontent%2F1d06ee18ce9647318ffd1baaf20d651e%3Fv%3D14988b67&w=1920&q=75"
        overline={{ ar: "عروض وباقات مكارم", en: "Makarem Exclusive Deals" }}
        title={{ ar: "عروض فندق مكارم أجياد مكة", en: "Makarem Ajyad Makkah Offers" }}
        subtitle={{
          ar: "اكتشف باقات حصرية وخصومات مميزة على الإقامة بالقرب من الحرم المكي الشريف لتجربة روحانية لا تُنسى بأفضل الأسعار.",
          en: "Discover exclusive packages and exceptional savings on stays near the Holy Mosque for an unforgettable spiritual journey at premier value.",
        }}
        crumbs={[
          { href: "/", label: { ar: "الرئيسية", en: "Home" } },
          { href: "/offers", label: { ar: "العروض", en: "Offers" } },
        ]}
      />

      {/* Featured seasonal offer (Saudi National Day / Featured) */}
      <section className="mx-auto w-full max-w-7xl px-4 pt-16 sm:px-6 lg:px-8">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2.5rem] bg-[#1C1613] text-[#FAF6F1] card-shadow border border-gold/40">
            <div className="grid lg:grid-cols-2">
              <div className="relative h-72 lg:h-auto lg:min-h-[520px]">
                <SkeletonImage
                  src={featured.image}
                  alt={t(featured.title)}
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                />
                <span className="absolute top-5 start-5 rounded-full bg-black/60 px-4 py-2 text-xs font-bold text-white backdrop-blur-md">
                  {t(featured.validUntil)}
                </span>
                {featured.promoCode ? (
                  <span className="absolute bottom-5 start-5 flex items-center gap-2 rounded-2xl bg-gold px-4 py-2 text-xs font-extrabold text-[#1C1613] shadow-lg">
                    <span>{isAr ? "كود الخصم:" : "Code:"}</span>
                    <span className="font-mono tracking-wider">{featured.promoCode}</span>
                  </span>
                ) : null}
              </div>

              <div className="flex flex-col justify-center gap-5 px-8 py-10 md:px-14">
                <span className="overline-tag !text-gold">
                  {isAr ? "العرض المميز لفترة محدودة" : "Featured Limited-Time Offer"}
                </span>
                <h2 className="text-3xl font-extrabold tracking-tight text-white md:text-5xl font-display">
                  {t(featured.title)}
                </h2>
                <p className="text-base sm:text-lg font-semibold text-gold leading-relaxed">
                  {t(featured.subtitle)}
                </p>

                {featured.promoCode ? (
                  <div className="flex items-center justify-between rounded-2xl bg-white/10 px-5 py-3 border border-white/15">
                    <div className="flex items-center gap-3">
                      <span className="text-xs text-white/70 font-semibold">{isAr ? "رمز الكود الترويجي:" : "Promo Code:"}</span>
                      <span className="font-mono text-base font-extrabold text-gold tracking-widest" dir="ltr">
                        {featured.promoCode}
                      </span>
                    </div>
                    <button
                      onClick={() => handleCopyCode(featured.promoCode!)}
                      className="pill pill-gold h-9 px-4 text-xs font-bold"
                    >
                      {copiedCode === featured.promoCode ? (
                        <>
                          <CheckCircle2 className="h-3.5 w-3.5" />
                          <span>{isAr ? "تم النسخ" : "Copied"}</span>
                        </>
                      ) : (
                        <>
                          <Copy className="h-3.5 w-3.5" />
                          <span>{isAr ? "نسخ الرمز" : "Copy Code"}</span>
                        </>
                      )}
                    </button>
                  </div>
                ) : null}

                {featured.deadline ? (
                  <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                    <Countdown deadline={featured.deadline} />
                  </div>
                ) : null}

                <p className="leading-relaxed text-white/85 text-sm sm:text-base">{t(featured.description)}</p>

                <ul className="grid gap-2 sm:grid-cols-2">
                  {featured.perks[locale].map((p) => (
                    <li key={p} className="flex items-center gap-2 text-xs sm:text-sm text-white/90">
                      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gold/20 text-gold">
                        <Check className="h-3.5 w-3.5" />
                      </span>
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-3 flex flex-wrap gap-3">
                  <a
                    href={hotel.bookingUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="pill pill-gold btn-sweep h-12 px-8 text-xs font-extrabold flex items-center gap-2"
                  >
                    <span>{isAr ? "احجز هذا العرض مباشرة" : "Book This Offer Direct"}</span>
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                  <a
                    href={`tel:${hotel.phoneHref}`}
                    className="pill h-12 border border-white/30 px-6 text-xs font-bold text-white transition-colors hover:border-gold hover:text-gold"
                  >
                    <span dir="ltr">{hotel.phone}</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* Payment & Credit cards ribbon */}
      <PaymentCardsRibbon />

      {/* All offers + Filter tabs */}
      <section className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 md:py-16 lg:px-8">
        <Reveal className="mb-10 flex flex-col items-center gap-6 text-center">
          <div>
            <span className="overline-tag !text-gold">{isAr ? "عروض مكارم المتنوعة" : "Makarem Deals Collection"}</span>
            <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-heading md:text-4xl font-display">
              {isAr ? "جميع العروض والباقات المتاحة" : "All Available Packages & Offers"}
            </h2>
          </div>

          {/* Filter Tabs */}
          <div
            role="tablist"
            aria-label={isAr ? "تصفية العروض" : "Filter offers"}
            className="flex flex-wrap justify-center gap-2"
          >
            {(
              [
                ["all", { ar: "جميع العروض", en: "All Offers" }],
                ["seasonal", offerTags.seasonal],
                ["direct", offerTags.direct],
                ["weekend", offerTags.weekend],
                ["longstay", offerTags.longstay],
              ] as [Tab, { ar: string; en: string }][]
            ).map(([key, label]) => (
              <button
                key={key}
                role="tab"
                aria-selected={tab === key}
                onClick={() => setTab(key)}
                className={`pill h-10 px-5 text-xs sm:text-sm font-bold transition-all ${
                  tab === key ? "pill-primary" : "pill-ghost"
                }`}
              >
                {t(label)}
              </button>
            ))}
          </div>
        </Reveal>

        <div key={tab} className="stagger-run grid gap-7 md:grid-cols-2 lg:grid-cols-3">
          {list.map((o) => (
            <OfferCard
              key={o.slug}
              offer={o}
              onCopyCode={handleCopyCode}
              copiedCode={copiedCode}
            />
          ))}
        </div>

        {list.length === 0 ? (
          <p className="py-16 text-center text-muted">
            {isAr ? "لا توجد عروض في هذه الفئة حالياً." : "No offers in this category right now."}
          </p>
        ) : null}

        {/* Custom Group Booking Banner */}
        <Reveal className="mt-14" delay={0.05}>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 rounded-[2.5rem] bg-band p-8 sm:p-10 card-shadow border border-line/60">
            <div className="flex items-start gap-4">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gold-soft text-gold">
                <Sparkles className="h-6 w-6" />
              </span>
              <div>
                <h3 className="text-xl font-extrabold text-heading">
                  {isAr ? "حجوزات المجموعات وحملات العمرة الكبرى" : "Group Bookings & Umrah Delegations"}
                </h3>
                <p className="mt-1.5 max-w-xl text-sm leading-relaxed text-body">
                  {isAr
                    ? "هل تخطط لرحلة عائلية كبرى أو حملة عمرة ومجموعات؟ تواصل مع قسم المبيعات بفندق مكارم أجياد للحصول على باقات أسعار خاصة تشمل الوجبات وخدمات الإرشاد الديني."
                    : "Planning a large family pilgrimage or Umrah delegation? Contact our sales desk for customized group rates, meal packages, and dedicated spiritual guidance."}
                </p>
              </div>
            </div>
            <a
              href={`https://wa.me/${hotel.whatsapp.replace("+", "")}?text=${encodeURIComponent(
                isAr
                  ? "مرحباً، أود الاستفسار عن باقات حجوزات المجموعات وحملات العمرة في فندق مكارم أجياد مكة"
                  : "Hello, I would like to inquire about group booking packages at Makarem Ajyad Makkah Hotel"
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="pill pill-primary btn-sweep h-12 px-7 text-xs font-bold shrink-0"
            >
              {isAr ? "طلب عرض سعر للمجموعات" : "Request Group Quote"}
            </a>
          </div>
        </Reveal>
      </section>
    </>
  );
}
