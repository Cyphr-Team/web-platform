import { GovernmentIdVerification } from "../../../loan-application/components/organisms/identity-verification/GovernmentIdVerification"
import { IdentificationSummary } from "../../../loan-application/components/organisms/identity-verification/IdentityVerificationSummary"
import { Insights } from "../../../loan-application/components/organisms/identity-verification/Insights"
import { SelfieVerification } from "../../../loan-application/components/organisms/identity-verification/SelfieVerification"

export const Component = () => {
  return (
    <div className="lg:flex gap-3xl w-full">
      <Insights />
      <div className="space-y-6 w-full">
        <IdentificationSummary />
        <GovernmentIdVerification />
        <SelfieVerification />
      </div>
    </div>
  )
}
