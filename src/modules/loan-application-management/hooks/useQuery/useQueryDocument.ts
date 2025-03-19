import { type ListResponse, type PaginateParams } from "@/types/common.type"
import { type LoanDocument } from "@/types/loan-document.type"
import { API_PATH } from "@/constants"
import { loanApplicationDocumentKeys } from "@/constants/query-key"
import { getRequest } from "@/services/client.service"
import { customRequestHeader } from "@/utils/request-header"
import { useQuery } from "@tanstack/react-query"
import { createSearchParams, useParams } from "react-router-dom"

type ListLoanApplicationResponse = ListResponse<LoanDocument>

type UseQueryDocumentParams = PaginateParams & {
  keyword: string
}

export const useQueryDocument = ({
  keyword,
  limit,
  offset
}: UseQueryDocumentParams) => {
  const params = useParams()

  return useQuery<ListLoanApplicationResponse>({
    queryKey: loanApplicationDocumentKeys.list(
      createSearchParams({
        id: params.id!,
        keyword,
        limit: limit.toString(),
        offset: offset.toString()
      }).toString()
    ),
    queryFn: async () => {
      const response = await getRequest<
        UseQueryDocumentParams,
        ListLoanApplicationResponse
      >({
        path: API_PATH.loanApplication.getDocuments(params.id ?? ""),
        params: { keyword, limit, offset },
        customHeader: customRequestHeader.customHeaders
      })

      return response
    }
  })
}
