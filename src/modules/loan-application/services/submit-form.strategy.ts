import { APP_PATH } from "@/constants"
import { loanApplicationUserKeys } from "@/constants/query-key"
import { TOAST_MSG } from "@/constants/toastMsg"
import { LoanType } from "@/types/loan-program.type"
import { toastError, toastSuccess } from "@/utils"
import { ErrorCode, getAxiosError } from "@/utils/custom-error"
import { isCyphrBank, isKccBank, isLaunchKC, isSbb } from "@/utils/domain.utils"
import { isEnablePersonaKycV1 } from "@/utils/feature-flag.utils"
import { useQueryClient } from "@tanstack/react-query"
import { AxiosError } from "axios"
import { Dispatch, useCallback } from "react"
import { useNavigate, useParams } from "react-router-dom"
import {
  BusinessModelFormValue,
  ConfirmationFormValue,
  CurrentLoansFormValue,
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
import { Action, FORM_ACTION } from "../providers/LoanApplicationFormProvider"

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
  plaidItemIds: string[]
) => {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const { loanProgramId } = useParams()

  /**
   * Mutate action for submitting Plaid's itemId Clash flow verification
   */
  const { submitLinkPlaidItemds, isLoading: isSubmitLinkPlaidItemIds } =
    useSubmitLinkPlaidItemIds(plaidItemIds)

  /**
   * Mutate action for submitting Persona's inquiry KYC
   */
  const {
    submitLoanIdentityVerification,
    isLoading: isSubmittingIdentityVerification
  } = useSubmitLoanIdentityVerification(identityVerificationData)

  const { submitLoanKYBForm, isLoading: isSubmittingKYB } =
    useSubmitLoanKYBForm(businessData, businessData?.id ?? "")

  const { submitLoanKYCForm, isLoading: isSubmittingKYC } =
    useSubmitLoanKYCForm(ownerData, ownerData?.id ?? "")

  const { submitLoanRequestForm, isLoading: isSubmittingLoanRequest } =
    useSubmitMicroLoanRequestForm(
      loanRequestData,
      loanRequestData?.id ?? "",
      loanProgramId
    )

  const { submitLoanFinancialForm, isLoading: isSubmittingFinancial } =
    useSubmitLoanFinancialForm(financialData, financialData?.id ?? "")

  const {
    submitLoanFinancialForm: submitCashFlowForm,
    isLoading: isSubmittingCashFlow
  } = useSubmitLoanFinancialForm(cashflowData, cashflowData?.id ?? "")

  const {
    submitLoanMarketOpportunity,
    isLoading: isSubmitLoanMarketOpportunity
  } = useSubmitMarketOpportunity(marketOpportunityData)

  const { submitCurrentLoansForm, isLoading: isSubmittingCurrentLoans } =
    useSubmitCurrentLoansForm(currentLoansData)

  const {
    submitOperatingExpensesForm,
    isLoading: isSubmittingOperatingExpenses
  } = useSubmitOperatingExpensesForm(
    operatingExpensesData,
    operatingExpensesData?.id ?? ""
  )

  const { submitProductServiceForm, isLoading: isSubmittingProductService } =
    useSubmitLoanProductServiceForm(productServiceData)

  const { submitLoanLaunchKCFitForm, isLoading: isSubmittingLaunchKCFit } =
    useSubmitLoanLaunchKCFitForm(launchKCFitData)

  const { submitLoanExecutionForm, isLoading: isSubmittingExecution } =
    useSubmitExecutionForm(executionData)

  const { submitLoanBusinessModelForm, isLoading: isSubmittingBusinessModel } =
    useSubmitLoanBusinessModelForm(businessModelData)

  const { submitLoanConfirmationForm, isLoading: isSubmittingConfirmation } =
    useSubmitLoanConfirmationForm(confirmationData)

  const { uploadDocuments, isUploading } = useUploadFormDocuments()

  const handleSubmitFormSuccess = useCallback(
    (isUpdated: boolean, isSubmitted: boolean, applicationId?: string) => {
      if (isSubmitted) {
        toastSuccess({
          title: TOAST_MSG.loanApplication.submitSuccess.title,
          description: TOAST_MSG.loanApplication.submitSuccess.description
        })
        // Navigate to submission page with applicationId
        navigate(APP_PATH.LOAN_APPLICATION.SUBMISSION, {
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
    [businessData?.businessLegalName, loanProgramId, navigate]
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

  const submitLoanForm = useCallback(async () => {
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

        if (confirmationData) {
          await submitLoanConfirmationForm(loanRequestId)
          isSubmitted = true
        }
        /**
         * TODO - ESign handle link ESign document ID to application
         */
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
    plaidItemIds?.length,
    loanType,
    handleSubmitFormSuccess,
    loanRequestData?.id?.length,
    queryClient,
    dispatchFormAction,
    submitLoanIdentityVerification,
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
    submitProductServiceForm,
    submitLoanMarketOpportunity,
    submitLoanLaunchKCFitForm,
    submitLoanExecutionForm,
    submitLoanBusinessModelForm,
    submitLoanConfirmationForm,
    handleSubmitFormError
  ])

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
      isSubmitLoanMarketOpportunity
  }
}
