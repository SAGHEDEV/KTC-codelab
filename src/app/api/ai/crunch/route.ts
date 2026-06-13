import { createFallbackStudyPlan } from "@/lib/mock-data";
import { jsonError, streamText } from "@/lib/api";
import type { StudyLevel } from "@/types";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const plan = createFallbackStudyPlan({
      subject: body.subject ?? "General Study",
      days: Number(body.days ?? 7),
      hours: Number(body.hours ?? 3),
      level: (body.level ?? "intermediate") as StudyLevel,
    });

    return streamText(JSON.stringify(plan));
  } catch {
    return jsonError("StudyPulse AI is taking a moment. Try again in a few seconds.", "CRUNCH_UNAVAILABLE", 500);
  }
}
