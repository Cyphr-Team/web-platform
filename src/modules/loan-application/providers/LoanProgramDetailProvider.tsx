import { useMemo } from "react"
import { createContext } from "use-context-selector"
import { useGetLoanProgramDetail } from "../hooks/useGetLoanProgramDetail"
import { useLocation, useParams } from "react-router-dom"
import {
  LoanProgramData,
  LoanProgramFormsConfiguration
} from "../constants/type"
import { useQueryLoanProgramDetailsByType } from "../hooks/useQuery/useQueryLoanProgramDetails"
import { LoanType, MicroLoanProgramType } from "@/types/loan-program.type"
import { useQueryGetFormsConfiguration } from "@/modules/loan-application/hooks/useQuery/useQueryFormsConfiguration.ts"

export type LoanProgramDetailType<T> = {
  loanProgramFormsConfiguration?: LoanProgramFormsConfiguration
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
    loanProgramQuery.data?.type ?? "",
    loanProgramQuery.data?.name
  )

  const loanProgramFormsConfigurationQuery = useQueryGetFormsConfiguration(
    loanProgramId ?? ""
  )

  const value = useMemo(
    () => ({
      loanProgramInfo,
      loanProgramDetails: loanProgramQuery.data,
      loanProgramFormsConfiguration: loanProgramFormsConfigurationQuery.data,
      isLoading: loanProgramQuery.isLoading
    }),
    [
      loanProgramFormsConfigurationQuery.data,
      loanProgramInfo,
      loanProgramQuery.data,
      loanProgramQuery.isLoading
    ]
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
