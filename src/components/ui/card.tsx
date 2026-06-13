import * as React from "react";

import { cn } from "@/lib/utils";

export function Card({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "rounded-[28px] border border-black/15 bg-white/70 p-5 shadow-glass backdrop-blur-md",
        className,
      )}
      {...props}
    />
  );
}
