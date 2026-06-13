import { LucideIcon } from "lucide-react";

import { Card } from "@/components/ui/card";

export function EmptyState({
  icon: Icon,
  title,
  description,
}: {
  icon: LucideIcon;
  title: string;
  description: string;
}) {
  return (
    <Card className="flex min-h-48 flex-col items-center justify-center gap-3 text-center">
      <div className="rounded-3xl bg-black/8 border border-black/15 p-4 text-black">
        <Icon className="h-6 w-6" />
      </div>
      <div>
        <h3 className="text-lg font-semibold text-black">{title}</h3>
        <p className="mt-2 max-w-md text-sm text-gray-700">{description}</p>
      </div>
    </Card>
  );
}
