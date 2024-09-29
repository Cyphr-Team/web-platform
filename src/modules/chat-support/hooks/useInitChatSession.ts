import { API_PATH } from "@/constants"
import { postRequest } from "@/services/client.service"
import { useMutation } from "@tanstack/react-query"
import { ErrorResponse } from "@/types/common.type"
import { AxiosError, AxiosResponse } from "axios"
import { customRequestHeader } from "@/utils/request-header"
import { ChatMessage } from "@/modules/chat-support/constants/chat"

export const useInitChatSession = () => {
  return useMutation<AxiosResponse<ChatMessage>, AxiosError<ErrorResponse>>({
    mutationFn: (data) => {
      return postRequest({
        path: API_PATH.application.chatbot.initSession,
        data,
        customHeader: customRequestHeader.customHeaders
      })
    }
  })
}
