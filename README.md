# Edigo - Your Academic Guide

Edigo (Latin: "Guide") is a premium local-first academic planning MVP with glass morphism design, built with `Next.js 14`, `TypeScript`, `Tailwind`, `Zustand`, `React Hook Form`, `Zod`, and `Recharts`.

## MVP approach

- Runs immediately inside this workspace with no external setup
- Uses mocked auth, AI, uploads, planner data, notes, and tracker data
- Keeps the architecture shape of the full product so real providers can be connected later

## Included routes

- `/` landing page
- `/login` and `/signup` mock auth pages
- `/onboarding` quick setup page
- `/crunch` syllabus-to-study-plan flow with streamed local JSON
- `/planner` exam planner
- `/timetable` weekly timetable builder with PNG export and print view
- `/tracker` score logger with charts
- `/career` career path guide
- `/notes` note editor with AI-summary placeholder
- `/quiz` standalone quiz
- `/settings` profile summary

## Local run

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Validation

```bash
npm run check
```

## Notes

- API routes under `src/app/api` are mocked for immediate local use
- `prisma/schema.prisma` and `.env.example` are included for future real backend wiring
- External services like Supabase, Anthropic, Resend, and Upstash are intentionally not required in this MVP
