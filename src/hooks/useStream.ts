"use client";

import { useState } from "react";

import { safeJsonParse } from "@/lib/utils";

export function useStream() {
  const [content, setContent] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function startStream(url: string, body: object) {
    setContent("");
    setError(null);
    setIsStreaming(true);

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      if (!response.ok || !response.body) {
        throw new Error("Unable to start stream");
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let done = false;

      while (!done) {
        const result = await reader.read();
        done = result.done;

        if (!result.value) continue;

        const chunk = decoder.decode(result.value, { stream: true });
        const lines = chunk.split("\n\n");

        for (const line of lines) {
          if (!line.startsWith("data: ")) continue;
          if (line === "data: [DONE]") continue;

          const payload = safeJsonParse<{ text?: string }>(line.slice(6));
          if (payload?.text) {
            setContent((previous) => previous + payload.text);
          }
        }
      }
    } catch {
      setError("StudyPulse AI is taking a moment. Try again in a few seconds.");
    } finally {
      setIsStreaming(false);
    }
  }

  return {
    content,
    error,
    isStreaming,
    startStream,
  };
}
