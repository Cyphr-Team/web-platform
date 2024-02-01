import { createContext, useContext } from "use-context-selector"
import { LoanApplicationsKyb } from "../constants/type"
import { useQueryGetKyb } from "../hooks/useQuery/useQueryGetKyb"
import { useParams } from "react-router-dom"
import { useQueryGetKyc } from "../hooks/useQuery/useQueryGetKyc"
import { LoanApplicationsKyc } from "../constants/types/kyc"

type LoanApplicationDetailContextType = {
  loanKybDetail?: LoanApplicationsKyb
  loanKycDetail?: LoanApplicationsKyc
}

export const LoanApplicationDetailContext =
  createContext<LoanApplicationDetailContextType>({
    loanKybDetail: undefined
  })

type Props = {
  children: React.ReactNode
}

export const LoanApplicationDetailProvider: React.FC<Props> = ({
  children
}) => {
  const params = useParams()

  const kybDetailQuery = useQueryGetKyb({
    applicationId: params.id ?? ""
  })

  const kycDetailQuery = useQueryGetKyc({
    applicationId: params.id ?? ""
  })

  return (
    <LoanApplicationDetailContext.Provider
      value={{
        loanKybDetail: kybDetailQuery.data,
        loanKycDetail: kycDetailQuery.data
      }}
    >
      {children}
    </LoanApplicationDetailContext.Provider>
  )
}

export const useLoanApplicationDetailContext = () => {
  return useContext(LoanApplicationDetailContext)
}
