"use client";

import { useMemo, useState } from "react";
import Markdown from "react-markdown";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useAppStore } from "@/store/app-store";

export function NotesWorkspace() {
  const notes = useAppStore((state) => state.notes);
  const saveNote = useAppStore((state) => state.saveNote);
  const [selectedId, setSelectedId] = useState(notes[0]?.id ?? "");
  const [query, setQuery] = useState("");
  const selected = notes.find((note) => note.id === selectedId) ?? notes[0];

  const filteredNotes = useMemo(
    () =>
      notes.filter((note) =>
        [note.title, note.subject, note.content, note.tags.join(" ")].join(" ").toLowerCase().includes(query.toLowerCase()),
      ),
    [notes, query],
  );

  function handleSave(formData: FormData) {
    saveNote({
      id: selected?.id ?? crypto.randomUUID(),
      title: String(formData.get("title") || "Untitled note"),
      subject: String(formData.get("subject") || ""),
      tags: String(formData.get("tags") || "")
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean),
      content: String(formData.get("content") || ""),
      aiSummary: "Key idea: simplify the concept, keep examples close, and revise actively.",
      updatedAt: new Date().toISOString(),
    });
  }

  return (
    <div className="grid gap-6 xl:grid-cols-[0.78fr_1.22fr]">
      <Card className="space-y-4">
        <Input onChange={(event) => setQuery(event.target.value)} placeholder="Search notes" value={query} />
        <div className="space-y-3">
          {filteredNotes.map((note) => (
            <button
              key={note.id}
              className={`w-full rounded-2xl border px-4 py-3 text-left ${
                note.id === selected?.id ? "border-black/25 bg-black/15" : "border-black/15 bg-black/8"
              }`}
              onClick={() => setSelectedId(note.id)}
              type="button"
            >
              <p className="font-semibold text-black">{note.title}</p>
              <p className="mt-1 text-xs text-gray-600">{note.subject || "No subject"}</p>
            </button>
          ))}
        </div>
      </Card>

      <div className="space-y-6">
        <Card>
          <form action={handleSave} className="space-y-4" key={selected?.id}>
            <Input defaultValue={selected?.title} name="title" placeholder="Note title" />
            <div className="grid gap-4 md:grid-cols-2">
              <Input defaultValue={selected?.subject} name="subject" placeholder="Subject" />
              <Input defaultValue={selected?.tags.join(", ")} name="tags" placeholder="Tags" />
            </div>
            <Textarea defaultValue={selected?.content} name="content" />
            <div className="flex flex-wrap gap-3">
              <Button type="submit">Save note</Button>
              <Button type="button" variant="secondary">
                /summarise
              </Button>
              <Button type="button" variant="ghost">
                /simplify
              </Button>
            </div>
          </form>
        </Card>

        <Card>
          <p className="text-xs uppercase tracking-[0.3em] text-sky-300">AI sidebar</p>
          <p className="mt-2 text-sm text-slate-300">{selected?.aiSummary}</p>
          <div className="mt-4 rounded-[24px] bg-slate-950/80 p-4">
            <Markdown className="prose prose-invert max-w-none text-sm text-slate-200">
              {selected?.content ?? ""}
            </Markdown>
          </div>
        </Card>
      </div>
    </div>
  );
}
