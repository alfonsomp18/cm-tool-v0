import { FlaskConical } from "lucide-react"
import { PageHeader } from "@/components/page-header"
import { ComingSoon } from "@/components/coming-soon"

export default function AutomatedTestingPage() {
  return (
    <>
      <PageHeader title="Automated Testing" />
      <ComingSoon icon={FlaskConical} label="Automated Testing" />
    </>
  )
}
