import { useMutation, useQueryClient } from "@tanstack/react-query"
import { postRequest, toFormData } from "@/services/client.service.ts"
import { API_PATH } from "@/constants"
import { headerWithContentType } from "@/utils/request-header.ts"
import { toastError } from "@/utils"
import { TOAST_MSG } from "@/constants/toastMsg.ts"
import { getAxiosError } from "@/utils/custom-error.ts"
import { type FORM_TYPE } from "@/modules/loan-application/models/LoanApplicationStep/type.ts"
import { FORM_QUERY_KEY } from "@/modules/loan-application/constants/query-key.ts"
import { useCallback } from "react"
import { type DocumentUploadedResponse } from "@/modules/loan-application/constants/type.ts"
import { type DocumentFormResponse } from "@/types/form/document-form.type.ts"

interface UpdateDocumentFormRequest {
  files?: File[]

  // JSON object
  updateDocumentFormRequest: {
    documents: {
      id: string
      size?: number
      origin_file_name?: string // Currently we don't support update fileName
    }[]
    form_id: string
    application_id: string
  }
}

interface UploadDocumentFormRequest {
  formId?: string
  applicationId: string
  formType: FORM_TYPE
  files?: File[]
  uploadedFiles: DocumentUploadedResponse[]
}

interface DocumentFormValue {
  files?: File[]
  formId?: string
  notHaveDoc?: boolean
  uploadedFiles?: DocumentUploadedResponse[]
  deleteFiles?: DocumentUploadedResponse[]
}

interface UploadDocumentFormProps {
  applicationId: string
  documentFormMapping: DocumentFormMapping
}

type DocumentFormMapping = Map<FORM_TYPE, DocumentFormValue>

export const useUploadDocumentForm = () => {
  const queryClient = useQueryClient()

  const { mutateAsync: create, isPending: isCreating } =
    useMutateCreateDocument()
  const { mutateAsync: update, isPending: isUploading } =
    useMutateUpdateDocument()

  const uploadFunction = useCallback(
    async (request: UploadDocumentFormRequest) => {
      if (!request.formId) {
        return create(request)
      } else {
        return update({
          files: request.files,
          updateDocumentFormRequest: {
            application_id: request.applicationId,
            form_id: request.formId,
            documents: request.uploadedFiles.map((uploadedFile) => ({
              id: uploadedFile.id
            }))
          }
        })
      }
    },
    [create, update]
  )

  // Call API
  const uploadDocumentForm = async ({
    applicationId,
    documentFormMapping
  }: UploadDocumentFormProps) => {
    try {
      const asyncTasks = [...documentFormMapping]
        .map(([formType, documentFormValue = {}]) => {
          const {
            formId = "",
            notHaveDoc = false,
            files = [],
            uploadedFiles = [],
            deleteFiles = []
          } = documentFormValue

          const uploadRequest: UploadDocumentFormRequest = {
            formId,
            files,
            formType,
            applicationId,
            uploadedFiles: uploadedFiles.filter(
              (uploadedFile) =>
                !deleteFiles.find(
                  (deleteFile) => deleteFile.id === uploadedFile.id
                )
            )
          }

          const isAbleToDeleteDocument =
            (!notHaveDoc &&
              uploadedFiles.length > 0 &&
              deleteFiles.length > 0) ||
            (notHaveDoc && (!formId || (deleteFiles?.length ?? 0) > 0))

          const isAbleToUpload = files.length > 0 || isAbleToDeleteDocument

          if (isAbleToUpload) {
            return uploadFunction(uploadRequest)
          }

          return null
        })
        .filter((task) => task !== null)

      await Promise.allSettled(asyncTasks)
    } catch (error) {
      toastError({
        ...TOAST_MSG.loanApplication.uploadDocument,
        description: getAxiosError(error as Error).message
      })
    } finally {
      queryClient.invalidateQueries({
        queryKey: [FORM_QUERY_KEY.GET_DOCUMENT_FORM, applicationId]
      })
    }
  }

  return {
    uploadDocumentForm,
    isLoading: isCreating || isUploading
  }
}

const createDocument = (request: UploadDocumentFormRequest) => {
  const data = toFormData(request)

  return postRequest<FormData, DocumentFormResponse>({
    path: API_PATH.application.formV2.documentForm.create,
    data,
    customHeader: headerWithContentType("multipart/form-data")
  })
}

const useMutateCreateDocument = () => {
  return useMutation({
    mutationFn: createDocument
  })
}

const updateDocument = (request: UpdateDocumentFormRequest) => {
  const data = toFormData(request)

  return postRequest<FormData, DocumentFormResponse>({
    path: API_PATH.application.formV2.documentForm.update,
    data,
    customHeader: headerWithContentType("multipart/form-data")
  })
}

const useMutateUpdateDocument = () => {
  return useMutation({
    mutationFn: updateDocument
  })
}
