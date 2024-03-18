import { Institution } from "@/constants/tenant.constants"
import { useMemo } from "react"
import { ALTCAP_LOAN_PROGRAMS } from "../constants/loan-program.constants"
import { getSubdomain } from "@/utils/domain.utils"

export const useGetLoanProgramDetail = (type: string) => {
  const loanProgramData = useMemo(() => {
    const data =
      getSubdomain() === Institution.IntrustBank ? [] : ALTCAP_LOAN_PROGRAMS

    return data.find((loanProgram) => loanProgram.type === type)
  }, [type])

  return loanProgramData
}
