"use client";

import { Fragment, useRef } from "react";
import { toPng } from "html-to-image";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { createFallbackTimetable } from "@/lib/mock-data";
import { downloadDataUrl } from "@/lib/utils";
import { useAppStore } from "@/store/app-store";

const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const hours = Array.from({ length: 18 }, (_, index) => `${String(index + 6).padStart(2, "0")}:00`);

export function WeeklyGrid() {
  const gridRef = useRef<HTMLDivElement>(null);
  const exams = useAppStore((state) => state.exams);
  const timetable = useAppStore((state) => state.timetable);
  const timetableRationale = useAppStore((state) => state.timetableRationale);
  const setTimetable = useAppStore((state) => state.setTimetable);
  const addTimetableSlot = useAppStore((state) => state.addTimetableSlot);

  async function exportPng() {
    if (!gridRef.current) return;
    const dataUrl = await toPng(gridRef.current);
    downloadDataUrl("studypulse-timetable.png", dataUrl);
  }

  function handleGenerate() {
    const payload = createFallbackTimetable(exams);
    setTimetable(payload.timetable, payload.rationale);
  }

  function handleQuickAdd(formData: FormData) {
    const subject = String(formData.get("subject") || "Study block");
    const dayOfWeek = Number(formData.get("dayOfWeek") || 0);
    const startTime = String(formData.get("startTime") || "09:00");
    const endTime = String(formData.get("endTime") || "10:30");

    addTimetableSlot({
      id: crypto.randomUUID(),
      dayOfWeek,
      startTime,
      endTime,
      subject,
      color: "#38BDF8",
      recurring: true,
      blocked: false,
    });
  }

  return (
    <div className="space-y-6">
      <Card>
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-gray-600">Timetable Builder</p>
            <h2 className="mt-2 text-2xl font-semibold text-black">Build a weekly routine</h2>
            <p className="mt-2 text-sm text-gray-700">{timetableRationale}</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button onClick={handleGenerate} type="button">
              Build my optimal timetable
            </Button>
            <Button onClick={exportPng} type="button" variant="secondary">
              Export PNG
            </Button>
            <Button onClick={() => window.print()} type="button" variant="ghost">
              Print view
            </Button>
          </div>
        </div>
      </Card>

      <Card>
        <form action={handleQuickAdd} className="grid gap-3 md:grid-cols-4">
          <Input name="subject" placeholder="Subject or blocked time" />
          <select
            className="h-11 rounded-2xl border border-black/20 bg-white/60 px-4 text-sm text-black"
            name="dayOfWeek"
          >
            {days.map((day, index) => (
              <option key={day} value={index}>
                {day}
              </option>
            ))}
          </select>
          <Input defaultValue="09:00" name="startTime" type="time" />
          <Input defaultValue="10:30" name="endTime" type="time" />
          <Button className="md:col-span-4" type="submit">
            Add study block
          </Button>
        </form>
      </Card>

      <Card className="overflow-x-auto">
        <div className="min-w-[920px]" ref={gridRef}>
          <div className="grid grid-cols-[80px_repeat(7,minmax(120px,1fr))] gap-2">
            <div />
            {days.map((day) => (
              <div key={day} className="rounded-2xl bg-black/8 border border-black/15 px-3 py-3 text-center text-sm text-black">
                {day}
              </div>
            ))}
            {hours.map((hour) => (
              <Fragment key={hour}>
                <div key={`${hour}-label`} className="rounded-2xl bg-black/8 border border-black/15 px-3 py-4 text-xs text-gray-600">
                  {hour}
                </div>
                {days.map((day, dayIndex) => {
                  const slot = timetable.find(
                    (item) => item.dayOfWeek === dayIndex && item.startTime.slice(0, 2) === hour.slice(0, 2),
                  );

                  return (
                    <div
                      key={`${day}-${hour}`}
                      className="min-h-[88px] rounded-2xl border border-black/15 bg-white/50 p-2"
                    >
                      {slot ? (
                        <div
                          className="h-full rounded-xl p-3 text-xs text-white"
                          style={{ backgroundColor: `${slot.color}77`, borderLeft: `4px solid ${slot.color}` }}
                        >
                          <p className="font-semibold">{slot.subject}</p>
                          <p className="mt-1 text-gray-700">{slot.startTime} - {slot.endTime}</p>
                          <p className="mt-2 text-gray-700">{slot.notes ?? "Focused study"}</p>
                        </div>
                      ) : (
                        <div className="h-full rounded-xl border border-dashed border-black/15" />
                      )}
                    </div>
                  );
                })}
              </Fragment>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
}
