import { ALTCAP_LOAN_PROGRAMS } from "../constants/loan-program.constants"
import { useMemo } from "react"

export const useGetLoanProgramDetail = (type: string) => {
  const loanProgramData = useMemo(
    () => ALTCAP_LOAN_PROGRAMS.find((loanProgram) => loanProgram.type === type),
    [type]
  )

  return loanProgramData
}
