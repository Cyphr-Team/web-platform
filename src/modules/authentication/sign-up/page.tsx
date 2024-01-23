import { SignUpCustomerFeedback } from "./components/sign-up-customer-feedback"
import { SignUpFormSection } from "./components/sign-up-form-section"

export function Component() {
  return (
    <div className="px-4 py-8 lg:p-0 relative h-screen items-center justify-center grid lg:grid-cols-2 overflow-y-auto">
      <SignUpFormSection />
      <SignUpCustomerFeedback />
    </div>
  )
}
