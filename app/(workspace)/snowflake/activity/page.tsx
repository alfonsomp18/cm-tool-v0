import { Activity } from "lucide-react"
import { PageHeader } from "@/components/page-header"
import { ComingSoon } from "@/components/coming-soon"

export default function SnowflakeActivityPage() {
  return (
    <>
      <PageHeader title="Snowflake" tabsBasePath="/snowflake" />
      <ComingSoon icon={Activity} label="Activity" />
    </>
  )
}
