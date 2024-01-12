import { SetupPasswordSection } from "./components/setup-password-section"

export default function SetupPasswordPage() {
  return (
    <div className="relative h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-1 lg:px-0">
      <SetupPasswordSection />
    </div>
  )
}
