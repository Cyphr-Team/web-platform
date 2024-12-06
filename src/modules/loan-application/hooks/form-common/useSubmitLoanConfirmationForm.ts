import { type ConfirmationFormValue } from "../../constants/form.ts"
import { useSubmitLoanConfirmation } from "./useSubmitLoanConfirmation.ts"

export const useSubmitLoanConfirmationForm = (
  rawData: ConfirmationFormValue
) => {
  const { mutateAsync: submitLoanConfirmation, isPending: isSubmitting } =
    useSubmitLoanConfirmation()

  // Call API
  const submitLoanConfirmationForm = async (loanApplicationId: string) => {
    return await submitLoanConfirmation({ loanApplicationId, ...rawData })
  }

  return {
    isLoading: isSubmitting,
    submitLoanConfirmationForm
  }
}
