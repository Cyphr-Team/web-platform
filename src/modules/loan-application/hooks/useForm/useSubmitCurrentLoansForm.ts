import { CurrentLoansFormValue } from "../../constants/form"
import { useDeleteCurentLoanInformation } from "../useMutation/useDeleteCurrentLoanInformation"
import { useSubmitCurrentLoansInformation } from "../useMutation/useSubmitCurrentLoansInformation"
import { useUpdateCurrentLoanInformation } from "../useMutation/useUpdateCurrentLoanInformation"

export const useSubmitCurrentLoansForm = (rawData: CurrentLoansFormValue) => {
  const { mutateAsync: updateCurrentLoan, isPending: isUpdating } =
    useUpdateCurrentLoanInformation()

  const { mutateAsync: deleteCurrentLoan, isPending: isDeleting } =
    useDeleteCurentLoanInformation()

  const { mutateAsync: submitCurrentLoans, isPending: isSubmitting } =
    useSubmitCurrentLoansInformation()

  // Call API
  const deleteCurrentLoanForm = async (currentLoanId: string) => {
    return await deleteCurrentLoan({ id: currentLoanId })
  }

  const submitCurrentLoansForm = async (loanApplicationId: string) => {
    // Delete related forms in DB if user chooses "NO"
    const deletePromise = rawData.current_loans
      .filter(
        (form) =>
          rawData.hasOutstandingLoans == "false" &&
          !form.id.startsWith("loan-add-item")
      )
      .map(async (form) => {
        // Update existing loan for each form
        return await deleteCurrentLoanForm(form.id)
      })
    // Create new forms in DB if these are new
    const submitPromise = submitCurrentLoans({
      currentLoans: rawData.current_loans.filter((form) =>
        form.id.startsWith("loan-add-item")
      ),
      loanApplicationId
    })
    // Update forms in DB if these are new
    const updatePromises = rawData.current_loans
      .filter((form) => !form.id.startsWith("loan-add-item"))
      .map(async (form) => {
        return await updateCurrentLoan({ ...form })
      })
    return await Promise.all([
      ...updatePromises,
      ...deletePromise,
      submitPromise
    ])
  }

  return {
    isLoading: isUpdating || isSubmitting || isDeleting,
    submitCurrentLoansForm,
    deleteCurrentLoanForm
  }
}
