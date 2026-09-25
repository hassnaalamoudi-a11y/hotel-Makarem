"use client";

import Image from "next/image";
import Link from "next/link";
import { Compass, BookOpen, Map, Sparkles, ArrowLeft, ArrowRight, ShieldCheck } from "lucide-react";
import { hotel } from "@/lib/hotel-data";
import { useI18n } from "@/lib/i18n";
import { Reveal } from "@/components/motion";

export function SpiritualFeatures() {
  const { t, locale } = useI18n();
  const isAr = locale === "ar";

  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 md:py-24 lg:px-8">
      {/* Section Header */}
      <Reveal className="text-center max-w-3xl mx-auto mb-14">
        <div className="inline-flex items-center gap-2 rounded-full bg-gold-soft px-4 py-1.5 text-xs font-bold text-gold mb-3">
          <Sparkles className="h-3.5 w-3.5" />
          <span>{isAr ? "خدمات مكارم الحصرية" : "Exclusive Makarem Signature Services"}</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-heading md:text-5xl font-display">
          {isAr ? (
            <>
              تجربة روحانية متكاملة <span className="text-gold">تليق بضيوف الرحمن</span>
            </>
          ) : (
            <>
              A Spiritual Journey <span className="text-gold">Dedicated to Pilgrims</span>
            </>
          )}
        </h2>
        <p className="mt-4 text-sm sm:text-base leading-relaxed text-muted sm:text-lg">
          {isAr
            ? "يقدم فندق مكارم أجياد باقة فريدة من الخدمات المصممة لتعزيز الراحة والسكينة طوال فترة إقامتكم بجوار بيت الله الحرام."
            : "Makarem Ajyad Hotel offers a unique suite of services crafted to enrich your peace of mind throughout your stay by the Holy Mosque."}
        </p>
      </Reveal>

      {/* Grid of 3 Premium Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
        {/* 1. Spiritual Concierge */}
        <Reveal delay={0.05} className="h-full">
          <div className="card-shadow card-3d-hover group relative flex flex-col justify-between overflow-hidden rounded-[2rem] bg-card p-8 border border-line/60 h-full">
            <div className="relative z-10">
              <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gold-soft text-gold mb-6 group-hover:scale-110 transition-transform duration-300">
                <Compass className="h-7 w-7" />
              </span>
              <span className="overline-tag !text-gold">{isAr ? "إرشاد المناسك" : "Religious Concierge"}</span>
              <h3 className="mt-2 text-2xl font-extrabold text-heading">
                {isAr ? "مكتب الإرشاد الديني" : "Spiritual Concierge Desk"}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-body">
                {isAr
                  ? "مرشد ديني متخصص ومؤهل لمرافقة ضيوف الرحمن، وتقديم النصح والإجابة على الاستفسارات الفقهية حول مناسك العمرة والحج بيسر وطمأنينة."
                  : "A dedicated religious concierge desk to guide pilgrims through their spiritual journey, rituals, and inquiries with utmost clarity."}
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-line/50 flex items-center justify-between text-xs font-bold text-gold">
              <span>{isAr ? "متاح على مدار الساعة" : "Available 24/7"}</span>
              <ShieldCheck className="h-4 w-4 text-gold" />
            </div>
          </div>
        </Reveal>

        {/* 2. Virtual Map & Room Selector */}
        <Reveal delay={0.1} className="h-full">
          <div className="card-shadow card-3d-hover group relative flex flex-col justify-between overflow-hidden rounded-[2rem] bg-card p-8 border border-line/60 h-full">
            <div className="relative z-10">
              <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gold-soft text-gold mb-6 group-hover:scale-110 transition-transform duration-300">
                <Map className="h-7 w-7" />
              </span>
              <span className="overline-tag !text-gold">{isAr ? "تقنية تفاعلية" : "Interactive Tech"}</span>
              <h3 className="mt-2 text-2xl font-extrabold text-heading">
                {isAr ? "الخريطة الافتراضية للغرف" : "Virtual Room & Floor Map"}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-body">
                {isAr
                  ? "استعرض خريطة فندق مكارم أجياد ثلاثية الأبعاد؛ تعرف على موقع كل غرفة وإطلالتها المباشرة على الحرم، واختر غرفتك المفضلة قبل وصولك."
                  : "Explore the virtual interactive map of Makarem Ajyad before arrival; view room locations, floor views of the Haram, and choose your favorite room."}
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-line/50 flex items-center justify-between text-xs font-bold">
              <a
                href={hotel.virtualMapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-gold hover:underline group-hover:gap-2 transition-all"
              >
                <span>{isAr ? "استكشف الخريطة الافتراضية" : "Explore Virtual Map"}</span>
                {isAr ? <ArrowLeft className="h-3.5 w-3.5" /> : <ArrowRight className="h-3.5 w-3.5" />}
              </a>
            </div>
          </div>
        </Reveal>

        {/* 3. Islamic Library */}
        <Reveal delay={0.15} className="h-full">
          <div className="card-shadow card-3d-hover group relative flex flex-col justify-between overflow-hidden rounded-[2rem] bg-card p-8 border border-line/60 h-full">
            <div className="relative z-10">
              <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gold-soft text-gold mb-6 group-hover:scale-110 transition-transform duration-300">
                <BookOpen className="h-7 w-7" />
              </span>
              <span className="overline-tag !text-gold">{isAr ? "هدوء وتأمل" : "Peace & Reflection"}</span>
              <h3 className="mt-2 text-2xl font-extrabold text-heading">
                {isAr ? "المكتبة الإسلامية الهادئة" : "Islamic Cultural Library"}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-body">
                {isAr
                  ? "مكتبة غنية بأمهات الكتب الدينية، والتفاسير، والسيرة النبوية الشريفة بلغات متعددة، توفر مساحة فريدة للسكينة والقراءة بعد أداء الصلوات."
                  : "A serene library housing Islamic literature, commentaries, and history in multiple languages, offering a sanctuary for peaceful reading and contemplation."}
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-line/50 flex items-center justify-between text-xs font-bold text-gold">
              <span>{isAr ? "مفتوحة لجميع نزلاء الفندق" : "Open for all hotel guests"}</span>
              <Sparkles className="h-4 w-4 text-gold" />
            </div>
          </div>
        </Reveal>
      </div>

      {/* Featured Virtual Map Banner Card */}
      <Reveal className="mt-12">
        <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-r from-[#1E1813] via-[#2A211B] to-[#1E1813] text-[#FAF6F1] p-8 sm:p-12 card-shadow border border-gold/40">
          <div className="grid lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 flex flex-col gap-4">
              <span className="overline-tag !text-gold">
                {isAr ? "خدمة رقمية حصرية من مكارم" : "Exclusive Makarem Digital Service"}
              </span>
              <h3 className="text-2xl sm:text-4xl font-extrabold text-white leading-tight font-display">
                {isAr
                  ? "اختر غرفتك وإطلالتك على الحرم قبل موعد وصولك"
                  : "Choose Your Room & Haram View Before Arrival"}
              </h3>
              <p className="text-sm sm:text-base leading-relaxed text-white/80">
                {isAr
                  ? "عبر خريطتنا الافتراضية المتطورة، يمكنك رؤية موقع الغرفة بدقة في الطابق المحدد، والتأكد من القرب من المصاعد وإطلالة النوافذ على المسجد الحرام وبرج الساعة."
                  : "With our advanced Virtual Map, inspect room positions across floors, check lift proximity, and confirm vistas toward the Holy Mosque and Clock Tower."}
              </p>
              <div className="mt-2 flex flex-wrap gap-4">
                <a
                  href={hotel.virtualMapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="pill pill-gold btn-sweep h-12 px-7 text-xs font-bold"
                >
                  {isAr ? "عرض الخريطة الافتراضية الآن" : "Launch Virtual Map"}
                </a>
                <Link
                  href="/rooms"
                  className="pill h-12 border border-white/30 px-7 text-xs font-bold text-white hover:bg-white hover:text-heading transition-colors"
                >
                  {isAr ? "استعراض جميع الغرف" : "Browse All Rooms"}
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5 relative h-64 sm:h-72 rounded-2xl overflow-hidden border border-white/20 shadow-xl">
              <Image
                src="https://makaremhotels.com/_next/image?url=https%3A%2F%2Ftbi-p-001.sitecorecontenthub.cloud%2Fapi%2Fpublic%2Fcontent%2Fbf852c642e1440baaed9bd347765f175%3Fv%3De95c2bc7&w=1920&q=75"
                alt={isAr ? "الخريطة الافتراضية لفندق مكارم أجياد" : "Makarem Ajyad Virtual Map"}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end p-5">
                <div className="flex items-center gap-2 text-xs font-bold text-white">
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-400 animate-ping" />
                  <span>{isAr ? "خريطة تفاعلية مباشرة" : "Live Interactive Map"}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
