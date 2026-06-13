import { clsx, type ClassValue } from "clsx";
import { differenceInCalendarDays, format, isToday, parseISO } from "date-fns";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function subjectColor(subject: string) {
  const palette = [
    "#3B82F6",
    "#8B5CF6",
    "#F97316",
    "#10B981",
    "#EF4444",
    "#EAB308",
    "#06B6D4",
  ];

  const score = Array.from(subject).reduce((total, char) => total + char.charCodeAt(0), 0);
  return palette[score % palette.length];
}

export function countdownLabel(dateString: string) {
  const diff = differenceInCalendarDays(parseISO(dateString), new Date());

  if (isToday(parseISO(dateString))) {
    return "Today";
  }

  if (diff < 0) {
    return "Completed";
  }

  if (diff === 1) {
    return "1 day";
  }

  return `${diff} days`;
}

export function formatDate(dateString: string) {
  return format(parseISO(dateString), "EEE, d MMM yyyy");
}

export function safeJsonParse<T>(value: string) {
  try {
    return JSON.parse(value) as T;
  } catch {
    return null;
  }
}

export function minutesBetween(startTime: string, endTime: string) {
  const [startHour, startMinute] = startTime.split(":").map(Number);
  const [endHour, endMinute] = endTime.split(":").map(Number);

  return endHour * 60 + endMinute - (startHour * 60 + startMinute);
}

export function addMinutes(time: string, minutes: number) {
  const [hour, minute] = time.split(":").map(Number);
  const total = hour * 60 + minute + minutes;
  const nextHour = Math.floor(total / 60);
  const nextMinute = total % 60;

  return `${String(nextHour).padStart(2, "0")}:${String(nextMinute).padStart(2, "0")}`;
}

export function toPercent(value: number) {
  return `${Math.round(value)}%`;
}

export function downloadFile(filename: string, content: string, type = "text/plain") {
  if (typeof window === "undefined") return;

  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");

  anchor.href = url;
  anchor.download = filename;
  anchor.click();
  URL.revokeObjectURL(url);
}

export function downloadDataUrl(filename: string, dataUrl: string) {
  if (typeof window === "undefined") return;

  const anchor = document.createElement("a");
  anchor.href = dataUrl;
  anchor.download = filename;
  anchor.click();
}
