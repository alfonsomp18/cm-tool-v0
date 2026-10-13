"use client"

import { useEffect, useState, type FormEvent } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { AuthCard } from "@/components/auth-card"
import { PasswordInput } from "@/components/password-input"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

type Mode = "sign-in" | "sign-up" | "forgot"

const copy: Record<Mode, { title: string; description: string; submit: string }> = {
  "sign-in": { title: "Sign in", description: "Welcome back.", submit: "Sign in" },
  "sign-up": { title: "Create an account", description: "Get started with your own project.", submit: "Create account" },
  forgot: {
    title: "Reset your password",
    description: "Enter your email and we'll send you a link to choose a new password.",
    submit: "Send reset link",
  },
}

export default function LoginPage() {
  const router = useRouter()
  const [mode, setMode] = useState<Mode>("sign-in")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [info, setInfo] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const confirmError = params.get("error")
    if (confirmError) {
      setError(confirmError)
      window.history.replaceState(null, "", window.location.pathname)
    }
  }, [])

  function switchMode(next: Mode) {
    setMode(next)
    setError(null)
    setInfo(null)
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setError(null)
    setInfo(null)
    setLoading(true)
    const supabase = createClient()

    if (mode === "forgot") {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/confirm?next=/reset-password`,
      })
      setLoading(false)
      if (error) {
        setError(error.message)
        return
      }
      // Same message whether or not the account exists, so this can't be used to probe for emails.
      setInfo("If an account exists for that email, a reset link is on its way. Check your inbox.")
      return
    }

    if (mode === "sign-in") {
      const { error } = await supabase.auth.signInWithPassword({ email, password })
      setLoading(false)
      if (error) {
        setError(error.message)
        return
      }
      router.push("/")
      router.refresh()
      return
    }

    const { data, error } = await supabase.auth.signUp({ email, password })
    setLoading(false)
    if (error) {
      setError(error.message)
      return
    }
    if (data.session) {
      router.push("/")
      router.refresh()
      return
    }
    setInfo("Account created. Check your email to confirm, then sign in.")
    setMode("sign-in")
  }

  return (
    <AuthCard title={copy[mode].title} description={copy[mode].description}>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {mode !== "forgot" && (
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Password</Label>
              {mode === "sign-in" && (
                <Button
                  type="button"
                  variant="link"
                  onClick={() => switchMode("forgot")}
                  className="h-auto p-0 text-xs font-normal text-muted-foreground hover:text-foreground"
                >
                  Forgot password?
                </Button>
              )}
            </div>
            <PasswordInput
              id="password"
              autoComplete={mode === "sign-in" ? "current-password" : "new-password"}
              required
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        )}

        {error && (
          <p role="alert" className="text-sm text-destructive">
            {error}
          </p>
        )}
        {info && (
          <p role="status" className="text-sm text-success">
            {info}
          </p>
        )}

        <Button type="submit" disabled={loading} className="w-full">
          {loading ? "Please wait..." : copy[mode].submit}
        </Button>
      </form>

      <Button
        type="button"
        variant="link"
        onClick={() => switchMode(mode === "sign-in" ? "sign-up" : "sign-in")}
        className="mt-4 h-auto p-0 text-xs font-normal text-muted-foreground hover:text-foreground"
      >
        {mode === "sign-in"
          ? "Don't have an account? Create one"
          : mode === "sign-up"
            ? "Already have an account? Sign in"
            : "Back to sign in"}
      </Button>
    </AuthCard>
  )
}
