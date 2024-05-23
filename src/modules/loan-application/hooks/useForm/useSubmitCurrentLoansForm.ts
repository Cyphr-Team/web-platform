import {
  DELETE_CURRENT_LOAN_PREFIX,
  NEW_CURRENT_LOAN_PREFIX
} from "../../components/organisms/CurrentLoansForm"
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
    // Delete related forms in DB
    if (rawData.hasOutstandingLoans == "false") {
      rawData.currentLoans = rawData.currentLoans
        .filter((item) => !item.id.startsWith(NEW_CURRENT_LOAN_PREFIX))
        .map(({ id, ...data }) => ({
          ...data,
          id: DELETE_CURRENT_LOAN_PREFIX + id
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
    const submitPromise = submitCurrentLoans({
      currentLoans: rawData.currentLoans.filter((form) =>
        form.id.startsWith(NEW_CURRENT_LOAN_PREFIX)
      ),
      loanApplicationId
    })
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
