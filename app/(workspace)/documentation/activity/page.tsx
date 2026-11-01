import type { Metadata } from "next"
import { Activity } from "lucide-react"
import { PageHeader } from "@/components/page-header"
import { ComingSoon } from "@/components/coming-soon"

export const metadata: Metadata = { title: "Activity · Documentation" }

export default function DocumentationActivityPage() {
  return (
    <>
      <PageHeader title="Documentation" tabsBasePath="/documentation" />
      <ComingSoon icon={Activity} label="Activity" />
    </>
  )
}
