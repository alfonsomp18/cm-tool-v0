import type { Metadata } from "next"
import { Settings } from "lucide-react"
import { PageHeader } from "@/components/page-header"
import { ComingSoon } from "@/components/coming-soon"

export const metadata: Metadata = { title: "Settings · Data Ingestion" }

export default function DataIngestionSettingsPage() {
  return (
    <>
      <PageHeader title="Data Ingestion" tabsBasePath="/data-ingestion" />
      <ComingSoon icon={Settings} label="Settings" />
    </>
  )
}
