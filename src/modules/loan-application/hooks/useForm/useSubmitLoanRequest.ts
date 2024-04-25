import { LoanType } from "@/types/loan-program.type"
import { LoanRequestFormValue } from "../../constants/form"
import { useCreateLoanApplicationMutation } from "../useMutation/useCreateLoanApplicationMutation"
import { useUpdateLoanApplicationMutation } from "../useMutation/useUpdateLoanRequest"

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
      const res = await updateLoanApplication({ ...rawData })
      return res
    } else {
      // Create
      const res = await createLoanApplication({ loanProgramId, ...rawData })
      return res
    }
  }
  return {
    isLoading: isCreatingLoanApplication || isUpdatingLoanApplication,
    submitLoanRequestForm
  }
}
