"use client"

import { useState } from "react"
import { ChevronDown, Trash2, X, Play } from "lucide-react"
import { authorities, type Authority } from "./authorities-data"
import { cn } from "@/lib/utils"
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
const typeOptions = [...new Set(authorities.map((a) => a.type))].sort()

type PendingDelete = { type: "bulk" } | { type: "row"; id: string; name: string }

function StatusBadge({ status }: { status: Authority["status"] }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium",
        status === "pending" && "bg-accent/15 text-accent",
        status === "success" && "bg-success/15 text-success",
        status === "error" && "bg-destructive/15 text-destructive",
      )}
    >
      {status}
    </span>
  )
}

function CountPill({ value }: { value: number }) {
  return (
    <button className="inline-flex items-center gap-1 rounded-lg border border-input bg-background px-2 py-1 text-xs hover:bg-secondary">
      <ChevronDown className="h-3 w-3 text-muted-foreground" />
      <span className="flex h-4 w-4 items-center justify-center rounded-full bg-foreground text-[10px] font-semibold text-background">
        {value}
      </span>
    </button>
  )
}

export function AuthoritiesTable() {
  const [rows, setRows] = useState<Authority[]>(authorities)
  const [selected, setSelected] = useState<Set<string>>(new Set(authorities.map((a) => a.id)))
  const [dirtyIds, setDirtyIds] = useState<Set<string>>(new Set())
  const [search, setSearch] = useState("")
  const [actionFilter, setActionFilter] = useState<string>("all")
  const [typeFilter, setTypeFilter] = useState<string>("all")
  const [pendingDelete, setPendingDelete] = useState<PendingDelete | null>(null)

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

  function updateField(id: string, field: "name" | "type" | "erpCode", value: string) {
    setRows((prev) => prev.map((r) => (r.id === id ? { ...r, [field]: value } : r)))
    setDirtyIds((prev) => new Set(prev).add(id))
  }

  function removeRow(id: string) {
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
  }

  function deleteSelected() {
    setRows((prev) => prev.filter((r) => !selected.has(r.id)))
    setDirtyIds((prev) => {
      const next = new Set(prev)
      selected.forEach((id) => next.delete(id))
      return next
    })
    setSelected(new Set())
  }

  function confirmPendingDelete() {
    if (pendingDelete?.type === "bulk") deleteSelected()
    else if (pendingDelete?.type === "row") removeRow(pendingDelete.id)
    setPendingDelete(null)
  }

  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-3 px-6 py-4">
        <div className="flex flex-1 flex-wrap items-center gap-2">
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, type, ERP code..."
            className="min-w-64 flex-1 rounded-lg border border-input bg-card px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring/40"
          />
          <select
            value={actionFilter}
            onChange={(e) => setActionFilter(e.target.value)}
            className="rounded-lg border border-transparent bg-transparent px-3 py-2 text-sm text-muted-foreground outline-none hover:border-input hover:bg-secondary hover:text-foreground focus:border-input"
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
            className="rounded-lg border border-transparent bg-transparent px-3 py-2 text-sm text-muted-foreground outline-none hover:border-input hover:bg-secondary hover:text-foreground focus:border-input"
          >
            <option value="all">All Types</option>
            {typeOptions.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
          <button
            aria-label="More filters"
            title="More filters"
            className="rounded-lg border border-transparent p-2 text-muted-foreground hover:border-input hover:bg-secondary hover:text-foreground"
          >
            <ChevronDown className="h-4 w-4" />
          </button>
        </div>

        <div className="flex items-center gap-3 border-l border-border pl-3">
          <span className="text-xs text-muted-foreground">
            {selected.size} of {rows.length} selected
          </span>
          <select
            disabled={selected.size === 0}
            className="rounded-lg border border-input bg-card px-3 py-2 text-sm outline-none disabled:cursor-not-allowed disabled:opacity-50"
          >
            <option>Bulk action</option>
          </select>
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
      <div className="mx-6 mb-3 rounded-xl border border-border bg-card px-4 py-2.5 text-sm text-muted-foreground">
        <span className="font-semibold text-foreground">79</span> authorities generated
      </div>

      {/* Table */}
      <div className="mx-6 flex-1 overflow-auto rounded-xl border border-border bg-card">
        <table className="w-full border-collapse text-sm">
          <thead className="sticky top-0 bg-secondary">
            <tr className="text-left text-xs font-semibold text-muted-foreground">
              <th className="w-10 px-3 py-3">
                <input
                  type="checkbox"
                  checked={allFilteredSelected}
                  onChange={toggleSelectAll}
                  className="h-4 w-4 accent-foreground"
                />
              </th>
              <th className="px-3 py-3">Authority Name</th>
              <th className="px-3 py-3">Type</th>
              <th className="px-3 py-3">ERP Code</th>
              <th className="px-3 py-3">Location</th>
              <th className="px-3 py-3">Rates</th>
              <th className="px-3 py-3">Rules</th>
              <th className="px-3 py-3">Action</th>
              <th className="px-3 py-3">Status</th>
              <th className="w-10 px-3 py-3" />
            </tr>
          </thead>
          <tbody>
            {filteredRows.length === 0 && (
              <tr>
                <td colSpan={10} className="px-3 py-8 text-center text-sm text-muted-foreground">
                  No authorities match your filters.
                </td>
              </tr>
            )}
            {filteredRows.map((a, i) => (
              <tr
                key={a.id}
                className={cn(
                  "border-t border-border hover:bg-secondary/50",
                  i % 2 === 1 && "bg-muted/30",
                )}
              >
                <td className="px-3 py-2">
                  <input
                    type="checkbox"
                    checked={selected.has(a.id)}
                    onChange={() => toggle(a.id)}
                    className="h-4 w-4 accent-foreground"
                  />
                </td>
                <td className="px-3 py-2">
                  <div className="flex items-center gap-1.5">
                    {dirtyIds.has(a.id) && (
                      <span
                        className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
                        title="Unsaved changes"
                      />
                    )}
                    <input
                      value={a.name}
                      onChange={(e) => updateField(a.id, "name", e.target.value)}
                      className="w-full rounded-lg border border-transparent bg-transparent px-2 py-1 text-sm outline-none hover:border-input focus:border-input focus:bg-background focus:ring-1 focus:ring-ring/40"
                    />
                  </div>
                </td>
                <td className="px-3 py-2">
                  <input
                    value={a.type}
                    onChange={(e) => updateField(a.id, "type", e.target.value)}
                    className="w-24 rounded-lg border border-transparent bg-transparent px-2 py-1 text-sm outline-none hover:border-input focus:border-input focus:bg-background focus:ring-1 focus:ring-ring/40"
                  />
                </td>
                <td className="px-3 py-2">
                  <input
                    value={a.erpCode}
                    onChange={(e) => updateField(a.id, "erpCode", e.target.value)}
                    className="w-24 rounded-lg border border-transparent bg-transparent px-2 py-1 text-sm outline-none hover:border-input focus:border-input focus:bg-background focus:ring-1 focus:ring-ring/40"
                  />
                </td>
                <td className="px-3 py-2 text-muted-foreground">{a.location}</td>
                <td className="px-3 py-2">
                  <CountPill value={a.rates} />
                </td>
                <td className="px-3 py-2">
                  <CountPill value={a.rules} />
                </td>
                <td className="px-3 py-2">
                  <span className="inline-flex items-center rounded-full border border-border bg-background px-2.5 py-1 text-xs font-medium text-foreground">
                    {a.action}
                  </span>
                </td>
                <td className="px-3 py-2">
                  <StatusBadge status={a.status} />
                </td>
                <td className="px-3 py-2">
                  <button
                    onClick={() => setPendingDelete({ type: "row", id: a.id, name: a.name })}
                    className="rounded-lg p-1.5 text-destructive hover:bg-destructive/10"
                    aria-label={`Remove ${a.name}`}
                  >
                    <X className="h-4 w-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer action */}
      <div className="flex justify-end px-6 py-4">
        <button className="flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm hover:bg-primary/90">
          <Play className="h-4 w-4" />
          Proceed to Execution
        </button>
      </div>

      <AlertDialog open={pendingDelete !== null} onOpenChange={(open) => !open && setPendingDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {pendingDelete?.type === "bulk"
                ? `Delete ${selected.size} ${selected.size === 1 ? "authority" : "authorities"}?`
                : `Delete "${pendingDelete?.type === "row" ? pendingDelete.name : ""}"?`}
            </AlertDialogTitle>
            <AlertDialogDescription>
              This can&apos;t be undone. This will permanently remove{" "}
              {pendingDelete?.type === "bulk" ? "the selected authorities" : "this authority"} from the list.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmPendingDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
