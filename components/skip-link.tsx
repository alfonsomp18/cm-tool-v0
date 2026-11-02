export const MAIN_CONTENT_ID = "main-content"

// First focusable element on the page: invisible until a keyboard user tabs to it, then it jumps past the
// menu bar, header and sidebar to the page content.
export function SkipLink() {
  return (
    <a
      href={`#${MAIN_CONTENT_ID}`}
      className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:border focus:border-border focus:bg-background focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-foreground focus:shadow-md"
    >
      Skip to main content
    </a>
  )
}
