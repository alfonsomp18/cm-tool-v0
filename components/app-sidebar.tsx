"use client"

import { useEffect, useId, useRef, useState } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Workflow, Wrench, ChevronDown, Search, X, PanelLeftClose, PanelLeftOpen } from "lucide-react"
import { homeNav, pipelineNav, toolsNav, type NavItem } from "@/lib/nav-config"
import { navCurrent } from "@/lib/nav-active"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"

const COLLAPSED_KEY = "sidebar-collapsed"

// Shared by every sidebar button: hover, pressed and keyboard-focus styling, and a touch-friendly height on phones.
const rowBase =
  "flex min-h-10 w-full items-center gap-2.5 rounded-lg px-3 py-2 text-sm transition-colors focus-ring md:min-h-9"
const rowIdle =
  "text-muted-foreground hover:bg-secondary hover:text-foreground active:bg-secondary/70"

/** Shows the label as a tooltip (on hover and keyboard focus) only while the sidebar is icon-only. */
function CollapsedTooltip({ label, enabled, children }: { label: string; enabled: boolean; children: React.ReactElement }) {
  if (!enabled) return children
  return (
    <Tooltip>
      <TooltipTrigger asChild>{children}</TooltipTrigger>
      <TooltipContent side="right">{label}</TooltipContent>
    </Tooltip>
  )
}

function SectionHeader({
  icon: Icon,
  label,
  open,
  onToggle,
  controls,
}: {
  icon: React.ElementType
  label: string
  open: boolean
  onToggle: () => void
  controls: string
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-expanded={open}
      aria-controls={controls}
      className={cn(rowBase, "justify-between gap-0 py-2", rowIdle, "text-foreground hover:text-foreground")}
    >
      <div className="flex items-center gap-2">
        <Icon className="h-4 w-4 text-muted-foreground" />
        <span className="text-sm font-semibold">{label}</span>
      </div>
      <ChevronDown
        className={cn("h-4 w-4 shrink-0 text-muted-foreground transition-transform", !open && "-rotate-90")}
      />
    </button>
  )
}

function NavRow({ item, pathname, collapsed }: { item: NavItem; pathname: string; collapsed: boolean }) {
  const Icon = item.icon
  const current = navCurrent(item.href, pathname)
  const active = current !== undefined
  const layout = collapsed ? "justify-center px-0" : ""

  const content = (
    <>
      {!collapsed && item.step ? (
        <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-foreground text-[11px] font-semibold text-background">
          {item.step}
        </span>
      ) : null}
      <Icon className={cn("h-4 w-4 shrink-0", active && "text-primary")} />
      {!collapsed && <span className="truncate text-left">{item.label}</span>}
    </>
  )

  // Pages that don't exist yet: not focusable, not clickable, and visibly different from a link.
  if (!item.href) {
    return (
      <div aria-disabled="true" className={cn(rowBase, layout, "cursor-not-allowed text-muted-foreground/60")}>
        {content}
        {!collapsed && <span className="ml-auto text-[10px] font-medium uppercase tracking-wide">Soon</span>}
      </div>
    )
  }

  // Icon-only links need a name; keep the step number the sighted label shows.
  const collapsedName = item.step ? `Step ${item.step}: ${item.label}` : item.label

  return (
    <CollapsedTooltip label={collapsedName} enabled={collapsed}>
      <Link
        href={item.href}
        aria-current={current}
        aria-label={collapsed ? collapsedName : undefined}
        title={collapsed ? undefined : item.label}
        className={cn(
          rowBase,
          layout,
          "relative",
          active
            ? "bg-primary/10 font-medium text-primary before:absolute before:inset-y-1.5 before:left-0 before:w-0.5 before:rounded-full before:bg-primary"
            : rowIdle,
        )}
      >
        {content}
      </Link>
    </CollapsedTooltip>
  )
}

type SectionKey = "pipeline" | "tools"

export function AppSidebar({ className, collapsible = false }: { className?: string; collapsible?: boolean }) {
  const pathname = usePathname()
  const router = useRouter()
  const sectionId = useId()
  const searchRef = useRef<HTMLInputElement>(null)
  const focusSearchOnExpand = useRef(false)
  const [query, setQuery] = useState("")
  const [openSections, setOpenSections] = useState<Record<SectionKey, boolean>>({
    pipeline: true,
    tools: true,
  })

  // Starts expanded on the server and first paint; the saved preference is applied after mount.
  const [savedCollapsed, setSavedCollapsed] = useState(false)
  const collapsed = collapsible && savedCollapsed
  useEffect(() => {
    try {
      setSavedCollapsed(localStorage.getItem(COLLAPSED_KEY) === "1")
    } catch {
      // Storage can be blocked; the sidebar just stays expanded.
    }
  }, [])

  useEffect(() => {
    if (!collapsed && focusSearchOnExpand.current) {
      focusSearchOnExpand.current = false
      searchRef.current?.focus()
    }
  }, [collapsed])

  function setCollapsed(next: boolean) {
    setSavedCollapsed(next)
    if (next) setQuery("")
    try {
      localStorage.setItem(COLLAPSED_KEY, next ? "1" : "0")
    } catch {
      // Not persisted; still applies for this visit.
    }
  }

  function toggleSection(key: SectionKey) {
    setOpenSections((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  const isSearching = !collapsed && query.trim().length > 0
  const matches = (item: NavItem) => item.label.toLowerCase().includes(query.trim().toLowerCase())

  const homeVisible = !isSearching || matches(homeNav)
  const filteredPipeline = isSearching ? pipelineNav.filter(matches) : pipelineNav
  const filteredTools = isSearching ? toolsNav.filter(matches) : toolsNav
  const resultCount = (homeVisible ? 1 : 0) + filteredPipeline.length + filteredTools.length
  const noResults = isSearching && resultCount === 0

  const firstMatchHref = [homeVisible ? homeNav : null, ...filteredPipeline, ...filteredTools].find(
    (item) => item?.href,
  )?.href

  function onSearchKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Escape" && query) {
      e.preventDefault()
      setQuery("")
    } else if (e.key === "Enter" && isSearching && firstMatchHref) {
      e.preventDefault()
      router.push(firstMatchHref)
      setQuery("")
    }
  }

  const pipelineOpen = collapsed || isSearching || openSections.pipeline
  const toolsOpen = collapsed || isSearching || openSections.tools

  return (
    <aside
      className={cn(
        "flex shrink-0 flex-col border-r border-border bg-card transition-[width] duration-200",
        collapsed ? "w-14" : "w-72",
        className,
      )}
    >
      <div className={cn("border-b border-border", collapsed ? "p-2" : "p-3")}>
        {collapsed ? (
          <CollapsedTooltip label="Search pages" enabled>
            <button
              type="button"
              aria-label="Search pages"
              onClick={() => {
                focusSearchOnExpand.current = true
                setCollapsed(false)
              }}
              className={cn(rowBase, "justify-center px-0", rowIdle)}
            >
              <Search className="h-4 w-4" />
            </button>
          </CollapsedTooltip>
        ) : (
          <div className="relative">
            <Search
              aria-hidden="true"
              className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
            />
            <input
              ref={searchRef}
              type="search"
              aria-label="Search pages"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={onSearchKeyDown}
              placeholder="Search pages..."
              className="w-full rounded-lg border border-input bg-background py-2 pl-9 pr-9 text-sm outline-none focus-visible:border-ring focus-ring [&::-webkit-search-cancel-button]:appearance-none"
            />
            {query && (
              <button
                type="button"
                aria-label="Clear search"
                onClick={() => {
                  setQuery("")
                  searchRef.current?.focus()
                }}
                className="absolute right-1.5 top-1/2 -translate-y-1/2 rounded-md p-1.5 text-muted-foreground hover:bg-secondary hover:text-foreground focus-ring"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            )}
          </div>
        )}
        <p role="status" className="sr-only">
          {isSearching ? (noResults ? "No pages found" : `${resultCount} ${resultCount === 1 ? "page" : "pages"} found`) : ""}
        </p>
      </div>

      <nav aria-label="Primary" className="flex-1 overflow-y-auto px-2 py-3">
        {noResults && (
          <p className="px-3 py-2 text-sm text-muted-foreground">No matches for &quot;{query.trim()}&quot;</p>
        )}

        {homeVisible && (
          <div className="mb-2">
            <NavRow item={homeNav} pathname={pathname} collapsed={collapsed} />
          </div>
        )}

        {(!isSearching || filteredPipeline.length > 0) && (
          <>
            {collapsed ? (
              <div role="separator" className="mx-1 my-2 border-t border-border" />
            ) : (
              <SectionHeader
                icon={Workflow}
                label="Project Pipeline"
                open={pipelineOpen}
                onToggle={() => toggleSection("pipeline")}
                controls={`${sectionId}-pipeline`}
              />
            )}
            {pipelineOpen && (
              <div id={`${sectionId}-pipeline`} className="flex flex-col gap-0.5">
                {filteredPipeline.map((item) => (
                  <NavRow key={item.label} item={item} pathname={pathname} collapsed={collapsed} />
                ))}
              </div>
            )}
          </>
        )}

        {(!isSearching || filteredTools.length > 0) && (
          <div className={collapsed ? undefined : "mt-4"}>
            {collapsed ? (
              <div role="separator" className="mx-1 my-2 border-t border-border" />
            ) : (
              <SectionHeader
                icon={Wrench}
                label="Tools"
                open={toolsOpen}
                onToggle={() => toggleSection("tools")}
                controls={`${sectionId}-tools`}
              />
            )}
            {toolsOpen && (
              <div id={`${sectionId}-tools`} className="flex flex-col gap-0.5">
                {filteredTools.map((item) => (
                  <NavRow key={item.label} item={item} pathname={pathname} collapsed={collapsed} />
                ))}
              </div>
            )}
          </div>
        )}
      </nav>

      {collapsible && (
        <div className={cn("border-t border-border", collapsed ? "p-2" : "p-3")}>
          <CollapsedTooltip label="Expand sidebar" enabled={collapsed}>
            <button
              type="button"
              onClick={() => setCollapsed(!collapsed)}
              aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
              className={cn(rowBase, collapsed && "justify-center px-0", rowIdle)}
            >
              {collapsed ? <PanelLeftOpen className="h-4 w-4" /> : <PanelLeftClose className="h-4 w-4" />}
              {!collapsed && <span>Collapse</span>}
            </button>
          </CollapsedTooltip>
        </div>
      )}
    </aside>
  )
}
