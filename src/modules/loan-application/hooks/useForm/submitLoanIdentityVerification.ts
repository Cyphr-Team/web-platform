import { useQueryClient } from "@tanstack/react-query"
import { IdentityVerificationValue } from "../../constants/form"
import { useLinkInquiryKyc } from "../useMutation/useLinkInquiryKycMutation"
import { QUERY_KEY } from "../../constants/query-key"

export const useSubmitLoanIdentityVerification = (
  linkInquiryData: IdentityVerificationValue
) => {
  const { mutateAsync, isPending } = useLinkInquiryKyc()

  const queryClient = useQueryClient()

  const submitLoanIdentityVerification = async (loanApplicationId: string) => {
    await mutateAsync({
      loanApplicationId,
      inquiryId: linkInquiryData.inquiryId
    })
    queryClient.invalidateQueries({
      queryKey: [QUERY_KEY.GET_IDENTITY_VERIFICATION, loanApplicationId]
    })
  }

  return {
    isLoading: isPending,
    submitLoanIdentityVerification
  }
}
