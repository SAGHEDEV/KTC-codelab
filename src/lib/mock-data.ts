import type {
  DailyScheduleItem,
  CareerProfile,
  Exam,
  ProgressRecord,
  QuizPayload,
  StudyLevel,
  StudyNote,
  StudyPlan,
  StudySession,
  TimetableSlot,
  TopicPlan,
  TrackerInsight,
  UploadResult,
} from "@/types";
import { addMinutes, subjectColor } from "@/lib/utils";

const icons = [
  "brain",
  "book-open",
  "calculator",
  "beaker",
  "atom",
  "globe",
  "chart-column",
];

function buildTopics(subject: string, level: StudyLevel): TopicPlan[] {
  const topics = [
    "Core ideas",
    "Foundations",
    "Worked examples",
    "Applied practice",
    "Past paper strategy",
    "Weak spots",
  ];

  return topics.map((name, index) => ({
    id: `topic-${index + 1}`,
    name: `${subject.split(" ")[0]} ${name}`.slice(0, 26),
    priority: index < 2 ? "high" : index < 5 ? "medium" : "low",
    priorityScore: 10 - index,
    reason:
      index < 2
        ? "This unlocks the rest of the subject and is likely to appear in several question styles."
        : index < 5
          ? "This strengthens exam performance once the essentials are secure."
          : "This matters, but it should come after the higher-yield material.",
    timeAllocation: `${index < 2 ? 4 : 2} hours`,
    timeHours: index < 2 ? 4 : 2,
    icon: icons[index % icons.length],
    simpleExplain: `${name} in ${subject} is easier when you think of it like building a house: strong basics first, then layers of detail. For a ${level} student, the goal is to understand the pattern, not just memorise the wording. Work one example slowly, then repeat it until it feels predictable.`,
    keyPoints: [
      "Start with the definition in plain language.",
      "Link the idea to one exam-style example.",
      "Turn mistakes into a short checklist.",
    ],
    commonMistakes: [
      "Rushing into practice without checking the core idea.",
      "Reviewing notes passively instead of testing recall.",
    ],
    suggestedResources: ["Past paper questions", "Class notes", "Flashcards"],
    estimatedMasteryTime: index < 2 ? "6-8 hours" : "2-4 hours",
  }));
}

export function createFallbackStudyPlan(input: {
  subject: string;
  days: number;
  hours: number;
  level: StudyLevel;
}): StudyPlan {
  const topics = buildTopics(input.subject, input.level);
  const dailySchedule: DailyScheduleItem[] = Array.from({ length: input.days }, (_, index) => ({
    day: index + 1,
    label: `Day ${index + 1}`,
    focus: topics[index % topics.length]?.name ?? "Mixed review",
    tasks: [
      "Revise the main concept in your own words.",
      "Answer 5 exam-style questions.",
      "Write a 3-line recap from memory.",
    ],
    sessionType: index === input.days - 1 ? "rest" : index % 3 === 0 ? "practice" : "intensive",
  }));

  return {
    subject: input.subject,
    examSummary: `${input.subject} combines foundational understanding with timed problem solving and recall.`,
    totalHours: input.days * input.hours,
    recommendedStrategy:
      "Focus on the highest-yield concepts first, then spend the second half of the week on practice and correction. Keep each session short and active so you are retrieving information, not just rereading.",
    topics,
    dailySchedule,
    examDayTips: [
      "Start with the easiest confident question to settle your nerves.",
      "Watch the clock after each section.",
      "Leave two minutes at the end to check avoidable mistakes.",
    ],
    redFlags: [
      `Do not leave ${topics[0]?.name ?? "the core topic"} until the final 48 hours.`,
      "If practice scores stay below 60%, switch from reading to timed retrieval drills.",
    ],
  };
}

export function createFallbackQuiz(subject: string, topicName: string, count = 5): QuizPayload {
  return {
    questions: Array.from({ length: count }, (_, index) => ({
      id: `q-${index + 1}`,
      type: "mcq",
      question: `Which statement best matches the main idea of ${topicName} in ${subject}?`,
      options: [
        "It depends on applying the core concept accurately.",
        "It is solved by memorising one fixed sentence.",
        "It never appears in timed assessment.",
        "It can be ignored until the final day.",
      ],
      correctAnswer: "It depends on applying the core concept accurately.",
      explanation:
        "Most strong answers show that you understand the idea and can apply it under exam conditions, not just repeat a definition.",
      difficulty: index < 2 ? "easy" : index < 4 ? "medium" : "hard",
    })),
  };
}

export function createFallbackTimetable(exams: Exam[], sessionLength = 90): {
  timetable: TimetableSlot[];
  rationale: string;
} {
  const subjects = exams.length ? exams.map((exam) => exam.subject) : ["Mathematics", "Biology", "English"];
  const timetable = subjects.slice(0, 6).map((subject, index) => {
    const startTime = `${String(8 + index).padStart(2, "0")}:00`;

    return {
      id: `slot-${index + 1}`,
      dayOfWeek: index % 6,
      startTime,
      endTime: addMinutes(startTime, sessionLength),
      subject,
      color: subjectColor(subject),
      sessionType: index % 2 === 0 ? "deep-work" : "practice",
      notes: "Prioritise the nearest exam topic first.",
      recurring: true,
    } satisfies TimetableSlot;
  });

  return {
    timetable,
    rationale:
      "The schedule pushes high-focus work earlier in the day and rotates subjects to reduce fatigue. Subjects closest to the exam date should take the best energy windows.",
  };
}

export function createFallbackCareer(subjects: string[]): CareerProfile {
  const list = subjects.length ? subjects : ["Mathematics", "Biology", "English"];

  return {
    summary:
      "You have a balanced profile with room for both analytical and people-focused pathways. The strongest route is to pick one lead direction and then build evidence around it with grades, projects, and research.",
    paths: [
      {
        id: "path-1",
        title: "Health & Life Sciences",
        likelihood: "high",
        description: "A good fit for students who enjoy biology, structured learning, and real-world impact.",
        requiredSubjects: ["Biology", "Chemistry"],
        recommendedSubjects: ["Mathematics"],
        universityExamples: ["University of Lagos", "University of Birmingham"],
        careers: [
          {
            title: "Medical Laboratory Scientist",
            level: "entry",
            salaryRange: "$30k-$45k / local equivalent",
            description: "Works with samples, diagnostics, and healthcare systems.",
            growthOutlook: "medium",
            yearsToAchieve: 5,
          },
        ],
        milestones: [
          { year: 1, milestone: "Strengthen science grades and begin career research." },
          { year: 3, milestone: "Apply for a science-aligned degree or foundation route." },
        ],
      },
      {
        id: "path-2",
        title: "Technology & Data",
        likelihood: "medium",
        description: "Best for students who like systems, logic, and problem solving.",
        requiredSubjects: ["Mathematics"],
        recommendedSubjects: ["Physics", "Computer Science"],
        universityExamples: ["Covenant University", "UCL"],
        careers: [
          {
            title: "Data Analyst",
            level: "entry",
            salaryRange: "$35k-$60k / local equivalent",
            description: "Turns messy data into decisions and performance insight.",
            growthOutlook: "high",
            yearsToAchieve: 4,
          },
        ],
        milestones: [
          { year: 1, milestone: "Build spreadsheet and statistics confidence." },
          { year: 2, milestone: "Complete one portfolio project or short certification." },
        ],
      },
      {
        id: "path-3",
        title: "Humanities & Communication",
        likelihood: "exploratory",
        description: "Useful if your strengths lean toward writing, argument, and audience awareness.",
        requiredSubjects: ["English"],
        recommendedSubjects: ["History", "Government"],
        universityExamples: ["University of Ibadan", "King's College London"],
        careers: [
          {
            title: "Policy Researcher",
            level: "entry",
            salaryRange: "$28k-$50k / local equivalent",
            description: "Researches systems, writes reports, and supports decisions.",
            growthOutlook: "medium",
            yearsToAchieve: 4,
          },
        ],
        milestones: [
          { year: 1, milestone: "Write and present stronger evidence-based arguments." },
          { year: 3, milestone: "Join internships, student journalism, or debate projects." },
        ],
      },
    ],
    subjectInsights: list.map((subject) => ({
      subject,
      opens: ["Broader degree options", "Transferable reasoning skills"],
      closes: subject === "Mathematics" ? [] : ["Some highly technical pathways without support subjects"],
      importance: subject === "Mathematics" ? "high" : "medium",
    })),
    actionableAdvice: [
      "Choose one lead path and test it with a small project this month.",
      "Match your exam revision to the subjects that unlock the most options.",
      "Save course and university research in one place so decisions stay evidence-based.",
    ],
  };
}

export function createFallbackInsight(records: ProgressRecord[], sessions: StudySession[]): TrackerInsight {
  const average =
    records.reduce((total, record) => total + record.scorePercent, 0) / Math.max(records.length, 1);
  const studyHours = sessions.reduce((total, session) => total + session.durationMins, 0) / 60;

  return {
    trend: average >= 70 ? "improving" : records.length > 3 ? "inconsistent" : "stable",
    insights: [
      `Average score is ${Math.round(average || 68)}%, which suggests your base understanding is building.`,
      `You logged roughly ${studyHours.toFixed(1)} study hours in the tracked period.`,
      "Subjects with recent practice sessions tend to improve faster than subjects only revised through reading.",
    ],
    weakestSubject: records.at(-1)?.subject ?? "Chemistry",
    strongestSubject: records[0]?.subject ?? "Mathematics",
    recommendation: "Pick one weak subject and schedule two short timed practice blocks before your next assessment.",
  };
}

export const demoExams: Exam[] = [
  {
    id: "exam-1",
    subject: "Mathematics",
    examBoard: "WAEC",
    level: "Senior Secondary",
    examDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 14).toISOString(),
    location: "Hall A",
    color: "#3B82F6",
  },
  {
    id: "exam-2",
    subject: "Biology",
    examBoard: "WAEC",
    level: "Senior Secondary",
    examDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 21).toISOString(),
    location: "Hall B",
    color: "#10B981",
  },
];

export const demoProgress: ProgressRecord[] = [
  {
    id: "progress-1",
    subject: "Mathematics",
    scorePercent: 72,
    examType: "Mock exam",
    notes: "Stronger on algebra than geometry.",
    recordedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 9).toISOString(),
  },
  {
    id: "progress-2",
    subject: "Biology",
    scorePercent: 64,
    examType: "Past paper",
    notes: "Cell biology needs more work.",
    recordedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 4).toISOString(),
  },
];

export const demoSessions: StudySession[] = [
  {
    id: "session-1",
    subject: "Mathematics",
    durationMins: 90,
    startedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3).toISOString(),
  },
  {
    id: "session-2",
    subject: "Biology",
    durationMins: 60,
    startedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(),
  },
];

export const demoNotes: StudyNote[] = [
  {
    id: "note-1",
    title: "Cell Transport",
    subject: "Biology",
    tags: ["biology", "revision"],
    content:
      "Diffusion moves particles from high concentration to low concentration. Active transport uses energy and moves against the concentration gradient.",
    aiSummary: "Focus on the difference between passive movement and energy-driven movement.",
    updatedAt: new Date().toISOString(),
  },
];

export const demoUploads: UploadResult[] = [
  {
    fileName: "biology-notes.pdf",
    pageCount: 14,
    parsedText: "Topic coverage includes cells, transport, enzymes, and respiration.",
    summary:
      "Main topics identified: cell structure, transport processes, enzymes, respiration, and exam-style definitions.",
  },
];
