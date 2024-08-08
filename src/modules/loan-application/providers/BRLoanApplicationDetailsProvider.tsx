import { MarketOpportunityFormResponse } from "@/modules/loan-application/components/organisms/loan-application-form/market-opportunity/type.ts"
import { useQueryMarketOpportunity } from "@/modules/loan-application/hooks/useQuery/useQueryMarketOpportunity.ts"
import { EDecisionStatus, EPersonaStatus } from "@/types/kyc"
import { UserMicroLoanApplication } from "@/types/loan-application.type"
import { LoanType, MicroLoanProgramType } from "@/types/loan-program.type"
import { IPlaidConnectedBankAccountsByApplicationIdGetResponse } from "@/types/plaid/response/PlaidConnectedBankAccountsByApplicationIdGetResponse"
import { isLaunchKC, isSbb } from "@/utils/domain.utils"
import {
  formsConfigurationEnabled,
  isEnablePandaDocESign
} from "@/utils/feature-flag.utils"
import { isEnableNewInquiryPersonaKycCreatingLogic } from "@/utils/feature-flag.utils.ts"
import _ from "lodash"
import { useCallback, useEffect, useMemo, useState } from "react"
import { useLocation, useParams } from "react-router-dom"
import { createContext } from "use-context-selector"
import {
  useLoanApplicationFormContext,
  useLoanApplicationProgressContext,
  useLoanProgramDetailContext,
  usePlaidContext
} from "."
import { BusinessModelFormResponse } from "../components/organisms/loan-application-form/business-model/type"
import { ExecutionFormResponse } from "../components/organisms/loan-application-form/execution/type"
import { LaunchKcFitFormResponse } from "../components/organisms/loan-application-form/launchkc-fit/type"
import { ProductServiceFormResponse } from "../components/organisms/loan-application-form/product-service/type"
import {
  BusinessDocumentsResponse,
  ConfirmationFormResponse,
  CurrentLoansInformationResponse,
  DocumentUploadedResponse,
  FinancialInformationResponse,
  KYBInformationResponse,
  KYCInformationResponse,
  LoanProgramData,
  OperatingExpensesInformationResponse,
  PreQualificationResponse
} from "../constants/type"
import { useGetLoanProgramDetail } from "../hooks/useGetLoanProgramDetail"
import { useGetESignDocument } from "../hooks/useQuery/form/useGetESignDocument"
import { useQueryBusinessModelForm } from "../hooks/useQuery/useQueryBusinessModelForm"
import { useQueryGetConfirmationForm } from "../hooks/useQuery/useQueryConfirmationForm"
import { useQueryGetCurrentLoansForm } from "../hooks/useQuery/useQueryCurrentLoansForm"
import { useQueryExecutionForm } from "../hooks/useQuery/useQueryExecutionForm"
import { useQueryGetFinancialForm } from "../hooks/useQuery/useQueryFinancialForm"
import { useQueryGetDocumentsByForm } from "../hooks/useQuery/useQueryGetDocuments"
import { useQueryGetIdentityVerification } from "../hooks/useQuery/useQueryGetIdentityVerification"
import { useQueryGetPlaidConnectedBankAccountsByApplicationId } from "../hooks/useQuery/useQueryGetPlaidConnectedBankAccountsByApplicationId"
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
  reverseFormatCurrentLoansForm,
  reverseFormatKybForm,
  reverseFormatKycForm,
  reverseFormatOperatingExpensesForm
} from "../services/form.services"
import { FORM_ACTION, FormStateType } from "./LoanApplicationFormProvider"
import { LOAN_PROGRESS_ACTION } from "./LoanProgressProvider"
import { useQueryBusinessDocuments } from "../hooks/useQuery/useQueryBusinessDocuments"
import { DocumentUploadsFormValue } from "../constants/form"

type BRLoanApplicationDetailsContext<T> = {
  loanProgramDetails?: T
  loanProgramInfo?: LoanProgramData
  kybFormData?: KYBInformationResponse
  kycFormData?: KYCInformationResponse
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
  plaidConnectedBankAccountsByApplicationId?: IPlaidConnectedBankAccountsByApplicationIdGetResponse
  isLoading: boolean
  isFetchingDetails: boolean
}

export const MicroLoanBRLoanApplicationDetailsContext = createContext<
  BRLoanApplicationDetailsContext<MicroLoanProgramType>
>({
  isLoading: false,
  isFetchingDetails: false
})

type Props = {
  children: React.ReactNode
}

export const BRLoanApplicationDetailsProvider: React.FC<Props> = ({
  children
}) => {
  const { state } = useLocation()

  const { loanProgramId, id: loanApplicationId } = useParams()
  const { dispatchProgress, isInitialized, progress, buildSpecificStep } =
    useLoanApplicationProgressContext()
  const { dispatchFormAction } = useLoanApplicationFormContext()
  const { dispatch: plaidDispatch } = usePlaidContext()
  const { loanProgramFormsConfiguration } = useLoanProgramDetailContext()

  const isEnabledQuery = (step: LOAN_APPLICATION_STEPS) =>
    progress.map((item) => item.step).includes(step)

  const loanProgramQuery = useQueryLoanProgramDetailsByType(
    state?.loanProgramDetails?.type ?? "",
    loanProgramId!
  )

  const [passPreQualification, setIsPassQualification] = useState(false)

  // Check if the user is qualified
  // Only check with LaunchKC
  const isQualified = isLaunchKC() ? passPreQualification : true

  const loanApplicationDetailsQuery = useQueryLoanApplicationDetailsByType(
    loanApplicationId!,
    loanProgramQuery.data?.type ?? LoanType.MICRO
  )
  const loanProgramInfo = useGetLoanProgramDetail(
    loanProgramQuery.data?.type ?? "",
    loanProgramQuery.data?.name
  )

  /**
   * Return the persona inquiry verification status for the loan application
   */
  const identityVerificationQuery = useQueryGetIdentityVerification(
    loanApplicationId!
  )

  /**
   * Return the document id for the loan application
   */
  const eSignQuery = useGetESignDocument({
    applicationId: loanApplicationId,
    enabled: !!loanApplicationId && isSbb() && isEnablePandaDocESign()
  })

  /**
   * Return the Plaid ItemIds
   */
  const plaidItemIdsQuery = useQueryGetPlaidItemIds({
    applicationId: loanApplicationId!,
    enabled: isEnabledQuery(LOAN_APPLICATION_STEPS.CASH_FLOW_VERIFICATION)
  })

  /**
   * Return Plaid connected bank accounts by application
   */
  const plaidConnectedAccountsQuery =
    useQueryGetPlaidConnectedBankAccountsByApplicationId({
      applicationId: loanApplicationId!,
      enabled: isEnabledQuery(LOAN_APPLICATION_STEPS.CASH_FLOW_VERIFICATION)
    })

  const kybFormQuery = useQueryGetKybForm({
    applicationId: loanApplicationId!,
    enabled: isEnabledQuery(LOAN_APPLICATION_STEPS.BUSINESS_INFORMATION)
  })
  const kycFormQuery = useQueryGetKycForm({
    applicationId: loanApplicationId!,
    enabled: isEnabledQuery(LOAN_APPLICATION_STEPS.OWNER_INFORMATION)
  })

  const confirmationFormQuery = useQueryGetConfirmationForm({
    applicationId: loanApplicationId!,
    enabled: isEnabledQuery(LOAN_APPLICATION_STEPS.CONFIRMATION)
  })

  const financialFormQuery = useQueryGetFinancialForm({
    applicationId: loanApplicationId!,
    enabled:
      isEnabledQuery(LOAN_APPLICATION_STEPS.FINANCIAL_INFORMATION) ||
      isEnabledQuery(LOAN_APPLICATION_STEPS.CASH_FLOW_VERIFICATION)
  })

  const currentLoansFormQuery = useQueryGetCurrentLoansForm({
    applicationId: loanApplicationId!,
    enabled: isEnabledQuery(LOAN_APPLICATION_STEPS.CURRENT_LOANS)
  })

  const operatingExpensesFormQuery = useQueryGetOperatingExpensesForm({
    applicationId: loanApplicationId!,
    enabled: isEnabledQuery(LOAN_APPLICATION_STEPS.OPERATING_EXPENSES)
  })

  const financialDocuments = useQueryGetDocumentsByForm(
    financialFormQuery.data?.id ?? ""
  )
  const kycDocuments = useQueryGetDocumentsByForm(kycFormQuery.data?.id ?? "")

  const preQualificationFormQuery = useQueryGetPreQualificationForm({
    applicationId: loanApplicationId!,
    enabled: isEnabledQuery(LOAN_APPLICATION_STEPS.PRE_QUALIFICATION)
  })

  const productServiceFormQuery = useQueryProductServiceForm({
    applicationId: loanApplicationId!,
    enabled: isEnabledQuery(LOAN_APPLICATION_STEPS.PRODUCT_SERVICE)
  })
  const marketOpportunityFormQuery = useQueryMarketOpportunity({
    applicationId: loanApplicationId!,
    enabled: isEnabledQuery(LOAN_APPLICATION_STEPS.MARKET_OPPORTUNITY)
  })

  const launchKCFitFormQuery = useQueryLaunchKCFitForm({
    applicationId: loanApplicationId!,
    enabled: isEnabledQuery(LOAN_APPLICATION_STEPS.LAUNCH_KC_FIT)
  })

  const executionFormQuery = useQueryExecutionForm({
    applicationId: loanApplicationId!,
    enabled: isEnabledQuery(LOAN_APPLICATION_STEPS.EXECUTION)
  })

  const businessModelFormQuery = useQueryBusinessModelForm({
    applicationId: loanApplicationId!,
    enabled: isEnabledQuery(LOAN_APPLICATION_STEPS.BUSINESS_MODEL)
  })

  const businessDocumentsUploadedFormQuery = useQueryBusinessDocuments({
    applicationId: loanApplicationId!,
    enabled: isEnabledQuery(LOAN_APPLICATION_STEPS.LAUNCH_KC_BUSINESS_DOCUMENTS)
  })

  const changeDataAndProgress = useCallback(
    (data: FormStateType, progress: LOAN_APPLICATION_STEPS) => {
      dispatchProgress({
        type: LOAN_PROGRESS_ACTION.CHANGE_PROGRESS,
        progress
      })
      dispatchFormAction({
        action: FORM_ACTION.SET_DATA,
        key: progress,
        state: data
      })
    },
    [dispatchProgress, dispatchFormAction]
  )

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
      changeDataAndProgress(
        reverseFormatKybForm(kybFormQuery.data),
        LOAN_APPLICATION_STEPS.BUSINESS_INFORMATION
      )
    }
  }, [
    changeDataAndProgress,
    formInConfigurations,
    isInitialized,
    isQualified,
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
    }
  }, [
    changeDataAndProgress,
    isInitialized,
    isQualified,
    loanApplicationDetailsQuery.data
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
          ...executionFormQuery.data,
          fundingSources: executionFormQuery.data.fundingSources.map(
            (value) => ({
              id: value.id,
              sourceType: value.sourceType,
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
      if (isEnableNewInquiryPersonaKycCreatingLogic()) {
        if (
          identityVerificationQuery.data?.personaStatus.toLowerCase() ===
            EPersonaStatus.COMPLETED.toLowerCase() ||
          identityVerificationQuery.data?.personaStatus.toLowerCase() ===
            EDecisionStatus.APPROVED.toLowerCase()
        ) {
          dispatchProgress({
            // turn on green tick
            type: LOAN_PROGRESS_ACTION.CHANGE_PROGRESS,
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
      } else {
        changeDataAndProgress(
          {
            smartKycId: identityVerificationQuery.data?.id,
            inquiryId: identityVerificationQuery.data.inquiryId,
            status: identityVerificationQuery.data.personaStatus?.toLowerCase()
          },
          LOAN_APPLICATION_STEPS.IDENTITY_VERIFICATION
        )
      }
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
    if (plaidConnectedAccountsQuery.data?.data?.institutions) {
      // group the same institution
      const connectedBankAccountsGroup = _.groupBy(
        plaidConnectedAccountsQuery.data?.data?.institutions,
        "institutionId"
      )

      const institutions = Object.entries(connectedBankAccountsGroup).map(
        ([insId, connectedBankAccounts]) => ({
          institutionId: insId,
          institutionName: connectedBankAccounts[0].institutionName,
          itemId: connectedBankAccounts[0].itemId,
          accounts: connectedBankAccounts.flatMap(({ accounts }) => accounts)
        })
      )
      plaidDispatch({
        type: "SET_STATE",
        state: {
          institutions: institutions ?? []
        }
      })
    }
  }, [plaidConnectedAccountsQuery.data?.data?.institutions, plaidDispatch])
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
        type: LOAN_PROGRESS_ACTION.CHANGE_PROGRESS,
        progress: LOAN_APPLICATION_STEPS.REVIEW_APPLICATION
      })
    }
  }, [
    dispatchFormAction,
    dispatchProgress,
    eSignQuery.data?.documentId,
    isInitialized
  ])

  const value = useMemo(
    () => ({
      loanProgramInfo,
      loanProgramDetails: loanProgramQuery.data,
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
      loanApplicationDetails: loanApplicationDetailsQuery.data,
      kycDocuments: kycDocuments.data,
      financialDocuments: financialDocuments.data,
      businessDocumentsFormData: businessDocumentsUploadedFormQuery.data,
      plaidConnectedBankAccountsByApplicationId:
        plaidConnectedAccountsQuery.data?.data,
      isFetchingDetails:
        loanApplicationDetailsQuery.isLoading ||
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
        plaidConnectedAccountsQuery.isLoading,
      isLoading: loanProgramQuery.isLoading
    }),
    [
      loanProgramInfo,
      loanProgramQuery.data,
      loanProgramQuery.isLoading,
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
      loanApplicationDetailsQuery.data,
      loanApplicationDetailsQuery.isLoading,
      kycDocuments.data,
      kycDocuments.isLoading,
      financialDocuments.data,
      financialDocuments.isLoading,
      businessDocumentsUploadedFormQuery.data,
      plaidConnectedAccountsQuery.data?.data,
      plaidConnectedAccountsQuery.isLoading,
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
