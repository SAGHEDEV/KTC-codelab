import { createFallbackQuiz } from "@/lib/mock-data";
import { jsonError } from "@/lib/api";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    return Response.json(createFallbackQuiz(body.subject ?? "General", body.topicName ?? "Revision", body.count ?? 5));
  } catch {
    return jsonError("Unable to generate quiz right now.", "QUIZ_UNAVAILABLE", 500);
  }
}
