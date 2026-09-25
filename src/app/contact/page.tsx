"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import {
  AlertCircle,
  Calendar,
  Check,
  ChevronDown,
  Clock,
  Mail,
  MapPin,
  MessageCircle,
  Navigation,
  Phone,
  Send,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { faqs, hotel, offers, rooms } from "@/lib/hotel-data";
import { useI18n } from "@/lib/i18n";
import { PageHero } from "@/components/PageHero";
import { EASE, Reveal, StaggerGroup, StaggerItem } from "@/components/motion";
import { SkeletonImage } from "@/components/SkeletonImage";
import { PaymentCardsRibbon } from "@/components/PaymentCardsRibbon";

type FormState = {
  name: string;
  email: string;
  phone: string;
  room: string;
  offer: string;
  checkin: string;
  checkout: string;
  guests: string;
  notes: string;
};

const EMPTY: FormState = {
  name: "",
  email: "",
  phone: "",
  room: "",
  offer: "",
  checkin: "",
  checkout: "",
  guests: "2",
  notes: "",
};

function validate(f: FormState, locale: "ar" | "en") {
  const errors: Partial<Record<keyof FormState, string>> = {};
  if (f.name.trim().length < 3)
    errors.name = locale === "ar" ? "يرجى إدخال الاسم الكامل" : "Please enter your full name";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email))
    errors.email = locale === "ar" ? "يرجى إدخال بريد إلكتروني صحيح" : "Please enter a valid email";
  if (f.phone.replace(/\D/g, "").length < 9)
    errors.phone =
      locale === "ar" ? "يرجى إدخال رقم جوال صحيح" : "Please enter a valid phone number";
  if (f.checkin && f.checkout && f.checkout < f.checkin)
    errors.checkout =
      locale === "ar" ? "تاريخ المغادرة يجب أن يكون بعد الوصول" : "Check-out must be after check-in";
  return errors;
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="flex flex-col gap-2">
      <span className="text-xs font-bold text-heading">{label}</span>
      {children}
      {error ? (
        <span
          className="flex items-center gap-1.5 text-xs font-semibold text-red-600"
          style={{ animation: "fade-in 0.25s ease both" }}
        >
          <AlertCircle className="h-3.5 w-3.5" /> {error}
        </span>
      ) : null}
    </label>
  );
}

function BookingForm() {
  const { t, locale } = useI18n();
  const searchParams = useSearchParams();
  const [form, setForm] = useState<FormState>(EMPTY);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");

  useEffect(() => {
    const roomParam = searchParams.get("room") ?? "";
    const offerParam = searchParams.get("offer") ?? "";
    const checkinParam = searchParams.get("checkin") ?? "";
    const checkoutParam = searchParams.get("checkout") ?? "";
    const guestsParam = searchParams.get("guests") ?? "2";

    setForm((f) => ({
      ...f,
      room: roomParam,
      offer: offerParam,
      checkin: checkinParam,
      checkout: checkoutParam,
      guests: guestsParam,
    }));

    // Auto scroll to booking if parameters or hash exist
    if (roomParam || offerParam || checkinParam || window.location.hash === "#booking") {
      const el = document.getElementById("booking");
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 150);
      }
    }
  }, [searchParams]);

  const set =
    (k: keyof FormState) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
      setForm((f) => ({ ...f, [k]: e.target.value }));
      setErrors((er) => ({ ...er, [k]: undefined }));
    };

  const selectedRoomObj = useMemo(() => {
    return rooms.find((r) => r.slug === form.room);
  }, [form.room]);

  const selectedOfferObj = useMemo(() => {
    return offers.find((o) => o.slug === form.offer);
  }, [form.offer]);

  const isAr = locale === "ar";

  const handleWhatsAppBooking = (e: React.MouseEvent) => {
    e.preventDefault();
    const errs = validate(form, locale);
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    const roomName = selectedRoomObj ? t(selectedRoomObj.name) : (form.room || "غير محدد");
    const offerName = selectedOfferObj ? t(selectedOfferObj.title) : (form.offer ? form.offer : "بدون عرض خاص");

    const message = isAr
      ? `مرحباً فندق مكارم أجياد مكة المكرمة 🕋،\nأود تأكيد طلب حجز إقامة جديدة:\n\n👤 *الاسم الكريم:* ${form.name}\n📱 *الجوال:* ${form.phone}\n📧 *البريد:* ${form.email}\n🏨 *الغرفة:* ${roomName}\n🏷️ *العرض:* ${offerName}\n📅 *تاريخ الوصول:* ${form.checkin || "يحدد لاحقاً"}\n📅 *تاريخ المغادرة:* ${form.checkout || "يحدد لاحقاً"}\n👥 *عدد الضيوف:* ${form.guests}\n📝 *ملاحظات:* ${form.notes || "لا توجد"}\n\nيرجى تأكيد التوفر والسعر النهائي. شكراً لكم!`
      : `Hello Makarem Ajyad Makkah Hotel 🕋,\nI would like to confirm a booking request:\n\n👤 *Name:* ${form.name}\n📱 *Phone:* ${form.phone}\n📧 *Email:* ${form.email}\n🏨 *Room:* ${roomName}\n🏷️ *Offer:* ${offerName}\n📅 *Check-in:* ${form.checkin || "TBD"}\n📅 *Check-out:* ${form.checkout || "TBD"}\n👥 *Guests:* ${form.guests}\n📝 *Notes:* ${form.notes || "None"}\n\nPlease confirm availability & total rate. Thank you!`;

    const url = `https://wa.me/${hotel.whatsapp.replace("+", "")}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate(form, locale);
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setStatus("sending");
    setTimeout(() => setStatus("sent"), 800);
  };

  const inputCls = (hasError?: string) =>
    `h-12 w-full rounded-2xl border bg-surface px-4 text-sm text-heading outline-none transition-colors placeholder:text-muted/60 focus:border-gold ${
      hasError ? "border-red-500" : "border-line"
    }`;

  if (status === "sent") {
    return (
      <div
        className="flex flex-col items-center gap-5 rounded-[2.5rem] bg-card p-8 sm:p-14 text-center card-shadow border border-line/70"
        style={{ animation: `modal-in 0.6s ${EASE} both` }}
      >
        <span
          className="flex h-16 w-16 items-center justify-center rounded-full bg-gold-soft text-gold"
          style={{ animation: "pop-in-big 0.5s cubic-bezier(0.34,1.56,0.64,1) 0.2s both" }}
        >
          <Check className="h-8 w-8 text-gold" />
        </span>
        <h3 className="text-2xl font-extrabold tracking-tight text-heading">
          {isAr ? "تم استلام طلبكم بنجاح" : "Request Received Successfully"}
        </h3>
        <p className="max-w-md leading-loose text-body text-sm sm:text-base">
          {isAr
            ? `شكراً لتواصلكم مع فندق مكارم أجياد مكة المكرمة؛ سيتواصل معكم فريق الحجوزات خلال ٢٤ ساعة على رقم الجوال (${form.phone}) لتأكيد تفاصيل الإقامة.`
            : `Thank you for contacting Makarem Ajyad Makkah Hotel; our reservations desk will reach out within 24 hours at (${form.phone}) to confirm your stay.`}
        </p>

        <div className="flex flex-wrap gap-3 justify-center mt-2">
          <button
            onClick={handleWhatsAppBooking}
            className="pill pill-gold btn-sweep h-12 px-6 text-xs font-bold"
          >
            <MessageCircle className="h-4 w-4" />
            {isAr ? "متابعة الطلب على واتساب فوراً" : "Follow up on WhatsApp"}
          </button>
          <button
            onClick={() => {
              setStatus("idle");
              setForm(EMPTY);
            }}
            className="pill pill-ghost h-12 px-6 text-xs font-semibold"
          >
            {isAr ? "إرسال طلب حجز آخر" : "Send another request"}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Selected Room Preview banner if room is selected */}
      {selectedRoomObj ? (
        <div className="flex items-center gap-4 rounded-2xl bg-surface p-4 border border-gold/40 card-shadow animate-[fade-in_0.3s_ease]">
          <div className="relative h-16 w-20 shrink-0 overflow-hidden rounded-xl">
            <SkeletonImage src={selectedRoomObj.images[0]} alt="" sizes="100px" />
          </div>
          <div className="flex-1 min-w-0">
            <span className="overline-tag !text-[0.65rem]">{isAr ? "الغرفة المحددة للحجز" : "Selected Room"}</span>
            <p className="font-extrabold text-heading text-sm sm:text-base truncate">
              {t(selectedRoomObj.name)}
            </p>
            <p className="text-xs text-gold font-bold" dir="ltr">
              {selectedRoomObj.priceFrom} {isAr ? "ر.س / ليلة" : "SAR / night"}
            </p>
          </div>
        </div>
      ) : null}

      <form
        onSubmit={submit}
        noValidate
        className="grid gap-5 rounded-[2.5rem] bg-card p-6 sm:p-9 card-shadow border border-line/60 md:grid-cols-2"
      >
        <Field label={isAr ? "الاسم الكامل *" : "Full Name *"} error={errors.name}>
          <input
            value={form.name}
            onChange={set("name")}
            className={inputCls(errors.name)}
            placeholder={isAr ? "الاسم الثلاثي" : "Your full name"}
          />
        </Field>

        <Field label={isAr ? "رقم الجوال (مع الرمز الدولي) *" : "Phone (with country code) *"} error={errors.phone}>
          <input
            type="tel"
            dir="ltr"
            value={form.phone}
            onChange={set("phone")}
            className={inputCls(errors.phone)}
            placeholder="+966 5X XXX XXXX"
          />
        </Field>

        <Field label={isAr ? "البريد الإلكتروني *" : "Email Address *"} error={errors.email}>
          <input
            type="email"
            dir="ltr"
            value={form.email}
            onChange={set("email")}
            className={inputCls(errors.email)}
            placeholder="you@email.com"
          />
        </Field>

        <Field label={isAr ? "عدد الضيوف" : "Guests"}>
          <select value={form.guests} onChange={set("guests")} className={inputCls()}>
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <option key={n} value={n}>
                {n} {isAr ? (n === 1 ? "ضيف" : n === 2 ? "ضيفان" : "ضيوف") : n === 1 ? "Guest" : "Guests"}
              </option>
            ))}
          </select>
        </Field>

        <Field label={isAr ? "تاريخ الوصول" : "Check-in Date"}>
          <input type="date" value={form.checkin} onChange={set("checkin")} className={inputCls()} />
        </Field>

        <Field label={isAr ? "تاريخ المغادرة" : "Check-out Date"} error={errors.checkout}>
          <input
            type="date"
            value={form.checkout}
            min={form.checkin}
            onChange={set("checkout")}
            className={inputCls(errors.checkout)}
          />
        </Field>

        <Field label={isAr ? "فئة الغرفة المطلوبة" : "Room / Suite"}>
          <select value={form.room} onChange={set("room")} className={inputCls()}>
            <option value="">{isAr ? "— اختر الغرفة —" : "— Select a room —"}</option>
            {rooms.map((r) => (
              <option key={r.slug} value={r.slug}>
                {r.name[locale]} ({r.priceFrom} SAR)
              </option>
            ))}
          </select>
        </Field>

        <Field label={isAr ? "العرض أو الباقة المفضلة" : "Preferred Offer"}>
          <select value={form.offer} onChange={set("offer")} className={inputCls()}>
            <option value="">{isAr ? "— بدون عرض —" : "— No special offer —"}</option>
            {offers.map((o) => (
              <option key={o.slug} value={o.slug}>
                {o.title[locale]}
              </option>
            ))}
          </select>
        </Field>

        <div className="md:col-span-2">
          <Field label={isAr ? "ملاحظات أو طلبات خاصة" : "Special Requests & Notes"}>
            <textarea
              rows={3}
              value={form.notes}
              onChange={set("notes")}
              className={`${inputCls()} h-auto resize-none py-3`}
              placeholder={
                isAr
                  ? "سرير إضافي، طابق مرتفع، إطلالة الحرم، موعد وصول مبكر..."
                  : "Extra bed, high floor, Haram view, early check-in request..."
              }
            />
          </Field>
        </div>

        <div className="md:col-span-2 flex flex-col sm:flex-row gap-3 pt-2">
          <button
            type="submit"
            disabled={status === "sending"}
            className="pill pill-primary btn-sweep h-13 flex-1 text-sm font-bold disabled:opacity-70"
          >
            {status === "sending" ? (
              <span className="spinner inline-block h-4 w-4 rounded-full border-2 border-[var(--on-brand)]/30 border-t-[var(--on-brand)]" />
            ) : (
              <Send className="h-4 w-4" />
            )}
            {status === "sending"
              ? isAr
                ? "جارٍ الإرسال…"
                : "Sending…"
              : isAr
                ? "إرسال طلب الحجز"
                : "Submit Booking Request"}
          </button>

          <button
            type="button"
            onClick={handleWhatsAppBooking}
            className="pill pill-gold btn-sweep h-13 px-6 text-sm font-extrabold flex items-center justify-center gap-2"
          >
            <MessageCircle className="h-4 w-4" />
            {isAr ? "إرسال الطلب عبر واتساب فوراً" : "Send via WhatsApp"}
          </button>
        </div>

        <div className="md:col-span-2 flex items-center justify-center gap-2 text-center text-xs text-muted pt-2 border-t border-line/50">
          <ShieldCheck className="h-4 w-4 text-gold shrink-0" />
          <span>
            {isAr
              ? "ضمان أفضل الأسعار وتأكيد فوري من مكتب الحجوزات الرسمي."
              : "Best rate guarantee & direct confirmation from the official front desk."}
          </span>
        </div>
      </form>
    </div>
  );
}

/* ── FAQ accordion ── */
function Faq() {
  const { t } = useI18n();
  const [openIdx, setOpenIdx] = useState<number | null>(0);
  return (
    <div className="flex flex-col">
      {faqs.map((f, i) => {
        const open = openIdx === i;
        return (
          <Reveal key={f.q.en} delay={i * 0.05}>
            <div className="border-b border-line">
              <button
                onClick={() => setOpenIdx(open ? null : i)}
                className="flex w-full items-center justify-between gap-4 py-5 text-start"
                aria-expanded={open}
              >
                <span className={`font-bold transition-colors ${open ? "text-gold" : "text-heading"}`}>
                  {t(f.q)}
                </span>
                <span
                  className={`shrink-0 text-muted transition-transform duration-300 ${open ? "rotate-180" : ""}`}
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
  );
}

export default function ContactPage() {
  const { t, locale } = useI18n();
  const isAr = locale === "ar";

  const cards = [
    {
      icon: Phone,
      title: { ar: "الهاتف المباشر", en: "Direct Phone" },
      body: hotel.phone,
      href: `tel:${hotel.phoneHref}`,
      ltr: true,
    },
    {
      icon: MessageCircle,
      title: { ar: "خدمة واتساب 24/7", en: "WhatsApp 24/7" },
      body: hotel.phone,
      href: `https://wa.me/${hotel.whatsapp.replace("+", "")}`,
      ltr: true,
    },
    {
      icon: Mail,
      title: { ar: "البريد الإلكتروني", en: "Email Desk" },
      body: hotel.email,
      href: `mailto:${hotel.email}`,
      ltr: true,
    },
    {
      icon: MapPin,
      title: { ar: "عنوان الفندق", en: "Hotel Address" },
      body: t(hotel.address),
    },
  ];

  return (
    <>
      <PageHero
        image="https://makaremhotels.com/_next/image?url=https%3A%2F%2Ftbi-p-001.sitecorecontenthub.cloud%2Fapi%2Fpublic%2Fcontent%2Fbb055cf86d30485a9670d214cf17c073-xmc-hero-desktop%3Fv%3D3575d7f7&w=1920&q=75"
        overline={{ ar: "تواصل وحجز مباشر", en: "Direct Contact & Booking" }}
        title={{ ar: "الحجز والتواصل مع فندق مكارم أجياد", en: "Makarem Ajyad Reservations & Contact" }}
        subtitle={{
          ar: "فريق الاستقبال وخدمة الضيوف ومكتب الإرشاد الديني في خدمتكم على مدار الساعة — احجز إقامتك مباشرة بأفضل الأسعار المضمونة.",
          en: "Front desk, concierge, and spiritual desk at your service 24/7 — book directly with guaranteed best rates.",
        }}
        crumbs={[
          { href: "/", label: { ar: "الرئيسية", en: "Home" } },
          { href: "/contact", label: { ar: "الاتصال والحجز", en: "Contact" } },
        ]}
      />

      <section className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 md:py-20 lg:px-8">
        {/* Info cards */}
        <StaggerGroup className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map((c) => {
            const Wrapper = c.href ? "a" : "div";
            return (
              <StaggerItem key={c.title.en}>
                <Wrapper
                  {...(c.href
                    ? {
                        href: c.href,
                        target: c.href.startsWith("http") ? "_blank" : undefined,
                        rel: "noopener noreferrer",
                      }
                    : {})}
                  className="group flex h-full flex-col gap-4 rounded-3xl bg-card p-7 card-shadow border border-line/50 transition-all duration-500 hover:-translate-y-1 hover:border-gold hover:card-shadow-hover"
                >
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gold-soft text-gold transition-colors duration-500 group-hover:bg-gold group-hover:text-white">
                    <c.icon className="h-5 w-5" />
                  </span>
                  <div>
                    <h3 className="text-sm font-extrabold text-heading group-hover:text-gold transition-colors">
                      {t(c.title)}
                    </h3>
                    <p
                      className="mt-1.5 text-sm leading-relaxed text-body"
                      dir={c.ltr ? "ltr" : undefined}
                    >
                      {c.body}
                    </p>
                  </div>
                </Wrapper>
              </StaggerItem>
            );
          })}
        </StaggerGroup>

        {/* Form + map */}
        <div className="mt-14 grid gap-10 lg:grid-cols-[1.5fr_1fr]">
          <div id="booking" className="scroll-mt-28">
            <Reveal className="mb-6">
              <span className="overline-tag !text-gold">{isAr ? "نموذج الحجز المباشر" : "Direct Booking Form"}</span>
              <h2 className="mt-2 text-2xl sm:text-3xl font-extrabold tracking-tight text-heading md:text-4xl font-display">
                {isAr ? "احجز إقامتكم في فندق مكارم أجياد" : "Book Your Stay at Makarem Ajyad"}
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <Suspense fallback={null}>
                <BookingForm />
              </Suspense>
            </Reveal>
          </div>

          <Reveal delay={0.15} className="flex flex-col gap-6">
            <div className="h-[380px] overflow-hidden rounded-[2.5rem] card-shadow border border-line/60">
              <iframe
                title={isAr ? "موقع فندق مكارم أجياد" : "Makarem Ajyad Hotel Location"}
                src="https://www.google.com/maps?q=Makarem+Ajyad+Makkah+Hotel&output=embed"
                className="h-full w-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
            <a
              href={hotel.directionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="pill pill-primary btn-sweep h-12 text-sm font-bold"
            >
              <Navigation className="h-4 w-4" />
              {isAr ? "احصل على الاتجاهات في خرائط Google" : "Get Directions in Google Maps"}
            </a>
            <div className="flex items-start gap-4 rounded-3xl bg-band p-6 border border-line/50">
              <Clock className="mt-1 h-5 w-5 shrink-0 text-gold" />
              <div>
                <p className="text-sm font-extrabold text-heading">
                  {isAr ? "ساعات العمل ومكتب الاستقبال" : "Working Hours & Front Desk"}
                </p>
                <p className="mt-1.5 text-sm leading-loose text-body">{t(hotel.hours)}</p>
              </div>
            </div>

            {/* FAQ */}
            <div className="rounded-3xl bg-card p-6 border border-line/50 card-shadow">
              <h3 className="mb-2 text-lg font-extrabold text-heading">
                {isAr ? "أسئلة شائعة" : "Frequently Asked"}
              </h3>
              <Faq />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Payment & Credit cards ribbon */}
      <PaymentCardsRibbon />
    </>
  );
}
