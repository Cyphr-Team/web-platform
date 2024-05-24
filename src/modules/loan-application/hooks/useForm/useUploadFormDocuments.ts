import { useCallback } from "react"
import { useMutateUploadDocument } from "../useMutation/useUploadDocumentMutation"
import { FORM_TYPE } from "../../models/LoanApplicationStep/type"

export const useUploadFormDocuments = () => {
  const { mutateAsync, isUploading } = useMutateUploadDocument()

  const uploadDocuments = useCallback(
    async (formId: string, files: File[], formType: FORM_TYPE) => {
      const request = new FormData()

      const reqBody = {
        files: files,
        formType: formType,
        formId: formId
      }

      for (const [key, value] of Object.entries(reqBody)) {
        if (Array.isArray(value)) {
          value.forEach((file: File) => {
            request.append(key, file)
          })
        } else if (value) {
          request.append(key, value + "")
        }
      }

      await mutateAsync(request, {
        onSuccess: (res) => {
          return res
        }
      })
    },
    [mutateAsync]
  )
  return { uploadDocuments, isUploading }
}
