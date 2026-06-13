import { cn } from "@/lib/utils";

export function Badge({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-black/25 bg-black/15 px-3 py-1 text-xs font-medium text-black",
        className,
      )}
    >
      {children}
    </span>
  );
}
