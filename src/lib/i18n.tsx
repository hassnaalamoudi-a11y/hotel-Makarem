"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import type { L, Locale } from "./hotel-data";

type I18n = {
  locale: Locale;
  dir: "rtl" | "ltr";
  t: (x: L) => string;
  setLocale: (l: Locale) => void;
  toggle: () => void;
};

const I18nContext = createContext<I18n | null>(null);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("ar");

  /* Restore the saved language after hydration. SSR always renders
     Arabic, so the restore runs once on mount (theme uses CSS vars
     so it can be applied pre-paint; language changes text content,
     which must wait for hydration). */
  useEffect(() => {
    try {
      const saved = localStorage.getItem("agied-locale");
      if (saved === "en" || saved === "ar") setLocaleState(saved);
    } catch {
      /* private mode */
    }
  }, []);

  const setLocale = useCallback((l: Locale) => {
    setLocaleState(l);
    try {
      localStorage.setItem("agied-locale", l);
    } catch {
      /* private mode */
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = locale === "ar" ? "rtl" : "ltr";
  }, [locale]);

  const t = useCallback((x: L) => x[locale], [locale]);

  const toggle = useCallback(
    () => setLocale(locale === "ar" ? "en" : "ar"),
    [locale, setLocale],
  );

  return (
    <I18nContext.Provider
      value={{
        locale,
        dir: locale === "ar" ? "rtl" : "ltr",
        t,
        setLocale,
        toggle,
      }}
    >
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within I18nProvider");
  return ctx;
}

/* ── Dark / light theme ──────────────────────────────────────────
   First visit: respect prefers-color-scheme. Then saved in
   localStorage. A blocking script in layout.tsx applies the saved
   theme before paint → no flash of the wrong theme. */

type Theme = "light" | "dark";

const ThemeContext = createContext<{
  theme: Theme;
  toggle: (x: number, y: number) => void;
} | null>(null);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    const saved = localStorage.getItem("agied-theme") as Theme | null;
    const initial: Theme =
      saved ??
      (window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light");
    setTheme(initial);
    document.documentElement.setAttribute("data-theme", initial);
  }, []);

  /** Circular-reveal switch via View Transitions API (falls back
      to the CSS cross-fade on unsupported browsers). */
  const toggle = useCallback((x = innerWidth / 2, y = 64) => {
    const next: Theme =
      document.documentElement.getAttribute("data-theme") === "dark"
        ? "light"
        : "dark";

    const apply = () => {
      document.documentElement.setAttribute("data-theme", next);
      try {
        localStorage.setItem("agied-theme", next);
      } catch {
        /* private mode */
      }
      setTheme(next);
    };

    const doc = document as Document & {
      startViewTransition?: (cb: () => void) => { ready: Promise<void> };
    };

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!doc.startViewTransition || reduce) {
      document.documentElement.classList.add("theme-transitioning");
      apply();
      setTimeout(() => {
        document.documentElement.classList.remove("theme-transitioning");
      }, 500);
      return;
    }

    const right = window.innerWidth - x;
    const bottom = window.innerHeight - y;
    const maxRadius = Math.hypot(Math.max(x, right), Math.max(y, bottom));

    const transition = doc.startViewTransition(apply);

    transition.ready
      .then(() => {
        const clipPath = [
          `circle(0px at ${x}px ${y}px)`,
          `circle(${maxRadius}px at ${x}px ${y}px)`,
        ];
        document.documentElement.animate(
          {
            clipPath: clipPath,
          },
          {
            duration: 650,
            easing: "cubic-bezier(0.22, 1, 0.36, 1)",
            pseudoElement: "::view-transition-new(root)",
          }
        );
      })
      .catch(() => {
        // Fallback for browsers that don't support pseudoElement animate
      });
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggle }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}
