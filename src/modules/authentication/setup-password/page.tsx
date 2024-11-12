import { SetupPasswordSection } from "./components/setup-password-section"

export function Component() {
  return (
    <div className="relative grid h-screen items-start justify-center overflow-y-auto px-4 py-8 lg:grid-cols-1">
      <SetupPasswordSection />
    </div>
  )
}
