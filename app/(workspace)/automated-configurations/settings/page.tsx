import type { Metadata } from "next"
import { Settings } from "lucide-react"
import { PageHeader } from "@/components/page-header"
import { ComingSoon } from "@/components/coming-soon"

export const metadata: Metadata = { title: "Settings · Automated Configurations" }

export default function AutomatedConfigurationsSettingsPage() {
  return (
    <>
      <PageHeader title="Automated Configurations" tabsBasePath="/automated-configurations" />
      <ComingSoon icon={Settings} label="Settings" />
    </>
  )
}
