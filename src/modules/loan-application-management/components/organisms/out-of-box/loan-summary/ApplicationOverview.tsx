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
  findSingularFormMetadata,
  preFormatBusinessInformationForm,
  preFormatOwnerInformationForm
} from "@/modules/loan-application/services/formv2.services.ts"
import type {
  IBusinessFormValue,
  ILoanRequestFormValue
} from "@/modules/loan-application/constants/form.ts"
import { loanRequestSchemasByInstitution } from "@/modules/loan-application/constants/form-v2.ts"
import { FORM_TYPE } from "@/modules/loan-application/models/LoanApplicationStep/type.ts"
import { Skeleton } from "@/components/ui/skeleton.tsx"
import { useMemo } from "react"
import { get } from "lodash"
import { businessFormSchema } from "@/modules/loan-application/constants/form.kyb.ts"
import {
  ownerFormSchema,
  type OwnerFormValue
} from "@/modules/loan-application/constants/form.kyc.ts"

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

  const isEnabledFormV2 = isEnableFormV2()
  const summaryToUse = isEnabledFormV2 ? applicationSummary : loanSummary

  const loanRequestForm = isEnabledFormV2
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

  const loanAmount = isEnabledFormV2
    ? loanRequestForm?.loanAmount
    : loanApplicationDetails?.loanAmount

  const proposeUseOfLoan = isEnabledFormV2
    ? loanRequestForm?.proposeUseOfLoan
    : loanSummary?.proposeUseOfLoan

  // Business Name and Address fetched from Middesk (post-verification) or from KYB form (pre-verification).
  // If KYB form has not yet been submitted, return "N/A"
  const kybFormMetadata = isEnabledFormV2
    ? findSingularFormMetadata(FORM_TYPE.KYB, applicationSummary)
    : undefined

  const kybFormV2 = kybFormMetadata
    ? adaptFormV2Metadata<IBusinessFormValue>({
        schema: businessFormSchema,
        metadata: kybFormMetadata,
        preFormat: () => preFormatBusinessInformationForm(kybFormMetadata),
        additionalFields: {
          id: get(kybFormMetadata, "forms[0].id", "")
        }
      })
    : undefined

  const businessName = useMemo(() => {
    if (!isEnabledFormV2)
      return (
        summaryToUse?.businessInfo?.businessName?.value ??
        get(summaryToUse, "kybForm.businessLegalName", "N/A")
      )

    return (
      summaryToUse?.businessInfo?.businessName?.value ??
      kybFormV2?.businessLegalName
    )
  }, [isEnabledFormV2, summaryToUse, kybFormV2])

  const businessAddress = useMemo(() => {
    if (!isEnabledFormV2)
      return (
        summaryToUse?.businessInfo?.officeAddresses?.value ??
        formatBusinessStreetAddress(
          get(summaryToUse, "kybForm.businessStreetAddress", undefined)
        )
      )

    return (
      summaryToUse?.businessInfo?.officeAddresses?.value ??
      formatBusinessStreetAddress({
        addressLine1: kybFormV2?.addressLine1 ?? "",
        addressLine2: kybFormV2?.addressLine2 ?? "",
        city: kybFormV2?.city ?? "",
        state: kybFormV2?.state ?? "",
        postalCode: kybFormV2?.postalCode ?? ""
      })
    )
  }, [isEnabledFormV2, summaryToUse, kybFormV2])

  const { businessOwnerName, businessOwnerEmail, businessOwnerPhone } =
    useMemo(() => {
      if (!isEnabledFormV2)
        return {
          businessOwnerName: get(summaryToUse, "personalInfo.name", undefined),
          businessOwnerEmail: get(
            summaryToUse,
            "personalInfo.email",
            undefined
          ),
          businessOwnerPhone: get(
            summaryToUse,
            "personalInfo.phoneNumber",
            undefined
          )
        }

      const kycFormMetadata = findSingularFormMetadata(
        FORM_TYPE.KYC,
        applicationSummary
      )

      const kycFormData = adaptFormV2Metadata<OwnerFormValue>({
        schema: ownerFormSchema,
        metadata: kycFormMetadata,
        preFormat: () => preFormatOwnerInformationForm(kycFormMetadata)
      })

      return {
        businessOwnerName: kycFormData.fullName,
        businessOwnerEmail: kycFormData.email,
        businessOwnerPhone: kycFormData.phoneNumber
      }
    }, [isEnabledFormV2, summaryToUse, applicationSummary])

  if (isLoading || isFetchingSummary) return <BaseApplicationOverviewSkeleton />

  return (
    <Card className="border-b-0 border-r-0 bg-white shadow-none">
      <div className="grid grid-cols-2">
        <InformationRow
          className="rounded-tl-md"
          label="Business name"
          value={businessName ?? "N/A"}
        />
        <InformationRow
          className="rounded-tr-md"
          label="Business owner"
          value={businessOwnerName ?? "N/A"}
        />
        <InformationRow
          label="Loan program"
          value={loanApplicationDetails?.loanProgram?.name ?? "N/A"}
        />
        <InformationRow
          label="Email address"
          value={businessOwnerEmail ?? "N/A"}
        />
        <InformationRow
          label="Amount requested"
          value={toCurrency(loanAmount, 0) ?? "$-"}
        />
        <InformationRow
          label="Phone number"
          value={formatPhoneNumberIntl(businessOwnerPhone ?? "") || "N/A"}
        />
        <InformationRow
          className="rounded-bl-md"
          label="Proposed use of loan"
          value={getUseOfLoan(proposeUseOfLoan as UseOfLoan) || "N/A"}
        />
        <InformationRow
          className="rounded-br-md"
          label="Office address"
          value={businessAddress}
        />
      </div>
    </Card>
  )
}
