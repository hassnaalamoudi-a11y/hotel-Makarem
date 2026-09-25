"use client";

import { CreditCard, ShieldCheck, Lock, Clock, Zap, CheckCircle2 } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { Reveal } from "@/components/motion";

export function PaymentCardsRibbon() {
  const { locale } = useI18n();
  const isAr = locale === "ar";

  const paymentMethods = [
    { name: "mada", label: isAr ? "مدى" : "Mada", color: "from-emerald-600 to-teal-700" },
    { name: "visa", label: isAr ? "فيزا" : "Visa", color: "from-blue-600 to-indigo-800" },
    { name: "mastercard", label: isAr ? "ماستركارد" : "MasterCard", color: "from-amber-600 to-red-600" },
    { name: "applepay", label: isAr ? "أبل باي" : "Apple Pay", color: "from-zinc-800 to-zinc-950" },
    { name: "amex", label: isAr ? "أمريكان إكسبريس" : "AMEX", color: "from-cyan-700 to-blue-900" },
  ];

  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <Reveal>
        <div className="relative overflow-hidden rounded-3xl sm:rounded-[2.5rem] bg-card border border-line/70 p-5 sm:p-8 md:p-10 card-shadow">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Info Column */}
            <div className="lg:col-span-6 flex flex-col gap-3">
              <div className="inline-flex items-center gap-2 rounded-full bg-gold-soft px-3.5 py-1 text-xs font-bold text-gold w-fit">
                <ShieldCheck className="h-3.5 w-3.5" />
                <span>{isAr ? "دفع آمن ومعتمد ١٠٠٪" : "100% Secure Verified Checkout"}</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-heading">
                {isAr ? "خيارات دفع وبطاقات ائتمان متعددة" : "Flexible Payment & Credit Card Options"}
              </h3>
              <p className="text-sm leading-relaxed text-muted">
                {isAr
                  ? "نوفر لكم تجربة حجز سلسة وآمنة عبر تشكيلة واسعة من البطاقات الائتمانية والخصم المباشر، مع إمكانية التقسيط الميسر بدون فوائد مع البنوك المعتمدة."
                  : "Enjoy a smooth and secure booking experience with wide credit & debit card acceptance and 0% installment plans with certified banks."}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="flex items-center gap-2 text-xs font-semibold text-body">
                  <CheckCircle2 className="h-4 w-4 text-gold shrink-0" />
                  <span>{isAr ? "تأكيد فوري للحجز" : "Instant Confirmation"}</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-semibold text-body">
                  <Lock className="h-4 w-4 text-gold shrink-0" />
                  <span>{isAr ? "تشفير بيانات SSL 256" : "256-Bit SSL Encrypted"}</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-semibold text-body">
                  <Zap className="h-4 w-4 text-gold shrink-0" />
                  <span>{isAr ? "بدون رسوم إضافية" : "Zero Hidden Surcharges"}</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-semibold text-body">
                  <Clock className="h-4 w-4 text-gold shrink-0" />
                  <span>{isAr ? "إلغاء مرن متاح" : "Flexible Cancellation"}</span>
                </div>
              </div>
            </div>

            {/* Right Cards Badges */}
            <div className="lg:col-span-6 flex flex-col gap-4">
              <span className="text-xs font-bold uppercase tracking-wider text-muted">
                {isAr ? "البطاقات وطرق الدفع المقبولة" : "Accepted Payment Methods"}
              </span>
              <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                {paymentMethods.map((pm) => (
                  <div
                    key={pm.name}
                    className={`flex h-11 sm:h-12 flex-1 min-w-[75px] sm:min-w-[90px] items-center justify-center rounded-2xl bg-gradient-to-br ${pm.color} px-3 py-2 text-white font-extrabold text-xs sm:text-sm shadow-md transition-transform hover:scale-105 select-none`}
                  >
                    <span>{pm.label}</span>
                  </div>
                ))}
              </div>

              {/* Installment Bank Notes */}
              <div className="mt-2 rounded-2xl bg-band p-4 border border-line/60 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <CreditCard className="h-5 w-5 text-gold shrink-0" />
                  <p className="text-xs font-medium text-body leading-relaxed">
                    {isAr
                      ? "إمكانية تقسيط الدفع على ٣ أو ٦ أشهر بدون فوائد لحاملي بطاقات بنك الراجحي، الأهلي، والرياض."
                      : "0% interest installment available for 3 or 6 months with select Saudi partner bank cards."}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
