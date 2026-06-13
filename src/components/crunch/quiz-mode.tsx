"use client";

import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { createFallbackQuiz } from "@/lib/mock-data";
import type { QuizQuestion } from "@/types";

export function QuizMode({ subject, topicName }: { subject: string; topicName: string }) {
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [score, setScore] = useState(0);

  useEffect(() => {
    const payload = createFallbackQuiz(subject, topicName, 5);
    setQuestions(payload.questions);
    setIndex(0);
    setSelected(null);
    setScore(0);
  }, [subject, topicName]);

  const question = questions[index];
  const finished = index >= questions.length && questions.length > 0;

  function handleAnswer(option: string) {
    if (!question || selected) return;

    setSelected(option);
    if (option === question.correctAnswer) {
      setScore((value) => value + 1);
    }
  }

  function handleNext() {
    setSelected(null);
    setIndex((value) => value + 1);
  }

  if (!question && !finished) {
    return null;
  }

  return (
    <Card className="mt-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-gray-600">Quiz mode</p>
          <h3 className="mt-2 text-xl font-semibold text-black">{topicName}</h3>
        </div>
        <div className="text-sm text-gray-600">
          {finished ? "Finished" : `Question ${index + 1} of ${questions.length}`}
        </div>
      </div>

      {finished ? (
        <div className="mt-5 rounded-[24px] bg-black/8 border border-black/15 p-6">
          <p className="text-3xl font-semibold text-black">{score}/5</p>
          <p className="mt-2 text-sm text-gray-700">
            Topics below 60% should be added back into your next revision cycle.
          </p>
          <Button
            className="mt-4"
            onClick={() => {
              setQuestions(createFallbackQuiz(subject, topicName, 5).questions);
              setIndex(0);
              setSelected(null);
              setScore(0);
            }}
            type="button"
          >
            Retry quiz
          </Button>
        </div>
      ) : (
        <div className="mt-5 space-y-4 rounded-[24px] bg-black/8 border border-black/15 p-5">
          <p className="text-lg font-medium text-black">{question.question}</p>
          <div className="grid gap-3">
            {question.options.map((option) => {
              const correct = selected && option === question.correctAnswer;
              const wrong = selected === option && option !== question.correctAnswer;

              return (
                <button
                  key={option}
                  className={`rounded-2xl border px-4 py-3 text-left text-sm transition ${
                    correct
                      ? "border-emerald-400 bg-emerald-500/10 text-emerald-700"
                      : wrong
                        ? "border-rose-400 bg-rose-500/10 text-rose-700"
                        : "border-black/15 bg-black/8 text-black hover:bg-black/12"
                  }`}
                  onClick={() => handleAnswer(option)}
                  type="button"
                >
                  {option}
                </button>
              );
            })}
          </div>

          {selected ? (
            <div className="rounded-2xl border border-black/15 bg-black/8 p-4 text-sm text-gray-700">
              {question.explanation}
            </div>
          ) : null}

          {selected ? (
            <Button onClick={handleNext} type="button">
              {index + 1 === questions.length ? "Finish quiz" : "Next question"}
            </Button>
          ) : null}
        </div>
      )}
    </Card>
  );
}
