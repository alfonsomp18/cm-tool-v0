# Dark mode improvements: design

Date: 2026-11-09
Branch: `feat/dark-mode-improvements` (from `main`)

## Goal

Make the dark theme clearer and more comfortable to use: surfaces and form fields that are easy to tell apart, readable secondary text, status colors that hold up on dark backgrounds, and a theme control that lets people return to "follow my OS".

## Current state

- Theming uses `next-themes` (class strategy, `defaultTheme="system"`) and shadcn tokens in `app/globals.css`. App code outside `components/ui` uses tokens only, with no hardcoded colors.
- `.dark` tokens are pure neutral greys: background 0.145, card/popover 0.205, `--border` and `--input` both 0.269. Surfaces barely separate.
- Inputs, selects, textareas and checkboxes use `dark:bg-input/30` over the card, so the fill is almost the card color and the border equals the generic border token. The fields nearly disappear (seen on `/login`).
- `--destructive` is the same value in light and dark. The destructive button and badge use `dark:bg-destructive/60`.
- `--chart-1` (0.488) is too dark on the 0.145 background.
- `components/theme-toggle.tsx` is a two-state sun/moon button. The first click overrides the OS preference and there is no way back to "System".
- The favicon in `app/layout.tsx` uses `prefers-color-scheme` media queries, so it follows the OS, not the in-app theme.

## Scope

In scope: the `.dark` token block, dark-specific rules in `components/ui` form controls and the destructive button/badge/tabs/toasts, the theme toggle, the favicon. Light theme values are not changed.

Out of scope: a multi-level elevation/surface token system, new colors for the light theme, restyling layouts.

## Design

### 1. Palette (`app/globals.css`, `.dark` block only)

- Tint the neutrals slightly toward the brand hue (~260, chroma about 0.01-0.02) instead of pure grey.
- Widen the surface steps: background, card and popover each visibly distinct from the one beneath.
- `--border` and `--input` become visibly lighter than the surfaces they sit on (target: at least 1.3:1 against the adjacent surface for borders; at least 3:1 for the input outline, per WCAG 1.4.11).
- `--muted-foreground` reaches at least 4.5:1 on background, card and secondary.
- `--destructive`, `--success`, `--warning` and `--chart-1..5` are retuned so each reads at least 4.5:1 as text and 3:1 as a graphical mark on the dark surfaces, and the chart colors stay distinguishable from each other.
- Sidebar tokens follow the same surface and border steps.
- Final values are chosen with a throwaway script that computes contrast from the oklch values (the same approach as the focus-ring comment in `globals.css`). The measured ratios go in a comment next to the tokens.

### 2. Component fixes (`components/ui`)

- Input, textarea, select, input-group, input-otp, checkbox, radio-group: replace `dark:bg-input/30` with a fill and an outline that meet the targets above.
- Destructive button and badge: choose the dark fill so the white label meets 4.5:1.
- Tabs, switch, dropdown/context/menubar destructive focus states: confirm they read correctly against the new tokens and adjust only if they don't.
- Overlays and shadows: keep black scrims; check that dialog, sheet, drawer and popover edges are still visible, using the border token rather than shadow alone.
- Sonner toasts: verify they use popover/border tokens and meet contrast.

### 3. Theme toggle and favicon

- `ThemeToggle` becomes a small System / Light / Dark menu built from the existing dropdown-menu component. The trigger shows the icon for the current choice (monitor, sun or moon), keeps an accessible name that states the current choice, and has no hydration mismatch (the existing mounted guard stays).
- Favicon: replace the media-query icons with a small client component that sets the icon link from `resolvedTheme`, falling back to the existing `icon.svg`.

### 4. Verification

- `npm run lint` and a TypeScript check pass.
- Contrast script output matches the targets in section 1.
- Screenshots of `/login` and `/reset-password` in light and dark, and with System selected under both OS schemes.
- Workspace screens checked in dark mode through a signed-in session in the preview pane (the user signs in; test credentials are not entered by the agent).
- Keyboard: the theme menu opens, moves and closes with the keyboard; the focus ring is visible in both themes.
- Reduced motion is unaffected (no new animation is added).

## Risks

- Token changes affect every screen at once, so the signed-in workspace review matters most.
- `package-lock.json` and `app/auth/confirm/qa-saved/` are untracked leftovers from other work and are not part of this change.
- The unfinished table work (`dirtyIds` migration) is stashed from `feat/saved-cue-for-cell-edits` and is not touched here.
