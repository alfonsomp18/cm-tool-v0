import { FileText } from "lucide-react"
import { PageHeader } from "@/components/page-header"
import { ComingSoon } from "@/components/coming-soon"

export default function DocumentationPage() {
  return (
    <>
      <PageHeader title="Documentation" />
      <ComingSoon icon={FileText} label="Documentation" />
    </>
  )
}
