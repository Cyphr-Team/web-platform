import { BgGradient } from "@/shared/atoms/bg-gradient"
import { SetupProfileSection } from "./components/setup-profile-section"

export function Component() {
  return (
    // On mobile version we need more spacing between header and main content
    <div className="relative grid h-dvh justify-center overflow-y-auto px-4 pb-8 md:items-start md:py-8 md:pt-16 lg:grid-cols-1 ">
      <SetupProfileSection />
      <BgGradient />
    </div>
  )
}
