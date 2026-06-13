import { createFallbackTimetable, demoExams } from "@/lib/mock-data";
import { jsonError } from "@/lib/api";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const exams = body.examList?.length
      ? body.examList.map((exam: { subject: string; examDate: string }) => ({
          id: crypto.randomUUID(),
          subject: exam.subject,
          examDate: exam.examDate,
          color: "#38BDF8",
        }))
      : demoExams;

    return Response.json(createFallbackTimetable(exams, Number(body.sessionLength ?? 90)));
  } catch {
    return jsonError("Unable to build timetable right now.", "TIMETABLE_UNAVAILABLE", 500);
  }
}
