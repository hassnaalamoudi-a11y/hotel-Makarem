"use client";

import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";

export const EASE = "cubic-bezier(0.22, 1, 0.36, 1)";
export const EASE_SPRING = "cubic-bezier(0.34, 1.56, 0.64, 1)";
export const EASE_SMOOTH = "cubic-bezier(0.16, 1, 0.3, 1)";

const reduceMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ── IntersectionObserver hook (fires once) ─────────────────────── */

export function useInViewOnce<T extends HTMLElement>(margin = "-40px") {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (reduceMotion()) {
      setInView(true);
      return;
    }
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          obs.disconnect();
        }
      },
      { rootMargin: margin, threshold: 0.08 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [margin]);

  return { ref, inView };
}

/** Base style applied before reveal — keeps layout stable */
const hiddenStyle: CSSProperties = {
  opacity: 0,
  willChange: "opacity, transform",
};

/* ── Reveal: fade + slide-up on scroll ──────────────────────────── */

export function Reveal({
  children,
  delay = 0,
  duration = 0.75,
  className,
  y = 32,
  as: Tag = "div",
}: {
  children: ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
  y?: number;
  as?: "div" | "section" | "span" | "article" | "header" | "footer";
}) {
  const { ref, inView } = useInViewOnce<HTMLDivElement>();
  return (
    <Tag
      ref={ref as never}
      className={className}
      style={
        inView
          ? {
              animation: `reveal-up ${duration}s ${EASE_SMOOTH} ${delay}s both`,
            }
          : hiddenStyle
      }
    >
      {children}
    </Tag>
  );
}

/* ── RevealFade: simple opacity only ────────────────────────────── */

export function RevealFade({
  children,
  delay = 0,
  duration = 0.65,
  className,
}: {
  children: ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
}) {
  const { ref, inView } = useInViewOnce<HTMLDivElement>();
  return (
    <div
      ref={ref}
      className={className}
      style={
        inView
          ? { animation: `reveal-fade ${duration}s ease ${delay}s both` }
          : hiddenStyle
      }
    >
      {children}
    </div>
  );
}

/* ── RevealScale: scale + fade with spring bounce ───────────────── */

export function RevealScale({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const { ref, inView } = useInViewOnce<HTMLDivElement>("-20px");
  return (
    <div
      ref={ref}
      className={className}
      style={
        inView
          ? { animation: `reveal-scale 0.7s ${EASE_SPRING} ${delay}s both` }
          : hiddenStyle
      }
    >
      {children}
    </div>
  );
}

/* ── Stagger group: children animate one after another (CSS-driven) */

export function StaggerGroup({
  children,
  className,
  run = false,
}: {
  children: ReactNode;
  className?: string;
  /** Force the stagger to run immediately (e.g. on filter change) */
  run?: boolean;
}) {
  const { ref, inView } = useInViewOnce<HTMLDivElement>();
  const active = inView || run;
  return (
    <div
      ref={ref}
      className={`${className ?? ""} stagger-group ${active ? "stagger-active" : ""}`}
    >
      {children}
    </div>
  );
}

export function StaggerItem({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={className}>{children}</div>;
}

/* ── SlideFrom: images/cards from different directions ───────────── */

export function SlideFrom({
  children,
  from,
  className,
  delay = 0,
}: {
  children: ReactNode;
  from: "start" | "end" | "top" | "bottom";
  className?: string;
  delay?: number;
}) {
  const { ref, inView } = useInViewOnce<HTMLDivElement>();
  const animMap: Record<string, string> = {
    start: "reveal-from-start",
    end: "reveal-from-end",
    top: "reveal-from-top",
    bottom: "reveal-up",
  };
  const name = animMap[from] ?? "reveal-up";
  return (
    <div
      ref={ref}
      className={className}
      style={
        inView
          ? { animation: `${name} 0.85s ${EASE_SMOOTH} ${delay}s both` }
          : hiddenStyle
      }
    >
      {children}
    </div>
  );
}

/* ── Parallax: subtle scroll-linked translate ───────────────────── */

export function Parallax({
  children,
  className,
  distance = 40,
}: {
  children: ReactNode;
  className?: string;
  distance?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || reduceMotion()) return;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const rect = el.getBoundingClientRect();
        const vh = innerHeight;
        const progress = (vh - rect.top) / (vh + rect.height);
        const clamped = Math.min(Math.max(progress, 0), 1);
        el.style.transform = `translateY(${(0.5 - clamped) * distance * 2}px)`;
      });
    };
    onScroll();
    addEventListener("scroll", onScroll, { passive: true });
    return () => {
      removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [distance]);

  return (
    <div ref={ref} className={className} style={{ willChange: "transform" }}>
      {children}
    </div>
  );
}

/* ── ScrollProgressBar: gold progress bar fixed at top ──────────── */

export function ScrollProgressBar() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (reduceMotion()) return;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const scrollTop = window.scrollY;
        const docHeight =
          document.documentElement.scrollHeight - window.innerHeight;
        setProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0);
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      aria-hidden
      className="fixed top-0 left-0 right-0 z-[9999] h-[3px] pointer-events-none"
    >
      <div
        style={{
          height: "100%",
          width: `${progress}%`,
          background:
            "linear-gradient(90deg, #9d7743 0%, #e8c97a 40%, #d4a855 70%, #9d7743 100%)",
          boxShadow:
            "0 0 10px rgba(185,150,87,0.9), 0 0 20px rgba(185,150,87,0.5)",
          transition: "width 0.12s linear",
        }}
      />
    </div>
  );
}

/* ── SmoothScrollProvider: native smooth scroll + anchor helper ──── */

export function SmoothScrollProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    if (reduceMotion()) return;
    const handleAnchorClick = (e: MouseEvent) => {
      const anchor = (e.target as HTMLElement).closest(
        "a[href^='#']",
      ) as HTMLAnchorElement | null;
      if (!anchor) return;
      const hash = anchor.getAttribute("href");
      if (!hash || hash === "#") return;
      const el = document.querySelector(hash);
      if (!el) return;
      e.preventDefault();
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      history.pushState(null, "", hash);
    };
    document.addEventListener("click", handleAnchorClick);
    return () => document.removeEventListener("click", handleAnchorClick);
  }, []);

  return <>{children}</>;
}
