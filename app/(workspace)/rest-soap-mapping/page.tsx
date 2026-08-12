import { ArrowLeftRight } from "lucide-react"
import { PageHeader } from "@/components/page-header"
import { ComingSoon } from "@/components/coming-soon"

export default function RestSoapMappingPage() {
  return (
    <>
      <PageHeader title="REST/SOAP Mapping" />
      <ComingSoon icon={ArrowLeftRight} label="REST/SOAP Mapping" />
    </>
  )
}
