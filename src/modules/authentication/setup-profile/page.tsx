import { SetupProfileSection } from "./components/setup-profile-section"

export function Component() {
  return (
    // On mobile version we need more spacing between header and main content
    <div className="px-4 md:pt-16 pb-8 md:py-8 relative h-dvh md:items-start justify-center grid lg:grid-cols-1 overflow-y-auto bg-gradient-to-t from-[#b3f00d] to-50% to-white">
      <SetupProfileSection />
    </div>
  )
}
