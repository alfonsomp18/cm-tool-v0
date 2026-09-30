# cm-tool-v0

End-to-End Certificate Manager tool — a workspace for configuring and reviewing tax
authorities across projects, built on Next.js and Supabase.

## What's here today

The app is a multi-stage pipeline (Configuration Projects → Data Ingestion → Automated
Configurations → ERP Code Mapping → **Custom Authorities** → Automated Testing), plus a
handful of supporting tools (API Connection, Snowflake, Request History, etc.). Most of
that pipeline is still placeholder navigation. **Custom Authorities** is the one stage
with real functionality:

- **Auth** — email/password sign-up and sign-in via Supabase Auth, with email
  confirmation, session refresh, and route protection handled in `middleware.ts`.
- **Per-project scoping** — every signed-up user gets their own project
  automatically; the header's project switcher scopes the Custom Authorities table to
  whichever project is selected (persisted in a cookie).
- **Real data** — the `authorities` and `projects` tables live in Postgres with Row
  Level Security, so scoping is enforced at the database layer, not just in the UI.

## Getting started

### 1. Set up Supabase

Create a project at [supabase.com](https://supabase.com), then from **Project Settings
→ API** grab the project URL and anon/public key. Add them to a `.env.local` file at
the repo root:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

The same two variables need to be set on whatever platform you deploy to — a deploy
with these missing will fail at request time, not at build time, since they're read at
runtime by `middleware.ts` and the Supabase client helpers under `lib/supabase/`.

Apply the schema by running the SQL files under `supabase/migrations/` in order
(via the Supabase SQL editor, or `supabase db push` if you've linked the Supabase CLI
to your project). They create the `projects`/`authorities` tables, their RLS policies,
and a trigger that provisions a starter project for each new user.

### 2. Run the app

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — you'll be redirected to
`/login` until you sign up.

## Tech stack

- [Next.js](https://nextjs.org) (App Router) + TypeScript
- [Supabase](https://supabase.com) — Auth and Postgres (with Row Level Security)
- Tailwind CSS v4 + [shadcn/ui](https://ui.shadcn.com) components
- [sonner](https://sonner.emilkowal.ski) for toasts

## Built with v0

This repository is linked to a [v0](https://v0.app) project. Every merge to `main`
deploys automatically.

[Continue working on v0 →](https://v0.app/chat/projects/prj_rQtfvODnvGVH4w4qRLBuGhZpAt46)
