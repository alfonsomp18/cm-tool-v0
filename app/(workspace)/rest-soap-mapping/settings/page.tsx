import type { Metadata } from "next"
import { Settings } from "lucide-react"
import { PageHeader } from "@/components/page-header"
import { ComingSoon } from "@/components/coming-soon"

export const metadata: Metadata = { title: "Settings · REST/SOAP Mapping" }

export default function RestSoapMappingSettingsPage() {
  return (
    <>
      <PageHeader title="REST/SOAP Mapping" tabsBasePath="/rest-soap-mapping" />
      <ComingSoon icon={Settings} label="Settings" />
    </>
  )
}
