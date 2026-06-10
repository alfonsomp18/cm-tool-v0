"use client"

import { useState } from "react"
import { ChevronDown, Trash2, X, Play } from "lucide-react"
import { authorities, type Authority } from "@/lib/authorities-data"
import { cn } from "@/lib/utils"

function StatusBadge({ status }: { status: Authority["status"] }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium",
        status === "pending" && "bg-accent/15 text-accent",
        status === "success" && "bg-primary/15 text-primary",
        status === "error" && "bg-destructive/15 text-destructive",
      )}
    >
      {status}
    </span>
  )
}

function CountPill({ value }: { value: number }) {
  return (
    <button className="inline-flex items-center gap-1 rounded-md border border-input bg-background px-2 py-1 text-xs hover:bg-secondary">
      <ChevronDown className="h-3 w-3 text-muted-foreground" />
      <span className="flex h-4 w-4 items-center justify-center rounded bg-primary text-[10px] font-semibold text-primary-foreground">
        {value}
      </span>
    </button>
  )
}

export function AuthoritiesTable() {
  const [selected, setSelected] = useState<Set<string>>(new Set(authorities.map((a) => a.id)))

  function toggle(id: string) {
    setSelected((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  const allSelected = selected.size === authorities.length

  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-3 px-6 py-4">
        <input
          type="search"
          placeholder="Search by name, type, ERP code..."
          className="min-w-64 flex-1 rounded-md border border-input bg-card px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring/40"
        />
        <select className="rounded-md border border-input bg-card px-3 py-2 text-sm outline-none">
          <option>All Actions</option>
        </select>
        <select className="rounded-md border border-input bg-card px-3 py-2 text-sm outline-none">
          <option>All Types</option>
        </select>
        <button className="rounded-md border border-input bg-primary p-2 text-primary-foreground">
          <ChevronDown className="h-4 w-4" />
        </button>
        <select className="rounded-md border border-input bg-card px-3 py-2 text-sm outline-none">
          <option>Bulk action</option>
        </select>
        <button className="flex items-center gap-1.5 rounded-md border border-destructive px-3 py-2 text-sm font-medium text-destructive hover:bg-destructive/10">
          <Trash2 className="h-4 w-4" />
          Delete Selected
        </button>
      </div>

      {/* Generated banner */}
      <div className="mx-6 mb-3 rounded-md border border-border bg-card px-4 py-2.5 text-sm text-muted-foreground">
        <span className="font-semibold text-foreground">79</span> authorities generated
      </div>

      {/* Table */}
      <div className="mx-6 flex-1 overflow-auto rounded-md border border-border bg-card">
        <table className="w-full border-collapse text-sm">
          <thead className="sticky top-0 bg-secondary">
            <tr className="text-left text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              <th className="w-10 px-3 py-3">
                <input
                  type="checkbox"
                  checked={allSelected}
                  onChange={() =>
                    setSelected(allSelected ? new Set() : new Set(authorities.map((a) => a.id)))
                  }
                  className="h-4 w-4 accent-primary"
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
            {authorities.map((a) => (
              <tr key={a.id} className="border-t border-border hover:bg-secondary/50">
                <td className="px-3 py-2">
                  <input
                    type="checkbox"
                    checked={selected.has(a.id)}
                    onChange={() => toggle(a.id)}
                    className="h-4 w-4 accent-primary"
                  />
                </td>
                <td className="px-3 py-2">
                  <input
                    defaultValue={a.name}
                    className="w-full rounded border border-input bg-background px-2 py-1 text-sm outline-none focus:ring-1 focus:ring-ring/40"
                  />
                </td>
                <td className="px-3 py-2">
                  <input
                    defaultValue={a.type}
                    className="w-24 rounded border border-input bg-background px-2 py-1 text-sm outline-none focus:ring-1 focus:ring-ring/40"
                  />
                </td>
                <td className="px-3 py-2">
                  <input
                    defaultValue={a.erpCode}
                    className="w-24 rounded border border-input bg-background px-2 py-1 text-sm outline-none focus:ring-1 focus:ring-ring/40"
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
                  <span className="inline-flex items-center rounded-md border border-border bg-background px-2.5 py-1 text-xs font-medium text-foreground">
                    {a.action}
                  </span>
                </td>
                <td className="px-3 py-2">
                  <StatusBadge status={a.status} />
                </td>
                <td className="px-3 py-2">
                  <button className="rounded p-1 text-destructive hover:bg-destructive/10" aria-label="Remove">
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
        <button className="flex items-center gap-2 rounded-md bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm hover:bg-primary/90">
          <Play className="h-4 w-4" />
          Proceed to Execution
        </button>
      </div>
    </div>
  )
}
