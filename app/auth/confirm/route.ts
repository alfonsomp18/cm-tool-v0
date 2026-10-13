import { type EmailOtpType } from "@supabase/supabase-js"
import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const token_hash = searchParams.get("token_hash")
  const type = searchParams.get("type") as EmailOtpType | null
  const code = searchParams.get("code")
  const requestedNext = searchParams.get("next") ?? "/"
  // Only local paths: this value comes from the URL, so never redirect off-site with it.
  const next = requestedNext.startsWith("/") && !requestedNext.startsWith("//") ? requestedNext : "/"

  const redirectTo = request.nextUrl.clone()
  redirectTo.pathname = next
  redirectTo.search = ""

  const supabase = await createClient()

  // Email-template links: {{ .SiteURL }}/auth/confirm?token_hash=...&type=...
  if (token_hash && type) {
    const { error } = await supabase.auth.verifyOtp({ type, token_hash })
    if (!error) {
      return NextResponse.redirect(redirectTo)
    }
  }

  // Default Supabase links (e.g. password reset) bounce through Supabase and return with a PKCE ?code=.
  if (code) {
    const { error } = await supabase.auth.exchangeCodeForSession(code)
    if (!error) {
      return NextResponse.redirect(redirectTo)
    }
  }

  const errorRedirect = request.nextUrl.clone()
  errorRedirect.pathname = "/login"
  errorRedirect.search = ""
  errorRedirect.searchParams.set("error", "This link is invalid or has expired.")
  return NextResponse.redirect(errorRedirect)
}
