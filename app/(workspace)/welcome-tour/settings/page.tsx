import type { Metadata } from "next"
import { Settings } from "lucide-react"
import { PageHeader } from "@/components/page-header"
import { ComingSoon } from "@/components/coming-soon"

export const metadata: Metadata = { title: "Settings · Welcome / Tour" }

export default function WelcomeTourSettingsPage() {
  return (
    <>
      <PageHeader title="Welcome / Tour" tabsBasePath="/welcome-tour" />
      <ComingSoon icon={Settings} label="Settings" />
    </>
  )
}
