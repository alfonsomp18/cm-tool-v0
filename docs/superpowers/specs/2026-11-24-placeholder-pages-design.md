# Placeholder pages: design

Date: 2026-11-24
Branch: `feat/placeholder-pages` (from `main`)

## Goal

Stop showing developer-facing text and dead ends on the pages that aren't built yet. Chosen from the list of UI improvements offered: the "placeholder pages" item.

## Problems

- Every unbuilt module page said "This page is wired up and ready — build the module here." That is a note to a developer, not something a user should read.
- Every module showed Overview / Settings / Activity tabs, but Settings and Activity are empty placeholders in all 13 modules (Custom Authorities included), so two of three tabs led nowhere.

## Changes

- `components/coming-soon.tsx`: the title is "{label} is coming soon" and the line under it is the module's own description. Sub-pages ("Settings", "Activity") have no module description and get "This section isn't available yet."
- `lib/nav-config.ts`: every module now has a `description` (it was set for Custom Authorities and Data Ingestion only). Home tiles show the same text, so unbuilt tiles now carry a blurb too. New optional `tabs` field lists the sections beyond Overview that are actually built.
- `components/module-tabs.tsx`: shows only Overview plus the sections in `tabs`. With nothing beyond Overview there is nothing to switch between, so no strip is rendered. No page files change: they still pass `tabsBasePath`.

## Decisions to review

- **The new descriptions are my wording**, inferred from the module names and their place in the pipeline. Nothing in the repo describes these modules, so please correct any that are off.
- The Settings and Activity routes still exist (they are just not linked from the tabs), so a typed URL shows "Settings is coming soon". Building one means adding `tabs: ["settings"]` to its module in `nav-config.ts`.

## Verification

- `tsc --noEmit` clean.
- Real `HomeTile`, `ComingSoon` and `ModuleTabs` on a temporary page (removed): all 13 tiles show their description; a module page and a sub-page show the new copy; the old text appears nowhere; tabs render nothing for an unbuilt module and for Custom Authorities. With `tabs: ["activity"]` set temporarily, Overview and Activity appear and Settings stays hidden (then reverted).
- The module pages themselves sit behind login and were not opened signed in.
