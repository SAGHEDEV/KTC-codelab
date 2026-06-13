import { createFallbackInsight, demoProgress, demoSessions } from "@/lib/mock-data";

export async function GET() {
  return Response.json({
    progress: demoProgress,
    insight: createFallbackInsight(demoProgress, demoSessions),
  });
}
