"use client";

import {
  BellRing,
  BookOpen,
  CalendarCheck2,
  CarFront,
  Clock3,
  ConciergeBell,
  Coffee,
  DoorOpen,
  ArrowUpFromLine,
  Footprints,
  Landmark,
  MoonStar,
  ShieldCheck,
  Shirt,
  Sparkles,
  TrainFront,
  Users,
  Utensils,
  Wifi,
  type LucideIcon,
} from "lucide-react";

/** Maps icon names from the data file to lucide components.
    Add a new name here when adding new content to the data file. */
export const iconMap: Record<string, LucideIcon> = {
  "concierge-bell": ConciergeBell,
  "bell-ring": BellRing,
  wifi: Wifi,
  utensils: Utensils,
  coffee: Coffee,
  shirt: Shirt,
  "door-open": DoorOpen,
  "car-front": CarFront,
  elevator: ArrowUpFromLine,
  "moon-star": MoonStar,
  footprints: Footprints,
  "clock-3": Clock3,
  landmark: Landmark,
  "train-front": TrainFront,
  users: Users,
  "book-open": BookOpen,
  "shield-check": ShieldCheck,
  "calendar-check": CalendarCheck2,
  sparkles: Sparkles,
};
