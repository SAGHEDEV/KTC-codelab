import { createFallbackCareer } from "@/lib/mock-data";
import { jsonError } from "@/lib/api";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    return Response.json(createFallbackCareer(body.subjects ?? []));
  } catch {
    return jsonError("Unable to generate career guidance right now.", "CAREER_UNAVAILABLE", 500);
  }
}
