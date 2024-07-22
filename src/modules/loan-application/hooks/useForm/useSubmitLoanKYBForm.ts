import { IBusinessFormValue } from "../../constants/form"
import { formatKybForm } from "../../services/form.services"
import { useSubmitLoanKybInformation } from "../useMutation/useSubmitLoanKybInformation"
import { useUpdateLoanKybInformation } from "../useMutation/useUpdateLoanKybInformation"

export const useSubmitLoanKYBForm = (
  rawData: IBusinessFormValue,
  formId: string
) => {
  const { mutateAsync: updateLoanKyb, isPending: isUpdatingLoanKyb } =
    useUpdateLoanKybInformation()

  const { mutateAsync: submitLoanKyb, isPending: isSubmittingLoanKyb } =
    useSubmitLoanKybInformation()

  const formattedData = rawData && formatKybForm(rawData)
  // Call API
  const submitLoanKYBForm = async (loanApplicationId: string) => {
    if (formId.length) {
      // Update KYB
      await updateLoanKyb({ ...formattedData, id: formId })
    } else {
      // Create KYB
      await submitLoanKyb({
        loanApplicationId,
        ...formattedData
      })
    }
  }
  return {
    isLoading: isUpdatingLoanKyb || isSubmittingLoanKyb,
    submitLoanKYBForm
  }
}
