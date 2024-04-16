import { LoanRequestFormValue } from "../../constants/form"
import { useCreateLoanApplication } from "../useCreateLoanApplication"
import { useUpdateLoanApplication } from "../useMutation/useUpdateLoanRequest"

export const useSubmitLoanRequestForm = (
  rawData: LoanRequestFormValue,
  loanApplicationId: string,
  formId?: string
) => {
  const {
    mutateAsync: createLoanApplication,
    isPending: isCreatingLoanApplication
  } = useCreateLoanApplication()

  const {
    mutateAsync: updateLoanApplication,
    isPending: isUpdatingLoanApplication
  } = useUpdateLoanApplication({ id: loanApplicationId })

  // Call API
  const submitLoanRequestForm = async () => {
    if (formId) {
      // Update
      updateLoanApplication({ ...rawData })
    } else {
      // Create
      await createLoanApplication({ ...rawData })
    }
  }
  return {
    isLoading: isCreatingLoanApplication || isUpdatingLoanApplication,
    submitLoanRequestForm
  }
}
