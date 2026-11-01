import type { Metadata } from "next"
import { Plug } from "lucide-react"
import { PageHeader } from "@/components/page-header"
import { ComingSoon } from "@/components/coming-soon"

export const metadata: Metadata = { title: "API Connection" }

export default function ApiConnectionPage() {
  return (
    <>
      <PageHeader title="API Connection" tabsBasePath="/api-connection" />
      <ComingSoon icon={Plug} label="API Connection" />
    </>
  )
}
