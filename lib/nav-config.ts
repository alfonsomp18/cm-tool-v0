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
  /** Omit while the page doesn't exist yet — renders as a non-navigating label. */
  href?: string
  icon: LucideIcon
  /** Presence marks this item as one of the numbered pipeline steps (badges and progress in the sidebar). */
  step?: number
  /** One-line blurb shown on the home screen's tile. Only set for built pages. */
  description?: string
  /** True only once the page has real functionality, not just a placeholder. */
  implemented?: boolean
}

export const homeNav: NavItem = { label: "Home", href: "/", icon: Home }

export const pipelineNav: NavItem[] = [
  {
    label: "Configuration Projects",
    href: "/configuration-projects",
    icon: ListChecks,
    step: 1,
  },
  {
    label: "Data Ingestion",
    href: "/data-ingestion",
    icon: Database,
    step: 2,
    description: "Pull in source data before it's mapped and configured.",
  },
  {
    label: "Automated Configurations",
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
    implemented: true,
  },
  {
    label: "Automated Testing",
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
