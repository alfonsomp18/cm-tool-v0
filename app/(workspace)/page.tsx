import { PageHeader } from "@/components/page-header"
import { HomeTile } from "@/components/home-tile"
import { pipelineNav, toolsNav, type NavItem } from "@/lib/nav-config"

function byImplementedFirst(items: NavItem[]) {
  return [...items].sort((a, b) => Number(!!b.implemented) - Number(!!a.implemented))
}

function TileSection({ title, items }: { title: string; items: NavItem[] }) {
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
          <TileSection title="Project Pipeline" items={byImplementedFirst(pipelineNav)} />
          <TileSection title="Tools" items={byImplementedFirst(toolsNav)} />
        </div>
      </div>
    </>
  )
}
