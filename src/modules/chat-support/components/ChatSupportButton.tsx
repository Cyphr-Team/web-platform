import { settings } from "@/modules/chat-support/constants/settings"
import { CHAT_STEPS, FlowBuilder } from "@/modules/chat-support/constants/steps"
import { themes } from "@/modules/chat-support/constants/themes"
import { useInitChatSession } from "@/modules/chat-support/hooks/useInitChatSession"
import { useSendChatMessage } from "@/modules/chat-support/hooks/useSendChatMessage"
import { useCallback } from "react"
import ChatBot, { ChatBotProvider, Params } from "react-chatbotify"
import { markdown } from "markdown"
import { styles } from "@/modules/chat-support/constants/styles"

export const ChatSupportButton = () => {
  const { mutateAsync: mutateInit } = useInitChatSession()
  const { mutateAsync: mutateSend } = useSendChatMessage()

  const llmFlow = new FlowBuilder()
    .chatbotInit(async () => {
      try {
        const data = await mutateInit()
        return data.data.mainResponse
      } catch (error) {
        return "I'm sorry, something went wrong. Please try again later."
      }
    }, CHAT_STEPS.LOOP)
    .chatbotLoop(
      useCallback(
        async (params: Params) => {
          try {
            const data = await mutateSend({ message: params.userInput })
            return markdown.toHTML(data.data.mainResponse).replace(/\n/g, "")
          } catch (error) {
            return "I'm sorry, something went wrong. Please provide more detail on your question or try again later."
          }
        },
        [mutateSend]
      ),
      CHAT_STEPS.LOOP
    )
    .build()

  return (
    <ChatBotProvider
      flow={llmFlow}
      settings={settings}
      themes={themes}
      styles={styles}
    >
      <ChatBot />
    </ChatBotProvider>
  )
}
