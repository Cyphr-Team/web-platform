import { Separator } from "@/components/ui/separator"
import { UNKNOWN_VALUE } from "@/modules/loan-application-management/constants"

import { formatPhoneNumberIntl, Value } from "react-phone-number-input"
import { useLoanApplicationDetailContext } from "../../../providers/LoanApplicationDetailProvider"
import { InformationRow } from "../../molecules/InformationRow"

export const BusinessInfoSummary = () => {
  const { loanSummary } = useLoanApplicationDetailContext()
  const businessInfo = loanSummary?.businessInfo
  const personalInfo = loanSummary?.personalInfo

  return (
    <>
      <InformationRow
        label="Legal Name"
        value={businessInfo?.businessName?.value ?? UNKNOWN_VALUE}
        status={businessInfo?.businessName?.verification?.status}
        subLabel={businessInfo?.businessName?.verification?.subLabel}
      />
      <Separator />
      <InformationRow
        label="Date of Incorporation"
        value={businessInfo?.formation?.value ?? UNKNOWN_VALUE}
      />
      <Separator />
      <InformationRow
        label="Officer Address"
        value={businessInfo?.officeAddresses?.value ?? UNKNOWN_VALUE}
        status={businessInfo?.officeAddresses?.verification?.status}
        subLabel={businessInfo?.officeAddresses?.verification?.subLabel}
      />
      <Separator />
      <InformationRow
        label="Tax ID"
        value={businessInfo?.tin?.value ?? UNKNOWN_VALUE}
        status={businessInfo?.tin?.verification?.status}
        subLabel={businessInfo?.tin?.verification?.subLabel}
      />
      <Separator />
      <InformationRow
        label="Phone number"
        value={formatPhoneNumberIntl(
          (personalInfo?.phoneNumber ?? "") as Value
        )}
      />
    </>
  )
}
