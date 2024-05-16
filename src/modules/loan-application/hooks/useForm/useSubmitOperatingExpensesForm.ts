import { OperatingExpensesFormValue } from "../../constants/form"
import { useSubmitOperatingExpensesInformation } from "../useMutation/useSubmitOperatingExpensesInformation"
import { useUpdateOperatingExpensesInformation } from "../useMutation/useUpdateOperatingExpensesInformation"

export const useSubmitOperatingExpensesForm = (
  rawData: OperatingExpensesFormValue,
  formId: string
) => {
  // Call API
  const { mutateAsync: updateOperatingExpenses, isPending: isUpdating } =
    useUpdateOperatingExpensesInformation()

  const { mutateAsync: submitOperatingExpenses, isPending: isSubmitting } =
    useSubmitOperatingExpensesInformation()
  console.log("should be calling")
  // Call API
  const submitOperatingExpensesForm = async (loanApplicationId: string) => {
    if (formId.length) {
      // Update
      return await updateOperatingExpenses({ ...rawData })
    } else {
      // Create
      return await submitOperatingExpenses({
        ...rawData,
        loanApplicationId
      })
    }
  }

  return {
    isLoading: isUpdating || isSubmitting,
    submitOperatingExpensesForm
  }
}
