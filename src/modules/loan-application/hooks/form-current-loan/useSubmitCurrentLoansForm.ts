import { useCallback } from "react"
import {
  DELETE_CURRENT_LOAN_PREFIX,
  NEW_CURRENT_LOAN_PREFIX
} from "../../constants"
import { type CurrentLoansFormValue } from "../../constants/form.ts"
import { type CurrentLoansInformationResponse } from "../../constants/type.ts"
import { useDeleteCurrentLoanInformation } from "./useDeleteCurrentLoanInformation.ts"
import { useSubmitCurrentLoansInformation } from "./useSubmitCurrentLoansInformation.ts"
import { useUpdateCurrentLoanInformation } from "./useUpdateCurrentLoanInformation.ts"

interface Args {
  rawData: CurrentLoansFormValue
  onSuccess: (data: CurrentLoansInformationResponse) => void
}

export const useSubmitCurrentLoansForm = ({ rawData, onSuccess }: Args) => {
  const { mutateAsync: updateCurrentLoan, isPending: isUpdating } =
    useUpdateCurrentLoanInformation()

  const { mutateAsync: deleteCurrentLoan, isPending: isDeleting } =
    useDeleteCurrentLoanInformation()

  const { mutateAsync: submitCurrentLoans, isPending: isSubmitting } =
    useSubmitCurrentLoansInformation()

  const onSubmitSuccess = useCallback(
    (data: CurrentLoansInformationResponse) => onSuccess(data),
    [onSuccess]
  )

  // Call API
  const deleteCurrentLoanForm = async (currentLoanId: string) => {
    return await deleteCurrentLoan({ id: currentLoanId })
  }

  const submitCurrentLoansForm = async (loanApplicationId: string) => {
    // if select "No" in "Do you have any outstanding loans?"
    if (rawData.hasOutstandingLoans === "false") {
      return await submitCurrentLoans(
        {
          currentLoans: [],
          loanApplicationId
        },
        {
          onSuccess: (res) => onSubmitSuccess(res.data)
        }
      )
    } else {
      // Delete related forms in DB
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
      // Update forms in DB if these are not new or deleted
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
  }

  return {
    isLoading: isUpdating || isSubmitting || isDeleting,
    submitCurrentLoansForm
  }
}
