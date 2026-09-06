create table public.projects (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  environment text not null default 'UAT',
  owner_id uuid not null references auth.users(id) on delete cascade,
  created_at timestamptz not null default now()
);

alter table public.projects enable row level security;

create policy "Users manage their own projects"
  on public.projects
  for all
  to authenticated
  using (owner_id = auth.uid())
  with check (owner_id = auth.uid());
