-- OPTIONAL NEXT SECURITY UPGRADE
-- Use this when you want explicit teacher/admin roles.
-- This is intentionally separate from the starter schema so the first deployment stays simple.

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  role text not null check (role in ('teacher','admin')) default 'teacher',
  school text,
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

-- Staff can read their own profile.
create policy "profiles_self_read"
on public.profiles for select
to authenticated
using (id = auth.uid());

-- An admin account should be inserted/assigned manually from a trusted SQL session.
-- Example:
-- insert into public.profiles (id, full_name, role)
-- values ('AUTH_USER_UUID', 'School Administrator', 'admin');
--
-- After this is installed, replace the simple authenticated question policies
-- with role-aware policies checking public.profiles.role.
