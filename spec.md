# Shorthand Exam Prep

## Current State
New project with empty backend and no frontend.

## Requested Changes (Diff)

### Add
- Timed dictation passages at multiple difficulty levels (Beginner 60 WPM, Intermediate 80 WPM, Advanced 100 WPM, Exam Mock 120 WPM)
- User can read a passage and type shorthand transcription within a countdown timer
- WPM speed calculation and accuracy scoring after each session
- Practice session history stored per anonymous user (via stable storage)
- Dashboard showing total practice time, average WPM, accuracy trend, sessions completed
- Progress chart (WPM over last sessions)
- Multiple choice passage categories (business, news, legal, general)

### Modify
- N/A (new project)

### Remove
- N/A

## Implementation Plan
1. Backend: Store practice sessions (timestamp, WPM, accuracy, level, passage category)
2. Backend: API to save session results, retrieve session history, get aggregate stats
3. Backend: Curated set of shorthand practice passages at each difficulty level
4. Frontend: Landing/home page with hero and feature highlights
5. Frontend: Practice page - passage display, countdown timer, transcription input, scoring
6. Frontend: Dashboard with stats cards and WPM progress chart
7. Frontend: Passage selection cards by difficulty
