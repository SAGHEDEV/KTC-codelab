"use client";

import { useEffect, useMemo, useState } from "react";
import { useDropzone } from "react-dropzone";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FileText, Upload } from "lucide-react";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { createFallbackStudyPlan } from "@/lib/mock-data";
import { safeJsonParse, subjectColor } from "@/lib/utils";
import { useStream } from "@/hooks/useStream";
import { useAppStore } from "@/store/app-store";
import type { StudyPlan } from "@/types";

const schema = z.object({
  subject: z.string().min(2),
  days: z.coerce.number().min(1).max(60),
  hours: z.coerce.number().min(1).max(12),
  level: z.enum(["beginner", "intermediate", "advanced"]),
  examBoard: z.string().optional(),
  syllabusText: z.string().min(40),
});

type FormValues = z.infer<typeof schema>;

export function SyllabusInput() {
  const setStudyPlan = useAppStore((state) => state.setStudyPlan);
  const [files, setFiles] = useState<File[]>([]);
  const { content, error, isStreaming, startStream } = useStream();
  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      subject: "Mathematics",
      days: 7,
      hours: 3,
      level: "intermediate",
      examBoard: "WAEC",
      syllabusText:
        "Algebra, equations, simultaneous equations, probability, graphs, geometry, mensuration, trigonometry, and past paper practice.",
    },
  });

  const dropzone = useDropzone({
    accept: { "application/pdf": [".pdf"] },
    multiple: true,
    onDrop: (accepted) => setFiles(accepted),
  });

  const characterCount = form.watch("syllabusText")?.length ?? 0;
  const previewPlan = useMemo(
    () =>
      safeJsonParse<StudyPlan>(content) ??
      createFallbackStudyPlan({
        subject: form.getValues("subject"),
        days: Number(form.getValues("days")),
        hours: Number(form.getValues("hours")),
        level: form.getValues("level"),
      }),
    [content, form],
  );

  useEffect(() => {
    setStudyPlan(previewPlan);
  }, [previewPlan, setStudyPlan]);

  async function onSubmit(values: FormValues) {
    await startStream("/api/ai/crunch", {
      ...values,
      pdfContent: files.map((file) => file.name).join(", "),
    });
  }

  return (
    <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
      <Card>
        <div className="mb-6">
          <p className="text-xs uppercase tracking-[0.3em] text-gray-600">Crunch Mode</p>
          <h2 className="mt-2 text-2xl font-semibold text-black">Build a revision plan fast</h2>
          <p className="mt-2 text-sm text-gray-700">
            Paste the syllabus, add PDF notes if you have them, and generate a basic study plan that works
            out of the box.
          </p>
        </div>

        <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid gap-4 md:grid-cols-2">
            <label className="space-y-2 text-sm text-gray-700">
              Subject
              <Input {...form.register("subject")} />
            </label>
            <label className="space-y-2 text-sm text-gray-700">
              Exam board
              <Input {...form.register("examBoard")} />
            </label>
            <label className="space-y-2 text-sm text-gray-700">
              Days until exam
              <Input type="number" {...form.register("days")} />
            </label>
            <label className="space-y-2 text-sm text-gray-700">
              Hours per day
              <Input type="number" step="0.5" {...form.register("hours")} />
            </label>
          </div>

          <label className="space-y-2 text-sm text-gray-700">
            Current level
            <select
              className="h-11 w-full rounded-2xl border border-black/20 bg-white/60 px-4 text-sm text-black outline-none focus:border-black focus:bg-white/80"
              {...form.register("level")}
            >
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>
          </label>

          <label className="space-y-2 text-sm text-gray-700">
            Syllabus or topic list
            <Textarea {...form.register("syllabusText")} />
            <div className="text-right text-xs text-gray-600">{characterCount} characters</div>
          </label>

          <div
            {...dropzone.getRootProps()}
            className="rounded-[28px] border border-dashed border-black/15 bg-black/8 p-6 text-center"
          >
            <input {...dropzone.getInputProps()} />
            <div className="mx-auto mb-3 inline-flex rounded-3xl bg-black/8 border border-black/15 p-4 text-black">
              <Upload className="h-5 w-5" />
            </div>
            <p className="text-sm font-medium text-black">Drop PDFs here or click to browse</p>
            <p className="mt-2 text-xs text-gray-700">Basic MVP mode accepts PDF filenames and simulates parsing.</p>
          </div>

          {files.length > 0 ? (
            <div className="space-y-2">
              {files.map((file) => (
                <div
                  key={file.name}
                  className="flex items-center justify-between rounded-2xl border border-black/15 bg-black/8 px-4 py-3"
                >
                  <div className="flex items-center gap-3">
                    <FileText className="h-4 w-4 text-black" />
                    <div>
                      <p className="text-sm text-black">{file.name}</p>
                      <p className="text-xs text-gray-600">{Math.round(file.size / 1024)} KB</p>
                    </div>
                  </div>
                  <span
                    className="h-3 w-3 rounded-full"
                    style={{ backgroundColor: subjectColor(form.getValues("subject")) }}
                  />
                </div>
              ))}
            </div>
          ) : null}

          <Button className="w-full" disabled={isStreaming} type="submit">
            {isStreaming ? "Generating plan..." : "Generate study plan"}
          </Button>
        </form>
      </Card>

      <Card className="bg-gradient-to-br from-slate-900 via-slate-900 to-sky-500/10">
        <p className="text-xs uppercase tracking-[0.3em] text-sky-300">Live JSON preview</p>
        <div className="mt-4 max-h-[620px] overflow-auto rounded-[24px] bg-slate-950/90 p-4">
          {error ? (
            <pre className="whitespace-pre-wrap break-words text-xs leading-6 text-rose-400">{error}</pre>
          ) : (
            <JsonRenderer data={content || previewPlan} />
          )}
        </div>
      </Card>
    </div>
  );
}


type JsonValue =
  | string | number | boolean | null
  | JsonValue[]
  | { [key: string]: JsonValue };

function JsonNode({ value, depth = 0 }: { value: JsonValue; depth?: number }) {
  const [collapsed, setCollapsed] = useState(depth > 2);
  const indent = depth * 16;

  if (value === null) return <span className="text-rose-400">null</span>;
  if (typeof value === "boolean") return <span className="text-pink-400">{String(value)}</span>;
  if (typeof value === "number") return <span className="text-amber-400">{value}</span>;
  if (typeof value === "string") return <span className="text-emerald-400">"{value}"</span>;

  if (Array.isArray(value)) {
    if (value.length === 0) return <span className="text-slate-400">[]</span>;
    return (
      <span>
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="text-slate-400 hover:text-sky-300 transition-colors"
        >
          {collapsed ? "▶" : "▼"} [{value.length}]
        </button>
        {!collapsed && (
          <div style={{ marginLeft: indent + 16 }}>
            {value.map((item, i) => (
              <div key={i} className="flex gap-1">
                <span className="text-slate-500 select-none text-xs pt-0.5">{i}</span>
                <JsonNode value={item} depth={depth + 1} />
                {i < value.length - 1 && <span className="text-slate-500">,</span>}
              </div>
            ))}
          </div>
        )}
      </span>
    );
  }

  const entries = Object.entries(value as Record<string, JsonValue>);
  if (entries.length === 0) return <span className="text-slate-400">{"{}"}</span>;

  return (
    <span>
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="text-slate-400 hover:text-sky-300 transition-colors"
      >
        {collapsed ? "▶" : "▼"} {"{"}
        {entries.length}
        {"}"}
      </button>
      {!collapsed && (
        <div style={{ marginLeft: indent + 16 }}>
          {entries.map(([key, val], i) => (
            <div key={key} className="flex flex-wrap gap-1 items-start">
              <span className="text-sky-300">"{key}"</span>
              <span className="text-slate-500">:</span>
              <JsonNode value={val} depth={depth + 1} />
              {i < entries.length - 1 && <span className="text-slate-500">,</span>}
            </div>
          ))}
        </div>
      )}
    </span>
  );
}

export function JsonRenderer({ data }: { data: unknown }) {
  let parsed: JsonValue;
  try {
    parsed = typeof data === "string" ? JSON.parse(data) : (data as JsonValue);
  } catch {
    return <pre className="text-rose-400 text-xs whitespace-pre-wrap">{String(data)}</pre>;
  }

  return (
    <div className="font-mono text-xs leading-6 text-slate-300">
      <JsonNode value={parsed} depth={0} />
    </div>
  );
}