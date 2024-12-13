import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { CashflowGlanceReport } from "@/modules/loan-application-management/components/organisms/out-of-box/cash-flow/CashflowGlance"
import { OperatingExpensesFormDetails } from "@/modules/loan-application/components/organisms/loan-application-form/operating-expenses/OperatingExpenseFormDetails"
import { SignatureDetails } from "@/modules/loan-application/components/organisms/loan-application-form/confirmation/SignatureDetails"
import { Bankruptcy } from "@/modules/loan-application/components/organisms/Middesk/Bankruptcy"
import { BusinessDetail } from "@/modules/loan-application/components/organisms/Middesk/BusinessDetail"
import { BusinessName } from "@/modules/loan-application/components/organisms/Middesk/BusinessName"
import { OfficeAddress } from "@/modules/loan-application/components/organisms/Middesk/OfficeAddress"
import { People } from "@/modules/loan-application/components/organisms/Middesk/People"
import { Secretary } from "@/modules/loan-application/components/organisms/Middesk/Secretary"
import { TinMatch } from "@/modules/loan-application/components/organisms/Middesk/TinMatch"
import { WatchList } from "@/modules/loan-application/components/organisms/Middesk/WatchList"
import { concat, get, isEmpty } from "lodash"
import { useRef } from "react"
import { DownloadButton } from "../../components/atoms/DownloadButton"
import { useLoanApplicationDetailContext } from "../../providers/LoanApplicationDetailProvider"
import {
  getBadgeVariantByStatus,
  getDecisionTextByStatus
} from "../../services"
import { CashFlowTable } from "@/modules/loan-application/components/molecules/loan-application-details/CashFlowTable.tsx"
import { IdentityVerificationDetails } from "@/modules/loan-application/components/molecules/loan-application-details/IdentityVerificationDetails.tsx"
import usePermissions from "@/hooks/usePermissions"
import { useQueryGetLoanApplicationDetailStatus } from "../../hooks/useQuery/useQueryGetLoanApplicationDetailStatus"
import { useParams } from "react-router-dom"
import { LoanApplicationStatus } from "@/types/loan-application.type"
import { ApplicationOverview } from "@/modules/loan-application-management/components/organisms/out-of-box/loan-summary"
import { FORM_TYPE } from "@/modules/loan-application/models/LoanApplicationStep/type.ts"
import { CurrentLoanFormDetails } from "@/modules/loan-application/components/organisms/loan-application-form/current-loan/CurrentLoanFormDetails.tsx"
import {
  adaptFormV2Metadata,
  preFormatCurrentLoanForm,
  preFormatLaunchKCOwnerInformationForm
} from "@/modules/loan-application/services/formv2.services.ts"
import {
  type CurrentLoanFormsV2Value,
  currentLoansFormSchema
} from "@/modules/loan-application/components/organisms/loan-application-form/current-loan/CurrentLoanFormV2.tsx"
import {
  type IBusinessFormValue,
  type ILoanRequestFormValue,
  type IOwnerFormValue,
  operatingExpensesFormSchema,
  type OperatingExpensesFormValue
} from "@/modules/loan-application/constants/form.ts"
import { loanRequestSchemasByInstitution } from "@/modules/loan-application/constants/form-v2.ts"
import { businessFormSchema } from "@/modules/loan-application/constants/form.kyb.ts"
import { ownerFormSchema } from "@/modules/loan-application/constants/form.kyc.ts"
import { Skeleton } from "@/components/ui/skeleton.tsx"
import { KycFormDetailsV2 } from "@/modules/loan-application/components/organisms/loan-application-form/kyc/KycFormDetailsV2.tsx"
import { KybFormDetailsV2 } from "@/modules/loan-application/components/organisms/loan-application-form/kyb/KybFormDetailsV2.tsx"

interface OutOfBoxFormSummary {
  [FORM_TYPE.LOAN_REQUEST]: ILoanRequestFormValue
  [FORM_TYPE.CURRENT_LOAN]: CurrentLoanFormsV2Value
  [FORM_TYPE.OPERATING_EXPENSES]: OperatingExpensesFormValue
  [FORM_TYPE.KYB]: IBusinessFormValue
  [FORM_TYPE.KYC]: IOwnerFormValue
}

const OUT_OF_BOX_FORM_TYPES = [
  FORM_TYPE.LOAN_REQUEST,
  FORM_TYPE.CURRENT_LOAN,
  FORM_TYPE.OPERATING_EXPENSES,
  FORM_TYPE.KYB,
  FORM_TYPE.KYC
]

const SummarySkeleton = () => (
  <div className="w-full gap-3xl " id="loan-summary">
    <Skeleton className=" w-full p-2xl my-xl" />
    <Skeleton className=" w-full p-2xl my-xl" />
    <Skeleton className=" w-full p-2xl my-xl" />
    <Skeleton className=" w-full p-2xl my-xl" />
  </div>
)

function formSchemaFromFormType(formType: FORM_TYPE) {
  switch (formType) {
    case FORM_TYPE.LOAN_REQUEST:
      return loanRequestSchemasByInstitution()
    case FORM_TYPE.CURRENT_LOAN:
      return currentLoansFormSchema
    case FORM_TYPE.OPERATING_EXPENSES:
      return operatingExpensesFormSchema
    case FORM_TYPE.KYB:
      return businessFormSchema
    case FORM_TYPE.KYC:
      return ownerFormSchema
    default:
      return null
  }
}

/**
 * This component is currently used as out-of-the-box loan summary.
 * Affected tenants are: Cyphr-Bank, KCChamber.
 */
export function OutOfBoxSummary() {
  const outOfBoxFormSummary = {} as OutOfBoxFormSummary

  const params = useParams()
  const {
    applicationSummary,
    loanApplicationDetails,
    newCashFlowGlance,
    loanSmartKycDetail,
    isFetchingSummary,
    isFetchingCashflow,
    isFetchingNewCashFlow
  } = useLoanApplicationDetailContext()

  // Get Application Status
  const { data: statusData } = useQueryGetLoanApplicationDetailStatus({
    applicationId: params.id!
  })

  const notAllowToDownloadStatuses: string[] = [
    LoanApplicationStatus.DRAFT,
    LoanApplicationStatus.PENDING_SUBMISSION
  ]

  const { shouldDisplayCashFlowTable, shouldDisplayOperatingExpensesSection } =
    usePermissions()

  const page_1 = useRef<HTMLDivElement>(null)
  const page_2 = useRef<HTMLDivElement>(null)
  const page_3 = useRef<HTMLDivElement>(null)
  const page_4 = useRef<HTMLDivElement>(null)
  const page_5 = useRef<HTMLDivElement>(null)
  const page_6 = useRef<HTMLDivElement>(null)
  const page_7 = useRef<HTMLDivElement>(null)
  const page_8 = useRef<HTMLDivElement>(null)

  const elementToExportRef = concat(
    page_1,
    shouldDisplayCashFlowTable ? [page_2] : [],
    page_3,
    shouldDisplayOperatingExpensesSection ? page_4 : [],
    [page_5, page_6],
    loanSmartKycDetail ? [page_7] : [],
    [page_8]
  )

  const isOverviewDownloadable =
    statusData && !notAllowToDownloadStatuses.includes(statusData.toUpperCase())

  const downloadOverviewButton = isOverviewDownloadable && (
    <DownloadButton
      disabled={isFetchingCashflow || isFetchingNewCashFlow}
      elementToExportRef={elementToExportRef}
    />
  )

  if (isFetchingSummary) {
    return <SummarySkeleton />
  }

  OUT_OF_BOX_FORM_TYPES.forEach((formType) => {
    const formData = applicationSummary?.forms.find(
      (form) => form.formType === formType
    )

    if (isEmpty(formData)) {
      return
    }
    const schema = formSchemaFromFormType(formType)
    const formMetaData = get(formData, "forms[0].metadata", {})

    if (isEmpty(formMetaData)) {
      return
    }

    if (schema) {
      const key = formType as keyof OutOfBoxFormSummary

      if (key == FORM_TYPE.CURRENT_LOAN) {
        outOfBoxFormSummary[FORM_TYPE.CURRENT_LOAN] = adaptFormV2Metadata({
          schema: schema,
          metadata: formMetaData,
          preFormat: () =>
            preFormatCurrentLoanForm(
              formMetaData,
              applicationSummary?.applicationId,
              get(formData, "forms[0].id", "")
            )
        })

        return
      }

      if (key == FORM_TYPE.KYC) {
        outOfBoxFormSummary[FORM_TYPE.KYC] =
          adaptFormV2Metadata<IOwnerFormValue>({
            schema: schema,
            metadata: formMetaData,
            preFormat: () =>
              preFormatLaunchKCOwnerInformationForm(formMetaData),
            additionalFields: {
              id: get(formMetaData, "forms[0].id", "")
            }
          })

        return
      }

      outOfBoxFormSummary[key] = adaptFormV2Metadata({
        schema: schema,
        metadata: formMetaData,
        additionalFields: {
          applicationId: applicationSummary?.applicationId ?? "",
          loanApplicationId: applicationSummary?.applicationId ?? "",
          id: get(formData, "forms[0].id", "")
        }
      })
    }
  })

  return (
    <div className="w-full gap-3xl lg:flex" id="loan-summary">
      <Card className="size-full flex-1 space-y-4xl p-4xl">
        <div
          ref={page_1}
          className="flex flex-col gap-3xl"
          id="application-overview"
        >
          {!!loanApplicationDetails?.decision && (
            <div className="flex flex-col gap-2">
              <Badge
                className="relative w-fit px-4 py-2 capitalize"
                variant="soft"
                variantColor={getBadgeVariantByStatus(
                  loanApplicationDetails?.status
                )}
              >
                <p className="text-base">
                  {getDecisionTextByStatus(loanApplicationDetails?.decision)}
                </p>
              </Badge>
              {!!loanApplicationDetails?.decisionNote?.length && (
                <p className="pl-4 text-sm">
                  <span className="text-sm font-semibold">Decision note: </span>
                  {loanApplicationDetails?.decisionNote}
                </p>
              )}
            </div>
          )}
          <div className="mt-lg flex flex-wrap items-center justify-between gap-2 space-y-lg">
            <p className="text-4xl font-semibold ">Application Overview</p>
            {downloadOverviewButton}
          </div>
          <ApplicationOverview />
          <Separator />
          <p className="loan-application-header text-4xl font-semibold">
            Application Details
          </p>
          <KybFormDetailsV2
            kybFormDataV2={outOfBoxFormSummary[FORM_TYPE.KYB]}
          />
          <KycFormDetailsV2 kycFormData={outOfBoxFormSummary[FORM_TYPE.KYC]} />
        </div>
        {shouldDisplayCashFlowTable ? (
          <div ref={page_2} className="flex flex-col space-y-3xl">
            <CashFlowTable wrapperClassName="rounded-lg border" />
          </div>
        ) : null}
        <div
          ref={page_3}
          className="flex flex-col space-y-3xl"
          id="loan-application"
        >
          <CurrentLoanFormDetails
            currentLoanFormData={outOfBoxFormSummary[FORM_TYPE.CURRENT_LOAN]}
          />
        </div>
        {shouldDisplayOperatingExpensesSection ? (
          <div ref={page_4} className="flex flex-col space-y-3xl">
            <OperatingExpensesFormDetails
              operatingExpensesFormDataV2={
                outOfBoxFormSummary[FORM_TYPE.OPERATING_EXPENSES]
              }
            />
          </div>
        ) : null}

        <div
          ref={page_5}
          className="flex flex-col space-y-3xl"
          id="business-verification-p1"
        >
          <SignatureDetails
            confirmationFormData={applicationSummary?.confirmationForm}
            hasTitle={false}
          />
          <Separator />
          <p className="text-4xl font-semibold ">Business Verification</p>
          <BusinessDetail isDownloadAble={false} />
          <BusinessName />
          <OfficeAddress />
        </div>

        <div
          ref={page_6}
          className="flex flex-col space-y-3xl"
          id="business-verification-p2"
        >
          <Secretary />
          <TinMatch />
          <People />
          <WatchList />
          <Bankruptcy />
          <Separator />
        </div>

        {loanSmartKycDetail ? (
          <div
            ref={page_7}
            className="flex flex-col space-y-3xl"
            id="identity-verification"
          >
            <IdentityVerificationDetails />
          </div>
        ) : null}

        <div
          ref={page_8}
          className="flex flex-col space-y-3xl"
          id="cash-flow-report"
        >
          <p className="text-4xl font-semibold">Cash Flow Report</p>
          <Card className="flex h-fit flex-col gap-2xl overflow-auto rounded-lg p-4xl shadow-none">
            <CashflowGlanceReport
              isFetchingNewCashFlow={isFetchingNewCashFlow}
              newCashFlowGlance={newCashFlowGlance}
            />
          </Card>
        </div>
      </Card>
    </div>
  )
}
