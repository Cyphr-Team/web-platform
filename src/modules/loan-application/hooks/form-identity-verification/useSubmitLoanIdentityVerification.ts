import { useQueryClient } from "@tanstack/react-query"
import { type IdentityVerificationValue } from "../../constants/form"
import { QUERY_KEY } from "../../constants/query-key"
import { type ILinkInquiryData } from "@/types/kyc/response/LinkInquiryResponse"
import { useCallback } from "react"
import { useLinkInquiryKyc } from "@/modules/loan-application/hooks/form-identity-verification/useLinkInquiryKycMutation.ts"

export const useSubmitLoanIdentityVerification = (
  linkInquiryData: IdentityVerificationValue,
  onSuccess: (data: ILinkInquiryData) => void
) => {
  const { mutateAsync, isPending } = useLinkInquiryKyc()

  const onSubmitSuccess = useCallback(
    (data: ILinkInquiryData) => onSuccess(data),
    [onSuccess]
  )

  const queryClient = useQueryClient()

  const submitLoanIdentityVerification = async (loanApplicationId: string) => {
    await mutateAsync(
      {
        loanApplicationId,
        inquiryId: linkInquiryData.inquiryId
      },
      {
        onSuccess: (res) => {
          if (res.data.data) {
            onSubmitSuccess(res.data.data)
          }
        }
      }
    )
    queryClient.invalidateQueries({
      queryKey: [QUERY_KEY.GET_IDENTITY_VERIFICATION, loanApplicationId]
    })
  }

  return {
    isLoading: isPending,
    submitLoanIdentityVerification
  }
}
