drop policy if exists "Allow all access to authorities (no auth yet)" on public.authorities;

create policy "Users manage authorities in their own projects"
  on public.authorities
  for all
  to authenticated
  using (
    exists (
      select 1 from public.projects
      where projects.id = authorities.project_id
        and projects.owner_id = auth.uid()
    )
  )
  with check (
    exists (
      select 1 from public.projects
      where projects.id = authorities.project_id
        and projects.owner_id = auth.uid()
    )
  );
