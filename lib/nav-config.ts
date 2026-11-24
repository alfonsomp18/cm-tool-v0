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
  /** One-line blurb of what the module is for: shown on the home screen's tile and on its coming-soon page. */
  description?: string
  /**
   * Sections beyond Overview that are actually built. The tab strip only shows these, so an unbuilt
   * Settings or Activity page isn't offered. Add "settings" or "activity" here when its page gets real content.
   */
  tabs?: ("settings" | "activity")[]
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
    description: "Create and manage the projects your configurations are built in.",
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
    description: "Generate configurations from the data you ingested.",
  },
  {
    label: "Automated ERP Code Mapping",
    href: "/erp-code-mapping",
    icon: Code2,
    description: "Map generated configurations to your ERP's codes.",
  },
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
    description: "Run automated tests against a finished configuration.",
  },
]

export const toolsNav: NavItem[] = [
  { label: "API Connection", href: "/api-connection", icon: Plug, description: "Set up the connection to your ERP's API." },
  { label: "OpenArena AI", href: "/openarena-ai", icon: Sparkles, description: "AI help with the configuration workflow." },
  {
    label: "REST/SOAP Mapping",
    href: "/rest-soap-mapping",
    icon: ArrowLeftRight,
    description: "Map REST and SOAP request fields to the tool's data.",
  },
  { label: "Snowflake", href: "/snowflake", icon: Snowflake, description: "Connect to your data in Snowflake." },
  { label: "Request History", href: "/request-history", icon: History, description: "Review past API requests and their responses." },
  { label: "Documentation", href: "/documentation", icon: FileText, description: "Guides and reference for using the tool." },
  { label: "Welcome / Tour", href: "/welcome-tour", icon: Compass, description: "A guided introduction to the tool." },
]
