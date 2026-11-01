import type { Metadata } from "next"
import { Settings } from "lucide-react"
import { PageHeader } from "@/components/page-header"
import { ComingSoon } from "@/components/coming-soon"

export const metadata: Metadata = { title: "Settings · OpenArena AI" }

export default function OpenArenaAiSettingsPage() {
  return (
    <>
      <PageHeader title="OpenArena AI" tabsBasePath="/openarena-ai" />
      <ComingSoon icon={Settings} label="Settings" />
    </>
  )
}
