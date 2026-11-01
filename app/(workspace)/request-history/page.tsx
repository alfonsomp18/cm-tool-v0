import type { Metadata } from "next"
import { History } from "lucide-react"
import { PageHeader } from "@/components/page-header"
import { ComingSoon } from "@/components/coming-soon"

export const metadata: Metadata = { title: "Request History" }

export default function RequestHistoryPage() {
  return (
    <>
      <PageHeader title="Request History" tabsBasePath="/request-history" />
      <ComingSoon icon={History} label="Request History" />
    </>
  )
}
