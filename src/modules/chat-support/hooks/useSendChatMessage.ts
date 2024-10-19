import { API_PATH } from "@/constants"
import { postRequest } from "@/services/client.service"
import { useMutation } from "@tanstack/react-query"
import { type ErrorResponse } from "@/types/common.type"
import { type AxiosError, type AxiosResponse } from "axios"
import { customRequestHeader } from "@/utils/request-header"
import { type ChatMessage } from "@/modules/chat-support/constants/chat"

export const useSendChatMessage = () => {
  return useMutation<
    AxiosResponse<ChatMessage>,
    AxiosError<ErrorResponse>,
    { message: string }
  >({
    mutationFn: (data) => {
      return postRequest({
        path: API_PATH.application.chatbot.chat,
        data,
        customHeader: customRequestHeader.customHeaders
      })
    }
  })
}
