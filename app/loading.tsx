import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div role="status" aria-label="Loading" className="flex h-dvh flex-col overflow-hidden bg-background">
      <div className="flex items-center gap-4 border-b border-border bg-card px-4 py-3">
        <Skeleton className="h-8 w-8 rounded-lg" />
        <Skeleton className="h-5 w-64" />
        <div className="ml-auto flex items-center gap-3">
          <Skeleton className="h-8 w-44 rounded-lg" />
          <Skeleton className="h-8 w-32 rounded-lg" />
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        <div className="hidden w-72 shrink-0 flex-col gap-2 border-r border-border bg-card p-3 md:flex">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-8 w-full" />
          ))}
        </div>

        <div className="flex flex-1 flex-col gap-6 p-6">
          <Skeleton className="h-6 w-32" />
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className="h-[74px] rounded-xl" />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
