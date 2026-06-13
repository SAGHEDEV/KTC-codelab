import { demoUploads } from "@/lib/mock-data";

export async function POST() {
  return Response.json({
    uploads: demoUploads,
    message: "Uploads are mocked locally in this MVP.",
  });
}
