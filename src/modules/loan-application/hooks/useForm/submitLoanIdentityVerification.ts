import { IdentityVerificationValue } from "../../constants/form"
import { useLinkInquiryKyc } from "../useMutation/useLinkInquiryKycMutation"

export const useSubmitLoanIdentityVerification = (
  linkInquiryData: IdentityVerificationValue
) => {
  const { mutateAsync, isPending } = useLinkInquiryKyc()

  const submitLoanIdentityVerification = async (loanApplicationId: string) => {
    await mutateAsync({
      loanApplicationId,
      inquiryId: linkInquiryData.inquiryId
    })
  }

  return {
    isLoading: isPending,
    submitLoanIdentityVerification
  }
}
