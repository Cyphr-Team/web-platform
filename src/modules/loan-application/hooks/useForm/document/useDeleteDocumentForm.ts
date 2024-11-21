import { useMutation, useQueryClient } from "@tanstack/react-query"
import { postRequest } from "@/services/client.service.ts"
import { API_PATH } from "@/constants"
import { toastError } from "@/utils"
import { TOAST_MSG } from "@/constants/toastMsg.ts"
import { getAxiosError } from "@/utils/custom-error.ts"
import { type FORM_TYPE } from "@/modules/loan-application/models/LoanApplicationStep/type.ts"
import { FORM_QUERY_KEY } from "@/modules/loan-application/constants/query-key.ts"
import { type DocumentUploadedResponse } from "@/modules/loan-application/constants/type.ts"

interface DeleteDocumentFormValue {
  formId?: string
  notHaveDoc?: boolean
  files?: File[]
  deleteFiles?: DocumentUploadedResponse[]
  uploadedFiles?: DocumentUploadedResponse[]
}

interface DeleteDocumentFormProps {
  documentFormMapping: DocumentFormMapping
}

type DocumentFormMapping = Map<FORM_TYPE, DeleteDocumentFormValue>

/**
 * Use for delete documents separately not using api/form/documents/update
 */
export const useDeleteDocumentForm = () => {
  const { mutateAsync: deleteDocument, isPending: isDeleting } =
    useMutateDeleteDocument()

  const deleteDocumentForm = async ({
    documentFormMapping
  }: DeleteDocumentFormProps) => {
    try {
      // Then wait for sever handle delete each file to prevent race condition
      for (const [, documentFormValue = {}] of [...documentFormMapping]) {
        const {
          formId = "",
          notHaveDoc = false,
          files = [],
          deleteFiles = [],
          uploadedFiles = []
        } = documentFormValue

        const isDeleteAble =
          deleteFiles.length > 0 &&
          (notHaveDoc ||
            files.length > 0 ||
            uploadedFiles.length > deleteFiles.length)

        if (isDeleteAble) {
          await deleteDocument({
            url: deleteFiles.map((deleteFile) => deleteFile.url),
            formId: formId
          })
        }
      }
    } catch (error) {
      toastError({
        ...TOAST_MSG.loanApplication.uploadDocument,
        description: getAxiosError(error as Error).message
      })
    }
  }

  return {
    deleteDocumentForm,
    isLoading: isDeleting
  }
}

const deleteDocument = (request: {
  url: string | string[]
  formId: string
}) => {
  return postRequest({
    path: API_PATH.application.formV2.documentForm.delete,
    data: {
      id: request.formId,
      url: request.url
    }
  })
}

const useMutateDeleteDocument = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: deleteDocument,
    onSuccess(data) {
      queryClient.invalidateQueries({
        queryKey: [FORM_QUERY_KEY.GET_DOCUMENT_FORM]
      })

      return data
    }
  })
}
