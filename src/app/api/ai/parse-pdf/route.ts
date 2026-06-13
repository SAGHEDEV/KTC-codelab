import { demoUploads } from "@/lib/mock-data";

export async function POST() {
  return Response.json({
    files: demoUploads,
    message: "PDF parsing is mocked locally for this MVP.",
  });
}
