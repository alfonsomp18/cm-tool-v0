import { History } from "lucide-react"
import { PageHeader } from "@/components/page-header"
import { ComingSoon } from "@/components/coming-soon"

export default function RequestHistoryPage() {
  return (
    <>
      <PageHeader title="Request History" />
      <ComingSoon icon={History} label="Request History" />
    </>
  )
}
