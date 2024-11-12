import { GovernmentIdVerification } from "../../../loan-application/components/organisms/identity-verification/GovernmentIdVerification"
import { IdentificationSummary } from "../../../loan-application/components/organisms/identity-verification/IdentityVerificationSummary"
import { Insights } from "../../../loan-application/components/organisms/identity-verification/Insights"
import { SelfieVerification } from "../../../loan-application/components/organisms/identity-verification/SelfieVerification"

export function Component() {
  return (
    <div className="w-full gap-3xl lg:flex">
      <Insights />
      <div className="w-full space-y-6">
        <IdentificationSummary />
        <GovernmentIdVerification />
        <SelfieVerification />
      </div>
    </div>
  )
}
