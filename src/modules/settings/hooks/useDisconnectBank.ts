import { useMutation, useQueryClient } from "@tanstack/react-query"
import { postRequest } from "@/services/client.service.ts"
import { settingKeys } from "@/constants/query-key.ts"
import { toastError } from "@/utils"
import { TOAST_MSG } from "@/constants/toastMsg.ts"
import { getAxiosError } from "@/utils/custom-error.ts"

interface DisconnectBankPayload {
  applicationId: string
}

export const useDisconnectBank = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (payload: DisconnectBankPayload) => {
      return postRequest({
        path: "api/plaid/item/remove",
        data: payload
      })
    },
    onSuccess: () => {
      toastError(TOAST_MSG.user.disconnectApp)
      queryClient.invalidateQueries({
        queryKey: settingKeys.connectedBanks
      })
    },
    onError: (e) => {
      toastError({
        ...TOAST_MSG.user.disconnectApp,
        description: getAxiosError(e).message
      })
    }
  })
}
