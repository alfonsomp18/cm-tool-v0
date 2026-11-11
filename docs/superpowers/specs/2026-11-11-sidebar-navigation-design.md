# Sidebar navigation improvements: design

Date: 2026-11-11
Branch: `feat/sidebar-nav-improvements` (from `main`)

## Goal

Make the sidebar navigation buttons clearer to use with a mouse, keyboard and screen reader, and let people reclaim horizontal space. Scope (all four picked by the user): active state and accessibility, button states and hit areas, the search box, and a collapsible sidebar.

## Scope

`components/app-sidebar.tsx`, a new pure helper `lib/nav-active.ts`, and one prop in `app/(workspace)/layout.tsx`. Out of scope: the header (separate PR), the mobile drawer's layout, nav content.

## Design

### Active state and accessibility
- `navCurrent(href, pathname)` returns `"page"` for an exact match, `"true"` for a parent route (`/custom-authorities` while on `/custom-authorities/123`), otherwise nothing. `/` only matches exactly. Trailing slashes are ignored.
- The link gets `aria-current` from it. Both cases get the active styling, plus a 2px accent bar on the left edge.
- Truncated labels get a `title`. The `<nav>` is labelled "Primary".

### Button states and hit areas
- One shared style for nav rows, section headers and footer buttons: hover, pressed (`active:`), and the global `focus-ring` keyboard focus ring. Rows are at least 40px tall on phones (touch) and 36px on desktop.
- Section headers get `type="button"` and `aria-controls` (unique ids via `useId`, since the desktop sidebar and the mobile drawer can both be in the DOM).
- Items without a page yet render as non-focusable `aria-disabled` rows with a "Soon" label, instead of a `<button>` that does nothing. No item is in this state today.

### Search
- Accessible label, a clear (x) button (the browser's own clear button is hidden), Escape clears, Enter opens the first match and clears the box.
- A polite live region announces "N pages found" / "No pages found".

### Collapsible sidebar
- Opt-in via `collapsible` (the desktop sidebar passes it; the mobile drawer does not, so it stays full width).
- Collapsed: 56px wide, icon-only rows with a right-side tooltip (hover and keyboard focus) and an accessible name that keeps the step number ("Step 1: Configuration Projects"). Section headers become separators, all rows stay visible, and the search box becomes an icon that expands the sidebar and focuses the search input.
- The choice is saved in `localStorage` (`sidebar-collapsed`, access wrapped in try/catch). It renders expanded first and applies the saved value after mount, so a collapsed user sees a brief expanded frame on load.
- The width change uses a CSS transition, which the global reduced-motion rule already shortens.

## Verification
- `tsc --noEmit` clean; `navCurrent` checked with 8 cases.
- Rendered on a temporary page (not committed): collapse and expand, tooltips, persistence across reload, search icon focusing the input, filtering, status text, Escape, Enter navigation.
- Not covered: the signed-in workspace, the accent bar on a real active page, the mobile drawer, dark mode and keyboard focus ring visuals.
