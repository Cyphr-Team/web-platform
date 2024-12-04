import { Card } from "@/components/ui/card"
import { useLoanApplicationDetailContext } from "@/modules/loan-application-management/providers/LoanApplicationDetailProvider"
import { toCurrency } from "@/utils"
import { InformationRow } from "../../../atoms/InformationRow"
import { formatPhoneNumberIntl } from "react-phone-number-input"
import { formatBusinessStreetAddress } from "@/modules/loan-application/constants"
import { isEnableFormV2 } from "@/utils/feature-flag.utils.ts"
import { getUseOfLoan } from "@/modules/loan-application-management/services"
import { type UseOfLoan } from "@/types/loan-application.type.ts"
import {
  adaptFormV2Metadata,
  findSingularFormMetadata
} from "@/modules/loan-application/services/formv2.services.ts"
import type { ILoanRequestFormValue } from "@/modules/loan-application/constants/form.ts"
import { loanRequestSchemasByInstitution } from "@/modules/loan-application/constants/form-v2.ts"
import { FORM_TYPE } from "@/modules/loan-application/models/LoanApplicationStep/type.ts"
import { Skeleton } from "@/components/ui/skeleton.tsx"

function BaseApplicationOverviewSkeleton() {
  return (
    <div className="flex w-full gap-3xl px-4xl">
      <Skeleton className="h-8 w-96" />
    </div>
  )
}

export function BaseApplicationOverview() {
  const {
    isLoading,
    isFetchingSummary,
    loanSummary,
    applicationSummary,
    loanApplicationDetails
  } = useLoanApplicationDetailContext()

  if (isLoading || isFetchingSummary) return <BaseApplicationOverviewSkeleton />

  const businessInfo = loanSummary?.businessInfo
  const personalInfo = loanSummary?.personalInfo

  const loanRequestForm = isEnableFormV2()
    ? adaptFormV2Metadata<ILoanRequestFormValue>({
        schema: loanRequestSchemasByInstitution(),
        metadata: findSingularFormMetadata(
          FORM_TYPE.LOAN_REQUEST,
          applicationSummary
        ),
        additionalFields: {
          applicationId: applicationSummary?.applicationId
        }
      })
    : undefined

  const loanAmount = isEnableFormV2()
    ? loanRequestForm?.loanAmount
    : loanApplicationDetails?.loanAmount

  const proposeUseOfLoan = isEnableFormV2()
    ? loanRequestForm?.proposeUseOfLoan
    : loanSummary?.proposeUseOfLoan

  // Business Name and Address fetched from Middesk (post-verification) or from KYB form (pre-verification).
  // If KYB form has not yet been submitted, return "N/A"
  const getBusinessName = () => {
    if (businessInfo?.businessName?.verification) {
      return businessInfo?.businessName?.value ?? "N/A"
    }

    return loanSummary?.kybForm?.businessLegalName ?? "N/A"
  }

  const getBusinessAddress = () => {
    if (businessInfo?.businessName?.verification) {
      return loanSummary?.businessInfo?.officeAddresses?.value ?? "N/A"
    }

    return loanSummary?.kybForm?.businessStreetAddress
      ? formatBusinessStreetAddress(loanSummary?.kybForm?.businessStreetAddress)
      : "N/A"
  }

  return (
    <Card className="border-b-0 border-r-0 bg-white shadow-none">
      <div className="grid grid-cols-2">
        <InformationRow
          className="rounded-tl-md"
          label="Business name"
          value={getBusinessName()}
        />
        <InformationRow
          className="rounded-tr-md"
          label="Business owner"
          value={personalInfo?.name ?? "N/A"}
        />
        <InformationRow
          label="Loan program"
          value={loanApplicationDetails?.loanProgram?.name ?? "N/A"}
        />
        <InformationRow
          label="Email address"
          value={personalInfo?.email ?? "N/A"}
        />
        <InformationRow
          label="Amount requested"
          value={toCurrency(loanAmount, 0) ?? "$-"}
        />
        <InformationRow
          label="Phone number"
          value={
            formatPhoneNumberIntl(personalInfo?.phoneNumber ?? "") || "N/A"
          }
        />
        <InformationRow
          className="rounded-bl-md"
          label="Proposed use of loan"
          value={getUseOfLoan(proposeUseOfLoan as UseOfLoan) || "N/A"}
        />
        <InformationRow
          className="rounded-br-md"
          label="Office address"
          value={getBusinessAddress()}
        />
      </div>
    </Card>
  )
}
