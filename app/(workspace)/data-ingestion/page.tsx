import type { Metadata } from "next"
import { Database } from "lucide-react"
import { PageHeader } from "@/components/page-header"
import { ComingSoon } from "@/components/coming-soon"

export const metadata: Metadata = { title: "Data Ingestion" }

export default function DataIngestionPage() {
  return (
    <>
      <PageHeader title="Data Ingestion" tabsBasePath="/data-ingestion" />
      <ComingSoon icon={Database} label="Data Ingestion" />
    </>
  )
}
