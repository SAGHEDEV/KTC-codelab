"use client";

import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { createFallbackCareer } from "@/lib/mock-data";
import { useAppStore } from "@/store/app-store";

type CareerFormValues = {
  subjects: string;
  interests: string;
  dreamCareer: string;
  country: string;
};

export function CareerGuide() {
  const profile = useAppStore((state) => state.careerProfile);
  const setCareerProfile = useAppStore((state) => state.setCareerProfile);
  const form = useForm<CareerFormValues>({
    defaultValues: {
      subjects: "Mathematics, Biology, English",
      interests: "Problem solving, helping people",
      dreamCareer: "Medicine",
      country: "Nigeria",
    },
  });

  function onSubmit(values: CareerFormValues) {
    const subjects = values.subjects
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);

    setCareerProfile(createFallbackCareer(subjects));
  }

  return (
    <div className="space-y-6">
      <Card>
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-gray-600">Career path guide</p>
            <h2 className="mt-2 text-2xl font-semibold text-black">Turn subjects into direction</h2>
            <p className="mt-2 max-w-2xl text-sm text-gray-700">{profile.summary}</p>
          </div>
          <form className="grid gap-3 md:grid-cols-2" onSubmit={form.handleSubmit(onSubmit)}>
            <Input placeholder="Subjects" {...form.register("subjects")} />
            <Input placeholder="Interests" {...form.register("interests")} />
            <Input placeholder="Dream career" {...form.register("dreamCareer")} />
            <Input placeholder="Country" {...form.register("country")} />
            <Button className="md:col-span-2" type="submit">
              Refresh path
            </Button>
          </form>
        </div>
      </Card>

      <div className="grid gap-4 xl:grid-cols-3">
        {profile.paths.map((path) => (
          <Card key={path.id}>
            <p className="text-xs uppercase tracking-[0.2em] text-gray-600">{path.likelihood}</p>
            <h3 className="mt-2 text-xl font-semibold text-black">{path.title}</h3>
            <p className="mt-2 text-sm text-gray-700">{path.description}</p>
            <div className="mt-4 space-y-3 text-sm text-gray-700">
              <p>Required: {path.requiredSubjects.join(", ")}</p>
              <p>Recommended: {path.recommendedSubjects.join(", ")}</p>
              <p>Universities: {path.universityExamples.join(", ")}</p>
            </div>
            <div className="mt-5 space-y-3">
              {path.milestones.map((milestone) => (
                <div key={`${path.id}-${milestone.year}`} className="rounded-2xl bg-black/8 border border-black/15 p-3">
                  <p className="text-xs uppercase tracking-[0.2em] text-gray-600">Year {milestone.year}</p>
                  <p className="mt-1 text-sm text-gray-700">{milestone.milestone}</p>
                </div>
              ))}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
