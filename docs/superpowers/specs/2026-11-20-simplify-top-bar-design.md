# Simplify the top bar: design

Date: 2026-11-20
Branch: `feat/simplify-top-bar` (from `main`)

## Goal

A simpler top bar. Of the options offered (drop the stepper, one account button, hide the menu strip, neutral light bar), the user chose only: drop the stepper.

## Why this is safe

The pipeline progress the stepper showed is now also in the sidebar's numbered badges (done / current / upcoming, previous PR), so the information isn't lost.

## Changes

- `components/app-header.tsx`: the four-step pipeline stepper and its phone strip ("Step N of M") are removed, along with the code that only served them. The bar is now: mobile menu button, brand (home link), then project picker and account controls on the right.
- The product title, previously shown only from 1280px because the stepper needed the room, now shows from 1024px. At 768px a load-error state squeezed the row (title truncated, 53px tall), so tablets keep the logo only.
- `lib/nav-config.ts`: the `shortLabel` field and its four values were only used by the stepper, so they are removed; the `step` comment now says where steps are used.
- Unchanged: colors, the project picker, the account controls, the home link, focus rings.

## Behavior differences to be aware of

- On a step page the bar no longer shows progress; the sidebar does. The old stepper also showed the last step as "current" on pages that weren't a step (e.g. Home), which the sidebar deliberately does not do.
- On phones there is no step strip, so the header is a single 53px row (it was 77px with a project selected).

## Verification

- `tsc --noEmit` clean (this also proves nothing else used `shortLabel`).
- Real `AppHeader` rendered on a temporary page in three states (project selected, no project, load error): heights 49px at 1024 and 768, 53px at 375 (menu button sizing), no horizontal overflow at 1440, 1024, 768 or 375, title shown at 1024 without truncation.
