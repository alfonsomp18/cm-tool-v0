import type { Metadata } from "next"
import { FileText } from "lucide-react"
import { PageHeader } from "@/components/page-header"
import { ComingSoon } from "@/components/coming-soon"

export const metadata: Metadata = { title: "Documentation" }

export default function DocumentationPage() {
  return (
    <>
      <PageHeader title="Documentation" tabsBasePath="/documentation" />
      <ComingSoon icon={FileText} label="Documentation" />
    </>
  )
}
