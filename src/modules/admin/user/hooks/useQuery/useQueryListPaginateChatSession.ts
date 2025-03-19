import { API_PATH } from "@/constants"
import { chatbotSessionKeys } from "@/constants/query-key"
import { postRequest } from "@/services/client.service"
import { type ChatbotSessionResponse } from "@/types/chatbot.type"
import { type ListResponse, type PaginateParams } from "@/types/common.type"
import { keepPreviousData, useQuery } from "@tanstack/react-query"

type ListSessionResponse = ListResponse<ChatbotSessionResponse>

export interface FilterParams {
  userId?: string
}

type Params = PaginateParams & Partial<FilterParams>

export const useQueryListPaginateChatSession = (data: Params) => {
  return useQuery<ListSessionResponse>({
    queryKey: chatbotSessionKeys.list(data),
    queryFn: async () => {
      const response = await postRequest<Params, ListSessionResponse>({
        path: API_PATH.admin.chatSession.list,
        data
      })

      return response.data
    },
    placeholderData: keepPreviousData
  })
}
