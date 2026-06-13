"use client";

import { Bell, Sparkles } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { useAppStore } from "@/store/app-store";

export function TopBar() {
  const profile = useAppStore((state) => state.profile);
  const exams = useAppStore((state) => state.exams);

  return (
    <div className="glass flex flex-col gap-4 rounded-[28px] px-5 py-4 md:flex-row md:items-center md:justify-between">
      <div>
        <p className="text-xs uppercase tracking-[0.32em] text-gray-600">Edigo MVP</p>
        <h1 className="mt-2 text-2xl font-semibold text-black">Welcome back, {profile.name}</h1>
        <p className="mt-1 text-sm text-gray-700">
          You have {exams.length} tracked exams and a plan ready to work from today.
        </p>
      </div>
      <div className="flex items-center gap-3">
        <Badge className="gap-2 bg-black text-white">
          <Sparkles className="h-3.5 w-3.5" />
          Demo AI enabled
        </Badge>
        <button className="rounded-2xl border border-black/20 p-3 text-black transition hover:bg-black/5">
          <Bell className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
