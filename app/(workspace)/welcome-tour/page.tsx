import type { Metadata } from "next"
import { Compass } from "lucide-react"
import { PageHeader } from "@/components/page-header"
import { ComingSoon } from "@/components/coming-soon"

export const metadata: Metadata = { title: "Welcome / Tour" }

export default function WelcomeTourPage() {
  return (
    <>
      <PageHeader title="Welcome / Tour" tabsBasePath="/welcome-tour" />
      <ComingSoon icon={Compass} label="Welcome / Tour" />
    </>
  )
}
