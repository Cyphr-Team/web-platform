import { LoginFormSection } from "./components/login-form-section"

export function Component() {
  return (
    <div className="px-4 py-8 lg:p-0 relative h-screen items-center justify-center grid lg:grid-cols-1 overflow-y-auto">
      <LoginFormSection />
    </div>
  )
}
