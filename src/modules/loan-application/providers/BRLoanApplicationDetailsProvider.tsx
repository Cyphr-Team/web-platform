import { EDecisionStatus, EPersonaStatus } from "@/types/kyc"
import { type UserMicroLoanApplication } from "@/types/loan-application.type"
import { LoanType, type MicroLoanProgramType } from "@/types/loan-program.type"
import { isLaunchKC, isLoanReady, isSbb } from "@/utils/domain.utils"
import {
  formsConfigurationEnabled,
  isEnableFormV2,
  isEnableKCChamberKycPersonaDisabled,
  isEnablePandaDocESign,
  isIgnoredKycSubmission
} from "@/utils/feature-flag.utils"

import {
  type PropsWithChildren,
  useCallback,
  useEffect,
  useMemo,
  useState
} from "react"
import { useLocation, useParams } from "react-router-dom"
import { createContext } from "use-context-selector"
import {
  useLoanApplicationFormContext,
  useLoanApplicationProgressContext,
  useLoanProgramDetailContext,
  usePlaidContext
} from "."
import { type DocumentUploadsFormValue } from "../constants/form"
import {
  type BusinessDocumentsResponse,
  type ConfirmationFormResponse,
  type DocumentUploadedResponse,
  type FinancialInformationResponse,
  type KYBInformationResponse,
  type KYCInformationResponse,
  type LoanProgramData,
  type OperatingExpensesInformationResponse,
  type PreQualificationResponse
} from "../constants/type"
import {
  FORM_TYPE,
  LOAN_APPLICATION_STEPS
} from "../models/LoanApplicationStep/type"
import {
  reverseFormatKybForm,
  reverseFormatKycForm,
  reverseFormatOperatingExpensesForm,
  reverseFormatSbbKybForm
} from "../services/form.services"
import { FORM_ACTION, type FormStateType } from "./LoanApplicationFormProvider"
import { LoanProgressAction } from "./LoanProgressProvider"
import { type ForecastingSetupFormValue } from "@/modules/loan-application/[module]-financial-projection/types/forecasting-form.ts"
import { isEnabledQuery } from "@/utils"
import { type SubmitRevenueStreamResponse } from "@/modules/loan-application/[module]-financial-projection/types/revenue-form.ts"
import { formatForecastSetupResult } from "@/modules/loan-application/[module]-financial-projection/hooks/forecasting-setup/useQueryForecastingSetup.ts"
import { type FinancialStatementFormResponse } from "@/modules/loan-application/[module]-financial-projection/types/financial-statement-form"

import { get } from "lodash"
import { mapMetadataToLoanRequest } from "@/modules/loan-application/services/formv2.services.ts"
import {
  deserializeCurrentLoansFormV2,
  type QueryCurrentLoansFormV2Response,
  useQueryCurrentLoansFormV2
} from "@/modules/loan-application/hooks/form-current-loan-v2/useQueryCurrentLoansFormV2.ts"
import { deserializeKycFormV2 } from "@/modules/loan-application/hooks/form-kyc/useSubmitKycFormV2.ts"
import { useQueryLoanProgramDetailsByType } from "@/modules/loan-application/hooks/program/useQueryLoanProgramDetails.ts"
import {
  type LoanRequestV2Response,
  useQueryLoanRequestForm
} from "@/modules/loan-application/hooks/form-loan-request/useQueryLoanRequest.ts"
import { useQueryLoanApplicationDetailsByType } from "@/modules/loan-application/hooks/application/useQueryUserLoanApplicationDetails.ts"
import { useGetLoanProgramDetail } from "@/modules/loan-application/hooks/program/useGetLoanProgramDetail.ts"
import { useQueryGetIdentityVerification } from "@/modules/loan-application/hooks/form-identity-verification/useQueryGetIdentityVerification.ts"
import { useGetESignDocument } from "@/modules/loan-application/hooks/form-esign/useGetESignDocument.ts"
import { useQueryGetPlaidItemIds } from "@/modules/loan-application/hooks/form-cash-flow/useQueryGetPlaidItemIds.ts"
import { useGetPlaidConnectedInstitutions } from "@/modules/loan-application/hooks/form-cash-flow/useQueryGetPlaidConnectedBankAccountsByApplicationId.ts"
import {
  useQueryGetKybForm,
  useQueryGetKybFormV2
} from "@/modules/loan-application/hooks/form-kyb/useQueryKybForm.ts"
import {
  useQueryKycForm,
  useQueryKycFormV2
} from "@/modules/loan-application/hooks/form-kyc/useQueryKycForm.ts"
import { useQueryGetConfirmationForm } from "@/modules/loan-application/hooks/form-common/useQueryConfirmationForm.ts"
import { useQueryGetFinancialForm } from "@/modules/loan-application/hooks/form-common/useQueryFinancialForm.ts"
import { useQueryGetOperatingExpensesForm } from "@/modules/loan-application/hooks/form-common/useQueryOperatingExpensesForm.ts"
import { useQueryGetDocumentsByForm } from "@/modules/loan-application/hooks/form-document/useQueryGetDocuments.ts"
import { useQueryGetPreQualificationForm } from "@/modules/loan-application/hooks/form-common/useQueryPreQualificationForm.ts"
import { useQueryBusinessDocuments } from "@/modules/loan-application/hooks/form-document/useQueryBusinessDocuments.ts"
import { useQuerySbbDocumentForm } from "@/modules/loan-application/hooks/form-document/useQuerySbbDocumentForm.ts"
import { useGetSBBDocumentForms } from "@/modules/loan-application/hooks/form-document/useGetDocumentForm.ts"
import { useGetFinancialProjectForms } from "@/modules/loan-application/hooks/form-financial-projection/useGetFinancialProjectForms.ts"
import { deserializeKybFormV2 } from "@/modules/loan-application/hooks/form-kyb/useSubmitKybFormV2.ts"
import { useGetCapitalCollabFinancialProjectForms } from "@/modules/loan-application/capital-collab/hooks/useGetCapitalCollabFinancialProjectForms"
import type { CurrentLoanFormsV2Value } from "@/modules/loan-application/components/organisms/loan-application-form/current-loan/CurrentLoanFormV2.tsx"
import { useQueryProductServiceForm } from "@/modules/loan-application/hooks/form-common/launchkc/useQueryProductServiceForm"
import { deserializeLoanProductServiceFormV2 } from "@/modules/loan-application/hooks/form-common/launchkc/stores/product-service-store"
import { type NullableFormV2DataResponse } from "@/modules/loan-application/types/form.v2"
import { deserializeLoanMarketOpportunityFormV2 } from "@/modules/loan-application/hooks/form-common/launchkc/stores/market-opportunity-store"
import { useQueryMarketOpportunityForm } from "@/modules/loan-application/hooks/form-common/launchkc/useQueryMarketOpportunityForm"
import { useQueryBusinessModelForm } from "@/modules/loan-application/hooks/form-common/launchkc/useQueryBusinessModelForm"
import { deserializeLoanBusinessModelFormV2 } from "@/modules/loan-application/hooks/form-common/launchkc/stores/business-model-store"
import { deserializeLoanLaunchKCFitFormV2 } from "@/modules/loan-application/hooks/form-common/launchkc/stores/launchkc-fit-store"
import { useQueryLaunchKCFitForm } from "@/modules/loan-application/hooks/form-common/launchkc/useQueryLaunchKCFitForm"
import { deserializeLoanExecutionFormV2 } from "@/modules/loan-application/hooks/form-common/launchkc/stores/execution-store"
import { useQueryExecutionForm } from "@/modules/loan-application/hooks/form-common/launchkc/useQueryExecutionForm"

interface FinancialProjectionDetail {
  financialStatementData?: FinancialStatementFormResponse
  revenueFormData?: SubmitRevenueStreamResponse
}

type BRLoanApplicationDetailsContext<T> = {
  loanProgramDetails?: T
  loanProgramInfo?: LoanProgramData
  kybFormData?: KYBInformationResponse
  kycFormData?: KYCInformationResponse
  loanRequestFormV2Data?: LoanRequestV2Response
  currentLoanFormData?:
    | QueryCurrentLoansFormV2Response
    | CurrentLoanFormsV2Value
  operatingExpensesFormData?: OperatingExpensesInformationResponse
  confirmationFormData?: ConfirmationFormResponse
  financialFormData?: FinancialInformationResponse
  productServiceFormData?: NullableFormV2DataResponse
  marketOpportunityFormData?: NullableFormV2DataResponse
  launchKCFitFormData?: NullableFormV2DataResponse
  executionFormData?: NullableFormV2DataResponse
  businessModelFormData?: NullableFormV2DataResponse
  loanApplicationDetails?: UserMicroLoanApplication
  preQualificationFormData?: PreQualificationResponse
  businessDocumentsFormData?: BusinessDocumentsResponse
  kycDocuments?: DocumentUploadedResponse[]
  financialDocuments?: DocumentUploadedResponse[]
  /**
   * Financial projection
   * */
  forecastingSetup?: ForecastingSetupFormValue
  isLoading: boolean
  isFetchingDetails: boolean
} & FinancialProjectionDetail

export const MicroLoanBRLoanApplicationDetailsContext = createContext<
  BRLoanApplicationDetailsContext<MicroLoanProgramType>
>({
  isLoading: false,
  isFetchingDetails: false
})

export function BRLoanApplicationDetailsProvider({
  children
}: PropsWithChildren) {
  const { state } = useLocation()

  const { loanProgramId, id: loanApplicationId } = useParams()
  const { dispatchProgress, isInitialized, progress, buildSpecificStep } =
    useLoanApplicationProgressContext()
  const { dispatchFormAction } = useLoanApplicationFormContext()
  const { dispatch: plaidDispatch } = usePlaidContext()
  const { loanProgramFormsConfiguration } = useLoanProgramDetailContext()

  const loanProgramQuery = useQueryLoanProgramDetailsByType(
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    state?.loanProgramDetails?.type ?? "",
    loanProgramId!
  )

  const isSbbTenant = isSbb()

  const [isPassPreQualification, setIsPassPreQualification] = useState(false)

  // Check if the user is qualified
  // Only check with LaunchKC
  const isQualified = isLaunchKC() ? isPassPreQualification : true

  const loanApplicationDetailsQuery = useQueryLoanApplicationDetailsByType(
    loanApplicationId!,
    loanProgramQuery.data?.type ?? LoanType.MICRO
  )

  /**
   * Loan Request V2
   */
  const loanRequestDetailQuery = useQueryLoanRequestForm({
    applicationId: loanApplicationId!,
    formTypes: [FORM_TYPE.LOAN_REQUEST]
  })

  const loanProgramInfo = useGetLoanProgramDetail(
    loanProgramQuery.data?.type ?? "",
    loanProgramQuery.data?.name
  )

  /**
   * Return the persona inquiry verification status for the loan application
   */
  const identityVerificationQuery = useQueryGetIdentityVerification({
    appId: loanApplicationId,
    enabled:
      !!loanApplicationId &&
      !isLoanReady() &&
      !isEnableKCChamberKycPersonaDisabled() &&
      !isIgnoredKycSubmission()
  })

  /**
   * Return the document id for the loan application
   */
  const eSignQuery = useGetESignDocument({
    applicationId: loanApplicationId,
    enabled:
      !!loanApplicationId &&
      (isSbbTenant || isLoanReady()) &&
      isEnablePandaDocESign()
  })

  /**
   * Return the Plaid ItemIds
   */
  const plaidItemIdsQuery = useQueryGetPlaidItemIds({
    applicationId: loanApplicationId!,
    enabled: isEnabledQuery(
      LOAN_APPLICATION_STEPS.CASH_FLOW_VERIFICATION,
      progress
    )
  })

  /**
   * Return Plaid connected bank accounts by application
   */
  const plaidConnectedInstitutionsQuery = useGetPlaidConnectedInstitutions({
    request: {
      applicationId: loanApplicationId
    },
    options: {
      enabled: isEnabledQuery(
        LOAN_APPLICATION_STEPS.CASH_FLOW_VERIFICATION,
        progress
      )
    }
  })

  const kybFormQuery = useQueryGetKybForm({
    applicationId: loanApplicationId!,
    enabled:
      isEnabledQuery(LOAN_APPLICATION_STEPS.BUSINESS_INFORMATION, progress) ||
      isEnabledQuery(
        LOAN_APPLICATION_STEPS.SBB_BUSINESS_INFORMATION_PART_ONE,
        progress
      )
  })
  const kybFormQueryV2 = useQueryGetKybFormV2({
    applicationId: loanApplicationId!,
    enabled:
      isEnableFormV2() &&
      !isSbb() &&
      (isEnabledQuery(LOAN_APPLICATION_STEPS.BUSINESS_INFORMATION, progress) ||
        isEnabledQuery(
          LOAN_APPLICATION_STEPS.SBB_BUSINESS_INFORMATION_PART_ONE,
          progress
        ))
  })
  const kycFormQuery = useQueryKycForm({
    applicationId: loanApplicationId!,
    enabled:
      !isEnableFormV2() &&
      isEnabledQuery(LOAN_APPLICATION_STEPS.OWNER_INFORMATION, progress)
  })

  const kycFormQueryV2 = useQueryKycFormV2({
    applicationId: loanApplicationId!,
    enabled:
      isEnableFormV2() &&
      !isSbb() &&
      isEnabledQuery(LOAN_APPLICATION_STEPS.OWNER_INFORMATION, progress)
  })

  const confirmationFormQuery = useQueryGetConfirmationForm({
    applicationId: loanApplicationId!,
    enabled: isEnabledQuery(LOAN_APPLICATION_STEPS.CONFIRMATION, progress)
  })

  const financialFormQuery = useQueryGetFinancialForm({
    applicationId: loanApplicationId!,
    enabled:
      isEnabledQuery(LOAN_APPLICATION_STEPS.FINANCIAL_INFORMATION, progress) ||
      isEnabledQuery(LOAN_APPLICATION_STEPS.CASH_FLOW_VERIFICATION, progress)
  })

  const currentLoansFormQueryV2 = useQueryCurrentLoansFormV2({
    applicationId: loanApplicationId!,
    enabled:
      isEnabledQuery(LOAN_APPLICATION_STEPS.CURRENT_LOANS, progress) &&
      isEnableFormV2()
  })

  const operatingExpensesFormQuery = useQueryGetOperatingExpensesForm({
    applicationId: loanApplicationId!,
    enabled: isEnabledQuery(LOAN_APPLICATION_STEPS.OPERATING_EXPENSES, progress)
  })

  const financialDocuments = useQueryGetDocumentsByForm(
    financialFormQuery.data?.id ?? ""
  )
  const kycDocuments = useQueryGetDocumentsByForm(kycFormQuery.data?.id ?? "")

  const preQualificationFormQuery = useQueryGetPreQualificationForm({
    applicationId: loanApplicationId!,
    enabled: isEnabledQuery(LOAN_APPLICATION_STEPS.PRE_QUALIFICATION, progress)
  })

  const productServiceFormQuery = useQueryProductServiceForm({
    applicationId: loanApplicationId!,
    enabled: isEnabledQuery(LOAN_APPLICATION_STEPS.PRODUCT_SERVICE, progress)
  })
  const marketOpportunityFormQuery = useQueryMarketOpportunityForm({
    applicationId: loanApplicationId!,
    enabled: isEnabledQuery(LOAN_APPLICATION_STEPS.MARKET_OPPORTUNITY, progress)
  })

  const launchKCFitFormQuery = useQueryLaunchKCFitForm({
    applicationId: loanApplicationId!,
    enabled: isEnabledQuery(LOAN_APPLICATION_STEPS.LAUNCH_KC_FIT, progress)
  })

  const executionFormQuery = useQueryExecutionForm({
    applicationId: loanApplicationId!,
    enabled: isEnabledQuery(LOAN_APPLICATION_STEPS.EXECUTION, progress)
  })

  const businessModelFormQuery = useQueryBusinessModelForm({
    applicationId: loanApplicationId!,
    enabled: isEnabledQuery(LOAN_APPLICATION_STEPS.BUSINESS_MODEL, progress)
  })

  const businessDocumentsUploadedFormQuery = useQueryBusinessDocuments({
    applicationId: loanApplicationId!,
    enabled: isEnabledQuery(
      LOAN_APPLICATION_STEPS.LAUNCH_KC_BUSINESS_DOCUMENTS,
      progress
    )
  })

  // SBB document form
  const sbbDocumentQuery = useQuerySbbDocumentForm(loanApplicationId)
  const sbbDocumentFormMappingQuery = useGetSBBDocumentForms(loanApplicationId)

  const changeDataAndProgress = useCallback(
    (data: FormStateType, progress: LOAN_APPLICATION_STEPS, isDone = true) => {
      if (isDone) {
        dispatchProgress({
          type: LoanProgressAction.ChangeProgress,
          progress
        })
      }
      dispatchFormAction({
        action: FORM_ACTION.SET_DATA,
        key: progress,
        state: data
      })
    },
    [dispatchProgress, dispatchFormAction]
  )

  /**
   * Setup pre application disclosures for SBB tenant
   * Because application disclosures are required for SBB tenant before "Save & Close"
   * Then we assume that the user has passed the pre-application disclosures
   * So we need to set the pre-application disclosures to true
   */

  const setupPreApplicationDisclosures = useCallback(() => {
    changeDataAndProgress(
      {
        patriotAct: true
      },
      LOAN_APPLICATION_STEPS.PATRIOT_ACT
    )
    changeDataAndProgress(
      {
        privacyPolicy: true
      },
      LOAN_APPLICATION_STEPS.PRIVACY_POLICY
    )
  }, [changeDataAndProgress])

  const formInConfigurations = useCallback(
    (form: FORM_TYPE) =>
      formsConfigurationEnabled()
        ? loanProgramFormsConfiguration?.forms?.includes(form) ?? false
        : true,
    [loanProgramFormsConfiguration]
  )

  // Save data to edit form
  // Pre Qualification Form
  useEffect(() => {
    if (
      preQualificationFormQuery.data &&
      formInConfigurations(FORM_TYPE.PRE_QUALIFICATION) &&
      isInitialized
    ) {
      changeDataAndProgress(
        preQualificationFormQuery.data,
        LOAN_APPLICATION_STEPS.PRE_QUALIFICATION
      )

      buildSpecificStep()

      setIsPassPreQualification(true)
    }
  }, [
    buildSpecificStep,
    changeDataAndProgress,
    formInConfigurations,
    isInitialized,
    preQualificationFormQuery.data
  ])

  // KYB Form
  useEffect(() => {
    if (
      !isEnableFormV2() &&
      kybFormQuery.data &&
      formInConfigurations(FORM_TYPE.KYB) &&
      isInitialized &&
      isQualified
    ) {
      if (isSbbTenant) {
        changeDataAndProgress(
          reverseFormatSbbKybForm(kybFormQuery.data).sbbKybFormPartOneValues,
          LOAN_APPLICATION_STEPS.SBB_BUSINESS_INFORMATION_PART_ONE
        )
        changeDataAndProgress(
          reverseFormatSbbKybForm(kybFormQuery.data).sbbKybFormPartTwoValues,
          LOAN_APPLICATION_STEPS.SBB_BUSINESS_INFORMATION_PART_TWO
        )
      } else {
        changeDataAndProgress(
          reverseFormatKybForm(kybFormQuery.data),
          LOAN_APPLICATION_STEPS.BUSINESS_INFORMATION
        )
      }
    }
  }, [
    changeDataAndProgress,
    formInConfigurations,
    isInitialized,
    isQualified,
    isSbbTenant,
    kybFormQuery.data
  ])

  useEffect(() => {
    if (
      isEnableFormV2() &&
      !isSbb() &&
      !!kybFormQueryV2.data &&
      formInConfigurations(FORM_TYPE.KYB) &&
      isInitialized &&
      isQualified
    ) {
      changeDataAndProgress(
        deserializeKybFormV2(kybFormQueryV2.data),
        LOAN_APPLICATION_STEPS.BUSINESS_INFORMATION
      )
    }
  }, [
    changeDataAndProgress,
    formInConfigurations,
    isInitialized,
    isQualified,
    kybFormQueryV2.data
  ])

  // KYC Form
  useEffect(() => {
    if (
      !isEnableFormV2() &&
      kycFormQuery.data &&
      formInConfigurations(FORM_TYPE.KYC) &&
      isInitialized &&
      isQualified
    ) {
      changeDataAndProgress(
        reverseFormatKycForm(kycFormQuery.data),
        LOAN_APPLICATION_STEPS.OWNER_INFORMATION
      )
    }
  }, [
    changeDataAndProgress,
    formInConfigurations,
    isInitialized,
    isQualified,
    kycFormQuery.data
  ])

  // KYC Form V2
  useEffect(() => {
    if (
      isEnableFormV2() &&
      isInitialized &&
      isQualified &&
      formInConfigurations(FORM_TYPE.KYC) &&
      kycFormQueryV2.data
    ) {
      changeDataAndProgress(
        deserializeKycFormV2(kycFormQueryV2.data),
        LOAN_APPLICATION_STEPS.OWNER_INFORMATION
      )
    }
  }, [
    changeDataAndProgress,
    formInConfigurations,
    isInitialized,
    isQualified,
    kycFormQueryV2.data
  ])

  // Financial Form
  useEffect(() => {
    if (
      financialFormQuery.data &&
      formInConfigurations(FORM_TYPE.FINANCIAL) &&
      isInitialized &&
      isQualified
    ) {
      changeDataAndProgress(
        {
          ...financialFormQuery.data,
          incomeCategories: financialFormQuery.data.incomeCategories ?? [],
          w2sFile: []
        },
        LOAN_APPLICATION_STEPS.FINANCIAL_INFORMATION
      )
      changeDataAndProgress(
        {
          ...financialFormQuery.data,
          incomeCategories: financialFormQuery.data.incomeCategories ?? [],
          w2sFile: []
        },
        LOAN_APPLICATION_STEPS.CASH_FLOW_VERIFICATION
      )
    }
  }, [
    changeDataAndProgress,
    financialFormQuery.data,
    formInConfigurations,
    isInitialized,
    isQualified
  ])
  // Current Loans Form
  useEffect(() => {
    if (
      !formInConfigurations(FORM_TYPE.CURRENT_LOAN) ||
      !isInitialized ||
      !isQualified
    ) {
      return
    }

    if (currentLoansFormQueryV2.data) {
      changeDataAndProgress(
        deserializeCurrentLoansFormV2(currentLoansFormQueryV2.data),
        LOAN_APPLICATION_STEPS.CURRENT_LOANS
      )
    }
  }, [
    changeDataAndProgress,
    currentLoansFormQueryV2.data,
    formInConfigurations,
    isInitialized,
    isQualified
  ])
  // Operating Expenses Form
  useEffect(() => {
    if (
      operatingExpensesFormQuery.data &&
      formInConfigurations(FORM_TYPE.OPERATING_EXPENSES) &&
      isInitialized &&
      isQualified
    ) {
      changeDataAndProgress(
        reverseFormatOperatingExpensesForm(operatingExpensesFormQuery.data),
        LOAN_APPLICATION_STEPS.OPERATING_EXPENSES
      )
    }
  }, [
    changeDataAndProgress,
    formInConfigurations,
    isInitialized,
    isQualified,
    operatingExpensesFormQuery.data
  ])

  // Loan Request Form
  useEffect(() => {
    if (isInitialized && isQualified) {
      if (
        isEnableFormV2() &&
        loanRequestDetailQuery.data &&
        loanRequestDetailQuery.data.forms.length > 0
      ) {
        const loanRequestData = {
          // Loan Request has only one form
          id: get(loanRequestDetailQuery.data, "forms[0].id", "") ?? "",
          applicationId: loanRequestDetailQuery?.data?.applicationId ?? "",
          ...mapMetadataToLoanRequest(
            get(loanRequestDetailQuery.data, "forms[0].metadata", {}) ?? {}
          )
        }

        changeDataAndProgress(
          loanRequestData,
          LOAN_APPLICATION_STEPS.LOAN_REQUEST_V2
        )

        changeDataAndProgress(
          loanRequestData,
          LOAN_APPLICATION_STEPS.LOAN_REQUEST
        )
      } else if (!isEnableFormV2() && loanApplicationDetailsQuery.data) {
        changeDataAndProgress(
          {
            id: loanApplicationDetailsQuery.data.id,
            applicationId: loanApplicationDetailsQuery.data.id,
            loanAmount: loanApplicationDetailsQuery.data.loanAmount,
            loanTermInMonth: loanApplicationDetailsQuery.data.loanTermInMonth,
            proposeUseOfLoan: loanApplicationDetailsQuery.data.proposeUseOfLoan
          },
          LOAN_APPLICATION_STEPS.LOAN_REQUEST
        )
      } else if (isSbbTenant) {
        setupPreApplicationDisclosures()
      }
    }
  }, [
    changeDataAndProgress,
    isInitialized,
    isQualified,
    isSbbTenant,
    loanApplicationDetailsQuery.data,
    loanRequestDetailQuery.data,
    setupPreApplicationDisclosures
  ])

  // Product Service Form
  useEffect(() => {
    if (productServiceFormQuery.data && isInitialized && isQualified) {
      changeDataAndProgress(
        deserializeLoanProductServiceFormV2(productServiceFormQuery.data),
        LOAN_APPLICATION_STEPS.PRODUCT_SERVICE
      )
    }
  }, [
    changeDataAndProgress,
    isInitialized,
    isQualified,
    productServiceFormQuery.data
  ])

  // Market Opportunity Form
  useEffect(() => {
    if (marketOpportunityFormQuery.data && isInitialized && isQualified) {
      changeDataAndProgress(
        deserializeLoanMarketOpportunityFormV2(marketOpportunityFormQuery.data),
        LOAN_APPLICATION_STEPS.MARKET_OPPORTUNITY
      )
    }
  }, [
    changeDataAndProgress,
    isInitialized,
    isQualified,
    marketOpportunityFormQuery.data
  ])

  // LaunchKC Fit Form
  useEffect(() => {
    if (launchKCFitFormQuery.data && isInitialized && isQualified) {
      changeDataAndProgress(
        deserializeLoanLaunchKCFitFormV2(launchKCFitFormQuery.data),
        LOAN_APPLICATION_STEPS.LAUNCH_KC_FIT
      )
    }
  }, [
    changeDataAndProgress,
    isInitialized,
    isQualified,
    launchKCFitFormQuery.data
  ])

  // Business Model Form
  useEffect(() => {
    if (businessModelFormQuery.data && isInitialized && isQualified) {
      changeDataAndProgress(
        deserializeLoanBusinessModelFormV2(businessModelFormQuery.data),
        LOAN_APPLICATION_STEPS.BUSINESS_MODEL
      )
    }
  }, [
    changeDataAndProgress,
    isInitialized,
    isQualified,
    businessModelFormQuery.data
  ])

  // Execution Form
  useEffect(() => {
    if (executionFormQuery.data && isInitialized && isQualified) {
      changeDataAndProgress(
        deserializeLoanExecutionFormV2(executionFormQuery.data),
        LOAN_APPLICATION_STEPS.EXECUTION
      )
    }
  }, [
    changeDataAndProgress,
    isInitialized,
    isQualified,
    executionFormQuery.data
  ])

  // Document Upload Form
  useEffect(() => {
    if (
      businessDocumentsUploadedFormQuery.data &&
      isInitialized &&
      isQualified
    ) {
      changeDataAndProgress(
        {
          id: businessDocumentsUploadedFormQuery.data.id,
          uploadedExecutiveSummary: [
            businessDocumentsUploadedFormQuery.data.executiveSummary
          ],
          uploadedPitchDesk: [businessDocumentsUploadedFormQuery.data.pitchDeck]
        } as DocumentUploadsFormValue,
        LOAN_APPLICATION_STEPS.LAUNCH_KC_BUSINESS_DOCUMENTS
      )
    }
  }, [
    businessDocumentsUploadedFormQuery.data,
    changeDataAndProgress,
    isInitialized,
    isQualified
  ])

  /**
   * Handle update identity verification data when edit draft application
   */
  useEffect(() => {
    if (
      identityVerificationQuery.data?.inquiryId &&
      identityVerificationQuery.data?.personaStatus &&
      formInConfigurations(FORM_TYPE.IDENTITY_VERIFICATION) &&
      isInitialized &&
      isQualified
    ) {
      if (
        identityVerificationQuery.data?.personaStatus.toLowerCase() ===
          EPersonaStatus.COMPLETED.toLowerCase() ||
        identityVerificationQuery.data?.personaStatus.toLowerCase() ===
          EDecisionStatus.APPROVED.toLowerCase()
      ) {
        dispatchProgress({
          // turn on green tick
          type: LoanProgressAction.ChangeProgress,
          progress: LOAN_APPLICATION_STEPS.IDENTITY_VERIFICATION
        })
      }

      dispatchFormAction({
        action: FORM_ACTION.SET_DATA,
        key: LOAN_APPLICATION_STEPS.IDENTITY_VERIFICATION,
        state: {
          smartKycId: identityVerificationQuery.data?.id,
          inquiryId: identityVerificationQuery.data.inquiryId,
          status: identityVerificationQuery.data.personaStatus?.toLowerCase()
        }
      })
    }
  }, [
    changeDataAndProgress,
    formInConfigurations,
    isQualified,
    identityVerificationQuery.data?.id,
    identityVerificationQuery.data?.inquiryId,
    identityVerificationQuery.data?.personaStatus,
    dispatchFormAction,
    dispatchProgress,
    isInitialized
  ])

  /**
   * Handle retrieve list Plaid ItemIds
   */
  useEffect(() => {
    if (plaidItemIdsQuery.data?.data?.plaidItems) {
      plaidDispatch({
        type: "SET_STATE",
        state: {
          fetchedItemIds:
            plaidItemIdsQuery.data?.data?.plaidItems?.map(
              (plaidItem) => plaidItem.itemId
            ) ?? []
        }
      })

      if (plaidItemIdsQuery.data?.data?.plaidItems.length > 0) {
        dispatchProgress({
          // turn on green tick
          type: LoanProgressAction.ChangeProgress,
          progress: LOAN_APPLICATION_STEPS.REVIEW_TRANSACTIONS
        })
        dispatchProgress({
          // turn on green tick
          type: LoanProgressAction.ChangeProgress,
          progress: LOAN_APPLICATION_STEPS.REVIEW_INCOME_STATEMENT
        })
      }
    }
  }, [dispatchProgress, plaidDispatch, plaidItemIdsQuery.data?.data])

  /**
   * Handle retrieve list Plaid connected bank accounts
   */
  useEffect(() => {
    if (plaidConnectedInstitutionsQuery.data) {
      plaidDispatch({
        type: "SET_STATE",
        state: {
          institutions: plaidConnectedInstitutionsQuery.data ?? []
        }
      })
    }
  }, [dispatchProgress, plaidConnectedInstitutionsQuery.data, plaidDispatch])
  /**
   * TODO: How to remove linkedItemIds
   */

  /**
   * Handle update ESign detail for form data
   * Note: Store documentId only, the session can be created again
   */
  useEffect(() => {
    if (eSignQuery.data?.documentId && isInitialized) {
      dispatchFormAction({
        action: FORM_ACTION.SET_DATA,
        key: LOAN_APPLICATION_STEPS.E_SIGN,
        state: { documentId: eSignQuery.data.documentId }
      })
      dispatchProgress({
        // turn on green tick
        type: LoanProgressAction.ChangeProgress,
        progress: LOAN_APPLICATION_STEPS.REVIEW_APPLICATION
      })
      changeDataAndProgress(
        { acknowledge: true },
        LOAN_APPLICATION_STEPS.DISCLAIMER_AND_DISCLOSURE
      )
    }
  }, [
    changeDataAndProgress,
    dispatchFormAction,
    dispatchProgress,
    eSignQuery.data?.documentId,
    isInitialized
  ])

  /**
   * TODO - Remove "Handle SBB document query" after FormV2 Roll out
   * Handle SBB document query
   * */
  useEffect(() => {
    if (!isEnableFormV2()) return
    const sbbDocumentFormMapping = sbbDocumentFormMappingQuery.data

    if (!sbbDocumentFormMapping) return

    const StepMapping = new Map([
      [
        FORM_TYPE.BUSINESS_EIN_LETTER,
        LOAN_APPLICATION_STEPS.BUSINESS_EIN_LETTER
      ],
      [
        FORM_TYPE.CERTIFICATE_OF_GOOD_STANDING,
        LOAN_APPLICATION_STEPS.CERTIFICATE_GOOD_STANDING
      ],
      [
        FORM_TYPE.FICTITIOUS_NAME_CERTIFICATION,
        LOAN_APPLICATION_STEPS.FICTITIOUS_NAME_CERTIFICATION
      ],
      [
        FORM_TYPE.ARTICLES_OF_ORGANIZATION,
        LOAN_APPLICATION_STEPS.ARTICLES_OF_ORGANIZATION
      ],
      [FORM_TYPE.BY_LAWS, LOAN_APPLICATION_STEPS.BY_LAWS]
    ])

    const updateDocumentFormStepStatus = (
      formType: FORM_TYPE,
      step: LOAN_APPLICATION_STEPS
    ) => {
      const documentFormResponse = get(sbbDocumentFormMapping, formType)

      if (documentFormResponse.status !== "fulfilled") return

      changeDataAndProgress(
        {
          formId: documentFormResponse.detail.id,
          files: [],
          uploadedFiles: documentFormResponse.detail.documents,
          deleteFiles: [],
          notHaveDoc: documentFormResponse.detail.documents.length === 0
        },
        step
      )
    }

    ;[...StepMapping].forEach(([formType, step]) =>
      updateDocumentFormStepStatus(formType, step)
    )
  }, [changeDataAndProgress, sbbDocumentFormMappingQuery.data])

  useEffect(() => {
    if (isEnableFormV2()) return

    const data = sbbDocumentQuery.data

    if (data?.id) {
      changeDataAndProgress(
        {
          formId: data.id,
          files: [],
          uploadedFiles: data.businessEinLetter
        },
        LOAN_APPLICATION_STEPS.BUSINESS_EIN_LETTER,
        data.businessEinLetter.length > 0
      )

      changeDataAndProgress(
        {
          formId: data.id,
          files: [],
          uploadedFiles: data.certificateOfGoodStanding
        },
        LOAN_APPLICATION_STEPS.CERTIFICATE_GOOD_STANDING,
        data.certificateOfGoodStanding.length > 0
      )

      /**
       * TODO: this is just a quick-dirty fix, it will not true if user actually don't have document
       * we will fix this problem later when we have time. It's HIGH PRIORITY
       * */
      if (data.articlesOfOrganizationAndOperatingAgreement.length !== 0) {
        changeDataAndProgress(
          {
            formId: data.id,
            files: [],
            uploadedFiles: data.articlesOfOrganizationAndOperatingAgreement,
            notHaveDoc: false
          },
          LOAN_APPLICATION_STEPS.ARTICLES_OF_ORGANIZATION
        )
      }

      if (data.fictitiousNameCertification.length !== 0) {
        changeDataAndProgress(
          {
            formId: data.id,
            files: [],
            uploadedFiles: data.fictitiousNameCertification,
            notHaveDoc: false
          },
          LOAN_APPLICATION_STEPS.FICTITIOUS_NAME_CERTIFICATION
        )
      }

      if (data.byLaws.length !== 0) {
        changeDataAndProgress(
          {
            formId: data.id,
            files: [],
            uploadedFiles: data.byLaws,
            notHaveDoc: false
          },
          LOAN_APPLICATION_STEPS.BY_LAWS
        )
      }
    }
  }, [changeDataAndProgress, sbbDocumentQuery.data])

  const {
    expensePeopleFormQuery,
    fpOperatingExpensesFormQuery,
    revenueFormQuery,
    debtFinancingFormQuery,
    debtFinancingLiabilityFormQuery,
    forecastingSetupQuery,
    financialStatementQuery
  } = useGetFinancialProjectForms()

  const {
    operatingExpensesCCFormQuery,
    debtFinancingCCFormQuery,
    assetsCCFormQuery,
    directCostsCCFormQuery
  } = useGetCapitalCollabFinancialProjectForms()

  const value = useMemo(
    () => ({
      loanProgramInfo,
      loanProgramDetails: loanProgramQuery.data,
      loanRequestFormV2Data: loanRequestDetailQuery.data,
      kybFormData: kybFormQuery.data,
      kycFormData: kycFormQuery.data,
      currentLoanFormData: currentLoansFormQueryV2.data,
      operatingExpensesFormData: operatingExpensesFormQuery.data,
      confirmationFormData: confirmationFormQuery.data,
      financialFormData: financialFormQuery.data,
      businessModelFormData: businessModelFormQuery.data,
      productServiceFormData: productServiceFormQuery?.data,
      marketOpportunityFormData: marketOpportunityFormQuery.data,
      launchKCFitFormData: launchKCFitFormQuery.data,
      executionFormData: executionFormQuery.data,
      productModelFormData: businessModelFormQuery.data,
      preQualificationFormData: preQualificationFormQuery.data,
      expensePeopleFormData: expensePeopleFormQuery.data,
      fpOperatingExpensesFormData: fpOperatingExpensesFormQuery.data,
      debtFinancingFormData: debtFinancingFormQuery.data,
      debtFinancingLiabilityFormData: debtFinancingLiabilityFormQuery.data,
      forecastingSetup: formatForecastSetupResult(forecastingSetupQuery.data),
      revenueFormData: revenueFormQuery.data,
      loanApplicationDetails: loanApplicationDetailsQuery.data,
      kycDocuments: kycDocuments.data,
      financialDocuments: financialDocuments.data,
      businessDocumentsFormData: businessDocumentsUploadedFormQuery.data,
      financialStatementData: financialStatementQuery?.data,
      operatingExpensesCCFormData: operatingExpensesCCFormQuery.data,
      debtFinancingCCFormData: debtFinancingCCFormQuery.data,
      assetsCCFormData: assetsCCFormQuery.data,
      directCostsCCFormData: directCostsCCFormQuery.data,
      isFetchingDetails:
        loanApplicationDetailsQuery.isLoading ||
        loanRequestDetailQuery.isLoading ||
        kybFormQuery.isLoading ||
        kybFormQueryV2.isLoading ||
        kycFormQuery.isLoading ||
        kycFormQueryV2.isLoading ||
        confirmationFormQuery.isLoading ||
        financialFormQuery.isLoading ||
        currentLoansFormQueryV2.isLoading ||
        operatingExpensesFormQuery.isLoading ||
        kycDocuments.isLoading ||
        financialDocuments.isLoading ||
        executionFormQuery.isLoading ||
        productServiceFormQuery.isLoading ||
        marketOpportunityFormQuery.isLoading ||
        launchKCFitFormQuery.isLoading ||
        businessModelFormQuery.isLoading ||
        plaidItemIdsQuery.isLoading ||
        plaidConnectedInstitutionsQuery.isLoading ||
        expensePeopleFormQuery.isLoading ||
        fpOperatingExpensesFormQuery.isLoading ||
        forecastingSetupQuery.isLoading ||
        revenueFormQuery.isLoading ||
        debtFinancingFormQuery.isLoading ||
        debtFinancingLiabilityFormQuery.isLoading ||
        forecastingSetupQuery.isLoading ||
        financialStatementQuery.isLoading ||
        operatingExpensesCCFormQuery.isLoading ||
        debtFinancingCCFormQuery.isLoading ||
        assetsCCFormQuery.isLoading ||
        directCostsCCFormQuery.isLoading,
      isLoading: loanProgramQuery.isLoading
    }),
    [
      loanProgramInfo,
      loanProgramQuery.data,
      loanProgramQuery.isLoading,
      loanRequestDetailQuery.data,
      loanRequestDetailQuery.isLoading,
      kybFormQuery.data,
      kybFormQuery.isLoading,
      kycFormQuery.data,
      kycFormQuery.isLoading,
      currentLoansFormQueryV2.data,
      currentLoansFormQueryV2.isLoading,
      operatingExpensesFormQuery.data,
      operatingExpensesFormQuery.isLoading,
      confirmationFormQuery.data,
      confirmationFormQuery.isLoading,
      financialFormQuery.data,
      financialFormQuery.isLoading,
      businessModelFormQuery.data,
      businessModelFormQuery.isLoading,
      productServiceFormQuery?.data,
      productServiceFormQuery.isLoading,
      marketOpportunityFormQuery.data,
      marketOpportunityFormQuery.isLoading,
      launchKCFitFormQuery.data,
      launchKCFitFormQuery.isLoading,
      executionFormQuery.data,
      executionFormQuery.isLoading,
      preQualificationFormQuery.data,
      expensePeopleFormQuery.data,
      expensePeopleFormQuery.isLoading,
      fpOperatingExpensesFormQuery.data,
      fpOperatingExpensesFormQuery.isLoading,
      debtFinancingFormQuery.data,
      debtFinancingFormQuery.isLoading,
      debtFinancingLiabilityFormQuery.data,
      debtFinancingLiabilityFormQuery.isLoading,
      forecastingSetupQuery.data,
      forecastingSetupQuery.isLoading,
      revenueFormQuery.data,
      revenueFormQuery.isLoading,
      loanApplicationDetailsQuery.data,
      loanApplicationDetailsQuery.isLoading,
      kycDocuments.data,
      kycDocuments.isLoading,
      financialDocuments.data,
      financialDocuments.isLoading,
      businessDocumentsUploadedFormQuery.data,
      financialStatementQuery?.data,
      financialStatementQuery.isLoading,
      operatingExpensesCCFormQuery.data,
      operatingExpensesCCFormQuery.isLoading,
      debtFinancingCCFormQuery.data,
      debtFinancingCCFormQuery.isLoading,
      assetsCCFormQuery.data,
      assetsCCFormQuery.isLoading,
      directCostsCCFormQuery.data,
      directCostsCCFormQuery.isLoading,
      kybFormQueryV2.isLoading,
      kycFormQueryV2.isLoading,
      plaidItemIdsQuery.isLoading,
      plaidConnectedInstitutionsQuery.isLoading
    ]
  )

  switch (loanProgramQuery.data?.type) {
    case LoanType.MICRO:
      return (
        <MicroLoanBRLoanApplicationDetailsContext.Provider value={value}>
          {children}
        </MicroLoanBRLoanApplicationDetailsContext.Provider>
      )
    default:
      return (
        <MicroLoanBRLoanApplicationDetailsContext.Provider value={value}>
          {children}
        </MicroLoanBRLoanApplicationDetailsContext.Provider>
      )
  }
}
