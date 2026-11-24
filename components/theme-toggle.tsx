"use client"

import { useEffect, useState } from "react"
import { useTheme } from "next-themes"
import { Monitor, Moon, Sun } from "lucide-react"
import { cn } from "@/lib/utils"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const choices = [
  { value: "system", label: "System", icon: Monitor },
  { value: "light", label: "Light", icon: Sun },
  { value: "dark", label: "Dark", icon: Moon },
] as const

type Choice = (typeof choices)[number]["value"]

// A three-way choice instead of a sun/moon flip: the flip sets an explicit theme on the first click, so there
// was no way back to "follow my operating system".
export function ThemeToggle({ className }: { className?: string }) {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  // Before mount the stored choice isn't known (the server can't see it), so render a neutral button.
  const current = choices.find((c) => c.value === (theme ?? "system")) ?? choices[0]
  const Icon = current.icon
  const label = mounted ? `Theme: ${current.label}` : "Theme"

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          aria-label={label}
          title={label}
          className={cn(
            "inline-flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground hover:bg-secondary hover:text-foreground focus-ring",
            className,
          )}
        >
          {mounted ? <Icon className="h-4 w-4" /> : <span className="block h-4 w-4" />}
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-36">
        <DropdownMenuRadioGroup value={current.value} onValueChange={(v) => setTheme(v as Choice)}>
          {choices.map(({ value, label: itemLabel, icon: ItemIcon }) => (
            <DropdownMenuRadioItem key={value} value={value}>
              <ItemIcon className="h-4 w-4" />
              {itemLabel}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
