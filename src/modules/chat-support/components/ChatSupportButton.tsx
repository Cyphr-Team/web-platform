import { getSettings } from "@/modules/chat-support/constants/settings"
import { CHAT_STEPS, FlowBuilder } from "@/modules/chat-support/constants/steps"
import {
  themeOptionsMap,
  themeQuestionOptions,
  themes
} from "@/modules/chat-support/constants/themes"
import { useInitChatSession } from "@/modules/chat-support/hooks/useInitChatSession"
import { useSendChatMessage } from "@/modules/chat-support/hooks/useSendChatMessage"
import { useCallback, useMemo } from "react"
import ChatBot, { ChatBotProvider, Params } from "react-chatbotify"
import { markdown } from "markdown"
import { styles } from "@/modules/chat-support/constants/styles"
import { useTenant } from "@/providers/tenant-provider"
import { getImageURL } from "@/utils/aws.utils"
import {
  chatFollowUpOptionsMap,
  followUpOptions,
  restartOptionsMap
} from "@/modules/chat-support/constants/map"
import { useEndChatSession } from "@/modules/chat-support/hooks/useEndChatSession"
import {
  CHAT_MESSAGE,
  CHAT_SESSION_ID
} from "@/modules/chat-support/constants/chat"
import { Button } from "@/components/ui/button"
import { Archive } from "lucide-react"

// Chat Custom Components
const EndChatButton = (params: Params) => {
  // Disable the button when we are showing Common Topics
  if (params.userInput === chatFollowUpOptionsMap.commonTopics) return
  return (
    <div className="rcb-view-history-container flex items-center justify-center mt-2 w-full">
      <Button
        className="rcb-view-history-button hover:bg-white hover:text-black hover:border-black font-light h-8"
        onClick={() => params.goToPath(CHAT_STEPS.END)}
      >
        End Chat <Archive size={10} className="ml-1" />
      </Button>
    </div>
  )
}

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
        if (params.userInput === chatFollowUpOptionsMap.commonTopics) {
          params.goToPath(CHAT_STEPS.THEME)
          return
        }
        const data = await mutateSend({ message: params.userInput })
        return markdown.toHTML(data.data.mainResponse).replace(/\n/g, "")
      } catch (error) {
        return CHAT_MESSAGE.ERROR
      }
    },
    [mutateSend]
  )

  const endStep = useCallback(async () => {
    try {
      const sessionId = localStorage.getItem(CHAT_SESSION_ID)
      if (!sessionId) return CHAT_MESSAGE.ERROR
      await mutateEnd({ sessionId })
      return CHAT_MESSAGE.END_INFO
    } catch (error) {
      return CHAT_MESSAGE.ERROR
    }
  }, [mutateEnd])

  const selectThemeStep = async () => {
    try {
      return CHAT_MESSAGE.COMMON_TOPICS
    } catch (error) {
      return CHAT_MESSAGE.ERROR
    }
  }

  const processThemeStep = async (params: Params) => {
    try {
      const data = params.userInput
      return `Here are some common questions related to <b>${data}</b>:`
    } catch (error) {
      return CHAT_MESSAGE.ERROR
    }
  }

  const llmFlow = new FlowBuilder()
    .chatbotInit(initStep, CHAT_STEPS.LOOP, followUpOptions)
    .chatbotLoop(loopStep, CHAT_STEPS.LOOP, followUpOptions, EndChatButton)
    .chatbotEnd(endStep, CHAT_STEPS.INIT, Object.values(restartOptionsMap))
    .chatbotSelectTheme(
      selectThemeStep,
      CHAT_STEPS.PROCESS_THEME,
      Object.values(themeOptionsMap).map((theme) => theme.title)
    )
    .chatbotProcessTheme(
      processThemeStep,
      CHAT_STEPS.LOOP,
      themeQuestionOptions
    )
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
