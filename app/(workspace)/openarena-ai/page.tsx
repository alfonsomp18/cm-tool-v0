import type { Metadata } from "next"
import { Sparkles } from "lucide-react"
import { PageHeader } from "@/components/page-header"
import { ComingSoon } from "@/components/coming-soon"

export const metadata: Metadata = { title: "OpenArena AI" }

export default function OpenArenaAiPage() {
  return (
    <>
      <PageHeader title="OpenArena AI" tabsBasePath="/openarena-ai" />
      <ComingSoon icon={Sparkles} label="OpenArena AI" />
    </>
  )
}
