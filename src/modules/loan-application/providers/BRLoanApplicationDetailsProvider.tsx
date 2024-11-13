import { type MarketOpportunityFormResponse } from "@/modules/loan-application/components/organisms/loan-application-form/market-opportunity/type.ts"
import { useGetFinancialProjectForms } from "@/modules/loan-application/hooks/useGetFinancialProjectForms"
import { useQueryMarketOpportunity } from "@/modules/loan-application/hooks/useQuery/useQueryMarketOpportunity.ts"
import { useQuerySbbDocumentForm } from "@/modules/loan-application/hooks/useQuery/useQuerySbbDocumentForm.ts"
import { EDecisionStatus, EPersonaStatus } from "@/types/kyc"
import { type UserMicroLoanApplication } from "@/types/loan-application.type"
import { LoanType, type MicroLoanProgramType } from "@/types/loan-program.type"
import { isLaunchKC, isLoanReady, isSbb } from "@/utils/domain.utils"
import {
  formsConfigurationEnabled,
  isEnablePandaDocESign
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
import { type BusinessModelFormResponse } from "../components/organisms/loan-application-form/business-model/type"
import { type LaunchKcFitFormResponse } from "../components/organisms/loan-application-form/custom-form/launchkc/launchkc-fit/type"
import { transformExecutionResponseToForm } from "../components/organisms/loan-application-form/execution/constants"
import { type ExecutionFormResponse } from "../components/organisms/loan-application-form/execution/type"
import { type ProductServiceFormResponse } from "../components/organisms/loan-application-form/product-service/type"
import { type DocumentUploadsFormValue } from "../constants/form"
import {
  type BusinessDocumentsResponse,
  type ConfirmationFormResponse,
  type CurrentLoansInformationResponse,
  type DocumentUploadedResponse,
  type FinancialInformationResponse,
  type KYBInformationResponse,
  type KYCInformationResponse,
  type LoanProgramData,
  type OperatingExpensesInformationResponse,
  type PreQualificationResponse
} from "../constants/type"
import { useGetLoanProgramDetail } from "../hooks/useGetLoanProgramDetail"
import { useGetESignDocument } from "../hooks/useQuery/form/useGetESignDocument"
import { useQueryBusinessDocuments } from "../hooks/useQuery/useQueryBusinessDocuments"
import { useQueryBusinessModelForm } from "../hooks/useQuery/useQueryBusinessModelForm"
import { useQueryGetConfirmationForm } from "../hooks/useQuery/useQueryConfirmationForm"
import { useQueryGetCurrentLoansForm } from "../hooks/useQuery/useQueryCurrentLoansForm"
import { useQueryExecutionForm } from "../hooks/useQuery/useQueryExecutionForm"
import { useQueryGetFinancialForm } from "../hooks/useQuery/useQueryFinancialForm"
import { useQueryGetDocumentsByForm } from "../hooks/useQuery/useQueryGetDocuments"
import { useQueryGetIdentityVerification } from "../hooks/useQuery/useQueryGetIdentityVerification"
import { useGetPlaidConnectedInstitutions } from "../hooks/useQuery/useQueryGetPlaidConnectedBankAccountsByApplicationId"
import { useQueryGetPlaidItemIds } from "../hooks/useQuery/useQueryGetPlaidItemIds"
import { useQueryGetKybForm } from "../hooks/useQuery/useQueryKybForm"
import { useQueryGetKycForm } from "../hooks/useQuery/useQueryKycForm"
import { useQueryLaunchKCFitForm } from "../hooks/useQuery/useQueryLaunchKCFitForm"
import { useQueryLoanProgramDetailsByType } from "../hooks/useQuery/useQueryLoanProgramDetails"
import { useQueryGetOperatingExpensesForm } from "../hooks/useQuery/useQueryOperatingExpensesForm"
import { useQueryGetPreQualificationForm } from "../hooks/useQuery/useQueryPreQualificationForm"
import { useQueryProductServiceForm } from "../hooks/useQuery/useQueryProductServiceForm"
import { useQueryLoanApplicationDetailsByType } from "../hooks/useQuery/useQueryUserLoanApplicationDetails"
import {
  FORM_TYPE,
  LOAN_APPLICATION_STEPS
} from "../models/LoanApplicationStep/type"
import {
  mapMetadataToLoanRequest,
  reverseFormatCurrentLoansForm,
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
import {
  type LoanRequestV2Response,
  useQueryLoanRequestForm
} from "../hooks/loanrequest/useQueryLoanRequest"
import { get } from "lodash"

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
  currentLoanFormData?: CurrentLoansInformationResponse
  operatingExpensesFormData?: OperatingExpensesInformationResponse
  confirmationFormData?: ConfirmationFormResponse
  financialFormData?: FinancialInformationResponse
  productServiceFormData?: ProductServiceFormResponse
  marketOpportunityFormData?: MarketOpportunityFormResponse
  launchKCFitFormData?: LaunchKcFitFormResponse
  executionFormData?: ExecutionFormResponse
  businessModelFormData?: BusinessModelFormResponse
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
    state?.loanProgramDetails?.type ?? "",
    loanProgramId!
  )

  const isSbbTenant = isSbb()

  const [passPreQualification, setIsPassQualification] = useState(false)

  // Check if the user is qualified
  // Only check with LaunchKC
  const isQualified = isLaunchKC() ? passPreQualification : true

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
    enabled: !!loanApplicationId && !isLoanReady()
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
  const kycFormQuery = useQueryGetKycForm({
    applicationId: loanApplicationId!,
    enabled: isEnabledQuery(LOAN_APPLICATION_STEPS.OWNER_INFORMATION, progress)
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

  const currentLoansFormQuery = useQueryGetCurrentLoansForm({
    applicationId: loanApplicationId!,
    enabled: isEnabledQuery(LOAN_APPLICATION_STEPS.CURRENT_LOANS, progress)
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
  const marketOpportunityFormQuery = useQueryMarketOpportunity({
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

      setIsPassQualification(true)
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
  // KYC Form
  useEffect(() => {
    if (
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
      currentLoansFormQuery.data &&
      formInConfigurations(FORM_TYPE.CURRENT_LOAN) &&
      isInitialized &&
      isQualified
    ) {
      changeDataAndProgress(
        reverseFormatCurrentLoansForm(currentLoansFormQuery.data),
        LOAN_APPLICATION_STEPS.CURRENT_LOANS
      )
    }
  }, [
    changeDataAndProgress,
    currentLoansFormQuery.data,
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
    if (loanApplicationDetailsQuery.data && isInitialized && isQualified) {
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
      if (isSbbTenant) {
        setupPreApplicationDisclosures()
      }
    }
  }, [
    changeDataAndProgress,
    isInitialized,
    isQualified,
    isSbbTenant,
    loanApplicationDetailsQuery.data,
    setupPreApplicationDisclosures
  ])

  // Loan Request Form V2
  useEffect(() => {
    if (loanRequestDetailQuery.data && isInitialized && isQualified) {
      changeDataAndProgress(
        {
          // Loan Request has only one form
          id: get(loanRequestDetailQuery.data, "forms[0].id", "") ?? "",
          applicationId: loanRequestDetailQuery?.data?.applicationId ?? "",
          ...mapMetadataToLoanRequest(
            get(loanRequestDetailQuery.data, "forms[0].metadata", {}) ?? {}
          )
        },
        LOAN_APPLICATION_STEPS.LOAN_REQUEST_V2
      )
    }
  }, [
    changeDataAndProgress,
    isInitialized,
    isQualified,
    loanRequestDetailQuery.data
  ])

  // Product Service Form
  useEffect(() => {
    if (productServiceFormQuery.data && isInitialized && isQualified) {
      changeDataAndProgress(
        {
          id: productServiceFormQuery.data.id,
          loanApplicationId: productServiceFormQuery.data.loanApplicationId,
          businessType: productServiceFormQuery.data.businessType,
          solutionFocus: productServiceFormQuery.data.solutionFocus,
          businessValue: productServiceFormQuery.data.businessValue,
          proofOfMarket: productServiceFormQuery.data.proofOfMarket,
          intellectualProperty:
            productServiceFormQuery.data.intellectualProperty
        },
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
        marketOpportunityFormQuery.data,
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
        launchKCFitFormQuery.data,
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
        businessModelFormQuery.data,
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
        {
          ...transformExecutionResponseToForm(executionFormQuery.data),
          fundingSources: executionFormQuery.data.fundingSources.map(
            (value) => ({
              id: value.id,
              sourceType: value.sourceType,
              // eslint-disable-next-line @typescript-eslint/no-useless-template-literals
              amount: `${value.amount}`
            })
          )
        },
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
    }
  }, [plaidDispatch, plaidItemIdsQuery.data?.data])

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
  }, [plaidConnectedInstitutionsQuery.data, plaidDispatch])
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
   * Handle SBB document query
   * */
  useEffect(() => {
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

  const value = useMemo(
    () => ({
      loanProgramInfo,
      loanProgramDetails: loanProgramQuery.data,
      loanRequestFormV2Data: loanRequestDetailQuery.data,
      kybFormData: kybFormQuery.data,
      kycFormData: kycFormQuery.data,
      currentLoanFormData: currentLoansFormQuery.data,
      operatingExpensesFormData: operatingExpensesFormQuery.data,
      confirmationFormData: confirmationFormQuery.data,
      financialFormData: financialFormQuery.data,
      businessModelFormData: businessModelFormQuery.data,
      productServiceFormData: productServiceFormQuery.data,
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
      isFetchingDetails:
        loanApplicationDetailsQuery.isLoading ||
        loanRequestDetailQuery.isLoading ||
        kybFormQuery.isLoading ||
        kycFormQuery.isLoading ||
        confirmationFormQuery.isLoading ||
        financialFormQuery.isLoading ||
        currentLoansFormQuery.isLoading ||
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
        financialStatementQuery.isLoading,
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
      currentLoansFormQuery.data,
      currentLoansFormQuery.isLoading,
      operatingExpensesFormQuery.data,
      operatingExpensesFormQuery.isLoading,
      confirmationFormQuery.data,
      confirmationFormQuery.isLoading,
      financialFormQuery.data,
      financialFormQuery.isLoading,
      businessModelFormQuery.data,
      businessModelFormQuery.isLoading,
      productServiceFormQuery.data,
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
      plaidConnectedInstitutionsQuery.isLoading,
      financialStatementQuery?.data,
      financialStatementQuery.isLoading,
      plaidItemIdsQuery.isLoading
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
