import { useMemo } from "react"
import { createContext } from "use-context-selector"
import { useGetLoanProgramDetail } from "../hooks/useGetLoanProgramDetail"
import { useParams } from "react-router-dom"
import { LoanProgramData, MicroLoanProgramType } from "../constants/type"
import { useQueryGetMicroLoanProgramDetails } from "../hooks/useQuery/useQueryLoanProgramDetails"

type LoanProgramDetailContext = {
  loanProgramDetails?: MicroLoanProgramType
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

  const loanProgramQuery = useQueryGetMicroLoanProgramDetails(loanProgramId!)

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
