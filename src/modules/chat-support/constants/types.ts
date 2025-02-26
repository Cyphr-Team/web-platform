import { type Params } from "react-chatbotify"

type OptionsPromiseFuncType = (params: Params) => Promise<string[]>
type OptionsFuncType = (params: Params) => string[]
type MessageFuncType = (params: Params) => Promise<void>
type ComponentFuncType = (params: Params) => JSX.Element | undefined

interface ChatMessage {
  sessionId: string
  sessionTitle: string
  historyId: string
  mainResponse: string
}

interface StreamChatMessage {
  sessionId: string
  message: string
  isError: boolean
  endOfMessage: boolean
  endOfConversation: boolean
}

export type {
  OptionsPromiseFuncType,
  OptionsFuncType,
  MessageFuncType,
  ComponentFuncType,
  ChatMessage,
  StreamChatMessage
}
