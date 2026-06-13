"use client";

import { Brain, CheckCircle2, CircleDot, HelpCircle } from "lucide-react";
import { useMemo, useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useAppStore } from "@/store/app-store";
import type { TopicPlan } from "@/types";

const tones = {
  high: "border-rose-400/40 bg-rose-500/8",
  medium: "border-amber-400/40 bg-amber-500/8",
  low: "border-emerald-400/40 bg-emerald-500/8",
};

export function TopicCard({ topic, onQuiz }: { topic: TopicPlan; onQuiz: (topic: string) => void }) {
  const toggleMasteredTopic = useAppStore((state) => state.toggleMasteredTopic);
  const [expanded, setExpanded] = useState(false);
  const masteredCopy = useMemo(() => (topic.mastered ? "Mastered" : "Mark as mastered"), [topic.mastered]);

  return (
    <Card className={`border ${tones[topic.priority]}`}>
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="mb-3 inline-flex rounded-2xl bg-black/15 p-3 text-black">
            <Brain className="h-4 w-4" />
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-lg font-semibold text-black">{topic.name}</h3>
            <Badge className="capitalize">{topic.priority}</Badge>
          </div>
          <p className="mt-2 text-sm text-gray-700">{topic.reason}</p>
        </div>
        <Badge>{topic.timeAllocation}</Badge>
      </div>

      <div className="mt-4 flex flex-wrap gap-3">
        <Button variant="ghost" onClick={() => setExpanded((previous) => !previous)} type="button">
          <HelpCircle className="mr-2 h-4 w-4" />
          {expanded ? "Hide details" : "Explain more"}
        </Button>
        <Button variant="secondary" onClick={() => onQuiz(topic.name)} type="button">
          Start quiz
        </Button>
        <Button onClick={() => toggleMasteredTopic(topic.id)} type="button">
          {topic.mastered ? <CheckCircle2 className="mr-2 h-4 w-4" /> : <CircleDot className="mr-2 h-4 w-4" />}
          {masteredCopy}
        </Button>
      </div>

      {expanded ? (
        <div className="mt-5 space-y-4 rounded-[24px] bg-black/8 border border-black/15 p-4">
          <p className="text-sm leading-7 text-gray-700">{topic.simpleExplain}</p>
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-gray-600">Key points</p>
            <ul className="mt-2 space-y-2 text-sm text-gray-700">
              {topic.keyPoints.map((item) => (
                <li key={item}>- {item}</li>
              ))}
            </ul>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-gray-600">Common mistakes</p>
              <ul className="mt-2 space-y-2 text-sm text-gray-700">
                {topic.commonMistakes.map((item) => (
                  <li key={item}>- {item}</li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-gray-600">Suggested resources</p>
              <ul className="mt-2 space-y-2 text-sm text-gray-700">
                {topic.suggestedResources.map((item) => (
                  <li key={item}>- {item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      ) : null}
    </Card>
  );
}
