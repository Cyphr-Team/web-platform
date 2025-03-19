import { API_PATH } from "@/constants"
import { postRequest } from "@/services/client.service"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { loanApplicationDocumentKeys } from "@/constants/query-key"

interface useDeleteDocumentPayload {
  id: string
  url: string[]
}

export default function useDeleteDocument() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (payload: useDeleteDocumentPayload) =>
      postRequest({
        path: API_PATH.application.formV2.documentForm.delete,
        data: payload
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: loanApplicationDocumentKeys.lists()
      })
    }
  })
}
