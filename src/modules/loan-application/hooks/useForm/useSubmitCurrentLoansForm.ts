import { CurrentLoansFormValue } from "../../constants/form"
import { useSubmitCurrentLoansInformation } from "../useMutation/useSubmitCurrentLoansInformation"
import { useUpdateCurrentLoanInformation } from "../useMutation/useUpdateCurrentLoanInformation"

export const useSubmitCurrentLoansForm = (rawData: CurrentLoansFormValue) => {
  const { mutateAsync: updateCurrentLoan, isPending: isUpdating } =
    useUpdateCurrentLoanInformation()

  const { mutateAsync: submitCurrentLoans, isPending: isSubmitting } =
    useSubmitCurrentLoansInformation()

  // Call API
  const submitCurrentLoansForm = async (loanApplicationId: string) => {
    const submitPromise = submitCurrentLoans({
      currentLoans: rawData.current_loans.filter((form) =>
        form.id.startsWith("loan-add-item")
      ),
      loanApplicationId
    })
    const updatePromises = rawData.current_loans
      .filter((form) => !form.id.startsWith("loan-add-item"))
      .map(async (form) => {
        // Update existing loan for each form
        return await updateCurrentLoan({ ...form })
      })
    return await Promise.all([...updatePromises, submitPromise])
  }

  return {
    isLoading: isUpdating || isSubmitting,
    submitCurrentLoansForm
  }
}
