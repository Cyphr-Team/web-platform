import { useMemo } from "react"
import { createContext } from "use-context-selector"
import { useGetLoanProgramDetail } from "../hooks/useGetLoanProgramDetail"
import { useParams } from "react-router-dom"
import { LoanProgramData, LoanProgramType } from "../constants/type"
import { useQueryGetLoanProgramDetails } from "../hooks/useQuery/useQueryLoanProgramDetails"

type LoanProgramDetailContext = {
  loanProgramDetails?: LoanProgramType
  loanProgramInfo?: LoanProgramData
}

export const LoanProgramDetailContext = createContext<LoanProgramDetailContext>(
  {
    loanProgramDetails: undefined,
    loanProgramInfo: undefined
  }
)

type Props = {
  children: React.ReactNode
}

export const LoanProgramDetailProvider: React.FC<Props> = ({ children }) => {
  const { loanProgramId } = useParams()

  const loanProgramQuery = useQueryGetLoanProgramDetails(loanProgramId!)

  const loanProgramInfo = useGetLoanProgramDetail(
    loanProgramQuery.data?.name ?? ""
  )

  const value = useMemo(
    () => ({
      loanProgramInfo,
      loanProgramDetails: loanProgramQuery.data
    }),
    [loanProgramInfo, loanProgramQuery.data]
  )

  return (
    <LoanProgramDetailContext.Provider value={value}>
      {children}
    </LoanProgramDetailContext.Provider>
  )
}
