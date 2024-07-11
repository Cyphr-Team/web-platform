import { Institution } from "@/constants/tenant.constants"
import { useMemo } from "react"
import {
  ALTCAP_LOAN_PROGRAMS,
  KCC_LENDER_FORUM_PROGRAM,
  LOAN_READY_PROGRAMS,
  SBB_LOAN_PROGRAMS
} from "../constants/loan-program.constants"
import { getSubdomain } from "@/utils/domain.utils"

export const useGetLoanProgramDetail = (
  type: string,
  name: string | undefined
) => {
  const loanProgramData = useMemo(() => {
    switch (getSubdomain()) {
      case Institution.IntrustBank:
        return undefined
      case Institution.LoanReady:
        return LOAN_READY_PROGRAMS.find(
          (loanProgram) => loanProgram.type === type
        )
      case Institution.KCChamber:
        return KCC_LENDER_FORUM_PROGRAM
      case Institution.SBB:
        return SBB_LOAN_PROGRAMS.find(
          (loanProgram) => loanProgram.name === name
        )
      default:
        return ALTCAP_LOAN_PROGRAMS.find(
          (loanProgram) => loanProgram.type === type
        )
    }
  }, [type, name])

  return loanProgramData
}
