import { Separator } from "@/components/ui/separator"
import { UNKNOWN_VALUE } from "@/modules/loan-application-management/constants"

import { formatPhoneNumberIntl, type Value } from "react-phone-number-input"
import { useLoanApplicationDetailContext } from "../../../providers/LoanApplicationDetailProvider"
import { InformationRow } from "../../molecules/InformationRow"

export function BusinessInfoSummary() {
  const { loanSummary } = useLoanApplicationDetailContext()
  const businessInfo = loanSummary?.businessInfo
  const personalInfo = loanSummary?.personalInfo

  return (
    <>
      <InformationRow
        label="Legal Name"
        status={businessInfo?.businessName?.verification?.status}
        subLabel={businessInfo?.businessName?.verification?.subLabel}
        value={businessInfo?.businessName?.value ?? UNKNOWN_VALUE}
      />
      <Separator />
      <InformationRow
        label="Date of Incorporation"
        value={businessInfo?.formation?.value ?? UNKNOWN_VALUE}
      />
      <Separator />
      <InformationRow
        label="Officer Address"
        status={businessInfo?.officeAddresses?.verification?.status}
        subLabel={businessInfo?.officeAddresses?.verification?.subLabel}
        value={businessInfo?.officeAddresses?.value ?? UNKNOWN_VALUE}
      />
      <Separator />
      <InformationRow
        label="Tax ID"
        status={businessInfo?.tin?.verification?.status}
        subLabel={businessInfo?.tin?.verification?.subLabel}
        value={businessInfo?.tin?.value ?? UNKNOWN_VALUE}
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
