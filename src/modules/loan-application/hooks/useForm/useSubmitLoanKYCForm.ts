import { OwnerFormValue } from "../../constants/form"
import { formatKycForm } from "../../services/form.services"
import { useSubmitLoanKycInformation } from "../useMutation/useSubmitLoanKycInformation"
import { useUpdateLoanKycInformation } from "../useMutation/useUpdateLoanKycInformation"

export const useSubmitLoanKYCForm = (
  rawData: OwnerFormValue,
  formId?: string,
  loanApplicationId?: string
) => {
  const { mutateAsync: updateLoanKyc, isPending: isUpdating } =
    useUpdateLoanKycInformation()

  const { mutateAsync: submitLoanKyc, isPending: isSubmitting } =
    useSubmitLoanKycInformation()

  const formattedData = formatKycForm(rawData)
  // Call API
  const submitLoanKYCForm = async () => {
    if (formId) {
      // Update KYC
      await updateLoanKyc({ ...formattedData })
    } else {
      // Create KYC
      await submitLoanKyc({ loanApplicationId, ...formattedData })
    }
  }
  return {
    isLoading: isUpdating || isSubmitting,
    submitLoanKYCForm
  }
}
