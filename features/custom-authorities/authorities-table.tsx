"use client"

import { useEffect, useMemo, useState } from "react"
import { toast } from "sonner"
import { Trash2, Play, AlertTriangle, SlidersHorizontal, MoreHorizontal, Copy } from "lucide-react"
import { createClient } from "@/lib/supabase/client"
import type { Authority } from "./authorities-data"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog"

const actionOptions: Authority["action"][] = ["Create", "Existing", "Update"]

const editableColumns = { name: "name", type: "type", erpCode: "erp_code" } as const
type EditableField = keyof typeof editableColumns

type PendingDelete = { type: "bulk" } | { type: "row"; id: string; name: string }

// The name column (and the checkbox and row-menu columns around it) are always shown.
const optionalColumns = [
  { id: "type", label: "Type" },
  { id: "erpCode", label: "ERP Code" },
  { id: "location", label: "Location" },
  { id: "rates", label: "Rates" },
  { id: "rules", label: "Rules" },
  { id: "action", label: "Action" },
  { id: "status", label: "Status" },
] as const
type ColumnId = (typeof optionalColumns)[number]["id"]
type Density = "comfortable" | "compact"

const VIEW_PREFS_KEY = "authorities-table-view"
const columnIds = new Set<string>(optionalColumns.map((c) => c.id))

function loadViewPrefs(): { density: Density; hidden: Set<ColumnId> } | null {
  try {
    const raw = window.localStorage.getItem(VIEW_PREFS_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw)
    return {
      density: parsed.density === "compact" ? "compact" : "comfortable",
      hidden: new Set((Array.isArray(parsed.hidden) ? parsed.hidden : []).filter((id: string) => columnIds.has(id))),
    }
  } catch {
    return null
  }
}

function StatusBadge({ status }: { status: Authority["status"] }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium",
        status === "pending" && "bg-warning/15 text-warning",
        status === "success" && "bg-success/15 text-success",
        status === "error" && "bg-destructive/15 text-destructive",
      )}
    >
      {status}
    </span>
  )
}

// Only the count is stored, so there is nothing to expand: show it as a plain badge, not a button.
function CountPill({ value }: { value: number }) {
  return (
    <span className="inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-foreground px-1.5 text-[11px] font-semibold text-background">
      {value}
    </span>
  )
}

export function AuthoritiesTable({
  initialAuthorities,
  fetchError,
}: {
  initialAuthorities: Authority[]
  fetchError: string | null
}) {
  const supabase = useMemo(() => createClient(), [])
  const [rows, setRows] = useState<Authority[]>(initialAuthorities)
  const [selected, setSelected] = useState<Set<string>>(new Set())
  const [dirtyIds, setDirtyIds] = useState<Set<string>>(new Set())
  const [search, setSearch] = useState("")
  const [actionFilter, setActionFilter] = useState<string>("all")
  const [typeFilter, setTypeFilter] = useState<string>("all")
  const [pendingDelete, setPendingDelete] = useState<PendingDelete | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)
  const [density, setDensity] = useState<Density>("comfortable")
  const [hiddenColumns, setHiddenColumns] = useState<Set<ColumnId>>(new Set())
  const [prefsLoaded, setPrefsLoaded] = useState(false)

  // Saved view preferences are read after mount so the server render and first client render match.
  useEffect(() => {
    const prefs = loadViewPrefs()
    if (prefs) {
      setDensity(prefs.density)
      setHiddenColumns(prefs.hidden)
    }
    setPrefsLoaded(true)
  }, [])

  useEffect(() => {
    if (!prefsLoaded) return
    try {
      window.localStorage.setItem(VIEW_PREFS_KEY, JSON.stringify({ density, hidden: [...hiddenColumns] }))
    } catch {
      // Storage can be unavailable (private mode, blocked); the view just won't persist.
    }
  }, [density, hiddenColumns, prefsLoaded])

  const show = (id: ColumnId) => !hiddenColumns.has(id)
  const visibleCount = optionalColumns.length - hiddenColumns.size
  const cellY = density === "compact" ? "py-1" : "py-2"
  const inputY = density === "compact" ? "py-0.5" : "py-1"

  function setColumnVisible(id: ColumnId, visible: boolean) {
    setHiddenColumns((prev) => {
      const next = new Set(prev)
      if (visible) next.delete(id)
      else next.add(id)
      return next
    })
  }

  async function copyErpCode(code: string) {
    try {
      await navigator.clipboard.writeText(code)
      toast.success("ERP code copied")
    } catch {
      toast.error("Couldn't copy to the clipboard")
    }
  }

  const typeOptions = useMemo(() => [...new Set(rows.map((r) => r.type))].sort(), [rows])

  const query = search.trim().toLowerCase()
  const filteredRows = rows.filter((r) => {
    if (actionFilter !== "all" && r.action !== actionFilter) return false
    if (typeFilter !== "all" && r.type !== typeFilter) return false
    if (query && !`${r.name} ${r.type} ${r.erpCode}`.toLowerCase().includes(query)) return false
    return true
  })

  const allFilteredSelected = filteredRows.length > 0 && filteredRows.every((r) => selected.has(r.id))

  function toggle(id: string) {
    setSelected((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  function toggleSelectAll() {
    setSelected((prev) => {
      const next = new Set(prev)
      filteredRows.forEach((r) => (allFilteredSelected ? next.delete(r.id) : next.add(r.id)))
      return next
    })
  }

  function updateField(id: string, field: EditableField, value: string) {
    setRows((prev) => prev.map((r) => (r.id === id ? { ...r, [field]: value } : r)))
    setDirtyIds((prev) => new Set(prev).add(id))
  }

  async function persistField(id: string, field: EditableField) {
    if (!dirtyIds.has(id)) return
    const row = rows.find((r) => r.id === id)
    if (!row) return

    const { error } = await supabase
      .from("authorities")
      .update({ [editableColumns[field]]: row[field] })
      .eq("id", id)

    if (error) {
      toast.error(`Couldn't save "${row.name}": ${error.message}`)
      return
    }
    setDirtyIds((prev) => {
      const next = new Set(prev)
      next.delete(id)
      return next
    })
  }

  async function removeRow(id: string, name: string) {
    const { error } = await supabase.from("authorities").delete().eq("id", id)
    if (error) {
      toast.error(`Couldn't delete "${name}": ${error.message}`)
      return
    }
    setRows((prev) => prev.filter((r) => r.id !== id))
    setSelected((prev) => {
      const next = new Set(prev)
      next.delete(id)
      return next
    })
    setDirtyIds((prev) => {
      const next = new Set(prev)
      next.delete(id)
      return next
    })
    toast.success(`Deleted "${name}"`)
  }

  async function deleteSelected() {
    const ids = [...selected]
    const { error } = await supabase.from("authorities").delete().in("id", ids)
    if (error) {
      toast.error(`Couldn't delete selected authorities: ${error.message}`)
      return
    }
    setRows((prev) => prev.filter((r) => !selected.has(r.id)))
    setDirtyIds((prev) => {
      const next = new Set(prev)
      ids.forEach((id) => next.delete(id))
      return next
    })
    setSelected(new Set())
    toast.success(`Deleted ${ids.length} ${ids.length === 1 ? "authority" : "authorities"}`)
  }

  async function confirmPendingDelete() {
    setIsDeleting(true)
    if (pendingDelete?.type === "bulk") await deleteSelected()
    else if (pendingDelete?.type === "row") await removeRow(pendingDelete.id, pendingDelete.name)
    setIsDeleting(false)
    setPendingDelete(null)
  }

  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      {fetchError && (
        <div className="mx-4 md:mx-6 mt-4 flex items-center gap-2 rounded-xl border border-destructive/30 bg-destructive/10 px-4 py-2.5 text-sm text-destructive">
          <AlertTriangle className="h-4 w-4 shrink-0" />
          Couldn&apos;t load authorities: {fetchError}
        </div>
      )}

      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-3 px-4 py-4 md:px-6">
        <div className="flex flex-1 flex-wrap items-center gap-2">
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, type, ERP code..."
            className="min-w-64 flex-1 rounded-lg border border-input bg-card px-3 py-2 text-sm outline-none focus-visible:border-ring focus-ring"
          />
          <select
            value={actionFilter}
            onChange={(e) => setActionFilter(e.target.value)}
            className="rounded-lg border border-transparent bg-transparent px-3 py-2 text-sm text-muted-foreground outline-none hover:border-input hover:bg-secondary hover:text-foreground focus-visible:border-ring focus-ring"
          >
            <option value="all">All Actions</option>
            {actionOptions.map((a) => (
              <option key={a} value={a}>
                {a}
              </option>
            ))}
          </select>
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="rounded-lg border border-transparent bg-transparent px-3 py-2 text-sm text-muted-foreground outline-none hover:border-input hover:bg-secondary hover:text-foreground focus-visible:border-ring focus-ring"
          >
            <option value="all">All Types</option>
            {typeOptions.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="h-9 gap-1.5 bg-card font-normal text-muted-foreground">
                <SlidersHorizontal />
                View
                {hiddenColumns.size > 0 && (
                  <span className="rounded-full bg-secondary px-1.5 text-[11px] text-foreground">
                    {hiddenColumns.size} hidden
                  </span>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-48">
              <DropdownMenuLabel>Density</DropdownMenuLabel>
              <DropdownMenuRadioGroup value={density} onValueChange={(v) => setDensity(v as Density)}>
                <DropdownMenuRadioItem value="comfortable">Comfortable</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="compact">Compact</DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
              <DropdownMenuSeparator />
              <DropdownMenuLabel>Columns</DropdownMenuLabel>
              {optionalColumns.map((col) => (
                <DropdownMenuCheckboxItem
                  key={col.id}
                  checked={show(col.id)}
                  onCheckedChange={(checked) => setColumnVisible(col.id, checked)}
                  onSelect={(e) => e.preventDefault()}
                >
                  {col.label}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="flex items-center gap-3 md:border-l md:border-border md:pl-3">
          <span className="text-xs text-muted-foreground">
            {selected.size} of {rows.length} selected
          </span>
          <button
            onClick={() => setPendingDelete({ type: "bulk" })}
            disabled={selected.size === 0}
            className="flex items-center gap-1.5 rounded-lg border border-destructive px-3 py-2 text-sm font-medium text-destructive hover:bg-destructive/10 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-transparent"
          >
            <Trash2 className="h-4 w-4" />
            Delete Selected{selected.size > 0 ? ` (${selected.size})` : ""}
          </button>
        </div>
      </div>

      {/* Generated banner */}
      <div className="mx-4 md:mx-6 mb-3 rounded-xl border border-border bg-card px-4 py-2.5 text-sm text-muted-foreground">
        <span className="font-semibold text-foreground">{rows.length}</span> authorities generated
      </div>

      {/* Table */}
      <div className="mx-4 md:mx-6 flex-1 overflow-auto rounded-xl border border-border bg-card">
        <table
          className="w-full border-collapse text-sm"
          style={{ minWidth: `${16 + visibleCount * 6}rem` }}
        >
          <thead className="sticky top-0 z-20 bg-secondary">
            <tr className="text-left text-xs font-semibold text-muted-foreground">
              <th className="sticky left-0 z-10 w-10 min-w-10 bg-secondary px-3 py-3">
                <Checkbox
                  checked={allFilteredSelected}
                  onCheckedChange={toggleSelectAll}
                  aria-label="Select all authorities"
                />
              </th>
              <th className="sticky left-10 z-10 min-w-56 bg-secondary px-3 py-3 shadow-[inset_-1px_0_0_var(--border)]">
                Authority Name
              </th>
              {show("type") && <th className="px-3 py-3">Type</th>}
              {show("erpCode") && <th className="px-3 py-3">ERP Code</th>}
              {show("location") && <th className="px-3 py-3">Location</th>}
              {show("rates") && <th className="px-3 py-3">Rates</th>}
              {show("rules") && <th className="px-3 py-3">Rules</th>}
              {show("action") && <th className="px-3 py-3">Action</th>}
              {show("status") && <th className="px-3 py-3">Status</th>}
              <th className="w-10 px-3 py-3">
                <span className="sr-only">Row actions</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredRows.length === 0 && (
              <tr>
                <td colSpan={3 + visibleCount} className="px-3 py-8 text-center text-sm text-muted-foreground">
                  {rows.length === 0 ? "No authorities yet." : "No authorities match your filters."}
                </td>
              </tr>
            )}
            {filteredRows.map((a) => (
              <tr key={a.id} className="group border-t border-border hover:bg-muted">
                <td className={cn("sticky left-0 z-10 w-10 min-w-10 bg-card px-3 group-hover:bg-muted", cellY)}>
                  <Checkbox
                    checked={selected.has(a.id)}
                    onCheckedChange={() => toggle(a.id)}
                    aria-label={`Select ${a.name}`}
                  />
                </td>
                <td
                  className={cn(
                    "sticky left-10 z-10 min-w-56 bg-card px-3 shadow-[inset_-1px_0_0_var(--border)] group-hover:bg-muted",
                    cellY,
                  )}
                >
                  <div className="flex items-center gap-1.5">
                    {dirtyIds.has(a.id) && (
                      <span
                        className="h-1.5 w-1.5 shrink-0 rounded-full bg-warning"
                        title="Unsaved changes"
                      />
                    )}
                    <input
                      value={a.name}
                      onChange={(e) => updateField(a.id, "name", e.target.value)}
                      onBlur={() => persistField(a.id, "name")}
                      className={cn(
                        "w-full rounded-lg border border-transparent bg-transparent px-2 text-sm outline-none hover:border-input focus:bg-background focus-visible:border-ring focus-ring",
                        inputY,
                      )}
                    />
                  </div>
                </td>
                {show("type") && (
                  <td className={cn("px-3", cellY)}>
                    <input
                      value={a.type}
                      onChange={(e) => updateField(a.id, "type", e.target.value)}
                      onBlur={() => persistField(a.id, "type")}
                      className={cn(
                        "w-24 rounded-lg border border-transparent bg-transparent px-2 text-sm outline-none hover:border-input focus:bg-background focus-visible:border-ring focus-ring",
                        inputY,
                      )}
                    />
                  </td>
                )}
                {show("erpCode") && (
                  <td className={cn("px-3", cellY)}>
                    <input
                      value={a.erpCode}
                      onChange={(e) => updateField(a.id, "erpCode", e.target.value)}
                      onBlur={() => persistField(a.id, "erpCode")}
                      className={cn(
                        "w-24 rounded-lg border border-transparent bg-transparent px-2 text-sm outline-none hover:border-input focus:bg-background focus-visible:border-ring focus-ring",
                        inputY,
                      )}
                    />
                  </td>
                )}
                {show("location") && <td className={cn("px-3 text-muted-foreground", cellY)}>{a.location}</td>}
                {show("rates") && (
                  <td className={cn("px-3", cellY)}>
                    <CountPill value={a.rates} />
                  </td>
                )}
                {show("rules") && (
                  <td className={cn("px-3", cellY)}>
                    <CountPill value={a.rules} />
                  </td>
                )}
                {show("action") && (
                  <td className={cn("px-3", cellY)}>
                    <span className="inline-flex items-center rounded-full border border-border bg-background px-2.5 py-1 text-xs font-medium text-foreground">
                      {a.action}
                    </span>
                  </td>
                )}
                {show("status") && (
                  <td className={cn("px-3", cellY)}>
                    <StatusBadge status={a.status} />
                  </td>
                )}
                <td className={cn("px-3", cellY)}>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon-sm" aria-label={`Actions for ${a.name}`} className="size-7">
                        <MoreHorizontal />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem disabled={!a.erpCode} onSelect={() => copyErpCode(a.erpCode)}>
                        <Copy />
                        Copy ERP code
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        variant="destructive"
                        onSelect={() => setPendingDelete({ type: "row", id: a.id, name: a.name })}
                      >
                        <Trash2 />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer action */}
      <div className="flex justify-end px-4 py-4 md:px-6">
        {/* There is no execution feature yet. aria-disabled (not disabled) keeps the button focusable so the tooltip works on hover and keyboard focus. */}
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              size="lg"
              aria-disabled="true"
              onClick={(e) => e.preventDefault()}
              className="cursor-not-allowed opacity-50 hover:bg-primary"
            >
              <Play />
              Proceed to Execution
            </Button>
          </TooltipTrigger>
          <TooltipContent side="top">Execution isn&apos;t available yet. Coming soon.</TooltipContent>
        </Tooltip>
      </div>

      <AlertDialog open={pendingDelete !== null} onOpenChange={(open) => !open && !isDeleting && setPendingDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {pendingDelete?.type === "bulk"
                ? `Delete ${selected.size} ${selected.size === 1 ? "authority" : "authorities"}?`
                : `Delete "${pendingDelete?.type === "row" ? pendingDelete.name : ""}"?`}
            </AlertDialogTitle>
            <AlertDialogDescription>
              This can&apos;t be undone. This will permanently remove{" "}
              {pendingDelete?.type === "bulk" ? "the selected authorities" : "this authority"} from the database.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmPendingDelete}
              disabled={isDeleting}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {isDeleting ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
