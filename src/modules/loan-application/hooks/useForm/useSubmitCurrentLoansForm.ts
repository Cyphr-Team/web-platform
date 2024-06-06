import {
  DELETE_CURRENT_LOAN_PREFIX,
  NEW_CURRENT_LOAN_PREFIX
} from "../../constants"
import { CurrentLoansFormValue } from "../../constants/form"
import { useDeleteCurrentLoanInformation } from "../useMutation/useDeleteCurrentLoanInformation"
import { useSubmitCurrentLoansInformation } from "../useMutation/useSubmitCurrentLoansInformation"
import { useUpdateCurrentLoanInformation } from "../useMutation/useUpdateCurrentLoanInformation"

export const useSubmitCurrentLoansForm = (rawData: CurrentLoansFormValue) => {
  const { mutateAsync: updateCurrentLoan, isPending: isUpdating } =
    useUpdateCurrentLoanInformation()

  const { mutateAsync: deleteCurrentLoan, isPending: isDeleting } =
    useDeleteCurrentLoanInformation()

  const { mutateAsync: submitCurrentLoans, isPending: isSubmitting } =
    useSubmitCurrentLoansInformation()

  // Call API
  const deleteCurrentLoanForm = async (currentLoanId: string) => {
    return await deleteCurrentLoan({ id: currentLoanId })
  }

  const submitCurrentLoansForm = async (loanApplicationId: string) => {
    // Delete related forms in DB
    if (rawData.hasOutstandingLoans == "false") {
      rawData.currentLoans = rawData.currentLoans
        .filter((item) => !item.id.startsWith(NEW_CURRENT_LOAN_PREFIX))
        .map(({ id, ...data }) => ({
          ...data,
          id: id.startsWith(DELETE_CURRENT_LOAN_PREFIX)
            ? id
            : DELETE_CURRENT_LOAN_PREFIX + id
        }))
    }
    const deletePromise = rawData.currentLoans
      .filter((form) => form.id.startsWith(DELETE_CURRENT_LOAN_PREFIX))
      .map((form) => {
        return deleteCurrentLoanForm(
          form.id.substring(DELETE_CURRENT_LOAN_PREFIX.length)
        )
      })
    // Create new forms in DB if these are new
    const newCurrentLoans = rawData.currentLoans.filter((form) =>
      form.id.startsWith(NEW_CURRENT_LOAN_PREFIX)
    )
    const submitPromise =
      newCurrentLoans.length > 0
        ? submitCurrentLoans({
            currentLoans: newCurrentLoans,
            loanApplicationId
          })
        : Promise.resolve()
    // Update forms in DB if these are new
    const updatePromises = rawData.currentLoans
      .filter(
        (form) =>
          !form.id.startsWith(NEW_CURRENT_LOAN_PREFIX) &&
          !form.id.startsWith(DELETE_CURRENT_LOAN_PREFIX)
      )
      .map((form) => updateCurrentLoan({ ...form }))
    return await Promise.all([
      ...updatePromises,
      ...deletePromise,
      submitPromise
    ])
  }

  return {
    isLoading: isUpdating || isSubmitting || isDeleting,
    submitCurrentLoansForm
  }
}
