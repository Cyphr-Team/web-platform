import { SignUpFormSection } from "./components/sign-up-form-section"

export function Component() {
  return (
    <div className="px-4 py-8 relative h-screen items-start top-[50px] justify-center grid lg:grid-cols-1 overflow-y-auto">
      <SignUpFormSection />
    </div>
  )
}
