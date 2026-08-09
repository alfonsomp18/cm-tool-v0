# Home screen design

## Context

The app currently redirects `/` straight to `/custom-authorities` — there's no landing page, and the only way to see what the tool contains is to scan the sidebar. The user wants a home screen where the existing Custom Authorities page (and everything else in the nav) is reachable as a tile, giving the tool a proper entry point as more pages/modules get added.

## Scope

Home replaces the current `/` redirect. It shares the existing workspace chrome (menu bar, header, sidebar) rather than being a separate landing page outside the app shell.

All 13 nav items (6 pipeline stages + 7 tools) get a tile — not just the 2 that are built. This mirrors the sidebar's existing convention, where every nav item is listed but only items with an `href` are real links; the rest render as inert, unstyled-as-actionable labels. The home screen reuses that same distinction, just as tiles instead of rows:

- **Built** (Custom Authorities, Data Ingestion): real link, hover state, "Open" affordance, optional one-line description.
- **Not yet built** (the other 11): same tile shape, reduced opacity, no hover/link, a muted "Coming soon" pill instead of "Open."

## Data model

`lib/nav-config.ts`:
- Add `homeNav: NavItem` — a single entry (`label: "Home"`, `href: "/"`, `icon: Home`), rendered by the sidebar above the "Project Pipeline" section.
- Add optional `description?: string` to `NavItem`. Filled in only for Custom Authorities and Data Ingestion; omitted elsewhere (a tile with no description just shows icon + label + status).

## Components

- **`components/home-tile.tsx`** (new): presentational tile — icon in a small rounded swatch, label, optional description, status affordance. Takes `item: NavItem` and renders as a `Link` when `item.href` exists, or a plain `div` otherwise. Reused for every tile on the page.
- **`app/(workspace)/page.tsx`** (new, replaces the redirect currently at `app/page.tsx`): renders `<PageHeader title="Home"/>` followed by two grouped tile grids — "Project Pipeline" (from `pipelineNav`) and "Tools" (from `toolsNav`) — using the same section grouping/icons the sidebar already uses.
- **`app/page.tsx`**: deleted (the route now lives at `app/(workspace)/page.tsx`, which resolves to the same `/` URL since route groups don't add a path segment).
- **`components/app-sidebar.tsx`**: gains a "Home" row above "Project Pipeline", rendered via the existing `NavRow` using `homeNav`, so active-state highlighting works identically to every other nav item.

## Visual treatment

Follows the palette/density work already done in this project: rounded-xl cards (`bg-card`, `border-border`), neutral icon swatches (`bg-secondary`/`muted-foreground`), no gratuitous color — blue (`primary`) reserved for the "Open" affordance/hover state on built tiles only, consistent with the earlier "blue = meaningful, not decorative" pass. Unbuilt tiles use reduced opacity rather than a color signal, matching how the sidebar already renders them.

## Out of scope

- No new pages beyond what already exists (Custom Authorities, Data Ingestion stub) — this only adds the home screen and its navigation wiring.
- No tile reordering/customization, search, or favoriting — a static grid driven by the existing nav-config order.
