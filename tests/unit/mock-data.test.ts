import { describe, expect, it } from "vitest";

import { createFallbackCareer, createFallbackStudyPlan, createFallbackTimetable } from "@/lib/mock-data";

describe("mock StudyPulse generators", () => {
  it("creates a daily schedule for each requested day", () => {
    const plan = createFallbackStudyPlan({
      subject: "Mathematics",
      days: 6,
      hours: 3,
      level: "intermediate",
    });

    expect(plan.dailySchedule).toHaveLength(6);
    expect(plan.topics.length).toBeGreaterThan(4);
  });

  it("creates timetable slots from exams", () => {
    const result = createFallbackTimetable([
      {
        id: "1",
        subject: "Biology",
        examDate: new Date().toISOString(),
        color: "#38BDF8",
      },
    ]);

    expect(result.timetable[0]?.subject).toBe("Biology");
    expect(result.rationale.length).toBeGreaterThan(10);
  });

  it("creates career paths for supplied subjects", () => {
    const profile = createFallbackCareer(["Mathematics", "Chemistry"]);

    expect(profile.paths).toHaveLength(3);
    expect(profile.subjectInsights[0]?.subject).toBe("Mathematics");
  });
});
