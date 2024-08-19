import { APP_PATH } from "@/constants"
import { loanApplicationUserKeys } from "@/constants/query-key"
import { TOAST_MSG } from "@/constants/toastMsg"
import { LoanType } from "@/types/loan-program.type"
import { toastError, toastSuccess } from "@/utils"
import { ErrorCode, getAxiosError } from "@/utils/custom-error"
import { isCyphrBank, isKccBank, isLaunchKC, isSbb } from "@/utils/domain.utils"
import {
  isEnableNewInquiryPersonaKycCreatingLogic,
  isEnableNewSubmitFormStrategy,
  isEnablePandaDocESign,
  isEnablePersonaKycV1
} from "@/utils/feature-flag.utils"
import { useQueryClient } from "@tanstack/react-query"
import { AxiosError, isAxiosError } from "axios"
import { Dispatch, useCallback } from "react"
import { useNavigate, useParams } from "react-router-dom"
import {
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
import { useSubmitLoanIdentityVerification } from "../hooks/useForm/submitLoanIdentityVerification"
import { useSubmitCurrentLoansForm } from "../hooks/useForm/useSubmitCurrentLoansForm"
import { useSubmitLinkPlaidItemIds } from "../hooks/useForm/useSubmitLinkPlaidItemIds"
import { useSubmitLoanConfirmationForm } from "../hooks/useForm/useSubmitLoanConfirmationForm"
import { useSubmitLoanFinancialForm } from "../hooks/useForm/useSubmitLoanFinancialForm"
import { useSubmitLoanKYBForm } from "../hooks/useForm/useSubmitLoanKYBForm"
import { useSubmitLoanKYCForm } from "../hooks/useForm/useSubmitLoanKYCForm"
import { useSubmitMicroLoanRequestForm } from "../hooks/useForm/useSubmitLoanRequest"
import { useSubmitOperatingExpensesForm } from "../hooks/useForm/useSubmitOperatingExpensesForm"
import { useUploadFormDocuments } from "../hooks/useForm/useUploadFormDocuments"
import {
  FORM_TYPE,
  ILoanApplicationStep,
  LOAN_APPLICATION_STEP_STATUS,
  LOAN_APPLICATION_STEPS
} from "../models/LoanApplicationStep/type"
import { useSubmitLoanProductServiceForm } from "../hooks/useForm/useSubmitProductServiceForm"
import { useSubmitLoanLaunchKCFitForm } from "../hooks/useForm/useSubmitLaunchKCFitForm"
import { useSubmitExecutionForm } from "../hooks/useForm/useSubmitExecutionForm"
import { useSubmitLoanBusinessModelForm } from "../hooks/useForm/useSubmitBusinessModelForm"
import { useSubmitMarketOpportunity } from "@/modules/loan-application/hooks/useForm/useSubmitMarketOpportunity.ts"
import {
  Action,
  FORM_ACTION,
  FormStateType
} from "../providers/LoanApplicationFormProvider"
import { useSubmitESignDocument } from "../hooks/useForm/useSubmitESignDocument"
import { useUploadBusinessDocuments } from "../hooks/useForm/useUploadBusinessDocuments"
import { reverseFormatKybForm, reverseFormatKycForm } from "./form.services"
import {
  CurrentLoansInformationResponse,
  FinancialInformationResponse,
  KYBInformationResponse,
  KYCInformationResponse,
  OperatingExpensesInformationResponse
} from "../constants/type"
import { ProductServiceFormResponse } from "../components/organisms/loan-application-form/product-service/type"
import { ExecutionFormResponse } from "../components/organisms/loan-application-form/execution/type"
import { BusinessModelFormResponse } from "../components/organisms/loan-application-form/business-model/type"
import { MarketOpportunityFormResponse } from "../components/organisms/loan-application-form/market-opportunity/type"
import { usePlaidContext } from "../providers"
import { LaunchKcFitFormResponse } from "../components/organisms/loan-application-form/custom-form/launchkc/launchkc-fit/type"
import { transformExecutionResponseToForm } from "../components/organisms/loan-application-form/execution/constants"
import { ArticlesOfOrganizationFormValue } from "@/modules/loan-application/components/organisms/loan-application-form/custom-form/sbb/ArticlesOfOrganizationForm.tsx"
import { BusinessEinLetterFormValue } from "@/modules/loan-application/components/organisms/loan-application-form/custom-form/sbb/BusinessEinLetterForm.tsx"
import { ByLawsFormValue } from "@/modules/loan-application/components/organisms/loan-application-form/custom-form/sbb/ByLawsForm.tsx"
import { CertificateGoodStandingFormValue } from "@/modules/loan-application/components/organisms/loan-application-form/custom-form/sbb/CertificateGoodStandingForm.tsx"
import { FictitiousNameCertificationFormValue } from "@/modules/loan-application/components/organisms/loan-application-form/custom-form/sbb/FictitiousNameCertification.tsx"
import { useUploadSbbDocument } from "@/modules/loan-application/hooks/useForm/useSubmitSbbDocument.ts"
import { revertPattern } from "@/components/ui/mask-input"

export const useSubmitLoanForm = (
  dispatchFormAction: Dispatch<Action>,
  loanType: LoanType,
  progress: ILoanApplicationStep[],
  loanRequestData: LoanRequestFormValue,
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
  plaidItemIds: string[]
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
      if (isEnableNewInquiryPersonaKycCreatingLogic()) {
        updateDataAfterSubmit(
          {
            smartKycId: data.id,
            inquiryId: data.inquiryId,
            status: data.personaStatus?.toLowerCase()
          },
          LOAN_APPLICATION_STEPS.IDENTITY_VERIFICATION
        )
      } else {
        updateDataAfterSubmit(
          {
            smartKycId: data?.id,
            inquiryId: data.inquiryId,
            status: data.personaStatus?.toLowerCase()
          },
          LOAN_APPLICATION_STEPS.IDENTITY_VERIFICATION
        )
      }
  })

  /**
   * Mutate action for submitting E Sign document - PandaDoc
   */
  const { submitESignDocument, isLoading: isSubmittingESignDocument } =
    useSubmitESignDocument(eSignData)

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

  const handleSubmitFormSuccess = useCallback(
    (isUpdated: boolean, isSubmitted: boolean, applicationId?: string) => {
      if (isSubmitted) {
        toastSuccess({
          title: TOAST_MSG.loanApplication.submitSuccess.title,
          description: TOAST_MSG.loanApplication.submitSuccess.description
        })
        // Navigate to submission page with applicationId
        let navigateLink = APP_PATH.LOAN_APPLICATION.SUBMISSION
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

  const submitLoanFormV0 = useCallback(async () => {
    try {
      const { data } = await submitLoanRequestForm()
      const loanRequestId = data.id
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

      /**
       * Submit identity verification - Link inquiry id
       * Note: Always handle before submit loan confirmation
       */
      if (identityVerificationData?.inquiryId && isEnablePersonaKycV1()) {
        // Only handle if this application haven't linked before - 1 application only link once
        if (!identityVerificationData?.smartKycId) {
          await submitLoanIdentityVerification(loanRequestId)
        }
      }

      /**
       * Submit e sign document - Link document id
       */
      if (eSignData?.documentId && isEnablePandaDocESign() && isSbb()) {
        await submitESignDocument(loanRequestId)
      }

      if (plaidItemIds?.length) {
        await submitLinkPlaidItemds(loanRequestId)
      }

      if (loanType === LoanType.MICRO) {
        if (
          businessData &&
          isCompleteSteps(LOAN_APPLICATION_STEPS.BUSINESS_INFORMATION)
        ) {
          await submitLoanKYBForm(loanRequestId)
        }

        if (
          ownerData &&
          isCompleteSteps(LOAN_APPLICATION_STEPS.OWNER_INFORMATION)
        ) {
          const {
            data: { id: ownerFormId }
          } = await submitLoanKYCForm(loanRequestId)
          if (ownerData.governmentFile.length) {
            await uploadDocuments(
              ownerFormId,
              ownerData.governmentFile,
              FORM_TYPE.KYC
            )
          }
        }

        if (
          financialData &&
          isCompleteSteps(LOAN_APPLICATION_STEPS.FINANCIAL_INFORMATION)
        ) {
          const {
            data: { id: financialFormId }
          } = await submitLoanFinancialForm(loanRequestId)
          if (financialData.w2sFile.length) {
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
          if (cashflowData.w2sFile.length) {
            await uploadDocuments(
              financialFormId,
              cashflowData.w2sFile,
              FORM_TYPE.FINANCIAL
            )
          }
        }

        if (isKccBank() || isCyphrBank() || isSbb() || isLaunchKC()) {
          if (
            currentLoansData &&
            isCompleteSteps(LOAN_APPLICATION_STEPS.CURRENT_LOANS)
          ) {
            await submitCurrentLoansForm(loanRequestId)
          }
          if (
            operatingExpensesData &&
            isCompleteSteps(LOAN_APPLICATION_STEPS.OPERATING_EXPENSES)
          ) {
            await submitOperatingExpensesForm(loanRequestId)
          }
        }

        if (isSbb()) {
          await submitSbbDocument(loanRequestId!)
        }

        if (
          productServiceData &&
          isCompleteSteps(LOAN_APPLICATION_STEPS.PRODUCT_SERVICE)
        ) {
          await submitProductServiceForm()
        }

        if (
          marketOpportunityData &&
          isCompleteSteps(LOAN_APPLICATION_STEPS.MARKET_OPPORTUNITY)
        ) {
          await submitLoanMarketOpportunity(loanRequestId)
        }

        if (
          launchKCFitData &&
          isCompleteSteps(LOAN_APPLICATION_STEPS.LAUNCH_KC_FIT)
        ) {
          await submitLoanLaunchKCFitForm()
        }

        if (
          executionData &&
          isCompleteSteps(LOAN_APPLICATION_STEPS.EXECUTION)
        ) {
          await submitLoanExecutionForm()
        }

        if (
          businessModelData &&
          isCompleteSteps(LOAN_APPLICATION_STEPS.BUSINESS_MODEL)
        ) {
          await submitLoanBusinessModelForm()
        }

        if (
          documentUploadsData &&
          isCompleteSteps(LOAN_APPLICATION_STEPS.LAUNCH_KC_BUSINESS_DOCUMENTS)
        ) {
          await uploadBusinessDocuments(
            loanRequestId,
            documentUploadsData.executiveSummary?.[0],
            documentUploadsData.pitchDeck?.[0],
            documentUploadsData.id ?? ""
          )
        }

        if (confirmationData) {
          await submitLoanConfirmationForm(loanRequestId)
          isSubmitted = true
        }
      } else if (loanType === LoanType.READINESS) {
        // Customize submission steps for Readiness loan type
        if (businessData) await submitLoanKYBForm(loanRequestId)
        if (ownerData) await submitLoanKYCForm(loanRequestId)
        await submitLoanFinancialForm(loanRequestId)
        if (isKccBank() || isCyphrBank() || isSbb() || isLaunchKC()) {
          if (currentLoansData) {
            await submitCurrentLoansForm(loanRequestId)
          }
          if (operatingExpensesData) {
            await submitOperatingExpensesForm(loanRequestId)
          }
        }
        if (confirmationData) {
          await submitLoanConfirmationForm(loanRequestId)
          isSubmitted = true
        }
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
    identityVerificationData?.inquiryId,
    identityVerificationData?.smartKycId,
    eSignData?.documentId,
    plaidItemIds?.length,
    loanType,
    handleSubmitFormSuccess,
    loanRequestData?.id?.length,
    queryClient,
    dispatchFormAction,
    submitLoanIdentityVerification,
    submitESignDocument,
    submitLinkPlaidItemds,
    businessData,
    isCompleteSteps,
    ownerData,
    financialData,
    cashflowData,
    productServiceData,
    marketOpportunityData,
    launchKCFitData,
    executionData,
    businessModelData,
    documentUploadsData,
    confirmationData,
    submitLoanKYBForm,
    submitLoanKYCForm,
    uploadDocuments,
    submitLoanFinancialForm,
    submitCashFlowForm,
    currentLoansData,
    operatingExpensesData,
    submitCurrentLoansForm,
    submitOperatingExpensesForm,
    submitSbbDocument,
    submitProductServiceForm,
    submitLoanMarketOpportunity,
    submitLoanLaunchKCFitForm,
    submitLoanExecutionForm,
    submitLoanBusinessModelForm,
    uploadBusinessDocuments,
    submitLoanConfirmationForm,
    handleSubmitFormError
  ])

  const submitLoanFormV1 = useCallback(async () => {
    try {
      // Submit loan request form
      const { data } = await submitLoanRequestForm()
      const loanRequestId = data.id
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

      // Submit identity verification - Link inquiry id
      if (identityVerificationData?.inquiryId && isEnablePersonaKycV1()) {
        // Only handle if this application haven't linked before - 1 application only link once
        if (!identityVerificationData?.smartKycId) {
          submitPromises.push(submitLoanIdentityVerification(loanRequestId))
        }
      }

      // Submit e sign document - Link document id
      if (eSignData?.documentId && isEnablePandaDocESign() && isSbb()) {
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

      // submit sbb document
      if (isSbb()) {
        submitPromises.push(submitSbbDocument(loanRequestId!))
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
        if (ownerData.governmentFile.length) {
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
        if (financialData.w2sFile.length) {
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
        if (cashflowData.w2sFile.length) {
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

      if (error && error.reason) {
        if (isAxiosError(error.reason)) {
          handleSubmitFormError(error.reason as AxiosError)
        }
        return
      }

      // Submit Confirmation form
      if (confirmationData) {
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
    businessData,
    businessModelData,
    cashflowData,
    confirmationData,
    currentLoansData,
    dispatchFormAction,
    documentUploadsData,
    eSignData?.documentId,
    executionData,
    financialData,
    handleSubmitFormError,
    handleSubmitFormSuccess,
    identityVerificationData?.inquiryId,
    identityVerificationData?.smartKycId,
    isCompleteSteps,
    launchKCFitData,
    loanRequestData?.id?.length,
    marketOpportunityData,
    operatingExpensesData,
    ownerData,
    plaidItemIds?.length,
    productServiceData,
    queryClient,
    submitCashFlowForm,
    submitCurrentLoansForm,
    submitESignDocument,
    submitLinkPlaidItemds,
    submitLoanBusinessModelForm,
    submitLoanConfirmationForm,
    submitLoanExecutionForm,
    submitLoanFinancialForm,
    submitLoanIdentityVerification,
    submitLoanKYBForm,
    submitLoanKYCForm,
    submitLoanLaunchKCFitForm,
    submitLoanMarketOpportunity,
    submitLoanRequestForm,
    submitOperatingExpensesForm,
    submitProductServiceForm,
    submitSbbDocument,
    uploadBusinessDocuments,
    uploadDocuments
  ])

  const submitLoanForm = isEnableNewSubmitFormStrategy()
    ? submitLoanFormV1
    : submitLoanFormV0

  return {
    submitLoanForm,
    isLoading:
      isSubmittingCashFlow ||
      isSubmittingLoanRequest ||
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
      isSubmittingSbbDocument
  }
}
