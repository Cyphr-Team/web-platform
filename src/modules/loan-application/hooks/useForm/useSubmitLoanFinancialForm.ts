import { FinancialFormValue } from "../../constants/form"
import { useSubmitLoanFinancialInformation } from "../useMutation/useSubmitLoanFinancialInformation"
import { useUpdateLoanFinancialInformation } from "../useMutation/useUpdateLoanFinancialInformation"

export const useSubmitLoanFinancialForm = (
  rawData: FinancialFormValue,
  formId: string
) => {
  const { mutateAsync: updateLoanFinancial, isPending: isUpdating } =
    useUpdateLoanFinancialInformation()

  const { mutateAsync: submitLoanFinancial, isPending: isSubmitting } =
    useSubmitLoanFinancialInformation()

  // Call API
  const submitLoanFinancialForm = async (loanApplicationId: string) => {
    if (formId.length) {
      // Update
      return await updateLoanFinancial({ ...rawData })
    } else {
      // Create
      return await submitLoanFinancial({
        ...rawData,
        loanApplicationId,
        incomeCategories: rawData.incomeCategories ?? []
      })
    }
  }
  return {
    isLoading: isUpdating || isSubmitting,
    submitLoanFinancialForm
  }
}
