import { type PropsWithChildren, useMemo } from "react"
import { createContext } from "use-context-selector"
import { useGetLoanProgramDetail } from "../hooks/program/useGetLoanProgramDetail.ts"
import { useLocation, useParams } from "react-router-dom"
import { type LoanProgramData } from "../constants/type"
import { useQueryLoanProgramDetailsByType } from "@/modules/loan-application/hooks/program/useQueryLoanProgramDetails.ts"
import {
  type LoanProgramFormsConfiguration,
  LoanType,
  type MicroLoanProgramType
} from "@/types/loan-program.type"
import { useQueryGetFormsConfiguration } from "@/modules/loan-application/hooks/form-common/useQueryFormsConfiguration.ts"

export interface LoanProgramDetailType<T> {
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

export function LoanProgramDetailProvider({ children }: PropsWithChildren) {
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
