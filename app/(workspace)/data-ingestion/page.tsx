import { Database } from "lucide-react"
import { PageHeader } from "@/components/page-header"
import { Empty, EmptyHeader, EmptyMedia, EmptyTitle, EmptyDescription } from "@/components/ui/empty"

export default function DataIngestionPage() {
  return (
    <>
      <PageHeader title="Data Ingestion" />
      <Empty>
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <Database />
          </EmptyMedia>
          <EmptyTitle>Data Ingestion module coming soon</EmptyTitle>
          <EmptyDescription>This page is wired up and ready — build the module here.</EmptyDescription>
        </EmptyHeader>
      </Empty>
    </>
  )
}
