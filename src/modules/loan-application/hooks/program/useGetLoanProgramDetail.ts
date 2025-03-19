import { Institution } from "@/constants/tenant.constants.ts"
import { useMemo } from "react"
import {
  ALTCAP_LOAN_PROGRAMS,
  KCC_LENDER_FORUM_PROGRAM,
  LOAN_READY_PROGRAMS,
  SBB_LOAN_PROGRAMS
} from "../../constants/loan-program.constants.ts"
import { getSubdomain, matchSubdomain } from "@/utils/domain.utils.ts"
import { type LoanProgramData } from "../../constants/type.ts"

export const useGetLoanProgramDetail = (
  type: string,
  name: string | undefined
) => {
  const subdomain = getSubdomain()

  const loanProgramData = useMemo(() => {
    const subdomainMapping: Record<string, () => LoanProgramData | undefined> =
      {
        [Institution.IntrustBank]: () => undefined,
        [Institution.LoanReady]: () =>
          LOAN_READY_PROGRAMS.find((loanProgram) => loanProgram.type === type),
        [Institution.KCChamber]: () => KCC_LENDER_FORUM_PROGRAM,
        [Institution.SBB]: () =>
          SBB_LOAN_PROGRAMS.find((loanProgram) => loanProgram.name === name)
      }

    for (const [key, getProgram] of Object.entries(subdomainMapping)) {
      if (matchSubdomain(subdomain, key)) {
        return getProgram()
      }
    }

    return ALTCAP_LOAN_PROGRAMS.find((loanProgram) => loanProgram.type === type)
  }, [subdomain, type, name])

  return loanProgramData
}
