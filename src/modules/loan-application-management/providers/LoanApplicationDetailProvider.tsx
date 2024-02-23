import { createContext, useContext } from "use-context-selector"
import { LoanApplicationsKyb } from "../constants/type"
import { useQueryGetKyb } from "../hooks/useQuery/useQueryGetKyb"
import { useParams } from "react-router-dom"
import { useQueryGetKyc } from "../hooks/useQuery/useQueryGetKyc"
import { LoanApplicationsKyc } from "../constants/types/kyc"
import { useQueryGetApplicationDetails } from "../hooks/useQuery/useQueryApplicationDetails"
import { UserLoanApplication } from "@/types/loan-application.type"

type LoanApplicationDetailContextType = {
  loanKybDetail?: LoanApplicationsKyb
  loanKycDetail?: LoanApplicationsKyc
  loanApplicationDetails?: UserLoanApplication
  isLoading: boolean
}

export const LoanApplicationDetailContext =
  createContext<LoanApplicationDetailContextType>({
    loanKybDetail: undefined,
    loanKycDetail: undefined,
    loanApplicationDetails: undefined,
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

  return (
    <LoanApplicationDetailContext.Provider
      value={{
        loanKybDetail: kybDetailQuery.data,
        loanKycDetail: kycDetailQuery.data,
        loanApplicationDetails: userLoanApplicationQuery.data,
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
