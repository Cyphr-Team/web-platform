import { useMemo } from "react"
import { createContext } from "use-context-selector"
import { useGetLoanProgramDetail } from "../hooks/useGetLoanProgramDetail"
import { useLocation, useParams } from "react-router-dom"
import { LoanProgramData } from "../constants/type"
import { useQueryLoanProgramDetailsByType } from "../hooks/useQuery/useQueryLoanProgramDetails"
import { LoanType, MicroLoanProgramType } from "@/types/loan-program.type"

export type LoanProgramDetailType<T> = {
  loanProgramDetails?: T
  loanProgramInfo?: LoanProgramData
  isLoading: boolean
}

export const MicroLoanProgramDetailContext = createContext<
  LoanProgramDetailType<MicroLoanProgramType>
>({
  isLoading: false
})

type Props = {
  children: React.ReactNode
}

export const LoanProgramDetailProvider: React.FC<Props> = ({ children }) => {
  const { loanProgramId } = useParams()
  const { state } = useLocation()

  const loanProgramQuery = useQueryLoanProgramDetailsByType(
    state?.loanProgram?.type ?? "",
    loanProgramId ?? ""
  )

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
  switch (loanProgramQuery.data?.type) {
    case LoanType.MICRO:
      return (
        <MicroLoanProgramDetailContext.Provider value={value}>
          {children}
        </MicroLoanProgramDetailContext.Provider>
      )
    default:
      return (
        <MicroLoanProgramDetailContext.Provider value={value}>
          {children}
        </MicroLoanProgramDetailContext.Provider>
      )
  }
}
