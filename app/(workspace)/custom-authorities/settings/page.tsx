import { Settings } from "lucide-react"
import { PageHeader } from "@/components/page-header"
import { ComingSoon } from "@/components/coming-soon"

export default function CustomAuthoritiesSettingsPage() {
  return (
    <>
      <PageHeader title="Custom Authorities" tabsBasePath="/custom-authorities" />
      <ComingSoon icon={Settings} label="Settings" />
    </>
  )
}
