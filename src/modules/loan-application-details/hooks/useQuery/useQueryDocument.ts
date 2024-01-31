import { ListResponse, PaginateParams } from "@/common"
import {
  LoanDocument,
  LoanDocumentStatus,
  LoanDocumentType
} from "@/common/loan-document.type"
import { API_PATH } from "@/constants"
import { loanApplicationDocumentKeys } from "@/constants/query-key"
import { getRequest } from "@/services/client.service"
import { customRequestHeader } from "@/utils/request-header"
import { useInfiniteQuery } from "@tanstack/react-query"
import { createSearchParams } from "react-router-dom"

type ListLoanApplicationResponse = ListResponse<LoanDocument>

const attachFakeData = (): Partial<LoanDocument> => ({
  fileName: "Bank of America - Bank Statement - Oct 2023.pdf",
  fileSize: 200,
  fileType: "pdf",
  documentType: Object.values(LoanDocumentType)[
    Math.floor(Math.random() * 3)
  ] as LoanDocumentType,
  status: Object.values(LoanDocumentStatus)[Math.floor(Math.random() * 4)]
})

export const useQueryDocument = ({ limit, offset }: PaginateParams) => {
  return useInfiniteQuery<ListLoanApplicationResponse>({
    queryKey: loanApplicationDocumentKeys.list(
      createSearchParams({
        limit: limit.toString(),
        offset: offset.toString()
      }).toString()
    ),
    queryFn: async ({ pageParam = 0 }) => {
      const response = await getRequest<
        PaginateParams,
        ListLoanApplicationResponse
      >({
        path: API_PATH.loanApplication.list,
        params: { limit, offset: (pageParam as number) * limit },
        customHeader: customRequestHeader.customHeaders
      })
      // TODO: Remove this when the data is finalize
      return {
        ...response,
        data: response.data.map((application) => ({
          ...application,
          ...attachFakeData()
        }))
      }
    },
    initialPageParam: 0,
    getNextPageParam(last, pages) {
      return last.total < limit ? undefined : pages.length
    }
  })
}
