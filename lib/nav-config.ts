import type { LucideIcon } from "lucide-react"
import {
  ListChecks,
  Database,
  Settings2,
  Code2,
  ShieldCheck,
  FlaskConical,
  Plug,
  Sparkles,
  ArrowLeftRight,
  Snowflake,
  History,
  FileText,
  Compass,
} from "lucide-react"

export interface NavItem {
  label: string
  /** Condensed label for the header's stage tracker; falls back to `label`. */
  shortLabel?: string
  /** Omit while the page doesn't exist yet — renders as a non-navigating label. */
  href?: string
  icon: LucideIcon
  /** Presence marks this item as part of the header's numbered stage tracker. */
  step?: number
}

export const pipelineNav: NavItem[] = [
  { label: "Configuration Projects", shortLabel: "Config", icon: ListChecks, step: 1 },
  { label: "Data Ingestion", shortLabel: "Ingestion", href: "/data-ingestion", icon: Database, step: 2 },
  { label: "Automated Configurations", shortLabel: "Automation", icon: Settings2, step: 3 },
  { label: "Automated ERP Code Mapping", icon: Code2 },
  { label: "Custom Authorities", href: "/custom-authorities", icon: ShieldCheck },
  { label: "Automated Testing", shortLabel: "Testing", icon: FlaskConical, step: 4 },
]

export const toolsNav: NavItem[] = [
  { label: "API Connection", icon: Plug },
  { label: "OpenArena AI", icon: Sparkles },
  { label: "REST/SOAP Mapping", icon: ArrowLeftRight },
  { label: "Snowflake", icon: Snowflake },
  { label: "Request History", icon: History },
  { label: "Documentation", icon: FileText },
  { label: "Welcome / Tour", icon: Compass },
]
