import type { Metadata } from "next"
import { Activity } from "lucide-react"
import { PageHeader } from "@/components/page-header"
import { ComingSoon } from "@/components/coming-soon"

export const metadata: Metadata = { title: "Activity · Welcome / Tour" }

export default function WelcomeTourActivityPage() {
  return (
    <>
      <PageHeader title="Welcome / Tour" tabsBasePath="/welcome-tour" />
      <ComingSoon icon={Activity} label="Activity" />
    </>
  )
}
