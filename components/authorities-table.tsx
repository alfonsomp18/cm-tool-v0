"use client"

import { useState } from "react"
import { ChevronDown, Trash2, X, Play } from "lucide-react"
import { authorities, type Authority } from "@/lib/authorities-data"
import { cn } from "@/lib/utils"

function StatusBadge({ status }: { status: Authority["status"] }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-sm px-2 py-0.5 text-[11px] font-medium uppercase tracking-wide",
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
    <button className="inline-flex items-center gap-1 rounded-sm border border-input bg-background px-1.5 py-0.5 text-xs hover:bg-secondary">
      <ChevronDown className="h-3 w-3 text-muted-foreground" />
      <span className="flex h-4 w-4 items-center justify-center rounded-sm bg-primary text-[10px] font-semibold text-primary-foreground">
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
      <div className="flex flex-wrap items-center gap-2 px-4 py-2">
        <input
          type="search"
          placeholder="Search by name, type, ERP code..."
          className="min-w-64 flex-1 rounded-sm border border-input bg-card px-2.5 py-1.5 text-[13px] outline-none focus:ring-2 focus:ring-ring/40"
        />
        <select className="rounded-sm border border-input bg-card px-2.5 py-1.5 text-[13px] outline-none">
          <option>All Actions</option>
        </select>
        <select className="rounded-sm border border-input bg-card px-2.5 py-1.5 text-[13px] outline-none">
          <option>All Types</option>
        </select>
        <button className="rounded-sm border border-input bg-primary p-1.5 text-primary-foreground">
          <ChevronDown className="h-3.5 w-3.5" />
        </button>
        <select className="rounded-sm border border-input bg-card px-2.5 py-1.5 text-[13px] outline-none">
          <option>Bulk action</option>
        </select>
        <button className="flex items-center gap-1.5 rounded-sm border border-destructive px-2.5 py-1.5 text-[13px] font-medium text-destructive hover:bg-destructive/10">
          <Trash2 className="h-3.5 w-3.5" />
          Delete Selected
        </button>
      </div>

      {/* Generated banner */}
      <div className="mx-4 mb-2 rounded-sm border border-border bg-card px-3 py-1.5 text-[13px] text-muted-foreground">
        <span className="font-semibold text-foreground">79</span> authorities generated
      </div>

      {/* Table */}
      <div className="mx-4 flex-1 overflow-auto rounded-sm border border-border bg-card">
        <table className="w-full border-collapse text-[13px]">
          <thead className="sticky top-0 bg-secondary">
            <tr className="text-left text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
              <th className="w-9 px-2.5 py-2">
                <input
                  type="checkbox"
                  checked={allSelected}
                  onChange={() =>
                    setSelected(allSelected ? new Set() : new Set(authorities.map((a) => a.id)))
                  }
                  className="h-3.5 w-3.5 accent-primary"
                />
              </th>
              <th className="px-2.5 py-2">Authority Name</th>
              <th className="px-2.5 py-2">Type</th>
              <th className="px-2.5 py-2">ERP Code</th>
              <th className="px-2.5 py-2">Location</th>
              <th className="px-2.5 py-2">Rates</th>
              <th className="px-2.5 py-2">Rules</th>
              <th className="px-2.5 py-2">Action</th>
              <th className="px-2.5 py-2">Status</th>
              <th className="w-9 px-2.5 py-2" />
            </tr>
          </thead>
          <tbody>
            {authorities.map((a, i) => (
              <tr
                key={a.id}
                className={cn(
                  "border-t border-border hover:bg-secondary/50",
                  i % 2 === 1 && "bg-muted/30",
                )}
              >
                <td className="px-2.5 py-1">
                  <input
                    type="checkbox"
                    checked={selected.has(a.id)}
                    onChange={() => toggle(a.id)}
                    className="h-3.5 w-3.5 accent-primary"
                  />
                </td>
                <td className="px-2.5 py-1">
                  <input
                    defaultValue={a.name}
                    className="w-full rounded-sm border border-transparent bg-transparent px-1.5 py-0.5 text-[13px] outline-none hover:border-input focus:border-input focus:bg-background focus:ring-1 focus:ring-ring/40"
                  />
                </td>
                <td className="px-2.5 py-1">
                  <input
                    defaultValue={a.type}
                    className="w-24 rounded-sm border border-transparent bg-transparent px-1.5 py-0.5 text-[13px] outline-none hover:border-input focus:border-input focus:bg-background focus:ring-1 focus:ring-ring/40"
                  />
                </td>
                <td className="px-2.5 py-1">
                  <input
                    defaultValue={a.erpCode}
                    className="w-24 rounded-sm border border-transparent bg-transparent px-1.5 py-0.5 font-mono text-[13px] outline-none hover:border-input focus:border-input focus:bg-background focus:ring-1 focus:ring-ring/40"
                  />
                </td>
                <td className="px-2.5 py-1 text-muted-foreground">{a.location}</td>
                <td className="px-2.5 py-1">
                  <CountPill value={a.rates} />
                </td>
                <td className="px-2.5 py-1">
                  <CountPill value={a.rules} />
                </td>
                <td className="px-2.5 py-1">
                  <span className="inline-flex items-center rounded-sm border border-border bg-background px-2 py-0.5 text-[11px] font-medium text-foreground">
                    {a.action}
                  </span>
                </td>
                <td className="px-2.5 py-1">
                  <StatusBadge status={a.status} />
                </td>
                <td className="px-2.5 py-1">
                  <button className="rounded-sm p-1 text-destructive hover:bg-destructive/10" aria-label="Remove">
                    <X className="h-3.5 w-3.5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer action */}
      <div className="flex justify-end px-4 py-2.5">
        <button className="flex items-center gap-2 rounded-sm bg-primary px-4 py-1.5 text-[13px] font-semibold text-primary-foreground shadow-sm hover:bg-primary/90">
          <Play className="h-3.5 w-3.5" />
          Proceed to Execution
        </button>
      </div>
    </div>
  )
}
