import { getSettings } from "@/modules/chat-support/constants/settings"
import { CHAT_STEPS, FlowBuilder } from "@/modules/chat-support/constants/steps"
import { themes } from "@/modules/chat-support/constants/themes"
import { useInitChatSession } from "@/modules/chat-support/hooks/useInitChatSession"
import { useSendChatMessage } from "@/modules/chat-support/hooks/useSendChatMessage"
import { useCallback, useMemo } from "react"
import ChatBot, { ChatBotProvider, Params } from "react-chatbotify"
import { markdown } from "markdown"
import { styles } from "@/modules/chat-support/constants/styles"
import { useTenant } from "@/providers/tenant-provider"
import { getImageURL } from "@/utils/aws.utils"
import { chatFollowUpOptionsMap } from "@/modules/chat-support/constants/map"
import { useEndChatSession } from "@/modules/chat-support/hooks/useEndChatSession"
import {
  CHAT_MESSAGE,
  CHAT_SESSION_ID
} from "@/modules/chat-support/constants/chat"

export const ChatSupportButton = () => {
  // Chatbot BE integration hooks
  const { mutateAsync: mutateInit } = useInitChatSession()
  const { mutateAsync: mutateSend } = useSendChatMessage()
  const { mutateAsync: mutateEnd } = useEndChatSession()

  // Get Chat Logo
  const { tenantData } = useTenant()
  const imageURL = useMemo(
    () =>
      getImageURL(
        tenantData?.logo !== ""
          ? tenantData?.logo
          : tenantData?.customFieldsOnDemand?.favicon
      ),
    [tenantData]
  )

  // Chat Flow Functions
  const initStep = async () => {
    try {
      const data = await mutateInit()
      localStorage.setItem(CHAT_SESSION_ID, data.data.sessionId)
      return data.data.mainResponse
    } catch (error) {
      return CHAT_MESSAGE.ERROR
    }
  }

  const loopStep = useCallback(
    async (params: Params) => {
      try {
        if (params.userInput == chatFollowUpOptionsMap.end) {
          const sessionId = localStorage.getItem(CHAT_SESSION_ID)
          if (!sessionId) return CHAT_MESSAGE.ERROR
          mutateEnd({ sessionId })
          params.goToPath(CHAT_STEPS.INIT)
          return
        }
        const data = await mutateSend({ message: params.userInput })
        return markdown.toHTML(data.data.mainResponse).replace(/\n/g, "")
      } catch (error) {
        return CHAT_MESSAGE.ERROR
      }
    },
    [mutateEnd, mutateSend]
  )

  const followUpOptions = async (params: Params) => {
    if (params.userInput == chatFollowUpOptionsMap.end) return []
    return Object.values(chatFollowUpOptionsMap)
  }

  const llmFlow = new FlowBuilder()
    .chatbotInit(initStep, CHAT_STEPS.LOOP)
    .chatbotLoop(loopStep, CHAT_STEPS.LOOP, followUpOptions)
    .build()

  return (
    <ChatBotProvider
      flow={llmFlow}
      settings={getSettings(imageURL)}
      themes={themes}
      styles={styles}
    >
      <ChatBot />
    </ChatBotProvider>
  )
}
