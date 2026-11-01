import type { Metadata } from "next"
import { Settings } from "lucide-react"
import { PageHeader } from "@/components/page-header"
import { ComingSoon } from "@/components/coming-soon"

export const metadata: Metadata = { title: "Settings · Documentation" }

export default function DocumentationSettingsPage() {
  return (
    <>
      <PageHeader title="Documentation" tabsBasePath="/documentation" />
      <ComingSoon icon={Settings} label="Settings" />
    </>
  )
}
