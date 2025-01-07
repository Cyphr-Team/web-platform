import { API_PATH } from "@/constants"
import { postRequest, toFormData } from "@/services/client.service"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { FORM_TYPE } from "../../models/LoanApplicationStep/type"
import { headerWithContentType } from "@/utils/request-header"
import { loanApplicationDocumentKeys } from "@/constants/query-key"

interface UploadDocumentPayload {
  files: File[]
  applicationId: string
}

export default function useUploadDocuments() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (payload: UploadDocumentPayload) =>
      postRequest({
        path: API_PATH.application.formV2.documentForm.create,
        data: toFormData({
          formType: FORM_TYPE.CCC_DOCUMENTS,
          ...payload
        }),
        customHeader: headerWithContentType("multipart/form-data")
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: loanApplicationDocumentKeys.lists()
      })
    }
  })
}
