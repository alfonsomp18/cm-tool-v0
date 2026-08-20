import { Settings } from "lucide-react"
import { PageHeader } from "@/components/page-header"
import { ComingSoon } from "@/components/coming-soon"

export default function RequestHistorySettingsPage() {
  return (
    <>
      <PageHeader title="Request History" tabsBasePath="/request-history" />
      <ComingSoon icon={Settings} label="Settings" />
    </>
  )
}
