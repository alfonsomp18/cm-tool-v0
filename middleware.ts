import { createServerClient } from "@supabase/ssr"
import { NextResponse, type NextRequest } from "next/server"

export async function middleware(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
          supabaseResponse = NextResponse.next({ request })
          cookiesToSet.forEach(({ name, value, options }) => supabaseResponse.cookies.set(name, value, options))
        },
      },
    },
  )

  const {
    data: { user },
  } = await supabase.auth.getUser()

  const isLoginPage = request.nextUrl.pathname.startsWith("/login")
  const isAuthConfirmRoute = request.nextUrl.pathname.startsWith("/auth/confirm")

  function withSupabaseCookies(response: NextResponse) {
    supabaseResponse.cookies.getAll().forEach((cookie) => response.cookies.set(cookie))
    return response
  }

  if (!user && !isLoginPage && !isAuthConfirmRoute) {
    const url = request.nextUrl.clone()
    url.pathname = "/login"
    return withSupabaseCookies(NextResponse.redirect(url))
  }

  if (user && isLoginPage) {
    const url = request.nextUrl.clone()
    url.pathname = "/"
    return withSupabaseCookies(NextResponse.redirect(url))
  }

  // Forward the verified user so downstream Server Components (e.g. the
  // workspace layout) can trust it via headers() instead of paying for a
  // second auth.getUser() round-trip to re-derive what was just confirmed
  // here. Always overwrite both headers (even to "") so a client-supplied
  // value can never pass through.
  const requestHeaders = new Headers(request.headers)
  requestHeaders.set("x-user-id", user?.id ?? "")
  requestHeaders.set("x-user-email", user?.email ?? "")
  return withSupabaseCookies(NextResponse.next({ request: { headers: requestHeaders } }))
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)"],
}
