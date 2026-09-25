"use client";

import { useEffect, useState } from "react";
import { Play, X } from "lucide-react";
import { tour } from "@/lib/hotel-data";
import { useI18n } from "@/lib/i18n";
import { Reveal } from "./motion";
import { SkeletonImage } from "./SkeletonImage";
import { SectionHeading } from "./SectionHeading";

/** Hotel Tour — rounded media block with centered play button
    opening an animated modal with the video. */
export function VideoTour() {
  const { t, locale } = useI18n();
  const [open, setOpen] = useState(false);

  // Close on Escape + lock body scroll
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <section className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
      <SectionHeading
        overline={{ ar: "جولة الفندق", en: "Hotel Tour" }}
        title={{ ar: "شاهد إيجاد عن قرب", en: "See Agied Up Close" }}
        subtitle={{
          ar: "جولة مرئية قصيرة داخل بهو الفندق وأجنحته ومرافقه.",
          en: "A short visual walk through the lobby, suites, and facilities.",
        }}
      />

      <Reveal className="mt-12">
        <button
          onClick={() => setOpen(true)}
          className="group relative block h-[300px] w-full overflow-hidden rounded-[2rem] card-shadow focus-visible:outline-gold md:h-[520px]"
          aria-label={locale === "ar" ? "تشغيل فيديو الجولة" : "Play the hotel tour video"}
        >
          <SkeletonImage
            src={tour.poster}
            alt={t(tour.caption)}
            className="object-cover transition-transform duration-[1.6s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
            sizes="100vw"
          />
          <div
            className="absolute inset-0"
            style={{ background: "rgb(var(--overlay-ink) / 0.35)" }}
            aria-hidden
          />
          {/* Play button */}
          <span className="absolute start-1/2 top-1/2 flex h-20 w-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 shadow-xl transition-all duration-500 group-hover:scale-110 group-hover:bg-gold rtl:translate-x-1/2">
            <span className="absolute inset-0 animate-ping rounded-full bg-white/30" aria-hidden />
            <Play className="h-8 w-8 fill-heading text-heading transition-colors group-hover:fill-white group-hover:text-white" />
          </span>
          <span className="absolute bottom-6 start-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-white/85 px-5 py-2 text-sm font-semibold text-heading backdrop-blur rtl:translate-x-1/2">
            {t(tour.caption)}
          </span>
        </button>
      </Reveal>

      {/* Modal video player */}
      {open ? (
        <div
          className="fixed inset-0 z-[90] flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm"
          style={{ animation: "fade-in 0.35s ease both" }}
          onClick={() => setOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label={t(tour.caption)}
        >
          <div
            className="relative w-full max-w-5xl"
            style={{ animation: "modal-in 0.45s cubic-bezier(0.22,1,0.36,1) both" }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setOpen(false)}
              className="absolute -top-14 end-0 flex h-11 w-11 items-center justify-center rounded-full border border-white/30 text-white transition-colors hover:bg-white hover:text-black"
              aria-label="Close video"
            >
              <X className="h-5 w-5" />
            </button>
            <div className="overflow-hidden rounded-3xl shadow-2xl">
              <video
                src={tour.video}
                controls
                autoPlay
                playsInline
                className="aspect-video w-full bg-black"
              />
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}
