import { QuizMode } from "@/components/crunch/quiz-mode";
import { Card } from "@/components/ui/card";

export default function QuizPage() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-8">
      <Card>
        <p className="text-xs uppercase tracking-[0.3em] text-gray-600">Standalone quiz</p>
        <h1 className="mt-2 text-3xl font-semibold text-black">Quick revision challenge</h1>
      </Card>
      <QuizMode subject="Mathematics" topicName="Algebra foundations" />
    </main>
  );
}
