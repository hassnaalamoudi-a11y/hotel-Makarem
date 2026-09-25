"use client";

import { useTheme, useI18n } from "@/lib/i18n";
import { Sun, Moon } from "lucide-react";

interface ThemeToggleProps {
  variant?: "icon" | "pill" | "row";
  className?: string;
}

export function ThemeToggle({ variant = "icon", className = "" }: ThemeToggleProps) {
  const { theme, toggle } = useTheme();
  const { locale } = useI18n();
  const isAr = locale === "ar";
  const isDark = theme === "dark";

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX || rect.left + rect.width / 2;
    const y = e.clientY || rect.top + rect.height / 2;
    toggle(x, y);
  };

  const label = isDark
    ? isAr
      ? "الوضع النهاري"
      : "Light Mode"
    : isAr
      ? "الوضع الليلي"
      : "Dark Mode";

  // Full Row Variant for Mobile Drawer
  if (variant === "row") {
    return (
      <button
        onClick={handleClick}
        aria-label={label}
        className={`flex w-full items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-bold text-white transition-all hover:border-gold/50 hover:bg-white/10 ${className}`}
      >
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gold/20 text-gold shadow-inner">
            {isDark ? (
              <Sun className="h-4 w-4 transition-transform duration-500 rotate-0 hover:rotate-45" />
            ) : (
              <Moon className="h-4 w-4 transition-transform duration-500 -rotate-12 hover:rotate-0" />
            )}
          </div>
          <span>{label}</span>
        </div>

        {/* Switch Pill */}
        <div
          className={`relative h-6 w-11 rounded-full p-0.5 transition-colors duration-300 ${
            isDark ? "bg-gold" : "bg-white/20"
          }`}
        >
          <div
            className={`h-5 w-5 rounded-full bg-white shadow-md transition-transform duration-300 ease-out flex items-center justify-center ${
              isDark ? "translate-x-5" : "translate-x-0"
            }`}
          >
            {isDark ? (
              <Moon className="h-3 w-3 text-[#1C1613]" />
            ) : (
              <Sun className="h-3 w-3 text-amber-500" />
            )}
          </div>
        </div>
      </button>
    );
  }

  // Pill Variant with text
  if (variant === "pill") {
    return (
      <button
        onClick={handleClick}
        aria-label={label}
        className={`group relative flex h-9 items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3.5 text-xs font-bold text-white shadow-sm backdrop-blur-md transition-all duration-300 hover:border-gold/60 hover:bg-white/15 hover:shadow-[0_0_15px_rgba(185,150,87,0.3)] active:scale-95 ${className}`}
      >
        <span className="relative flex h-4 w-4 items-center justify-center overflow-hidden">
          <Sun
            className={`absolute h-4 w-4 text-gold transition-all duration-500 ${
              isDark
                ? "rotate-0 scale-100 opacity-100"
                : "rotate-90 scale-0 opacity-0"
            }`}
          />
          <Moon
            className={`absolute h-4 w-4 text-gold transition-all duration-500 ${
              isDark
                ? "-rotate-90 scale-0 opacity-0"
                : "rotate-0 scale-100 opacity-100"
            }`}
          />
        </span>
        <span className="hidden sm:inline-block">{label}</span>
      </button>
    );
  }

  // Default Icon Button Variant
  return (
    <button
      onClick={handleClick}
      aria-label={label}
      title={label}
      className={`group relative flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-md transition-all duration-300 hover:border-gold/60 hover:bg-white/20 hover:scale-105 hover:shadow-[0_0_18px_rgba(185,150,87,0.35)] active:scale-95 ${className}`}
    >
      <div className="relative flex h-4 w-4 items-center justify-center">
        <Sun
          className={`absolute h-4 w-4 text-gold transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
            isDark
              ? "rotate-0 scale-100 opacity-100"
              : "rotate-90 scale-0 opacity-0"
          }`}
        />
        <Moon
          className={`absolute h-4 w-4 text-gold transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
            isDark
              ? "-rotate-90 scale-0 opacity-0"
              : "rotate-0 scale-100 opacity-100"
          }`}
        />
      </div>

      {/* Subtle glowing ring on hover */}
      <span className="absolute inset-0 rounded-full border border-gold/0 transition-all duration-300 group-hover:border-gold/40 group-hover:scale-110 pointer-events-none" />
    </button>
  );
}
