import { useCallback } from "react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { postRequest, putRequest } from "@/services/client.service.ts"
import { API_PATH } from "@/constants"
import { customRequestHeader } from "@/utils/request-header.ts"
import { toastError } from "@/utils"
import { TOAST_MSG } from "@/constants/toastMsg.ts"
import { getAxiosError } from "@/utils/custom-error.ts"
import { QUERY_KEY } from "../../constants/query-key.ts"
import { type BusinessDocumentsResponse } from "../../constants/type.ts"
import { type AxiosError, type AxiosResponse } from "axios"
import { type ErrorResponse } from "@/types/common.type.ts"

export const useUploadBusinessDocuments = (
  onSuccess: (data: BusinessDocumentsResponse) => void
) => {
  const { mutateAsync: create, isUploading: isCreating } = useCreate()
  const { mutateAsync: update, isUploading: isUpdating } = useUpdate()

  const onSubmitSuccess = useCallback(
    (data: BusinessDocumentsResponse) => onSuccess(data),
    [onSuccess]
  )

  const uploadBusinessDocuments = useCallback(
    async (
      id: string,
      executiveSummaryFile: File,
      pitchDeckFile: File,
      formId?: string
    ) => {
      const request = new FormData()

      const reqBody = {
        executiveSummaryFile,
        pitchDeckFile,
        id,
        formId
      }

      for (const [key, value] of Object.entries(reqBody)) {
        if (value) {
          request.append(key, value)
        }
      }

      if (formId) {
        await update(request)
      } else {
        await create(request, {
          onSuccess: (res) => onSubmitSuccess(res.data)
        })
      }
    },
    [create, onSubmitSuccess, update]
  )

  return { uploadBusinessDocuments, isUploading: isCreating || isUpdating }
}

const useCreate = () => {
  const mutation = useMutation<
    AxiosResponse<BusinessDocumentsResponse>,
    AxiosError<ErrorResponse>,
    FormData
  >({
    mutationFn: (data: FormData) => {
      return postRequest({
        path: API_PATH.application.businessDocuments.index,
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

const useUpdate = () => {
  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn: (data: FormData) => {
      return putRequest({
        path: API_PATH.application.businessDocuments.index,
        data,
        customHeader: {
          ...customRequestHeader.customHeaders,
          "Content-Type": "multipart/form-data"
        }
      })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.GET_BUSINESS_DOCUMENTS]
      })
    }
  })

  return {
    mutateAsync: mutation.mutateAsync,
    isUploading: mutation.isPending
  }
}
