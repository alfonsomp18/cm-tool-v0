# Sidebar visual refresh: design

Date: 2026-11-19
Branch: `feat/sidebar-visual-refresh` (from `main`)

## Goal

Make the left sidebar tidier and more informative without changing how it works. Scope chosen by the user: "visual refresh" only (not a blue sidebar, high-contrast mode or resizing).

## Changes

- **Group labels:** "Project Pipeline" and "Tools" become small uppercase labels (12px, semibold, wide tracking) in the muted color. They are still the collapse buttons.
- **Spacing:** rows 4px apart (was 2px), 24px between sections (was 16px), 16px gap under Home, and more padding around the list (12px sides, 16px top and bottom). The collapsed rail keeps its 8px sides so rows still fit in 56px.
- **Active row:** label is now semibold in the foreground color (was primary blue, which is the weakest text color on the tinted row), with the blue icon, the tinted background and a 4px accent bar (was 2px).
- **Step badges show progress** when the current page is one of the four numbered steps:
  - done: green fill with a check;
  - current: solid blue with the number;
  - upcoming: outlined with a muted number.
  On any other page (Home, tools, ERP mapping, Custom Authorities) all badges are the neutral outlined style, so the sidebar never implies progress it doesn't know about. The header stepper keeps its own behavior.
- **Accessible names:** badges are decorative; each step link's name is "Step N: Label" plus ", completed" / ", current step" / ", not started" when progress is shown.
- **Collapsed rail:** it has no badges, so a done step shows a small green dot on its icon and the current step a blue dot; the names and tooltips carry the state text.

## Code

- `lib/pipeline-progress.ts` (new): `stepStates(pathname)` returns a map of step number to done / active / todo, or `null` off the numbered steps. Matches exact and nested routes via `navCurrent`.
- `components/app-sidebar.tsx`: styling above, `NavRow` takes the progress map.

## Contrast

Measured from the token values in `globals.css` (WCAG contrast; needs 4.5:1 for text):

| Pairing | Light | Dark |
|---|---|---|
| Done badge (success-foreground on success) | 6.15 | 7.81 |
| Current badge (primary-foreground on primary) | 4.58 | 5.26 |
| Upcoming number and group labels (muted-foreground on card) | 5.06 | 6.91 |
| Active row label, new (foreground on the primary tint) | 17.34 | 15.42 |
| Active row label, old (primary on the primary tint) | 4.19 | 4.28 |

The old active label was below AA in both themes; the new one fixes that.

## Verification

- `tsc --noEmit` clean.
- `stepStates` run against 7 cases (first, middle, last step, nested route, Home, Custom Authorities, a tool page) using the function body extracted from the shipped file.
- In the browser on a temporary harness page: neutral state, progress state, dark mode, collapsed rail. The path was switched with `history.replaceState` because real step pages sit behind login.
