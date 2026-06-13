export type Priority = "high" | "medium" | "low";
export type SessionType = "intensive" | "review" | "practice" | "rest";
export type StudyLevel = "beginner" | "intermediate" | "advanced";

export interface TopicPlan {
  id: string;
  name: string;
  priority: Priority;
  priorityScore: number;
  reason: string;
  timeAllocation: string;
  timeHours: number;
  icon: string;
  simpleExplain: string;
  keyPoints: string[];
  commonMistakes: string[];
  suggestedResources: string[];
  estimatedMasteryTime: string;
  mastered?: boolean;
}

export interface DailyScheduleItem {
  day: number;
  label: string;
  focus: string;
  tasks: string[];
  sessionType: SessionType;
}

export interface StudyPlan {
  subject: string;
  examSummary: string;
  totalHours: number;
  recommendedStrategy: string;
  topics: TopicPlan[];
  dailySchedule: DailyScheduleItem[];
  examDayTips: string[];
  redFlags: string[];
}

export interface QuizQuestion {
  id: string;
  type: "mcq" | "true-false" | "fill-in";
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
  difficulty: "easy" | "medium" | "hard";
}

export interface QuizPayload {
  questions: QuizQuestion[];
}

export interface Exam {
  id: string;
  subject: string;
  examBoard?: string;
  level?: string;
  examDate: string;
  location?: string;
  notes?: string;
  color: string;
}

export interface ProgressRecord {
  id: string;
  subject: string;
  scorePercent: number;
  examType: string;
  notes?: string;
  recordedAt: string;
}

export interface StudySession {
  id: string;
  subject: string;
  durationMins: number;
  startedAt: string;
}

export interface TrackerInsight {
  trend: "improving" | "declining" | "stable" | "inconsistent";
  insights: string[];
  weakestSubject: string;
  strongestSubject: string;
  recommendation: string;
}

export interface TimetableSlot {
  id: string;
  dayOfWeek: number;
  startTime: string;
  endTime: string;
  subject: string;
  color: string;
  notes?: string;
  blocked?: boolean;
  recurring?: boolean;
  sessionType?: "deep-work" | "review" | "practice";
}

export interface CareerNode {
  title: string;
  level: "entry" | "mid" | "senior";
  salaryRange: string;
  description: string;
  growthOutlook: "high" | "medium" | "low";
  yearsToAchieve: number;
}

export interface CareerPath {
  id: string;
  title: string;
  likelihood: "high" | "medium" | "exploratory";
  description: string;
  requiredSubjects: string[];
  recommendedSubjects: string[];
  universityExamples: string[];
  careers: CareerNode[];
  milestones: Array<{ year: number; milestone: string }>;
}

export interface CareerInsight {
  subject: string;
  opens: string[];
  closes: string[];
  importance: "high" | "medium" | "low";
}

export interface CareerProfile {
  summary: string;
  paths: CareerPath[];
  subjectInsights: CareerInsight[];
  actionableAdvice: string[];
}

export interface StudyNote {
  id: string;
  title: string;
  content: string;
  subject?: string;
  tags: string[];
  aiSummary?: string;
  updatedAt: string;
}

export interface UploadResult {
  fileName: string;
  pageCount: number;
  parsedText: string;
  summary: string;
}

export interface StudentProfile {
  name: string;
  level: string;
  institution: string;
  country: string;
  preferredStudyHours: number;
  breakLength: number;
  wakeTime: string;
  sleepTime: string;
  subjects: string[];
}

export interface ApiError {
  error: string;
  code: string;
  retryAfter?: number;
}
