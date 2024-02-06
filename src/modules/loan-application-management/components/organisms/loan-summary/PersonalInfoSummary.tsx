import { useLoanApplicationDetailContext } from "../../../providers/LoanApplicationDetailProvider"
import { InformationRow } from "../../molecules/InformationRow"
import { Separator } from "@/components/ui/separator"

export const PersonalInfoSummary = () => {
  const { loanKycDetail } = useLoanApplicationDetailContext()

  return (
    <>
      <InformationRow
        label="Name"
        value={loanKycDetail?.personalInfo?.name?.payload}
        isBadge
        badgeText={loanKycDetail?.personalInfo?.name?.status}
      />
      <Separator />
      <InformationRow
        label="Date of Birth"
        value={loanKycDetail?.personalInfo?.dateOfBirth?.payload}
        isBadge
        badgeText={loanKycDetail?.personalInfo?.dateOfBirth?.status}
      />
      <Separator />
      <InformationRow
        label="Residential Address"
        value={loanKycDetail?.personalInfo?.residentialAddress?.payload}
        isBadge
        badgeText={loanKycDetail?.personalInfo?.residentialAddress?.status}
      />
      <Separator />
      <InformationRow
        label="Email Address"
        value={loanKycDetail?.personalInfo?.email?.payload}
        isBadge
        badgeText={loanKycDetail?.personalInfo?.email?.status}
      />
    </>
  )
}
