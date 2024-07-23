import { formatKycForm } from "../../services/form.services"
import { useSubmitLoanKycInformation } from "../useMutation/useSubmitLoanKycInformation"
import { useUpdateLoanKycInformation } from "../useMutation/useUpdateLoanKycInformation"
import { IOwnerFormValue } from "@/modules/loan-application/constants/form.ts"

export const useSubmitLoanKYCForm = (
  rawData: IOwnerFormValue,
  formId: string
) => {
  const { mutateAsync: updateLoanKyc, isPending: isUpdating } =
    useUpdateLoanKycInformation()

  const { mutateAsync: submitLoanKyc, isPending: isSubmitting } =
    useSubmitLoanKycInformation()
  // Call API

  const submitLoanKYCForm = async (loanApplicationId: string) => {
    const formattedData = rawData && formatKycForm(rawData)
    if (formId.length) {
      // Update KYC
      return await updateLoanKyc({ ...formattedData })
    } else {
      // Create KYC
      return await submitLoanKyc({ loanApplicationId, ...formattedData })
    }
  }
  return {
    isLoading: isUpdating || isSubmitting,
    submitLoanKYCForm
  }
}
