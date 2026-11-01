import type { Metadata } from "next"
import type { ReactNode } from "react"

// The reset page is a client component, so its title has to come from a server layout.
export const metadata: Metadata = { title: "Reset password" }

export default function ResetPasswordLayout({ children }: { children: ReactNode }) {
  return children
}
