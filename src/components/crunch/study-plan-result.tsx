"use client";

import { AlertTriangle } from "lucide-react";
import { useMemo, useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { TopicCard } from "@/components/crunch/topic-card";
import { QuizMode } from "@/components/crunch/quiz-mode";
import { useAppStore } from "@/store/app-store";

export function StudyPlanResult() {
  const studyPlan = useAppStore((state) => state.studyPlan);
  const [quizTopic, setQuizTopic] = useState<string | null>(null);
  const groupedTopics = useMemo(
    () => ({
      high: studyPlan.topics.filter((topic) => topic.priority === "high"),
      medium: studyPlan.topics.filter((topic) => topic.priority === "medium"),
      low: studyPlan.topics.filter((topic) => topic.priority === "low"),
    }),
    [studyPlan.topics],
  );

  const masteredCount = studyPlan.topics.filter((topic) => topic.mastered).length;

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-r from-sky-500/20 to-emerald-500/10">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-gray-600">Plan summary</p>
            <h2 className="mt-2 text-2xl font-semibold text-black">{studyPlan.subject}</h2>
            <p className="mt-2 max-w-3xl text-sm text-gray-700">{studyPlan.recommendedStrategy}</p>
          </div>
          <div className="space-y-2 text-sm text-gray-700">
            <div>Total hours: {studyPlan.totalHours}</div>
            <div>
              Mastered: {masteredCount}/{studyPlan.topics.length}
            </div>
          </div>
        </div>
      </Card>

      {studyPlan.redFlags.length > 0 ? (
        <Card className="border-orange-400/30 bg-orange-500/10">
          <div className="flex items-start gap-3">
            <AlertTriangle className="mt-1 h-5 w-5 text-orange-600" />
            <div>
              <p className="font-semibold text-black">Red flags</p>
              <ul className="mt-2 space-y-2 text-sm text-gray-700">
                {studyPlan.redFlags.map((flag) => (
                  <li key={flag}>- {flag}</li>
                ))}
              </ul>
            </div>
          </div>
        </Card>
      ) : null}

      <div className="grid gap-4 xl:grid-cols-3">
        {(["high", "medium", "low"] as const).map((priority) => (
          <div key={priority} className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold capitalize text-white">{priority} priority</h3>
              <Badge>{groupedTopics[priority].length} topics</Badge>
            </div>
            {groupedTopics[priority].map((topic) => (
              <TopicCard key={topic.id} onQuiz={setQuizTopic} topic={topic} />
            ))}
          </div>
        ))}
      </div>

      <Card>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-gray-600">Daily schedule</p>
            <h3 className="mt-2 text-xl font-semibold text-black">Day-by-day revision map</h3>
          </div>
          <Badge>{studyPlan.dailySchedule.length} days</Badge>
        </div>

        <div className="mt-5 flex gap-4 overflow-x-auto pb-2">
          {studyPlan.dailySchedule.map((day) => (
            <div key={day.day} className="min-w-[240px] rounded-[24px] bg-black/8 border border-black/15 p-4">
              <p className="text-xs uppercase tracking-[0.2em] text-gray-600">{day.label}</p>
              <h4 className="mt-2 font-semibold text-black">{day.focus}</h4>
              <Badge className="mt-2 capitalize">{day.sessionType}</Badge>
              <ul className="mt-4 space-y-2 text-sm text-gray-700">
                {day.tasks.map((task) => (
                  <li key={task}>- {task}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Card>

      {quizTopic ? <QuizMode subject={studyPlan.subject} topicName={quizTopic} /> : null}
    </div>
  );
}
