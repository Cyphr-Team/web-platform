import { useMemo } from "react"
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
    loanProgramDetails: undefined,
    loanProgramInfo: undefined,
    isLoading: false,
    kybFormData: undefined,
    kycFormData: undefined,
    confirmationFormData: undefined,
    financialFormData: undefined,
    loanApplicationDetails: undefined,
    isFetchingDetails: false
  })

type Props = {
  children: React.ReactNode
}

export const BRLoanApplicationDetailsProvider: React.FC<Props> = ({
  children
}) => {
  const { loanProgramId, id: loanApplicationId } = useParams()

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
