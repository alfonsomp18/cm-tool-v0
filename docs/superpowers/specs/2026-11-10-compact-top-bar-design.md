# Compact top bar: design

Date: 2026-11-10
Branch: `feat/compact-top-bar` (from `main`)

## Goal

Cut the workspace header from two stacked rows (about 100px) to a single row (about 48px) without losing the pipeline progress indicator.

## Scope

Only `components/app-header.tsx`. Out of scope: replacing the native project `<select>` with a custom dropdown, the theme menu (separate dark mode work), the mobile nav drawer.

## Design

### Layout

One row: mobile menu trigger, logo and title, pipeline stepper (fills the middle, centered), project select, account cluster (email, theme toggle, sign out). Existing tokens (`bg-card`, `border-border`) are kept, so light and dark need no color changes.

### Responsive behavior

- **xl and up:** logo, full product title, stepper with every step label.
- **md to lg:** title hidden (logo stays). Only the active step shows its label; other steps are icon-only. The email is hidden below lg, as today.
- **Below md:** the stepper does not fit in the row, so a slim one-line strip under the header shows "Step N of M · <active step>". It is the only second line left.

### Stepper

- Nodes shrink from 28px to 24px.
- Rendered as `<nav aria-label="Pipeline progress">` containing an `<ol>`. The active item has `aria-current="step"`. Icon-only items keep an accessible name (screen-reader text with the step name and whether it is completed or not started) and a `title` for hover.
- With no project selected the stepper and the phone strip are hidden. The select's "Select a project..." placeholder already says what to do.

### Small fix

The native project `<select>` has no accessible label; add `aria-label="Project"`.

## Verification

- Typecheck and lint.
- Screenshots at 1440, 1024, 768 and 375px in light and dark, with and without a project selected (the workspace is behind login; the user signs in in the preview pane, credentials are not entered by the agent).
- Keyboard pass: tab order and visible focus ring on the select and buttons.
