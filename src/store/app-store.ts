"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

import {
  createFallbackCareer,
  createFallbackInsight,
  createFallbackStudyPlan,
  createFallbackTimetable,
  demoExams,
  demoNotes,
  demoProgress,
  demoSessions,
} from "@/lib/mock-data";
import type {
  CareerProfile,
  Exam,
  ProgressRecord,
  StudyNote,
  StudyPlan,
  StudySession,
  StudentProfile,
  TimetableSlot,
  TrackerInsight,
} from "@/types";

type AppState = {
  profile: StudentProfile;
  exams: Exam[];
  progressRecords: ProgressRecord[];
  studySessions: StudySession[];
  notes: StudyNote[];
  studyPlan: StudyPlan;
  timetable: TimetableSlot[];
  timetableRationale: string;
  careerProfile: CareerProfile;
  trackerInsight: TrackerInsight;
  setProfile: (profile: Partial<StudentProfile>) => void;
  addExam: (exam: Exam) => void;
  addProgress: (record: ProgressRecord) => void;
  saveNote: (note: StudyNote) => void;
  setStudyPlan: (plan: StudyPlan) => void;
  toggleMasteredTopic: (topicId: string) => void;
  setTimetable: (slots: TimetableSlot[], rationale: string) => void;
  addTimetableSlot: (slot: TimetableSlot) => void;
  setCareerProfile: (profile: CareerProfile) => void;
  refreshInsight: () => void;
};

const initialPlan = createFallbackStudyPlan({
  subject: "Mathematics",
  days: 7,
  hours: 3,
  level: "intermediate",
});

const timetableSeed = createFallbackTimetable(demoExams);

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      profile: {
        name: "Ada",
        level: "Secondary",
        institution: "Demo College",
        country: "Nigeria",
        preferredStudyHours: 3,
        breakLength: 15,
        wakeTime: "06:00",
        sleepTime: "22:30",
        subjects: ["Mathematics", "Biology", "English"],
      },
      exams: demoExams,
      progressRecords: demoProgress,
      studySessions: demoSessions,
      notes: demoNotes,
      studyPlan: initialPlan,
      timetable: timetableSeed.timetable,
      timetableRationale: timetableSeed.rationale,
      careerProfile: createFallbackCareer(["Mathematics", "Biology", "English"]),
      trackerInsight: createFallbackInsight(demoProgress, demoSessions),
      setProfile: (profile) =>
        set((state) => ({
          profile: {
            ...state.profile,
            ...profile,
          },
        })),
      addExam: (exam) =>
        set((state) => ({
          exams: [exam, ...state.exams].sort(
            (left, right) => new Date(left.examDate).getTime() - new Date(right.examDate).getTime(),
          ),
        })),
      addProgress: (record) =>
        set((state) => ({
          progressRecords: [record, ...state.progressRecords],
          trackerInsight: createFallbackInsight([record, ...state.progressRecords], state.studySessions),
        })),
      saveNote: (note) =>
        set((state) => {
          const existing = state.notes.find((item) => item.id === note.id);

          return {
            notes: existing
              ? state.notes.map((item) => (item.id === note.id ? note : item))
              : [note, ...state.notes],
          };
        }),
      setStudyPlan: (plan) => set({ studyPlan: plan }),
      toggleMasteredTopic: (topicId) =>
        set((state) => ({
          studyPlan: {
            ...state.studyPlan,
            topics: state.studyPlan.topics.map((topic) =>
              topic.id === topicId ? { ...topic, mastered: !topic.mastered } : topic,
            ),
          },
        })),
      setTimetable: (slots, rationale) => set({ timetable: slots, timetableRationale: rationale }),
      addTimetableSlot: (slot) =>
        set((state) => ({
          timetable: [...state.timetable, slot],
        })),
      setCareerProfile: (profile) => set({ careerProfile: profile }),
      refreshInsight: () =>
        set((state) => ({
          trackerInsight: createFallbackInsight(state.progressRecords, state.studySessions),
        })),
    }),
    {
      name: "studypulse-mvp-store",
    },
  ),
);
