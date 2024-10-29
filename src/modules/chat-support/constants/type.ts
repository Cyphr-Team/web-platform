import { type Params } from "react-chatbotify"

type OptionsPromiseFuncType = (params: Params) => Promise<string[]>
type OptionsFuncType = (params: Params) => string[]
type MessageFuncType = (params: Params) => Promise<void>
type ComponentFuncType = (params: Params) => JSX.Element | undefined

export type {
  OptionsPromiseFuncType,
  OptionsFuncType,
  MessageFuncType,
  ComponentFuncType
}
