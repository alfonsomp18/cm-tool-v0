import { Activity } from "lucide-react"
import { PageHeader } from "@/components/page-header"
import { ComingSoon } from "@/components/coming-soon"

export default function DataIngestionActivityPage() {
  return (
    <>
      <PageHeader title="Data Ingestion" tabsBasePath="/data-ingestion" />
      <ComingSoon icon={Activity} label="Activity" />
    </>
  )
}
