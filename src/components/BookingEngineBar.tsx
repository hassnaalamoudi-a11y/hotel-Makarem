"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Calendar, Users, BedDouble, Search } from "lucide-react";
import { rooms, roomTypes } from "@/lib/hotel-data";
import { useI18n } from "@/lib/i18n";

export function BookingEngineBar() {
  const router = useRouter();
  const { t, locale } = useI18n();

  // Get default dates: tomorrow and +3 days
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const nextThreeDays = new Date(today);
  nextThreeDays.setDate(nextThreeDays.getDate() + 4);

  const defaultCheckIn = tomorrow.toISOString().split("T")[0];
  const defaultCheckOut = nextThreeDays.toISOString().split("T")[0];

  const [checkin, setCheckin] = useState(defaultCheckIn);
  const [checkout, setCheckout] = useState(defaultCheckOut);
  const [guests, setGuests] = useState("2");
  const [room, setRoom] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (checkin) params.set("checkin", checkin);
    if (checkout) params.set("checkout", checkout);
    if (guests) params.set("guests", guests);
    if (room) params.set("room", room);
    router.push(`/contact?${params.toString()}#booking`);
  };

  const isAr = locale === "ar";

  return (
    <div className="relative mx-auto w-full max-w-6xl px-4 -mt-10 sm:-mt-12 z-30">
      <form
        onSubmit={handleSearch}
        className="grid grid-cols-1 gap-3 rounded-[2rem] bg-card p-4 sm:p-5 card-shadow md:grid-cols-4 lg:grid-cols-5 items-center border border-line/60 backdrop-blur-md"
      >
        {/* Check-in */}
        <div className="flex flex-col gap-1.5 px-3 py-2 rounded-2xl bg-surface/80 border border-line/40 hover:border-gold transition-colors">
          <label className="flex items-center gap-2 text-[0.7rem] font-bold uppercase tracking-wider text-muted">
            <Calendar className="h-3.5 w-3.5 text-gold" />
            {isAr ? "تاريخ الوصول" : "Check-in"}
          </label>
          <input
            type="date"
            value={checkin}
            onChange={(e) => setCheckin(e.target.value)}
            className="w-full bg-transparent text-sm font-semibold text-heading outline-none cursor-pointer"
          />
        </div>

        {/* Check-out */}
        <div className="flex flex-col gap-1.5 px-3 py-2 rounded-2xl bg-surface/80 border border-line/40 hover:border-gold transition-colors">
          <label className="flex items-center gap-2 text-[0.7rem] font-bold uppercase tracking-wider text-muted">
            <Calendar className="h-3.5 w-3.5 text-gold" />
            {isAr ? "تاريخ المغادرة" : "Check-out"}
          </label>
          <input
            type="date"
            value={checkout}
            min={checkin}
            onChange={(e) => setCheckout(e.target.value)}
            className="w-full bg-transparent text-sm font-semibold text-heading outline-none cursor-pointer"
          />
        </div>

        {/* Guests */}
        <div className="flex flex-col gap-1.5 px-3 py-2 rounded-2xl bg-surface/80 border border-line/40 hover:border-gold transition-colors">
          <label className="flex items-center gap-2 text-[0.7rem] font-bold uppercase tracking-wider text-muted">
            <Users className="h-3.5 w-3.5 text-gold" />
            {isAr ? "الضيوف" : "Guests"}
          </label>
          <select
            value={guests}
            onChange={(e) => setGuests(e.target.value)}
            className="w-full bg-transparent text-sm font-semibold text-heading outline-none cursor-pointer"
          >
            {[1, 2, 3, 4, 5, 6].map((num) => (
              <option key={num} value={num} className="bg-card text-heading">
                {num} {isAr ? (num === 1 ? "ضيف" : num === 2 ? "ضيفان" : "ضيوف") : num === 1 ? "Guest" : "Guests"}
              </option>
            ))}
          </select>
        </div>

        {/* Room Type */}
        <div className="flex flex-col gap-1.5 px-3 py-2 rounded-2xl bg-surface/80 border border-line/40 hover:border-gold transition-colors">
          <label className="flex items-center gap-2 text-[0.7rem] font-bold uppercase tracking-wider text-muted">
            <BedDouble className="h-3.5 w-3.5 text-gold" />
            {isAr ? "فئة الإقامة" : "Room / Suite"}
          </label>
          <select
            value={room}
            onChange={(e) => setRoom(e.target.value)}
            className="w-full bg-transparent text-sm font-semibold text-heading outline-none cursor-pointer truncate"
          >
            <option value="" className="bg-card text-heading">
              {isAr ? "جميع الغرف والأجنحة" : "All Rooms & Suites"}
            </option>
            {rooms.map((r) => (
              <option key={r.slug} value={r.slug} className="bg-card text-heading">
                {t(r.name)}
              </option>
            ))}
          </select>
        </div>

        {/* Submit Button */}
        <div className="md:col-span-4 lg:col-span-1">
          <button
            type="submit"
            className="pill pill-gold btn-sweep h-14 w-full text-sm font-extrabold shadow-[0_4px_20px_rgba(185,150,87,0.35)]"
          >
            <Search className="h-4 w-4" />
            {isAr ? "تحقق من التوفر" : "Check Rates"}
          </button>
        </div>
      </form>
    </div>
  );
}
