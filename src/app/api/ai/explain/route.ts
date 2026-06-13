export async function POST(request: Request) {
  const body = await request.json();
  const topic = body.topic ?? "this topic";

  return Response.json({
    explanation: `${topic} is easier to remember if you think of it as a simple system with inputs, a process, and an output. Learn the rule first, then test it with one small example and one timed exam question.`,
  });
}
