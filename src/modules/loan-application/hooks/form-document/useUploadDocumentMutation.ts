import { API_PATH } from "@/constants"
import { postRequest } from "@/services/client.service.ts"
import { toastError } from "@/utils"
import { getAxiosError } from "@/utils/custom-error.ts"
import { customRequestHeader } from "@/utils/request-header.ts"
import { useMutation } from "@tanstack/react-query"
import { TOAST_MSG } from "@/constants/toastMsg.ts"

export const useMutateUploadDocument = () => {
  const mutation = useMutation({
    mutationFn: (data: FormData) => {
      return postRequest({
        path: API_PATH.application.uploadDocument,
        data,
        customHeader: {
          ...customRequestHeader.customHeaders,
          "Content-Type": "multipart/form-data"
        }
      })
    },
    onError(error) {
      toastError({
        ...TOAST_MSG.loanApplication.uploadDocument,
        description: getAxiosError(error).message
      })
    }
  })

  return {
    mutateAsync: mutation.mutateAsync,
    isUploading: mutation.isPending
  }
}
