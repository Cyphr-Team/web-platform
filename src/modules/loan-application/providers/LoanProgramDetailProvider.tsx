import { useMemo } from "react"
import { createContext } from "use-context-selector"
import { useGetLoanProgramDetail } from "../hooks/useGetLoanProgramDetail"
import { useParams } from "react-router-dom"
import { LoanProgramData, LoanProgramType } from "../constants/type"
import { useQueryGetLoanProgramDetails } from "../hooks/useQuery/useQueryLoanProgramDetails"

type LoanProgramDetailContext = {
  loanProgramDetails?: LoanProgramType
  loanProgramInfo?: LoanProgramData
  isLoading: boolean
}

export const LoanProgramDetailContext = createContext<LoanProgramDetailContext>(
  {
    loanProgramDetails: undefined,
    loanProgramInfo: undefined,
    isLoading: false
  }
)

type Props = {
  children: React.ReactNode
}

export const LoanProgramDetailProvider: React.FC<Props> = ({ children }) => {
  const { loanProgramId } = useParams()

  const loanProgramQuery = useQueryGetLoanProgramDetails(loanProgramId!)

  const loanProgramInfo = useGetLoanProgramDetail(
    loanProgramQuery.data?.type ?? ""
  )

  const value = useMemo(
    () => ({
      loanProgramInfo,
      loanProgramDetails: loanProgramQuery.data,
      isLoading: loanProgramQuery.isLoading
    }),
    [loanProgramInfo, loanProgramQuery.data, loanProgramQuery.isLoading]
  )

  return (
    <LoanProgramDetailContext.Provider value={value}>
      {children}
    </LoanProgramDetailContext.Provider>
  )
}
