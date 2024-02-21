import { ALTCAP_LOAN_PROGRAMS } from "../constants/loan-program.constants"
import { useMemo } from "react"

export const useGetLoanProgramDetail = (name: string) => {
  const loanProgramData = useMemo(
    () => ALTCAP_LOAN_PROGRAMS.find((loanProgram) => loanProgram.name === name),
    [name]
  )

  return loanProgramData
}
