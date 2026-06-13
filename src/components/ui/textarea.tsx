import * as React from "react";

import { cn } from "@/lib/utils";

export function Textarea({ className, ...props }: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      className={cn(
        "min-h-[140px] w-full rounded-3xl border border-black/20 bg-white/60 px-4 py-3 text-sm text-black outline-none transition placeholder:text-gray-600 focus:border-black focus:bg-white/80",
        className,
      )}
      {...props}
    />
  );
}
