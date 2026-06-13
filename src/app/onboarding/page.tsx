import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function OnboardingPage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-4xl items-center px-4 py-10">
      <Card className="w-full">
        <p className="text-xs uppercase tracking-[0.3em] text-gray-600">Onboarding</p>
        <h1 className="mt-2 text-3xl font-semibold text-black">You are ready to start</h1>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {[
            "Tell us about yourself",
            "Add your first exam",
            "Choose your current subjects",
            "Set study preferences",
          ].map((step, index) => (
            <div key={step} className="rounded-[24px] bg-black/8 border border-black/15 p-5">
              <p className="text-xs uppercase tracking-[0.2em] text-gray-600">Step {index + 1}</p>
              <p className="mt-2 text-black">{step}</p>
            </div>
          ))}
        </div>
        <Link href="/crunch">
          <Button className="mt-8">Go to Crunch Mode</Button>
        </Link>
      </Card>
    </main>
  );
}
