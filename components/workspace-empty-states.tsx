"use client"

import { useState, type FormEvent } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { createProject } from "@/lib/actions/project"
import { StatusMessage } from "@/components/status-message"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function NoProjectsState() {
  const router = useRouter()
  const [name, setName] = useState("")
  const [environment, setEnvironment] = useState("UAT")
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setError(null)
    setLoading(true)
    const result = await createProject({ name, environment })
    setLoading(false)

    if (result.error) {
      setError(result.error)
      return
    }

    toast.success("Project created")
    router.refresh()
  }

  return (
    <StatusMessage
      title="Create your first project"
      description="Projects keep each environment's authorities and configuration separate. Create one to get started."
    >
      <form onSubmit={handleSubmit} className="flex w-full max-w-sm flex-col gap-4 text-left">
        <div className="flex flex-col gap-2">
          <Label htmlFor="project-name">Project name</Label>
          <Input
            id="project-name"
            required
            maxLength={60}
            placeholder="e.g. Embraport"
            autoComplete="off"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="project-environment">Environment</Label>
          <Select value={environment} onValueChange={setEnvironment}>
            <SelectTrigger id="project-environment" className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="UAT">UAT</SelectItem>
              <SelectItem value="PROD">PROD</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {error && (
          <p role="alert" className="text-sm text-destructive">
            {error}
          </p>
        )}

        <Button type="submit" disabled={loading} className="w-full">
          {loading ? "Creating..." : "Create project"}
        </Button>
      </form>
    </StatusMessage>
  )
}

export function ProjectsLoadError() {
  const router = useRouter()

  return (
    <StatusMessage
      title="Couldn't load your projects"
      description="Something went wrong while loading them. Try again. If it keeps happening, check your connection or contact support."
    >
      <Button onClick={() => router.refresh()}>Try again</Button>
    </StatusMessage>
  )
}
