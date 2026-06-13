"use client";

import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { PolarAngleAxis, PolarGrid, Radar, RadarChart, ResponsiveContainer, Tooltip, XAxis, YAxis, LineChart, Line } from "recharts";
import { z } from "zod";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useAppStore } from "@/store/app-store";

const schema = z.object({
  subject: z.string().min(2),
  scorePercent: z.coerce.number().min(0).max(100),
  examType: z.string().min(2),
  notes: z.string().optional(),
});

type FormValues = z.infer<typeof schema>;

export function TrackerDashboard() {
  const progressRecords = useAppStore((state) => state.progressRecords);
  const trackerInsight = useAppStore((state) => state.trackerInsight);
  const addProgress = useAppStore((state) => state.addProgress);
  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      subject: "",
      scorePercent: 70,
      examType: "Past paper",
      notes: "",
    },
  });

  const chartData = progressRecords
    .slice()
    .reverse()
    .map((record) => ({
      date: new Date(record.recordedAt).toLocaleDateString("en-US", { month: "short", day: "numeric" }),
      score: record.scorePercent,
      subject: record.subject,
    }));

  const radarData = useMemo(() => {
    const subjects = Array.from(new Set(progressRecords.map((record) => record.subject)));

    return subjects.map((subject) => {
      const subjectRecords = progressRecords.filter((record) => record.subject === subject);
      const average =
        subjectRecords.reduce((total, record) => total + record.scorePercent, 0) / Math.max(subjectRecords.length, 1);

      return {
        subject,
        score: Math.round(average),
      };
    });
  }, [progressRecords]);

  function onSubmit(values: FormValues) {
    addProgress({
      id: crypto.randomUUID(),
      subject: values.subject,
      scorePercent: values.scorePercent,
      examType: values.examType,
      notes: values.notes,
      recordedAt: new Date().toISOString(),
    });
    form.reset();
  }

  return (
    <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
      <div className="space-y-6">
        <Card>
          <p className="text-xs uppercase tracking-[0.3em] text-gray-600">Score logger</p>
          <h2 className="mt-2 text-2xl font-semibold text-black">Track performance quickly</h2>
          <form className="mt-6 space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
            <Input placeholder="Subject" {...form.register("subject")} />
            <div className="grid gap-4 md:grid-cols-2">
              <Input type="number" {...form.register("scorePercent")} />
              <Input placeholder="Test type" {...form.register("examType")} />
            </div>
            <Textarea placeholder="Notes" {...form.register("notes")} />
            <Button className="w-full" type="submit">
              Save result
            </Button>
          </form>
        </Card>

        <Card>
          <p className="text-xs uppercase tracking-[0.3em] text-gray-600">AI insights</p>
          <h3 className="mt-2 text-xl font-semibold text-black">{trackerInsight.trend}</h3>
          <ul className="mt-4 space-y-3 text-sm text-gray-700">
            {trackerInsight.insights.map((insight) => (
              <li key={insight}>- {insight}</li>
            ))}
          </ul>
          <div className="mt-4 rounded-2xl bg-black/8 border border-black/15 p-4 text-sm text-gray-700">
            Action: {trackerInsight.recommendation}
          </div>
        </Card>
      </div>

      <div className="space-y-6">
        <Card>
          <p className="text-xs uppercase tracking-[0.3em] text-gray-600">Score over time</p>
          <div className="mt-4 h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <XAxis dataKey="date" stroke="#6B7280" />
                <YAxis stroke="#6B7280" />
                <Tooltip />
                <Line dataKey="score" stroke="#000000" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card>
          <p className="text-xs uppercase tracking-[0.3em] text-gray-600">Subject proficiency</p>
          <div className="mt-4 h-80">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={radarData}>
                <PolarGrid stroke="#E5E7EB" />
                <PolarAngleAxis dataKey="subject" stroke="#6B7280" />
                <Radar dataKey="score" fill="#000000" fillOpacity={0.15} stroke="#000000" />
                <Tooltip />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>
    </div>
  );
}
