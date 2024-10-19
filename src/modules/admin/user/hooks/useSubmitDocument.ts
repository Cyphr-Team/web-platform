import { API_PATH } from "@/constants"
import { chatbotDocumentKeys } from "@/constants/query-key"
import { TOAST_MSG } from "@/constants/toastMsg"
import { ZodFileTypeFactory } from "@/modules/loan-application/constants/form"
import { type DocumentUploadedResponse } from "@/modules/loan-application/constants/type"
import { postRequest } from "@/services/client.service"
import { type ChatbotDocumentDeleteRequest } from "@/types/chatbot.type"
import { toastError, toastSuccess } from "@/utils"
import { getAxiosError } from "@/utils/custom-error"
import { headerWithContentType } from "@/utils/request-header"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useCallback } from "react"
import * as z from "zod"
import { custom } from "zod"

export const adminAddDocumentForm = z.object({
  institutionId: z.string().min(1, "Please select an institution."),
  files: ZodFileTypeFactory(
    ["application/pdf"],
    "Please choose PDF format files only"
  ),
  uploadedFiles: custom<DocumentUploadedResponse[]>()
})

export type AdminAddDocumentValue = z.infer<typeof adminAddDocumentForm>

export const useSubmitDocument = () => {
  const queryClient = useQueryClient()
  const { mutateAsync: upload, isUploading } = useAddDocuments()

  const uploadFunction = useCallback(
    async (request: FormData) => {
      return upload(request, {
        onSuccess: (res) => {
          queryClient.invalidateQueries({
            queryKey: chatbotDocumentKeys.lists()
          })

          return res
        },
        onError: (error) =>
          toastError({ title: error.name, description: error.message })
      })
    },
    [queryClient, upload]
  )
  // Call API
  const submitDocument = async (rawData: AdminAddDocumentValue) => {
    const formData = new FormData()

    formData.append("institutionId", rawData.institutionId)
    if (rawData.files && rawData.files?.length > 0) {
      rawData.files.forEach((file) => {
        formData.append("files", file)
      })
      await uploadFunction(formData)
    }
  }

  return {
    mutate: submitDocument,
    isPending: isUploading
  }
}

export const useAddDocuments = () => {
  const mutation = useMutation({
    mutationFn: (data: FormData) => {
      return postRequest({
        path: API_PATH.admin.document.upload,
        data,
        customHeader: headerWithContentType("multipart/form-data")
      })
    },
    onSuccess: () => {
      toastSuccess(TOAST_MSG.user.uploadDocument)
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

export const useDeleteDocument = () => {
  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn: ({ documentId }: ChatbotDocumentDeleteRequest) => {
      return postRequest({
        path: API_PATH.admin.document.delete,
        params: { id: documentId }
      })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: chatbotDocumentKeys.lists()
      })
      toastSuccess(TOAST_MSG.user.deleteDocument)
    },
    onError(error) {
      toastError({
        ...TOAST_MSG.user.deleteDocument,
        description: getAxiosError(error).message
      })
    }
  })

  return {
    mutateAsync: mutation.mutateAsync,
    isRemoving: mutation.isPending
  }
}
