import { Institution } from "@/constants/tenant.constants"
import { useMemo } from "react"
import {
  ALTCAP_LOAN_PROGRAMS,
  LOAN_READY_PROGRAMS
} from "../constants/loan-program.constants"
import { getSubdomain } from "@/utils/domain.utils"

export const useGetLoanProgramDetail = (type: string) => {
  const loanProgramData = useMemo(() => {
    switch (getSubdomain()) {
      case Institution.IntrustBank:
        return undefined
      case Institution.LoanReady:
        return LOAN_READY_PROGRAMS.find(
          (loanProgram) => loanProgram.type === type
        )
      default:
        return ALTCAP_LOAN_PROGRAMS.find(
          (loanProgram) => loanProgram.type === type
        )
    }
  }, [type])

  return loanProgramData
}
