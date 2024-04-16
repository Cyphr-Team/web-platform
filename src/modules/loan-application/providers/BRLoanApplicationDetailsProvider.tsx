import { useEffect, useMemo } from "react"
import { createContext, useContext } from "use-context-selector"
import { useGetLoanProgramDetail } from "../hooks/useGetLoanProgramDetail"
import { useParams } from "react-router-dom"
import {
  ConfirmationFormResponse,
  DocumentUploadedResponse,
  FinancialInformationResponse,
  KYBInformationResponse,
  KYCInformationResponse,
  LoanProgramData,
  LoanProgramType
} from "../constants/type"
import { useQueryGetLoanProgramDetails } from "../hooks/useQuery/useQueryLoanProgramDetails"
import { useQueryGetKycForm } from "../hooks/useQuery/useQueryKycForm"
import { useQueryGetKybForm } from "../hooks/useQuery/useQueryKybForm"
import { useQueryGetConfirmationForm } from "../hooks/useQuery/useQueryConfirmationForm"
import { useQueryGetFinancialForm } from "../hooks/useQuery/useQueryFinancialForm"
import { useQueryGetDocumentsByForm } from "../hooks/useQuery/useQueryGetDocuments"
import { UserLoanApplication } from "@/types/loan-application.type"
import { useQueryGetUserLoanApplicationDetails } from "../hooks/useQuery/useQueryUserLoanApplicationDetails"
import {
  useLoanApplicationFormContext,
  useLoanApplicationProgressContext
} from "."
import { LOAN_PROGRESS_ACTION } from "./LoanProgressProvider"
import { LOAN_APPLICATION_STEPS } from "../constants"
import { FORM_ACTION } from "./LoanApplicationFormProvider"
import {
  reverseFormatKybForm,
  reverseFormatKycForm
} from "../services/form.services"

type BRLoanApplicationDetailsContext = {
  loanProgramDetails?: LoanProgramType
  loanProgramInfo?: LoanProgramData
  kybFormData?: KYBInformationResponse
  kycFormData?: KYCInformationResponse
  confirmationFormData?: ConfirmationFormResponse
  financialFormData?: FinancialInformationResponse
  loanApplicationDetails?: UserLoanApplication
  kycDocuments?: DocumentUploadedResponse[]
  financialDocuments?: DocumentUploadedResponse[]
  isLoading: boolean
  isFetchingDetails: boolean
}

export const BRLoanApplicationDetailsContext =
  createContext<BRLoanApplicationDetailsContext>({
    isLoading: false,
    isFetchingDetails: false
  })

type Props = {
  children: React.ReactNode
}

export const BRLoanApplicationDetailsProvider: React.FC<Props> = ({
  children
}) => {
  const { loanProgramId, id: loanApplicationId } = useParams()
  const { dispatch: changeStepStatus } = useLoanApplicationProgressContext()
  const { dispatchFormAction } = useLoanApplicationFormContext()

  const loanProgramQuery = useQueryGetLoanProgramDetails(loanProgramId!)

  const loanApplicationDetailsReviewQuery =
    useQueryGetUserLoanApplicationDetails(loanApplicationId!)

  const kybFormQuery = useQueryGetKybForm(loanApplicationId!)
  const kycFormQuery = useQueryGetKycForm(loanApplicationId!)
  const confirmationFormQuery = useQueryGetConfirmationForm(loanApplicationId!)
  const financialFormQuery = useQueryGetFinancialForm(loanApplicationId!)
  const financialDocuments = useQueryGetDocumentsByForm(
    financialFormQuery.data?.id ?? ""
  )
  const kycDocuments = useQueryGetDocumentsByForm(kycFormQuery.data?.id ?? "")

  const loanProgramInfo = useGetLoanProgramDetail(
    loanProgramQuery.data?.type ?? ""
  )
  // Save data to edit form
  // KYB Form
  useEffect(() => {
    if (kybFormQuery.data) {
      changeStepStatus({
        type: LOAN_PROGRESS_ACTION.CHANGE_PROGRESS,
        progress: LOAN_APPLICATION_STEPS.BUSINESS_INFORMATION
      })

      console.log("DISPATCH KYB FORM", kybFormQuery.data)

      dispatchFormAction({
        action: FORM_ACTION.SET_DATA,
        key: LOAN_APPLICATION_STEPS.BUSINESS_INFORMATION,
        state: reverseFormatKybForm(kybFormQuery.data)
      })
    }
  }, [changeStepStatus, dispatchFormAction, kybFormQuery.data])
  // KYC Form
  useEffect(() => {
    if (kycFormQuery.data) {
      changeStepStatus({
        type: LOAN_PROGRESS_ACTION.CHANGE_PROGRESS,
        progress: LOAN_APPLICATION_STEPS.OWNER_INFORMATION
      })

      console.log("DISPATCH KYC FORM", kycFormQuery.data)

      dispatchFormAction({
        action: FORM_ACTION.SET_DATA,
        key: LOAN_APPLICATION_STEPS.OWNER_INFORMATION,
        state: reverseFormatKycForm(kycFormQuery.data)
      })
    }
  }, [changeStepStatus, dispatchFormAction, kycFormQuery.data])
  // Financial Form
  useEffect(() => {
    if (financialFormQuery.data) {
      changeStepStatus({
        type: LOAN_PROGRESS_ACTION.CHANGE_PROGRESS,
        progress: LOAN_APPLICATION_STEPS.FINANCIAL_INFORMATION
      })

      console.log("DISPATCH FINANCIAL FORM", financialFormQuery.data)

      dispatchFormAction({
        action: FORM_ACTION.SET_DATA,
        key: LOAN_APPLICATION_STEPS.FINANCIAL_INFORMATION,
        state: {
          ...financialFormQuery.data,
          incomeCategories: financialFormQuery.data.incomeCategories ?? [],
          w2sFile: []
        }
      })
    }
  }, [changeStepStatus, dispatchFormAction, financialFormQuery.data])

  const value = useMemo(
    () => ({
      loanProgramInfo,
      loanProgramDetails: loanProgramQuery.data,
      kybFormData: kybFormQuery.data,
      kycFormData: kycFormQuery.data,
      confirmationFormData: confirmationFormQuery.data,
      financialFormData: financialFormQuery.data,
      loanApplicationDetails: loanApplicationDetailsReviewQuery.data,
      kycDocuments: kycDocuments.data,
      financialDocuments: financialDocuments.data,
      isFetchingDetails:
        loanApplicationDetailsReviewQuery.isLoading ||
        kybFormQuery.isLoading ||
        kycFormQuery.isLoading ||
        confirmationFormQuery.isLoading ||
        financialFormQuery.isLoading ||
        kycDocuments.isLoading ||
        financialDocuments.isLoading,
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
      confirmationFormQuery.data,
      confirmationFormQuery.isLoading,
      financialFormQuery.data,
      financialFormQuery.isLoading,
      loanApplicationDetailsReviewQuery.data,
      loanApplicationDetailsReviewQuery.isLoading,
      kycDocuments.data,
      kycDocuments.isLoading,
      financialDocuments.data,
      financialDocuments.isLoading
    ]
  )

  return (
    <BRLoanApplicationDetailsContext.Provider value={value}>
      {children}
    </BRLoanApplicationDetailsContext.Provider>
  )
}

export const useBRLoanApplicationDetailsContext = () => {
  return useContext(BRLoanApplicationDetailsContext)
}
