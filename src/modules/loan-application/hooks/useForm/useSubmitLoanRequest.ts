import { LoanType } from "@/types/loan-program.type"
import { LoanRequestFormValue } from "../../constants/form"
import { useCreateLoanApplicationMutation } from "../useMutation/useCreateLoanApplicationMutation"
import { useUpdateLoanApplicationMutation } from "../useMutation/useUpdateLoanRequest"
import { UserMicroLoanApplicationRequest } from "@/types/loan-application.type.ts"
import { get } from "lodash"

export const useSubmitMicroLoanRequestForm = (
  rawData: LoanRequestFormValue,
  formId: string,
  loanProgramId?: string
) => {
  const {
    mutateAsync: createLoanApplication,
    isPending: isCreatingLoanApplication
  } = useCreateLoanApplicationMutation(LoanType.MICRO)

  const {
    mutateAsync: updateLoanApplication,
    isPending: isUpdatingLoanApplication
  } = useUpdateLoanApplicationMutation(formId, LoanType.MICRO)

  // Call API
  const submitLoanRequestForm = async () => {
    if (formId?.length) {
      // Update
      return await updateLoanApplication(rawData)
    } else {
      // Create
      const loanRequest: UserMicroLoanApplicationRequest = {
        loanProgramId: loanProgramId!,
        loanTermInMonth: get(rawData, "loanTermInMonth", 6),
        loanAmount: get(rawData, "loanAmount", 1000),
        proposeUseOfLoan: get(rawData, "proposeUseOfLoan", "other"),
        applicationId: rawData?.applicationId
      }
      return await createLoanApplication(loanRequest)
    }
  }
  return {
    isLoading: isCreatingLoanApplication || isUpdatingLoanApplication,
    submitLoanRequestForm
  }
}
