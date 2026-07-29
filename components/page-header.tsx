export function PageHeader({ title }: { title: string }) {
  return (
    <div className="flex items-center gap-2 border-b border-border bg-card px-6 py-4">
      <h1 className="text-xl font-bold text-foreground">{title}</h1>
    </div>
  )
}
