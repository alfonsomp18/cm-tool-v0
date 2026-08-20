import { Settings } from "lucide-react"
import { PageHeader } from "@/components/page-header"
import { ComingSoon } from "@/components/coming-soon"

export default function SnowflakeSettingsPage() {
  return (
    <>
      <PageHeader title="Snowflake" tabsBasePath="/snowflake" />
      <ComingSoon icon={Settings} label="Settings" />
    </>
  )
}
