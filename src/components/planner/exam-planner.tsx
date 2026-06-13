"use client";

import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { countdownLabel, formatDate, subjectColor } from "@/lib/utils";
import { useAppStore } from "@/store/app-store";

const schema = z.object({
  subject: z.string().min(2),
  examBoard: z.string().optional(),
  level: z.string().optional(),
  examDate: z.string().min(1),
  location: z.string().optional(),
  notes: z.string().optional(),
});

type FormValues = z.infer<typeof schema>;

export function ExamPlanner() {
  const exams = useAppStore((state) => state.exams);
  const addExam = useAppStore((state) => state.addExam);
  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      subject: "",
      examBoard: "",
      level: "",
      examDate: "",
      location: "",
      notes: "",
    },
  });

  const conflicts = useMemo(() => {
    const sorted = [...exams].sort(
      (left, right) => new Date(left.examDate).getTime() - new Date(right.examDate).getTime(),
    );

    return sorted.filter((exam, index) => {
      const next = sorted[index + 1];
      if (!next) return false;
      return Math.abs(new Date(next.examDate).getTime() - new Date(exam.examDate).getTime()) < 86400000;
    });
  }, [exams]);

  function onSubmit(values: FormValues) {
    addExam({
      id: crypto.randomUUID(),
      subject: values.subject,
      examBoard: values.examBoard,
      level: values.level,
      examDate: new Date(values.examDate).toISOString(),
      location: values.location,
      notes: values.notes,
      color: subjectColor(values.subject),
    });
    form.reset();
  }

  return (
    <div className="grid gap-6 xl:grid-cols-[0.85fr_1.15fr]">
      <Card>
        <p className="text-xs uppercase tracking-[0.3em] text-gray-600">Add exam</p>
        <h2 className="mt-2 text-2xl font-semibold text-black">Track what is coming</h2>
        <form className="mt-6 space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
          <Input placeholder="Subject" {...form.register("subject")} />
          <div className="grid gap-4 md:grid-cols-2">
            <Input placeholder="Exam board" {...form.register("examBoard")} />
            <Input placeholder="Level" {...form.register("level")} />
          </div>
          <Input type="datetime-local" {...form.register("examDate")} />
          <Input placeholder="Location" {...form.register("location")} />
          <Textarea placeholder="Notes" {...form.register("notes")} />
          <Button className="w-full" type="submit">
            Save exam
          </Button>
        </form>

        {conflicts.length > 0 ? (
          <div className="mt-6 rounded-[24px] border border-orange-400/30 bg-orange-500/10 p-4 text-sm text-orange-100">
            Some exams are within 24 hours of each other. Prioritise revision and recovery carefully.
          </div>
        ) : null}
      </Card>

      <div className="space-y-4">
        {exams.map((exam) => (
          <Card key={exam.id}>
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div className="flex items-start gap-4">
                <span className="mt-1 h-4 w-4 rounded-full" style={{ backgroundColor: exam.color }} />
                <div>
                  <h3 className="text-lg font-semibold text-black">{exam.subject}</h3>
                  <p className="mt-1 text-sm text-gray-600">{formatDate(exam.examDate)}</p>
                  <p className="mt-2 text-sm text-gray-700">{exam.location || "Location to be confirmed"}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Badge>{countdownLabel(exam.examDate)}</Badge>
                <Button variant="secondary" type="button">
                  Generate study plan
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
