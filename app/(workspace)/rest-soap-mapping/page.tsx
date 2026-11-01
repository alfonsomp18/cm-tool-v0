import type { Metadata } from "next"
import { ArrowLeftRight } from "lucide-react"
import { PageHeader } from "@/components/page-header"
import { ComingSoon } from "@/components/coming-soon"

export const metadata: Metadata = { title: "REST/SOAP Mapping" }

export default function RestSoapMappingPage() {
  return (
    <>
      <PageHeader title="REST/SOAP Mapping" tabsBasePath="/rest-soap-mapping" />
      <ComingSoon icon={ArrowLeftRight} label="REST/SOAP Mapping" />
    </>
  )
}
