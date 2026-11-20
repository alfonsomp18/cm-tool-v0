import { pipelineNav } from "@/lib/nav-config"
import { navCurrent } from "@/lib/nav-active"

export type StepState = "done" | "active" | "todo"

/**
 * Where the user is in the numbered pipeline, keyed by step number: earlier steps are "done", the page being
 * viewed (or its parent route) is "active", later steps are "todo".
 *
 * Returns null when the current page isn't one of the numbered steps (Home, the tools, ERP code mapping...),
 * so callers show neutral badges instead of implying progress.
 */
export function stepStates(pathname: string): Map<number, StepState> | null {
  const steps = pipelineNav.filter((item) => item.step != null)
  const activeStep = steps.find((item) => navCurrent(item.href, pathname) !== undefined)?.step
  if (activeStep == null) return null

  return new Map(
    steps.map((item) => {
      const step = item.step as number
      const state: StepState = step < activeStep ? "done" : step === activeStep ? "active" : "todo"
      return [step, state]
    }),
  )
}
