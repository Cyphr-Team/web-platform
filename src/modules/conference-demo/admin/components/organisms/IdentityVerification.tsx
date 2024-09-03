import {
  KycGovernmentId,
  KycInsights,
  KycSelfieVerification,
  KycSummary
} from "@/modules/conference-demo/admin/components/molecules"

const IdentityVerification = () => {
  return (
    <div className="lg:flex gap-3xl w-full">
      <KycInsights />
      <div className="flex flex-col w-full gap-6">
        <KycSummary />
        <KycGovernmentId />
        <KycSelfieVerification />
      </div>
    </div>
  )
}

export default IdentityVerification
