"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Ultra-smooth luxury gold scroll progress bar
 * Features:
 * - Fluid rAF interpolation (lerp) for buttery smooth motion
 * - Rich 24K gold multi-tone gradient
 * - Luminous glowing head at the progress edge
 * - Ultra-high z-index above all navigation layers
 */
export function ScrollProgress() {
  const [progress, setProgress] = useState(0);
  const targetProgress = useRef(0);
  const currentProgress = useRef(0);
  const rafId = useRef<number | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      if (scrollHeight > 0) {
        targetProgress.current = Math.min(
          1,
          Math.max(0, window.scrollY / scrollHeight),
        );
      } else {
        targetProgress.current = 0;
      }
    };

    // Smooth Lerp loop (60/120fps)
    const animate = () => {
      // Lerp factor 0.18 gives responsive yet silky smooth dampening
      currentProgress.current +=
        (targetProgress.current - currentProgress.current) * 0.18;

      if (
        Math.abs(targetProgress.current - currentProgress.current) < 0.0005
      ) {
        currentProgress.current = targetProgress.current;
      }

      setProgress(currentProgress.current);
      rafId.current = requestAnimationFrame(animate);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);
    rafId.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, []);

  // Don't show anything until scrolled a tiny bit
  const percentage = progress * 100;
  const isVisible = progress > 0.002;

  return (
    <div
      aria-hidden
      className={`fixed inset-x-0 top-0 z-[100] h-[3.5px] pointer-events-none transition-opacity duration-300 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      {/* Background track (subtle line) */}
      <div className="absolute inset-0 bg-black/15 backdrop-blur-[1px]" />

      {/* Main Gold Progress Bar */}
      <div
        className="relative h-full will-change-transform"
        style={{
          width: `${percentage}%`,
          background:
            "linear-gradient(90deg, #9d7743 0%, #c5a059 30%, #f7e3af 55%, #dfb567 85%, #b99657 100%)",
          boxShadow:
            "0 0 12px rgba(223, 181, 103, 0.9), 0 0 24px rgba(185, 150, 87, 0.45)",
        }}
      >
        {/* Glowing Head / Star at the tip of the progress bar */}
        <div className="absolute top-1/2 -right-1 -translate-y-1/2 w-3.5 h-3.5 rounded-full bg-white shadow-[0_0_10px_#fff,0_0_18px_#dfb567] opacity-90 animate-pulse pointer-events-none" />
      </div>
    </div>
  );
}
