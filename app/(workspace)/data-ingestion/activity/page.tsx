import type { Metadata } from "next"
import { Activity } from "lucide-react"
import { PageHeader } from "@/components/page-header"
import { ComingSoon } from "@/components/coming-soon"

export const metadata: Metadata = { title: "Activity · Data Ingestion" }

export default function DataIngestionActivityPage() {
  return (
    <>
      <PageHeader title="Data Ingestion" tabsBasePath="/data-ingestion" />
      <ComingSoon icon={Activity} label="Activity" />
    </>
  )
}
