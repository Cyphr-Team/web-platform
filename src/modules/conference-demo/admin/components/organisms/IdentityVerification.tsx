import {
  KycGovernmentId,
  KycInsights,
  KycSelfieVerification,
  KycSummary
} from "@/modules/conference-demo/admin/components/molecules"

function IdentityVerification() {
  return (
    <div className="w-full gap-3xl lg:flex">
      <KycInsights />
      <div className="flex w-full flex-col gap-6">
        <KycSummary />
        <KycGovernmentId />
        <KycSelfieVerification />
      </div>
    </div>
  )
}

export default IdentityVerification
