import type { ReactNode } from "react"
import { Zap } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"

export function AuthCard({
  title,
  description,
  children,
}: {
  title: string
  description: string
  children: ReactNode
}) {
  return (
    <div className="relative flex min-h-screen items-center justify-center bg-background px-4">
      <ThemeToggle className="absolute right-4 top-4" />
      <div className="w-full max-w-sm rounded-xl border border-border bg-card p-6 shadow-sm">
        <div className="mb-6 flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Zap className="h-4 w-4" />
          </div>
          <span className="text-base font-medium tracking-tight text-foreground">End-to-End Certificate Manager tool</span>
        </div>

        <h1 className="mb-1 text-lg font-semibold text-foreground">{title}</h1>
        <p className="mb-5 text-sm text-muted-foreground">{description}</p>

        {children}
      </div>
    </div>
  )
}
