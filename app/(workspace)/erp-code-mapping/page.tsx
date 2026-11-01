import type { Metadata } from "next"
import { Code2 } from "lucide-react"
import { PageHeader } from "@/components/page-header"
import { ComingSoon } from "@/components/coming-soon"

export const metadata: Metadata = { title: "Automated ERP Code Mapping" }

export default function ErpCodeMappingPage() {
  return (
    <>
      <PageHeader title="Automated ERP Code Mapping" tabsBasePath="/erp-code-mapping" />
      <ComingSoon icon={Code2} label="Automated ERP Code Mapping" />
    </>
  )
}
