import { Plug } from "lucide-react"
import { PageHeader } from "@/components/page-header"
import { ComingSoon } from "@/components/coming-soon"

export default function ApiConnectionPage() {
  return (
    <>
      <PageHeader title="API Connection" />
      <ComingSoon icon={Plug} label="API Connection" />
    </>
  )
}
