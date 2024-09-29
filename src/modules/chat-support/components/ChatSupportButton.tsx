import { Institution } from "@/constants/tenant.constants"
import { settings } from "@/modules/chat-support/constants/settings"
import { CHAT_STEPS, flow } from "@/modules/chat-support/constants/steps"
import { themes } from "@/modules/chat-support/constants/themes"
import { useInitChatSession } from "@/modules/chat-support/hooks/useInitChatSession"
import { useSendChatMessage } from "@/modules/chat-support/hooks/useSendChatMessage"
import { useTenant } from "@/providers/tenant-provider"
import { useCallback } from "react"
import ChatBot, { ChatBotProvider, Params } from "react-chatbotify"
import { markdown } from "markdown"

export const ChatSupportButton = () => {
  const { mutateAsync: mutateInit } = useInitChatSession()
  const { mutateAsync: mutateSend } = useSendChatMessage()
  const tenant = useTenant()
  const llmFlow = {
    ...flow(tenant?.tenantData?.name ?? Institution.CyphrV2),
    [CHAT_STEPS.INIT]: {
      message: async () => {
        const data = await mutateInit()
        return data.data.mainResponse
      },
      path: CHAT_STEPS.LOOP
    },
    [CHAT_STEPS.LOOP]: {
      message: useCallback(
        async (params: Params) => {
          const data = await mutateSend({ message: params.userInput })
          return markdown.toHTML(data.data.mainResponse)
        },
        [mutateSend]
      ),
      path: CHAT_STEPS.LOOP
    }
  }

  return (
    <ChatBotProvider flow={llmFlow} settings={settings} themes={themes}>
      <ChatBot />
    </ChatBotProvider>
  )
}
