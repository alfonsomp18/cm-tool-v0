import { PageHeader } from "@/components/page-header"
import { HomeTile } from "@/components/home-tile"
import { pipelineNav, toolsNav } from "@/lib/nav-config"

function TileSection({ title, items }: { title: string; items: typeof pipelineNav }) {
  return (
    <div className="flex flex-col gap-3">
      <h2 className="text-sm font-semibold text-foreground">{title}</h2>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {items.map((item) => (
          <HomeTile key={item.label} item={item} />
        ))}
      </div>
    </div>
  )
}

export default function HomePage() {
  return (
    <>
      <PageHeader title="Home" />
      <div className="flex-1 overflow-auto px-6 py-6">
        <div className="flex flex-col gap-8">
          <TileSection title="Project Pipeline" items={pipelineNav} />
          <TileSection title="Tools" items={toolsNav} />
        </div>
      </div>
    </>
  )
}
