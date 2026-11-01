import type { Metadata } from "next"
import { Snowflake } from "lucide-react"
import { PageHeader } from "@/components/page-header"
import { ComingSoon } from "@/components/coming-soon"

export const metadata: Metadata = { title: "Snowflake" }

export default function SnowflakePage() {
  return (
    <>
      <PageHeader title="Snowflake" tabsBasePath="/snowflake" />
      <ComingSoon icon={Snowflake} label="Snowflake" />
    </>
  )
}
