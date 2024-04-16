import { SetupProfileSection } from "./components/setup-profile-section"

export function Component() {
  return (
    // On mobile version we need more spacing between header and main content
    <div className="px-4 pt-16 pb-8 md:py-8 relative h-dvh items-center justify-center grid lg:grid-cols-1 overflow-y-auto">
      <SetupProfileSection />
    </div>
  )
}
