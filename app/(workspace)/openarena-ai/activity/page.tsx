import { Activity } from "lucide-react"
import { PageHeader } from "@/components/page-header"
import { ComingSoon } from "@/components/coming-soon"

export default function OpenArenaAiActivityPage() {
  return (
    <>
      <PageHeader title="OpenArena AI" tabsBasePath="/openarena-ai" />
      <ComingSoon icon={Activity} label="Activity" />
    </>
  )
}
