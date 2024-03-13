import { UserLoanApplication } from "@/types/loan-application.type"
import { useParams } from "react-router-dom"
import { createContext, useContext } from "use-context-selector"
import { ApplicationKybDetailResponse } from "../constants/types/business.type"
import { LoanApplicationsKyc } from "../constants/types/kyc"
import { LoanSummary } from "../constants/types/loan-summary.type"
import { useQueryGetApplicationDetails } from "../hooks/useQuery/useQueryApplicationDetails"
import { useQueryGetKyb } from "../hooks/useQuery/useQueryGetKyb"
import { useQueryGetKyc } from "../hooks/useQuery/useQueryGetKyc"
import { useQueryGetLoanSummary } from "../hooks/useQuery/useQueryLoanSummary"
import { useQueryGetCashFlowAnalysis } from "../hooks/useQuery/useQueryGetCashFlowAnalysis"
import { ApplicationCashFlow } from "../constants/types/cashflow.type"

type LoanApplicationDetailContextType = {
  loanKybDetail?: ApplicationKybDetailResponse
  loanKycDetail?: LoanApplicationsKyc
  loanApplicationDetails?: UserLoanApplication
  cashFlowAnalysis?: ApplicationCashFlow
  isLoading: boolean
  loanSummary?: LoanSummary
}

export const LoanApplicationDetailContext =
  createContext<LoanApplicationDetailContextType>({
    isLoading: false
  })

type Props = {
  children: React.ReactNode
}

export const LoanApplicationDetailProvider: React.FC<Props> = ({
  children
}) => {
  const params = useParams()

  const kybDetailQuery = useQueryGetKyb({
    applicationId: params.id!
  })

  const kycDetailQuery = useQueryGetKyc({
    applicationId: params.id!
  })

  const userLoanApplicationQuery = useQueryGetApplicationDetails({
    applicationId: params.id!
  })

  const loanSummaryQuery = useQueryGetLoanSummary({
    applicationId: params.id
  })

  const cashFlowQuery = useQueryGetCashFlowAnalysis({
    applicationId: params.id!
  })

  return (
    <LoanApplicationDetailContext.Provider
      value={{
        loanKybDetail: kybDetailQuery.data,
        loanKycDetail: kycDetailQuery.data,
        loanApplicationDetails: userLoanApplicationQuery.data,
        loanSummary: loanSummaryQuery.data,
        cashFlowAnalysis: cashFlowQuery.data,
        isLoading: kybDetailQuery.isLoading
      }}
    >
      {children}
    </LoanApplicationDetailContext.Provider>
  )
}

export const useLoanApplicationDetailContext = () => {
  return useContext(LoanApplicationDetailContext)
}
