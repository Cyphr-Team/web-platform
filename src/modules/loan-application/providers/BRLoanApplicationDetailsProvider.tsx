import { useCallback, useEffect, useMemo } from "react"
import { createContext } from "use-context-selector"
import { useGetLoanProgramDetail } from "../hooks/useGetLoanProgramDetail"
import { useLocation, useParams } from "react-router-dom"
import {
  ConfirmationFormResponse,
  CurrentLoansInformationResponse,
  DocumentUploadedResponse,
  FinancialInformationResponse,
  KYBInformationResponse,
  KYCInformationResponse,
  LoanProgramData,
  OperatingExpensesInformationResponse
} from "../constants/type"
import { useQueryLoanProgramDetailsByType } from "../hooks/useQuery/useQueryLoanProgramDetails"
import { useQueryGetKycForm } from "../hooks/useQuery/useQueryKycForm"
import { useQueryGetKybForm } from "../hooks/useQuery/useQueryKybForm"
import { useQueryGetConfirmationForm } from "../hooks/useQuery/useQueryConfirmationForm"
import { useQueryGetFinancialForm } from "../hooks/useQuery/useQueryFinancialForm"
import { useQueryGetCurrentLoansForm } from "../hooks/useQuery/useQueryCurrentLoansForm"
import { useQueryGetDocumentsByForm } from "../hooks/useQuery/useQueryGetDocuments"
import { UserMicroLoanApplication } from "@/types/loan-application.type"
import { useQueryLoanApplicationDetailsByType } from "../hooks/useQuery/useQueryUserLoanApplicationDetails"
import {
  useLoanApplicationFormContext,
  useLoanApplicationProgressContext
} from "."
import { LOAN_PROGRESS_ACTION } from "./LoanProgressProvider"
import { LOAN_APPLICATION_STEPS } from "../constants"
import { FORM_ACTION, FormStateType } from "./LoanApplicationFormProvider"
import {
  reverseFormatKybForm,
  reverseFormatKycForm
} from "../services/form.services"
import { LoanType, MicroLoanProgramType } from "@/types/loan-program.type"
import { useQueryGetOperatingExpensesForm } from "@/modules/loan-application/hooks/useQuery/useQueryOperatingExpensesForm.ts"

type BRLoanApplicationDetailsContext<T> = {
  loanProgramDetails?: T
  loanProgramInfo?: LoanProgramData
  kybFormData?: KYBInformationResponse
  kycFormData?: KYCInformationResponse
  currentLoanFormData?: CurrentLoansInformationResponse
  operatingExpensesFormData?: OperatingExpensesInformationResponse
  confirmationFormData?: ConfirmationFormResponse
  financialFormData?: FinancialInformationResponse
  loanApplicationDetails?: UserMicroLoanApplication
  kycDocuments?: DocumentUploadedResponse[]
  financialDocuments?: DocumentUploadedResponse[]
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
  const { dispatchProgress } = useLoanApplicationProgressContext()
  const { dispatchFormAction } = useLoanApplicationFormContext()

  const loanProgramQuery = useQueryLoanProgramDetailsByType(
    state?.loanProgramDetails?.type ?? "",
    loanProgramId!
  )

  const loanApplicationDetailsQuery = useQueryLoanApplicationDetailsByType(
    loanApplicationId!,
    loanProgramQuery.data?.type ?? LoanType.MICRO
  )
  const loanProgramInfo = useGetLoanProgramDetail(
    loanProgramQuery.data?.type ?? ""
  )

  const kybFormQuery = useQueryGetKybForm(loanApplicationId!)
  const kycFormQuery = useQueryGetKycForm(loanApplicationId!)
  const confirmationFormQuery = useQueryGetConfirmationForm(loanApplicationId!)
  const financialFormQuery = useQueryGetFinancialForm(loanApplicationId!)
  const currentLoansFormQuery = useQueryGetCurrentLoansForm(loanApplicationId!)
  const operatingExpensesFormQuery = useQueryGetOperatingExpensesForm(
    loanApplicationId!
  )
  const financialDocuments = useQueryGetDocumentsByForm(
    financialFormQuery.data?.id ?? ""
  )
  const kycDocuments = useQueryGetDocumentsByForm(kycFormQuery.data?.id ?? "")
  const currentLoanDocuments = useQueryGetCurrentLoansForm(
    currentLoansFormQuery.data?.currentLoanForms[0].id ?? ""
  )
  const operatingExpensesDocuments = useQueryGetOperatingExpensesForm(
    operatingExpensesFormQuery.data?.id ?? ""
  )
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
  // Save data to edit form
  // KYB Form
  useEffect(() => {
    if (kybFormQuery.data) {
      changeDataAndProgress(
        reverseFormatKybForm(kybFormQuery.data),
        LOAN_APPLICATION_STEPS.BUSINESS_INFORMATION
      )
    }
  }, [changeDataAndProgress, kybFormQuery.data])
  // KYC Form
  useEffect(() => {
    if (kycFormQuery.data) {
      changeDataAndProgress(
        reverseFormatKycForm(kycFormQuery.data),
        LOAN_APPLICATION_STEPS.OWNER_INFORMATION
      )
    }
  }, [changeDataAndProgress, kycFormQuery.data])
  // Financial Form
  useEffect(() => {
    if (financialFormQuery.data) {
      changeDataAndProgress(
        {
          ...financialFormQuery.data,
          incomeCategories: financialFormQuery.data.incomeCategories ?? [],
          w2sFile: []
        },
        LOAN_APPLICATION_STEPS.FINANCIAL_INFORMATION
      )
    }
  }, [changeDataAndProgress, financialFormQuery.data])
  // Current Loans Form
  useEffect(() => {
    if (currentLoansFormQuery.data) {
      changeDataAndProgress(
        {
          hasOutstandingLoans:
            currentLoansFormQuery.data.currentLoanForms.length > 0
              ? "true"
              : "false",
          current_loans: currentLoansFormQuery.data.currentLoanForms
        },
        LOAN_APPLICATION_STEPS.CURRENT_LOANS
      )
    }
  }, [changeDataAndProgress, currentLoansFormQuery.data])
  // Operating Expenses Form
  useEffect(() => {
    if (operatingExpensesFormQuery.data) {
      changeDataAndProgress(
        {
          ...operatingExpensesFormQuery.data
        },
        LOAN_APPLICATION_STEPS.OPERATING_EXPENSES
      )
    }
  }, [changeDataAndProgress, operatingExpensesFormQuery.data])
  // Loan Request Form
  useEffect(() => {
    if (loanApplicationDetailsQuery.data) {
      changeDataAndProgress(
        {
          id: loanApplicationDetailsQuery.data.id,
          loanAmount: loanApplicationDetailsQuery.data.loanAmount,
          loanTermInMonth: loanApplicationDetailsQuery.data.loanTermInMonth,
          proposeUseOfLoan: loanApplicationDetailsQuery.data.proposeUseOfLoan
        },
        LOAN_APPLICATION_STEPS.LOAN_REQUEST
      )
    }
  }, [changeDataAndProgress, loanApplicationDetailsQuery.data])

  const value = useMemo(
    () => ({
      loanProgramInfo,
      loanProgramDetails: loanProgramQuery.data,
      kybFormData: kybFormQuery.data,
      kycFormData: kycFormQuery.data,
      confirmationFormData: confirmationFormQuery.data,
      financialFormData: financialFormQuery.data,
      loanApplicationDetails: loanApplicationDetailsQuery.data,
      kycDocuments: kycDocuments.data,
      currentLoanDocuments: currentLoanDocuments.data,
      currentLoanFormData: currentLoansFormQuery.data,
      operatingExpensesFormDocuments: operatingExpensesDocuments.data,
      operatingExpensesFormData: operatingExpensesFormQuery.data,
      financialDocuments: financialDocuments.data,
      isFetchingDetails:
        loanApplicationDetailsQuery.isLoading ||
        kybFormQuery.isLoading ||
        kycFormQuery.isLoading ||
        confirmationFormQuery.isLoading ||
        financialFormQuery.isLoading ||
        currentLoansFormQuery.isLoading ||
        operatingExpensesFormQuery.isLoading ||
        kycDocuments.isLoading ||
        currentLoanDocuments.isLoading ||
        operatingExpensesDocuments.isLoading ||
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
      currentLoansFormQuery.data,
      currentLoansFormQuery.isLoading,
      operatingExpensesFormQuery.data,
      operatingExpensesFormQuery.isLoading,
      confirmationFormQuery.data,
      confirmationFormQuery.isLoading,
      financialFormQuery.data,
      financialFormQuery.isLoading,
      loanApplicationDetailsQuery.data,
      loanApplicationDetailsQuery.isLoading,
      kycDocuments.data,
      kycDocuments.isLoading,
      currentLoanDocuments.data,
      currentLoanDocuments.isLoading,
      financialDocuments.data,
      financialDocuments.isLoading
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
