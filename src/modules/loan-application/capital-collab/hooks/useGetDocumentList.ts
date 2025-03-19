import { type SortOrder, type ListResponse } from "@/types/common.type"
import { type CCLoanDocument } from "@/types/loan-document.type"
import { API_PATH } from "@/constants"
import { loanApplicationDocumentKeys } from "@/constants/query-key"
import { postRequest } from "@/services/client.service"
import { useQuery } from "@tanstack/react-query"
import { createSearchParams, useParams } from "react-router-dom"
import { FORM_TYPE } from "@/modules/loan-application/models/LoanApplicationStep/type"

type ListLoanApplicationResponse = ListResponse<CCLoanDocument>

interface UseQueryDocumentParams {
  applicationId: string
  formType?: string
  fileName?: string
  sort?: {
    fileName?: SortOrder
    createdAt?: SortOrder
  }
}

export const useQueryDocument = ({
  applicationId,
  fileName,
  sort,
  isAdmin = false
}: UseQueryDocumentParams & {
  isAdmin?: boolean
}) => {
  const params = useParams()

  return useQuery<ListLoanApplicationResponse>({
    queryKey: loanApplicationDocumentKeys.list(
      createSearchParams({
        id: params.id!,
        formType: FORM_TYPE.CCC_DOCUMENTS,
        fileName: fileName ?? "",
        sort: createSearchParams(sort ?? {}).toString()
      }).toString()
    ),
    queryFn: async () => {
      const response = await postRequest<
        UseQueryDocumentParams,
        ListLoanApplicationResponse
      >({
        path: isAdmin
          ? API_PATH.loanApplicationDetails.capitalCollabDocuments.admin
              .getDocumentsByApplicationId
          : API_PATH.loanApplicationDetails.capitalCollabDocuments.applicant
              .getDocumentsByApplicationId,
        data: {
          applicationId,
          formType: FORM_TYPE.CCC_DOCUMENTS,
          fileName,
          sort
        }
      })

      return response.data
    }
  })
}
