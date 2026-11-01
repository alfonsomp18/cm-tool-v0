import type { Metadata } from "next"
import type { ReactNode } from "react"

// The login page is a client component, so its title has to come from a server layout.
export const metadata: Metadata = { title: "Sign in" }

export default function LoginLayout({ children }: { children: ReactNode }) {
  return children
}
