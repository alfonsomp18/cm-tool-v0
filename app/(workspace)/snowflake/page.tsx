import { Snowflake } from "lucide-react"
import { PageHeader } from "@/components/page-header"
import { ComingSoon } from "@/components/coming-soon"

export default function SnowflakePage() {
  return (
    <>
      <PageHeader title="Snowflake" />
      <ComingSoon icon={Snowflake} label="Snowflake" />
    </>
  )
}
