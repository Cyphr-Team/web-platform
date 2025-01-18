import { useLoanApplicationDetailContext } from "@/modules/loan-application-management/providers/LoanApplicationDetailProvider"
import { useLoanProgramDetailContext } from "@/modules/loan-application/providers"
import { checkIsLoanApplicant } from "@/utils/check-roles"

const useGetLoanProgram = () => {
  // Query for Applicant
  const { loanProgramDetails } = useLoanProgramDetailContext()
  // Query for Admin
  const { loanApplicationDetails } = useLoanApplicationDetailContext()

  const loanProgram = checkIsLoanApplicant()
    ? loanProgramDetails
    : loanApplicationDetails?.loanProgram

  return {
    loanProgram
  }
}

export default useGetLoanProgram
