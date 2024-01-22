import { SetupPasswordSection } from "./components/setup-password-section"

export function Component() {
  return (
    <div className="relative h-screen md:grid lg:max-w-none lg:grid-cols-1 lg:px-0 overflow-y-auto">
      <SetupPasswordSection />
    </div>
  )
}
