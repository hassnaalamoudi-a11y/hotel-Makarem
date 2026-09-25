"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function GsapEffects() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // 1. TEXT REVEAL STAGGER ANIMATION (Headings & Overline Tags)
      const headings = gsap.utils.toArray<HTMLElement>("h2.font-display, .section-heading h2");
      headings.forEach((heading) => {
        gsap.fromTo(
          heading,
          { opacity: 0, y: 35, filter: "blur(6px)" },
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 0.95,
            ease: "power3.out",
            scrollTrigger: {
              trigger: heading,
              start: "top 88%",
              toggleActions: "play none none none",
            },
          }
        );
      });

      // 2. CARDS STAGGER ANIMATION (Room cards, offer cards, amenities)
      const cardContainers = gsap.utils.toArray<HTMLElement>(
        ".stagger-run, .grid-cards-stagger, .grid.gap-7, .grid.gap-6"
      );
      cardContainers.forEach((container) => {
        const items = Array.from(container.children).filter(
          (c) => !c.classList.contains("no-stagger")
        );
        if (items.length > 0) {
          gsap.fromTo(
            items,
            { opacity: 0, y: 45, scale: 0.96 },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.85,
              ease: "power2.out",
              stagger: 0.12,
              scrollTrigger: {
                trigger: container,
                start: "top 84%",
                toggleActions: "play none none none",
              },
            }
          );
        }
      });

      // 3. IMAGE SCALE / ZOOM SCROLL (Smooth scrubbed scale on media)
      const zoomContainers = gsap.utils.toArray<HTMLElement>(
        ".about-image-zoom, .dining-image-zoom, .cta-image-zoom"
      );
      zoomContainers.forEach((container) => {
        const img = container.querySelector("img") || container;
        gsap.fromTo(
          img,
          { scale: 1 },
          {
            scale: 1.14,
            ease: "none",
            scrollTrigger: {
              trigger: container,
              start: "top bottom",
              end: "bottom top",
              scrub: 1.2,
            },
          }
        );
      });

      // 4. PARALLAX FLOATING BADGES & ACCENTS
      const floatAccents = gsap.utils.toArray<HTMLElement>(".gsap-float");
      floatAccents.forEach((accent) => {
        gsap.fromTo(
          accent,
          { yPercent: 15 },
          {
            yPercent: -15,
            ease: "none",
            scrollTrigger: {
              trigger: accent,
              start: "top bottom",
              end: "bottom top",
              scrub: 1,
            },
          }
        );
      });

      // 5. SECTION TRANSITION BLEND (Smooth background contrast blend)
      const sections = gsap.utils.toArray<HTMLElement>("section");
      sections.forEach((sec) => {
        gsap.fromTo(
          sec,
          { opacity: 0.92 },
          {
            opacity: 1,
            duration: 0.6,
            ease: "power1.out",
            scrollTrigger: {
              trigger: sec,
              start: "top 90%",
              toggleActions: "play none none none",
            },
          }
        );
      });
    });

    // Refresh triggers once all initial DOM elements & images are rendered
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 400);

    return () => {
      clearTimeout(timer);
      ctx.revert();
    };
  }, []);

  return null;
}
