import { Sparkles } from "lucide-react"
import { PageHeader } from "@/components/page-header"
import { ComingSoon } from "@/components/coming-soon"

export default function OpenArenaAiPage() {
  return (
    <>
      <PageHeader title="OpenArena AI" />
      <ComingSoon icon={Sparkles} label="OpenArena AI" />
    </>
  )
}
