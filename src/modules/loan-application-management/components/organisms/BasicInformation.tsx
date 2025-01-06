import { useLoanApplicationDetailContext } from "../../providers/LoanApplicationDetailProvider"
import { Skeleton } from "@/components/ui/skeleton"
import { toCurrency } from "@/utils"
import { Badge } from "@/components/ui/badge"
import { ChangeApplicationStatusButton } from "../atoms/ChangeApplicationStatusButton"
import {
  type UseOfLoan,
  type UserMicroLoanApplication
} from "@/types/loan-application.type.ts"
import {
  adaptFormV2Metadata,
  findSingularFormMetadata
} from "@/modules/loan-application/services/formv2.services.ts"
import { loanRequestSchemasByInstitution } from "@/modules/loan-application/constants/form-v2.ts"
import { FORM_TYPE } from "@/modules/loan-application/models/LoanApplicationStep/type.ts"
import { type ILoanRequestFormValue } from "@/modules/loan-application/constants/form.ts"
import { type ApplicationSummary } from "@/modules/loan-application-management/constants/types/loan-summary.type.ts"
import {
  isCapitalCollab,
  isKccBank,
  isLaunchKC,
  isLoanReady,
  isSbb
} from "@/utils/domain.utils"
import {
  isEnableFormV2,
  isEnableLoanReadyV2
} from "@/utils/feature-flag.utils.ts"
import { Breadcrumbs } from "@/shared/molecules/Breadcrumbs"
import { useBreadcrumb } from "@/hooks/useBreadcrumb"
import { CustomLabelKey } from "@/utils/crumb.utils"
import { getUseOfLoan } from "@/modules/loan-application-management/services"
import { useMemo } from "react"
import { CCChangeApplicationStatusButton } from "@/modules/loan-application/capital-collab/components/molecules/CCChangeApplicationStatusButton.tsx"

function BasicInformationSkeleton() {
  return (
    <div className="flex w-full gap-3xl px-4xl">
      <Skeleton className="h-8 w-96" />
    </div>
  )
}

interface LoanRequestInfo {
  loanAmount?: number
  proposeUseOfLoan?: UseOfLoan
}

const useLoanRequestInfo = (
  isLoading: boolean,
  isFetchingSummary: boolean,
  applicationSummary?: ApplicationSummary,
  loanApplicationDetails?: UserMicroLoanApplication
): LoanRequestInfo => {
  return useMemo(() => {
    if (isLoading || isFetchingSummary) {
      return { loanAmount: undefined, proposeUseOfLoan: undefined }
    }

    const isFormV2Enabled = isEnableFormV2() && !isLaunchKC() && !isSbb()

    const loanRequestForm = isFormV2Enabled
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

    const loanAmount = isFormV2Enabled
      ? loanRequestForm?.loanAmount
      : loanApplicationDetails?.loanAmount

    const proposeUseOfLoan = (
      isFormV2Enabled
        ? loanRequestForm?.proposeUseOfLoan
        : loanApplicationDetails?.proposeUseOfLoan
    ) as UseOfLoan

    return { loanAmount, proposeUseOfLoan }
  }, [isLoading, isFetchingSummary, applicationSummary, loanApplicationDetails])
}

export function BasicInformation() {
  const {
    isLoading,
    isFetchingSummary,
    loanKybDetail,
    loanApplicationDetails,
    loanSummary,
    applicationSummary
  } = useLoanApplicationDetailContext()

  const businessName =
    loanKybDetail?.businessDetails?.name?.value ??
    loanSummary?.kybForm?.businessLegalName ??
    "---"

  const breadcrumbs = useBreadcrumb({
    customLabel: {
      [CustomLabelKey.loanApplicationDetail]: businessName
    },
    ids: {
      [CustomLabelKey.loanApplicationDetail]: loanApplicationDetails?.id ?? ""
    }
  })

  const { loanAmount, proposeUseOfLoan } = useLoanRequestInfo(
    isLoading,
    isFetchingSummary,
    applicationSummary,
    loanApplicationDetails
  )

  if (isLoading || isFetchingSummary) return <BasicInformationSkeleton />

  const renderApplicationStatusButton = () => {
    if (isCapitalCollab()) {
      return <CCChangeApplicationStatusButton />
    } else {
      return <ChangeApplicationStatusButton />
    }
  }

  return (
    <>
      {isLoanReady() && isEnableLoanReadyV2() && (
        <div className="ml-4xl">
          <Breadcrumbs breads={breadcrumbs} className="px-0" />
        </div>
      )}
      <div className="flex w-full flex-1 flex-wrap items-center justify-between gap-2 px-4xl lg:gap-4">
        <div className="flex flex-1 flex-wrap items-center gap-2 lg:gap-4">
          <h1 className="whitespace-nowrap text-3xl font-semibold">
            {isSbb() || isLaunchKC()
              ? businessName
              : [businessName, toCurrency(loanAmount, 0)]
                  .filter((v) => !!v)
                  .join(" • ")}
          </h1>
          {!isKccBank() && !isLaunchKC() && !isSbb() && !isCapitalCollab() && (
            <div className="flex flex-wrap gap-2">
              <Badge className="h-7 border px-lg py-xs">
                <p className="text-sm font-medium">
                  {getUseOfLoan(proposeUseOfLoan)}
                </p>
              </Badge>
            </div>
          )}
        </div>
        {renderApplicationStatusButton()}
      </div>
    </>
  )
}
