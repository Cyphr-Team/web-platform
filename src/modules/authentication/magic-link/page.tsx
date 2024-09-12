import { MagicLinkSection } from "./components/magic-link-section"

export function Component() {
  return (
    <div className="px-4 py-8 relative h-screen items-start top-[50px] 2xl:top-40 justify-center grid lg:grid-cols-1 overflow-y-auto">
      <MagicLinkSection />
    </div>
  )
}
