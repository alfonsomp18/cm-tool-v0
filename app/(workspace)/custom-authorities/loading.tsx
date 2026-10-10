import { PageHeader } from "@/components/page-header"
import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <>
      <PageHeader title="Custom Authorities" tabsBasePath="/custom-authorities" />
      <div role="status" aria-label="Loading authorities" className="flex flex-1 flex-col gap-3 overflow-hidden py-4">
        <div className="mx-6 flex items-center gap-3">
          <Skeleton className="h-9 w-64 rounded-lg" />
          <Skeleton className="h-9 w-28 rounded-lg" />
          <Skeleton className="ml-auto h-9 w-40 rounded-lg" />
        </div>
        <div className="mx-6 flex-1 overflow-hidden rounded-xl border border-border bg-card">
          <div className="border-b border-border bg-secondary px-3 py-3">
            <Skeleton className="h-4 w-full max-w-xl" />
          </div>
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="flex items-center gap-4 border-t border-border px-3 py-3 first:border-t-0">
              <Skeleton className="h-4 w-4" />
              <Skeleton className="h-4 w-48" />
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-20" />
              <Skeleton className="ml-auto h-5 w-16 rounded-full" />
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
