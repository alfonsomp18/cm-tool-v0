create table public.authorities (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  type text not null,
  erp_code text not null default '',
  location text not null,
  rates integer not null default 0,
  rules integer not null default 0,
  action text not null check (action in ('Create', 'Existing', 'Update')),
  status text not null check (status in ('pending', 'success', 'error')),
  created_at timestamptz not null default now()
);

alter table public.authorities enable row level security;

-- No auth system exists yet, so allow full access for now. Tighten this
-- once real project/user auth is wired up.
create policy "Allow all access to authorities (no auth yet)"
  on public.authorities
  for all
  to anon, authenticated
  using (true)
  with check (true);
