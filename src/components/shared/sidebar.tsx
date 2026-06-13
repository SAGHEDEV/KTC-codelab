"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BookOpen,
  Briefcase,
  CalendarDays,
  GraduationCap,
  LayoutDashboard,
  NotebookTabs,
  Settings,
  TimerReset,
  TrendingUp,
} from "lucide-react";

import { cn } from "@/lib/utils";

const items = [
  { href: "/crunch", label: "Crunch", icon: TimerReset },
  { href: "/planner", label: "Planner", icon: CalendarDays },
  { href: "/timetable", label: "Timetable", icon: LayoutDashboard },
  { href: "/tracker", label: "Tracker", icon: TrendingUp },
  { href: "/career", label: "Career", icon: Briefcase },
  { href: "/notes", label: "Notes", icon: NotebookTabs },
  { href: "/quiz", label: "Quiz", icon: BookOpen },
  { href: "/settings", label: "Settings", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <>
      <aside className="hidden h-screen w-64 shrink-0 border-r border-white/20 bg-white/40 px-4 py-6 backdrop-blur-md lg:block">
        <Link href="/" className="glass glass-hover flex items-center gap-3 rounded-3xl px-4 py-4">
          <div className="rounded-2xl bg-black/15 p-3 text-black">
            <GraduationCap className="h-5 w-5" />
          </div>
          <div>
            <p className="text-sm font-semibold text-black">Edigo</p>
            <p className="text-xs text-gray-700">Your Guide</p>
          </div>
        </Link>
        <nav className="mt-8 space-y-2">
          {items.map((item) => {
            const Icon = item.icon;
            const active = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-2xl px-4 py-3 text-sm transition backdrop-blur",
                  active ? "bg-black text-white" : "text-gray-700 hover:bg-white/60 hover:text-black",
                )}
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>
      </aside>

      <nav className="fixed bottom-4 left-1/2 z-40 flex w-[calc(100%-1.5rem)] -translate-x-1/2 justify-between rounded-3xl border border-white/30 bg-white/70 px-3 py-2 shadow-glass backdrop-blur-md lg:hidden">
        {items.slice(0, 5).map((item) => {
          const Icon = item.icon;
          const active = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex min-w-[56px] flex-col items-center gap-1 rounded-2xl px-2 py-2 text-[11px] transition",
                active ? "bg-black text-white" : "text-gray-700 hover:text-black",
              )}
            >
              <Icon className="h-4 w-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>
    </>
  );
}
