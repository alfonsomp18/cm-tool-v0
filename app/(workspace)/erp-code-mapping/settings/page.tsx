import { Settings } from "lucide-react"
import { PageHeader } from "@/components/page-header"
import { ComingSoon } from "@/components/coming-soon"

export default function ErpCodeMappingSettingsPage() {
  return (
    <>
      <PageHeader title="Automated ERP Code Mapping" tabsBasePath="/erp-code-mapping" />
      <ComingSoon icon={Settings} label="Settings" />
    </>
  )
}
