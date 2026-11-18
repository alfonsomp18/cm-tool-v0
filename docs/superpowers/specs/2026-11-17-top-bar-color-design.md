# Top bar color: design

Date: 2026-11-17
Branch: `feat/top-bar-color` (from `main`)

## Goal

Make the top bar solid brand blue with white text, in light and dark mode.

## Why new tokens

`--primary` can't be reused: in dark mode it is `oklch(0.623 0.214 260)`, which gives only 3.76:1 against white text (AA needs 4.5:1), and even the light-mode value fails for 85%-white secondary text (3.92:1). So the bar gets its own tokens, chosen by measuring contrast (WCAG relative luminance, sRGB alpha compositing over the bar color):

| Token | Light | Dark |
|---|---|---|
| `--header` | `oklch(0.50 0.19 259.815)` | `oklch(0.45 0.17 259.815)` |
| `--header-foreground` | `oklch(1 0 0)` | `oklch(1 0 0)` |

| Use | Light | Dark | Needs |
|---|---|---|---|
| White text | 6.21:1 | 7.67:1 | 4.5:1 |
| 85% white (secondary text) | 4.94:1 | 6.00:1 | 4.5:1 |
| 60% white (borders, icons) | 3.24:1 | 3.80:1 | 3:1 |
| White text on the select's 10% white fill | 5.10:1 | 6.11:1 | 4.5:1 |

Rule used in the component: text is white or 85% white; borders and icon outlines are 60% white; 40% white is only used for decorative connector lines.

## Changes

- `app/globals.css`: `--header`, `--header-foreground` (both themes) and `--color-header*` theme colors.
- `components/app-header.tsx`: `bg-header text-header-foreground`; logo tile becomes white with a blue bolt; stepper nodes are white (done = filled with a check, active = outlined with a faint fill and a bold label, upcoming = dim outline) instead of green/blue; project select is a translucent white fill with a white border (its dropdown options keep the card colors); email, theme toggle, sign-out and the mobile menu button are white with a translucent hover; the load-error message becomes a white pill with red text; the phone step strip is white on blue.
- Focus rings inside the header are white (`--ring` is the brand blue and would vanish on the bar), set with `[--ring:var(--header-foreground)]` on the header only.

## Out of scope

The File / Pipeline / Tools / Help menu strip above the header (`components/menu-bar.tsx`) keeps the card color. The dark mode palette work in the earlier spec is separate.

## Verification

- `tsc --noEmit` clean.
- Real `AppHeader` rendered on a temporary page in three states (project selected, no project, load error) in light and dark; keyboard focus ring confirmed white and 2px; no overflow at 768 and 375px; heights unchanged.
