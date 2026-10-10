import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

export function StatusMessage({
  code,
  title,
  description,
  reference,
  children,
  className,
}: {
  code?: string
  title: string
  description?: string
  reference?: string
  children?: ReactNode
  className?: string
}) {
  return (
    <div className={cn("flex flex-1 flex-col items-center justify-center gap-2 px-6 py-16 text-center", className)}>
      {code && <span className="text-xs font-medium text-muted-foreground">{code}</span>}
      <h1 className="text-xl font-medium tracking-tight text-foreground">{title}</h1>
      {description && <p className="max-w-sm text-sm text-muted-foreground">{description}</p>}
      {children && <div className="mt-4 flex items-center gap-2">{children}</div>}
      {reference && <p className="mt-6 font-mono text-[11px] text-muted-foreground">Reference: {reference}</p>}
    </div>
  )
}
