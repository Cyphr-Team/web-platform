import { type Params } from "react-chatbotify"

const processOptions = [
  "Loan Program",
  "Troubleshooting",
  "About us",
  "Start Chat"
]

const chatFollowUpOptionsMap: Record<string, string> = {
  commonTopics: "Common Topics"
}

const troubleshootOptionsMap: Record<string, string> = {
  "Bank Connections": "https://plaid.com/docs/",
  "E-Sign": "https://developers.pandadoc.com/docs/getting-started",
  "Know Your Customer": "https://docs.withpersona.com/docs/getting-started",
  "Know Your Business": "https://docs.middesk.com/docs/getting-started"
}

const processOptionsMap: Record<string, string> = {
  "Loan Program": "loanProgram",
  Troubleshooting: "showTroubleshootOptions",
  "About us": "aboutUs",
  "Start Chat": "chatInit"
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
  processOptions,
  followUpOptions,
  restartOptionsMap,
  chatFollowUpOptionsMap,
  processOptionsMap,
  troubleshootOptionsMap
}
