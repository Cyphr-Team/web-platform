import { revertPattern } from "@/components/ui/mask-input"
import { APP_PATH } from "@/constants"
import { loanApplicationUserKeys } from "@/constants/query-key"
import { TOAST_MSG } from "@/constants/toastMsg"
import { type DirectCostsFormValue } from "@/modules/loan-application/[module]-financial-projection/components/store/direct-costs-store"
import { type AssetsFormValue } from "@/modules/loan-application/[module]-financial-projection/components/store/fp-assets-store"
import { type DebtFinancingFormValue } from "@/modules/loan-application/[module]-financial-projection/components/store/fp-debt-financing"
import { type FpEquityFinancingFormValue } from "@/modules/loan-application/[module]-financial-projection/components/store/fp-equity-store"
import { type ExpenseTaxRateFormValue } from "@/modules/loan-application/[module]-financial-projection/components/store/fp-expense-tax-rate-store"
import { type FpOperatingExpensesFormValue } from "@/modules/loan-application/[module]-financial-projection/components/store/fp-operating-expenses-store"
import { type PeopleFormValue } from "@/modules/loan-application/[module]-financial-projection/components/store/fp-people-expenses-store"
import { type ForecastingSetupFormValue } from "@/modules/loan-application/[module]-financial-projection/types/forecasting-form.ts"
import { type RevenueStream } from "@/modules/loan-application/[module]-financial-projection/types/revenue-form.ts"
import { type ArticlesOfOrganizationFormValue } from "@/modules/loan-application/components/organisms/loan-application-form/custom-form/sbb/ArticlesOfOrganizationForm.tsx"
import { type BusinessEinLetterFormValue } from "@/modules/loan-application/components/organisms/loan-application-form/custom-form/sbb/BusinessEinLetterForm.tsx"
import { type ByLawsFormValue } from "@/modules/loan-application/components/organisms/loan-application-form/custom-form/sbb/ByLawsForm.tsx"
import { type CertificateGoodStandingFormValue } from "@/modules/loan-application/components/organisms/loan-application-form/custom-form/sbb/CertificateGoodStandingForm.tsx"
import { type FictitiousNameCertificationFormValue } from "@/modules/loan-application/components/organisms/loan-application-form/custom-form/sbb/FictitiousNameCertification.tsx"
import { useSubmitMarketOpportunity } from "@/modules/loan-application/hooks/useForm/useSubmitMarketOpportunity.ts"
import { useUploadSbbDocument } from "@/modules/loan-application/hooks/useForm/useSubmitSbbDocument.ts"
import { useSubmitFinancialProjectionForms } from "@/modules/loan-application/hooks/useSubmitFinancialProjectionForms"
import { toastError, toastSuccess } from "@/utils"
import { ErrorCode, getAxiosError } from "@/utils/custom-error"
import { isLoanReady, isSbb } from "@/utils/domain.utils"
import {
  isEnableFormV2,
  isEnablePandaDocESign
} from "@/utils/feature-flag.utils"
import { useQueryClient } from "@tanstack/react-query"
import { type AxiosError, isAxiosError } from "axios"
import { type Dispatch, useCallback } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { type BusinessModelFormResponse } from "../components/organisms/loan-application-form/business-model/type"
import { type LaunchKcFitFormResponse } from "../components/organisms/loan-application-form/custom-form/launchkc/launchkc-fit/type"
import { transformExecutionResponseToForm } from "../components/organisms/loan-application-form/execution/constants"
import { type ExecutionFormResponse } from "../components/organisms/loan-application-form/execution/type"
import {
  type SbbKybFormPartOneValue,
  type SbbKybFormPartTwoValue
} from "../components/organisms/loan-application-form/kyb/sbb/const"
import { type MarketOpportunityFormResponse } from "../components/organisms/loan-application-form/market-opportunity/type"
import { type ProductServiceFormResponse } from "../components/organisms/loan-application-form/product-service/type"
import type {
  ILoanRequestFormValue,
  BusinessModelFormValue,
  ConfirmationFormValue,
  CurrentLoansFormValue,
  DocumentUploadsFormValue,
  ESignFormValue,
  ExecutionFormValue,
  FinancialFormValue,
  IBusinessFormValue,
  IdentityVerificationValue,
  IOwnerFormValue,
  LaunchKCFitFormValue,
  LoanRequestFormValue,
  MarketOpportunityFormValue,
  OperatingExpensesFormValue,
  ProductServiceFormValue
} from "../constants/form"
import {
  type CurrentLoansInformationResponse,
  type FinancialInformationResponse,
  type KYBInformationResponse,
  type KYCInformationResponse,
  type OperatingExpensesInformationResponse
} from "../constants/type"
import { useSubmitLoanIdentityVerification } from "../hooks/useForm/submitLoanIdentityVerification"
import { useSubmitLoanBusinessModelForm } from "../hooks/useForm/useSubmitBusinessModelForm"
import { useSubmitCurrentLoansForm } from "../hooks/useForm/useSubmitCurrentLoansForm"
import { useSubmitESignDocument } from "../hooks/useForm/useSubmitESignDocument"
import { useSubmitExecutionForm } from "../hooks/useForm/useSubmitExecutionForm"
import { useSubmitLoanLaunchKCFitForm } from "../hooks/useForm/useSubmitLaunchKCFitForm"
import { useSubmitLinkPlaidItemIds } from "../hooks/useForm/useSubmitLinkPlaidItemIds"
import { useSubmitLoanConfirmationForm } from "../hooks/useForm/useSubmitLoanConfirmationForm"
import { useSubmitLoanFinancialForm } from "../hooks/useForm/useSubmitLoanFinancialForm"
import { useSubmitLoanKYBForm } from "../hooks/useForm/useSubmitLoanKYBForm"
import { useSubmitLoanKYCForm } from "../hooks/useForm/useSubmitLoanKYCForm"
import { useSubmitMicroLoanRequestForm } from "../hooks/useForm/useSubmitLoanRequest"
import { useSubmitOperatingExpensesForm } from "../hooks/useForm/useSubmitOperatingExpensesForm"
import { useSubmitLoanProductServiceForm } from "../hooks/useForm/useSubmitProductServiceForm"
import { useSubmitSbbLoanKYBForm } from "../hooks/useForm/useSubmitSbbLoanKybForm"
import { useUploadBusinessDocuments } from "../hooks/useForm/useUploadBusinessDocuments"
import { useUploadFormDocuments } from "../hooks/useForm/useUploadFormDocuments"
import {
  FORM_TYPE,
  type ILoanApplicationStep,
  LOAN_APPLICATION_STEP_STATUS,
  LOAN_APPLICATION_STEPS
} from "../models/LoanApplicationStep/type"
import { usePlaidContext } from "../providers"
import {
  type Action,
  FORM_ACTION,
  type FormStateType
} from "../providers/LoanApplicationFormProvider"
import {
  mapLoanRequestDataToV2,
  reverseFormatKybForm,
  reverseFormatKycForm
} from "./form.services"
import { type FinancialStatementFormValue } from "@/modules/loan-application/[module]-financial-projection/components/store/financial-statement-store"
import { useMutateLoanRequest } from "../hooks/loanrequest/useSubmitLoanRequest"

export const useSubmitLoanForm = (
  dispatchFormAction: Dispatch<Action>,
  progress: ILoanApplicationStep[],
  loanRequestData: LoanRequestFormValue,
  loanRequestV2Data: ILoanRequestFormValue,
  businessData: IBusinessFormValue,
  ownerData: IOwnerFormValue,
  financialData: FinancialFormValue,
  currentLoansData: CurrentLoansFormValue,
  operatingExpensesData: OperatingExpensesFormValue,
  confirmationData: ConfirmationFormValue,
  cashflowData: FinancialFormValue,
  identityVerificationData: IdentityVerificationValue,
  productServiceData: ProductServiceFormValue,
  launchKCFitData: LaunchKCFitFormValue,
  executionData: ExecutionFormValue,
  businessModelData: BusinessModelFormValue,
  marketOpportunityData: MarketOpportunityFormValue,
  eSignData: ESignFormValue,
  documentUploadsData: DocumentUploadsFormValue,
  articlesOfOrganizationData: ArticlesOfOrganizationFormValue,
  businessEinLetterData: BusinessEinLetterFormValue,
  byLawsData: ByLawsFormValue,
  certificateGoodStandingData: CertificateGoodStandingFormValue,
  fictitiousNameCertificationData: FictitiousNameCertificationFormValue,
  plaidItemIds: string[],
  // SBB KYB
  sbbKybFormData: SbbKybFormPartOneValue & SbbKybFormPartTwoValue,
  // Financial Projection
  peopleFormData: PeopleFormValue,
  fpOperatingExpensesData: FpOperatingExpensesFormValue,
  forecastingSetupData: ForecastingSetupFormValue,
  directCostsData: DirectCostsFormValue,
  equityFinancingData: FpEquityFinancingFormValue,
  assetsData: AssetsFormValue,
  taxRateData: ExpenseTaxRateFormValue,
  revenueData: RevenueStream,
  debtFinancingData: DebtFinancingFormValue,
  financialStatementData: FinancialStatementFormValue
) => {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const { loanProgramId } = useParams()
  const { dispatch: plaidDispatch } = usePlaidContext()

  const updateDataAfterSubmit = (
    data: FormStateType,
    key: LOAN_APPLICATION_STEPS
  ) => {
    dispatchFormAction({
      action: FORM_ACTION.UPDATE_DATA,
      key: key,
      state: {
        ...data
      }
    })
  }

  /**
   * Mutate action for submitting Plaid's itemId Clash flow verification
   */
  const updatePlaidItemIds = (plaidItemIds: string[]) => {
    plaidDispatch({
      type: "SET_STATE",
      state: {
        fetchedItemIds: plaidItemIds,
        itemIds: [] // Reset itemIds after submit to avoid duplicate
      }
    })
  }

  const { submitLinkPlaidItemds, isLoading: isSubmitLinkPlaidItemIds } =
    useSubmitLinkPlaidItemIds({ plaidItemIds, onSuccess: updatePlaidItemIds })

  /**
   * Mutate action for submitting Persona's inquiry KYC
   */
  const {
    submitLoanIdentityVerification,
    isLoading: isSubmittingIdentityVerification
  } = useSubmitLoanIdentityVerification(identityVerificationData, (data) => {
    if (data.inquiryId && data.personaStatus)
      updateDataAfterSubmit(
        {
          smartKycId: data?.id,
          inquiryId: data?.inquiryId,
          status: data?.personaStatus?.toLowerCase()
        },
        LOAN_APPLICATION_STEPS.IDENTITY_VERIFICATION
      )
  })

  /**
   * Mutate action for submitting E Sign document - PandaDoc
   */
  const { submitESignDocument, isLoading: isSubmittingESignDocument } =
    useSubmitESignDocument(eSignData)

  // SBB KYB
  const updateSbbKYBData = (data: KYBInformationResponse) =>
    updateDataAfterSubmit(
      reverseFormatKybForm(data),
      LOAN_APPLICATION_STEPS.BUSINESS_INFORMATION
    )
  const { submitSbbLoanKYBForm, isLoading: isSubmittingSbbKYB } =
    useSubmitSbbLoanKYBForm({
      rawData: {
        ...sbbKybFormData,
        businessTin: revertPattern(sbbKybFormData?.businessTin ?? "")
      },
      onSuccess: updateSbbKYBData
    })

  // KYB
  const updateKYBData = (data: KYBInformationResponse) =>
    updateDataAfterSubmit(
      reverseFormatKybForm(data),
      LOAN_APPLICATION_STEPS.BUSINESS_INFORMATION
    )
  const { submitLoanKYBForm, isLoading: isSubmittingKYB } =
    useSubmitLoanKYBForm({
      rawData: {
        ...businessData,
        businessTin: revertPattern(businessData?.businessTin ?? "")
      },
      onSuccess: updateKYBData
    })
  // KYC
  const updateKYCData = (data: KYCInformationResponse) =>
    updateDataAfterSubmit(
      reverseFormatKycForm(data),
      LOAN_APPLICATION_STEPS.OWNER_INFORMATION
    )

  const { submitLoanKYCForm, isLoading: isSubmittingKYC } =
    useSubmitLoanKYCForm({
      rawData: ownerData,
      onSuccess: updateKYCData
    })

  const { submitLoanRequestForm, isLoading: isSubmittingLoanRequest } =
    useSubmitMicroLoanRequestForm(
      loanRequestData,
      loanRequestData?.id ?? "",
      loanProgramId
    )

  /**
   * Loan Request V2
   */
  const updateLoanRequestData = (loanRequestData: ILoanRequestFormValue) =>
    updateDataAfterSubmit(
      {
        ...loanRequestData
      },
      LOAN_APPLICATION_STEPS.LOAN_REQUEST_V2
    )
  const { mutateLoanRequest, isSubmittingLoanRequestV2 } = useMutateLoanRequest(
    {
      applicationId: loanRequestV2Data?.applicationId ?? "",
      formId: loanRequestV2Data?.id ?? "",
      metadata: mapLoanRequestDataToV2(loanRequestV2Data),
      onSuccess: updateLoanRequestData
    }
  )

  const updateFinancialData = (data: FinancialInformationResponse) =>
    updateDataAfterSubmit(
      {
        id: data.id,
        incomeCategories: data.incomeCategories ?? [],
        w2sFile: []
      },
      LOAN_APPLICATION_STEPS.FINANCIAL_INFORMATION
    )

  const updateCashFlowData = (data: FinancialInformationResponse) =>
    updateDataAfterSubmit(
      {
        id: data.id,
        incomeCategories: data.incomeCategories ?? [],
        w2sFile: []
      },
      LOAN_APPLICATION_STEPS.CASH_FLOW_VERIFICATION
    )
  const { submitLoanFinancialForm, isLoading: isSubmittingFinancial } =
    useSubmitLoanFinancialForm({
      rawData: financialData,
      onSuccess: updateFinancialData
    })

  const {
    submitLoanFinancialForm: submitCashFlowForm,
    isLoading: isSubmittingCashFlow
  } = useSubmitLoanFinancialForm({
    rawData: cashflowData,
    onSuccess: updateCashFlowData
  })

  // Market Opportunity
  const updateMarketOpportunityData = (data: MarketOpportunityFormResponse) =>
    updateDataAfterSubmit(data, LOAN_APPLICATION_STEPS.MARKET_OPPORTUNITY)

  const {
    submitLoanMarketOpportunity,
    isLoading: isSubmitLoanMarketOpportunity
  } = useSubmitMarketOpportunity({
    rawData: marketOpportunityData,
    onSuccess: updateMarketOpportunityData
  })

  // Current Loans
  const updateCurrentLoansData = (data: CurrentLoansInformationResponse) =>
    updateDataAfterSubmit(
      {
        hasOutstandingLoans: data.currentLoanForms?.length ? "true" : "",
        currentLoans: data.currentLoanForms
      },
      LOAN_APPLICATION_STEPS.CURRENT_LOANS
    )

  const { submitCurrentLoansForm, isLoading: isSubmittingCurrentLoans } =
    useSubmitCurrentLoansForm({
      rawData: currentLoansData,
      onSuccess: updateCurrentLoansData
    })

  // Operating Expenses
  const updateExpensesData = (data: OperatingExpensesInformationResponse) =>
    updateDataAfterSubmit(data, LOAN_APPLICATION_STEPS.OPERATING_EXPENSES)

  const {
    submitOperatingExpensesForm,
    isLoading: isSubmittingOperatingExpenses
  } = useSubmitOperatingExpensesForm({
    rawData: operatingExpensesData,
    onSuccess: updateExpensesData
  })

  // Product Service
  const updateProductServiceData = (data: ProductServiceFormResponse) =>
    updateDataAfterSubmit(data, LOAN_APPLICATION_STEPS.PRODUCT_SERVICE)
  const { submitProductServiceForm, isLoading: isSubmittingProductService } =
    useSubmitLoanProductServiceForm({
      rawData: productServiceData,
      onSuccess: updateProductServiceData
    })

  // Launch KC Fit
  const updateLaunchKCFitData = (data: LaunchKcFitFormResponse) =>
    updateDataAfterSubmit(data, LOAN_APPLICATION_STEPS.LAUNCH_KC_FIT)
  const { submitLoanLaunchKCFitForm, isLoading: isSubmittingLaunchKCFit } =
    useSubmitLoanLaunchKCFitForm({
      rawData: launchKCFitData,
      onSuccess: updateLaunchKCFitData
    })

  // Execution
  const updateLoanExecutionData = (data: ExecutionFormResponse) =>
    updateDataAfterSubmit(
      transformExecutionResponseToForm(data),
      LOAN_APPLICATION_STEPS.EXECUTION
    )

  const { submitLoanExecutionForm, isLoading: isSubmittingExecution } =
    useSubmitExecutionForm({
      rawData: executionData,
      onSuccess: updateLoanExecutionData
    })

  // Business Model
  const updateLoanBusinessModelData = (data: BusinessModelFormResponse) =>
    updateDataAfterSubmit(data, LOAN_APPLICATION_STEPS.BUSINESS_MODEL)

  const { submitLoanBusinessModelForm, isLoading: isSubmittingBusinessModel } =
    useSubmitLoanBusinessModelForm({
      rawData: businessModelData,
      onSuccess: updateLoanBusinessModelData
    })

  const { submitLoanConfirmationForm, isLoading: isSubmittingConfirmation } =
    useSubmitLoanConfirmationForm(confirmationData)

  const { submitSbbDocument, isLoading: isSubmittingSbbDocument } =
    useUploadSbbDocument({
      articlesOfOrganizationData,
      businessEinLetterData,
      byLawsData,
      certificateGoodStandingData,
      fictitiousNameCertificationData
    })

  const { uploadDocuments, isUploading } = useUploadFormDocuments()

  const { uploadBusinessDocuments, isUploading: isUploadingBusinessDocuments } =
    useUploadBusinessDocuments((data) =>
      updateDataAfterSubmit(
        {
          id: data.id,
          uploadedExecutiveSummary: [data.executiveSummary],
          uploadedPitchDesk: [data.pitchDeck]
        } as DocumentUploadsFormValue,
        LOAN_APPLICATION_STEPS.LAUNCH_KC_BUSINESS_DOCUMENTS
      )
    )

  /**
   * Financial Projection Forms
   **/
  const { handleSubmitFinancialProjection, isSubmittingFinancialProjection } =
    useSubmitFinancialProjectionForms({
      peopleFormData,
      fpOperatingExpensesData,
      forecastingSetupData,
      directCostsData,
      equityFinancingData,
      assetsData,
      taxRateData,
      revenueData,
      debtFinancingData,
      financialStatementData
    })

  const handleSubmitFormSuccess = useCallback(
    (isUpdated: boolean, isSubmitted: boolean, applicationId?: string) => {
      if (isSubmitted) {
        toastSuccess({
          title: TOAST_MSG.loanApplication.submitSuccess.title,
          description: TOAST_MSG.loanApplication.submitSuccess.description
        })
        // Navigate to submission page with applicationId
        let navigateLink = APP_PATH.LOAN_APPLICATION.SUBMISSION

        /**
         * Note:
         * - SBB_Subdomain has integrated PandaDoc so it requires documentId
         * - LoanReady_Subdomain has also integrated PandaDoc but the Financial Projection is overwritten the logic
         */
        if (eSignData?.documentId) {
          navigateLink = `${navigateLink}?documentId=${eSignData.documentId}`
        }
        navigate(navigateLink, {
          state: {
            applicationId: applicationId,
            businessName: businessData?.businessLegalName,
            loanProgramId: loanProgramId
          }
        })
      } else {
        if (!isUpdated) {
          toastSuccess({
            title: TOAST_MSG.loanApplication.createSuccess.title,
            description: TOAST_MSG.loanApplication.createSuccess.description
          })
        } else {
          toastSuccess({
            title: TOAST_MSG.loanApplication.updateSuccess.title,
            description: TOAST_MSG.loanApplication.updateSuccess.description
          })
        }
        navigate(APP_PATH.LOAN_APPLICATION.APPLICATIONS.index)
      }
    },
    [
      businessData?.businessLegalName,
      eSignData?.documentId,
      loanProgramId,
      navigate
    ]
  )

  const handleSubmitFormError = useCallback(
    (error: AxiosError) => {
      const message = getAxiosError(error)?.message
      const code = getAxiosError(error)?.code

      toastError({
        title: TOAST_MSG.loanApplication.submitError.title,
        description: message?.length
          ? message
          : TOAST_MSG.loanApplication.submitError.description
      })
      if (code == ErrorCode.institution_subscription_limit_reached) {
        // Wait for 2 seconds before navigating
        setTimeout(() => {
          navigate(APP_PATH.LOAN_APPLICATION.APPLICATIONS.index)
        }, 2000)
      }
    },
    [navigate]
  )

  const isCompleteSteps = useCallback(
    (step: LOAN_APPLICATION_STEPS) =>
      progress.find((item) => item.step === step)?.status ===
      LOAN_APPLICATION_STEP_STATUS.COMPLETE,
    [progress]
  )
  /**
   * V0: Submit form one by one
   * V1: Submit all forms in parallel
   * This is the V1 version
   */
  const submitLoanForm = useCallback(async () => {
    try {
      // Submit loan request form
      const { data } = await submitLoanRequestForm()

      // TODO(): rename loanRequestId to applicationId
      const loanRequestId = data.id // Loan Application ID

      if (loanRequestId) {
        dispatchFormAction({
          action: FORM_ACTION.UPDATE_DATA,
          key: LOAN_APPLICATION_STEPS.LOAN_REQUEST,
          state: {
            ...data,
            applicationId: data.id
          }
        })
      }

      let isSubmitted = false

      const submitPromises = []

      /**
       * Submit Loan Request v2
       * Loan Request is now treated as a separate form
       */
      if (
        isEnableFormV2() &&
        loanRequestData &&
        isCompleteSteps(LOAN_APPLICATION_STEPS.LOAN_REQUEST)
      ) {
        submitPromises.push(mutateLoanRequest(loanRequestId))
      }

      // Submit identity verification - Link inquiry id
      if (identityVerificationData?.inquiryId) {
        // Only handle if this application haven't linked before - 1 application only link once
        if (!identityVerificationData?.smartKycId) {
          submitPromises.push(submitLoanIdentityVerification(loanRequestId))
        }
      }

      // Submit e sign document - Link document id
      if (
        eSignData?.documentId &&
        isEnablePandaDocESign() &&
        (isSbb() || isLoanReady())
      ) {
        submitPromises.push(submitESignDocument(loanRequestId))
      }

      // Submit Plaid's itemId Clash flow verification
      if (plaidItemIds?.length) {
        submitPromises.push(submitLinkPlaidItemds(loanRequestId))
      }

      // Submit KYB form
      if (
        businessData &&
        isCompleteSteps(LOAN_APPLICATION_STEPS.BUSINESS_INFORMATION)
      ) {
        submitPromises.push(submitLoanKYBForm(loanRequestId))
      }

      // Submit Current Loans form
      if (
        currentLoansData &&
        isCompleteSteps(LOAN_APPLICATION_STEPS.CURRENT_LOANS)
      ) {
        submitPromises.push(submitCurrentLoansForm(loanRequestId))
      }

      // Submit Operating Expenses form
      if (
        operatingExpensesData &&
        isCompleteSteps(LOAN_APPLICATION_STEPS.OPERATING_EXPENSES)
      ) {
        submitPromises.push(submitOperatingExpensesForm(loanRequestId))
      }

      // Submit Product Service form
      if (
        productServiceData &&
        isCompleteSteps(LOAN_APPLICATION_STEPS.PRODUCT_SERVICE)
      ) {
        submitPromises.push(submitProductServiceForm())
      }

      // Submit Market Opportunity form

      if (
        marketOpportunityData &&
        isCompleteSteps(LOAN_APPLICATION_STEPS.MARKET_OPPORTUNITY)
      ) {
        submitPromises.push(submitLoanMarketOpportunity(loanRequestId))
      }

      // Submit Launch KC Fit form
      if (
        launchKCFitData &&
        isCompleteSteps(LOAN_APPLICATION_STEPS.LAUNCH_KC_FIT)
      ) {
        submitPromises.push(submitLoanLaunchKCFitForm())
      }

      // Submit Execution form
      if (executionData && isCompleteSteps(LOAN_APPLICATION_STEPS.EXECUTION)) {
        submitPromises.push(submitLoanExecutionForm())
      }

      // Submit Business Model form
      if (
        businessModelData &&
        isCompleteSteps(LOAN_APPLICATION_STEPS.BUSINESS_MODEL)
      ) {
        submitPromises.push(submitLoanBusinessModelForm())
      }

      // Upload Business Documents
      if (
        documentUploadsData &&
        isCompleteSteps(LOAN_APPLICATION_STEPS.LAUNCH_KC_BUSINESS_DOCUMENTS)
      ) {
        submitPromises.push(
          uploadBusinessDocuments(
            loanRequestId,
            documentUploadsData.executiveSummary?.[0],
            documentUploadsData.pitchDeck?.[0],
            documentUploadsData.id ?? ""
          )
        )
      }

      // submit sbb forms
      if (isSbb()) {
        submitPromises.push(submitSbbDocument(loanRequestId))
      }

      if (
        isSbb() &&
        isCompleteSteps(
          LOAN_APPLICATION_STEPS.SBB_BUSINESS_INFORMATION_PART_ONE
        )
      ) {
        submitPromises.push(submitSbbLoanKYBForm(loanRequestId))
      }

      // Wait for all submitPromises to resolve
      const results = await Promise.allSettled(submitPromises)

      // These steps are only for forms has file upload
      // Submit KYC form
      if (
        ownerData &&
        isCompleteSteps(LOAN_APPLICATION_STEPS.OWNER_INFORMATION)
      ) {
        const {
          data: { id: ownerFormId }
        } = await submitLoanKYCForm(loanRequestId)

        if (ownerData.governmentFile?.length) {
          await uploadDocuments(
            ownerFormId,
            ownerData.governmentFile,
            FORM_TYPE.KYC
          )
        }
      }

      // Submit Financial form
      if (
        financialData &&
        isCompleteSteps(LOAN_APPLICATION_STEPS.FINANCIAL_INFORMATION)
      ) {
        const {
          data: { id: financialFormId }
        } = await submitLoanFinancialForm(loanRequestId)

        if (financialData.w2sFile?.length) {
          await uploadDocuments(
            financialFormId,
            financialData.w2sFile,
            FORM_TYPE.FINANCIAL
          )
        }
      } else if (
        cashflowData &&
        isCompleteSteps(LOAN_APPLICATION_STEPS.CASH_FLOW_VERIFICATION)
      ) {
        const {
          data: { id: financialFormId }
        } = await submitCashFlowForm(loanRequestId)

        if (cashflowData.w2sFile?.length) {
          await uploadDocuments(
            financialFormId,
            cashflowData.w2sFile,
            FORM_TYPE.FINANCIAL
          )
        }
      }

      // Handle the first errors in the results
      const error = results.find(
        (result): result is PromiseRejectedResult =>
          result.status === "rejected"
      )

      if (error?.reason) {
        if (isAxiosError(error.reason)) {
          handleSubmitFormError(error.reason as AxiosError)
        }

        return
      }

      /**
       * Financial Projection forms
       */
      await handleSubmitFinancialProjection(loanRequestId)

      // Submit Confirmation form
      if (confirmationData) {
        // Submit Confirmation form
        await submitLoanConfirmationForm(loanRequestId)
        isSubmitted = true
      }

      handleSubmitFormSuccess(
        loanRequestData?.id?.length > 0,
        isSubmitted,
        loanRequestId
      )
      queryClient.invalidateQueries({
        queryKey: loanApplicationUserKeys.detail(loanRequestId)
      })
    } catch (error) {
      handleSubmitFormError(error as AxiosError)
    } finally {
      queryClient.invalidateQueries({
        queryKey: loanApplicationUserKeys.lists()
      })
    }
  }, [
    submitLoanRequestForm,
    loanRequestData,
    isCompleteSteps,
    identityVerificationData?.inquiryId,
    identityVerificationData?.smartKycId,
    eSignData?.documentId,
    plaidItemIds?.length,
    businessData,
    currentLoansData,
    operatingExpensesData,
    productServiceData,
    marketOpportunityData,
    launchKCFitData,
    executionData,
    businessModelData,
    documentUploadsData,
    ownerData,
    financialData,
    cashflowData,
    handleSubmitFinancialProjection,
    confirmationData,
    handleSubmitFormSuccess,
    queryClient,
    dispatchFormAction,
    mutateLoanRequest,
    submitLoanIdentityVerification,
    submitESignDocument,
    submitLinkPlaidItemds,
    submitLoanKYBForm,
    submitCurrentLoansForm,
    submitOperatingExpensesForm,
    submitProductServiceForm,
    submitLoanMarketOpportunity,
    submitLoanLaunchKCFitForm,
    submitLoanExecutionForm,
    submitLoanBusinessModelForm,
    uploadBusinessDocuments,
    submitSbbDocument,
    submitSbbLoanKYBForm,
    submitLoanKYCForm,
    uploadDocuments,
    submitLoanFinancialForm,
    submitCashFlowForm,
    handleSubmitFormError,
    submitLoanConfirmationForm
  ])

  return {
    submitLoanForm,
    isLoading:
      isSubmittingCashFlow ||
      isSubmittingLoanRequest ||
      isSubmittingLoanRequestV2 ||
      isSubmittingKYB ||
      isSubmittingKYC ||
      isSubmittingFinancial ||
      isSubmittingCurrentLoans ||
      isSubmittingOperatingExpenses ||
      isSubmittingConfirmation ||
      isUploading ||
      isSubmittingIdentityVerification ||
      isSubmitLinkPlaidItemIds ||
      isSubmittingProductService ||
      isSubmittingLaunchKCFit ||
      isSubmittingExecution ||
      isSubmittingBusinessModel ||
      isSubmitLoanMarketOpportunity ||
      isSubmittingESignDocument ||
      isUploadingBusinessDocuments ||
      isSubmittingSbbDocument ||
      isSubmittingSbbKYB ||
      isSubmittingFinancialProjection
  }
}
