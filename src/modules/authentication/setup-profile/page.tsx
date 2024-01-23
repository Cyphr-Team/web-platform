import { SetupProfileSection } from "./components/setup-profile-section"

export function Component() {
  return (
    <div className="px-4 py-8 relative h-screen items-center justify-center grid lg:grid-cols-1 overflow-y-auto">
      <SetupProfileSection />
    </div>
  )
}
