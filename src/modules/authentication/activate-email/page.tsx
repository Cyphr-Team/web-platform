import { ActivateEmailSection } from "./components/activate-email-section"

export default function ActivateEmailPage() {
  return (
    <div className="relative h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-1 lg:px-0 overflow-y-auto">
      <ActivateEmailSection />
    </div>
  )
}
