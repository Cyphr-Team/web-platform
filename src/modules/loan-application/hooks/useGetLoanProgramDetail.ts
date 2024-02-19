import { useParams } from "react-router-dom"
import { ALTCAP_LOAN_PROGRAMS } from "../constants/loan-program.constants"
import { useMemo } from "react"

export const useGetLoanProgramDetail = () => {
  const { loanProgramId } = useParams()

  const loanProgramData = useMemo(
    () =>
      ALTCAP_LOAN_PROGRAMS.find(
        (loanProgram) => loanProgram.id === loanProgramId
      ),
    [loanProgramId]
  )

  return loanProgramData
}
