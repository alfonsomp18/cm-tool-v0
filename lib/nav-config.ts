import type { LucideIcon } from "lucide-react"
import {
  Home,
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
  /** One-line blurb shown on the home screen's tile. Only set for built pages. */
  description?: string
}

export const homeNav: NavItem = { label: "Home", href: "/", icon: Home }

export const pipelineNav: NavItem[] = [
  {
    label: "Configuration Projects",
    shortLabel: "Config",
    href: "/configuration-projects",
    icon: ListChecks,
    step: 1,
  },
  {
    label: "Data Ingestion",
    shortLabel: "Ingestion",
    href: "/data-ingestion",
    icon: Database,
    step: 2,
    description: "Pull in source data before it's mapped and configured.",
  },
  {
    label: "Automated Configurations",
    shortLabel: "Automation",
    href: "/automated-configurations",
    icon: Settings2,
    step: 3,
  },
  { label: "Automated ERP Code Mapping", href: "/erp-code-mapping", icon: Code2 },
  {
    label: "Custom Authorities",
    href: "/custom-authorities",
    icon: ShieldCheck,
    description: "Review and edit generated tax authorities before execution.",
  },
  {
    label: "Automated Testing",
    shortLabel: "Testing",
    href: "/automated-testing",
    icon: FlaskConical,
    step: 4,
  },
]

export const toolsNav: NavItem[] = [
  { label: "API Connection", href: "/api-connection", icon: Plug },
  { label: "OpenArena AI", href: "/openarena-ai", icon: Sparkles },
  { label: "REST/SOAP Mapping", href: "/rest-soap-mapping", icon: ArrowLeftRight },
  { label: "Snowflake", href: "/snowflake", icon: Snowflake },
  { label: "Request History", href: "/request-history", icon: History },
  { label: "Documentation", href: "/documentation", icon: FileText },
  { label: "Welcome / Tour", href: "/welcome-tour", icon: Compass },
]
