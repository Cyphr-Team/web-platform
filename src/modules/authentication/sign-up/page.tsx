import { SignUpCustomerFeedback } from "./components/sign-up-customer-feedback"
import { SignUpFormSection } from "./components/sign-up-form-section"

export default function SignUpPage() {
  return (
    <div className="relative h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0 overflow-y-auto">
      <SignUpFormSection />
      <SignUpCustomerFeedback />
    </div>
  )
}
