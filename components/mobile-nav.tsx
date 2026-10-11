"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"
import { usePathname } from "next/navigation"
import { Menu } from "lucide-react"
import { Sheet, SheetContent, SheetDescription, SheetTitle } from "@/components/ui/sheet"
import { AppSidebar } from "@/components/app-sidebar"
import { cn } from "@/lib/utils"

interface MobileNavContextValue {
  open: boolean
  setOpen: (open: boolean) => void
}

const MobileNavContext = createContext<MobileNavContextValue | null>(null)

function useMobileNav() {
  const ctx = useContext(MobileNavContext)
  if (!ctx) throw new Error("Mobile nav components must be used within a MobileNavProvider")
  return ctx
}

export function MobileNavProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    setOpen(false)
  }, [pathname])

  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 768px)")
    const closeOnDesktop = () => {
      if (desktop.matches) setOpen(false)
    }
    desktop.addEventListener("change", closeOnDesktop)
    return () => desktop.removeEventListener("change", closeOnDesktop)
  }, [])

  return <MobileNavContext.Provider value={{ open, setOpen }}>{children}</MobileNavContext.Provider>
}

export function MobileNavTrigger({ className }: { className?: string }) {
  const { open, setOpen } = useMobileNav()

  return (
    <button
      type="button"
      onClick={() => setOpen(true)}
      aria-label="Open navigation"
      aria-expanded={open}
      className={cn("rounded-lg p-2 text-muted-foreground hover:bg-secondary hover:text-foreground md:hidden", className)}
    >
      <Menu className="h-5 w-5" />
    </button>
  )
}

export function MobileNavDrawer() {
  const { open, setOpen } = useMobileNav()

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent
        side="left"
        className="w-72 max-w-[85vw] gap-0 p-0 sm:max-w-[85vw] md:hidden"
        onOpenAutoFocus={(e) => {
          // Don't focus the search box on open: on phones that pops the keyboard before the user has chosen to search.
          e.preventDefault()
          ;(e.currentTarget as HTMLElement).focus()
        }}
      >
        <div className="flex h-12 shrink-0 items-center border-b border-border px-4">
          <SheetTitle className="text-sm font-medium tracking-tight">Navigation</SheetTitle>
          <SheetDescription className="sr-only">Browse modules and tools</SheetDescription>
        </div>
        <AppSidebar className="min-h-0 w-full flex-1 border-r-0" />
      </SheetContent>
    </Sheet>
  )
}
