# Navigation bar accessibility: design

Date: 2026-11-18
Branch: `feat/nav-accessibility` (from `main`)

## Goal

Make the menu strip, header and sidebar easier to use with a keyboard, a screen reader and touch. Earlier PRs already covered the sidebar's links, search and collapse and the header's stepper; this one fixes what a manual audit still found.

## Audit method

A temporary page mirroring the workspace shell was inspected through the browser's accessibility tree plus checks run in the page (ARIA attributes, element sizes, keyboard focus order). An automated axe-core run was attempted but blocked by the permission check, so the audit is manual and may miss things axe would catch.

## Findings and fixes

| Finding | Fix |
|---|---|
| Menu strip (File / Pipeline / Tools / Help) was a plain `div` of four separate Tab stops, with no landmark and no arrow-key movement. | Rebuilt on the project's Radix `Menubar`: `role="menubar"` named "Application menu", one Tab stop, Left/Right arrows move between menus, Down/Enter/Space open one, Escape closes and returns focus. |
| Before a project is chosen the menu buttons were `disabled`: removed from the Tab order, and the explanation was a `title` that keyboard and touch users never see. | Menus stay openable; with no project the menu says "Select a project to use the X menu". |
| Menu trigger focus was only a pale background change (about 1.1:1). | The shared `focus-ring` (2px outline) is added. |
| Header brand was not a link, so there was no quick way to Home. | Logo and title are a link to `/`, named "End-to-End Certificate Manager tool, home" (the title text is hidden below xl), with `aria-current="page"` on Home. |
| Header icon buttons were 28px, the menu buttons 28px and the project select 31px, close to the 24px WCAG AA minimum. | 32px for header icon buttons, the project select and the menu strip on desktop; 36px for the menu strip on phones. Header stays 49px; the menu strip grows from about 41px to 45px. |
| `<aside>` had no label; the search box was not a landmark. | `aside` labelled "Sidebar"; the search block has `role="search"` named "Pages". |
| Sign-out button had no `type`; the mobile menu button did not say it opens a dialog. | `type="button"`; `aria-haspopup="dialog"`. |

## Out of scope

Windows high-contrast (forced-colors) styling for the active sidebar row and stepper nodes, which rely on background fills; a second "skip to navigation" link (the existing skip link already bypasses the repeated blocks); page heading structure.

## Verification

- `tsc --noEmit` clean.
- In the browser on the audit page: Tab order (skip link, then the menubar as one stop, then the home link), arrow keys between menus, Escape returning focus, the no-project message, white focus ring on the blue header, no control under 32px, no overflow at 375px.
