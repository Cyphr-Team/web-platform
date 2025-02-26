import { type Params } from "react-chatbotify"

const ChatMessageInfo: Record<string, string> = {
  INIT: "Hello",
  GREETING: "Hello! How can I assist you today?",
  COMMON_TOPICS: "Here are our common topics:",
  ERROR: "Something went wrong. Please try again.",
  ERROR_UNRECOVERABLE:
    "Something went wrong. Chatbot is unavailable at the moment.",
  RECONNECT:
    "We have reconnected to chat service after session timeout. Please start again.",
  END: "End Chat",
  END_INFO: "The chat is ended."
}

const chatFollowUpOptionsMap: Record<string, string> = {
  commonTopics: "Common Topics"
}

const followUpOptions = async (params: Params) => {
  if (
    params.userInput == chatFollowUpOptionsMap.end ||
    params.userInput == chatFollowUpOptionsMap.commonTopics
  )
    return []

  return Object.values(chatFollowUpOptionsMap)
}

const restartOptionsMap: Record<string, string> = {
  restart: "Start Chat"
}

export {
  followUpOptions,
  restartOptionsMap,
  chatFollowUpOptionsMap,
  ChatMessageInfo
}
