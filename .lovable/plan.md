# Chapter 4: Mortgage Mathematics — Interactive Numeric Input

## Overview

Chapter 4 (Mortgage Mathematics) gets a dedicated interactive format instead of multiple-choice. Learners **type their calculated answer**, get immediate correct/incorrect feedback, and see a **step-by-step solution**. Each math page also includes a **collapsible formula reference card** and an **on-screen calculator**.

## Database Changes

Add three columns to the existing `questions` table to support numeric-answer questions alongside the existing multiple-choice format:

```sql
ALTER TABLE public.questions
  ADD COLUMN question_type text NOT NULL DEFAULT 'multiple_choice';
ALTER TABLE public.questions
  ADD COLUMN numeric_answer text;
ALTER TABLE public.questions
  ADD COLUMN answer_tolerance numeric DEFAULT 0.01;
```

- `question_type`: `'multiple_choice'` (existing) or `'numeric'` (new math format)
- `numeric_answer`: the correct answer as text, e.g. `"$1,456.32"`, `"3.5%"`, `"15 years"` — preserves formatting for display
- `answer_tolerance`: how close a learner's answer must be (default 0.01 handles rounding to the cent)

For numeric questions, `choices` is left null and `correct_index` is set to -1. RLS policies and grants stay the same.

## New Components

### 1. `MathQuestionCard.tsx`
- Renders the problem prompt
- Numeric text input where the learner types their answer
- On submit: compares the learner's number to `numeric_answer` within `answer_tolerance`
- Shows green/red feedback
- Reveals the step-by-step explanation (from the `explanation` field) after answering
- Supports the "submit all / retry" flow like the existing `QuestionCard`

### 2. `FormulaReference.tsx`
- Collapsible card listing common MLO formulas: LTV, DTI, front-end/back-end DTI, monthly payment (amortization), interest, proration, discount points, etc.
- Shown on all Chapter 4 pages (toggle open/closed)

### 3. `Calculator.tsx`
- Simple on-screen calculator (basic arithmetic: +, -, *, /, %, decimals, clear)
- Floating toggle button so it's available while working problems
- Stays within the page (no popup blockers needed)

## Route Changes (`chapter.$chapter.page.$page.tsx`)

- Detect chapter 4 (or any page where questions are `question_type = 'numeric'`)
- Render `MathQuestionCard` instead of `QuestionCard` for numeric questions
- Render `FormulaReference` and `Calculator` at the top of math pages
- Timer, score tracking, retry, and stats recording work the same way
- Mixing is supported: a page can contain both numeric and multiple-choice questions if needed

## Admin Dashboard Changes

- Question editor gains a "type" toggle: Multiple Choice / Numeric Input
- When Numeric is selected: show fields for `numeric_answer`, `answer_tolerance`, and `explanation` (step-by-step)
- When Multiple Choice is selected: show the existing choices/correct-answer fields
- Bulk import format extended to support numeric questions

## What Doesn't Change

- Existing multiple-choice questions and pages (chapters 1-3, 5-10) stay exactly as-is
- Stats, timer, retry, audio, resources, annotations — all continue to work the same
- The homepage chapter grid and page titles remain unchanged

## Build Order

1. Database migration (add columns to `questions`)
2. `MathQuestionCard` component
3. `FormulaReference` + `Calculator` components
4. Route integration (render math cards on chapter 4)
5. Admin dashboard updates (numeric question support)
6. Verify in preview with sample questions
