import { LoanRequestFormValue } from "../../constants/form"
import { useCreateLoanApplication } from "../useCreateLoanApplication"
import { useUpdateLoanApplication } from "../useMutation/useUpdateLoanRequest"

export const useSubmitLoanRequestForm = (
  rawData: LoanRequestFormValue,
  formId: string,
  loanProgramId?: string
) => {
  const {
    mutateAsync: createLoanApplication,
    isPending: isCreatingLoanApplication
  } = useCreateLoanApplication()

  const {
    mutateAsync: updateLoanApplication,
    isPending: isUpdatingLoanApplication
  } = useUpdateLoanApplication({ id: formId })

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
