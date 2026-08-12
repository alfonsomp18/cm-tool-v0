import { Compass } from "lucide-react"
import { PageHeader } from "@/components/page-header"
import { ComingSoon } from "@/components/coming-soon"

export default function WelcomeTourPage() {
  return (
    <>
      <PageHeader title="Welcome / Tour" />
      <ComingSoon icon={Compass} label="Welcome / Tour" />
    </>
  )
}
