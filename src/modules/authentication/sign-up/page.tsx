import { SignUpFormSection } from "./components/sign-up-form-section"

export function Component() {
  return (
    <div className="relative grid h-screen items-center justify-center  overflow-y-auto px-4 py-8 lg:grid-cols-1">
      <SignUpFormSection />
    </div>
  )
}
