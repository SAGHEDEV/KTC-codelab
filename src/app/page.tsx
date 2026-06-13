import Link from "next/link";
import { ArrowRight, Brain, CalendarDays, LayoutDashboard, TrendingUp } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { createFallbackStudyPlan } from "@/lib/mock-data";

const demoPlan = createFallbackStudyPlan({
  subject: "Biology",
  days: 5,
  hours: 3,
  level: "intermediate",
});

const features = [
  { title: "Crunch Mode", icon: Brain, copy: "Paste a syllabus and get a clear revision order." },
  { title: "Exam Planner", icon: CalendarDays, copy: "Track exams and countdown pressure before it sneaks up." },
  { title: "Timetable", icon: LayoutDashboard, copy: "Turn exam pressure into a simple weekly routine." },
  { title: "Tracker", icon: TrendingUp, copy: "Log scores and see what is improving or slipping." },
];

export default function Home() {
  return (
    <main className="px-4 pb-24 pt-6 sm:px-6 lg:px-8">
      <section className="mx-auto max-w-7xl rounded-[36px] glass glass-hover px-6 py-8 md:px-10 md:py-12">
        <div className="flex flex-col gap-12 xl:flex-row xl:items-center">
          <div className="max-w-3xl">
            <Badge className="bg-black/15 text-black">Local MVP</Badge>
            <h1 className="mt-6 max-w-3xl text-4xl font-semibold leading-tight text-black sm:text-5xl">
              Ace your exams, guided with precision.
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-8 text-gray-700">
              Edigo transforms your syllabus into a laser-focused study plan, then helps you keep exams,
              routines, scores, and notes in one elegant command center.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link href="/crunch">
                <Button className="bg-black text-white hover:bg-black/90">
                  Start for free
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <a href="#demo">
                <Button variant="secondary" className="border-black/20 bg-white/50 text-black hover:bg-white/70">See how it works</Button>
              </a>
            </div>
          </div>
          <Card className="glass w-full max-w-2xl">
            <p className="text-xs uppercase tracking-[0.3em] text-gray-600">What a plan looks like</p>
            <h2 className="mt-2 text-xl font-semibold text-black">{demoPlan.subject} sprint plan</h2>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {demoPlan.topics.slice(0, 4).map((topic) => (
                <div key={topic.id} className="rounded-[24px] border border-black/15 bg-black/8 p-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-black">{topic.name}</h3>
                    <Badge className="bg-black text-white capitalize">{topic.priority}</Badge>
                  </div>
                  <p className="mt-3 text-sm text-gray-700">{topic.reason}</p>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </section>

      <section className="mx-auto mt-8 grid max-w-7xl gap-4 md:grid-cols-2 xl:grid-cols-4">
        {features.map((feature) => {
          const Icon = feature.icon;

          return (
            <Card key={feature.title} className="glass glass-hover">
              <div className="mb-4 inline-flex rounded-2xl bg-black/15 p-3 text-black">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-semibold text-black">{feature.title}</h3>
              <p className="mt-2 text-sm text-gray-700">{feature.copy}</p>
            </Card>
          );
        })}
      </section>

      <section id="demo" className="mx-auto mt-8 max-w-7xl">
        <Card className="glass">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-start">
            <div className="max-w-lg">
              <p className="text-xs uppercase tracking-[0.3em] text-gray-600">Live demo</p>
              <h2 className="mt-2 text-2xl font-semibold text-black">Static data, real interaction</h2>
              <p className="mt-3 text-sm leading-7 text-gray-700">
                This MVP uses a real render of a demo plan instead of a screenshot, so the UI you see here is
                the same shape used inside the dashboard.
              </p>
            </div>
            <div className="grid flex-1 gap-4 md:grid-cols-3">
              {demoPlan.dailySchedule.slice(0, 3).map((day) => (
                <div key={day.day} className="rounded-[24px] bg-black/8 border border-black/15 p-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-gray-600">{day.label}</p>
                  <h3 className="mt-2 font-semibold text-black">{day.focus}</h3>
                  <ul className="mt-4 space-y-2 text-sm text-gray-700">
                    {day.tasks.map((task) => (
                      <li key={task}>- {task}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </section>
    </main>
  );
}
