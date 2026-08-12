import { Database } from "lucide-react"
import { PageHeader } from "@/components/page-header"
import { ComingSoon } from "@/components/coming-soon"

export default function DataIngestionPage() {
  return (
    <>
      <PageHeader title="Data Ingestion" />
      <ComingSoon icon={Database} label="Data Ingestion" />
    </>
  )
}
