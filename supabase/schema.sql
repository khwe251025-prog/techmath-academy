-- TECHMATH ACADEMY database
-- Run this in Supabase SQL Editor before using the global/admin features.

create extension if not exists "pgcrypto";

create table if not exists public.questions (
  id uuid primary key default gen_random_uuid(),
  unit text not null,
  lesson text not null,
  difficulty text not null check (difficulty in ('Easy','Medium','Hard')),
  prompt text not null,
  options jsonb not null,
  answer integer not null check (answer between 0 and 3),
  explanation text default '',
  created_at timestamptz not null default now()
);

create table if not exists public.results (
  id uuid primary key default gen_random_uuid(),
  student_name text not null,
  student_id text not null,
  school text not null,
  grade text not null,
  unit text not null,
  score integer not null,
  total integer not null,
  percentage integer not null,
  answers jsonb not null,
  question_ids jsonb not null,
  created_at timestamptz not null default now()
);

alter table public.questions enable row level security;
alter table public.results enable row level security;

-- Students can read the published question bank for assessments.
drop policy if exists "questions_public_read" on public.questions;
create policy "questions_public_read"
on public.questions for select
to anon, authenticated
using (true);

-- Only authenticated teacher/admin accounts can create, edit or delete questions.
drop policy if exists "questions_staff_insert" on public.questions;
create policy "questions_staff_insert"
on public.questions for insert
to authenticated
with check (true);

drop policy if exists "questions_staff_update" on public.questions;
create policy "questions_staff_update"
on public.questions for update
to authenticated
using (true)
with check (true);

drop policy if exists "questions_staff_delete" on public.questions;
create policy "questions_staff_delete"
on public.questions for delete
to authenticated
using (true);

-- A student may submit a result, but public users cannot read results.
drop policy if exists "results_public_insert" on public.results;
create policy "results_public_insert"
on public.results for insert
to anon, authenticated
with check (true);

drop policy if exists "results_staff_read" on public.results;
create policy "results_staff_read"
on public.results for select
to authenticated
using (true);
