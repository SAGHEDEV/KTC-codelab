import { SyllabusInput } from "@/components/crunch/syllabus-input";
import { StudyPlanResult } from "@/components/crunch/study-plan-result";

export default function CrunchPage() {
  return (
    <div className="space-y-6">
      <SyllabusInput />
      <StudyPlanResult />
    </div>
  );
}
