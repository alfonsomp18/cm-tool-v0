import type { Metadata } from "next"
import { FlaskConical } from "lucide-react"
import { PageHeader } from "@/components/page-header"
import { ComingSoon } from "@/components/coming-soon"

export const metadata: Metadata = { title: "Automated Testing" }

export default function AutomatedTestingPage() {
  return (
    <>
      <PageHeader title="Automated Testing" tabsBasePath="/automated-testing" />
      <ComingSoon icon={FlaskConical} label="Automated Testing" />
    </>
  )
}
