import type { Metadata } from "next"
import { Settings2 } from "lucide-react"
import { PageHeader } from "@/components/page-header"
import { ComingSoon } from "@/components/coming-soon"

export const metadata: Metadata = { title: "Automated Configurations" }

export default function AutomatedConfigurationsPage() {
  return (
    <>
      <PageHeader title="Automated Configurations" tabsBasePath="/automated-configurations" />
      <ComingSoon icon={Settings2} label="Automated Configurations" />
    </>
  )
}
