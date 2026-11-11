/**
 * How a nav link relates to the current URL, for `aria-current`:
 * - "page": the link points at exactly this page.
 * - "true": the link points at a parent of this page (e.g. /custom-authorities for /custom-authorities/123).
 * - undefined: unrelated, or the item has no page yet.
 */
export function navCurrent(href: string | undefined, pathname: string): "page" | "true" | undefined {
  if (!href) return undefined
  const path = pathname.length > 1 ? pathname.replace(/\/+$/, "") : pathname
  if (path === href) return "page"
  // "/" is the parent of everything, so it only ever matches exactly.
  if (href !== "/" && path.startsWith(`${href}/`)) return "true"
  return undefined
}
