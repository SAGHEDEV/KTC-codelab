export function jsonError(error: string, code: string, status = 400, retryAfter?: number) {
  return Response.json(
    {
      error,
      code,
      retryAfter,
    },
    { status },
  );
}

export function streamText(text: string) {
  const encoder = new TextEncoder();

  const stream = new ReadableStream({
    async start(controller) {
      const chunks = text.match(/.{1,120}/g) ?? [text];

      for (const chunk of chunks) {
        controller.enqueue(encoder.encode(`data: ${JSON.stringify({ text: chunk })}\n\n`));
        await new Promise((resolve) => setTimeout(resolve, 12));
      }

      controller.enqueue(encoder.encode("data: [DONE]\n\n"));
      controller.close();
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  });
}
