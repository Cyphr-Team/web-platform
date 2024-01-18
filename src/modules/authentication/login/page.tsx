import { LoginAppInsight } from "./components/login-app-insight"
import { LoginFormSection } from "./components/login-form-section"

export default function LoginPage() {
  return (
    <div className="relative h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0 overflow-y-auto">
      <LoginFormSection />
      <LoginAppInsight />
    </div>
  )
}
