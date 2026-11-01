import type { Metadata } from "next"
import { Settings } from "lucide-react"
import { PageHeader } from "@/components/page-header"
import { ComingSoon } from "@/components/coming-soon"

export const metadata: Metadata = { title: "Settings · API Connection" }

export default function ApiConnectionSettingsPage() {
  return (
    <>
      <PageHeader title="API Connection" tabsBasePath="/api-connection" />
      <ComingSoon icon={Settings} label="Settings" />
    </>
  )
}
