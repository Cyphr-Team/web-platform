import { useQueryClient } from "@tanstack/react-query"
import { IdentityVerificationValue } from "../../constants/form"
import { useLinkInquiryKyc } from "../useMutation/useLinkInquiryKycMutation"
import { QUERY_KEY } from "../../constants/query-key"
import { ILinkInquiryData } from "@/types/kyc/response/LinkInquiryResponse"
import { useCallback } from "react"

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
