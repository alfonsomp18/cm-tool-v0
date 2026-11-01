import type { Metadata } from "next"
import { Activity } from "lucide-react"
import { PageHeader } from "@/components/page-header"
import { ComingSoon } from "@/components/coming-soon"

export const metadata: Metadata = { title: "Activity · Custom Authorities" }

export default function CustomAuthoritiesActivityPage() {
  return (
    <>
      <PageHeader title="Custom Authorities" tabsBasePath="/custom-authorities" />
      <ComingSoon icon={Activity} label="Activity" />
    </>
  )
}
