import { Activity } from "lucide-react"
import { PageHeader } from "@/components/page-header"
import { ComingSoon } from "@/components/coming-soon"

export default function RequestHistoryActivityPage() {
  return (
    <>
      <PageHeader title="Request History" tabsBasePath="/request-history" />
      <ComingSoon icon={Activity} label="Activity" />
    </>
  )
}
