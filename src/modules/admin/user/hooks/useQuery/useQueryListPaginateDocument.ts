import { API_PATH } from "@/constants"
import { chatbotDocumentKeys } from "@/constants/query-key"
import { postRequest } from "@/services/client.service"
import { type ChatbotDocument } from "@/types/chatbot.type"
import { type ListResponse, type PaginateParams } from "@/types/common.type"
import { keepPreviousData, useQuery } from "@tanstack/react-query"
import * as z from "zod"

type ListDocumentResponse = ListResponse<ChatbotDocument>

export const DocumentFilterSchema = z.object({
  institutionId: z.string()
})

export type DocumentFilterValues = z.infer<typeof DocumentFilterSchema>

export interface FilterParams {
  institutionId?: string
}

type Params = PaginateParams & Partial<FilterParams>

export const useQueryListPaginateDocument = ({
  limit,
  offset,
  institutionId
}: Params) => {
  return useQuery<ListDocumentResponse>({
    queryKey: chatbotDocumentKeys.list({
      limit,
      offset,
      institutionId
    }),
    queryFn: async () => {
      const response = await postRequest<Params, ListDocumentResponse>({
        path: API_PATH.admin.document.list,
        data: {
          limit,
          offset,
          institutionId: institutionId?.length ? institutionId : undefined
        }
      })

      return response.data
    },
    placeholderData: keepPreviousData
  })
}
