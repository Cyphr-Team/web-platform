import { ForgotPasswordSection } from "./components/forgot-password-section"

export default function ForgotPasswordPage() {
  return (
    <div className="relative h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-1 lg:px-0">
      <ForgotPasswordSection />
    </div>
  )
}
