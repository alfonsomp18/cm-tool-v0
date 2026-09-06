alter table public.authorities
  add column project_id uuid references public.projects(id) on delete cascade;
