import { SignUpFormSection } from "./components/sign-up-form-section"

export function Component() {
  return (
    <div className="relative top-[50px] grid h-screen items-start justify-center overflow-y-auto px-4 py-8 lg:grid-cols-1 2xl:top-40">
      <SignUpFormSection />
    </div>
  )
}
