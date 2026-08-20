import { Activity } from "lucide-react"
import { PageHeader } from "@/components/page-header"
import { ComingSoon } from "@/components/coming-soon"

export default function ApiConnectionActivityPage() {
  return (
    <>
      <PageHeader title="API Connection" tabsBasePath="/api-connection" />
      <ComingSoon icon={Activity} label="Activity" />
    </>
  )
}
