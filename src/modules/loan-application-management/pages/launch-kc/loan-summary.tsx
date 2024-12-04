import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { CashflowGlanceReport } from "@/modules/loan-application-management/components/organisms/out-of-box/cash-flow/CashflowGlance"
import { SignatureDetails } from "@/modules/loan-application/components/organisms/loan-application-form/confirmation/SignatureDetails"
import { BusinessModelFormDetails } from "@/modules/loan-application/components/organisms/loan-application-form/business-model/BusinessModelFormDetails"
import { ExecutionFormDetails } from "@/modules/loan-application/components/organisms/loan-application-form/execution/ExecutionFormDetails"
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
import { ScoreCard } from "../../components/organisms/score-card/ScoreCard"
import { ScoreCardListDetail } from "../../components/organisms/score-card/ScoreCardListDetail"
import { useLoanApplicationDetailContext } from "../../providers/LoanApplicationDetailProvider"
import {
  getBadgeVariantByStatus,
  getDecisionTextByStatus
} from "../../services"
import { CashFlowTable } from "@/modules/loan-application/components/molecules/loan-application-details/CashFlowTable.tsx"
import { IdentityVerificationDetails } from "@/modules/loan-application/components/molecules/loan-application-details/IdentityVerificationDetails.tsx"
import { PreQualificationFormDetails } from "@/modules/loan-application/components/organisms/loan-application-form/pre-qualification/PreQualificationFormDetails.tsx"
import usePermissions from "@/hooks/usePermissions"
import { ApplicationOverview } from "../../components/organisms/out-of-box/loan-summary"
import { useQueryGetLoanApplicationDetailStatus } from "../../hooks/useQuery/useQueryGetLoanApplicationDetailStatus"
import { useParams } from "react-router-dom"
import { LoanApplicationStatus } from "@/types/loan-application.type"
import {
  adaptFormV2Metadata,
  preFormatCurrentLoanForm
} from "@/modules/loan-application/services/formv2.services.ts"
import { FORM_TYPE } from "@/modules/loan-application/models/LoanApplicationStep/type.ts"
import {
  businessModelFormSchema,
  type BusinessModelFormValue,
  executionFormSchema,
  type ExecutionFormValue,
  launchKcFitFormSchema,
  type LaunchKCFitFormValue,
  marketOpportunityFormSchema,
  type MarketOpportunityFormValue,
  operatingExpensesFormSchema,
  type PreQualificationFormValue,
  preQualificationSchema,
  productServiceFormSchema,
  type ProductServiceFormValue
} from "@/modules/loan-application/constants/form.ts"
import { ProductServiceFormDetails } from "@/modules/loan-application/components/organisms/loan-application-form/product-service/ProductServiceFormDetails.tsx"
import { MarketOpportunityFormDetails } from "@/modules/loan-application/components/organisms/loan-application-form/market-opportunity/MarketOpportunityFormDetails.tsx"
import { LaunchKcFitFormDetails } from "@/modules/loan-application/components/organisms/loan-application-form/custom-form/launchkc/launchkc-fit/LaunchKcFitFormDetails.tsx"
import { CurrentLoanFormDetails } from "@/modules/loan-application/components/organisms/loan-application-form/current-loan/CurrentLoanFormDetails.tsx"
import {
  type CurrentLoanFormsV2Value,
  currentLoansFormSchema
} from "@/modules/loan-application/components/organisms/loan-application-form/current-loan/CurrentLoanFormV2.tsx"
import { BUSINESS_MODEL_OTHER_OPTION } from "@/modules/loan-application/components/organisms/loan-application-form/execution/constants.ts"
import { capitalizeWords, snakeCaseToText } from "@/utils"
import { loanRequestSchemasByInstitution } from "@/modules/loan-application/constants/form-v2.ts"
import { type BusinessModel } from "@/modules/loan-application/components/organisms/loan-application-form/execution/type.ts"

interface LaunchKCFormSummary {
  [FORM_TYPE.PRE_QUALIFICATION]: PreQualificationFormValue
  [FORM_TYPE.PRODUCT_SERVICE]: ProductServiceFormValue
  [FORM_TYPE.MARKET_OPPORTUNITY]: MarketOpportunityFormValue
  [FORM_TYPE.LAUNCHKC_FIT]: LaunchKCFitFormValue
  [FORM_TYPE.EXECUTION]: ExecutionFormValue
  [FORM_TYPE.BUSINESS_MODEL]: BusinessModelFormValue
  [FORM_TYPE.CURRENT_LOAN]: CurrentLoanFormsV2Value
}

const LAUNCH_KC_FORM_TYPES = [
  FORM_TYPE.PRE_QUALIFICATION,
  FORM_TYPE.PRODUCT_SERVICE,
  FORM_TYPE.MARKET_OPPORTUNITY,
  FORM_TYPE.LAUNCHKC_FIT,
  FORM_TYPE.EXECUTION,
  FORM_TYPE.BUSINESS_MODEL,
  FORM_TYPE.CURRENT_LOAN
]

function formSchemaFromFormType(formType: FORM_TYPE) {
  switch (formType) {
    case FORM_TYPE.LOAN_REQUEST:
      return loanRequestSchemasByInstitution()
    case FORM_TYPE.CURRENT_LOAN:
      return currentLoansFormSchema
    case FORM_TYPE.OPERATING_EXPENSES:
      return operatingExpensesFormSchema
    case FORM_TYPE.PRODUCT_SERVICE:
      return productServiceFormSchema
    case FORM_TYPE.MARKET_OPPORTUNITY:
      return marketOpportunityFormSchema
    case FORM_TYPE.BUSINESS_MODEL:
      return businessModelFormSchema
    case FORM_TYPE.EXECUTION:
      return executionFormSchema
    case FORM_TYPE.LAUNCHKC_FIT:
      return launchKcFitFormSchema
    case FORM_TYPE.PRE_QUALIFICATION:
      return preQualificationSchema
    default:
      return null
  }
}

export function LaunchKCSummary() {
  const launchKCFormSummary = {} as LaunchKCFormSummary
  const params = useParams()
  const {
    applicationSummary,
    loanApplicationDetails,
    newCashFlowGlance,
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

  const { isJudge, isWorkspaceAdmin, shouldDisplayCashFlowReport } =
    usePermissions()

  const page_1 = useRef<HTMLDivElement>(null)
  const page_2 = useRef<HTMLDivElement>(null)
  const page_3 = useRef<HTMLDivElement>(null)
  const page_4 = useRef<HTMLDivElement>(null)
  const page_5 = useRef<HTMLDivElement>(null)
  const page_6 = useRef<HTMLDivElement>(null)
  const page_7 = useRef<HTMLDivElement>(null)
  const page_8 = useRef<HTMLDivElement>(null)
  const page_9 = useRef<HTMLDivElement>(null)
  const page_10 = useRef<HTMLDivElement>(null)
  const page_11 = useRef<HTMLDivElement>(null)
  const page_12 = useRef<HTMLDivElement>(null)

  const elementToExportRef = concat(
    [
      page_1,
      page_2,
      page_3,
      page_4,
      page_5,
      page_6,
      page_7,
      page_8,
      page_9,
      page_10,
      page_11
    ],
    shouldDisplayCashFlowReport ? [page_12] : []
  )

  // we can easily adjust the order of form here
  // split the form into two groups to avoid overflow
  const formsOrder = [
    {
      page: page_6,
      forms: [
        {
          key: FORM_TYPE.PRODUCT_SERVICE,
          Component: ProductServiceFormDetails
        },
        {
          key: FORM_TYPE.MARKET_OPPORTUNITY,
          Component: MarketOpportunityFormDetails
        },
        { key: FORM_TYPE.LAUNCHKC_FIT, Component: LaunchKcFitFormDetails }
      ]
    },
    {
      page: page_7,
      forms: [{ key: FORM_TYPE.EXECUTION, Component: ExecutionFormDetails }]
    },
    {
      page: page_8,
      forms: [
        { key: FORM_TYPE.BUSINESS_MODEL, Component: BusinessModelFormDetails }
      ]
    }
  ]

  const isOverviewDownloadable =
    statusData &&
    !notAllowToDownloadStatuses.includes(statusData.toUpperCase()) &&
    !isJudge

  const downloadOverviewButton = isOverviewDownloadable && (
    <DownloadButton
      disabled={isFetchingCashflow || isFetchingNewCashFlow}
      elementToExportRef={elementToExportRef}
    />
  )

  // region LaunchKC form v2
  LAUNCH_KC_FORM_TYPES.forEach((formType) => {
    const formData = applicationSummary?.forms.find(
      (form) => form.formType === formType
    )
    const schema = formSchemaFromFormType(formType)
    const formMetaData = get(formData, "forms[0].metadata", {})

    if (isEmpty(formMetaData)) {
      return
    }

    if (schema) {
      const key = formType as keyof LaunchKCFormSummary

      if (key == FORM_TYPE.CURRENT_LOAN) {
        launchKCFormSummary[FORM_TYPE.CURRENT_LOAN] = adaptFormV2Metadata({
          schema: schema,
          metadata: {
            formMetaData
          },
          preFormat: () =>
            preFormatCurrentLoanForm(
              formMetaData,
              applicationSummary?.applicationId,
              get(formData, "forms[0].id", "")
            )
        })

        return
      }

      if (key === FORM_TYPE.EXECUTION) {
        launchKCFormSummary[FORM_TYPE.EXECUTION] = adaptFormV2Metadata({
          schema: schema,
          metadata: {
            formMetaData
          },
          preFormat: () => ({
            ...formMetaData,
            businessModels: get(
              formData,
              "forms[0].metadata.businessModels",
              []
            )
              .flatMap((model) => {
                const { businessModel, otherMessage } = model as BusinessModel

                if (businessModel === BUSINESS_MODEL_OTHER_OPTION) {
                  return `${businessModel}: ${otherMessage}`
                }

                return businessModel
              })
              .map((model) => capitalizeWords(snakeCaseToText(String(model)))),
            fundingSources: get(
              formData,
              "forms[0].metadata.fundingSources",
              []
            ).map((source) => {
              return {
                amount: get(source, "amount", "0").toString(),
                sourceType: get(source, "sourceType", "")
              }
            })
          }),
          additionalFields: {
            loanApplicationId: applicationSummary?.applicationId ?? "",
            id: get(formData, "forms[0].id", "")
          }
        })

        return
      }

      launchKCFormSummary[key] = adaptFormV2Metadata({
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
          <PreQualificationFormDetails
            dataV2={launchKCFormSummary[FORM_TYPE.PRE_QUALIFICATION]}
          />
        </div>
        <div
          ref={page_2}
          className="flex flex-col space-y-3xl"
          id="application-overview"
        >
          🎀 Temporary content
          {/* TODO(Ngan): KYB form v2 */}
          {/* <KybFormDetails kybFormData={launchKCFormSummary[FORM_TYPE.KYB]} /> */}
        </div>
        <div ref={page_3} className="flex flex-col space-y-3xl">
          🎀 Temporary content
          {/* TODO(Ngan): KYC form v2 */}
          {/* <KycFormDetails kycFormData={launchKCFormSummary[FORM_TYPE.KYC]} /> */}
        </div>
        <div ref={page_4} className="flex flex-col space-y-3xl">
          <CashFlowTable wrapperClassName="rounded-lg border" />
        </div>
        <div
          ref={page_5}
          className="flex flex-col space-y-3xl"
          id="loan-application"
        >
          <CurrentLoanFormDetails
            currentLoanFormData={launchKCFormSummary[FORM_TYPE.CURRENT_LOAN]}
          />
        </div>

        {/* Loan summary */}
        <>
          {formsOrder.map(({ page, forms }) => (
            // eslint-disable-next-line react/jsx-key
            <div ref={page} className="flex flex-col space-y-3xl">
              {forms.map(({ key, Component }) => {
                const formData = get(
                  launchKCFormSummary,
                  key
                ) as LaunchKCFitFormValue &
                  ExecutionFormValue &
                  BusinessModelFormValue &
                  ProductServiceFormValue &
                  MarketOpportunityFormValue

                return formData && <Component key={key} dataV2={formData} />
              })}
            </div>
          ))}
        </>

        <div
          ref={page_9}
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
          ref={page_10}
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

        <div
          ref={page_11}
          className="flex flex-col space-y-3xl"
          id="identity-verification"
        >
          <IdentityVerificationDetails />
        </div>

        {shouldDisplayCashFlowReport ? (
          <div
            ref={page_12}
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
        ) : null}
      </Card>
      {isJudge ? <ScoreCard /> : null}
      {isWorkspaceAdmin ? <ScoreCardListDetail /> : null}
    </div>
  )
}
