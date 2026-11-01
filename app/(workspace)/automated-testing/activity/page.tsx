import type { Metadata } from "next"
import { Activity } from "lucide-react"
import { PageHeader } from "@/components/page-header"
import { ComingSoon } from "@/components/coming-soon"

export const metadata: Metadata = { title: "Activity · Automated Testing" }

export default function AutomatedTestingActivityPage() {
  return (
    <>
      <PageHeader title="Automated Testing" tabsBasePath="/automated-testing" />
      <ComingSoon icon={Activity} label="Activity" />
    </>
  )
}
