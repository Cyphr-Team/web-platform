import { type Params } from "react-chatbotify"

type OptionsPromiseFuncWithParams = (params: Params) => Promise<string[]>
type OptionsFuncWithParams = (params: Params) => string[]
type MessageFuncWithParams = (params: Params) => Promise<string>
type MessageFuncWithoutParams = () => Promise<string>
type ComponentFuncWithParams = (params: Params) => JSX.Element | undefined

export type {
  OptionsPromiseFuncWithParams,
  OptionsFuncWithParams,
  MessageFuncWithParams,
  MessageFuncWithoutParams,
  ComponentFuncWithParams
}
