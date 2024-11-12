import { LoginFormSection } from "./components/login-form-section"

export function Component() {
  return (
    <div className="relative grid h-screen items-start justify-center overflow-y-auto px-4 py-8 sm:top-[50px] lg:grid-cols-1 2xl:top-40">
      <LoginFormSection />
    </div>
  )
}
