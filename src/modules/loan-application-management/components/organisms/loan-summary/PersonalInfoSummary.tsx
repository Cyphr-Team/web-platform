import { UNKNOWN_VALUE } from "@/modules/loan-application-management/constants"
import { useLoanApplicationDetailContext } from "../../../providers/LoanApplicationDetailProvider"
import { InformationRow } from "../../molecules/InformationRow"
import { Separator } from "@/components/ui/separator"

export const PersonalInfoSummary = () => {
  const { loanSummary } = useLoanApplicationDetailContext()
  const personalInfo = loanSummary?.personalInfo

  return (
    <>
      <InformationRow
        label="Name"
        value={personalInfo?.name?.payload ?? UNKNOWN_VALUE}
        isBadge
        badgeText={personalInfo?.name?.status}
      />
      <Separator />
      <InformationRow
        label="Date of Birth"
        value={personalInfo?.dateOfBirth?.payload ?? UNKNOWN_VALUE}
        isBadge
        badgeText={personalInfo?.dateOfBirth?.status}
      />
      <Separator />
      <InformationRow
        label="Residential Address"
        value={personalInfo?.residentialAddress?.payload ?? UNKNOWN_VALUE}
        isBadge
        badgeText={personalInfo?.residentialAddress?.status}
      />
      <Separator />
      <InformationRow
        label="Email Address"
        value={personalInfo?.email?.payload ?? UNKNOWN_VALUE}
        isBadge
        badgeText={personalInfo?.email?.status}
      />
    </>
  )
}
