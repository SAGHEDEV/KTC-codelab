import { Rocket } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export function UpgradePrompt() {
  return (
    <Card className="bg-gradient-to-br from-sky-500/20 via-slate-900 to-emerald-500/10">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <div className="mb-3 inline-flex rounded-2xl bg-white/10 p-3 text-sky-200">
            <Rocket className="h-5 w-5" />
          </div>
          <h3 className="text-lg font-semibold text-white">Upgrade later when you need it</h3>
          <p className="mt-2 max-w-xl text-sm text-slate-300">
            The MVP already covers study plans, planner, tracker, timetable, notes, and career guidance.
            PRO can later unlock unlimited uploads, AI companion chat, and quiz sharing.
          </p>
        </div>
        <Button variant="secondary">Compare plans</Button>
      </div>
    </Card>
  );
}
